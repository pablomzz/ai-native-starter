// Hook: guard files by the rules in project.config.json.
// "protectedPaths": Claude may never edit them (secrets).
// "askBeforeEditing": Claude asks you first (the guardrails themselves, so Claude cannot quietly switch them off).
'use strict';
const { decide, runHook, readConfig, globToRegExp, relPath, isPlaceholder } = require('../lib');
const HOOK = 'protect-paths';

runHook(HOOK, (input) => {
  const rel = relPath((input.tool_input || {}).file_path || (input.tool_input || {}).notebook_path);
  const cfg = readConfig();
  const hit = (list) => (list || []).find((g) => g && !isPlaceholder(g) && globToRegExp(g).test(rel));

  const p = hit(cfg.protectedPaths);
  if (p) decide(HOOK, 'deny', `${rel} is a protected file (rule "${p}" in project.config.json). Change it by hand if you really need to.`);

  const a = hit(cfg.askBeforeEditing);
  if (a) decide(HOOK, 'ask', `${rel} is part of the project's guardrails (rule "${a}"). Say yes only if you asked for this change and understand it.`);

  decide(HOOK, 'allow', 'not guarded');
});
