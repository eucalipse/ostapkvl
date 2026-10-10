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
  const tt = (x) => [x.en, x.tr, x.title].filter(Boolean).map(esc).join(' · ');
  const nav = (x) => x.en ? `<span class="l1">${esc(x.en)}</span><span class="l2">${[x.tr, x.title].filter(Boolean).map(esc).join(' · ')}</span>` : esc(x.title);
  const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function register(cat) { cats.push(cat); }
  const low = (s) => String(s).toLocaleLowerCase('tr-TR');
  function glossary(map) { Object.entries(map).forEach(([k, v]) => k.split(',').forEach((x) => { gloss[low(x).trim()] = v; })); }
  const findCat = (id) => cats.find((c) => c.id === id) || null;
  // авто-id рахує лише записи без явного id, тож вставка запису з id посередині не зсуває сусідів
  const entryId = (t, i) => t.slides[i].id || `${t.id}-${t.slides.slice(0, i).filter((x) => !x.id).length + 1}`;
  // '-m / -k' → ['-m','-k'];  'iste- → isti-' → ['iste-']
  const norm = (m) => low(m).split('→')[0].split('/').map((x) => x.trim()).filter(Boolean);
  const glossOf = (m) => gloss[low(m).trim()] || norm(m).map((x) => gloss[x]).find(Boolean) || '';
  // слово з words[]: спершу повний вираз, потім перше слово
  const wordGloss = (w) => w.en || glossOf(w.tr) || glossOf(w.tr.split(' ')[0]);

  // ---------- індекси ----------
  const all = [];            // {c, t, s, i, href, tokens:Set}
  const verbIndex = {};      // inf → entry
  const backlinks = {};      // inf → [entries]
  const rules = [];          // граматичні записи з covers: {entry, covers:Set}
  function buildIndex() {
    cats.forEach((c) => c.topics.forEach((t) => t.slides.forEach((s, i) => {
      if (c.hidden || t.hidden || s.hidden) return;
      const e = { c, t, s, i, href: `#${c.id}/${entryId(t, i)}`, tokens: new Set() };
      (s.parts || []).forEach((p) => norm(p.m).forEach((x) => { if (!STOP.has(x)) e.tokens.add(x); }));
      (s.words || []).forEach((w) => norm(w.tr.split(' ')[0]).forEach((x) => e.tokens.add(x)));
      if (s.hidden) return;
      (s.verbs || []).forEach((v) => e.tokens.add(v));
      all.push(e);
      if (c.id === 'verbs' && s.id) { verbIndex[s.tr] = e; e.tokens.add(s.tr); }
      (s.verbs || []).forEach((inf) => (backlinks[inf] ||= []).push(e));
      if (s.covers?.length) rules.push({ entry: e, covers: new Set(s.covers.map((x) => x.toLowerCase())) });
    })));
  }
  // ---------- лексикон для автоматичного розбору речень (модалка) ----------
  const phraseIndex = new Map(); // нормалізована фраза → запис
  const stemIndex = new Map();   // основа слова (без дефіса) → {en, uk}
  const suffixIndex = new Map(); // суфікс (без дефісів) → {en, uk, key}
  const morphUK = new Map();     // морфема як у parts → перший укр. опис
  const normPhrase = (s) => low(s).replace(/[^a-zçğıöşüâîû0-9\s’']/g, ' ').replace(/[’']/g, '').replace(/\s+/g, ' ').trim();
  function buildLexicon() {
    all.forEach((e) => {
      phraseIndex.set(normPhrase(e.s.tr), e);
      (e.s.parts || []).forEach((p) => {
        norm(p.m).forEach((m) => {
          if (!morphUK.has(m)) morphUK.set(m, p.d.replace(/<[^>]+>/g, ''));
          const en = p.e || glossOf(m);
          if (m.startsWith('-')) { const k = m.replace(/-/g, ''); if (k && !suffixIndex.has(k)) suffixIndex.set(k, { en, uk: morphUK.get(m), key: m }); }
          else if (m.endsWith('-')) { const k = m.slice(0, -1); if (!stemIndex.has(k)) stemIndex.set(k, { en, uk: morphUK.get(m), key: m }); }
          else if (!/\s/.test(m) && !stemIndex.has(m)) stemIndex.set(m, { en, uk: morphUK.get(m), key: m });
        });
      });
      (e.s.words || []).forEach((w) => { const k = low(w.tr).split(/[\s(]/)[0]; if (k && !stemIndex.has(k)) stemIndex.set(k, { en: wordGloss(w), uk: w.uk, key: k }); });
    });
    Object.keys(gloss).forEach((k) => {
      if (k.startsWith('-')) { const s = k.replace(/-/g, '').replace(/\s.*$/, ''); if (s && !suffixIndex.has(s)) suffixIndex.set(s, { en: gloss[k], uk: morphUK.get(k), key: k }); }
      else if (!/\s/.test(k) && !stemIndex.has(k)) stemIndex.set(k, { en: gloss[k], uk: morphUK.get(k), key: k });
    });
  }
  // розбір одного слова: точне слово → основа + суфікси (жадібно, найдовший збіг) → невідоме
  function analyzeWord(raw) {
    const apos = raw.indexOf('’') >= 0 ? raw.indexOf('’') : raw.indexOf("'");
    const w = low(raw).replace(/[^a-zçğıöşüâîû’']/g, '');
    const clean = w.replace(/[’']/g, '');
    if (!clean) return null;
    if (stemIndex.has(clean)) { const g = stemIndex.get(clean); return { word: raw, segs: [{ m: clean, t: 'word', en: g.en, uk: g.uk }] }; }
    let stem = null;
    if (apos > 0) { const s = low(raw.slice(0, apos)).replace(/[^a-zçğıöşüâîû]/g, ''); stem = { k: s, g: stemIndex.get(s) || { en: 'name / place', uk: 'власна назва' } }; }
    else {
      for (let len = clean.length - 1; len >= 2; len--) { const s = clean.slice(0, len); if (stemIndex.has(s)) { stem = { k: s, g: stemIndex.get(s) }; break; } }
    }
    if (!stem) return { word: raw, segs: [{ m: clean, t: 'word', en: '', uk: '' }], unknown: true };
    const segs = [{ m: stem.k, t: stem.g.key && stem.g.key.endsWith('-') ? 'root' : 'word', en: stem.g.en, uk: stem.g.uk }];
    let rest = clean.slice(stem.k.length);
    const sufs = [...suffixIndex.keys()].sort((a, b) => b.length - a.length);
    let guard = 0;
    while (rest && guard++ < 8) {
      const hit = sufs.find((s) => rest.startsWith(s));
      if (hit) { const g = suffixIndex.get(hit); segs.push({ m: '-' + hit, t: 'suffix', en: g.en, uk: g.uk, key: g.key }); rest = rest.slice(hit.length); continue; }
      if (/^[yns]/.test(rest)) { segs.push({ m: '-' + rest[0] + '-', t: 'suffix', en: 'buffer consonant', uk: 'буферна приголосна' }); rest = rest.slice(1); continue; }
      segs.push({ m: '-' + rest, t: 'suffix', en: '', uk: '' }); rest = '';
    }
    return { word: raw, segs };
  }
  function analyze(text) {
    const key = normPhrase(text);
    const entry = phraseIndex.get(key);
    const words = text.split(/\s+/).map(analyzeWord).filter(Boolean);
    return { text, entry, words };
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
    $('nav').innerHTML = cats.filter((c) => !c.hidden && c.nav !== 'header').map((c) => `
      <div class="cat" data-cat="${esc(c.id)}">
        <div class="cat-head" data-cat="${esc(c.id)}"><span>${c.icon || '📘'}</span><span class="lbl">${nav(c)}</span><span class="n">${c.topics.reduce((n, t) => n + t.slides.length, 0)}</span></div>
        <div class="topics">${c.topics.filter((t) => !t.hidden).map((t) => `<a class="topic" href="#${esc(c.id)}/${esc(t.id)}">${nav(t)}</a>`).join('')}</div>
      </div>`).join('');
    $('nav').querySelectorAll('.cat-head').forEach((h) => h.addEventListener('click', () => { location.hash = h.dataset.cat; closeMenu(); }));
    $('nav').querySelectorAll('.topic').forEach((a) => a.addEventListener('click', closeMenu));
    const topics = cats.reduce((n, c) => n + c.topics.length, 0);
    $('sidebarFoot').textContent = `${cats.length} категорії · ${topics} тем · ${all.length} записів`;
  }
  // категорії з nav: 'header' — випадні меню в топбарі
  function renderHeader() {
    const hc = cats.filter((c) => !c.hidden && c.nav === 'header');
    $('hmenus').innerHTML = hc.map((c) => `
      <div class="hmenu" data-cat="${esc(c.id)}">
        <button class="hbtn" type="button" aria-haspopup="true" aria-expanded="false">${c.icon || ''} ${esc(c.en || c.title)} <span class="chev">▾</span></button>
        <div class="hdrop">
          <a class="hall" href="#${esc(c.id)}">${tt(c)}</a>
          ${c.topics.filter((t) => !t.hidden).map((t) => `<a href="#${esc(c.id)}/${esc(t.id)}"><b>${esc(t.en || t.title)}</b><span>${[t.tr, t.title].filter(Boolean).map(esc).join(' · ')}</span></a>`).join('')}
        </div>
      </div>`).join('');
    $('hmenus').querySelectorAll('.hmenu').forEach((m) => {
      const btn = m.querySelector('.hbtn');
      btn.addEventListener('click', (e) => { e.stopPropagation(); const open = m.classList.toggle('open'); btn.setAttribute('aria-expanded', open); $('hmenus').querySelectorAll('.hmenu').forEach((o) => { if (o !== m) o.classList.remove('open'); }); });
      m.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => m.classList.remove('open')));
    });
    document.addEventListener('click', () => $('hmenus').querySelectorAll('.hmenu.open').forEach((o) => o.classList.remove('open')));
  }
  function markActive() {
    document.querySelectorAll('.hmenu').forEach((el) => el.classList.toggle('active', el.dataset.cat === state.cat));
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
  function entryHTML(e, noId) {
    const { s, t } = e;
    const sec = (title, body) => body ? `<div class="sec"><h4>${title}</h4>${body}</div>` : '';
    const parts = s.parts?.length ? `<div class="parts">${s.parts.map(partHTML).join('')}</div>` : '';
    const meta = [];
    if (s.verbs?.length) meta.push(`<span class="k">verbs · дієслова</span> ${s.verbs.map((inf) => { const v = verbIndex[inf]; return v ? `<a href="${v.href}"><b>${esc(inf)}</b></a> ${esc(v.s.en)} <em>${esc(v.s.uk)}</em>` : `<b>${esc(inf)}</b>`; }).join(' · ')}`);
    if (s.words?.length) meta.push(`<span class="k">words · слова</span> ${s.words.map((w) => { const en = wordGloss(w); return `<b>${esc(w.tr)}</b>${en ? ` ${esc(en)}` : ''} <em>${esc(w.uk)}</em>${w.note ? ` <em>(${esc(w.note)})</em>` : ''}`; }).join(' · ')}`);
    if (s.forms?.length) meta.push(...s.forms.map((f) => `<span class="k">${esc(f.label)}</span> ${f.items.map((x) => `<code class="ph" data-ph="${esc(x.replace(/-/g, '').replace(/\s*\(.*$/, ''))}">${esc(x)}</code>`).join(' ')}`));
    const metaHTML = meta.length ? `<div class="meta">${meta.map((m) => `<div>${m}</div>`).join('')}</div>` : '';
    const answers = s.answers?.length ? `<div class="sec"><h4>answers · відповіді</h4><div class="examples answers">${s.answers.map((x) => `<div class="ex"><span class="tr ph" data-ph="${esc(x.tr)}">→ ${esc(x.tr)}</span>${x.en ? `<span class="en">${esc(x.en)}</span>` : ''}<span class="uk">${esc(x.uk)}</span></div>`).join('')}</div></div>` : '';
    const examples = s.examples?.length ? `<div class="examples">${s.examples.map((x) => `<div class="ex"><span class="tr ph" data-ph="${esc(x.tr)}">${esc(x.tr)}</span>${x.en ? `<span class="en">${esc(x.en)}</span>` : ''}<span class="uk">${esc(x.uk)}</span></div>`).join('')}</div>` : '';
    const table = s.table ? `<table class="tbl">${s.table.title ? `<caption>${esc(s.table.title)}</caption>` : ''}
      <thead><tr>${s.table.head.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead>
      <tbody>${s.table.rows.map((r) => `<tr>${r.map((c) => isTurkishText(c) ? `<td><span class="ph" data-ph="${esc(c)}">${esc(c)}</span></td>` : `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>` : '';
    const dialogue = s.dialogue?.length ? `<div class="dialogue">${s.dialogue.map((l) => `
      <div class="line"><span class="who">${esc(l.who)}</span><span class="tr ph" data-ph="${esc(l.tr)}">${esc(l.tr)}</span><span class="uk">${l.en ? `<span class="en">${esc(l.en)}</span> · ` : ''}${esc(l.uk)}</span></div>`).join('')}</div>` : '';
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
    const graph = links.length ? `<aside class="graph">${links.join('')}</aside>` : '';

    return `<div class="entry"${noId ? '' : ` id="${esc(entryId(t, e.i))}"`}>
      <div class="head">
        <span class="phrase">${esc(s.tr)}</span>
        ${s.status ? `<span class="status ${esc(s.status)}">${s.status === 'done' ? '✓ done · зроблено' : '○ to do · зробити'}</span>` : ''}
        <button class="speak" data-say="${esc(s.tr)}" title="Озвучити (системний турецький голос)">🔈</button>
        ${s.say ? `<span class="say">${esc(s.say)}</span>` : ''}
      </div>
      <div class="trans">${s.en ? `<span class="en">${esc(s.en)}</span>` : ''}<span class="uk">${esc(s.uk)}</span></div>
      <div class="body">${parts}${metaHTML}${answers}${examples}${table}${dialogue}${notes}</div>${graph}
    </div>`;
  }

  function catHTML(c) {
    const entries = all.filter((e) => e.c === c);
    return `<div class="doc">
      <h1>${c.icon || ''} ${tt(c)}</h1>
      <div class="legend"><span class="part root"><b>root · корінь</b></span><span class="part suffix"><b>suffix · суфікс</b></span><span class="part word"><b>word · слово</b></span><span class="part particle"><b>particle · частка</b></span><span class="hint">outlined tile = click opens the rule · плитка з рамкою веде на правило</span></div>
      ${c.topics.filter((t) => !t.hidden).map((t) => `
        <section class="topic-sec" id="${esc(t.id)}">
          <h2>${tt(t)}${t.source ? (t.source.image ? `<a class="src" href="${esc(BASE + t.source.image)}" target="_blank" title="${esc(t.source.label)}">source · джерело</a>` : `<span class="src" title="${esc(t.source.label)}">${esc(t.source.label)}</span>`) : ''}</h2>
          ${entries.filter((e) => e.t === t).map(entryHTML).join('')}
        </section>`).join('')}
    </div>`;
  }

  function homeHTML() {
    return `<div class="doc home">
      <h1>Türkçe konspekt</h1>
      <p>Вибери категорію в сайдбарі. Кожна категорія — одна сторінка, теми йдуть секціями. Кольорові плитки з рамкою ведуть на правило, внизу кожного запису — зв’язки.</p>
      <div class="cards">${cats.filter((c) => !c.hidden).map((c) => `
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

  // ---------- модалка з розбором речення ----------
  function modalHTML(a) {
    const head = `<div class="mhead"><span class="phrase">${esc(a.text)}</span><button class="speak" data-say="${esc(a.text)}">🔈</button>${a.entry ? `<a class="mopen" href="${a.entry.href}">open in page · відкрити на сторінці →</a>` : ''}</div>`;
    if (a.entry) return head + entryHTML(a.entry, true);
    const wordsHTML = a.words.map((w) => `<div class="mword"><div class="mw">${esc(w.word)}</div><div class="parts">${w.segs.map((g) => {
      const rule = g.key ? norm(g.key).flatMap(rulesFor)[0] : null;
      const inner = `<b>${esc(g.m)}</b>${g.en ? `<u>${esc(g.en)}</u>` : '<u>?</u>'}${g.uk ? `<i>${esc(g.uk)}</i>` : ''}`;
      return rule ? `<a class="part ${g.t} linked" href="${rule.entry.href}">${inner}</a>` : `<span class="part ${g.t}">${inner}</span>`;
    }).join('')}</div></div>`).join('');
    const toks = new Set(); a.words.forEach((w) => w.segs.forEach((g) => { if (g.key) norm(g.key).forEach((x) => toks.add(x)); else if (g.t !== 'suffix') toks.add(g.m); }));
    const rel = all.filter((e) => e.c.id !== 'grammar' && [...toks].some((t) => e.tokens.has(t))).slice(0, 6);
    const rules = new Map(); [...toks].forEach((t) => rulesFor(t).forEach((r) => rules.set(r.entry.href, r.entry)));
    const links = [];
    if (rules.size) links.push(`<div class="rels"><span class="k">rules · правила</span>${[...rules.values()].map(linkChip).join('')}</div>`);
    if (rel.length) links.push(`<div class="rels"><span class="k">related · схоже</span>${rel.map(linkChip).join('')}</div>`);
    return head + `<p class="mnote">Automatic breakdown · автоматичний розбір (approximate; ? = unknown morpheme)</p><div class="mwords">${wordsHTML}</div>${links.length ? `<aside class="graph">${links.join('')}</aside>` : ''}`;
  }
  function openModal(text) {
    const a = analyze(text);
    $('modalBody').innerHTML = modalHTML(a);
    $('modal').classList.add('open');
    $('modalBody').querySelectorAll('.speak').forEach((b) => b.addEventListener('click', () => speak(b.dataset.say)));
    $('modalBody').querySelectorAll('a[href^="#"]').forEach((l) => l.addEventListener('click', closeModal));
  }
  function closeModal() { $('modal').classList.remove('open'); }
  const isTurkishText = (t) => /[a-zA-ZçğıöşüÇĞİÖŞÜ]/.test(t) && !/[а-яіїєґА-ЯІЇЄҐ]/.test(t) && !/^[\d\s.,:;/–—-]*$/.test(t);

  // тема: night / day, запам'ятовується у localStorage (може бути недоступний)
  function applyTheme(t) {
    if (t) document.documentElement.dataset.theme = t; else delete document.documentElement.dataset.theme;
    const dark = t ? t === 'night' : matchMedia('(prefers-color-scheme: dark)').matches;
    $('themeBtn').textContent = dark ? '☀' : '☾';
  }
  function initTheme() {
    let t = document.documentElement.dataset.theme || null; try { t = localStorage.getItem('idioma-theme') || t; } catch (e) {}
    applyTheme(t);
    $('themeBtn').addEventListener('click', () => {
      const dark = document.documentElement.dataset.theme ? document.documentElement.dataset.theme === 'night' : matchMedia('(prefers-color-scheme: dark)').matches;
      const next = dark ? 'day' : 'night';
      try { localStorage.setItem('idioma-theme', next); } catch (e) {}
      applyTheme(next);
    });
  }

  function start() {
    initTheme();
    buildIndex();
    buildLexicon();
    renderNav();
    renderHeader();
    render();
    if ('speechSynthesis' in window) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
    $('menuBtn').addEventListener('click', () => $('sidebar').classList.toggle('open'));
    $('search').addEventListener('input', (e) => renderSearch(e.target.value));
    document.querySelector('.brand').addEventListener('click', () => { location.hash = ''; closeMenu(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeMenu(); closeModal(); } });
    $('stage').addEventListener('click', (e) => { const ph = e.target.closest('.ph'); if (ph && !e.target.closest('a')) { e.preventDefault(); openModal(ph.dataset.ph); } });
    $('modal').addEventListener('click', (e) => { if (e.target === $('modal') || e.target.closest('.mclose')) closeModal(); });
    window.addEventListener('hashchange', render);
  }

  return { register, glossary, start, analyze, open: openModal };
})();
