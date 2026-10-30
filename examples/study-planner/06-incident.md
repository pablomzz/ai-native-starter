# Incident: "1h" turned the totals into NaN

## What happened
- When: 251109, evening.
- What a user saw: Alex typed "1h" in Minutes. The list showed "Physics: NaN minutes", and every later Physics session also showed NaN.

## How we found it
Alex sent Sam a screenshot.

## Fix
Sam deleted the bad session from the browser storage, then shipped a fix that same evening.

## Cause
The minutes check used `Number(value)`, which turns "1h" into NaN. The check `minutes < 1 || minutes > 600` is false for NaN, so the bad value got saved. No test tried a value with letters.

## Guardrail added
- `tests/planner.test.js`: "hours are understood: 1h is 60 and 1h30 is 90", and "abc" in the list of bad values.
- The minutes check now uses `Number.isInteger`, which is false for NaN.

## Loop entry
docs/loop/251109-nan-from-hours.md

## Next intent
docs/intent/251110-hours-and-minutes.md

## Status
Closed 251110
