// Tests for the starter's own helpers (npm run init, new, accept), run on a throwaway copy of the folder.
// Each one comes from a first-timer who got stuck; see docs/loop/ for the story.
'use strict';
const { test, after } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const TOOLS = __dirname;
const TEMPLATE_CONFIG = {
  projectName: '{{PROJECT_NAME}}', owners: ['{{YOUR_NAME}}'], timezone: '{{TIMEZONE}}', defaultBranch: 'main',
  stack: '{{STACK}}', commands: { build: '{{BUILD_COMMAND}}', test: '{{TEST_COMMAND}}', lint: '{{LINT_COMMAND}}', run: '{{RUN_COMMAND}}' },
};

// Child commands must not find this project or its repository through the environment.
const env = Object.fromEntries(Object.entries(process.env).filter(([k]) => k !== 'CLAUDE_PROJECT_DIR' && !k.startsWith('GIT_')));
const made = [];
after(() => made.forEach((d) => fs.rmSync(d, { recursive: true, force: true })));

// A fresh starter folder with its own git name, so tests never touch this project.
function sandbox(gitName = 'Sam') {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'starter-'));
  made.push(dir);
  fs.cpSync(TOOLS, path.join(dir, 'tools'), { recursive: true });
  for (const kind of ['intent', 'spec', 'plan', 'incidents', 'loop']) {
    fs.mkdirSync(path.join(dir, 'docs', kind), { recursive: true });
    const tpl = path.join(TOOLS, '..', 'docs', kind, 'TEMPLATE.md');
    if (fs.existsSync(tpl)) fs.copyFileSync(tpl, path.join(dir, 'docs', kind, 'TEMPLATE.md'));
  }
  fs.writeFileSync(path.join(dir, 'project.config.json'), JSON.stringify(TEMPLATE_CONFIG, null, 2));
  spawnSync('git', ['init', '-q'], { cwd: dir, env });
  spawnSync('git', ['config', 'user.name', gitName], { cwd: dir, env });
  return dir;
}
const run = (dir, args, input = '') => {
  const r = spawnSync('node', args, { cwd: dir, input, encoding: 'utf8', env });
  return { code: r.status, out: r.stdout + r.stderr };
};
// Answers in order: name, description, owners, time zone, branch, stack, deploy word.
const init = (dir, { owners = '', tz = 'UTC', stack = '1' } = {}) =>
  run(dir, ['tools/init.js'], ['', '', owners, tz, '', stack, ''].join('\n'));
const config = (dir) => JSON.parse(fs.readFileSync(path.join(dir, 'project.config.json'), 'utf8'));

test('init turns "GMT-3" into a real time zone instead of falling back to UTC', () => {
  const dir = sandbox();
  init(dir, { tz: 'GMT-3' });
  assert.equal(config(dir).timezone, 'Etc/GMT+3');
});

test('init understands UTC+2 and a bare -5', () => {
  const a = sandbox(); init(a, { tz: 'UTC+2' });
  const b = sandbox(); init(b, { tz: '-5' });
  assert.equal(config(a).timezone, 'Etc/GMT-2');
  assert.equal(config(b).timezone, 'Etc/GMT+5');
});

test('init says so when it cannot read the time zone', () => {
  const dir = sandbox();
  const r = init(dir, { tz: 'Mars/Base' });
  assert.match(r.out, /not a time zone name/);
});

test('init suggests your git name as the owner', () => {
  const dir = sandbox('Maya');
  init(dir);
  assert.deepEqual(config(dir).owners, ['Maya']);
});

test('the Python stack comes with requirements-dev.txt and says to install it', () => {
  const dir = sandbox();
  const r = init(dir, { stack: '2' });
  assert.ok(fs.existsSync(path.join(dir, 'requirements-dev.txt')));
  assert.match(r.out, /pip install -r requirements-dev\.txt/);
});

test('accept refuses an intent that is still the empty template', () => {
  const dir = sandbox('Maya');
  init(dir);
  run(dir, ['tools/new-doc.js', 'intent', 'timer']);
  const file = fs.readdirSync(path.join(dir, 'docs', 'intent')).find((f) => f.endsWith('-timer.md'));
  const r = run(dir, ['tools/status.js', 'accept', `docs/intent/${file}`]);
  assert.equal(r.code, 1);
  assert.match(r.out, /still has "<short title>"/);
});

test('accept works for an owner once the intent is filled in', () => {
  const dir = sandbox('Maya');
  init(dir);
  run(dir, ['tools/new-doc.js', 'intent', 'timer']);
  const file = path.join(dir, 'docs', 'intent', fs.readdirSync(path.join(dir, 'docs', 'intent')).find((f) => f.endsWith('-timer.md')));
  fs.writeFileSync(file, fs.readFileSync(file, 'utf8').replace('<short title>', 'study timer').replace('<something you can see or test>', 'the timer counts down'));
  const r = run(dir, ['tools/status.js', 'accept', path.relative(dir, file)]);
  assert.equal(r.code, 0, r.out);
  assert.match(fs.readFileSync(file, 'utf8'), /^Accepted \d{6} by Maya$/m);
});

test('accept refuses someone who is not an owner, and says how to fix it', () => {
  const dir = sandbox('Maya');
  init(dir);
  spawnSync('git', ['config', 'user.name', 'Visitor'], { cwd: dir, env });
  run(dir, ['tools/new-doc.js', 'intent', 'timer']);
  const file = fs.readdirSync(path.join(dir, 'docs', 'intent')).find((f) => f.endsWith('-timer.md'));
  const r = run(dir, ['tools/status.js', 'accept', `docs/intent/${file}`]);
  assert.equal(r.code, 1);
  assert.match(r.out, /Only an owner/);
  assert.match(r.out, /git config --global user\.name "Maya"/);
});

test('new drops apostrophes from the short name', () => {
  const dir = sandbox();
  init(dir);
  const r = run(dir, ['tools/new-doc.js', 'intent', "Show Today's Date"]);
  assert.match(r.out, /-show-todays-date\.md/);
});

test('init does not save a half-hour offset that older Node versions cannot read', () => {
  const dir = sandbox();
  const r = init(dir, { tz: '+05:30' });
  assert.match(r.out, /not a time zone name/);
  assert.doesNotMatch(config(dir).timezone, /^[+-]/);
});

test('marking a plan Done does not need an owner name', () => {
  const dir = sandbox('Maya');
  init(dir);
  spawnSync('git', ['config', 'user.name', 'Visitor'], { cwd: dir, env });
  run(dir, ['tools/new-doc.js', 'plan', 'timer']);
  const file = fs.readdirSync(path.join(dir, 'docs', 'plan')).find((f) => f.endsWith('-timer.md'));
  const r = run(dir, ['tools/status.js', 'done', `docs/plan/${file}`]);
  assert.equal(r.code, 0, r.out);
});
