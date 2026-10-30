---
name: im-lost
description: Use when the owner says they are lost, confused or stuck, asks "what is going on", or pastes the same error twice. Stops the work and shows where things stand in plain words, with one next step.
---
# I'm lost

Stop changing files. Then give the owner a short map, in plain language, no longer than twelve lines:

1. **The goal.** The newest Accepted intent in `docs/intent/`, in one sentence.
2. **The plan.** The Accepted plan in `docs/plan/`, if any, and which step we are on.
3. **What changed.** Run `git status --short` and say in words which files changed since the last commit.
4. **Do the checks pass?** Run `npm run test` and `npm run check`. Say pass or fail, and quote the one most useful line.
5. **The one next step.** A single command or action, and why it comes next.

Then ask one question: "Does this match what you expected?" Wait for the answer before doing anything else.

If the same error has come back twice, say so, and explain the error in one plain sentence before trying a new fix. Do not try the same fix a third time.
