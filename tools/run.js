// node tools/run.js <build|test|lint|run>: run the command from project.config.json.
// A command that is still a placeholder is skipped with a note, so CI stays green before init.
'use strict';
const { spawnSync } = require('child_process');
const { isPlaceholder } = require('./lib');
const { loadConfig } = require('./config');

const which = process.argv[2];
const cmd = (loadConfig().commands || {})[which];
if (!cmd) { console.log(`No "${which}" command in project.config.json.`); process.exit(1); }
if (isPlaceholder(cmd)) { console.log(`${which}: not set up yet (run npm run init). Skipping.`); process.exit(0); }
console.log(`$ ${cmd}`);
const r = spawnSync(cmd, { shell: true, stdio: 'inherit' });
if (r.status !== 0 && /^python3? -m /.test(cmd)) {
  console.log('If it says "No module named ...", install the Python tools: python -m pip install -r requirements-dev.txt');
}
process.exit(r.status === null ? 1 : r.status);
