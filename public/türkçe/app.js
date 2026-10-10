// Idioma — переглядач конспекту. Дані реєструються через IDIOMA.register({...}) із файлів у data/.
// Одна категорія = одна сторінка-документ. Теми = секції на ній. Фрази = компактні блоки.
// Граф зв'язків будується автоматично: морфема → правило (covers), правило → приклади, фраза ↔ дієслово, схожі фрази за спільними морфемами/словами.
const IDIOMA = (() => {
  const cats = [];
  const gloss = {};
  const TYPE_LABEL = { root: 'корінь', suffix: 'суфікс', prefix: 'префікс', word: 'слово', particle: 'частка' };
  const STOP = new Set(['-mak', '-mek', 'ben', 'ostap', '—', 'корінь', 'суфікс часу', 'суфікс особи']);
  const state = { cat: null };
  const BASE = window.IDIOMA_BASE || '';
  const $ = (id) => document.getElementById(id);
  const tt = (x) => x.en ? `${esc(x.en)} · ${esc(x.title)}` : esc(x.title);
  const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function register(cat) { cats.push(cat); }
  function glossary(map) { Object.entries(map).forEach(([k, v]) => k.split(',').forEach((x) => { gloss[x.trim().toLowerCase()] = v; })); }
  const findCat = (id) => cats.find((c) => c.id === id) || null;
  const entryId = (t, i) => t.slides[i].id || `${t.id}-${i + 1}`;
  // '-m / -k' → ['-m','-k'];  'iste- → isti-' → ['iste-']
  const norm = (m) => String(m).toLowerCase().split('→')[0].split('/').map((x) => x.trim()).filter(Boolean);
  const glossOf = (m) => gloss[String(m).toLowerCase().trim()] || norm(m).map((x) => gloss[x]).find(Boolean) || '';

  // ---------- індекси ----------
  const all = [];            // {c, t, s, i, href, tokens:Set}
  const verbIndex = {};      // inf → entry
  const backlinks = {};      // inf → [entries]
  const rules = [];          // граматичні записи з covers: {entry, covers:Set}
  function buildIndex() {
    cats.forEach((c) => c.topics.forEach((t) => t.slides.forEach((s, i) => {
      const e = { c, t, s, i, href: `#${c.id}/${entryId(t, i)}`, tokens: new Set() };
      (s.parts || []).forEach((p) => norm(p.m).forEach((x) => { if (!STOP.has(x)) e.tokens.add(x); }));
      (s.words || []).forEach((w) => norm(w.tr.split(' ')[0]).forEach((x) => e.tokens.add(x)));
      (s.verbs || []).forEach((v) => e.tokens.add(v));
      all.push(e);
      if (c.id === 'verbs' && s.id) { verbIndex[s.tr] = e; e.tokens.add(s.tr); }
      (s.verbs || []).forEach((inf) => (backlinks[inf] ||= []).push(e));
      if (s.covers?.length) rules.push({ entry: e, covers: new Set(s.covers.map((x) => x.toLowerCase())) });
    })));
  }
  const rulesFor = (token) => rules.filter((r) => r.covers.has(token)).sort((a, b) => a.covers.size - b.covers.size);
  function relatedTo(e) {
    const explicit = (e.s.related || []).map((href) => all.find((x) => x.href === href)).filter(Boolean);
    const scored = all.filter((x) => x !== e && x.c.id !== 'grammar' && !explicit.includes(x))
      .map((x) => ({ x, n: [...e.tokens].filter((tk) => x.tokens.has(tk)).length })).filter((r) => r.n > 0)
      .sort((a, b) => b.n - a.n).slice(0, 6).map((r) => r.x);
    return [...explicit, ...scored];
  }
  const linkChip = (e) => `<a class="rel" href="${e.href}"><b>${esc(e.s.tr)}</b><span>${tt(e.t)}</span></a>`;

  // ---------- сайдбар ----------
  function renderNav() {
    $('nav').innerHTML = cats.map((c) => `
      <div class="cat" data-cat="${esc(c.id)}">
        <div class="cat-head" data-cat="${esc(c.id)}"><span>${c.icon || '📘'}</span><span>${tt(c)}</span><span class="n">${c.topics.reduce((n, t) => n + t.slides.length, 0)}</span></div>
        <div class="topics">${c.topics.map((t) => `<a class="topic" href="#${esc(c.id)}/${esc(t.id)}">${tt(t)}</a>`).join('')}</div>
      </div>`).join('');
    $('nav').querySelectorAll('.cat-head').forEach((h) => h.addEventListener('click', () => { location.hash = h.dataset.cat; closeMenu(); }));
    $('nav').querySelectorAll('.topic').forEach((a) => a.addEventListener('click', closeMenu));
    const topics = cats.reduce((n, c) => n + c.topics.length, 0);
    $('sidebarFoot').textContent = `${cats.length} категорії · ${topics} тем · ${all.length} записів`;
  }
  function markActive() {
    document.querySelectorAll('.cat').forEach((el) => el.classList.toggle('active', el.dataset.cat === state.cat));
  }

  // ---------- пошук ----------
  function renderSearch(q) {
    q = q.trim().toLowerCase();
    if (!q) { renderNav(); markActive(); return; }
    const hits = all.filter((e) => {
      const s = e.s;
      const hay = [s.tr, s.uk, s.en, s.say, ...(s.words || []).map((w) => w.tr + ' ' + w.uk), ...(s.parts || []).map((p) => p.m + ' ' + p.d), ...(s.examples || []).map((x) => x.tr), ...(s.notes || []).map((n) => typeof n === 'string' ? n : (n.en || '') + ' ' + (n.uk || ''))].join(' ').toLowerCase();
      return hay.includes(q);
    });
    $('nav').innerHTML = `<div class="search-results">${hits.length ? hits.map((e) => `
      <a class="hit" href="${e.href}"><div class="t">${esc(e.s.tr)}</div><div class="u">${esc(e.s.en || e.s.uk)} · ${tt(e.t)}</div></a>`).join('')
      : '<div class="none">Нічого не знайдено</div>'}</div>`;
    $('nav').querySelectorAll('.hit').forEach((a) => a.addEventListener('click', closeMenu));
  }

  // ---------- озвучка ----------
  let trVoice = null;
  function pickVoice() {
    const vs = speechSynthesis.getVoices();
    trVoice = vs.find((v) => v.lang.toLowerCase().startsWith('tr')) || null;
  }
  function speak(text) {
    if (!('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text.replace(/[✗✓·→]/g, ' '));
    u.lang = 'tr-TR'; if (trVoice) u.voice = trVoice; u.rate = 0.85;
    speechSynthesis.speak(u);
  }

  // ---------- запис ----------
  function partHTML(p) {
    const en = p.e || glossOf(p.m);
    const rule = norm(p.m).flatMap(rulesFor)[0];
    const inner = `<b>${esc(p.m)}</b>${en ? `<u>${esc(en)}</u>` : ''}<i>${p.d}</i>`;
    return rule
      ? `<a class="part ${esc(p.t)} linked" href="${rule.entry.href}" title="${TYPE_LABEL[p.t] || esc(p.t)} → правило: ${esc(rule.entry.s.tr)}">${inner}</a>`
      : `<span class="part ${esc(p.t)}" title="${TYPE_LABEL[p.t] || esc(p.t)}">${inner}</span>`;
  }
  function entryHTML(e) {
    const { s, t } = e;
    const sec = (title, body) => body ? `<div class="sec"><h4>${title}</h4>${body}</div>` : '';
    const parts = s.parts?.length ? `<div class="parts">${s.parts.map(partHTML).join('')}</div>` : '';
    const meta = [];
    if (s.verbs?.length) meta.push(`<span class="k">verbs · дієслова</span> ${s.verbs.map((inf) => { const v = verbIndex[inf]; return v ? `<a href="${v.href}"><b>${esc(inf)}</b></a> ${esc(v.s.en)} <em>${esc(v.s.uk)}</em>` : `<b>${esc(inf)}</b>`; }).join(' · ')}`);
    if (s.words?.length) meta.push(`<span class="k">words · слова</span> ${s.words.map((w) => { const en = w.en || glossOf(w.tr.split(' ')[0]); return `<b>${esc(w.tr)}</b>${en ? ` ${esc(en)}` : ''} <em>${esc(w.uk)}</em>${w.note ? ` <em>(${esc(w.note)})</em>` : ''}`; }).join(' · ')}`);
    if (s.forms?.length) meta.push(...s.forms.map((f) => `<span class="k">${esc(f.label)}</span> ${f.items.map((x) => `<code>${esc(x)}</code>`).join(' ')}`));
    const metaHTML = meta.length ? `<div class="meta">${meta.map((m) => `<div>${m}</div>`).join('')}</div>` : '';
    const examples = s.examples?.length ? `<div class="examples">${s.examples.map((x) => `<div class="ex"><span class="tr">${esc(x.tr)}</span>${x.en ? `<span class="en">${esc(x.en)}</span>` : ''}<span class="uk">${esc(x.uk)}</span></div>`).join('')}</div>` : '';
    const table = s.table ? `<table class="tbl">${s.table.title ? `<caption>${esc(s.table.title)}</caption>` : ''}
      <thead><tr>${s.table.head.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead>
      <tbody>${s.table.rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>` : '';
    const dialogue = s.dialogue?.length ? `<div class="dialogue">${s.dialogue.map((l) => `
      <div class="line"><span class="who">${esc(l.who)}</span><span class="tr">${esc(l.tr)}</span><span class="uk">${l.en ? `<span class="en">${esc(l.en)}</span> · ` : ''}${esc(l.uk)}</span></div>`).join('')}</div>` : '';
    const notes = s.notes?.length ? `<ul class="notes">${s.notes.map((n) => typeof n === 'string' ? `<li><span class="uk">${n}</span></li>` : `<li>${n.en ? `<span class="en">${n.en}</span>` : ''}${n.uk ? `<span class="uk">${n.uk}</span>` : ''}</li>`).join('')}</ul>` : '';

    // граф: правила для цього запису, приклади для правила, зворотні лінки з дієслів, схожі записи
    const links = [];
    const ruleSet = new Map();
    [...e.tokens].forEach((tk) => rulesFor(tk).forEach((r) => { if (r.entry !== e) ruleSet.set(r.entry.href, r.entry); }));
    if (ruleSet.size) links.push(`<div class="rels"><span class="k">rules · правила</span>${[...ruleSet.values()].map(linkChip).join('')}</div>`);
    if (s.covers?.length) {
      const cov = new Set(s.covers.map((x) => x.toLowerCase()));
      const used = all.filter((x) => x !== e && x.c.id !== 'grammar' && [...x.tokens].some((tk) => cov.has(tk)));
      if (used.length) links.push(`<div class="rels"><span class="k">used in · приклади</span>${used.map(linkChip).join('')}</div>`);
    }
    const back = backlinks[s.tr];
    if (back?.length) links.push(`<div class="rels"><span class="k">in phrases · у фразах</span>${back.map(linkChip).join('')}</div>`);
    const rel = relatedTo(e);
    if (rel.length) links.push(`<div class="rels"><span class="k">related · схоже</span>${rel.map(linkChip).join('')}</div>`);
    const graph = links.length ? `<div class="graph">${links.join('')}</div>` : '';

    return `<div class="entry" id="${esc(entryId(t, e.i))}">
      <div class="head">
        <span class="phrase">${esc(s.tr)}</span>
        <button class="speak" data-say="${esc(s.tr)}" title="Озвучити (системний турецький голос)">🔈</button>
        ${s.say ? `<span class="say">${esc(s.say)}</span>` : ''}
      </div>
      <div class="trans">${s.en ? `<span class="en">${esc(s.en)}</span>` : ''}<span class="uk">${esc(s.uk)}</span></div>
      ${parts}${metaHTML}${examples}${table}${dialogue}${notes}${graph}
    </div>`;
  }

  function catHTML(c) {
    const entries = all.filter((e) => e.c === c);
    return `<div class="doc">
      <h1>${c.icon || ''} ${tt(c)}</h1>
      <div class="legend"><span class="part root"><b>root · корінь</b></span><span class="part suffix"><b>suffix · суфікс</b></span><span class="part word"><b>word · слово</b></span><span class="part particle"><b>particle · частка</b></span><span class="hint">outlined tile = click opens the rule · плитка з рамкою веде на правило</span></div>
      ${c.topics.map((t) => `
        <section class="topic-sec" id="${esc(t.id)}">
          <h2>${tt(t)}${t.source ? `<a class="src" href="${esc(BASE + (t.source.image || '#'))}" target="_blank" title="${esc(t.source.label)}">source · джерело</a>` : ''}</h2>
          ${entries.filter((e) => e.t === t).map(entryHTML).join('')}
        </section>`).join('')}
    </div>`;
  }

  function homeHTML() {
    return `<div class="doc home">
      <h1>Türkçe konspekt</h1>
      <p>Вибери категорію в сайдбарі. Кожна категорія — одна сторінка, теми йдуть секціями. Кольорові плитки з рамкою ведуть на правило, внизу кожного запису — зв’язки.</p>
      <div class="cards">${cats.map((c) => `
        <a class="card" href="#${esc(c.id)}"><div class="ic">${c.icon || '📘'}</div><div class="t">${tt(c)}</div><div class="s">${c.topics.map((t) => esc(t.en || t.title)).join(' · ')}</div></a>`).join('')}</div>
    </div>`;
  }

  // ---------- рендер ----------
  function render() {
    const [catId, anchor] = location.hash.replace('#', '').split('/');
    const c = findCat(catId);
    state.cat = c ? c.id : null;
    markActive();
    const stage = $('stage');
    if (!c) { stage.innerHTML = homeHTML(); stage.dataset.cat = ''; $('crumbs').innerHTML = '<b>Головна</b>'; return; }
    if (stage.dataset.cat !== c.id) {
      stage.innerHTML = catHTML(c); stage.dataset.cat = c.id;
      stage.querySelectorAll('.speak').forEach((b) => b.addEventListener('click', () => speak(b.dataset.say)));
    }
    $('crumbs').innerHTML = `<b>${tt(c)}</b>`;
    document.querySelectorAll('.entry.hl').forEach((x) => x.classList.remove('hl'));
    if (anchor) {
      const el = document.getElementById(anchor);
      if (el) { el.scrollIntoView({ block: 'start' }); if (el.classList.contains('entry')) el.classList.add('hl'); }
    } else {
      window.scrollTo({ top: 0 });
    }
  }
  function closeMenu() { $('sidebar').classList.remove('open'); }

  function start() {
    buildIndex();
    renderNav();
    render();
    if ('speechSynthesis' in window) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
    $('menuBtn').addEventListener('click', () => $('sidebar').classList.toggle('open'));
    $('search').addEventListener('input', (e) => renderSearch(e.target.value));
    document.querySelector('.brand').addEventListener('click', () => { location.hash = ''; closeMenu(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
    window.addEventListener('hashchange', render);
  }

  return { register, glossary, start };
})();
