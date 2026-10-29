const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const secret = require('node:crypto').randomBytes(32).toString('hex');
const port = 3187;
const origin = `http://127.0.0.1:${port}`;
const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-p', String(port), '-H', '127.0.0.1'], { env: { ...process.env, PRIVATE_ARTICLES_PASSWORD: secret }, stdio: ['ignore', 'pipe', 'pipe'] });
let output = ''; server.stdout.on('data', d => output += d); server.stderr.on('data', d => output += d);
const auth = { Authorization: 'Basic ' + Buffer.from('ostap:' + secret).toString('base64') };
(async () => {
  try {
    for (let i=0; i<60; i++) {
      if (server.exitCode !== null) throw new Error(output);
      try { await fetch(origin); break; } catch { await new Promise(r => setTimeout(r, 200)); }
    }
    for (const path of ['/private/articles', '/api/private/article-stats', '/private/articles?_rsc=test']) {
      const response = await fetch(origin+path);
      assert.equal(response.status, 401, path);
      assert.match(response.headers.get('cache-control'), /no-store/);
      assert.match(response.headers.get('x-robots-tag'), /noindex/);
      const bypass = await fetch(origin+path, { headers: { 'x-middleware-subrequest': 'middleware:middleware:middleware:middleware:middleware' } });
      assert.notEqual(bypass.status, 200, 'Middleware bypass must not disclose content');
    }
    const page = await fetch(origin+'/private/articles', { headers: auth });
    assert.equal(page.status, 200);
    const html = await page.text();
    assert.match(html, /Your writing, in view/);
    assert.match(html, /LinkedIn followers/);
    assert.doesNotMatch(html, /<script[^>]+src="https:\/\/(?:plausible|analytics\.ahrefs)/);
    const api = await fetch(origin+'/api/private/article-stats?period=30d', { headers: auth });
    assert.equal(api.status, 200);
    assert.equal((await api.json()).status, 'not_connected');
    assert.equal((await fetch(origin+'/api/private/article-stats?period=bad', { headers: auth })).status, 400);
    const slugs = ['the-question-an-agent-should-ask', 'two-agents-one-business-record', 'what-to-keep-before-an-agent-forgets'];
    const sitemap = await (await fetch(origin+'/sitemap.xml')).text();
    const feed = await (await fetch(origin+'/feed.xml')).text();
    assert.doesNotMatch(sitemap, /\/private\//);
    for (const slug of slugs) {
      const draft = await fetch(origin+'/drafts/'+slug); assert.equal(draft.status, 200);
      const draftHtml = await draft.text(); assert.match(draftHtml, /noindex/);
      assert.equal((await fetch(origin+'/writing/'+slug)).status, 404);
      assert.ok(!sitemap.includes(slug)); assert.ok(!feed.includes(slug));
    }
    console.log('PASS: authenticated dashboard, anonymous/RSC/API denial, bypass defense, cache headers, provider empty state, draft previews and public exclusion.');
  } finally { server.kill('SIGTERM'); }
})().catch(error => { console.error(error); process.exitCode = 1; });
