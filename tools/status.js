// Change a document's Status line, so you never have to type it by hand.
//   npm run accept -- <file> [name]     intent, spec or plan -> "Accepted <date> by <name>"
//   npm run reject -- <file> <reason>   intent or spec      -> "Rejected <date> by <name>: <reason>"
//   npm run done   -- <file>            plan                -> "Done <date>"
//   npm run close  -- <file>            incident            -> "Closed <date>"
'use strict';
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { today, owners, statusOf, setStatus, section } = require('./lib');
const { loadConfig } = require('./config');

const [action, rawFile, ...rest] = process.argv.slice(2);
const usage = () => { console.log('Usage: npm run accept -- docs/intent/<file>.md   (also: reject, done, close)'); process.exit(1); };
if (!action || !rawFile) usage();
// Forgive Windows slashes, a leading ./ and a bare file name typed without its folder.
let file = rawFile.replace(/\\/g, '/').replace(/^\.\//, '');
if (!fs.existsSync(file) && !file.includes('/')) {
  const hits = ['intent', 'spec', 'plan', 'incidents', 'loop'].map((k) => `docs/${k}/${file}`).filter((f) => fs.existsSync(f));
  if (hits.length === 1) file = hits[0];
}
if (!fs.existsSync(file)) { console.log(`${rawFile} does not exist. Check the name with: ls docs/*/`); process.exit(1); }

const kind = (file.split(/[\\/]/).slice(-2, -1)[0] || '').replace('incidents', 'incident');
const allowed = { accept: ['intent', 'spec', 'plan'], reject: ['intent', 'spec'], done: ['plan'], close: ['incident'] };
if (!allowed[action]) usage();
if (!allowed[action].includes(kind)) { console.log(`"${action}" works on ${allowed[action].join(', ')} files, and this is a ${kind || 'different'} file.`); process.exit(1); }

const cfg = loadConfig();
const date = today(cfg.timezone);
const team = owners(cfg);
const gitName = (spawnSync('git', ['config', 'user.name'], { encoding: 'utf8' }).stdout || '').trim();
// Only an owner accepts or rejects: your git name (or the name you pass to accept) must be in the owners list.
// It is a nudge against mistakes, not a lock: anyone can type an owner's name.
const given = action === 'accept' ? rest.join(' ').trim() : '';
const asked = given || gitName;
let who = team.find((o) => o.toLowerCase() === asked.toLowerCase());
if (!team.length || !['accept', 'reject'].includes(action)) who = who || team[0] || asked || 'Owner';
if (!who) {
  console.log(`Only an owner can ${action} a document. Owners in project.config.json: ${team.join(', ')}.`);
  if (given) console.log(`"${given}" is not one of them.`);
  else if (!gitName) console.log(`Git does not know your name yet. If you are ${team[0]}, run: git config --global user.name "${team[0]}"`);
  else console.log(`Your git name is "${gitName}". If you are ${team[0]}, set it with: git config --global user.name "${team[0]}"`);
  process.exit(1);
}

let text = fs.readFileSync(file, 'utf8');

// Accepting needs real content: the template's own blanks must be filled in first.
if (action === 'accept') {
  const body = text.replace(/<!--[\s\S]*?-->/g, '');
  const blank = text.split('\n')[0].includes('<short title>') ? '<short title>'
    : ['<something you can see or test>', '<skill names, or none>'].find((b) => body.includes(b));
  if (blank) { console.log(`${file} still has "${blank}" from the template. Fill it in first (Claude can help), then accept it.`); process.exit(1); }
}

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

// Nothing to do when the Status already says so; a plan is only Done after it was Accepted.
const now = statusOf(text) || '';
const word = { accept: 'Accepted', reject: 'Rejected', done: 'Done', close: 'Closed' }[action];
if (now.startsWith(word)) { console.log(`${path.basename(file)} is already "${now}". Nothing changed.`); process.exit(0); }
if (action === 'done' && !now.startsWith('Accepted')) { console.log(`Only an Accepted plan can be Done. Accept it first: npm run accept -- ${file}`); process.exit(1); }

const reason = rest.join(' ').trim();
if (action === 'reject' && !reason) { console.log('Say why: npm run reject -- <file> <reason>'); process.exit(1); }
const line = { accept: `Accepted ${date} by ${who}`, reject: `Rejected ${date} by ${who}: ${reason}`, done: `Done ${date}`, close: `Closed ${date}` }[action];

if (!/^##\s+Status\s*$/m.test(text)) text = text.trimEnd() + '\n\n## Status\n';
text = setStatus(text, line);
fs.writeFileSync(file, text);
console.log(`${path.basename(file)}: Status is now "${line}".`);
console.log(`Next: git add ${file} && git commit -m "docs(${kind}): ${action} ${path.basename(file, '.md').slice(7)}"`);
