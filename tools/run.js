// node tools/run.js <build|test|lint|run>: run the command from project.config.json.
// A command that is still a placeholder is skipped with a note, so CI stays green before init.
'use strict';
const { spawnSync } = require('child_process');
const { readConfig, isPlaceholder } = require('./lib');

const which = process.argv[2];
const cmd = (readConfig().commands || {})[which];
if (!cmd) { console.log(`No "${which}" command in project.config.json.`); process.exit(1); }
if (isPlaceholder(cmd)) { console.log(`${which}: not set up yet (run npm run init). Skipping.`); process.exit(0); }
console.log(`$ ${cmd}`);
const r = spawnSync(cmd, { shell: true, stdio: 'inherit' });
process.exit(r.status === null ? 1 : r.status);
