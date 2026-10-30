# Incident: <short title>

Make a copy with `npm run new -- incident <short-name>` on the day something breaks. Plain words; no blame.

## What happened
- When:
- What a user saw:

## How we found it
A test, a user, a check, or you.

## Fix
What you did to stop the harm right away.

## Cause
Why it broke, and why the checks did not catch it.

## Guardrail added
The test or eval in `tests/` or `evals/cases/` that now fails if this happens again.

## Loop entry
The loop entry file in `docs/loop/` (npm run new -- loop <name>).

## Next intent
`docs/intent/<file>` if this needs a bigger change, or `none`.

## Status
Open

<!-- Open | Closed <yymmdd>. Close it with: npm run close -- <file>, once the guardrail is merged. -->
