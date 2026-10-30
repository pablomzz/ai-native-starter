// Check that the project still checks itself: the npm scripts still run the real tests and checks,
// CI still runs them, and every hook in tools/hooks/ is still switched on in .claude/settings.json.
// This catches a weakened check even when someone said yes to it, because it runs in CI on every push.
'use strict';
const fs = require('fs');
const path = require('path');

function checkIntegrity(root) {
  const problems = [];
  const read = (rel) => { try { return fs.readFileSync(path.join(root, rel), 'utf8'); } catch { return null; } };

  const pkg = read('package.json');
  if (pkg) {
    let scripts = {};
    try { scripts = JSON.parse(pkg).scripts || {}; } catch { problems.push('package.json is not valid JSON.'); }
    if (scripts.test !== undefined && scripts.test !== 'node tools/run.js test') problems.push(`package.json: "npm run test" now runs "${scripts.test}" instead of your tests. Put it back to: node tools/run.js test`);
    if (scripts.check !== undefined && !/^node tools\/check\.js\b/.test(scripts.check)) problems.push(`package.json: "npm run check" now runs "${scripts.check}" instead of the checks. Put it back to: node tools/check.js`);
  }

  const ci = read('.github/workflows/ci.yml');
  if (ci === null) problems.push('.github/workflows/ci.yml is missing, so GitHub no longer checks your pushes. Restore it with: git checkout main -- .github/workflows/ci.yml');
  else for (const step of ['npm run check', 'npm run test']) if (!ci.includes(step)) problems.push(`.github/workflows/ci.yml no longer runs "${step}", so a broken change could look green. Restore that step.`);

  const settings = read('.claude/settings.json');
  const hooksDir = path.join(root, 'tools', 'hooks');
  if (settings !== null && fs.existsSync(hooksDir)) {
    for (const f of fs.readdirSync(hooksDir).filter((x) => x.endsWith('.js'))) {
      if (!settings.includes(`tools/hooks/${f}`)) problems.push(`.claude/settings.json no longer switches on tools/hooks/${f}, so that guardrail is off. Ask an owner to restore it.`);
    }
  }
  return problems;
}

module.exports = { checkIntegrity };
if (require.main === module) {
  const p = checkIntegrity(process.cwd());
  p.forEach((x) => console.log('  ' + x));
  console.log(p.length ? `integrity: ${p.length} problem(s)` : 'integrity: ok');
  process.exit(p.length ? 1 : 0);
}
