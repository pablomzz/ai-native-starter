# Spec: weekly minutes per subject

## Intent
docs/intent/251102-weekly-minutes.md

## Requirements
1. A form with two fields: subject (text) and minutes (a whole number from 1 to 600).
2. A list of this week's totals per subject, biggest first. The week starts on Monday.
3. Sessions are saved in the browser (localStorage) and come back after a reload.
4. The page works at 360 px wide.

## Design
- `src/index.html`: the form and an empty list.
- `src/planner.js`: two pure functions, `addSession(list, session)` and `weeklyTotals(list, today)`, plus a little code that connects them to the page.
- `tests/planner.test.js`: tests for the two functions, with a fixed "today" so they do not depend on the real date.

## Policies applied
Skills: plain-language, security-basics

- plain-language: the labels say "Subject" and "Minutes studied"; the error says "Type the minutes as a number, like 45."
- security-basics: the subject name is shown with `textContent`, never `innerHTML`, so typed text cannot become code on the page.

## Flagged concerns
- Concern (security-basics): localStorage is readable by anyone who uses the same laptop. Resolved: Sam is fine with it; the data is not private. Written down so a later change does not add private data here.

## Out of scope
- Accounts, sync between devices, charts.

## Status
Accepted 251102 by Sam

<!-- The prompt Sam used: "Read docs/intent/251102-weekly-minutes.md and write a spec from docs/spec/TEMPLATE.md. Apply the skills in .claude/skills. List any concern a skill raises under Flagged concerns, and ask me about each one." -->
