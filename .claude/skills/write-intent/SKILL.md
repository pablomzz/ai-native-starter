---
name: write-intent
description: Use when someone describes an idea, a problem or a wish for the project, or asks to start a new feature. Turns their words into docs/intent/<yymmdd>-<name>.md.
---
# Write an intent

1. Let the person describe the problem in their own words. Do not suggest a solution yet.
2. Ask up to three short questions, one at a time: who has the problem, what better looks like, and what is out of scope.
3. Run `npm run new -- intent <short-name>` and fill in the copy. Keep their words where you can.
4. Show the draft and ask them to correct anything you misunderstood.
5. Leave Status as `Proposed`. Only the owner changes it to Accepted.
6. Suggest the commit: `git add docs/intent/<file> && git commit -m "docs(intent): <title>"`.

Never start a spec, a plan or code from an intent that is not Accepted.
