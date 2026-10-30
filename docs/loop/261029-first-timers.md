# Loop: five first-timers try the starter

## Tried
Claude played five people meeting the starter for the first time, each in a fresh copy of the original folder, running the real commands:
- Maya, who has never coded: ran commands in the order she found them and kept every default.
- Leo, who knows a little Python: picked the Python stack without installing anything first.
- Ana and Bruno, two friends building together: listed both owners, with untidy spacing.
- Sofía, who thinks of her time zone as an offset: typed "GMT-3".
- Kai, who skips steps: edited `src/` with no plan, typed a Status by hand, and used a date in the future.

## Saw
1. Sofía typed "GMT-3" and init quietly used UTC instead. Every file date would be wrong for three hours each evening.
2. With the defaults, Maya's owner name became "Owner", which does not match her git name.
3. Maya accepted an intent that was still the empty template ("<short title>"), and that unlocks the next stages.
4. Anyone could accept: a git name that was not on the owner list was accepted under the first owner's name.
5. Leo's tests failed with "No module named pytest", with no hint how to fix it. On GitHub, CI never installed Python tools, so his first push would have failed.
6. "Show Today's Date" became the file name `show-today-s-date`.
Ana and Bruno got through cleanly. Kai's mistakes were all caught, with clear messages.

## Changed
- `npm run init` understands offsets like "GMT-3", "UTC+2" and "-3", asks again when the time zone is unknown, and suggests your git name as the owner.
- `npm run accept` refuses a file that still has the template's blanks. Accept and reject refuse anyone who is not an owner, and say how to fix their git name. This is a nudge against mistakes, not a lock: anyone can type an owner's name.
- The Python stack adds `requirements-dev.txt`. Init and failed Python commands say to install it, and CI installs it.
- `npm run new` drops apostrophes from names.
- `tools/tools.test.js` holds one test for each fix. Each test failed before its fix. They run with `npm run test` on purpose, so a broken helper shows up straight away.
- `docs/guide.html` explains the new messages.

## Open
- Nobody tried Windows here. Git Bash quirks still need a real person to test.
- Half-hour time zones, like India, still need a city name such as Asia/Kolkata.
