# Plan: weekly minutes per subject

## Intent
docs/intent/251102-weekly-minutes.md

## Spec
docs/spec/251102-weekly-minutes.md

## Files that change, in order
1. `tests/planner.test.js` (new): tests for `addSession` and `weeklyTotals`. They fail at first, because the functions do not exist yet.
2. `src/planner.js` (new): the two functions, until the tests pass.
3. `src/index.html` (new): the form and the list, wired to the functions.
4. `project.config.json`: set the test command to `node --test "tests/*.test.js"`.

## Risks
- What could this break? Nothing yet; it is the first feature.
- Riskiest step: the week boundary. A session on Sunday night must count for that week, not the next.
- Options not taken: a date library (not needed for one rule; it would add a dependency).

## Proof
- `weeklyTotals` sums per subject and sorts biggest first.
- A Sunday 23:30 session counts in the week that started the Monday before.
- Last week's sessions are left out.
- `addSession` refuses minutes that are not a whole number from 1 to 600.

## Status
Accepted 251102 by Sam

<!-- Plan mode: Claude read the spec, proposed this plan, and could not edit files yet. Sam asked "what could this break, and which step is riskiest?" Claude added the Sunday-night test. Sam accepted, and the plan-before-code hook then let Claude edit src/. -->
