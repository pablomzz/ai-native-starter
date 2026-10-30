// Check the artifact chain: intent -> spec -> plan, plus incidents and loop entries.
// Returns { problems, warnings }. Problems fail the check; warnings are reminders.
'use strict';
const fs = require('fs');
const path = require('path');
const { statusOf, section, today, readConfig, owners, daysBetween } = require('../lib');

const NAME_RE = /^(\d{6})-[a-z0-9]+(-[a-z0-9]+)*\.md$/;
const D = '\\d{6}';
const STATUS = {
  intent: [new RegExp(`^(Proposed|Accepted ${D} by .+|Rejected ${D} by .+: .+)$`), 'Proposed, Accepted <date> by <name>, or Rejected <date> by <name>: <reason>'],
  spec: [new RegExp(`^(Proposed|Accepted ${D} by .+|Rejected ${D} by .+: .+)$`), 'Proposed, Accepted <date> by <name>, or Rejected <date> by <name>: <reason>'],
  plan: [new RegExp(`^(Proposed|Accepted ${D} by .+|Done ${D}.*)$`), 'Proposed, Accepted <date> by <name>, or Done <date>'],
  incidents: [new RegExp(`^(Open|Closed ${D}.*)$`), 'Open, or Closed <date>'],
};
const NEEDED = {
  intent: ['Problem', 'Outcome', 'Status'],
  spec: ['Intent', 'Requirements', 'Status'],
  plan: ['Intent', 'Files that change, in order', 'Proof', 'Status'],
  incidents: ['What happened', 'Guardrail added', 'Status'],
  loop: ['Tried', 'Saw', 'Changed'],
};
const FIX = { intent: 'accept', spec: 'accept', plan: 'accept', incidents: 'close' };

function checkDocs(root) {
  const problems = [];
  const warnings = [];
  let cfg = {};
  try { cfg = readConfig(root); } catch { /* before init */ }
  const now = today(cfg.timezone);
  const docs = {};

  for (const kind of Object.keys(NEEDED)) {
    const dir = path.join(root, 'docs', kind);
    docs[kind] = {};
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.md') && !['TEMPLATE.md', 'README.md'].includes(x))) {
      const rel = `docs/${kind}/${f}`;
      const text = fs.readFileSync(path.join(dir, f), 'utf8');
      docs[kind][rel] = text;
      const m = NAME_RE.exec(f);
      if (!m) problems.push(`${rel}: rename it to <yymmdd>-<short-name>.md, like ${now}-${f.toLowerCase().replace(/\.md$/, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'my-idea'}.md (npm run new makes the name for you)`);
      else if (m[1] > now) problems.push(`${rel}: the date ${m[1]} is after today (${now})`);
      for (const s of NEEDED[kind]) if (section(text, s) === null) problems.push(`${rel}: missing the "## ${s}" heading (compare with docs/${kind}/TEMPLATE.md)`);
      if (!STATUS[kind]) continue;
      const st = statusOf(text);
      if (st !== null || section(text, 'Status') !== null) {
        if (!st || !STATUS[kind][0].test(st)) {
          const who = owners(cfg)[0] || 'Your Name';
          const example = kind === 'incidents' ? `Closed ${now}` : `Accepted ${now} by ${who}`;
          problems.push(`${rel}: the Status line "${st || ''}" is not valid. Use ${STATUS[kind][1]}, for example "${example}". Easiest: npm run ${FIX[kind]} -- ${rel}`);
        }
      }
      // A plan left Accepted for weeks keeps unlocking src/. Remind to mark it Done.
      const acc = /^Accepted (\d{6})\b/.exec(st || '');
      const maxAge = Number(cfg.planMaxAgeDays) || 14;
      if (kind === 'plan' && acc && daysBetween(acc[1], now) > maxAge) warnings.push(`${rel}: Accepted ${daysBetween(acc[1], now)} days ago. If it is finished: npm run done -- ${rel}`);
    }
  }

  const isAccepted = (text) => /^Accepted\b/.test(statusOf(text) || '');
  const linkTo = (text, name) => {
    const body = section(text, name) || '';
    const m = /docs\/[a-z]+\/[\w.-]+\.md/.exec(body);
    return { none: /^none\b/i.test(body), ref: m && m[0], body };
  };
  const missing = (rel, kind, ref) => {
    const short = ref.split('/').pop().replace(/^\d{6}-/, '');
    const same = Object.keys(docs[kind]).filter((r) => r.endsWith('-' + short));
    return `${rel}: the ${kind} ${ref} does not exist${same.length ? `. Did you mean ${same[same.length - 1]}?` : ''}`;
  };

  // One thing in progress: more than one Accepted plan that is not Done means work is piling up.
  const open = Object.entries(docs.plan).filter(([, t]) => isAccepted(t)).map(([r]) => r);
  if (open.length > 1) warnings.push(`${open.length} plans are in progress at once (${open.join(', ')}). Finish one first: npm run done -- <plan>`);

  for (const [rel, text] of Object.entries(docs.spec)) {
    const l = linkTo(text, 'Intent');
    if (!l.ref) { problems.push(`${rel}: under "## Intent", write the intent's path, like docs/intent/${now}-my-idea.md`); continue; }
    if (!docs.intent[l.ref]) problems.push(missing(rel, 'intent', l.ref));
    else if (isAccepted(text) && !isAccepted(docs.intent[l.ref])) problems.push(`${rel}: the spec is Accepted but ${l.ref} is not. Accept the intent first.`);
  }

  for (const [rel, text] of Object.entries(docs.plan)) {
    for (const [name, kind] of [['Intent', 'intent'], ['Spec', 'spec']]) {
      const l = linkTo(text, name);
      if (l.none) continue;
      if (!l.ref) { problems.push(`${rel}: under "## ${name}", write the ${kind}'s path, or "none: <reason>" for a small fix`); continue; }
      if (!docs[kind][l.ref]) problems.push(missing(rel, kind, l.ref));
      else if (isAccepted(text) && !isAccepted(docs[kind][l.ref])) problems.push(`${rel}: the plan is Accepted but ${l.ref} is not. Accept it first.`);
    }
  }
  return { problems, warnings };
}

module.exports = { checkDocs };
if (require.main === module) {
  const { problems, warnings } = checkDocs(process.cwd());
  problems.forEach((x) => console.log('  ' + x));
  warnings.forEach((x) => console.log('  (reminder) ' + x));
  console.log(problems.length ? `docs: ${problems.length} problem(s)` : 'docs: ok');
  process.exit(problems.length ? 1 : 0);
}
