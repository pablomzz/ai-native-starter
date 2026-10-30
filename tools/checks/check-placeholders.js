// List every {{PLACEHOLDER}} still waiting to be filled in.
'use strict';
const fs = require('fs');
const path = require('path');
const { PLACEHOLDER_RE } = require('../lib');

const SKIP_DIRS = new Set(['.git', 'node_modules', 'examples', 'evals', 'tools']);
const TEXT = /\.(md|json|ya?ml|js|txt)$/;

function walk(dir, root, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) { if (!SKIP_DIRS.has(e.name)) walk(path.join(dir, e.name), root, out); continue; }
    if (!TEXT.test(e.name)) continue;
    const full = path.join(dir, e.name);
    const text = fs.readFileSync(full, 'utf8');
    for (const m of text.matchAll(new RegExp(PLACEHOLDER_RE.source, 'g'))) {
      if (m[1] === 'PLACEHOLDER') continue; // the word used in explanations
      out.push({ file: path.relative(root, full).split(path.sep).join('/'), name: m[1] });
    }
  }
  return out;
}

function checkPlaceholders(root) { return walk(root, root, []); }

module.exports = { checkPlaceholders };
if (require.main === module) {
  const left = checkPlaceholders(process.cwd());
  left.forEach((p) => console.log(`  ${p.file}: ${p.name}`));
  console.log(`placeholders: ${left.length} left`);
}
