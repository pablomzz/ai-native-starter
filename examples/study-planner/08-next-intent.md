# Intent: type study time in hours and minutes

Author: Sam (from the incident on 251109)
Date: 251110

## Problem
People think "I studied an hour and a half", not "90 minutes". Alex typed "1h" and the page broke. The quick fix accepts "1h" and "1h30", but nothing tells users that.

## Outcome
The Minutes field says it accepts "45", "1h" or "1h30", and the list shows long totals as hours, like "2 h 15 min".

## Who and what it touches
- Users: everyone who uses the planner.
- Screens or features: the form label, the totals list.
- Data: none (minutes are still saved as a number).

## Constraints
none

## Open questions
- Should "1.5h" work too?

## Done when
- [ ] The label shows the three formats.
- [ ] Totals of 60 minutes or more show as hours and minutes.

## Status
Proposed

<!-- This is the loop closing: Maintain wrote a new intent, and Plan starts again. -->
