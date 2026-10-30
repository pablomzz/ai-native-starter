// Change a document's Status line, so you never have to type it by hand.
//   npm run accept -- <file> [name]     intent, spec or plan -> "Accepted <date> by <name>"
//   npm run reject -- <file> <reason>   intent or spec      -> "Rejected <date> by <name>: <reason>"
//   npm run done   -- <file>            plan                -> "Done <date>"
//   npm run close  -- <file>            incident            -> "Closed <date>"
'use strict';
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { readConfig, today, owners, statusOf, setStatus, section } = require('./lib');

const [action, file, ...rest] = process.argv.slice(2);
const usage = () => { console.log('Usage: npm run accept -- docs/intent/<file>.md   (also: reject, done, close)'); process.exit(1); };
if (!action || !file) usage();
if (!fs.existsSync(file)) { console.log(`${file} does not exist. Check the name with: ls docs/*/`); process.exit(1); }

const kind = (file.split(/[\\/]/).slice(-2, -1)[0] || '').replace('incidents', 'incident');
const allowed = { accept: ['intent', 'spec', 'plan'], reject: ['intent', 'spec'], done: ['plan'], close: ['incident'] };
if (!allowed[action]) usage();
if (!allowed[action].includes(kind)) { console.log(`"${action}" works on ${allowed[action].join(', ')} files, and this is a ${kind || 'different'} file.`); process.exit(1); }

const cfg = readConfig();
const date = today(cfg.timezone);
const team = owners(cfg);
const gitName = (spawnSync('git', ['config', 'user.name'], { encoding: 'utf8' }).stdout || '').trim();
let who = action === 'accept' ? rest.join(' ') : '';
if (!who) who = team.find((o) => o.toLowerCase() === gitName.toLowerCase()) || team[0] || gitName || 'Owner';

let text = fs.readFileSync(file, 'utf8');

// Accepting a spec or plan needs its intent (and a plan's spec) to be Accepted first.
if (action === 'accept' && kind !== 'intent') {
  for (const k of kind === 'plan' ? ['Intent', 'Spec'] : ['Intent']) {
    const body = section(text, k) || '';
    if (/^none\b/i.test(body)) continue;
    const ref = (/docs\/[a-z]+\/[\w.-]+\.md/.exec(body) || [])[0];
    if (!ref || !fs.existsSync(ref)) { console.log(`First fix "## ${k}": it must name an existing file, or say "none: <reason>".`); process.exit(1); }
    if (!/^Accepted\b/.test(statusOf(fs.readFileSync(ref, 'utf8')) || '')) { console.log(`${ref} is not Accepted yet. Accept it first: npm run accept -- ${ref}`); process.exit(1); }
  }
}

const reason = rest.join(' ').trim();
if (action === 'reject' && !reason) { console.log('Say why: npm run reject -- <file> <reason>'); process.exit(1); }
const line = { accept: `Accepted ${date} by ${who}`, reject: `Rejected ${date} by ${who}: ${reason}`, done: `Done ${date}`, close: `Closed ${date}` }[action];

if (!/^##\s+Status\s*$/m.test(text)) text = text.trimEnd() + '\n\n## Status\n';
text = setStatus(text, line);
fs.writeFileSync(file, text);
console.log(`${path.basename(file)}: Status is now "${line}".`);
console.log(`Next: git add ${file} && git commit -m "docs(${kind}): ${action} ${path.basename(file, '.md').slice(7)}"`);
