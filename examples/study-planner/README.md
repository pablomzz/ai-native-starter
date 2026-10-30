# Worked example: a study planner

These files follow one small change through all six stages. They are examples, so the checks skip this folder. Copy their shape, not their words.

The project: a web page where a student lists study sessions (subject, minutes) and sees how many minutes each subject got this week.

| Stage | File | What happened |
|---|---|---|
| 1 Plan | `01-intent.md` | Sam describes the problem in their own words. Claude asks three questions and writes the intent. Sam accepts it. |
| 2 Design | `02-spec.md` | Claude turns the intent into requirements and a design, with the skills applied. It flags one concern. |
| 3 Build | `03-plan.md` | In plan mode, Claude lists the files, the order and the tests. Sam asks "what could break?", then accepts. |
| 4 Test | `code/planner.test.js` | The tests are written first, fail, then pass once `code/planner.js` exists. |
| 5 Deploy | `05-review.md` | The `reviewer` agent reads the diff against `REVIEW.md` and the plan. One finding is fixed before merge. |
| 6 Maintain | `06-incident.md`, `07-loop-entry.md`, `08-next-intent.md` | A friend types "1h" instead of 60 and sees NaN. The fix gets a test, the loop gets an entry in `docs/loop/`, and a new intent starts the next lap. |

Try it: `node --test examples/study-planner/code/planner.test.js` runs the tests (Node 18 or newer).
