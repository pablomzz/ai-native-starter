# Plan: <short title>

Make a copy with `npm run new -- plan <short-name>`. Write it in Claude Code plan mode, before any code. Link it from the pull request.

A tiny fix needs no intent or spec: write `none: <reason>` under both, then a failing test, then the fix.

## Intent
docs/intent/<yymmdd>-<short-name>.md (or `none: <reason>` for a small fix)

## Spec
docs/spec/<yymmdd>-<short-name>.md (or `none: <reason>`)

## Files that change, in order
1.
2.

## Risks
- What could this break?
- Which step is riskiest?

## Proof
The tests that fail before the change and pass after it: one for each "Done when" line in the intent.

## Tidy
Clean-up this change needs (duplicate code, unclear names), done in its own commit after the tests pass. Or `none`.

## Status
Proposed

<!-- Proposed | Accepted <yymmdd> by <owner> | Done <yymmdd>
Accept it with: npm run accept -- <file>. Mark it finished with: npm run done -- <file>.
The hook asks before Claude edits src/ unless a plan was Accepted in the last 14 days. -->
