# Loop: NaN from "1h" in Minutes

(Saved as docs/loop/251109-nan-from-hours.md with `npm run new -- loop nan-from-hours`.)

## Tried
The first release of weekly minutes, used by two friends.

## Saw
A friend typed "1h"; NaN was saved and spread to the totals.

## Changed
A test for text input in Minutes, and a CLAUDE.md line under "Mistakes Claude made twice": "Check numbers with Number.isInteger or Number.isFinite, never only with < and >, because NaN passes both."

## Open
People think in hours. That is a real need, so it is now an intent (docs/intent/251110-hours-and-minutes.md).

Why this matters: the loop entry is how a mistake becomes a rule. Next time Claude reads CLAUDE.md, it already knows about NaN.
