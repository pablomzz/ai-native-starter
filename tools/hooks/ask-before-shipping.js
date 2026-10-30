// Hook: ask the owner before a command that ships, merges into main, overwrites history or deletes folders.
// The patterns live in project.config.json "askBeforeCommands". A bare "git push" while on the main branch also asks.
'use strict';
const { decide, runHook, readConfig, isPlaceholder, currentBranch } = require('../lib');
const HOOK = 'ask-before-shipping';

runHook(HOOK, (input) => {
  const cmd = String((input.tool_input || {}).command || '');
  const cfg = readConfig();
  const main = cfg.defaultBranch && !isPlaceholder(cfg.defaultBranch) ? cfg.defaultBranch : 'main';

  for (const pattern of cfg.askBeforeCommands || []) {
    if (!pattern || isPlaceholder(pattern)) continue;
    let re;
    try { re = new RegExp(pattern); } catch { decide(HOOK, 'ask', `The pattern "${pattern}" in project.config.json is not valid, so asking to be safe.`); }
    if (re.test(cmd)) decide(HOOK, 'ask', `This command matches "${pattern}" in askBeforeCommands. The owner approves every push or merge to ${main}, force push, deploy and folder delete.`);
  }

  // "git push" with no branch named pushes the current branch. Ask when that branch is main.
  const pushesCurrent = /(^|[;&|]\s*)git\s+push(\s+(-u|--set-upstream)?\s*(origin)?\s*)?\s*($|[;&|])/.test(cmd);
  const branch = process.env.STARTER_TEST_BRANCH || currentBranch();
  if (pushesCurrent && branch === main) decide(HOOK, 'ask', `You are on ${main}, so "git push" would push straight to it. The owner approves every push to ${main}.`);

  decide(HOOK, 'allow', 'no gated command');
});
