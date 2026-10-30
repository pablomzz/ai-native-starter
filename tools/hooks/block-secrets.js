// Hook: refuse an edit that would write a secret into a file.
'use strict';
const { decide, runHook, findSecret } = require('../lib');
const HOOK = 'block-secrets';

runHook(HOOK, (input) => {
  const ti = input.tool_input || {};
  const edits = Array.isArray(ti.edits) ? ti.edits.map((e) => e.new_string || '') : [];
  const found = findSecret([ti.content, ti.new_string, ...edits].filter(Boolean).join('\n'));
  if (found) {
    decide(HOOK, 'deny', `This edit looks like it contains ${found}. Secrets go in environment variables, never in files. Read it from the environment instead (process.env in JavaScript, os.environ in Python).`);
  }
  decide(HOOK, 'allow', 'no secret found');
});
