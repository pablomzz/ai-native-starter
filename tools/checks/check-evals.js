// Run every guardrail eval in evals/cases/: feed a hook a sample input and compare its decision.
// Each case runs in a fresh temporary folder, so it never touches your real files.
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');
const { today } = require('../lib');

function runCase(root, c) {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'eval-'));
  try {
    fs.copyFileSync(path.join(root, 'project.config.json'), path.join(tmp, 'project.config.json'));
    // "@TODAY@" in a fixture becomes today's date, so a case never goes stale.
    let tz; try { tz = JSON.parse(fs.readFileSync(path.join(root, 'project.config.json'), 'utf8')).timezone; } catch { tz = undefined; }
    const now = today(tz);
    for (const [rel, body] of Object.entries(c.files || {})) {
      fs.mkdirSync(path.dirname(path.join(tmp, rel)), { recursive: true });
      fs.writeFileSync(path.join(tmp, rel), String(body).replace(/@TODAY@/g, now));
    }
    // A secret sample is stored in pieces (["sk-", "ant-..."]) so no full secret sits in the repo.
    const ti = { ...((c.input || {}).tool_input || {}) };
    for (const k of ['content', 'new_string']) if (Array.isArray(ti[k])) ti[k] = ti[k].join('');
    const input = c.input === 'NOT_JSON' ? 'this is not json' : JSON.stringify({ ...c.input, tool_input: ti });
    const r = spawnSync(process.execPath, [path.join(root, 'tools', 'hooks', c.hook + '.js')], {
      input, cwd: tmp, env: { ...process.env, CLAUDE_PROJECT_DIR: tmp, STARTER_TEST_BRANCH: c.branch || 'feature' }, encoding: 'utf8',
    });
    let got = 'allow';
    if (r.status !== 0) got = 'error';
    else if (r.stdout.trim()) {
      try { got = JSON.parse(r.stdout).hookSpecificOutput.permissionDecision; } catch { got = 'error'; }
    }
    return got;
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

function checkEvals(root) {
  const dir = path.join(root, 'evals', 'cases');
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json')).sort();
  const failures = [];
  for (const f of files) {
    const c = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
    const got = runCase(root, c);
    if (got !== c.expect) failures.push(`${f}: expected ${c.expect}, got ${got} (${c.why})`);
  }
  return { total: files.length, failures };
}

module.exports = { checkEvals };
if (require.main === module) {
  const { total, failures } = checkEvals(process.cwd());
  failures.forEach((x) => console.log('  ' + x));
  console.log(`evals: ${total - failures.length}/${total} passed`);
  process.exit(failures.length ? 1 : 0);
}
