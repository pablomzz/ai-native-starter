# ai-native-starter

A small project built with an AI-native workflow.

Owners: pablomzz. Dates use Etc/GMT+3 time, written as `yymmdd`.

## Commands
- Run it: `npm run start` (node tools/open.js src/index.html)
- Test: `npm run test` (node --test)
- Lint: `npm run lint` (echo "no linter yet")
- Build: `npm run build` (echo "no build step: the page runs as it is")
- Process checks: `npm run check` (docs chain, guardrail evals, secrets, placeholders)
- New document: `npm run new -- <intent|spec|plan|incident|loop> <short-name>`
- Change a Status: `npm run accept -- <file>`, `npm run reject -- <file> <reason>`, `npm run done -- <plan>`, `npm run close -- <incident>`

## How we work (the loop)
1. Plan: an idea becomes `docs/intent/<yymmdd>-<name>.md` (skill `write-intent`). Only an owner accepts it.
2. Design: an accepted intent becomes `docs/spec/<yymmdd>-<name>.md`, with the skills applied and concerns flagged.
3. Build: for any change to `src/`, start in plan mode. Write `docs/plan/<yymmdd>-<name>.md`, wait for an owner to accept it, then build. Write the tests first.
4. Test: run `npm run test` after each change. Done means the tests and `npm run check` pass (agent `verifier`).
5. Deploy: before a pull request, run the `reviewer` agent against `REVIEW.md` and the plan. Link the plan in the pull request.
6. Maintain: when something breaks, write an incident, add a test or eval that fails on it, and add a loop entry in `docs/loop/`. When a plan's work is merged, mark it Done.

## Conventions
- Plain HTML, CSS and JavaScript. No framework. Tests use node --test and files named *.test.js.
- Keep changes small: one intent, one branch, one pull request. Branch names match the doc name, like `weekly-minutes`.
- Never put a password, token or key in a file. Read secrets from environment variables.
- Write docs in plain language (skill `plain-language`). Explain new words to the owner: they may be new to coding.
- Never change a document's Status yourself unless an owner asks; suggest the `npm run accept` command instead.
- {{ADD_YOUR_OWN_CONVENTION}}

## Architecture
- `src/`: the product code. index.html is the page; each .js file holds functions that tests in tests/ check.
- `tests/`: the tests for `src/`.
- `docs/`: intent, spec, plan, incidents and loop entries. These are the audit trail.
- `tools/`: hooks and checks. `evals/cases/`: guardrail cases the hooks must pass.
- `.claude/`: agents, skills and hook settings.

## Ask an owner first
- A push or merge to `main`, a force push, a deploy, `git reset --hard`, and deleting folders.
- Any edit to the guardrails: `.claude/settings.json`, `tools/hooks/`, `evals/cases/`, `project.config.json`.

## Mistakes Claude made twice
- When Claude makes the same mistake twice, the fix goes here, in the same pull request.
- (none yet)
