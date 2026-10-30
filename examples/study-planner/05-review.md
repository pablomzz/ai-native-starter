# Review findings: weekly minutes per subject

Pull request: "feat: weekly minutes per subject" (branch `weekly-minutes`). Plan: docs/plan/251102-weekly-minutes.md.

The `reviewer` agent was asked: "Review this branch against REVIEW.md and its plan."

## Findings
1. **Must fix** (REVIEW.md item 3, the security-basics skill). `src/index.html` line 41 builds the list with `innerHTML` and the subject name. A subject like `<img src=x onerror=alert(1)>` would run as code. Use `textContent`, as the spec says.
2. **Nice to have** (REVIEW.md item 5). `weekStart` has no comment saying the week starts on Monday. Add one line, so the rule from the intent is visible in the code.

Checked and fine: every changed file is in the plan; the four tests from "Proof" exist and pass; no secrets; one intent only.

## What Sam did
- Finding 1: fixed in a new commit, `fix: show subject names as text`. The reviewer ran again: no findings.
- Finding 2: added the comment.
- Then Sam merged. The ask-before-shipping hook asked before the push to main, and Sam said yes.
