# Loop: thirty-one newcomers try the starter

## Tried
Claude played 31 people who had never used the starter. Each got a fresh copy of the blank template with the tools as they were after the first five-person round. A script typed what each person would type, slips included. The people were:
- Aiko, who wrote in kanji.
- Ben, who pressed Enter on everything.
- Carla, who forgot the `--`.
- Dev and Elena, who typed "EST" and "Buenos Aires" for their time zone.
- Femi and Yara, who typed "Intent", "intents" or "idea".
- Gus and Hana, who wrote "Ana and Gus" and "Hana; Omar".
- Ivan, who ran init twice.
- Jade and Kofi, who typed the stack by name or as 7.
- Lina, who chose "something else".
- Mo, who worked from inside `src/`.
- Nia and Oscar, who typed Windows paths or bare file names.
- Pri and Quinn, whose editors added Windows line endings or a hidden mark (a BOM).
- Rosa, who broke `project.config.json` by hand.
- Sam, Tariq, Uma and Vic, who changed Statuses in the wrong order or twice.
- Wen, Xavi and Eli, who made duplicate names, odd names, or deleted a heading.
- Zoe, who pasted an API key.
- Abe, who had no git name.
- Bea, Caio and Dara, who mixed up capitals, typed spaces in an offset, or ran commands before setup.

## Saw
Nineteen people got through cleanly or met a clear message. Twelve hit a problem:
1. Elena's "Buenos Aires" quietly became UTC. Dev's "EST" became America/Panama, which never changes for summer time.
2. "Ana and Gus" became one owner named "Ana and Gus". "Hana; Omar" also became one owner.
3. Ivan's second `npm run init` did nothing but still said "Done".
4. Kofi's "7" quietly became the web stack.
5. Femi's "Intent" and Yara's "intents" and "incidents" were refused with only a usage line.
6. Aiko's kanji name was refused with a hint that did not say why.
7. Nia's `docs\intent\...` and Oscar's bare file name were "does not exist".
8. Rosa's stray comma crashed three commands with a wall of Node errors. `npm run check` blamed 8 of the guardrail evals instead.
9. Tariq accepting twice silently changed the date.
10. Vic marked a plan Done that was never accepted.
11. After `npm run new -- incident`, the hint said "accept". Incidents are closed.
12. Abe, with no git name, was told "If you are Owner, set your name to Owner".

Zoe's key (`sk-live-...`) was not caught, and neither would a Stripe `sk_live_` or Google `AIza` key be. The key patterns live in `tools/lib.js`, a guardrail file, so the owner was asked first and said yes.

## Changed
- `npm run init` finds cities ("Buenos Aires", "são paulo", "kolkata") and refuses short codes like EST. It splits owners on commas, semicolons, "and" and "&", then shows the list it understood. It does not split on the Spanish "y", because that breaks names like "Ortega y Gasset". It re-asks for a stack number not on the menu, or says which one it used. It says how to change answers when the project is already set up. It suggests setting a git name when there is none.
- `npm run new` takes any capitals and plurals ("Intents", "incidents"), and names the kind it does not know. It explains that the short name needs English letters while the text can be in any language. The incident hint now says to close it.
- `npm run accept`, `reject`, `done` and `close` take Windows paths and bare file names. They do nothing when the Status already says so. Done needs an Accepted plan. With no git name, the message says so plainly.
- New `tools/config.js`: a broken `project.config.json` gets a plain message with the line number. This covers check, test, start, lint, build, new and accept.
- `tools/tools.test.js` has 15 new tests: 11 for the fixes above, which all failed on the tools before this change, and 4 for what the review found.
- `docs/guide.html` explains the broken-config message, cities as time zones, and that init runs once.
- With the owner's yes: `tools/lib.js` now knows Stripe and Google keys, and a `key = "..."` that mixes capitals, small letters and digits. Names like `key: "ArrowLeft"` or a storage name stay allowed. Four new guardrail evals (22 to 25) prove both sides.

## Open
- Still nobody on real Windows. Paths are handled, but Git Bash itself is untested.
