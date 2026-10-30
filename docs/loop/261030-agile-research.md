# Loop: what agile says about building with AI

## Tried
Research on how Scrum, Kanban, XP, Lean and Shape Up interact with AI-native development. It also compared the new frameworks (spec-driven development, AWS AI-DLC, Anthropic's playbook) and looked at what suits solo newcomers. Five research notes are in `research_notes/Agile and AI native development/`. The report is `reports/Agile and AI native development.md`.

## Saw
- Cheap code moves the bottleneck to review, checking, and deciding what to build. Lots of AI code in flight raises time-in-progress and lowers stability, unless work comes in small batches with strong tests.
- Story points, velocity, stand-ups and sprints lose meaning. Tests first, small batches, limits on work in progress, refactoring and a fixed time budget (Shape Up's "appetite") gain.
- For newcomers:
  - The strongest evidence is for writing the goal before the AI drafts, though people feel it is more effort.
  - The main risk is "comprehension debt": code grows faster than the builder understands it.
  - One item at a time, a weekly demo and a short written retro fit best.
- The kit already had the intent → spec → plan loop, plan-before-code, protected tests and "one intent, one branch, one pull request".

## Changed
- The intent template has **Appetite** and **Not doing**.
- "Done when" lines are written as "When …, the page shall …", each one becoming a test written first.
- "Done when" now includes "I can explain in my own words what changed and why".
- The plan template:
  - maps Proof to the "Done when" lines;
  - adds a **Tidy** step;
  - spells out the light path for tiny fixes.
- `npm run check` reminds you when more than one plan is in progress. There is a test for it.
- `CLAUDE.md` adds three rules:
  - one thing in progress at a time;
  - stay inside the Appetite, and suggest a smaller version when work runs past it;
  - Done includes the owner explaining the change.
- `docs/loop/README.md` and the guide's new "Your week" section cover a weekly demo, a 15-minute retro as a loop entry, and throw-away spikes.

Left out on purpose: story points, stand-ups, sprints, mob sessions, Spec Kit's many files, AI-DLC's 33 stages.

## Open
- No independent study compares these frameworks. The kit follows practitioner agreement and nearby evidence.
- Whether newcomers keep up a weekly retro is untested. Check it with real users.
