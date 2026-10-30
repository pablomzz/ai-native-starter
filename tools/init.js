// npm run init: fill in the basic placeholders by answering a few questions.
// npm run init -- --yes uses the defaults (the plain web stack). Answers can also be piped in, one per line.
'use strict';
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { PLACEHOLDER_RE, today } = require('./lib');

const root = process.cwd();
const useDefaults = process.argv.includes('--yes');
const tzGuess = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
const STACKS = JSON.parse(fs.readFileSync(path.join(__dirname, 'stacks', 'stacks.json'), 'utf8'));
const STACK_IDS = Object.keys(STACKS);

if (!fs.existsSync(path.join(root, 'project.config.json')) || !fs.existsSync(path.join(root, 'tools', 'init.js'))) {
  console.log('Run this from the top of your project folder (the one with project.config.json).');
  process.exit(1);
}

// Piped answers arrive all at once, so read them first; a person typing gets questions one by one.
async function makeAsker() {
  if (useDefaults) return async (q, def) => def;
  if (!process.stdin.isTTY) {
    const lines = fs.readFileSync(0, 'utf8').split(/\r?\n/);
    return async (q, def) => { const a = (lines.shift() || '').trim(); console.log(`${q} [${def}]: ${a}`); return a || def; };
  }
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const ask = (q, def) => new Promise((res) => rl.question(`${q} [${def}]: `, (a) => res(a.trim() || def)));
  ask.close = () => rl.close();
  return ask;
}

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['.git', 'node_modules', 'examples', 'tools', 'evals'].includes(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else if (/\.(md|json|ya?ml)$/.test(e.name)) out.push(full);
  }
  return out;
}

function copyDir(from, to) {
  for (const e of fs.readdirSync(from, { withFileTypes: true })) {
    const a = path.join(from, e.name); const b = path.join(to, e.name);
    if (e.isDirectory()) { fs.mkdirSync(b, { recursive: true }); copyDir(a, b); }
    else if (!fs.existsSync(b)) fs.copyFileSync(a, b);
  }
}

(async () => {
  const ask = await makeAsker();
  if (!useDefaults && process.stdin.isTTY) console.log('Answer a few questions. Press Enter to keep the suggestion in [brackets].\n');

  const A = {};
  A.PROJECT_NAME = await ask('Project name', path.basename(root));
  A.ONE_LINE_DESCRIPTION = await ask('In one line, what does it do?', 'A small project built with an AI-native workflow.');
  A.YOUR_NAME = await ask('Your name. Working with friends? List every owner, separated by commas', 'Owner');
  A.TIMEZONE = await ask('Your time zone', tzGuess);
  A.DEFAULT_BRANCH = await ask('Main branch name', 'main');

  console.log('\nWhat will you build with?');
  STACK_IDS.forEach((id, i) => console.log(`  ${i + 1}. ${STACKS[id].label}`));
  let pick = (await ask('Pick a number', '1')).toLowerCase();
  let stack = STACK_IDS[Number(pick) - 1] || (STACK_IDS.includes(pick) ? pick : 'web');
  A.STACK = stack;

  const preset = STACKS[stack];
  const cmd = async (key, q, def) => (stack === 'other' ? ask(q, def) : preset[key]);
  A.LANGUAGE_AND_FRAMEWORK = await cmd('LANGUAGE_AND_FRAMEWORK', 'Language and framework', 'Describe your language and framework here.');
  A.BUILD_COMMAND = await cmd('BUILD_COMMAND', 'Build command', 'echo "no build step yet"');
  A.TEST_COMMAND = await cmd('TEST_COMMAND', 'Test command', 'echo "no tests yet"');
  A.LINT_COMMAND = await cmd('LINT_COMMAND', 'Lint command', 'echo "no linter yet"');
  A.RUN_COMMAND = await cmd('RUN_COMMAND', 'Command to run it', 'echo "no run command yet"');
  if (preset.DESCRIBE_SRC_LAYOUT) A.DESCRIBE_SRC_LAYOUT = preset.DESCRIBE_SRC_LAYOUT;
  A.DEPLOY_COMMAND_PATTERN = await ask('A word in your deploy command, so Claude asks first (for example: deploy)', 'deploy');
  if (ask.close) ask.close();

  try { new Intl.DateTimeFormat('en-GB', { timeZone: A.TIMEZONE }); } catch {
    console.log(`"${A.TIMEZONE}" is not a time zone name, so using ${tzGuess}.`);
    A.TIMEZONE = tzGuess;
  }
  A.START_DATE = today(A.TIMEZONE);
  const ownerList = A.YOUR_NAME.split(',').map((s) => s.trim()).filter(Boolean);
  A.YOUR_NAME = ownerList.join(', ');

  let changed = 0;
  for (const file of walk(root)) {
    const isJson = file.endsWith('.json');
    const before = fs.readFileSync(file, 'utf8');
    const after = before.replace(new RegExp(PLACEHOLDER_RE.source, 'g'), (whole, key) => {
      if (!(key in A)) return whole;
      return isJson ? JSON.stringify(A[key]).slice(1, -1) : A[key];
    });
    if (after !== before) { fs.writeFileSync(file, after); changed++; }
  }

  const cfgPath = path.join(root, 'project.config.json');
  const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
  cfg.owners = ownerList;
  cfg.defaultBranch = A.DEFAULT_BRANCH;
  fs.writeFileSync(cfgPath, JSON.stringify(cfg, null, 2) + '\n');

  // Starter code with one passing test, so "npm run test" means something from the first day.
  const stackDir = path.join(__dirname, 'stacks', stack);
  if (fs.existsSync(stackDir)) copyDir(stackDir, root);

  // The first loop entry.
  const loopFile = path.join(root, 'docs', 'loop', `${A.START_DATE}-started.md`);
  if (!fs.existsSync(loopFile)) {
    fs.writeFileSync(loopFile, `# Loop: started from the AI-native starter\n\n## Tried\nSet up the folder with npm run init (stack: ${stack}).\n\n## Saw\n(Write what surprised you during setup.)\n\n## Changed\nNothing yet: a note only.\n\n## Open\nWrite the first intent.\n`);
  }

  console.log(`\nDone: filled in ${changed} file(s), added ${stack} starter code and docs/loop/${A.START_DATE}-started.md.`);
  console.log('Next: npm run check, then npm run test');
})();
