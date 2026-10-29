const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
function load(file) {
  const output = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  const context = { exports: {}, require, crypto: require('node:crypto').webcrypto, TextEncoder, atob, URL, Date, Set, Map, Number, Error };
  vm.runInNewContext(output, context, { filename: file }); return context.exports;
}
(async () => {
  const { hasPrivateAccess } = load('lib/private-access.ts');
  const password = 'a-test-only-password-at-least-24-chars';
  const auth = value => 'Basic ' + Buffer.from(value).toString('base64');
  assert.equal(await hasPrivateAccess(null, password), false);
  assert.equal(await hasPrivateAccess(auth('ostap:' + password), undefined), false);
  assert.equal(await hasPrivateAccess(auth('ostap:short'), 'short'), false);
  assert.equal(await hasPrivateAccess('Basic %%%', password), false);
  assert.equal(await hasPrivateAccess(auth('other:' + password), password), false);
  assert.equal(await hasPrivateAccess(auth('ostap:wrong'), password), false);
  assert.equal(await hasPrivateAccess(auth('ostap:' + password), password), true);
  const { parseWorkspace, latestSnapshots, engagementRate } = load('lib/article-metrics.ts');
  const row = (date, impressions) => ({ slug: 'example', date, postUrl: 'https://www.linkedin.com/posts/example', metrics: { impressions, views: null, reactions: 8, comments: 1, reposts: 1 } });
  const data = { version: 1, snapshots: [row('2026-01-01', 100), row('2026-01-03', 200)], followers: [{ date: '2026-01-01', count: 0 }] };
  const parsed = parseWorkspace(data, ['example']);
  assert.equal(latestSnapshots(parsed).length, 1);
  assert.equal(latestSnapshots(parsed)[0].metrics.impressions, 200);
  assert.equal(engagementRate(latestSnapshots(parsed)[0]), 5);
  assert.equal(engagementRate(row('2026-01-01', 0)), null);
  assert.equal(engagementRate({ ...row('2026-01-01', 100), metrics: { ...row('2026-01-01', 100).metrics, comments: null } }), null);
  assert.throws(() => parseWorkspace({ ...data, snapshots: [row('2026-02-30', 100)] }, ['example']));
  assert.throws(() => parseWorkspace(data, ['different']));
  assert.throws(() => parseWorkspace({ ...data, snapshots: [row('2026-01-01', -1)] }, ['example']));
  assert.throws(() => parseWorkspace({ ...data, snapshots: [row('2026-01-01', 1.5)] }, ['example']));
  assert.throws(() => parseWorkspace({ ...data, snapshots: [row('2026-01-01', 1), row('2026-01-01', 2)] }, ['example']));
  assert.throws(() => parseWorkspace({ ...data, snapshots: [{ ...row('2026-01-01', 1), postUrl: 'javascript:alert(1)' }] }, ['example']));
  assert.throws(() => parseWorkspace({ ...data, snapshots: [row('2026-01-01', 100), { ...row('2026-01-03', 200), postUrl: 'https://www.linkedin.com/posts/another' }] }, ['example']));
  console.log('PASS: private access, fail-closed configuration, snapshot validation, cumulative counts, missing values, dates, duplicate and post identity checks.');
})();
