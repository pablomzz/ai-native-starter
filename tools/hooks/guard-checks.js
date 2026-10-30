// Hook: ask the owner before Claude weakens the checks that prove the code works.
// That is: changing or removing what an existing test checks, deleting a test file, changing the
// test or check script in package.json, editing CI, or committing with --no-verify.
// Writing new tests stays allowed. When a test fails, the usual fix is the code, not the test.
'use strict';
const fs = require('fs');
const path = require('path');
const { decide, runHook, relPath, ROOT } = require('../lib');
const HOOK = 'guard-checks';

const TEST_FILE = /(^|\/)(tests?|__tests__)\/|\.(test|spec)\.[cm]?[jt]sx?$|(^|\/)test_[^/]*\.py$|_test\.py$/;
const ASSERT_LINE = /\b(assert\w*|expect)\b/;
const assertLines = (text) => String(text || '').split('\n').map((l) => l.trim()).filter((l) => ASSERT_LINE.test(l));
const WHY_TEST = 'Fix the code instead, unless the test itself was wrong. Ask Claude why it fails first.';

runHook(HOOK, (input) => {
  const tool = input.tool_name;
  const ti = input.tool_input || {};

  if (tool === 'Bash') {
    const cmd = String(ti.command || '');
    if (/--no-verify\b/.test(cmd)) decide(HOOK, 'ask', 'This skips the checks (--no-verify). A failing check is telling you something. Say yes only if you know why it fails.');
    const del = /(^|[;&|]\s*)(rm|git\s+rm|del|mv)\s([^;&|]*)/.exec(cmd);
    if (del && del[3].split(/\s+/).some((a) => a && !a.startsWith('-') && TEST_FILE.test(a.replace(/\\/g, '/')))) decide(HOOK, 'ask', `Deleting a test can hide a bug. ${WHY_TEST}`);
    if (/npm\s+pkg\s+(set|delete)\s+scripts\.(test|check)\b/.test(cmd)) decide(HOOK, 'ask', 'This changes what "npm run test" or "npm run check" runs, so they could pass without checking. Say yes only if you asked for it.');
    return decide(HOOK, 'allow', 'no check is weakened');
  }

  const rel = relPath(ti.file_path || ti.notebook_path);
  if (!rel) return decide(HOOK, 'allow', 'no file');

  if (rel.startsWith('.github/workflows/')) decide(HOOK, 'ask', `Changing CI can make a broken change look green on GitHub. Say yes only if you asked for this. (${rel})`);

  if (rel === 'package.json') {
    const changesScript = (s) => /"(test|check)(:\w+)?"\s*:/.test(String(s || ''));
    if (tool === 'Write') {
      let before = {}; let after = {};
      try { before = JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8')).scripts || {}; } catch { /* new or unreadable */ }
      try { after = JSON.parse(ti.content || '{}').scripts || {}; } catch { /* not JSON */ }
      if (['test', 'check'].some((k) => before[k] !== undefined && before[k] !== after[k])) decide(HOOK, 'ask', 'This changes what "npm run test" or "npm run check" runs, so they could pass without checking. Say yes only if you asked for it.');
    } else {
      const edits = Array.isArray(ti.edits) ? ti.edits : [ti];
      if (edits.some((e) => changesScript(e.old_string))) decide(HOOK, 'ask', 'This changes what "npm run test" or "npm run check" runs, so they could pass without checking. Say yes only if you asked for it.');
    }
    return decide(HOOK, 'allow', 'package.json change does not touch the checks');
  }

  if (!TEST_FILE.test(rel)) return decide(HOOK, 'allow', 'not a test');

  // An assertion that was there before and is gone or different afterwards.
  const lost = (before, after) => { const keep = new Set(assertLines(after)); return assertLines(before).filter((l) => !keep.has(l)); };
  let gone = [];
  if (tool === 'Write') {
    let old = '';
    try { old = fs.readFileSync(path.join(ROOT, rel), 'utf8'); } catch { /* a new test file */ }
    gone = lost(old, ti.content);
  } else {
    // Apply the edit to the whole file, because the changed text may be only part of an assertion line.
    const edits = Array.isArray(ti.edits) ? ti.edits : [ti];
    let old = null;
    try { old = fs.readFileSync(path.join(ROOT, rel), 'utf8'); } catch { /* fall back to the edited text alone */ }
    if (old === null) {
      for (const e of edits) gone = gone.concat(lost(e.old_string, e.new_string));
    } else {
      let now = old;
      for (const e of edits) {
        const from = String(e.old_string || ''); const to = String(e.new_string || '');
        if (from) now = e.replace_all ? now.split(from).join(to) : now.replace(from, () => to);
      }
      gone = lost(old, now);
    }
  }
  if (gone.length) decide(HOOK, 'ask', `Changing a test so it passes can hide a bug. ${WHY_TEST} (${rel}: ${gone[0].slice(0, 60)})`);
  decide(HOOK, 'allow', 'test change keeps every existing check');
});
