// npm run check: the feedback loop for the process itself.
// --strict makes unfilled placeholders a failure.
'use strict';
const { checkDocs } = require('./checks/check-docs');
const { checkEvals } = require('./checks/check-evals');
const { checkPlaceholders } = require('./checks/check-placeholders');
const { checkSecrets } = require('./checks/check-secrets');

const root = process.cwd();
const strict = process.argv.includes('--strict');
let failed = 0;

const docs = checkDocs(root);
docs.problems.forEach((p) => console.log('  ' + p));
console.log(docs.problems.length ? `✗ docs chain: ${docs.problems.length} problem(s)` : '✓ docs chain: ok');
docs.warnings.forEach((w) => console.log('  (reminder) ' + w));
failed += docs.problems.length ? 1 : 0;

const ev = checkEvals(root);
ev.failures.forEach((p) => console.log('  ' + p));
console.log(`${ev.failures.length ? '✗' : '✓'} guardrail evals: ${ev.total - ev.failures.length}/${ev.total} passed`);
failed += ev.failures.length ? 1 : 0;

const sec = checkSecrets(root);
sec.forEach((p) => console.log('  ' + p));
console.log(sec.length ? `✗ secrets: ${sec.length} found` : '✓ secrets: none found');
failed += sec.length ? 1 : 0;

const left = checkPlaceholders(root);
const names = [...new Set(left.map((p) => p.name))];
if (left.length) {
  const required = ['PROJECT_NAME', 'YOUR_NAME', 'TIMEZONE', 'TEST_COMMAND', 'STACK'];
  console.log(`${strict ? '✗' : '!'} placeholders: ${left.length} left (${names.join(', ')})`);
  if (names.some((n) => required.includes(n))) console.log('  Run "npm run init" to fill in the basics.');
  else console.log('  These are yours to write when you are ready. Search the files for "{{".');
  if (strict) failed += 1;
} else {
  console.log('✓ placeholders: none left');
}

console.log(failed ? `\n${failed} check(s) failed` : '\nall checks passed');
process.exit(failed ? 1 : 0);
