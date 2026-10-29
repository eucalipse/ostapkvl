import importlib.util
import json
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[2]
SCRIPT = ROOT / 'skills/article-analytics/scripts/analytics.py'
spec = importlib.util.spec_from_file_location('analytics', SCRIPT)
a = importlib.util.module_from_spec(spec)
spec.loader.exec_module(a)

class AnalyticsTests(unittest.TestCase):
    def command(self, *args, success=True):
        result = subprocess.run([sys.executable, str(SCRIPT), *map(str, args)], capture_output=True, text=True)
        self.assertEqual(result.returncode == 0, success, result.stdout + result.stderr)
        return result

    def test_full_extraction_and_chart_workflow(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            source = root / 'source.csv'
            source.write_text('Slug,Date,Impressions,Reactions,Comments,Reposts\na,2026-01-01,100,8,1,1\na,2026-01-03,200,16,2,2\nb,2026-01-03,100,0,0,0\nc,2026-01-03,50,1,,0\n')
            mapping = {'kind':'article','basis':'lifetime','columns': {'slug':'Slug','date':'Date','impressions':'Impressions','reactions':'Reactions','comments':'Comments','reposts':'Reposts'},'allowed_slugs':['a','b','c']}
            path = root / 'mapping.json'; path.write_text(json.dumps(mapping))
            self.command('inspect', source)
            self.command('normalize', source, '--mapping', path, '--out', root/'workspace.json')
            self.command('normalize', source, '--mapping', path, '--out', source, success=False)
            collision = root/'collision.json.provenance.json'
            collision.write_text('[{"Slug":"a","Date":"2026-01-01","Impressions":12}]')
            original = collision.read_bytes()
            self.command('normalize', collision, '--mapping', path, '--out', root/'collision.json', success=False)
            self.assertEqual(collision.read_bytes(), original)
            self.assertFalse((root/'collision.json').exists())
            sidecar = root/'new.json.provenance.json'
            sidecar.write_text('preserve this existing file')
            self.command('normalize', source, '--mapping', path, '--out', root/'new.json', success=False)
            self.assertEqual(sidecar.read_text(), 'preserve this existing file')
            data = json.loads((root/'workspace.json').read_text())
            self.assertIsNone(data['snapshots'][-1]['metrics']['comments'])
            data['followers'] = [{'date':'2026-01-01','count':100}, {'date':'2026-01-03','count':98}]
            (root/'workspace.json').write_text(json.dumps(data))
            for style in ('bar','dot'):
                out = root/style
                self.command('analyze', root/'workspace.json', '--out-dir', out, '--style', style)
                summary = json.loads((out/'summary.json').read_text())
                self.assertEqual(summary['impressions']['total'], 350)
                self.assertEqual(summary['comments']['observed_articles'], 2)
                self.assertAlmostEqual(summary['interaction_rate']['percent'], 20/300*100)
                self.assertIn('-2', (out/'followers.csv').read_text())
                charts = list(out.glob('*.svg')); self.assertEqual(len(charts), 3)
                for chart in charts:
                    tree = ET.parse(chart)
                    self.assertIn('ostapkvl.com', chart.read_text())
                    self.assertIsNotNone(tree.find('{http://www.w3.org/2000/svg}desc'))
                self.command('analyze', root/'workspace.json', '--out-dir', out, success=False)
            mapping['basis'] = 'last_30_days'; path.write_text(json.dumps(mapping))
            self.command('normalize', source, '--mapping', path, '--out', root/'bad.json', success=False)
            self.assertFalse((root/'bad.json').exists())

    def test_xlsx_sheet_selection_and_dates(self):
        import openpyxl
        from datetime import datetime
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            workbook = openpyxl.Workbook(); sheet = workbook.active; sheet.title = 'Followers'
            sheet.append(['Export metadata']); sheet.append(['Observed', 'Total followers'])
            sheet.append([datetime(2026,1,1), 0]); sheet.append([datetime(2026,1,2), 25])
            workbook.save(root/'input.xlsx')
            mapping = {'kind':'followers','basis':'snapshot','columns': {'date':'Observed','count':'Total followers'}}
            (root/'mapping.json').write_text(json.dumps(mapping))
            self.command('inspect', root/'input.xlsx', '--sheet', 'Followers', '--header-row', 2)
            self.command('normalize', root/'input.xlsx', '--sheet', 'Followers', '--header-row', 2, '--mapping', root/'mapping.json', '--out', root/'result.json')
            data = json.loads((root/'result.json').read_text())
            self.assertEqual(data['followers'][0], {'date':'2026-01-01','count':0})

    def test_bad_counts_and_missing_data(self):
        self.assertIsNone(a.count('', optional=True))
        self.assertEqual(a.count('1,234'), 1234)
        for value in ('1.2K', '1,2', -1, True, 1.5, float('nan'), '5%'):
            with self.assertRaises(ValueError): a.count(value)
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder); (root/'empty.json').write_text(json.dumps({'version':1,'snapshots':[],'followers':[]}))
            self.command('analyze', root/'empty.json', '--out-dir', root/'report')
            proposals = json.loads((root/'report/chart-proposals.json').read_text())
            self.assertTrue(all(p['status']=='needs_data' for p in proposals))
            self.assertEqual(list((root/'report').glob('*.svg')), [])
            summary = json.loads((root/'report/summary.json').read_text())
            self.assertIsNone(summary['impressions']['total'])

if __name__ == '__main__': unittest.main()
