# ai-native-starter

A small project built with an AI-native workflow.

This project starts from the **AI-native starter**: a folder that sets up a six-stage loop (Plan, Design, Build, Test, Deploy, Maintain) for working with Claude Code. Each stage ends by saving one file to git, and the next stage starts by reading it.

## First time here
1. Install Git, Node.js 18 or newer, and Claude Code. On Windows, use the Git Bash app as your terminal.
2. In this folder, run `npm run init` and answer the questions. It fills in the `{{PLACEHOLDER}}` blanks, asks which stack you want, and adds starter code with one passing test.
3. Run `npm run check` (it should end with `all checks passed`), then `npm run test`.
4. Make your first commit: `git init -b main && git add . && git commit -m "chore: start from the AI-native starter"`.
5. Open Claude Code here (`claude`) and say: "Read CLAUDE.md and help me write my first intent."

The step-by-step guide (`docs/guide.html`, open it with `npm run guide`) explains every step for a first-timer, with a worked example (a study-planner app) in `examples/study-planner/`.

## What is in the folder
| Path | What it is |
|---|---|
| `CLAUDE.md` | What Claude reads at the start of every session. Keep it under one page. |
| `REVIEW.md` | The checklist the `reviewer` agent uses on every pull request. |
| `project.config.json` | Owners, commands, protected files, guarded files and gated commands. |
| `docs/intent/`, `docs/spec/`, `docs/plan/` | The chain from idea to code. Each folder has a `TEMPLATE.md`. |
| `docs/incidents/` | What broke, and what now stops it happening again. |
| `docs/loop/` | One file per lesson learned. |
| `.claude/agents/` | Helpers: `verifier`, `reviewer`, `researcher`. |
| `.claude/skills/` | Rules Claude applies: `plain-language`, `security-basics`, `write-intent`. |
| `.claude/settings.json` | Hooks that block secrets, guard files and ask before shipping. |
| `tools/` | The hooks, the checks and the helper scripts. No packages to install. |
| `evals/cases/` | Small tests that prove each hook still does its job. |
| `.github/` | CI that runs the checks, and the pull request template. |
| `examples/study-planner/` | A full worked example of one change, idea to incident. |

## Commands
| Command | What it does |
|---|---|
| `npm run init` | Fill in the placeholders and add starter code. Run it once. |
| `npm run guide` | Open the first-timer's guide in your browser. |
| `npm run new -- intent <name>` | Copy a template with today's date. Also `spec`, `plan`, `incident`, `loop`. A spec or plan links the intent of the same name. |
| `npm run accept -- <file>` | Set Status to "Accepted <date> by <you>". Also `reject`, `done` (plans) and `close` (incidents). |
| `npm run start` / `test` / `lint` / `build` | Run your project's commands from `project.config.json`. |
| `npm run check` | Check the docs chain, run the guardrail evals, scan for secrets, list unfilled placeholders. |
| `npm run check:strict` | The same, but unfilled placeholders fail. |

## Working with a friend
- Put every owner in `npm run init` ("Ana, Bruno"). `npm run accept` uses your git name if it is in the list.
- Work on separate branches named after your intents, and merge through pull requests.
- Loop entries are one file each, so two people adding lessons never clash.
