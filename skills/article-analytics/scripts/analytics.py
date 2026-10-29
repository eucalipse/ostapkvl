#!/usr/bin/env python3
"""Local extraction and chart preparation. No network or account mutations."""
import argparse
import csv
import datetime as dt
import hashlib
import html
import json
import math
from pathlib import Path
import re
import sys
from urllib.parse import urlparse

METRICS = ('impressions', 'views', 'reactions', 'comments', 'reposts')
TODAY = dt.date.today()


def read_rows(path, sheet=None, header_row=1):
    suffix = path.suffix.lower()
    if suffix in ('.csv', '.tsv'):
        with path.open(encoding='utf-8-sig', newline='') as stream:
            rows = list(csv.reader(stream, delimiter='\t' if suffix == '.tsv' else ','))
        sheets = None
    elif suffix == '.xlsx':
        try:
            import openpyxl
        except ImportError:
            raise ValueError('XLSX support requires openpyxl. Install it in your working Python environment, then retry.')
        workbook = openpyxl.load_workbook(path, read_only=True, data_only=True)
        sheets = workbook.sheetnames
        if sheet and sheet not in sheets:
            raise ValueError(f'Unknown sheet. Available: {sheets}')
        rows = list(workbook[sheet or sheets[0]].values)
        workbook.close()
    elif suffix == '.json':
        raw = json.loads(path.read_text())
        if not isinstance(raw, list) or any(not isinstance(row, dict) for row in raw):
            raise ValueError('For extraction, JSON must be an array of row objects. Use analyze for workspace backups.')
        return list(dict.fromkeys(key for row in raw for key in row)), raw, None
    else:
        raise ValueError('Supported sources: .csv, .tsv, .xlsx, .json')
    if header_row < 1 or header_row > len(rows):
        raise ValueError('Header row is outside the source.')
    headers = [str(value).strip() if value is not None else '' for value in rows[header_row - 1]]
    if len([h for h in headers if h]) != len(set(h for h in headers if h)):
        raise ValueError('Duplicate column headings. Choose the correct header row or disambiguate the source.')
    records = []
    for values in rows[header_row:]:
        if not any(value is not None and str(value).strip() for value in values):
            continue
        if any(value is not None and str(value).strip() and (i >= len(headers) or not headers[i]) for i, value in enumerate(values)):
            raise ValueError('A data column has no heading. Choose the correct header row.')
        records.append({key: values[i] if i < len(values) else None for i, key in enumerate(headers) if key})
    return [h for h in headers if h], records, sheets


def count(value, optional=False):
    if value is None or value == '':
        if optional:
            return None
        raise ValueError('Missing required count')
    if isinstance(value, bool):
        raise ValueError('Boolean is not a count')
    if isinstance(value, str):
        value = value.strip()
        if not re.fullmatch(r'\d+|\d{1,3}(?:,\d{3})+', value):
            raise ValueError(f'Expected an exact nonnegative integer, got {value!r}')
        value = int(value.replace(',', ''))
    if not isinstance(value, (int, float)) or not math.isfinite(value) or int(value) != value or not 0 <= value <= 9007199254740991:
        raise ValueError('Counts must be nonnegative safe integers')
    return int(value)


def date(value, fmt='%Y-%m-%d'):
    if isinstance(value, dt.datetime):
        parsed = value.date()
    elif isinstance(value, dt.date):
        parsed = value
    else:
        parsed = dt.datetime.strptime(str(value), fmt).date()
    if parsed > TODAY:
        raise ValueError('Observation date is in the future')
    return parsed.isoformat()


def valid_url(value):
    if value == '':
        return value
    parsed = urlparse(value)
    if parsed.scheme != 'https' or not (parsed.hostname == 'linkedin.com' or (parsed.hostname or '').endswith('.linkedin.com')):
        raise ValueError('Expected an HTTPS LinkedIn URL')
    return value


def validate(data):
    if not isinstance(data, dict) or data.get('version') != 1 or not isinstance(data.get('snapshots'), list) or not isinstance(data.get('followers'), list):
        raise ValueError('Expected workspace version 1, snapshots and followers')
    if len(data['snapshots']) > 10000 or len(data['followers']) > 10000:
        raise ValueError('Workspace exceeds 10,000 observations per series')
    article_keys, follower_keys = set(), set()
    for row in data['snapshots']:
        if not isinstance(row.get('slug'), str) or not re.fullmatch('[a-z0-9]+(?:-[a-z0-9]+)*', row['slug']):
            raise ValueError('Invalid article slug')
        if date(row['date']) != row['date']:
            raise ValueError('Expected ISO observation date')
        valid_url(row['postUrl'])
        for key in METRICS:
            count(row['metrics'][key], optional=True)
            if row['metrics'][key] is not None and (isinstance(row['metrics'][key], (str, bool)) or not isinstance(row['metrics'][key], (int, float))):
                raise ValueError('Workspace counts must be JSON numbers or null')
        key = (row['slug'], row['date'])
        if key in article_keys:
            raise ValueError(f'Duplicate article/date: {key}')
        article_keys.add(key)
    for row in data['followers']:
        if date(row['date']) != row['date']:
            raise ValueError('Expected ISO observation date')
        count(row['count'])
        if isinstance(row['count'], (str, bool)) or not isinstance(row['count'], (int, float)):
            raise ValueError('Follower count must be a JSON number')
        if row['date'] in follower_keys:
            raise ValueError('Duplicate follower date')
        follower_keys.add(row['date'])
    # The dashboard is one post per article. Never silently combine identities.
    for slug in {row['slug'] for row in data['snapshots']}:
        urls = {row['postUrl'].split('?')[0].rstrip('/') for row in data['snapshots'] if row['slug'] == slug and row['postUrl']}
        if len(urls) > 1:
            raise ValueError(f'Multiple LinkedIn post URLs for {slug}; reconcile post identities before aggregating')
    return data


def write_json(path, value):
    with path.open('x', encoding='utf-8') as stream:
        stream.write(json.dumps(value, ensure_ascii=False, indent=2, default=str) + '\n')


def normalize(args):
    provenance_path = Path(str(args.out) + '.provenance.json')
    inputs = {args.input.resolve(), args.mapping.resolve()}
    if any(path.resolve() in inputs or path.exists() for path in (args.out, provenance_path)):
        raise ValueError('Choose a new output file; source files and existing exports are never overwritten')
    mapping = json.loads(args.mapping.read_text())
    kind = mapping.get('kind')
    if (kind, mapping.get('basis')) not in [('article', 'lifetime'), ('followers', 'snapshot')]:
        raise ValueError('Explicit basis required: article/lifetime or followers/snapshot. Period exports cannot be imported as lifetime totals.')
    columns = mapping.get('columns', {})
    defaults = mapping.get('defaults', {})
    headers, rows, _ = read_rows(args.input, args.sheet, args.header_row)
    missing = set(columns.values()) - set(headers)
    if missing:
        raise ValueError(f'Mapped columns not found: {sorted(missing)}')
    allowed = mapping.get('allowed_slugs')
    if kind == 'article' and (not isinstance(allowed, list) or not allowed):
        raise ValueError('Set allowed_slugs from the article inventory before normalizing')
    result = {'version': 1, 'snapshots': [], 'followers': []}
    for index, row in enumerate(rows, args.header_row + 1):
        def get(key):
            return row.get(columns[key]) if key in columns else defaults.get(key)
        try:
            observed = date(get('date'), mapping.get('date_format', '%Y-%m-%d'))
            if kind == 'followers':
                result['followers'].append({'date': observed, 'count': count(get('count'))})
            else:
                slug = get('slug')
                if slug not in allowed:
                    raise ValueError(f'Article slug not in verified inventory: {slug}')
                metrics = {key: count(get(key), optional=True) for key in METRICS}
                if all(value is None for value in metrics.values()):
                    raise ValueError('No observed article metrics')
                result['snapshots'].append({'slug': slug, 'date': observed, 'postUrl': valid_url(str(get('postUrl') or '')), 'metrics': metrics})
        except (ValueError, TypeError) as error:
            raise ValueError(f'Row {index}: {error}') from error
    validate(result)
    args.out.parent.mkdir(parents=True, exist_ok=True)
    write_json(args.out, result)
    write_json(provenance_path, {'source_name': args.input.name, 'source_sha256': hashlib.sha256(args.input.read_bytes()).hexdigest(), 'sheet': args.sheet, 'header_row': args.header_row, 'mapping': mapping, 'rows': len(rows), 'extracted_at': dt.datetime.now(dt.timezone.utc).isoformat()})
    print(json.dumps({'output': str(args.out), 'rows': len(rows), 'provenance': str(args.out) + '.provenance.json'}))


def csv_file(path, headers, rows):
    with path.open('w', encoding='utf-8', newline='') as stream:
        writer = csv.writer(stream)
        writer.writerow(headers)
        # Neutralize text cells that spreadsheet software might execute as formulas.
        writer.writerows([("'" + v if isinstance(v, str) and v.startswith(('=', '+', '-', '@')) else v) for v in row] for row in rows)


def svg(path, title, subtitle, marks, height=460):
    content = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="{height}" viewBox="0 0 1000 {height}" role="img" aria-labelledby="title desc"><title id="title">{html.escape(title)}</title><desc id="desc">{html.escape(subtitle)} Exact values are available in the accompanying CSV.</desc><rect width="100%" height="100%" fill="#f8fafc"/><g font-family="Arial,sans-serif" fill="#172033"><text x="30" y="40" font-size="24">{html.escape(title)}</text><text x="30" y="66" fill="#64748b" font-size="12">{html.escape(subtitle)}</text>{marks}<text x="970" y="{height-15}" text-anchor="end" fill="#64748b" font-size="11">ostapkvl.com</text></g></svg>'''
    path.write_text(content)


def analyze(args):
    data = validate(json.loads(args.input.read_text()))
    latest = {}
    for row in sorted(data['snapshots'], key=lambda row: row['date']):
        latest[row['slug']] = row
    records = list(latest.values())
    complete = [row for row in records if row['metrics']['impressions'] and all(row['metrics'][key] is not None for key in ('reactions', 'comments', 'reposts'))]
    interactions = lambda row: sum(row['metrics'][key] for key in ('reactions', 'comments', 'reposts'))
    summary = {key: {'total': sum(row['metrics'][key] for row in records if row['metrics'][key] is not None) if any(row['metrics'][key] is not None for row in records) else None, 'observed_articles': sum(row['metrics'][key] is not None for row in records)} for key in METRICS}
    summary['interaction_rate'] = {'percent': sum(map(interactions, complete)) / sum(row['metrics']['impressions'] for row in complete) * 100 if complete else None, 'complete_articles': len(complete), 'definition': '(reactions + comments + reposts) / impressions; excludes clicks and saves'}
    summary['basis'] = 'Latest cumulative observations; dates and article ages may differ. Not a fixed reporting period.'
    summary['articles_with_snapshots'] = len(records)
    followers = sorted(data['followers'], key=lambda row: row['date'])
    proposals = [
        {'question': 'Which articles have most observed impressions?', 'chart': 'horizontal bar', 'alternative': 'dot plot / table', 'status': 'ready' if any(row['metrics']['impressions'] is not None for row in records) else 'needs_data', 'caveat': 'Latest lifetime observations may have unequal article ages and observation dates.'},
        {'question': 'How has my follower count changed?', 'chart': 'line with observed markers', 'alternative': 'dated change table', 'status': 'ready' if len(followers) >= 2 else 'needs_data', 'caveat': 'Requires at least two snapshots. No attribution to specific articles.'},
        {'question': 'How do exposure and interaction compare?', 'chart': 'scatter', 'alternative': 'table with denominators', 'status': 'ready' if len(complete) >= 2 else 'needs_data', 'caveat': 'Needs at least two complete posts. Association only; no clicks or saves.'},
        {'question': 'When should I publish?', 'chart': 'day/hour heatmap', 'alternative': 'per-slot table', 'status': 'needs_data', 'caveat': 'Requires posting timestamps, timezone, matched exposure windows and sufficient posts per slot.'},
    ]
    out = args.out_dir
    if out.exists() and any(out.iterdir()):
        raise ValueError('Choose an empty output directory so older charts cannot be mistaken for current results')
    out.mkdir(parents=True, exist_ok=True)
    write_json(out / 'summary.json', summary)
    write_json(out / 'chart-proposals.json', proposals)
    csv_file(out / 'latest-articles.csv', ['slug', 'observed_on', *METRICS, 'interaction_rate_percent'], [[row['slug'], row['date'], *[row['metrics'][key] for key in METRICS], interactions(row) / row['metrics']['impressions'] * 100 if row in complete else None] for row in records])
    csv_file(out / 'followers.csv', ['observed_on', 'followers', 'change_since_prior_observation'], [[row['date'], row['count'], row['count'] - followers[i-1]['count'] if i else None] for i, row in enumerate(followers)])
    ranked = sorted([row for row in records if row['metrics']['impressions'] is not None], key=lambda row: row['metrics']['impressions'], reverse=True)[:15]
    if ranked:
        maximum = max(1, max(row['metrics']['impressions'] for row in ranked))
        marks = ''
        for i, row in enumerate(ranked):
            y, width = 110 + i * 42, row['metrics']['impressions'] / maximum * 430
            name = row['slug'] if len(row['slug']) <= 43 else row['slug'][:40] + '…'
            marks += f'<text x="28" y="{y+14}" font-size="11">{html.escape(name)}</text><text x="28" y="{y+29}" font-size="9" fill="#64748b">Observed {row["date"]}</text>'
            if args.style == 'bar':
                marks += f'<rect x="400" y="{y}" width="{width}" height="21" rx="2" fill="#3157b7"/>'
            else:
                marks += f'<line x1="400" x2="{400+width}" y1="{y+10}" y2="{y+10}" stroke="#ccd5e7"/><circle cx="{400+width}" cy="{y+10}" r="5" fill="#3157b7"/>'
            marks += f'<text x="{410+width}" y="{y+15}" font-size="12">{row["metrics"]["impressions"]:,}</text>'
        marks += '<text x="400" y="96" font-size="10">Impressions · scale starts at zero</text>'
        svg(out / f'article-impressions-{args.style}.svg', 'Article impressions', 'Top 15 latest lifetime observations · unequal ages may affect comparison', marks, max(240, 150 + 42*len(ranked)))
    if len(followers) >= 2:
        first, last = dt.date.fromisoformat(followers[0]['date']), dt.date.fromisoformat(followers[-1]['date'])
        maximum = max(1, max(row['count'] for row in followers))
        points = [(80+(dt.date.fromisoformat(row['date'])-first).days/(last-first).days*820, 370-row['count']/maximum*240) for row in followers]
        marks = '<path d="M80 110 V370 H920" fill="none" stroke="#94a3b8"/>'
        marks += f'<text x="25" y="130" font-size="11">{maximum:,}</text><text x="55" y="375" font-size="11">0</text><polyline points="{" ".join(f"{x},{y}" for x,y in points)}" fill="none" stroke="#3157b7" stroke-width="2"/>'
        for (x, y), row in zip(points, followers):
            marks += f'<circle cx="{x}" cy="{y}" r="4" fill="#3157b7"><title>{row["date"]}: {row["count"]}</title></circle>'
        marks += f'<text x="80" y="400" font-size="12">{first}</text><text x="920" y="400" text-anchor="end" font-size="12">{last}</text>'
        svg(out / 'followers-line.svg', 'Profile followers', 'Dated observations · lines connect samples; intervening days were not measured', marks)
    if len(complete) >= 2:
        max_x, max_y = max(row['metrics']['impressions'] for row in complete), max(1, max(map(interactions, complete)))
        marks = f'<path d="M80 110 V370 H920" fill="none" stroke="#94a3b8"/><text x="80" y="395" font-size="11">0 impressions</text><text x="920" y="395" text-anchor="end" font-size="11">{max_x:,} impressions</text><text x="25" y="110" font-size="11">{max_y:,}</text><text x="25" y="375" font-size="11">0</text><text x="80" y="95" font-size="11">Interactions: reactions + comments + reposts</text>'
        for row in complete:
            x, y = 80+row['metrics']['impressions']/max_x*820, 370-interactions(row)/max_y*240
            marks += f'<circle cx="{x}" cy="{y}" r="6" fill="#3157b7" opacity=".7"><title>{html.escape(row["slug"])}: {row["metrics"]["impressions"]} impressions, {interactions(row)} interactions</title></circle>'
        svg(out / 'exposure-interaction-scatter.svg', 'Exposure and interaction', f'{len(complete)} complete article observations · lifetime counts · association, not causation', marks)
    print(json.dumps({'output_directory': str(out), 'articles': len(records), 'follower_observations': len(followers), 'complete_rate_rows': len(complete)}))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    commands = parser.add_subparsers(dest='command', required=True)
    for name in ('inspect', 'normalize'):
        command = commands.add_parser(name)
        command.add_argument('input', type=Path)
        command.add_argument('--sheet')
        command.add_argument('--header-row', type=int, default=1)
        if name == 'normalize':
            command.add_argument('--mapping', type=Path, required=True)
            command.add_argument('--out', type=Path, required=True)
    command = commands.add_parser('analyze')
    command.add_argument('input', type=Path)
    command.add_argument('--out-dir', type=Path, required=True)
    command.add_argument('--style', choices=['bar', 'dot'], default='bar')
    args = parser.parse_args()
    try:
        if args.command == 'inspect':
            headers, rows, sheets = read_rows(args.input, args.sheet, args.header_row)
            print(json.dumps({'sheets': sheets, 'headers': headers, 'row_count': len(rows), 'sample': rows[:3]}, default=str, indent=2))
        elif args.command == 'normalize':
            normalize(args)
        else:
            analyze(args)
    except (ValueError, KeyError, TypeError, OSError) as error:
        parser.exit(1, f'Error: {error}\n')

if __name__ == '__main__':
    main()
