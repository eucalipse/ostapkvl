// Режим вчителя: запрошення, перемикач «чий конспект», нотатки на полях (notes), правки (overrides).
// Працює поверх sync.js (Supabase). Без входу нічого не малює. Публічний API: IDIOMA.teacher = { todayHTML, bindToday, ws, isTeacher }
(() => {
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const PENDING = 'idioma-invite', WSKEY = 'idioma-ws';
  let client = null, user = null, ws = null;
  let teaching = [];      // memberships де я вчитель: {workspace_id, role}
  let myTeachers = [];    // memberships де workspace = мій: {user_id}
  const profiles = {};    // id → {name,email}
  let notes = [], overrides = [], studentState = null;
  let ready = false;

  const isTeacher = () => !!(user && ws && ws !== user.id);
  const who = (id) => { const p = profiles[id]; return p ? (p.name || p.email || 'teacher') : (id === user?.id ? 'me' : 'teacher'); };
  const fmtDate = (iso) => (iso || '').slice(0, 10);
  const entryIdOf = (el) => `${$('stage').dataset.cat}/${el.id}`;
  const pending = () => { try { return localStorage.getItem(PENDING); } catch (e) { return null; } };

  // ---------- вхід / запрошення ----------
  function captureInvite() {
    const m = location.hash.match(/^#invite\/([0-9a-f-]{36})$/i);
    if (!m) return false;
    try { localStorage.setItem(PENDING, m[1]); } catch (e) {}
    history.replaceState(null, '', location.pathname + location.search);
    return true;
  }
  async function redeemPending() {
    const t = pending(); if (!t || !client || !user) return;
    const { data, error } = await client.rpc('redeem_invite', { p_token: t });
    try { localStorage.removeItem(PENDING); } catch (e) {}
    if (error) { flash(`invite: ${error.message}`); return; }
    try { localStorage.setItem(WSKEY, data); } catch (e) {}
  }
  async function loadMembers() {
    teaching = []; myTeachers = [];
    const { data } = await client.from('memberships').select('workspace_id,user_id,role');
    (data || []).forEach((m) => { if (m.user_id === user.id && m.workspace_id !== user.id) teaching.push(m); if (m.workspace_id === user.id && m.user_id !== user.id) myTeachers.push(m); });
    const ids = [...new Set([user.id, ...teaching.map((m) => m.workspace_id), ...myTeachers.map((m) => m.user_id)])];
    const { data: p } = await client.from('profiles').select('id,name,email').in('id', ids);
    (p || []).forEach((x) => { profiles[x.id] = x; });
  }
  async function setWs(id) {
    ws = id; try { localStorage.setItem(WSKEY, id); } catch (e) {}
    document.body.classList.toggle('teacher', isTeacher());
    await loadWs();
    renderStudentsMenu();
    IDIOMA.rerender();
  }
  async function loadWs() {
    notes = []; overrides = []; studentState = null;
    if (!client || !user || !ws) { applyOverrides(); return; }
    const [n, o] = await Promise.all([
      client.from('notes').select('*').eq('workspace_id', ws).order('created_at'),
      client.from('overrides').select('*').eq('workspace_id', ws).order('created_at'),
    ]);
    notes = n.data || []; overrides = o.data || [];
    if (isTeacher()) { const { data } = await client.from('review_state').select('entry_id,step,reps,lapses,last_at').eq('workspace_id', ws); studentState = data || []; }
    applyOverrides();
  }
  // прийняті правки застосовуються до самих записів (один обʼєкт s для сторінки, панелі, практики й озвучки)
  function applyOverrides() {
    IDIOMA.entries().forEach((e) => { if (e.s._orig) { Object.assign(e.s, e.s._orig); delete e.s._orig; } });
    overrides.filter((o) => o.status === 'accepted').forEach((o) => {
      const e = IDIOMA.findEntry(o.entry_id); if (!e) return;
      e.s._orig ||= { tr: e.s.tr, say: e.s.say, en: e.s.en };
      e.s[o.field] = o.value;
    });
  }
  function reset() { ws = null; teaching = []; myTeachers = []; notes = []; overrides = []; studentState = null; document.body.classList.remove('teacher'); applyOverrides(); renderStudentsMenu(); IDIOMA.rerender(); }

  document.addEventListener('idioma:auth', async (ev) => {
    user = ev.detail.user; client = IDIOMA.sync.client();
    if (!user) { reset(); if (pending()) IDIOMA.practice?.openToday(); return; }
    await redeemPending();
    await loadMembers();
    let saved = null; try { saved = localStorage.getItem(WSKEY); } catch (e) {}
    const allowed = saved && (saved === user.id || teaching.some((m) => m.workspace_id === saved));
    ready = true;
    await setWs(allowed ? saved : user.id);
    if (document.querySelector('#modalBody .stiles')) IDIOMA.practice?.openToday(); // панель Today відкрита — оновити
  });

  // ---------- хедер: перемикач учнів ----------
  function renderStudentsMenu() {
    const old = document.querySelector('.hmenu.students'); if (old) old.remove();
    if (!teaching.length) return;
    const m = document.createElement('div'); m.className = 'hmenu students';
    m.innerHTML = `<button class="hbtn" type="button" aria-haspopup="true">${isTeacher() ? esc(who(ws)) : 'Students'} <span class="chev">▾</span></button>
      <div class="hdrop"><a href="#" data-ws="${esc(user.id)}"><b>My notebook</b><span>мій конспект</span></a>${teaching.map((t) => `<a href="#" data-ws="${esc(t.workspace_id)}"><b>${esc(who(t.workspace_id))}</b><span>student · учень</span></a>`).join('')}</div>`;
    $('hmenus').appendChild(m);
    const btn = m.querySelector('.hbtn');
    btn.addEventListener('click', (e) => { e.stopPropagation(); const open = m.classList.toggle('open'); $('hmenus').querySelectorAll('.hmenu').forEach((o) => { if (o !== m) o.classList.remove('open'); }); btn.setAttribute('aria-expanded', open); });
    m.querySelectorAll('a').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); m.classList.remove('open'); setWs(a.dataset.ws); }));
  }

  // ---------- марґіналії на записах ----------
  const KIND = { note: 'note · нотатка', correction: 'correction · виправлення', praise: 'praise · похвала' };
  function marginHTML(id) {
    const ns = notes.filter((n) => n.entry_id === id);
    const os = overrides.filter((o) => o.entry_id === id && o.status === 'proposed');
    const own = isTeacher();
    const items = [];
    ns.forEach((n) => items.push(`<div class="marg ${esc(n.kind)}${n.resolved ? ' resolved' : ''}" data-note="${esc(n.id)}">
        <span class="who">${esc(who(n.author))} · ${fmtDate(n.created_at)} · ${esc(KIND[n.kind] || n.kind)}</span>
        <span class="txt">${esc(n.text_en)}</span>
        <span class="acts">${!own && !n.resolved ? `<button type="button" data-act="resolve">✓ got it · зрозумів</button>` : ''}${n.author === user?.id ? `<button type="button" data-act="delnote">delete</button>` : ''}</span>
      </div>`));
    os.forEach((o) => items.push(`<div class="marg correction" data-ov="${esc(o.id)}">
        <span class="who">${esc(who(o.proposed_by))} · ${fmtDate(o.created_at)} · proposed ${esc(o.field)}</span>
        <span class="txt"><s>${esc(IDIOMA.findEntry(o.entry_id)?.s[o.field] || '')}</s> → <b>${esc(o.value)}</b></span>
        <span class="acts">${!own ? `<button type="button" data-act="accept">accept · прийняти</button><button type="button" data-act="reject">reject</button>` : ''}${o.proposed_by === user?.id ? `<button type="button" data-act="delov">withdraw</button>` : ''}</span>
      </div>`));
    const tools = own ? `<div class="tacts"><button type="button" class="tbtn" data-act="note">+ note</button><button type="button" class="tbtn" data-act="fix">✎ correct</button></div>` : '';
    if (!items.length && !tools) return '';
    return `<div class="margins">${items.length ? `<span class="k">teacher · вчитель</span>` : ''}${items.join('')}${tools}</div>`;
  }
  function decorate() {
    if (!user || !ws) return;
    const stage = $('stage'); if (!stage.dataset.cat) return;
    stage.querySelectorAll('.entry[id]').forEach((el) => {
      el.querySelector('.margins')?.remove();
      const html = marginHTML(entryIdOf(el)); if (!html) return;
      let g = el.querySelector('.graph'); if (!g) { g = document.createElement('aside'); g.className = 'graph'; el.appendChild(g); }
      g.insertAdjacentHTML('afterbegin', html);
    });
  }
  function formHTML(kind, el) {
    const s = IDIOMA.findEntry(entryIdOf(el))?.s || {};
    if (kind === 'note') return `<form class="tform" data-form="note"><select name="kind"><option value="note">note</option><option value="correction">correction</option><option value="praise">praise</option></select><textarea name="text" rows="3" placeholder="In English, for the student" required maxlength="2000"></textarea><div><button class="pbtn" type="submit">Save</button><button class="pbtn ghost" type="button" data-act="cancel">Cancel</button></div></form>`;
    return `<form class="tform" data-form="fix"><select name="field"><option value="tr">tr (phrase)</option><option value="say">say (pronunciation)</option><option value="en">en (translation)</option></select><input name="value" value="${esc(s.tr || '')}" required maxlength="500"><div><button class="pbtn" type="submit">Propose</button><button class="pbtn ghost" type="button" data-act="cancel">Cancel</button></div></form>`;
  }
  async function onStageClick(ev) {
    const b = ev.target.closest('[data-act]'); if (!b) return;
    const el = b.closest('.entry[id]'); if (!el) return;
    ev.preventDefault();
    const act = b.dataset.act, id = entryIdOf(el);
    const open = (kind) => { el.querySelector('.tform')?.remove(); el.querySelector('.margins').insertAdjacentHTML('beforeend', formHTML(kind, el)); const f = el.querySelector('.tform'); f.querySelector('textarea,input[name=value]').focus();
      if (kind === 'fix') { const s = IDIOMA.findEntry(id)?.s || {}; f.field.addEventListener('change', () => { f.value.value = s[f.field.value] || ''; }); } };
    if (act === 'note' || act === 'fix') return open(act);
    if (act === 'cancel') return el.querySelector('.tform')?.remove();
    const note = b.closest('[data-note]')?.dataset.note, ov = b.closest('[data-ov]')?.dataset.ov;
    let r = null;
    if (act === 'resolve') r = await client.from('notes').update({ resolved: true }).eq('id', note);
    if (act === 'delnote') r = await client.from('notes').delete().eq('id', note);
    if (act === 'accept') r = await client.from('overrides').update({ status: 'accepted' }).eq('id', ov);
    if (act === 'reject') r = await client.from('overrides').update({ status: 'rejected' }).eq('id', ov);
    if (act === 'delov') r = await client.from('overrides').delete().eq('id', ov);
    if (r?.error) flash(r.error.message);
    await loadWs(); IDIOMA.rerender();
  }
  async function onStageSubmit(ev) {
    const f = ev.target.closest('.tform'); if (!f) return;
    ev.preventDefault();
    const el = f.closest('.entry[id]'); const id = entryIdOf(el);
    let r;
    if (f.dataset.form === 'note') r = await client.from('notes').insert({ workspace_id: ws, entry_id: id, author: user.id, kind: f.kind.value, text_en: f.text.value.trim() });
    else r = await client.from('overrides').insert({ workspace_id: ws, entry_id: id, field: f.field.value, value: f.value.value.trim(), proposed_by: user.id, status: 'proposed' });
    if (r.error) { flash(r.error.message); return; }
    await loadWs(); IDIOMA.rerender();
  }
  function flash(msg) { const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg; document.body.appendChild(t); setTimeout(() => t.remove(), 4000); }

  // ---------- Today ----------
  function todayHTML() {
    if (!user) {
      return pending() ? `<div class="tsec"><h4 class="k">invitation · запрошення</h4><p>You were invited to a student's notebook. Sign in below with the email the invitation was sent to.</p></div>` : '';
    }
    const out = [];
    const me = profiles[user.id] || {};
    if (!me.name) out.push(`<form class="tform inline" id="nameForm"><label class="k">your name (shown on notes) · ваше імʼя</label><div><input name="name" placeholder="Name" required maxlength="60"><button class="pbtn" type="submit">Save</button></div></form>`);
    if (isTeacher()) {
      const st = studentState || []; const lapses = st.filter((x) => x.lapses > 0).sort((a, b) => b.lapses - a.lapses).slice(0, 6);
      const last = st.map((x) => x.last_at || '').sort().pop();
      const mine = notes.filter((n) => n.author === user.id);
      out.push(`<div class="tsec"><h4 class="k">student · ${esc(who(ws))}</h4>
        <div class="stiles"><span class="stile"><b>${st.length}</b><span>phrases in rotation</span><i>фраз у повторенні</i></span><span class="stile"><b>${st.filter((x) => x.step >= 4).length}</b><span>remembered well</span><i>step ≥ 2 weeks</i></span><span class="stile"><b>${last ? fmtDate(last) : '—'}</b><span>last practice</span><i>остання практика</i></span></div>
        <h4 class="k">weakest · найслабші</h4><ul class="plist">${lapses.map((x) => { const e = IDIOMA.findEntry(x.entry_id); return e ? `<li><a href="${e.href}">${esc(e.s.tr)}</a> <span class="muted">${x.lapses} lapses</span></li>` : ''; }).join('') || '<li class="muted">no data yet</li>'}</ul>
        <h4 class="k">my notes · ${mine.length} (${mine.filter((n) => !n.resolved).length} open) · proposals · ${overrides.filter((o) => o.proposed_by === user.id && o.status === 'proposed').length} pending</h4>
        <ul class="plist">${mine.slice(-6).reverse().map((n) => { const e = IDIOMA.findEntry(n.entry_id); return `<li><a href="${e ? e.href : '#'}">${esc(e ? e.s.tr : n.entry_id)}</a> <span class="muted">${esc(n.kind)}${n.resolved ? ' · seen' : ''}</span></li>`; }).join('') || '<li class="muted">open any entry and press “+ note” or “✎ correct”</li>'}</ul></div>`);
      return out.join('');
    }
    // учень: нотатки вчителя, правки, вчителі, запрошення
    const open = notes.filter((n) => !n.resolved); const props = overrides.filter((o) => o.status === 'proposed');
    out.push(`<div class="tsec"><h4 class="k">from the teacher · від вчителя</h4>
      <ul class="plist">${open.map((n) => { const e = IDIOMA.findEntry(n.entry_id); return `<li><a href="${e ? e.href : '#'}">${esc(e ? e.s.tr : n.entry_id)}</a> <span class="muted">${esc(n.kind)} · ${esc(who(n.author))}</span></li>`; }).join('')}${props.map((o) => { const e = IDIOMA.findEntry(o.entry_id); return `<li><a href="${e ? e.href : '#'}">${esc(e ? e.s.tr : o.entry_id)}</a> <span class="muted">proposed ${esc(o.field)} · accept on the entry</span></li>`; }).join('') || (open.length ? '' : '<li class="muted">nothing new · нічого нового</li>')}</ul>
      <h4 class="k">teachers · вчителі</h4>
      <ul class="plist">${myTeachers.map((m) => `<li><span>${esc(who(m.user_id))}</span> <button type="button" class="tbtn" data-remove="${esc(m.user_id)}">remove</button></li>`).join('') || '<li class="muted">no teacher yet · ще нема вчителя</li>'}</ul>
      <form class="tform inline" id="inviteForm"><label class="k">invite a teacher by email · запросити вчителя</label><div><input name="email" type="email" placeholder="teacher@email" required><button class="pbtn" type="submit">Create link</button></div><p class="mnote" id="inviteMsg"></p></form></div>`);
    if (teaching.length) out.push(`<p class="mnote">you also teach ${teaching.length} student(s) · switch in the header</p>`);
    return out.join('');
  }
  function bindToday() {
    const nf = $('nameForm'); if (nf) nf.addEventListener('submit', async (e) => { e.preventDefault(); const name = nf.name.value.trim(); await IDIOMA.sync.profile(name); profiles[user.id] = { ...(profiles[user.id] || {}), name }; IDIOMA.practice.openToday(); });
    const inv = $('inviteForm'); if (inv) inv.addEventListener('submit', async (e) => {
      e.preventDefault(); const email = inv.email.value.trim();
      const { data, error } = await client.rpc('create_invite', { p_email: email });
      const msg = $('inviteMsg');
      if (error) { msg.textContent = error.message; return; }
      const link = `${location.origin}${location.pathname}#invite/${data}`;
      msg.innerHTML = `send this link to ${esc(email)} (valid 14 days, they must sign in with that email):<br><input class="linkbox" readonly value="${esc(link)}"> <button type="button" class="tbtn" id="copyInvite">copy</button>`;
      $('copyInvite').addEventListener('click', () => { navigator.clipboard?.writeText(link); $('copyInvite').textContent = 'copied'; });
    });
    document.querySelectorAll('#modalBody [data-remove]').forEach((b) => b.addEventListener('click', async () => { const { error } = await client.rpc('remove_teacher', { p_user: b.dataset.remove }); if (error) flash(error.message); await loadMembers(); IDIOMA.practice.openToday(); }));
  }

  document.addEventListener('DOMContentLoaded', () => {
    const invited = captureInvite();
    IDIOMA.onRender(decorate);
    $('stage').addEventListener('click', onStageClick);
    $('stage').addEventListener('submit', onStageSubmit);
    if (invited) IDIOMA.sync?.ready?.().then(() => { if (!user) IDIOMA.practice?.openToday(); });
  });
  IDIOMA.teacher = { todayHTML, bindToday, ws: () => ws, isTeacher, notes: () => notes, overrides: () => overrides };
})();
