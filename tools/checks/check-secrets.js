// Scan the files git tracks (or all files, before git) for secrets a person might commit by hand.
// The edit hook only sees Claude's edits; this check runs in npm run check and in CI.
'use strict';
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { findSecret } = require('../lib');

const SKIP = /(^|\/)(node_modules|\.git|evals\/cases)\//;

function listFiles(root) {
  const r = spawnSync('git', ['ls-files', '-co', '--exclude-standard'], { cwd: root, encoding: 'utf8' });
  if (r.status === 0 && r.stdout.trim()) return r.stdout.split('\n').filter(Boolean);
  const out = [];
  (function walk(d) {
    for (const e of fs.readdirSync(path.join(root, d), { withFileTypes: true })) {
      const rel = d ? `${d}/${e.name}` : e.name;
      if (e.isDirectory()) { if (!['node_modules', '.git'].includes(e.name)) walk(rel); } else out.push(rel);
    }
  })('');
  return out;
}

function checkSecrets(root) {
  const hits = [];
  for (const rel of listFiles(root)) {
    if (SKIP.test(rel + '/') || SKIP.test(rel)) continue;
    let text;
    try { const buf = fs.readFileSync(path.join(root, rel)); if (buf.length > 1e6 || buf.includes(0)) continue; text = buf.toString('utf8'); } catch { continue; }
    const found = findSecret(text);
    if (found) hits.push(`${rel}: looks like ${found}. Move it to an environment variable, and change the secret if it was ever pushed.`);
  }
  return hits;
}

module.exports = { checkSecrets };
if (require.main === module) {
  const h = checkSecrets(process.cwd());
  h.forEach((x) => console.log('  ' + x));
  console.log(h.length ? `secrets: ${h.length} found` : 'secrets: none found');
  process.exit(h.length ? 1 : 0);
}
