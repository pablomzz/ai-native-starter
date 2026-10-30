// Check that the project still checks itself: the npm scripts and the project's test command still run
// real tests, CI still runs the checks, and every hook in tools/hooks/ is still switched on in
// .claude/settings.json. This catches a weakened check even when someone said yes to it, because it
// runs in CI on every push.
'use strict';
const fs = require('fs');
const path = require('path');

const PLACEHOLDER = new RegExp('\\{' + '\\{[A-Z0-9_]+\\}' + '\\}');
// A command that always "passes" without testing anything.
const RUNS_NOTHING = /^\s*$|^\s*(echo\b|true\b|:\s*$|exit\s+0\b)/;

function checkIntegrity(root) {
  const problems = [];
  const read = (rel) => { try { return fs.readFileSync(path.join(root, rel), 'utf8'); } catch { return null; } };

  const pkg = read('package.json');
  if (pkg) {
    let scripts = {};
    try { scripts = JSON.parse(pkg).scripts || {}; } catch { problems.push('package.json is not valid JSON.'); }
    if (scripts.test !== undefined && !scripts.test.startsWith('node tools/run.js test')) problems.push(`package.json: "npm run test" now runs "${scripts.test}" instead of your tests. Put it back to: node tools/run.js test`);
    if (scripts.check !== undefined && !/^node tools\/check\.js\b/.test(scripts.check)) problems.push(`package.json: "npm run check" now runs "${scripts.check}" instead of the checks. Put it back to: node tools/check.js`);
  }

  // The test command npm run test really runs. "Something else" projects start with a stand-in on purpose.
  const cfgText = read('project.config.json');
  if (cfgText) {
    let cfg = {};
    try { cfg = JSON.parse(cfgText.replace(/^﻿/, '')); } catch { /* reported by loadConfig */ }
    const t = (cfg.commands || {}).test;
    if (typeof t === 'string' && !PLACEHOLDER.test(t) && cfg.stack !== 'other' && RUNS_NOTHING.test(t)) problems.push(`project.config.json: the test command is "${t}", which runs no tests. Put your real test command back (for example: node --test).`);
  }

  // CI: some workflow must still run each check as a real step, not inside a comment or an echo.
  const wfDir = path.join(root, '.github', 'workflows');
  const workflows = fs.existsSync(wfDir) ? fs.readdirSync(wfDir).filter((f) => /\.ya?ml$/.test(f)).map((f) => read(`.github/workflows/${f}`) || '') : [];
  if (!workflows.length) problems.push('There is no CI workflow in .github/workflows/, so GitHub no longer checks your pushes. Restore it with: git checkout main -- .github/workflows/ci.yml');
  else for (const step of ['npm run check', 'npm run test']) {
    const runs = new RegExp(`^\\s*(-\\s*)?run:\\s*${step.replace(/ /g, '\\s+')}\\b`, 'm');
    if (!workflows.some((w) => runs.test(w))) problems.push(`CI no longer runs "${step}" as a step, so a broken change could look green. Restore that step in .github/workflows/ci.yml.`);
  }

  // Hooks: each hook file must still be switched on. A missing settings file switches them all off.
  const hooksDir = path.join(root, 'tools', 'hooks');
  const hooks = fs.existsSync(hooksDir) ? fs.readdirSync(hooksDir).filter((x) => x.endsWith('.js') && !x.endsWith('.test.js')) : [];
  const settings = read('.claude/settings.json');
  if (hooks.length && settings === null) problems.push('.claude/settings.json is missing, so every guardrail hook is off. Restore it with: git checkout main -- .claude/settings.json');
  else for (const f of hooks) if (!settings.includes(`tools/hooks/${f}`)) problems.push(`.claude/settings.json no longer switches on tools/hooks/${f}, so that guardrail is off. Ask an owner to restore it.`);
  return problems;
}

module.exports = { checkIntegrity };
if (require.main === module) {
  const p = checkIntegrity(process.cwd());
  p.forEach((x) => console.log('  ' + x));
  console.log(p.length ? `integrity: ${p.length} problem(s)` : 'integrity: ok');
  process.exit(p.length ? 1 : 0);
}
