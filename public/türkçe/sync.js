// Синк прогресу з Supabase (вмикається, якщо в config.js задано supabase: { url, anonKey }).
// Вхід по magic link. Таблиці: див. schema.sql і schema-teacher.sql.
// Приватні записи (категорія/тема з private: true) ніколи не надсилаються: фільтр у push().
// Події: document 'idioma:auth' { user } після кожної зміни сесії (слухає teacher.js).
(() => {
  const cfg = () => (IDIOMA.cfg && IDIOMA.cfg().supabase) || null;
  let client = null, user = null, ready = false, lastError = '';
  const $ = (id) => document.getElementById(id);
  let readyResolve; const readyP = new Promise((r) => { readyResolve = r; });

  async function init() {
    const c = cfg(); if (!c || !c.url || !c.anonKey) { readyResolve(); return; }
    await new Promise((res, rej) => { const s = document.createElement('script'); s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.49.4/dist/umd/supabase.min.js'; s.onload = res; s.onerror = rej; document.head.appendChild(s); }).catch(() => null);
    if (!window.supabase) { lastError = 'supabase-js failed to load'; readyResolve(); return; }
    client = window.supabase.createClient(c.url, c.anonKey);
    const { data } = await client.auth.getSession(); user = data?.session?.user || null; ready = true;
    client.auth.onAuthStateChange((ev, session) => {
      const next = session?.user || null; const changed = (next && next.id) !== (user && user.id);
      user = next; clearTimeout(pushTimer);
      if (changed) { if (user) { profile(); pull(); } emit(); }
    });
    if (user) { profile(); await pull(); }
    readyResolve(); emit();
  }
  const emit = () => document.dispatchEvent(new CustomEvent('idioma:auth', { detail: { user } }));
  const workspaceId = () => (user ? user.id : null); // v1: один workspace = користувач (для його власного прогресу)

  // профіль: email + ім'я (ім'я ставиться у Today)
  async function profile(name) {
    if (!client || !user) return;
    const row = { id: user.id, email: user.email }; if (name !== undefined) row.name = name;
    const { error } = await client.from('profiles').upsert(row, { onConflict: 'id' }); if (error) lastError = error.message;
  }
  // публічні id записів (приватні категорії/теми в хмару не йдуть)
  let publicIds = null;
  const isPublic = (id) => { if (!publicIds) { publicIds = new Set(IDIOMA.entries().filter((e) => !e.c.private && !e.t.private && !e.c.hidden && !e.t.hidden).map((e) => e.href.slice(1))); } return publicIds.has(id); };

  let pulling = null;
  function pull() {
    if (!client || !user) return Promise.resolve();
    if (pulling) return pulling;
    pulling = (async () => {
      const { data, error } = await client.from('review_state').select('entry_id,step,due_at,reps,lapses,first_at,last_at').eq('workspace_id', workspaceId());
      if (error) { lastError = error.message; return; }
      const remote = {}; (data || []).forEach((r) => { remote[r.entry_id] = { step: r.step, due: new Date(r.due_at).getTime(), reps: r.reps, lapses: r.lapses, first: r.first_at, last: r.last_at }; });
      IDIOMA.practice?.merge(remote);
      await flush(IDIOMA.practice?.state());
    })().finally(() => { pulling = null; });
    return pulling;
  }
  let pushTimer = null;
  function push(state) { if (!client || !user || !state) return; clearTimeout(pushTimer); pushTimer = setTimeout(() => flush(state), 800); }
  async function flush(state) {
    if (!client || !user || !state) return;
    const ws = workspaceId();
    const rows = Object.entries(state).filter(([id]) => isPublic(id)).map(([entry_id, s]) => ({ workspace_id: ws, entry_id, step: s.step, due_at: new Date(s.due).toISOString(), reps: s.reps, lapses: s.lapses, first_at: s.first || null, last_at: s.last || null }));
    if (!rows.length) return;
    const { error } = await client.from('review_state').upsert(rows, { onConflict: 'workspace_id,entry_id' });
    if (error) lastError = error.message; else lastError = '';
  }
  function status() {
    if (!cfg()) return 'local only · лише локально';
    if (!ready) return lastError ? `offline · ${lastError}` : 'connecting…';
    if (!user) return 'not signed in · не ввійшли';
    return lastError ? `signed in as ${user.email} · sync error: ${lastError}` : `synced as ${user.email}`;
  }
  // відправити magic link; redirect = ця сторінка без хеша (/turkce/), має бути в allowlist Supabase
  async function signIn(email) {
    if (!client) return 'not ready';
    const { error } = await client.auth.signInWithOtp({ email, options: { emailRedirectTo: location.origin + location.pathname } });
    return error ? error.message : '';
  }
  function renderAuth(box) {
    if (!box) return;
    if (!cfg()) { box.innerHTML = '<p class="mnote">cloud sync is off (no supabase keys in config.js)</p>'; return; }
    if (user) { box.innerHTML = `<p class="mnote">signed in as ${user.email} · <a href="#" id="signOut">sign out</a></p>`; $('signOut').addEventListener('click', async (e) => { e.preventDefault(); await client.auth.signOut(); user = null; try { localStorage.removeItem(`idioma-review-${(IDIOMA.langCode && IDIOMA.langCode()) || 'xx'}`); } catch (err) {} IDIOMA.practice.load(); IDIOMA.practice.openToday(); }); return; }
    box.innerHTML = `<form id="magic" class="magic"><label class="k" for="magicEmail">sign in to sync · увійти для синхронізації</label><div><input id="magicEmail" type="email" placeholder="you@email" required autocomplete="email"><button class="pbtn" type="submit">Send link</button></div><p class="mnote" id="magicMsg"></p></form>`;
    $('magic').addEventListener('submit', async (e) => { e.preventDefault(); const email = $('magicEmail').value.trim(); const err = await signIn(email); $('magicMsg').textContent = err || `link sent to ${email} · check your mail · лінк надіслано`; });
  }
  IDIOMA.sync = { init, push, pull, status, renderAuth, signIn, profile, ready: () => readyP, user: () => user, client: () => client, error: () => lastError };
  document.addEventListener('DOMContentLoaded', init);
})();
