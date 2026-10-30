// npm run new -- <intent|spec|plan|incident|loop> <short-name>
// Copies the template with today's date and your name, and links the intent and spec of the same name.
'use strict';
const fs = require('fs');
const path = require('path');
const { readConfig, today, owners } = require('./lib');

const KINDS = { intent: 'intent', spec: 'spec', plan: 'plan', incident: 'incidents', loop: 'loop' };
const [kind, rawName] = process.argv.slice(2);
if (!KINDS[kind] || !rawName) {
  console.log('Usage: npm run new -- <intent|spec|plan|incident|loop> <short-name>');
  console.log('Example: npm run new -- intent study-timer');
  process.exit(1);
}
// Forgive the common slips: spaces, capitals, a date or ".md" typed in.
const name = rawName.toLowerCase().replace(/\.md$/, '').replace(/^\d{6}-/, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
if (!name) { console.log('Use letters, numbers and dashes for the name, like "study-timer".'); process.exit(1); }

const root = process.cwd();
const cfg = readConfig(root);
const date = today(cfg.timezone);
const dir = path.join(root, 'docs', KINDS[kind]);
const target = path.join(dir, `${date}-${name}.md`);
if (fs.existsSync(target)) { console.log(`docs/${KINDS[kind]}/${date}-${name}.md already exists.`); process.exit(1); }

// The newest existing file with this short name, in another folder (any date).
function newest(folder) {
  const d = path.join(root, 'docs', folder);
  if (!fs.existsSync(d)) return null;
  const hits = fs.readdirSync(d).filter((f) => new RegExp(`^\\d{6}-${name}\\.md$`).test(f)).sort();
  return hits.length ? `docs/${folder}/${hits[hits.length - 1]}` : null;
}

let text = fs.readFileSync(path.join(dir, 'TEMPLATE.md'), 'utf8');
const links = { intent: newest('intent'), spec: newest('spec') };
for (const [k, ref] of Object.entries(links)) {
  const re = new RegExp(`docs/${k}/<yymmdd>-<short-name>\\.md`, 'g');
  text = text.replace(re, ref || `docs/${k}/<yymmdd>-<short-name>.md`);
}
text = text.replace(/<yymmdd>/g, date).replace(/<short-name>/g, name);
const who = owners(cfg)[0];
if (who) text = text.replace(/<your name>/g, who);
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(target, text);

const rel = `docs/${KINDS[kind]}/${date}-${name}.md`;
console.log(`Created ${rel}`);
if ((kind === 'spec' || kind === 'plan') && !links.intent) console.log(`Note: no intent named "${name}" yet. Put its path under "## Intent", or write "none: <reason>" for a small fix.`);
if (kind === 'plan' && !links.spec) console.log(`Note: no spec named "${name}". Put its path under "## Spec", or write "none: <reason>".`);
console.log(kind === 'loop' ? 'Next: fill it in, then commit it.' : `Next: fill it in (Claude can help). When it is ready: npm run accept -- ${rel}`);
