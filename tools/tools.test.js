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
  const full = path.join(dir, 'docs', 'plan', file);
  fs.writeFileSync(full, fs.readFileSync(full, 'utf8').replace(/^Proposed$/m, 'Accepted 260101 by Maya'));
  const r = run(dir, ['tools/status.js', 'done', `docs/plan/${file}`]);
  assert.equal(r.code, 0, r.out);
});

// From the 31-person round: see docs/loop/ for who ran into each one.
test('init finds a time zone from a city typed the way people say it', () => {
  const a = sandbox(); init(a, { tz: 'Buenos Aires' });
  const b = sandbox(); init(b, { tz: 'kolkata' });
  assert.equal(config(a).timezone, 'America/Buenos_Aires');
  assert.match(config(b).timezone, /^Asia\/(Kolkata|Calcutta)$/);
});

test('init refuses short codes like EST, which mean different places', () => {
  const dir = sandbox();
  const r = init(dir, { tz: 'EST' });
  assert.match(r.out, /not a time zone name/);
  assert.notEqual(config(dir).timezone, 'America/Panama');
});

test('init splits owners written with "and" or semicolons', () => {
  const a = sandbox(); init(a, { owners: 'Ana and Gus' });
  const b = sandbox(); init(b, { owners: 'Hana; Omar' });
  assert.deepEqual(config(a).owners, ['Ana', 'Gus']);
  assert.deepEqual(config(b).owners, ['Hana', 'Omar']);
});

test('a second init changes nothing and says how to change an answer', () => {
  const dir = sandbox();
  init(dir, { tz: 'Europe/Berlin' });
  const r = init(dir, { tz: 'Europe/Madrid' });
  assert.match(r.out, /already set up/);
  assert.equal(config(dir).timezone, 'Europe/Berlin');
});

test('init says so when the stack number is not on the menu', () => {
  const dir = sandbox();
  const r = init(dir, { stack: '7' });
  assert.match(r.out, /"7" is not on the list/);
});

test('new takes "Intents" and explains a kind it does not know', () => {
  const dir = sandbox();
  init(dir);
  assert.match(run(dir, ['tools/new-doc.js', 'Intents', 'idea']).out, /Created docs\/intent\//);
  assert.match(run(dir, ['tools/new-doc.js', 'idea', 'idea']).out, /"idea" is not a kind of document/);
});

test('new tells you to close an incident, not accept it', () => {
  const dir = sandbox();
  init(dir);
  assert.match(run(dir, ['tools/new-doc.js', 'incident', 'broke']).out, /npm run close -- docs\/incidents\//);
});

// A filled-in intent, ready to accept. Returns its path relative to the sandbox.
function readyIntent(dir, name) {
  run(dir, ['tools/new-doc.js', 'intent', name]);
  const rel = `docs/intent/${fs.readdirSync(path.join(dir, 'docs', 'intent')).find((f) => f.endsWith(`-${name}.md`))}`;
  const full = path.join(dir, rel);
  fs.writeFileSync(full, fs.readFileSync(full, 'utf8').replace('<short title>', name).replace('<something you can see or test>', 'it works'));
  return rel;
}

test('accept finds a file typed with backslashes or without its folder', () => {
  const dir = sandbox('Nia');
  init(dir);
  const a = readyIntent(dir, 'notes');
  const b = readyIntent(dir, 'budget');
  assert.equal(run(dir, ['tools/status.js', 'accept', a.replace(/\//g, '\\')]).code, 0);
  assert.equal(run(dir, ['tools/status.js', 'accept', path.basename(b)]).code, 0);
});

test('accepting twice changes nothing the second time', () => {
  const dir = sandbox('Tariq');
  init(dir);
  const rel = readyIntent(dir, 'twice');
  run(dir, ['tools/status.js', 'accept', rel]);
  const before = fs.readFileSync(path.join(dir, rel), 'utf8');
  assert.match(run(dir, ['tools/status.js', 'accept', rel]).out, /already "Accepted/);
  assert.equal(fs.readFileSync(path.join(dir, rel), 'utf8'), before);
});

test('done refuses a plan that was never accepted', () => {
  const dir = sandbox('Vic');
  init(dir);
  run(dir, ['tools/new-doc.js', 'plan', 'rush']);
  const file = fs.readdirSync(path.join(dir, 'docs', 'plan')).find((f) => f.endsWith('-rush.md'));
  const r = run(dir, ['tools/status.js', 'done', `docs/plan/${file}`]);
  assert.equal(r.code, 1);
  assert.match(r.out, /Only an Accepted plan can be Done/);
});

test('a broken project.config.json gets a plain message, not a crash', () => {
  const dir = sandbox();
  init(dir);
  const cfgFile = path.join(dir, 'project.config.json');
  fs.writeFileSync(cfgFile, fs.readFileSync(cfgFile, 'utf8').replace('"main",', '"main",,'));
  for (const args of [['tools/new-doc.js', 'intent', 'x'], ['tools/run.js', 'test'], ['tools/check.js']]) {
    const r = run(dir, args);
    assert.equal(r.code, 1);
    assert.match(r.out, /project\.config\.json is broken near line \d+/);
    assert.doesNotMatch(r.out, /\bat .+:\d+:\d+/);
  }
});

// From the review of the 31-person round.
test('a comma before ] in project.config.json still gets its line number', () => {
  const dir = sandbox();
  init(dir, { owners: 'Ana' });
  const cfgFile = path.join(dir, 'project.config.json');
  fs.writeFileSync(cfgFile, fs.readFileSync(cfgFile, 'utf8').replace('"Ana"', '"Ana",'));
  assert.match(run(dir, ['tools/run.js', 'test']).out, /broken near line \d+/);
});

test('init keeps a name with "y" in it whole, and shows the owners it understood', () => {
  const dir = sandbox();
  const r = init(dir, { owners: 'José Ortega y Gasset, Ana' });
  assert.deepEqual(config(dir).owners, ['José Ortega y Gasset', 'Ana']);
  assert.match(r.out, /Owners: "José Ortega y Gasset", "Ana"/);
});

test('init still knows one-word zone names like Japan', () => {
  const dir = sandbox();
  init(dir, { tz: 'Japan' });
  assert.equal(config(dir).timezone, 'Asia/Tokyo');
});

test('new refuses odd kinds like "constructor" without crashing', () => {
  const dir = sandbox();
  init(dir);
  const r = run(dir, ['tools/new-doc.js', 'constructor', 'x']);
  assert.equal(r.code, 1);
  assert.match(r.out, /is not a kind of document/);
});

// From the protopersona round: a weakened check is caught by npm run check, even after someone said yes.
test('check-integrity flags a fake test script, a CI without tests, and a switched-off hook', () => {
  const { checkIntegrity } = require('./checks/check-integrity');
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'integrity-'));
  made.push(dir);
  fs.mkdirSync(path.join(dir, '.github', 'workflows'), { recursive: true });
  fs.mkdirSync(path.join(dir, '.claude'), { recursive: true });
  fs.mkdirSync(path.join(dir, 'tools', 'hooks'), { recursive: true });
  fs.writeFileSync(path.join(dir, 'tools', 'hooks', 'guard-checks.js'), '');
  const good = () => {
    fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify({ scripts: { test: 'node tools/run.js test', check: 'node tools/check.js' } }));
    fs.writeFileSync(path.join(dir, '.github', 'workflows', 'ci.yml'), 'run: npm run check\nrun: npm run test\n');
    fs.writeFileSync(path.join(dir, '.claude', 'settings.json'), '{"command": "node tools/hooks/guard-checks.js"}');
  };
  good();
  assert.deepEqual(checkIntegrity(dir), []);
  fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify({ scripts: { test: 'echo all tests pass' } }));
  fs.writeFileSync(path.join(dir, '.github', 'workflows', 'ci.yml'), 'run: npm run check\n');
  fs.writeFileSync(path.join(dir, '.claude', 'settings.json'), '{ "hooks": {} }');
  const p = checkIntegrity(dir).join('\n');
  assert.match(p, /"npm run test" now runs "echo all tests pass"/);
  assert.match(p, /no longer runs "npm run test"/);
  assert.match(p, /no longer switches on tools\/hooks\/guard-checks\.js/);
});

// From the review of the protopersona round.
test('check-integrity flags a deleted settings file and a test command that runs nothing', () => {
  const { checkIntegrity } = require('./checks/check-integrity');
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'integrity-'));
  made.push(dir);
  fs.mkdirSync(path.join(dir, '.github', 'workflows'), { recursive: true });
  fs.mkdirSync(path.join(dir, 'tools', 'hooks'), { recursive: true });
  fs.writeFileSync(path.join(dir, 'tools', 'hooks', 'guard-checks.js'), '');
  fs.writeFileSync(path.join(dir, 'tools', 'hooks', 'helper.test.js'), '');
  fs.writeFileSync(path.join(dir, '.github', 'workflows', 'ci.yaml'), '      - run: npm run check\n      - run: npm run test\n');
  fs.writeFileSync(path.join(dir, 'project.config.json'), JSON.stringify({ stack: 'web', commands: { test: 'echo ok' } }));
  const p = checkIntegrity(dir).join('\n');
  assert.match(p, /\.claude\/settings\.json is missing/);
  assert.match(p, /the test command is "echo ok"/);
  assert.doesNotMatch(p, /CI no longer runs/);
  assert.doesNotMatch(p, /helper\.test\.js/);
  fs.writeFileSync(path.join(dir, 'project.config.json'), JSON.stringify({ stack: 'other', commands: { test: 'echo "no tests yet"' } }));
  assert.doesNotMatch(checkIntegrity(dir).join('\n'), /test command/);
});

test('check-integrity does not count a commented-out CI step', () => {
  const { checkIntegrity } = require('./checks/check-integrity');
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'integrity-'));
  made.push(dir);
  fs.mkdirSync(path.join(dir, '.github', 'workflows'), { recursive: true });
  fs.writeFileSync(path.join(dir, '.github', 'workflows', 'ci.yml'), '      - run: npm run check\n      - run: echo skip # npm run test\n');
  assert.match(checkIntegrity(dir).join('\n'), /CI no longer runs "npm run test"/);
});
