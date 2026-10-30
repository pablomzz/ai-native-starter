# Loop: five protopersonas meet a mistaken agent

## Tried
Research first. Four research notes and a report on the AI-native SDLC and newcomers are in `research_notes/` and `reports/`. From them, five protopersonas (`docs/research/protopersonas.md`) ran sessions where the agent made the mistakes the research documents: claiming "tests pass" after breaking code, editing or deleting the failing test, faking the test script, removing CI's test step, `--no-verify`, made-up packages, `curl | sh`, switching off hooks, pushing to main, deleting folders. The starter's real hooks decided each action. The personas answered prompts the way the research predicts.

## Saw
Of 26 agent mistakes, 15 went through without any prompt, and personas approved 7 more. The worst case: after "break the code, then edit the test", both `npm run test` and `npm run check` passed. Nobody would notice. The only mistake any check caught afterwards was a pasted key.

## Changed
- With the owner's yes, a new hook, `tools/hooks/guard-checks.js`, asks before Claude:
  - changes or removes what an existing test checks, even inside a single line;
  - deletes a test;
  - changes the `test` or `check` script;
  - edits CI;
  - commits with `--no-verify`.
  
  Writing new tests stays allowed. Evals 26 to 38 cover both sides.
- New `tools/checks/check-integrity.js`, inside `npm run check`, fails when the test script, CI's test step or a hook has been switched off. It runs in CI, so it catches these even after someone said yes.
- `CLAUDE.md` has "Proof, not promises":
  - plan in three steps before building;
  - never claim "tests pass" without showing the run;
  - fix the code, not the test;
  - check a package exists before adding it;
  - use `im-lost` when the owner is lost.
- New skill `im-lost`: stop and show the goal, the plan, what changed, whether the checks pass, and one next step.
- The verifier now reads changes to tests, CI and `package.json`.
- `REVIEW.md` has item 8, "Checks still check".
- The pull request template asks three questions in the owner's own words.
- `docs/guide.html`:
  - fresh session per stage;
  - run the tests yourself instead of trusting "all tests pass";
  - help answers for the new hook and `im-lost`.
- `npm run simulate` re-runs the five personas.

Results, with the same script on both versions: silent mistakes fell from 15 to 7. Refusals rose from 4 to 6. Sessions flagged by `npm run check` rose from 1 to 2 of 5.

## Open
The owner was asked about three more guardrail changes and has not approved them yet. They cover the 7 mistakes that still go through silently:
- Ask before `npm install <new package>`, `pip install <name>` and `curl | sh`, and say how to check the package is real.
- A Stop hook that runs the tests before Claude says it is done, when code changed.
- Deny, rather than ask, `rm -rf` of the project's main folders, and Claude removing hooks from `.claude/settings.json`.

Also still open:
- The personas are inferred. Check them against a few real newcomers before larger changes.
- Still nobody on real Windows.
