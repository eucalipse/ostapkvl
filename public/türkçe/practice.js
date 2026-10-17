// Практика: картки з розкладом повторення (FSRS-lite) + панель «Today». Стан у localStorage; синк у Supabase через sync.js, якщо є.
// Публічний API: IDIOMA.practice = { openToday, start, state, due, grade }
(() => {
  const KEY = () => `idioma-review-${(IDIOMA.langCode && IDIOMA.langCode()) || 'xx'}`;
  const INTERVALS = [0, 1, 3, 7, 14, 30, 60, 120]; // дні; крок 0 = ще раз сьогодні
  const NEW_PER_DAY = 10;
  const PHRASE_CATS_EXCLUDE = new Set(['verbs', 'grammar', 'course', 'homework', 'numbers', 'series']);
  let state = {}; // id → { step, due, reps, lapses, last }
  let queue = []; let idx = 0; let revealed = false; let dir = 'tr-en';
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const today = () => new Date().toISOString().slice(0, 10);
  const dayMs = 86400000;

  function load() { try { state = JSON.parse(localStorage.getItem(KEY()) || '{}'); } catch (e) { state = {}; } }
  function save() { try { localStorage.setItem(KEY(), JSON.stringify(state)); } catch (e) {} IDIOMA.sync?.push?.(state); }

  // кандидати: записи з ситуативних категорій, без таблиць-списків
  const cards = () => IDIOMA.entries().filter((e) => !PHRASE_CATS_EXCLUDE.has(e.c.id) && !(e.s.id && /^(adj-|yesno-|num-|story-full|hw)/.test(e.s.id)) && e.s.en && !e.s.table);
  const idOf = (e) => e.href.slice(1);
  function due() { const now = Date.now(); return cards().filter((e) => state[idOf(e)] && state[idOf(e)].due <= now); }
  function fresh() { return cards().filter((e) => !state[idOf(e)]); }
  function doneToday() { const t = today(); return Object.values(state).filter((s) => s.last && s.last.slice(0, 10) === t).length; }
  function newToday() { const t = today(); return Object.values(state).filter((s) => s.first && s.first.slice(0, 10) === t).length; }

  function grade(e, ok) {
    const id = idOf(e); const s = state[id] || { step: 0, reps: 0, lapses: 0, first: new Date().toISOString() };
    if (ok) { s.step = Math.min(s.step + 1, INTERVALS.length - 1); s.reps++; }
    else { s.step = 0; s.lapses++; }
    const days = INTERVALS[s.step];
    s.due = days === 0 ? Date.now() + 10 * 60 * 1000 : Date.now() + days * dayMs;
    s.last = new Date().toISOString();
    state[id] = s; save();
    return days;
  }
  const fmtIn = (days) => days === 0 ? 'in 10 min · за 10 хв' : days === 1 ? 'tomorrow · завтра' : days < 30 ? `in ${days} days · за ${days} дн.` : `in ${Math.round(days / 30)} mo · за ${Math.round(days / 30)} міс.`;

  // ---------- Today ----------
  function openToday() {
    load();
    const d = due().length, n = Math.max(0, Math.min(NEW_PER_DAY - newToday(), fresh().length)), done = doneToday();
    const st = IDIOMA.stats();
    const hw = IDIOMA.entries().filter((e) => e.c.id === 'homework');
    const html = `<div class="mhead"><span class="phrase">Today · Bugün · Сьогодні</span></div>
      <p class="mnote">${today()} · ${IDIOMA.sync?.status?.() || 'local only · лише локально'}</p>
      <div class="stiles">
        <a class="stile" id="startPractice"><b>${d + n}</b><span>cards to practise</span><i>${d} due · ${n} new · карток</i></a>
        <span class="stile"><b>${done}</b><span>done today</span><i>зроблено сьогодні</i></span>
        <span class="stile"><b>${Object.keys(state).length}</b><span>phrases in rotation</span><i>фраз у повторенні · of ${cards().length}</i></span>
      </div>
      <div class="pbtns"><button class="pbtn primary" id="pStart">Practice · Практика (${d + n})</button><button class="pbtn" id="pStartEnTr">EN → TR</button></div>
      <h4 class="k" style="margin-top:18px">homework · домашнє</h4>
      <ul class="plist">${hw.map((e) => `<li><a href="${e.href}">${esc(e.s.tr)}</a> <span class="status ${esc(e.s.status || '')}">${e.s.status === 'done' ? 'done' : 'to do'}</span></li>`).join('') || '<li class="muted">nothing assigned · нічого не задано</li>'}</ul>
      <h4 class="k" style="margin-top:18px">weakest · найслабші</h4>
      <ul class="plist">${weakest(6).map((e) => `<li><a href="${e.href}">${esc(e.s.tr)}</a> <span class="muted">${state[idOf(e)].lapses} lapses</span></li>`).join('') || '<li class="muted">no data yet · ще нема даних</li>'}</ul>
      <p class="mnote" style="margin-top:18px">${st.phrases} phrases · ${st.verbs} verbs · ${st.rules} rules · progress to A1 ≈ ${Math.min(100, Math.round(st.phrases / 180 * 100))}%</p>
      ${IDIOMA.teacher?.todayHTML?.() || ''}
      <div id="authBox"></div>`;
    IDIOMA.panel(html);
    $('pStart').addEventListener('click', () => start('tr-en'));
    $('pStartEnTr').addEventListener('click', () => start('en-tr'));
    $('startPractice').addEventListener('click', () => start('tr-en'));
    IDIOMA.sync?.renderAuth?.($('authBox'));
    IDIOMA.teacher?.bindToday?.();
  }
  function weakest(n) { return cards().filter((e) => state[idOf(e)] && state[idOf(e)].lapses > 0).sort((a, b) => state[idOf(b)].lapses - state[idOf(a)].lapses).slice(0, n); }

  // ---------- Practice ----------
  function start(direction) {
    load(); dir = direction || 'tr-en';
    const n = Math.max(0, Math.min(NEW_PER_DAY - newToday(), fresh().length));
    queue = [...due().sort((a, b) => state[idOf(a)].due - state[idOf(b)].due), ...shuffle(fresh()).slice(0, n)];
    idx = 0; revealed = false;
    if (!queue.length) { IDIOMA.panel(`<div class="mhead"><span class="phrase">Nothing due · Нема що повторювати</span></div><p class="mnote">come back tomorrow · приходь завтра</p><button class="pbtn" id="pBack">← Today</button>`); $('pBack').addEventListener('click', openToday); return; }
    render();
  }
  function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function render() {
    if (idx >= queue.length) { IDIOMA.panel(`<div class="mhead"><span class="phrase">Done · Bitti · Готово</span></div><p class="mnote">${queue.length} cards · ${doneToday()} today</p><button class="pbtn primary" id="pBack">← Today</button>`); $('pBack').addEventListener('click', openToday); return; }
    const e = queue[idx]; const s = e.s; const isNew = !state[idOf(e)];
    const prompt = dir === 'tr-en' ? `<div class="pprompt">${esc(s.tr)}</div><div class="psay">${esc(IDIOMA.sayOf ? IDIOMA.sayOf(s) : s.say || '')}</div>` : `<div class="pprompt en">${esc(s.en)}</div><div class="psay">${esc(s.uk)}</div>`;
    const answer = dir === 'tr-en' ? `<div class="pans"><b>${esc(s.en)}</b><span>${esc(s.uk)}</span></div>` : `<div class="pans"><b class="tr">${esc(s.tr)}</b><span>${esc(IDIOMA.sayOf ? IDIOMA.sayOf(s) : s.say || '')}</span></div>`;
    const parts = (s.parts || []).map((p) => `<span class="part ${esc(p.t)}"><b>${esc(p.m)}</b><u>${esc(p.e || IDIOMA.glossOf?.(p.m) || '')}</u></span>`).join('');
    IDIOMA.panel(`<div class="mhead"><span class="phrase">Practice</span><span class="mnote">${idx + 1} / ${queue.length} · ${isNew ? 'new · нова' : 'review · повтор'} · ${esc(e.t.en || e.t.title)}</span></div>
      <div class="pcard">
        <div class="pq">${dir === 'tr-en' ? 'what does it mean? · що це означає?' : 'how do you say it? · як це сказати?'}</div>
        ${prompt}
        <div class="pbody">${revealed ? `${answer}<div class="parts" style="margin-top:10px">${parts}</div><p class="plink"><a href="${e.href}">open entry · відкрити запис →</a> <button class="speak" data-say="${esc(s.tr)}">🔈</button></p>` : `<button class="pbtn" id="pReveal">Reveal · Показати <kbd>space</kbd></button>`}</div>
        ${revealed ? `<div class="pgrades"><button class="pbtn" id="pAgain">Again · Ще раз <kbd>1</kbd><small>${fmtIn(0)}</small></button><button class="pbtn primary" id="pOk">Remembered · Згадав <kbd>2</kbd><small>${fmtIn(INTERVALS[Math.min((state[idOf(e)]?.step || 0) + 1, INTERVALS.length - 1)])}</small></button></div>` : ''}
      </div>
      <button class="pbtn ghost" id="pBack">← Today</button>`);
    $('pBack').addEventListener('click', openToday);
    if (!revealed) $('pReveal').addEventListener('click', reveal);
    else { $('pAgain').addEventListener('click', () => answerCard(false)); $('pOk').addEventListener('click', () => answerCard(true)); document.querySelectorAll('#modalBody .speak').forEach((b) => b.addEventListener('click', () => IDIOMA.speak?.(b.dataset.say))); document.querySelectorAll('#modalBody a[href^="#"]').forEach((l) => l.addEventListener('click', () => IDIOMA.closePanel())); }
  }
  function reveal() { revealed = true; render(); if (dir === 'en-tr') IDIOMA.speak?.(queue[idx].s.tr); }
  function answerCard(ok) { grade(queue[idx], ok); idx++; revealed = false; render(); }
  document.addEventListener('keydown', (ev) => {
    if (!document.getElementById('modal')?.classList.contains('open') || !queue.length || idx >= queue.length) return;
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(ev.target.tagName) || ev.target.isContentEditable) return;
    if (!document.querySelector('#modalBody .pcard')) return;
    if (ev.key === ' ' && !revealed) { ev.preventDefault(); reveal(); }
    else if (revealed && ev.key === '1') answerCard(false);
    else if (revealed && ev.key === '2') answerCard(true);
  });

  IDIOMA.practice = { openToday, start, due, grade, state: () => state, load, merge: (remote) => { load(); Object.entries(remote || {}).forEach(([id, r]) => { const l = state[id]; if (!l || (r.last || '') > (l.last || '')) state[id] = r; }); try { localStorage.setItem(KEY(), JSON.stringify(state)); } catch (e) {} } };
  document.addEventListener('DOMContentLoaded', () => { load(); const b = document.getElementById('todayBtn'); if (b) b.addEventListener('click', openToday); });
})();
