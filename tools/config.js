// Read project.config.json for the npm run commands. When the file is broken (often a hand edit),
// say where and how to fix it, instead of crashing with a wall of Node errors.
'use strict';
const fs = require('fs');
const path = require('path');

function loadConfig(root = process.cwd()) {
  const file = path.join(root, 'project.config.json');
  let text;
  try { text = fs.readFileSync(file, 'utf8'); } catch {
    console.log('There is no project.config.json here. Run this from the top of your project folder.');
    process.exit(1);
  }
  try { return JSON.parse(text.replace(/^\uFEFF/, '')); } catch (e) {
    const lineOf = (i) => text.slice(0, i).split('\n').length;
    const given = /line (\d+)/.exec(e.message);
    const pos = /position (\d+)/.exec(e.message);
    const comma = /,\s*[\]}]/.exec(text);
    const line = given ? Number(given[1]) : pos ? lineOf(Number(pos[1])) : comma ? lineOf(comma.index) : null;
    console.log(`project.config.json is broken${line ? ` near line ${line}` : ''}, so nothing can run until it is fixed.`);
    console.log('Common causes: a comma after the last item in a list, a missing comma, or a missing quote.');
    console.log('To see what changed since your last commit: git diff project.config.json');
    process.exit(1);
  }
}

module.exports = { loadConfig };
