// Hook: before Claude edits product code, there must be a recent Accepted plan in docs/plan/.
// It asks rather than blocks, so you can still say yes for a tiny fix.
// A plan counts for "planMaxAgeDays" days after it was accepted (default 14). Mark finished plans Done.
'use strict';
const fs = require('fs');
const path = require('path');
const { ROOT, decide, runHook, readConfig, relPath, statusOf, today, daysBetween } = require('../lib');
const HOOK = 'plan-before-code';

runHook(HOOK, (input) => {
  const rel = relPath((input.tool_input || {}).file_path);
  const cfg = readConfig();
  const guarded = (cfg.planRequiredFor || []).some((p) => rel === p.replace(/\/$/, '') || rel.startsWith(p));
  if (!guarded) decide(HOOK, 'allow', 'not product code');

  const maxAge = Number(cfg.planMaxAgeDays) || 14;
  const now = today(cfg.timezone);
  const dir = path.join(ROOT, 'docs', 'plan');
  let live = [];
  let stale = [];
  if (fs.existsSync(dir)) {
    for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.md') && x !== 'TEMPLATE.md')) {
      const m = /^Accepted (\d{6})\b/.exec(statusOf(fs.readFileSync(path.join(dir, f), 'utf8')) || '');
      if (!m) continue;
      (daysBetween(m[1], now) <= maxAge ? live : stale).push(f);
    }
  }
  if (live.length) decide(HOOK, 'allow', 'accepted plan: ' + live.join(', '));
  const why = stale.length
    ? `The only Accepted plans are older than ${maxAge} days (${stale.join(', ')}). If that work is finished, mark it Done (npm run done -- <file>) and write a plan for this change.`
    : 'There is no Accepted plan in docs/plan/ yet.';
  decide(HOOK, 'ask', `${why} ${rel} is product code. Write the plan first (npm run new -- plan <name>), or say yes if this is a tiny fix.`);
});
