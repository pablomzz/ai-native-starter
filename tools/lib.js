// Shared helpers for the hooks and checks. No packages needed: Node 18 or newer.
'use strict';
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

// Hooks get the project folder from Claude Code; checks run from the project folder.
const ROOT = process.env.CLAUDE_PROJECT_DIR || process.cwd();

// A placeholder looks like {{NAME}}. Built by concatenation so this file does not match itself.
const PLACEHOLDER_RE = new RegExp('\\{' + '\\{([A-Z][A-Z0-9_]+)\\}' + '\\}', 'g');
const isPlaceholder = (s) => typeof s === 'string' && new RegExp(PLACEHOLDER_RE.source).test(s);

function readConfig(root = ROOT) {
  return JSON.parse(fs.readFileSync(path.join(root, 'project.config.json'), 'utf8'));
}

// The people who may accept intents, specs and plans. "owners" is a list; "owner" is the old single field.
function owners(cfg) {
  const list = Array.isArray(cfg.owners) ? cfg.owners : [cfg.owner];
  return list.filter((o) => o && !isPlaceholder(o));
}

// Today's date as yymmdd in the project's time zone (or the computer's, before init).
function today(tz, now = new Date()) {
  const opts = { year: '2-digit', month: '2-digit', day: '2-digit' };
  if (tz && !isPlaceholder(tz)) opts.timeZone = tz;
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-GB', opts).formatToParts(now).map((p) => [p.type, p.value]));
  return parts.year + parts.month + parts.day;
}

// Whole days between two yymmdd dates.
function daysBetween(a, b) {
  const d = (s) => Date.UTC(2000 + Number(s.slice(0, 2)), Number(s.slice(2, 4)) - 1, Number(s.slice(4, 6)));
  return Math.round((d(b) - d(a)) / 86400000);
}

// "*.pem" or ".env.*" or "tools/hooks/" -> RegExp tested against a relative path.
function globToRegExp(glob) {
  const esc = glob.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '[^/]*').replace(/\?/g, '.');
  if (glob.endsWith('/')) return new RegExp('^' + esc);
  return new RegExp('(^|/)' + esc + '$');
}

function relPath(filePath, root = ROOT) {
  if (!filePath) return '';
  const abs = path.isAbsolute(filePath) ? filePath : path.join(root, filePath);
  return path.relative(root, abs).split(path.sep).join('/');
}

// The first real line under "## Status".
function statusOf(text) {
  const lines = text.split(/\r?\n/);
  const i = lines.findIndex((l) => /^##\s+Status\s*$/.test(l));
  if (i < 0) return null;
  for (const l of lines.slice(i + 1)) {
    const t = l.trim();
    if (!t) continue;
    if (t.startsWith('<!--') || t.startsWith('#')) return null;
    return t;
  }
  return null;
}

function setStatus(text, line) {
  return text.replace(/(^##\s+Status\s*\r?\n)(\s*\r?\n)*([^\r\n<#][^\r\n]*)?/m, (m, head) => head + line + '\n');
}

function section(text, name) {
  const esc = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const m = new RegExp('^##\\s+' + esc + '\\s*$', 'm').exec(text);
  if (!m) return null;
  const rest = text.slice(m.index + m[0].length);
  const next = rest.search(/^##\s/m);
  return (next < 0 ? rest : rest.slice(0, next)).trim();
}

// Secret patterns, shared by the edit hook and the repo scan. Split so no full sample sits here.
const SECRET_PATTERNS = [
  ['a private key', new RegExp('-----BEGIN [A-Z ]*' + 'PRIVATE KEY-----')],
  ['an AWS access key', new RegExp('AK' + 'IA[0-9A-Z]{16}')],
  ['a GitHub token', new RegExp('gh' + '[pousr]_[A-Za-z0-9]{30,}')],
  ['an Anthropic API key', new RegExp('sk-' + 'ant-[A-Za-z0-9_-]{20,}')],
  ['an OpenAI-style API key', new RegExp('sk-' + '(proj-)?[A-Za-z0-9]{32,}')],
  ['a Slack token', new RegExp('xo' + 'x[abpr]-[A-Za-z0-9-]{10,}')],
  ['a Stripe key', new RegExp('(sk|rk)_' + '(live|test)_[A-Za-z0-9]{16,}')],
  ['a Google API key', new RegExp('AI' + 'za[0-9A-Za-z_-]{35}')],
  // key = "..." that mixes capitals, small letters and digits, like real keys do.
  // Names such as key: "ArrowLeft" or a storage name like "study-planner-v1" stay allowed.
  ['a key written in code', new RegExp('\\b[Kk][Ee][Yy]["\'\\]]*\\s*[:=]\\s*["\'](?=[^"\'\\s]*\\d)(?=[^"\'\\s]*[a-z])(?=[^"\'\\s]*[A-Z])[^"\'\\s]{20,}["\']')],
  // password = "...", API_KEY: '...', config["SECRET_KEY"] = "..."
  ['a password or key written in code', new RegExp('(password|passwd|secret|api_?key|token)(_?key)?["\'\\]]*\\s*[:=]\\s*["\'][^"\'\\s]{8,}["\']', 'i')],
];
function findSecret(text) {
  for (const [name, re] of SECRET_PATTERNS) if (re.test(text)) return name;
  return null;
}

function currentBranch(root = ROOT) {
  const r = spawnSync('git', ['rev-parse', '--abbrev-ref', 'HEAD'], { cwd: root, encoding: 'utf8' });
  return r.status === 0 ? r.stdout.trim() : '';
}

function readHookInput() {
  try { return JSON.parse(fs.readFileSync(0, 'utf8')); } catch { return null; }
}

function log(hook, decision, reason) {
  try {
    const dir = path.join(ROOT, '.claude', 'logs');
    fs.mkdirSync(dir, { recursive: true });
    fs.appendFileSync(path.join(dir, 'hook-decisions.jsonl'), JSON.stringify({ at: new Date().toISOString(), hook, decision, reason }) + '\n');
  } catch { /* logging is best effort */ }
}

// Tell Claude Code what to do. "allow" prints nothing, so normal permissions apply.
function decide(hook, decision, reason) {
  log(hook, decision, reason);
  if (decision !== 'allow') {
    process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision: decision, permissionDecisionReason: reason } }));
  }
  process.exit(0);
}

// A gate fails closed. Wrap a hook's body: any crash, or input that cannot be read, becomes "ask".
function runHook(hook, body) {
  try {
    const input = readHookInput();
    if (!input || typeof input !== 'object') return decide(hook, 'ask', hook + ': could not read the hook input, so asking to be safe.');
    body(input);
  } catch (e) {
    decide(hook, 'ask', `${hook} hit an error (${e && e.message}), so it is asking to be safe.`);
  }
}

module.exports = {
  ROOT, PLACEHOLDER_RE, isPlaceholder, readConfig, owners, today, daysBetween, globToRegExp, relPath,
  statusOf, setStatus, section, findSecret, SECRET_PATTERNS, currentBranch, decide, runHook,
};
