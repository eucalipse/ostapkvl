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
  // Окрема сторінка однієї категорії (page.html?cat=lessons): без сайдбару, лінки на інші категорії ведуть в index.html
  const SOLO = window.IDIOMA_SOLO || null;
  const VIEW = window.IDIOMA_VIEW || null; // 'teacher' = лише записи з submit: true, без української й нотаток (сторінка для вчительки)
  const pageUrl = (id) => (BASE ? `${BASE}${id}` : `page.html?cat=${id}`);
  const homeUrl = (hash) => (BASE ? `${BASE}${hash || ''}` : `index.html${hash || ''}`);
  const $ = (id) => document.getElementById(id);
  const tt = (x) => [x.en, x.tr, x.title].filter(Boolean).map(esc).join(' · ');
  const nav = (x) => x.en ? `<span class="l1">${esc(x.en)}</span><span class="l2">${[x.tr, x.title].filter(Boolean).map(esc).join(' · ')}</span>` : esc(x.title);
  const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function register(cat) { cats.push(cat); }
  const low = (s) => LANG.lower(s);
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
  // ---------- мовний плагін (lang/<code>.js): TTS, транскрипція, визначення тексту цільової мови ----------
  let CFG = { brand: 'Idioma', sub: '', target: 'xx', native: 'uk', search: 'Пошук…', home: { title: 'Konspekt', text: '' }, footer: { cats: 'категорії', topics: 'тем', entries: 'записів' } };
  function config(def) { CFG = { ...CFG, ...def }; }
  let LANG = { code: 'xx', name: '', tts: '', isTarget: (t) => /[a-zA-Z]/.test(t), letters: 'a-z', lower: (s) => String(s).toLowerCase(), translit: null };
  function lang(def) { LANG = { ...LANG, ...def }; }
  const translit = (t) => (LANG.translit ? LANG.translit(t) : '');
  const sayOf = (s) => s.say || (LANG.isTarget(s.tr) && translit(s.tr) ? '≈ ' + translit(s.tr) : '');

  // ---------- лексикон для автоматичного розбору речень (модалка) ----------
  const phraseIndex = new Map(); // нормалізована фраза → запис
  const stemIndex = new Map();   // основа слова (без дефіса) → {en, uk}
  const suffixIndex = new Map(); // суфікс (без дефісів) → {en, uk, key}
  const morphUK = new Map();     // морфема як у parts → перший укр. опис
  const normPhrase = (s) => low(s).replace(new RegExp(`[^${LANG.letters}0-9\\s’']`, 'g'), ' ').replace(/[’']/g, '').replace(/\s+/g, ' ').trim();
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
    const w = low(raw).replace(new RegExp(`[^${LANG.letters}’']`, 'g'), '');
    const clean = w.replace(/[’']/g, '');
    if (!clean) return null;
    if (stemIndex.has(clean)) { const g = stemIndex.get(clean); return { word: raw, segs: [{ m: clean, t: 'word', en: g.en, uk: g.uk }] }; }
    let stem = null;
    if (apos > 0) { const s = low(raw.slice(0, apos)).replace(new RegExp(`[^${LANG.letters}]`, 'g'), ''); stem = { k: s, g: stemIndex.get(s) || { en: 'name / place', uk: 'власна назва' } }; }
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
    $('sidebarFoot').textContent = `${cats.length} ${CFG.footer.cats} · ${topics} ${CFG.footer.topics} · ${all.length} ${CFG.footer.entries}`;
  }
  // категорії з nav: 'header' — випадні меню в топбарі
  function renderHeader() {
    const hc = cats.filter((c) => !c.hidden && c.nav === 'header');
    $('hmenus').innerHTML = hc.map((c) => `
      <div class="hmenu" data-cat="${esc(c.id)}">
        <button class="hbtn" type="button" aria-haspopup="true" aria-expanded="false">${esc(c.en || c.title)} <span class="chev">▾</span></button>
        <div class="hdrop">
          <a class="hall" href="${c.solo ? esc(pageUrl(c.id)) : `#${esc(c.id)}`}">${tt(c)}${c.solo ? ' <span class="chev">↗ page</span>' : ''}</a>
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
    trVoice = vs.find((v) => v.lang.toLowerCase().startsWith((LANG.tts || LANG.code).toLowerCase().slice(0, 2))) || null;
  }
  function speak(text) {
    if (!('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text.replace(/[✗✓·→]/g, ' '));
    u.lang = LANG.tts || LANG.code; if (trVoice) u.voice = trVoice; u.rate = 0.85;
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
    if (s.words?.length) meta.push(`<span class="k">words · слова</span> ${s.words.map((w) => { const en = wordGloss(w); return `<b>${esc(w.tr)}</b><span class="tl">${esc(translit(w.tr))}</span>${en ? ` ${esc(en)}` : ''} <em>${esc(w.uk)}</em>${w.note ? ` <em>(${esc(w.note)})</em>` : ''}`; }).join(' · ')}`);
    if (s.forms?.length) meta.push(...s.forms.map((f) => `<span class="k">${esc(f.label)}</span> ${f.items.map((x) => `<code class="ph" data-ph="${esc(x.replace(/-/g, '').replace(/\s*\(.*$/, ''))}">${esc(x)}</code>`).join(' ')}`));
    const metaHTML = meta.length ? `<div class="meta">${meta.map((m) => `<div>${m}</div>`).join('')}</div>` : '';
    const answers = s.answers?.length ? `<div class="sec"><h4>answers · відповіді</h4><div class="examples answers">${s.answers.map((x) => `<div class="ex"><span class="tr ph" data-ph="${esc(x.tr)}">→ ${esc(x.tr)}</span><span class="tl">${esc(translit(x.tr))}</span>${x.en ? `<span class="en">${esc(x.en)}</span>` : ''}<span class="uk">${esc(x.uk)}</span></div>`).join('')}</div></div>` : '';
    const examples = s.examples?.length ? `<div class="examples">${s.examples.map((x) => `<div class="ex"><span class="tr ph" data-ph="${esc(x.tr)}">${esc(x.tr)}</span><span class="tl">${esc(translit(x.tr))}</span>${x.en ? `<span class="en">${esc(x.en)}</span>` : ''}<span class="uk">${esc(x.uk)}</span></div>`).join('')}</div>` : '';
    // Таблиці: транскрипція НЕ окремою колонкою, а дрібним курсивом під турецьким словом (правило користувача, 19.10.2026).
    // Колонка «Вимова» в даних (одразу після слова) ховається, її значення йде під слово; інші турецькі клітинки отримують авто-транскрипцію.
    const T = s.table; const tHead = T ? T.head || [] : [];
    const pronCol = tHead.findIndex((h) => /вимова/i.test(h));
    const tHide = (ci) => ci === pronCol || (VIEW === 'teacher' && (T.teacherHide || []).includes(ci));
    const cellHTML = (r, c, ci) => {
      const tr = isTurkishText(c) && !NON_TR_COL.test(tHead[ci] || '');
      const pron = ci === pronCol - 1 && r[pronCol] ? r[pronCol] : (tr ? translit(c) : '');
      const word = tr ? `<span class="ph" data-ph="${esc(c)}">${esc(c)}</span>` : esc(c);
      return word + (pron ? `<span class="tl tcell">${esc(pron)}</span>` : '');
    };
    const table = T ? `<table class="tbl${T.prose ? ' prose' : ''}">${T.title ? `<caption>${esc(T.title)}</caption>` : ''}
      <thead><tr>${tHead.map((h, ci) => tHide(ci) ? '' : `<th>${esc(h)}</th>`).join('')}</tr></thead>
      <tbody>${T.rows.map((r, ri) => `<tr>${r.map((c, ci) => { if (tHide(ci)) return ''; const sp = (T.spoiler || []).includes(ci) && VIEW !== 'teacher'; if (VIEW === 'teacher' && (T.blank || []).includes(ri) && (T.blankCols || T.spoiler || []).includes(ci)) return '<td class="blank">……………</td>'; const inner = cellHTML(r, c, ci); return sp ? `<td><span class="spoiler" title="click to reveal · клік відкриває">${inner}</span></td>` : `<td>${inner}</td>`; }).join('')}</tr>`).join('')}</tbody></table>` : '';
    const dialogue = s.dialogue?.length ? `<div class="dialogue">${s.dialogue.map((l) => `
      <div class="line${l.me ? ' me' : ''}"><span class="who">${esc(l.who)}</span><span class="tr ph" data-ph="${esc(l.tr)}">${esc(l.tr)}</span><span class="uk"><span class="tl">${esc(translit(l.tr))}</span> ${l.en ? `<span class="en">${esc(l.en)}</span>` : ''}<span class="ukt">${l.en ? ' · ' : ''}${esc(l.uk)}</span></span></div>`).join('')}</div>` : '';
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
        ${sayOf(s) ? `<span class="say">${esc(sayOf(s))}</span>` : ''}
      </div>
      <div class="trans">${s.en ? `<span class="en">${esc(s.en)}</span>` : ''}<span class="uk">${esc(s.uk)}</span></div>
      <div class="body">${parts}${metaHTML}${answers}${examples}${table}${dialogue}${notes}</div>${graph}
    </div>`;
  }

  function catHTML(c) {
    const entries = all.filter((e) => e.c === c && (VIEW !== 'teacher' || e.s.submit));
    const topics = c.topics.filter((t) => !t.hidden && (VIEW !== 'teacher' || entries.some((e) => e.t === t)));
    if (VIEW === 'teacher') return `<div class="doc">
      <h1>${esc(CFG.teacherHeading || c.en || c.title)}</h1>
      <p class="tview-intro">${esc(CFG.teacherIntro || '')}</p>
      ${topics.map((t) => `
        <section class="topic-sec" id="${esc(t.id)}">
          <h2>${esc(t.en || t.title)}</h2>
          ${entries.filter((e) => e.t === t).map((e) => entryHTML(e)).join('')}
        </section>`).join('')}
    </div>`;
    return `<div class="doc">
      <h1>${tt(c)}</h1>
      <div class="legend"><span class="part root"><b>root · корінь</b></span><span class="part suffix"><b>suffix · суфікс</b></span><span class="part word"><b>word · слово</b></span><span class="part particle"><b>particle · частка</b></span><span class="hint">outlined tile = click opens the rule · плитка з рамкою веде на правило</span></div>
      ${c.topics.filter((t) => !t.hidden).map((t) => `
        <section class="topic-sec" id="${esc(t.id)}">
          <h2>${tt(t)}${t.source ? (t.source.image ? `<a class="src" href="${esc(BASE + t.source.image)}" target="_blank" title="${esc(t.source.label)}">source · джерело</a>` : `<span class="src" title="${esc(t.source.label)}">${esc(t.source.label)}</span>`) : ''}</h2>
          ${entries.filter((e) => e.t === t).map((e) => entryHTML(e)).join('')}
        </section>`).join('')}
    </div>`;
  }

  function homeHTML() {
    return `<div class="doc home">
      <h1>${esc(CFG.home.title)}</h1>
      <p>${esc(CFG.home.text)}</p>
      <div class="cards">${cats.filter((c) => !c.hidden).map((c) => `
        <a class="card" href="#${esc(c.id)}"><div class="t">${tt(c)}</div><div class="s">${c.topics.map((t) => esc(t.en || t.title)).join(' · ')}</div></a>`).join('')}</div>
    </div>`;
  }

  // ---------- рендер ----------
  function render() {
    let [catId, anchor] = location.hash.replace('#', '').split('/');
    if (SOLO) { if (catId !== SOLO) { anchor = catId; } catId = SOLO; }
    const c = findCat(catId);
    state.cat = c ? c.id : null;
    markActive();
    const stage = $('stage');
    if (!c) { stage.innerHTML = homeHTML(); stage.dataset.cat = ''; $('crumbs').innerHTML = '<b>Головна</b>'; runHooks(null); return; }
    if (stage.dataset.cat !== c.id) {
      stage.innerHTML = catHTML(c); stage.dataset.cat = c.id;
      stage.querySelectorAll('.speak').forEach((b) => b.addEventListener('click', () => speak(b.dataset.say)));
    }
    $('crumbs').innerHTML = VIEW === 'teacher' ? `<b>${esc(CFG.teacherTitle || c.en || c.title)}</b>` : SOLO ? `<a class="back" href="${esc(homeUrl(''))}">← ${esc(CFG.brand)}</a> · <b>${tt(c)}</b>` : `<b>${tt(c)}</b>`;
    document.querySelectorAll('.entry.hl').forEach((x) => x.classList.remove('hl'));
    if (anchor) {
      const el = document.getElementById(anchor);
      if (el) { el.scrollIntoView({ block: 'start' }); if (el.classList.contains('entry')) el.classList.add('hl'); }
    } else {
      window.scrollTo({ top: 0 });
    }
    runHooks(c);
  }
  // хуки після рендеру сторінки (teacher.js домальовує нотатки на полях); rerender() перемальовує поточну сторінку з нуля
  const renderHooks = [];
  const onRender = (fn) => renderHooks.push(fn);
  const runHooks = (c) => renderHooks.forEach((fn) => { try { fn(c); } catch (err) { console.error(err); } });
  function rerender() { const stage = $('stage'); stage.dataset.cat = ''; const y = window.scrollY; render(); window.scrollTo({ top: y }); }
  function closeMenu() { $('sidebar').classList.remove('open'); }

  // ---------- окрема сторінка: сайдбар = список усіх фраз категорії (що треба вивчити), клік = розбір у панелі ----------
  function phrasesOf(c) {
    const seen = new Set(); const out = [];
    const add = (t, tr, en, uk) => {
      if (!tr || !isTurkishText(tr) || /_{3,}/.test(tr)) return;
      const key = normPhrase(tr); if (!key || seen.has(key)) return; seen.add(key);
      const hit = phraseIndex.get(key);
      if (!hit) { // не запис конспекту: беремо лише те, що аналізатор упізнає як турецьке (хоч половина слів зі знайомою основою/суфіксом)
        const a = analyze(tr); const known = a.words.filter((w) => w.segs.some((g) => g.en)).length;
        if (!/[çğışöüİ]/.test(tr) && known < Math.ceil(a.words.length / 2)) return;
        if (known === 0) return;
      }
      if (!en && !uk && hit) { en = hit.s.en; uk = hit.s.uk; }
      out.push({ t, tr: tr.trim(), en: en || '', uk: uk || '' });
    };
    all.filter((e) => e.c === c && (VIEW !== 'teacher' || e.s.submit)).forEach((e) => {
      const s = e.s, t = e.t;
      if (!s.status && !s.table) add(t, s.tr, s.en, s.uk);
      (s.dialogue || []).forEach((l) => add(t, l.tr, l.en, l.uk));
      (s.examples || []).forEach((x) => add(t, x.tr, x.en, x.uk));
      (s.answers || []).forEach((x) => add(t, x.tr, x.en, x.uk));
      if (s.table) {
        const head = s.table.head || []; const enCol = head.findIndex((h) => /english/i.test(h)); const ukCol = head.findIndex((h) => /укра/i.test(h));
        s.table.rows.forEach((r) => r.forEach((cell, ci) => {
          if (NON_TR_COL.test(head[ci] || '')) return;
          // «A — B» у клітинці = окремі репліки; переклади в колонках English/Українська розбиті так само, тож пари беремо за індексом
          const parts = String(cell).split(/\s+—\s+/); const ens = enCol >= 0 ? String(r[enCol] || '').split(/\s+—\s+/) : []; const uks = ukCol >= 0 ? String(r[ukCol] || '').split(/\s+—\s+/) : [];
          parts.forEach((part, pi) => add(t, part, parts.length === ens.length ? ens[pi] : '', parts.length === uks.length ? uks[pi] : ''));
        }));
      }
    });
    return out;
  }
  function renderSoloNav(c) {
    // ліворуч: на сторінці уроків лише уроки (теми без hw-), на сторінці вчительки лише домашні (теми з записами submit)
    const isHw = (t) => /^hw-/.test(t.id);
    const topics = c.topics.filter((t) => !t.hidden && (VIEW === 'teacher' ? all.some((e) => e.t === t && e.s.submit) : !isHw(t)));
    const label = (t) => (VIEW === 'teacher' ? esc(t.en || t.title) : nav(t));
    const head = VIEW === 'teacher' ? `<span class="l1">Homework</span><span class="l2">Ödev</span>` : nav(c);
    $('nav').innerHTML = `<div class="cat active" data-cat="${esc(c.id)}">
        <div class="cat-head" data-cat="${esc(c.id)}"><span class="lbl">${head}</span><span class="n">${topics.length}</span></div>
        <div class="topics">${topics.map((t) => `<a class="topic" href="#${esc(c.id)}/${esc(t.id)}">${label(t)}</a>`).join('')}</div>
      </div>`;
    $('nav').querySelectorAll('.topic').forEach((a) => a.addEventListener('click', closeMenu));
    $('sidebarFoot').textContent = `${topics.length} ${CFG.footer.topics} · ${all.filter((e) => e.c === c && (VIEW !== 'teacher' || e.s.submit)).length} ${CFG.footer.entries}`;
    if (VIEW === 'teacher') return;
    // праворуч: усі фрази категорії
    const list = phrasesOf(c);
    // групи = теми: урок окремо, домашнє окремо (прохання користувача 19.10.2026)
    const groups = new Map();
    list.forEach((x) => { const k = x.t.id; if (!groups.has(k)) groups.set(k, { label: x.t.en || x.t.title, xs: [] }); groups.get(k).xs.push(x); });
    const box = $('phrasesList'); if (!box) return;
    box.innerHTML = [...groups.values()].map((g) => `
      <div class="lp-topic"><div class="lp-t">${esc(g.label)} · ${g.xs.length}</div>${g.xs.map((x) => `<a class="lp ph" data-ph="${esc(x.tr)}" href="#"><b>${esc(x.tr)}</b><i>${esc(translit(x.tr))}</i>${x.en || x.uk ? `<span>${esc(x.en)}${x.en && x.uk ? ' · ' : ''}${esc(x.uk)}</span>` : ''}</a>`).join('')}</div>`).join('');
    $('phrasesN').textContent = list.length;
    $('phrases').hidden = false; $('phrasesBtn').hidden = false; $('phrasesBtn').textContent = `Phrases · ${list.length}`;
    box.querySelectorAll('.lp').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); openModal(a.dataset.ph); $('phrases').classList.remove('open'); }));
    $('phrasesFilter').oninput = (e) => { const q = low(e.target.value.trim()); box.querySelectorAll('.lp').forEach((a) => { a.hidden = !!q && !low(a.textContent).includes(q); }); box.querySelectorAll('.lp-topic').forEach((d) => { d.hidden = !!q && ![...d.querySelectorAll('.lp')].some((a) => !a.hidden); }); };
    $('phrasesBtn').addEventListener('click', () => $('phrases').classList.toggle('open'));
    $('phrasesClose').addEventListener('click', () => $('phrases').classList.remove('open'));
  }

  // ---------- модалка з розбором речення ----------
  function modalHTML(a) {
    const head = `<div class="mhead"><span class="phrase">${esc(a.text)}</span><button class="speak" data-say="${esc(a.text)}">🔈</button><span class="say">≈ ${esc(translit(a.text))}</span>${a.entry ? `<a class="mopen" href="${a.entry.href}">open in page · відкрити →</a>` : ''}</div>`;
    if (a.entry) return head + entryHTML(a.entry, true);
    const wordsHTML = a.words.map((w) => `<div class="mword"><div class="mw">${esc(w.word)}<span class="tl">${esc(translit(w.word))}</span></div><div class="parts">${w.segs.map((g) => {
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
  function panel(html) {
    $('modalBody').innerHTML = html; $('modal').classList.add('open');
    $('modalBody').querySelectorAll('.speak').forEach((b) => b.addEventListener('click', () => speak(b.dataset.say)));
  }

  // ---------- словник: усі слова з усіх записів, за категоріями ----------
  function vocabulary() {
    const byCat = new Map();
    const add = (e, tr, en, uk) => {
      const key = low(tr).replace(/\s*\(.*$/, '').trim(); if (!key || key.length < 2) return;
      if (!byCat.has(e.c)) byCat.set(e.c, new Map());
      const m = byCat.get(e.c);
      if (!m.has(key)) m.set(key, { tr: tr.replace(/\s*\(.*$/, ''), en: en || '', uk: (uk || '').replace(/<[^>]+>/g, ''), href: e.href, where: e.s.tr });
    };
    all.forEach((e) => {
      if (e.c.id === 'verbs' || e.c.id === 'grammar' || e.c.id === 'series' || e.c.id === 'homework' || e.c.id === 'course' || e.c.id === 'lessons') return;
      (e.s.words || []).forEach((w) => add(e, w.tr, wordGloss(w), w.uk));
      (e.s.parts || []).forEach((p) => { if (p.t === 'word' && !/\s/.test(p.m)) add(e, p.m, p.e || glossOf(p.m), p.d); });
    });
    return byCat;
  }
  function openWords() {
    const v = vocabulary();
    let total = 0;
    const secs = [...v.entries()].map(([c, m]) => {
      const items = [...m.values()].sort((a, b) => a.tr.localeCompare(b.tr, 'tr'));
      total += items.length;
      return `<section class="wsec"><h3>${c.icon || ''} ${tt(c)} <span>${items.length}</span></h3><div class="wgrid">${items.map((w) => `
        <a class="w" href="${w.href}" title="${esc(w.where)}"><b>${esc(w.tr)}</b><span>${esc(w.en)}</span><i>${esc(w.uk)}</i></a>`).join('')}</div></section>`;
    }).join('');
    $('modalBody').innerHTML = `<div class="mhead"><span class="phrase">📖 Words · Kelimeler · Словник</span></div>
      <p class="mnote">${total} words from all phrases, by category · слів з усіх фраз, за категоріями · click = open the phrase</p>${secs}`;
    $('modal').classList.add('open');
    $('modalBody').querySelectorAll('a[href^="#"]').forEach((l) => l.addEventListener('click', closeModal));
  }

  // ---------- статистика ----------
  function stats() {
    const visible = cats.filter((c) => !c.hidden);
    const entries = all; // уже без hidden
    const verbs = entries.filter((e) => e.c.id === 'verbs').length;
    const adjSet = new Set();
    entries.forEach((e) => {
      if (!e.s.id || !e.s.id.startsWith('adj-') || !e.s.table) return;
      e.s.table.rows.forEach((r) => {
        [r[0], e.s.id === 'adj-pairs' ? r[4] : null].filter(Boolean).forEach((cell) => cell.split('/').forEach((w) => adjSet.add(low(w).trim())));
      });
    });
    const WORDLIST = (e) => e.s.id && /^(adj-|yesno-|num-)/.test(e.s.id);
    const PHRASE_CATS = (e) => !['verbs', 'grammar', 'course', 'homework', 'numbers', 'series', 'lessons'].includes(e.c.id) && !WORDLIST(e);
    const phrases = entries.filter(PHRASE_CATS).length;
    const rules = entries.filter((e) => e.c.id === 'grammar').length;
    let sentences = 0, dialogues = 0, lines = 0;
    entries.forEach((e) => { sentences += (e.s.examples || []).length + (e.s.answers || []).length; if (e.s.dialogue?.length) { dialogues++; lines += e.s.dialogue.length; } });
    const hw = entries.filter((e) => e.c.id === 'lessons' && e.s.status);
    const hwDone = hw.filter((e) => e.s.status === 'done').length;
    const vocab = Object.keys(gloss).filter((k) => !k.startsWith('-') && !k.endsWith('-')).length;
    const morph = Object.keys(gloss).filter((k) => k.startsWith('-') || k.endsWith('-')).length;
    const byCat = visible.map((c) => ({ c, n: entries.filter((e) => e.c === c).length, t: c.topics.filter((t) => !t.hidden).length }));
    const sources = new Set(); visible.forEach((c) => c.topics.forEach((t) => { if (t.source?.label) sources.add(t.source.label); }));
    return { verbs, adjectives: adjSet.size, phrases, rules, sentences, dialogues, lines, hw: hw.length, hwDone, vocab, morph, byCat, topics: byCat.reduce((n, x) => n + x.t, 0), entries: entries.length, sources: sources.size, numbers: entries.filter((e) => e.c.id === 'numbers').length };
  }
  function openStats() {
    const s = stats();
    const tile = (n, en, uk, href) => `<a class="stile" href="${href || '#'}"><b>${n}</b><span>${en}</span><i>${uk}</i></a>`;
    const html = `<div class="mhead"><span class="phrase">📊 Stats · İstatistik · Статистика</span></div>
      <div class="stiles">
        ${tile(s.phrases, 'phrases', 'фраз', '#greetings')}
        ${tile(s.verbs, 'verbs', 'дієслів', '#verbs')}
        ${tile(s.adjectives, 'adjectives', 'прикметників', '#basics/adjectives')}
        ${tile(s.rules, 'grammar rules', 'правил граматики', '#grammar')}
        ${tile(s.vocab, 'glossary words', 'слів у глосарії', '#')}
        ${tile(s.morph, 'suffixes & roots', 'суфіксів і коренів', '#grammar/suffixes')}
        ${tile(s.sentences, 'example sentences', 'речень у прикладах', '#')}
        ${tile(s.lines, 'dialogue lines', 'реплік у діалогах', '#greetings/dialogues')}
        ${tile(`${s.hwDone} / ${s.hw}`, 'homework done', 'домашніх зроблено', '#lessons')}
      </div>
      <p class="mnote">${s.entries} entries · ${s.topics} topics · ${s.sources} sources · записів · тем · джерел</p>
      <table class="tbl"><thead><tr><th>Category · категорія</th><th>Topics</th><th>Entries</th></tr></thead>
      <tbody>${s.byCat.map((x) => `<tr><td><a href="#${esc(x.c.id)}">${x.c.icon || ''} ${tt(x.c)}</a></td><td>${x.t}</td><td>${x.n}</td></tr>`).join('')}</tbody></table>
      <ul class="notes"><li><span class="en">Phrases = entries in situation categories (greetings, about me, café, shopping, basics, chats), excluding word-list tables. Adjectives = unique words in the adjective tables. Glossary = words with an English gloss available for the automatic breakdown.</span><span class="uk">Фрази = записи в ситуативних категоріях без таблиць-списків. Прикметники = унікальні слова з таблиць прикметників. Глосарій = слова з англійським глосом для автоматичного розбору.</span></li></ul>`;
    $('modalBody').innerHTML = html;
    $('modal').classList.add('open');
    $('modalBody').querySelectorAll('a[href^="#"]').forEach((l) => { if (l.getAttribute('href') === '#') l.removeAttribute('href'); else l.addEventListener('click', closeModal); });
  }
  // колонки таблиць, у яких не турецький текст (переклади, вимова, пояснення) — не клікабельні
  const NON_TR_COL = /english|вимова|укра|переклад|^як$|де було|підказка|розбір|правило|значення|^#$|число|who|material|what is in it|конспект|why|video|source|what to do|scrambled|karışık/i;
  const isTurkishText = (t) => LANG.isTarget(t) && !/[а-яіїєґА-ЯІЇЄҐ]/.test(t) && !/^[\d\s.,:;/–—-]*$/.test(t);

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
    document.querySelector('.brand-title').textContent = CFG.brand; document.querySelector('.brand-sub').textContent = CFG.sub; $('search').placeholder = CFG.search; document.title = CFG.title || `${CFG.brand} · ${LANG.name || ''}`;
    if (CFG.site && $('brandSite')) { const a = $('brandSite'); a.textContent = `← ${CFG.site.label}`; a.href = CFG.site.url; a.hidden = false; }
    initTheme();
    if (SOLO) {
      document.body.classList.add('solo');
      if (VIEW === 'teacher') document.body.classList.add('tview');
      const c = findCat(SOLO);
      $('crumbs').innerHTML = `<a class="back" href="${esc(homeUrl(''))}">← ${esc(CFG.brand)}</a>`;
      if (c) { document.querySelector('.brand-sub').textContent = VIEW === 'teacher' ? (CFG.teacherTitle || 'Homework') : `${c.en || c.title} · ← ${CFG.brand}`; const bs = $('brandSite'); if (bs) bs.hidden = true; }
      if (c) document.title = `${c.en || c.title} · ${CFG.brand}`;
      // лінки на інші категорії ведуть у повний конспект
      document.addEventListener('click', (e) => {
        const a = e.target.closest('a[href^="#"]'); if (!a) return;
        const target = a.getAttribute('href').slice(1).split('/')[0];
        if (target && target !== SOLO && findCat(target)) { e.preventDefault(); location.href = homeUrl(a.getAttribute('href')); }
      });
    }
    buildIndex();
    buildLexicon();
    if (SOLO) { const c = findCat(SOLO); if (c) renderSoloNav(c); } else renderNav();
    if (!SOLO) renderHeader();
    render();
    if ('speechSynthesis' in window) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
    $('menuBtn').addEventListener('click', (e) => { e.stopPropagation(); $('sidebar').classList.toggle('open'); });
    $('main').addEventListener('click', () => { if ($('sidebar').classList.contains('open')) closeMenu(); });
    $('statsBtn').addEventListener('click', openStats);
    $('todayBtn').addEventListener('click', () => IDIOMA.practice?.openToday());
    $('wordsBtn').addEventListener('click', openWords);
    $('search').addEventListener('input', (e) => renderSearch(e.target.value));
    document.querySelector('.brand').addEventListener('click', () => { if (SOLO) { location.href = homeUrl(''); return; } location.hash = ''; closeMenu(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeMenu(); closeModal(); } });
    $('stage').addEventListener('click', (e) => {
      const sp = e.target.closest('.spoiler'); if (sp && !sp.classList.contains('open')) { e.preventDefault(); sp.classList.add('open'); return; } // схована відповідь: перший клік лише відкриває
      const ph = e.target.closest('.ph'); if (ph && !e.target.closest('a')) { e.preventDefault(); openModal(ph.dataset.ph); }
    });
    $('modal').addEventListener('click', (e) => { if (e.target === $('modal') || e.target.closest('.mclose')) closeModal(); });
    window.addEventListener('hashchange', render);
  }

  return { register, glossary, lang, config, start, analyze, open: openModal, translit, stats, openStats, openWords, vocabulary,
    entries: () => all, panel, closePanel: closeModal, speak, sayOf, glossOf, langCode: () => LANG.code, cfg: () => CFG, onRender, rerender, findEntry: (id) => all.find((e) => e.href === '#' + id) || null };
})();
