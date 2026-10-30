# Scrum with AI coding agents: what happens to each Scrum element when code is cheap

Notes written 30 October 2026. They cover how Scrum and sprint-based agile change when AI coding agents write much of the code. Agents here means tools like Claude Code, Cursor, Copilot agent mode, Codex and Devin.

Labels used on each finding:
- **[Research]**: academic study, preprint, or a research program such as DORA. DORA is Google-sponsored.
- **[Vendor]**: from a company that sells related tools, training or services. This includes vendor surveys.
- **[Practitioner]**: first-hand experience or practice advice from a named person or team.
- **[Opinion]**: commentary or prediction with no data behind it.
- **(search summary only)**: I could not open the page. The detail comes from the search engine's summary of it. Treat it as less certain.

Access notes. The network policy blocked these sites, so I could not open them directly: scrum.org, scrumalliance.org, digital.ai, dora.dev, arxiv.org, export.arxiv.org, api.semanticscholar.org, martinfowler.com, infoq.com, thoughtworks.com, survey.stackoverflow.co, stackoverflow.blog, atlassian.com, scrumexpansion.org, github.io pages, medium.com, dev.to, redmonk.com, getdx.com, faros.ai, metr.org, sahaj.ai and augmentcode.com. I did open cloud.google.com, which hosts DORA's own announcements. I read arXiv papers through the alphaXiv tool. Most other findings come from search summaries and are marked.

Short glossary. DoD means Definition of Done. PBI means Product Backlog Item. DORA is Google's long-running software delivery research program. Throughput means how fast changes ship. Stability means how often changes fail or need rework.

## 1. Sprints and cadence: are teams shortening sprints, dropping them, or keeping them? What do Scrum's founders and bodies say?

### Takeaway
No survey shows teams shortening or dropping sprints in large numbers. The official Scrum Guide (2020) is unchanged. Scrum's two co-creators now disagree: Ken Schwaber calls AI "just tools", while Jeff Sutherland treats agents as team members and claims 30x to 100x speed-ups. He publishes no method for these numbers. Scrum.org community posts say sprint length should follow how fast stakeholders and reviewers can give feedback, not how fast agents write code. Sprint-free "agent Scrum" setups exist only as practitioner experiments.

### Cited Findings
Official texts
- The 2020 Scrum Guide is still the official text. It sets a maximum Sprint length of one month and no minimum. It has not been updated for AI. I found no official Scrum Guide revision about AI agents. [Official text] — [Scrum Guide 2020](https://scrumguides.org/scrum-guide.html); (search summary only) [Scrum.org forum on sprint length](https://www.scrum.org/forum/scrum-forum/17995/sprint-length)
- In June 2025, Jeff Sutherland, Ralph Jocham and John Coleman published the "Scrum Guide Expansion Pack". Ken Schwaber is not an author. The authors call it an optional companion to the 2020 Guide, not a replacement. It is about 43 pages, against 13 for the Guide. [Practitioner] — (search summary only) [Medium: differences from the 2020 Guide](https://medium.com/softtechas/the-differences-from-scrum-guide-2020-on-scrum-guide-expansion-pack-2025-eeb1956a0ef3); [Age of Product](https://age-of-product.com/food-agile-thought-497-scrum-guide-expansion-pack/); [GitHub repo](https://github.com/ScrumGuides/ScrumGuide-ExpansionPack)
- The Expansion Pack treats AI as something that should support Scrum's empirical process control, not override it. Commentators say it recognizes AI as a possible "Product Developer", while humans keep accountability. It also adds Stakeholder and Supporter roles. [Practitioner] — (search summary only) [Expansion Pack PDF](https://scrumexpansion.org/scrum-guide-expanded/2025.6/pdf/scrum-guide-expansion-pack.en.pdf); [scrumexpansion.org "AI and Scrum"](https://scrumexpansion.org/ai-and-scrum/); [Marc Kaufmann](https://marckaufmann.com/2025/06/scrum-guide-expansion-pack-2025-mehr-muster-mehr-wert/)

Ken Schwaber and Scrum.org
- Schwaber, in a Scrum.org podcast for Scrum's 30th year (2025), frames AI as a tool to support human teams, not replace them. He reportedly says AI is "currently just tools". He sets a higher bar for a team member: something self-aware, open to ideas, and able to take criticism. The transcript is messy, so check the recording before quoting him. [Practitioner/Opinion] — (search summary only) [Scrum.org: Reflecting on 30 Years of Scrum](https://www.scrum.org/resources/reflecting-30-years-scrum-conversation-ken-schwaber)
- A Scrum.org blog post, "Daily Sprints and the Impact of AI", reasons that AI output "means larger increments and broader Sprint Goals, or shorter Sprints". It notes that daily sprints have been proposed. It lists limits: "the limited Availability of stakeholders for frequent feedback and the risk of cognitive overload from reviewing massive amounts of AI-generated content". It stresses that one month is a ceiling, not a target. [Opinion, Scrum.org community blog] — (search summary only) [Scrum.org](https://www.scrum.org/resources/blog/daily-sprints-and-impact-ai)
- A Scrum.org forum answer notes that one-week Sprints cost more because the events add more overhead. [Practitioner] — (search summary only) [Scrum.org forum](https://www.scrum.org/forum/scrum-forum/17995/sprint-length)
- Scrum.org hosts a series of posts on running Scrum "when half of your team is AI agents". They describe agents as contributors that pull backlog items, write code, run tests and open pull requests. They say human accountability cannot be delegated. They describe Product Owner and Scrum Master work as changing, not replaced. These are community blog posts, not official positions. [Opinion] — (search summary only) [AI Augmented Scrum Framework](https://www.scrum.org/resources/blog/ai-augmented-scrum-framework-when-half-your-team-autonomous-agents)
- A Scrum.org post by David Sabine is titled "AI Is Rewiring Scrum Teams, But Not Scrum". The title sums up the Scrum.org community view: change the team, keep the framework. [Practitioner] — (search summary only) [Scrum.org](https://www.scrum.org/resources/blog/ai-rewiring-scrum-teams-not-scrum)

Jeff Sutherland and Scrum Inc. (all self-reported, no method published)
- February 2025, on X: "My AI Scrum team is 30 times faster than a human team. Grok 3 just became the lead programmer to take it to the next level." [Practitioner, self-reported] — [X post](https://x.com/jeffsutherland/status/1893299328258543796)
- A video with Sohrab Salimi, "AI Agents, Scrum, and the End of Human Coding", claims in its description that his agent team is 100x faster than his best human Scrum team. [Practitioner, self-reported] — (search summary only) [YouTube](https://www.youtube.com/watch?v=XKWYm4sZYkQ)
- His 2026 Leanpub book "Hermes: Organizations as Swarming Agents" claims "100× throughput at a tenth of the cost". It also claims an AI-run IT department kept about 225 medical devices online unattended. Its argument is that how you organize agents matters more than which model you pick. It contrasts one costly agent working a task list with small teams of cheaper agents "working together the way great Scrum teams do". The book is self-published. [Practitioner, commercial interest] — (search summary only) [Leanpub: Hermes](https://leanpub.com/hermesorganizationsasswarmingagents); [Sutherland LinkedIn](https://www.linkedin.com/posts/jeffsutherland_scrum-agiletransformation-aiintegration-activity-7444786222721359872-at7a)
- A second Leanpub book, "First Principles in Scrum: OpenClaw Scrum and Scrum@Scale", calls OpenClaw Scrum "the first operating model that treats AI agents as first-class team members". [Practitioner, commercial] — (search summary only) [Leanpub blog](https://leanpub.com/blog/leanpub-book-launch-first-principles-in-scrum-openclaw-scrum-and-scrum-scale-create-trust-at-machine-speed-by-jeff-sutherland/)
- A 2026 Scrum Day keynote abstract says agents "pull work from backlogs, participate in review workflows, enforce Definition of Done criteria, and dramatically accelerate delivery". [Practitioner] — (search summary only) [Scrum Day: When the machine can think](https://www.scrumday.org/when-the-machine-can-think)

Scrum Alliance
- I found no Scrum Alliance survey or formal position on AI agents. Its 2025 Annual Report frames the year around AI disruption. It argues that demand for adaptable, multi-skilled professionals will grow. It gives no AI survey figures in the parts I could see. [Vendor/certification body] — (search summary only) [Scrum Alliance 2025 Annual Report](https://resources.scrumalliance.org/Article/scrum-alliance-2025-annual-report)

Practitioner experiments and commentary on cadence
- "Agentic Scrum" is an open-source Claude Code plugin. It adapts Scrum for autonomous agents. It drops fixed time-boxed sprints, sprint point estimation and synchronous ceremonies. It keeps the inspect-and-adapt loop. [Practitioner, work in progress] — (search summary only) [GitHub: atusy/agentic-scrum](https://github.com/atusy/agentic-scrum)
- A working paper called "Agent Scrum" reportedly ran 324 two-hour sprints with AI coding agents. For one dedicated team, 79% of committed stories reached Done inside the sprint. The author calls sprint length "a choice, not a finding". A second search could not find this paper again. Treat it as unverified. [Practitioner] — (search summary only) [Agent Scrum](https://daveremy.github.io/agent-scrum/)
- An Agile Federation post teaches agents Scrum-style discipline through skills. It says Scrum's values stay, but calendar-based events are unnecessary when agents coordinate instantly. [Opinion] — (search summary only) [Agile Federation](https://agilefederation.substack.com/p/teaching-ai-agents-process-discipline)
- A HackerNoon essay argues two-week sprints were tuned to human limits. The new question is "how much can the team specify, validate and verify in two weeks?" [Opinion] — (search summary only) [HackerNoon](https://hackernoon.com/ai-coding-agents-are-breaking-the-two-week-sprint)
- A SAFe consultancy proposes a "dual rhythm". Continuous flow covers AI-accelerated execution. A fixed cadence stays for coordination, alignment and governance. [Opinion, consultancy] — (search summary only) [Agility at Scale](https://agility-at-scale.com/safe/ai-enabled-safe/safe-sprint-cadence-for-ai-teams-the-dual-rhythm-architecture/)
- A Kanban tool vendor argues that sprint boundaries struggle with constant AI-driven change and that teams just need a visual board. [Vendor] — (search summary only) [Kanban Zone](https://kanbanzone.com/2026/agile-in-the-age-of-ai-why-teams-need-a-visual-board/)
- InfoQ (February 2026) covered the debate "Does AI make the Agile Manifesto obsolete?". Steve Jones of Capgemini argued agentic development is too fast for agile's human-centred practices. The piece says the two-week sprint "appears antiquated" when AI writes working code in minutes. It cites AWS 2026 guidance that replaces sprint planning with "Intent Design". It cites Kent Beck's "augmented coding": AI under human supervision, with test-driven development. [Opinion; mix of vendor and practitioner voices] — (search summary only) [InfoQ](https://www.infoq.com/news/2026/02/ai-agile-manifesto-debate/)

### Inferences
- The founders split along a clear line. Schwaber and Scrum.org say AI is a tool and the framework stays. Sutherland and Scrum Inc. say agents are team members and sell new operating models (OpenClaw Scrum, Hermes). His speed numbers are marketing claims until he publishes data.
- Nobody with data says sprints should get longer. The real debate is between shorter sprints and dropping the time-box for flow. The most common middle position is: keep a cadence for human feedback, let agent work flow inside it.
- The limit on cadence now comes from humans: how often stakeholders can give feedback, and how much code reviewers can check. This matches the review-load data in section 6.

### Gaps
- I found no survey that measures how many teams shortened, kept or dropped sprints because of AI agents. All evidence on this point is anecdote or opinion.
- I could not open the Expansion Pack's AI text or any Scrum.org post (blocked). The exact wording on AI as "Product Developer" is unverified.
- I found no Scrum Alliance statement or survey on AI agents.
- Sutherland's 30x, 100x and "tenth of the cost" claims have no published baseline, method or sample.

## 2. Estimation and story points: what happens when an agent can build a story in minutes?

### Takeaway
Writers widely argue that story points lose meaning when agents write the code. The evidence is almost all opinion; I found no study that measures it. The common fix is to estimate or limit what humans still do: specifying, reviewing and testing. Other options are throughput-based forecasting (#NoEstimates), time budgets ("appetite") and readiness gates. Research has moved toward LLMs doing the estimating and toward cost models priced in tokens.

### Cited Findings
- Background: Mike Cohn has long argued that story points estimate effort, not just complexity. Effort includes the volume of work, risk and uncertainty. This post predates AI agents. [Practitioner, older] — [Mountain Goat Software](https://www.mountaingoatsoftware.com/blog/its-effort-not-complexity)
- Sahaj Software, "Story Points Stopped Working the Day AI Started Writing Code". It argues review, testing and coordination now drive real work time, so points must cover testing, review and integration, not just coding. It proposes a readiness gate: unclear stories get no number. It links this to Shape Up's "appetite". It suggests AI could run the assessment while humans settle disputes. [Practitioner/consultancy opinion] — (search summary only) [Sahaj](https://www.sahaj.ai/story-points-stopped-working-the-day-ai-started-writing-code/)
- "The Death of Story Points: Engineering Metrics in the Agentic Era" argues agents break the link between headcount, hours and output that gave a point its meaning. It cites a DX example: if an agent can generate 100 story points in an hour, the metric is meaningless. [Opinion] — (search summary only) [DEV Community](https://dev.to/dmitryame/the-death-of-story-points-engineering-metrics-in-the-agentic-era-2kho)
- A developer post: "If an agent makes the implementation much easier than we expected, I'm not sure completing the same number of points tells us the same thing anymore." The author doubts that higher velocity proves better work. [Opinion] — [Threads](https://www.threads.com/@codingwithroby/post/DeAj9bpmDA9/now-add-agents-into-that-process-if-an-agent-makes-the-implementation-much/)
- Dissent from a planning-poker vendor: identical tasks vary widely with AI performance, prompt quality and code context. So teams should keep relative complexity estimates. [Vendor] — (search summary only) [scrumpoker.app](https://scrumpoker.app/)
- ACEM, an August 2026 preprint, says traditional methods do not model agentic pipelines well. It names COCOMO II, Function Points, Use Case Points and story points. It proposes mapping story points to token-based costs. [Research, preprint] — (search summary only) [arXiv 2608.02582](https://arxiv.org/pdf/2608.02582)
- Several 2025–2026 preprints test LLMs as estimators of story points, including retrieval-based methods. This research automates the estimate; it does not question it. [Research] — [alphaXiv: Story Point Estimation Using LLMs, 2603.06276](https://www.alphaxiv.org/abs/2603.06276); [alphaXiv: Is RAG a Better Way to Go?, 2604.03443](https://www.alphaxiv.org/abs/2604.03443)
- Sutherland (June 2024 talk recap) said his team found AI could estimate tasks within 2–3% of actuals. He also said AI capabilities grow tenfold every six months. Both are self-reported. [Practitioner, self-reported] — (search summary only) [ScrumCraft](https://scrumcraft.com/2024/06/24/agile-evolution-insights-from-dr-jeff-sutherland-on-the-neuro-scientific-roots-and-ai-enhanced-future-of-scrum/)
- A LinkedIn post written by an AI agent ("Agent Saturday") in Sutherland's circle claims 35 points per sprint at 95% predictability. It compares this with 20 points at 60% for Sutherland, plus 40% fewer bugs. This is an agent reporting on itself. It is not evidence, but it shows velocity being used as a showcase number. [Self-report] — (search summary only) [Sutherland LinkedIn](https://www.linkedin.com/in/jeffsutherland/)
- Shape Up's appetite is a business decision about how much time a problem deserves, not a forecast. It separates cost debate from estimation. [Practitioner] — (search summary only) [Ben Morris](https://www.ben-morris.com/setting-an-appetite-instead-of-making-an-estimate-for-epic-level-work/); [Medium: Appetite Before Architecture](https://medium.com/@bopr245/appetite-before-architecture-02be3cae5b89)
- #NoEstimates advocates forecast from past throughput (counting finished items) with Monte Carlo simulation instead of points. Critics say point discussions still help new teams build shared understanding. [Vendor/opinion] — (search summary only) [Kollabe](https://kollabe.com/posts/noestimates-debate-when-story-points-help-and-hurt); background, older (2016): [InfoQ Q&A with Vasco Duarte](https://www.infoq.com/articles/book-review-noestimates/)
- A post written by an AI agent describes dropping time estimates for priority levels and dependency tracking. It argues dependencies carry more information than durations. [Anecdote] — (search summary only) [paragraph.com](https://paragraph.com/@0xautojeremy/ai-agents-dont-need-time-estimates)
- The Agentic Scrum plugin drops sprint point estimation altogether. [Practitioner] — (search summary only) [GitHub: atusy/agentic-scrum](https://github.com/atusy/agentic-scrum)
- Scrum.org posts keep the Scrum Guide rule: the Developers who do the work size it, and the PO helps with trade-offs. [Opinion, Scrum.org blog] — (search summary only) [Scrum.org: AI-Enhanced Sprint Planning (Part 2 of 4)](https://www.scrum.org/resources/blog/ai-enhanced-sprint-planning-part-2-4)

### Inferences
- If points measure effort, and agents remove most coding effort, then points should shrink toward the human effort left. That is specifying, reviewing, testing and integrating. Velocity will then rise or swing for reasons unrelated to value.
- Forecasting by counting small, similar slices works whether a human or an agent builds them. It also fits DORA's small-batch finding (section 4). This makes slice-counting the least risky replacement.
- The METR perception gap (section 6) suggests gut-feel estimates of AI speed-up are unreliable. That argues against planning poker based on felt AI speed.

### Gaps
- No controlled or survey data shows story points losing predictive power under agent use. The claim rests on reasoning and anecdote.
- The Brazilian Scrum survey (section 7) did not report on estimation.
- I found no named engineering organization that published a before-and-after account of dropping points because of agents.
- I found no Mike Cohn or Ron Jeffries statement specifically about AI agents and story points.

## 3. Backlog and the Product Owner: does the bottleneck move to deciding what to build?

### Takeaway
Yes, by wide agreement among practitioners and vendors; hard data on roles is thin. Many sources now say the constraint is deciding what to build, writing precise specs and acceptance criteria, and checking output against intent. Scrum.org posts keep the PO accountable and let agents draft stories and criteria for the PO to review. Specs are gaining weight ("spec-driven development"), and critics warn this can slide back into waterfall. Survey data shows POs are the most divided role on how useful AI is.

### Cited Findings
- Atlassian's internal engineering blog says the constraint no longer comes from producing enough output but from deciding what to build. It says PMs and designers cannot keep up with engineers' productivity gains. It names discernment as the key PM skill. [Vendor/practitioner] — (search summary only) [Inside Atlassian: The bottleneck keeps shifting](https://www.atlassian.com/blog/how-we-build/the-bottleneck-keeps-shifting-what-ai-is-changing-about-how-we-build)
- InfoQ (February 2026) quotes the CEO of Nave: the constraint has moved from building to deciding what to build and checking that it works. It also cites Agoda: the bottleneck moved "upstream to specification and verification". [Practitioner, via news] — (search summary only) [InfoQ](https://www.infoq.com/news/2026/02/ai-agile-manifesto-debate/)
- CIO.com recommends stronger specs and acceptance criteria before work starts. It also recommends review that tests agent output against intent. [Opinion] — (search summary only) [CIO.com](https://www.cio.com/article/4200128/the-engineering-bottleneck-has-changed-is-your-org-prepared.html)
- "The Spec Ceiling" (July 2026) argues the limit moves from build speed to how fast teams can define what to build. Agents only handle work specified precisely enough. [Opinion] — (search summary only) [magnus919.com](https://magnus919.com/2026/07/the-spec-ceiling-why-ai-coding-speed-moves-the-bottleneck-to-product-discovery/)
- A practitioner who says they watched "a dozen" agile teams adopt agents reports that teams added a "spec in review" lane to their board. They also report that detailed task breakdown in Sprint Planning is fading. Teams are not named. [Practitioner, anecdotal] — (search summary only) [Medium](https://medium.com/@khushijigenshah/i-watched-a-dozen-agile-teams-adopt-ai-agents-the-spec-is-what-saved-them-17778f9a94cb)
- Scrum.org "The Augmented Product Owner": "Product Owners must maintain their accountability for the product's success, using AI as a tool rather than delegating core responsibilities to automated systems." [Opinion, Scrum.org blog] — (search summary only) [Scrum.org](https://www.scrum.org/resources/blog/augmented-product-owner-amplifying-scrum-ai)
- Scrum.org "10 Tasks Product Owners Can Delegate To AI Agents" suggests agents write first drafts of user stories and acceptance criteria, and the PO reviews and refines them. Another Scrum.org post gives a Given-When-Then prompt for drafting acceptance criteria. [Opinion, Scrum.org blog] — (search summary only) [Scrum.org: 10 Tasks](https://www.scrum.org/resources/blog/10-tasks-product-owners-can-delegate-ai-agents); [Scrum.org: AI-Enhanced Sprint Planning](https://www.scrum.org/resources/blog/ai-enhanced-sprint-planning-part-2-4)
- David Sabine (Scrum.org) says POs are now "the human in the loop to ensure the Product Backlog isn't populated with AI slop". [Practitioner] — (search summary only) [Scrum.org](https://www.scrum.org/resources/blog/ai-rewiring-scrum-teams-not-scrum)
- Scrum.org's sprint-planning post for mixed human and agent teams says the team must decide which items go to agents ("task attribution"). It says the team must write technical prompts for its AI members. [Opinion] — (search summary only) [Scrum.org](https://www.scrum.org/resources/blog/how-do-sprint-planning-when-half-your-team-are-ai-agents)
- Brazilian Scrum survey (70 professionals, October–November 2025). 72–87% use or plan to use LLMs for refinement work: writing PBIs, non-functional requirements and Sprint Goals. 77% for improving Sprint Goals, 76% for non-functional requirements. Only 29% use or plan to use LLMs to describe the product vision, and 38% do not plan to. POs gave "the most heterogeneous perceptions", with a notable share reporting low usefulness. [Research] — [Perkusich et al., arXiv 2602.08192](https://www.alphaxiv.org/abs/2602.08192)
- Birgitta Böckeler (Thoughtworks) wrote on martinfowler.com in October 2025 about spec-driven development tools: Kiro, spec-kit and Tessl. She sorts approaches into spec-first, spec-anchored and spec-as-source. She says the term is still in flux. A secondary summary reports that a Kiro bug fix produced four user stories with 16 acceptance criteria. That is an example of spec overhead. [Practitioner] — (search summary only) [martinfowler.com](https://www.martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html); [InfoWorld](https://infoworld.com/article/4171332/four-cutting-edge-tools-for-spec-driven-development.html); [my-weird-prompts](https://my-weird-prompts.vercel.app/774955)
- Critics say spec-driven development can turn into waterfall. A best-known example is Marmelab's "The Waterfall Strikes Back". Defenders say specs stay revisable in short loops. [Opinion; one defender is a vendor] — (search summary only) [developertoolkit glossary](https://developertoolkit.ai/en/glossary/spec-driven-development/); [Augment Code](https://www.augmentcode.com/guides/spec-driven-development-vs-waterfall); [Allstacks](https://www.allstacks.com/blog/spec-driven-development-isnt-waterfall-why-the-ai-coding-bottleneck-changed-everything)
- An SDD preprint treats agents as tools inside the Developers' accountability, not a replacement for Scrum roles. [Research, preprint] — (search summary only) [arXiv 2608.20341](https://arxiv.org/pdf/2608.20341)
- Role blur: PMs build working prototypes with AI coding tools, and engineers take on more product thinking. The often-quoted "80% of top PMs prototype with AI" figure comes from a PM-tool seller and has no stated method. [Opinion/vendor] — (search summary only) [pmprompt.com](https://pmprompt.com/blog/ai-prototyping-for-product-managers); [Prompt-led Product](https://promptledproduct.substack.com/p/why-ai-will-make-developers-and-product); [LogRocket](https://blog.logrocket.com/product-management/ai-changes-product-management-2026)
- On well-specified tasks, the productivity gap between junior and senior developers narrows. The remaining difference is judgment on what to build and how to scope it. [Opinion] — (search summary only) [DEV Community](https://dev.to/klyx/ai-coding-agents-in-2026-whats-actually-changed-for-small-dev-teams-3ejp)

### Inferences
- In Scrum terms, Backlog refinement becomes the main event, and "ready" now means "precise enough for an agent". The Definition of Ready, which the Scrum Guide does not require, may come back under the name "spec".
- The PO role is growing in two directions. Upstream, it moves toward discovery and validation. Inside the sprint, it moves toward writing and reviewing acceptance criteria. Whether one person can do both is untested.
- DORA's 2025 user-centric finding (section 4) is the strongest data link here. AI without a clear user focus can make teams worse.

### Gaps
- I found no survey of job titles, hiring or PO workload measuring a "product engineer" or "builder" trend.
- I found no data comparing backlog size or refinement time before and after agent adoption.
- The Scrum.org PO posts could not be opened; quotes come from search summaries.

## 4. Definition of Done and acceptance: how do teams redefine Done when AI writes code, and what does DORA say about quality?

### Takeaway
The Scrum Guide's Definition of Done is unchanged. Practitioners are adding explicit gates for AI-written code. These include human review of every AI change, human-written acceptance criteria, security and secret scans, tests written from the requirement, and dependency checks. Stricter gates apply to risky areas. DORA's data backs the need: AI adoption keeps a negative link with delivery stability. DORA names the controls that help: automated tests, strong version control and small batches.

### Cited Findings
Scrum and practitioner guidance
- The 2020 Scrum Guide defines the DoD as "a formal description of the state of the Increment when it meets the quality measures required for the product". [Official text] — [Scrum Guide 2020](https://scrumguides.org/scrum-guide.html)
- David Sabine (Scrum.org) lists a Done checklist that includes human-written acceptance criteria and human review of all AI-generated code. [Practitioner] — (search summary only) [Scrum.org](https://www.scrum.org/resources/blog/ai-rewiring-scrum-teams-not-scrum)
- Vendor and practitioner proposals for an AI-era DoD include several items. Security and secret scans run. "Secure" becomes "passes automated security scan" or "no high/critical CVEs". Human review confirms intent, correctness and edge cases. Tests are written from requirements, not derived from the generated code. Dependencies and licensing get reviewed. [Vendor/opinion] — (search summary only) [SpecStory](https://specstory.com/learning/verification/definition-of-done-for-coding-agents); [minware](https://www.minware.com/guide/best-practices/definition-of-done); [agilesoftdev.com](https://agilesoftdev.com/the-definition-of-done-needs-to-account-for-how-the-code-was-built/); [PAELLADOC](https://paelladoc.com/blog/definition-of-done-ai/); [DZone](https://dzone.com/articles/ai-definition-of-done)
- Risk-tiered review: one pre-merge checklist requires deep verification, senior approval, security review and a threat model for auth, payments and personal data. [Vendor] — (search summary only) [metacto](https://www.metacto.com/blogs/establishing-code-review-standards-for-ai-generated-code)
- A diff-only review can miss business rules, customer agreements and data boundaries that were never written down. [Opinion] — (search summary only) [agilesoftdev.com](https://agilesoftdev.com/the-definition-of-done-needs-to-account-for-how-the-code-was-built/)
- An "AI-augmented DoD" post lets AI run low-level checks, but humans give the final "why" and sign-off at Sprint Review. [Opinion] — (search summary only) [Agile Leadership Day India](https://agileleadershipdayindia.org/blogs/ai-augmented-scrum-framework/ai-augmented-definition-of-done.html)
- Sutherland's keynote abstract says agents "enforce Definition of Done criteria". [Practitioner] — (search summary only) [Scrum Day](https://www.scrumday.org/when-the-machine-can-think)
- Thoughtworks Technology Radar lists "complacency with AI-generated code" as a practice to avoid. It appears in Vol. 32 (April 2025) and in Vol. 33's AI antipatterns, next to "AI-accelerated shadow IT". Vol. 34 (April 2026) warns of "cognitive debt" as AI writes more code. [Practitioner/consultancy] — (search summary only) [Thoughtworks news, April 2025](https://www.thoughtworks.com/about-us/news/2025/thoughtworks-technology-radar-highlights-genai-s-impact-and-key-); [Radar Vol. 32 PDF](https://thoughtworks.com/content/dam/thoughtworks/documents/radar/2025/04/tr_technology_radar_vol_32_en.pdf); [Bolsamania press release, Vol. 34](https://www.bolsamania.com/nota-de-prensa/mercados/as-ai-accelerates-software-complexity-thoughtworks-technology-radar-urges-a-return-to-engineering-fundamentals--22291960.html)

DORA quality and stability data
- DORA 2024 (published 22 October 2024): "More than 75 percent of respondents said that they rely on AI for at least one daily professional responsibility." 39% reported little or no trust in AI-generated code. [Research, Google-sponsored] — [Google Cloud blog](https://cloud.google.com/blog/products/devops-sre/announcing-the-2024-dora-report)
- DORA 2024 estimated that a 25% increase in AI adoption goes with: +7.5% documentation quality, +3.4% code quality, +3.1% code review speed. It also goes with −1.5% delivery throughput and −7.2% delivery stability. These are associations from a survey, not causes. [Research] — [Google Cloud blog](https://cloud.google.com/blog/products/devops-sre/announcing-the-2024-dora-report)
- DORA 2024: improving the development process "does not automatically improve software delivery — at least not without proper adherence to the basics of successful software delivery, like small batch sizes and robust testing mechanisms". [Research] — [Google Cloud blog](https://cloud.google.com/blog/products/devops-sre/announcing-the-2024-dora-report)
- RedMonk's reading of DORA 2024 adds an estimated 2.6% fall in time spent on valuable work. [Analyst] — (search summary only) [RedMonk](https://redmonk.com/rstephens/2024/11/26/dora2024/)
- DORA 2025 (published 23 September 2025; nearly 5,000 respondents plus 100+ hours of qualitative data): 90% use AI at work. Over 80% believe it raised their productivity. 30% report little or no trust in AI-generated code. [Research] — [Google Cloud blog](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report)
- DORA 2025: "Unlike last year, we observe a positive relationship between AI adoption on both software delivery throughput and product performance. However, AI adoption does continue to have a negative relationship with software delivery stability." [Research] — [Google Cloud blog](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report)
- DORA 2025 explains: "Without robust control systems, like strong automated testing, mature version control practices, and fast feedback loops, an increase in change volume leads to instability." Its main theme: "AI doesn't fix a team; it amplifies what's already there." [Research] — [Google Cloud blog](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report)
- The DORA AI Capabilities Model (23 September 2025) names seven capabilities that strengthen AI's benefits:
  1. A clear and communicated AI stance.
  2. Healthy data ecosystems.
  3. AI-accessible internal data.
  4. Strong version control practices.
  5. Working in small batches.
  6. User-centric focus.
  7. Quality internal platforms.

  [Research] — [Google Cloud blog](https://cloud.google.com/blog/products/ai-machine-learning/introducing-doras-inaugural-ai-capabilities-model)
- DORA on small batches: "especially powerful in an AI-assisted environment. This practice amplifies the positive influence of AI on product performance and reduces friction." On version control: frequent commits strengthen AI's effect on individual effectiveness. Frequent rollback use helps AI-assisted teams. [Research] — [Google Cloud blog](https://cloud.google.com/blog/products/ai-machine-learning/introducing-doras-inaugural-ai-capabilities-model)
- DORA on user focus: "in the absence of a user-centric focus, AI adoption can have a negative impact on team performance." Such teams "may just be moving quickly in the wrong direction". [Research] — [Google Cloud blog](https://cloud.google.com/blog/products/ai-machine-learning/introducing-doras-inaugural-ai-capabilities-model)
- CodeRabbit (17 December 2025) studied 470 open-source pull requests: 320 AI co-authored and 150 human-only. AI PRs had 10.83 issues per PR against 6.45, about 1.7x. Logic and correctness issues were 75% more common. Security issues were 1.5–2x more common. Readability problems were over 3x. Performance issues were nearly 8x. CodeRabbit admits its "human" label may be imperfect. It sells AI code review. [Vendor] — (search summary only) [CodeRabbit](https://coderabbit.ai/blog/state-of-ai-vs-human-code-generation-report); [BusinessWire](https://www.businesswire.com/news/home/20251217666881/en/CodeRabbits-State-of-AI-vs-Human-Code-Generation-Report)

### Inferences
- The DoD is where DORA's "control systems" live in Scrum. Automated tests, review, scans and rollback-ready version control are DoD items. Teams with a weak DoD should expect the instability DORA measures.
- DORA's small-batch result points to thin vertical slices per PBI. It warns against letting agents produce one large change per story.
- "Human review of all AI code" in the DoD turns review capacity into a hard limit on throughput. This links to the review bottleneck in section 6.

### Gaps
- I found no survey measuring how many teams changed their DoD because of AI.
- I could not open the full DORA 2024 or 2025 reports (dora.dev blocked). Sample sizes, effect sizes and the 2025 team archetypes beyond two names are unverified here.
- A secondary claim that about 40% of teams reach both high throughput and high stability with AI (DORA 2025) could not be traced to a primary page.

## 5. Ceremonies: what changes in the Daily Scrum, Sprint Planning, Sprint Review and Retrospective?

### Takeaway
The only survey data shows teams use AI to summarize and synthesize events. They use it far less for judgment-heavy facilitation. Proposed changes for agent-heavy teams are mostly opinion. Planning adds "which items go to agents" and caps work at review capacity. The Daily Scrum shifts to catching stuck or failing work, sometimes async and more often. Review adds agent accountability. Retrospectives add agent logs, prompts and instruction files. Several sources say human facilitation matters more, not less. Sprint-free experiments drop synchronous ceremonies entirely.

### Cited Findings
Survey data
- Brazilian Scrum survey (70 respondents; 33 use LLMs in Scrum practice). 68% use or plan to use LLMs to summarize what happened in events; 36% already do. 64% use or plan to use them to synthesize Sprint Review feedback; 42% already do. Designing agendas and timeboxes: 54%. Identifying impediments: 48%. Improving working agreements: 33% use or plan, 33% do not plan. The authors conclude that practitioners "intentionally retain human ownership over value-driven and consensus-sensitive activities". [Research] — [Perkusich et al., arXiv 2602.08192](https://www.alphaxiv.org/abs/2602.08192)
- Same survey, by role: 84% of Developers find AI useful or very useful, against 56% of Scrum Masters. Product Owners are the most divided. [Research] — [Perkusich et al., arXiv 2602.08192](https://www.alphaxiv.org/abs/2602.08192)

Sprint Planning
- Scrum.org: the key new planning question is task attribution, meaning which items go to agents. Teams must write technical prompts for AI members. The post warns against planning around agent generation speed, because that creates a review bottleneck. [Opinion, Scrum.org blog] — (search summary only) [Scrum.org](https://www.scrum.org/resources/blog/how-do-sprint-planning-when-half-your-team-are-ai-agents)
- A third-party guide says Scrum.org warns teams to "limit agentic throughput to human code review capacity". I could not confirm this wording on Scrum.org. [Vendor, citing Scrum.org] — (search summary only) [Augment Code](https://www.augmentcode.com/guides/ai-sprint-planning-with-agents)
- Scrum.org "Agile AI Agents" suggests a "Sprint Planning Risk Adviser" agent. It checks availability, dependencies and backlog state, and writes an advisory report before planning. [Opinion] — (search summary only) [Scrum.org](https://www.scrum.org/resources/blog/agile-ai-agents)
- Research prototypes test LLMs for sprint planning and retrospective analysis. They show tooling, not changed practice. [Research] — [alphaXiv 2512.18966](https://www.alphaxiv.org/abs/2512.18966); [alphaXiv 2506.15172 (RetroAI++)](https://www.alphaxiv.org/abs/2506.15172)

Daily Scrum
- Scrum.org: the Daily Scrum shifts to managing deviations. AI flags friction words such as "waiting on", "stuck" or "failing". [Opinion] — (search summary only) [Scrum.org](https://www.scrum.org/resources/blog/how-do-daily-scrum-when-half-your-team-ai-agents)
- A developer who runs a fleet of agents proposes 10-second async updates every 2–4 hours (done, next, blocked). The reason: a daily meeting is too slow to catch stuck agents. This is a proposal, not a field report. [Opinion] — (search summary only) [DEV Community](https://dev.to/chovy/ten-second-agent-standups-agile-feedback-every-2-to-4-hours-4bm0)
- Tool vendors add AI standup summaries and async agent check-ins, for example in Slack. [Vendor] — (search summary only) [TeamRetro](https://www.teamretro.com/standups/); [AgentCenter](https://www.agentcenter.cloud/blogs/how-to-run-a-daily-standup-for-ai-agents)

Sprint Review
- Scrum.org: Sprint Review must address accountability for agent work and how to measure agents' return on investment. [Opinion] — (search summary only) [Scrum.org](https://www.scrum.org/resources/blog/how-run-sprint-review-when-half-your-team-ai-agents)
- Commentators say some teams move toward continuous flow with demos as often as daily. Named examples are missing. [Opinion] — (search summary only) [Rootstrap](https://www.rootstrap.com/blog/future-of-agile-ai-native-software-development/)

Sprint Retrospective
- Scrum.org: retrospectives should review agent logs and token usage and refine prompt libraries. [Opinion] — (search summary only) [Scrum.org](https://www.scrum.org/resources/blog/how-run-sprint-retrospective-when-half-your-team-ai-agents)
- A consultant who runs a team of role-based agents (including an "agile coach" agent) has them hold a retrospective at the end of each session. The results update shared agent instruction files, kept as markdown in the codebase. Changes go through pull requests "just like any other code change". [Practitioner, single case] — (search summary only) [cauri's Substack](https://caurijaye.substack.com/p/my-ai-team-runs-its-own-retros-now)
- Another guide: agents can prepare retro data, but letting them run facilitation and decisions is not yet advised for most teams. The human facilitator role "becomes more important, not less". [Vendor/consultancy] — (search summary only) [Opteria](https://opteria.de/en/resources/retrospective-meeting-with-ai-agents/)
- One retro guide treats agent retros as workflow debugging. If an agent fails to deliver, the team rewrites its system prompt during the retro. [Opinion] — (search summary only) [aiaugmentedscrum.com](https://aiaugmentedscrum.com/blogs/ai-augmented-scrum-events/ai-augmented-sprint-retrospective.html)

Dropping ceremonies
- The Agentic Scrum plugin drops synchronous ceremonies and keeps inspect-and-adapt. [Practitioner] — (search summary only) [GitHub: atusy/agentic-scrum](https://github.com/atusy/agentic-scrum)

### Inferences
- The retrospective has the most concrete new content: the team's AI working agreements, prompts and agent instruction files. Treating these as versioned code under review is a pattern teams can copy.
- The Daily Scrum is the event most at risk of becoming a tool feed. Its people-coordination purpose stays only if humans still need to sync on review and specs.
- Sprint Review gains weight as the place where humans confirm agent output matches intent. This is the same "verify against intent" theme as sections 3 and 4.

### Gaps
- I found no systematic study or large survey of teams changing or dropping specific Scrum events because of agents.
- I found no data on whether AI-focused retrospectives improve outcomes.
- Scrum.org event posts could not be opened. Their dates and authors are unverified.

## 6. Documented failure modes: review bottlenecks, overcommitment from AI optimism, quality debt, cargo-cult Scrum with AI

### Takeaway
The best-documented failure is the review bottleneck. Agents produce more and larger changes, and human review and verification time grows. Telemetry, surveys and a longitudinal study all show this. Quality and stability problems are well supported (DORA, CodeRabbit). The "optimism" failure has indirect support: developers overestimate AI speed-ups (METR). Direct evidence of sprint overcommitment is anecdotal. I found no sourced account of "cargo-cult Scrum with AI".

### Cited Findings
Review bottleneck and verification load
- Faros AI's "AI Productivity Paradox" (2025, telemetry from over 10,000 developers on about 1,200–1,255 teams). High-adoption teams completed 21% more tasks and merged 98% more PRs. PR review time rose 91%. Average PR size reportedly rose 154% and bugs per developer 9%. Faros found "no significant correlation between AI adoption and improvements at the company level". Other Faros pages give different PR-size and bug figures (51.3% and 54%). The report is behind a sign-up form. [Vendor telemetry] — (search summary only) [Faros AI](https://www.faros.ai/ai-productivity-paradox); [Augment Code summary](https://www.augmentcode.com/guides/ai-productivity-paradox-engineering-delivery)
- Vella and Blincoe (University of Auckland; arXiv, May 2026). They surveyed 158 engineers, then 101 six months later, with a matched group of 95. 82% reported spending less time writing code. Reviewing code was "the only task with means above the neutral midpoint at both time points". The balance of work shifted toward verification. They name a new category: "supervisory engineering work", meaning directing, evaluating and correcting AI output. [Research] — [arXiv 2605.23135 via alphaXiv](https://www.alphaxiv.org/abs/2605.23135)
- Same study, "productivity-experience paradox". 84% reported higher productivity at both points. But among matched participants, the share reporting worse developer experience in at least one area nearly doubled, from 14% to 27%. Flow state and cognitive load got worse while feedback loops improved. [Research] — [arXiv 2605.23135 via alphaXiv](https://www.alphaxiv.org/abs/2605.23135)
- Scrum.org warns that planning around agent generation speed creates a review bottleneck. It also warns that sprint length must allow for "cognitive overload from reviewing massive amounts of AI-generated content". [Opinion] — (search summary only) [Scrum.org planning](https://www.scrum.org/resources/blog/how-do-sprint-planning-when-half-your-team-are-ai-agents); [Scrum.org sprints](https://www.scrum.org/resources/blog/daily-sprints-and-impact-ai)

Perception gap and optimism
- METR randomized trial (July 2025): 16 experienced open-source developers, 246 tasks. With AI they took about 19% longer. Afterwards they believed AI had made them about 20% faster. [Research] — (search summary only) [ScienceBlog](https://scienceblog.com/t-a-randomized-trial-by-metr-found-that-experienced-developers-completed-real-coding-tasks-19-slower-when-allowed-to-use-ai-tools-yet-afterwards-they-estimated-on-average-that-ai-had-made-them-20-fast/)
- METR follow-up (February 2026): 57 developers, over 800 tasks, 143 repositories. Estimates leaned toward a speed-up: about −18% time for returning developers and −4% for new ones. METR called this "only very weak evidence" for the size of the effect. Confidence intervals crossed zero, and selection effects were a concern. METR added a banner saying the 2025 result no longer reflects current AI. [Research] — (search summary only) [CoderCops](https://blog.codercops.com/blog/ai-coding-productivity-2x-not-10x-metr-2026); [urandom.io](https://urandom.io/blog/2026-03-01-ai-made-developers-slower-then-december-happened)
- Vendor blogs pitch AI to detect overcommitment, for example when 30–40% of stories keep spilling into the next sprint. These are product claims. [Vendor] — (search summary only) [AgileSeekers](https://agileseekers.com/blog/using-ai-to-detect-sprint-overcommitment-patterns)

Quality debt and instability
- DORA 2024: −7.2% stability per 25% more AI adoption. DORA 2025: the negative link with stability continues. [Research] — [Google Cloud 2024](https://cloud.google.com/blog/products/devops-sre/announcing-the-2024-dora-report); [Google Cloud 2025](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report)
- CodeRabbit: AI co-authored PRs carried about 1.7x more issues than human-only PRs (sample of 470). [Vendor] — (search summary only) [CodeRabbit](https://coderabbit.ai/blog/state-of-ai-vs-human-code-generation-report)
- "Almost right" output is the top frustration. 66% in the Stack Overflow 2025 survey say so. 81% in the Brazilian Scrum survey report "almost correct" output. [Vendor survey; Research] — (search summary only) [VentureBeat](https://venturebeat.com/ai/stack-overflow-data-reveals-the-hidden-productivity-tax-of-almost-right-ai-code); [arXiv 2602.08192](https://www.alphaxiv.org/abs/2602.08192)
- Thoughtworks lists "complacency with AI-generated code" as an antipattern and later warns of "cognitive debt". [Practitioner/consultancy] — (search summary only) [Thoughtworks](https://www.thoughtworks.com/about-us/news/2025/thoughtworks-technology-radar-highlights-genai-s-impact-and-key-); [Bolsamania](https://www.bolsamania.com/nota-de-prensa/mercados/as-ai-accelerates-software-complexity-thoughtworks-technology-radar-urges-a-return-to-engineering-fundamentals--22291960.html)
- Atlassian 2025: developers save about 10 hours a week with AI but lose about 10 hours a week to organizational friction. The friction is searching, switching tools and cross-team work. [Vendor survey] — (search summary only) [Atlassian blog](https://www.atlassian.com/blog/developer/developer-experience-report-2025); [SD Times](https://sdtimes.com/ai/report-ai-productivity-gains-cancelled-out-by-friction-points-in-other-areas-that-slow-developers-down/)

Process weaknesses amplified
- DORA 2025: "AI doesn't fix a team; it amplifies what's already there." [Research] — [Google Cloud blog](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report)
- InfoQ's 2026 culture trends podcast: organizations that never embedded agile fundamentals face higher risk when they adopt AI. [Opinion] — (search summary only) [InfoQ podcast](https://www.infoq.com/podcasts/infoq-culture-trends-2026/)
- Sutherland reported, in a LinkedIn post, an agent that created zero work items across Sprints 146–149. This shows an agent "on the team" doing nothing for four sprints. [Practitioner, self-reported] — (search summary only) [Sutherland LinkedIn](https://www.linkedin.com/in/jeffsutherland/)

### Inferences
- The failures form a chain. Optimism leads to more agent output. That causes larger PRs and longer review queues. Rushed review then causes instability and quality debt. In Scrum terms, the fix is to plan to review capacity, keep slices small, and enforce the DoD.
- Velocity rising while company outcomes stay flat (Faros) is a Scrum-specific trap. A Sprint Review that celebrates points or PR counts will reward the wrong thing.
- "Cargo-cult Scrum with AI" may look like keeping every ceremony while agents make human syncs empty. Or it may look like reporting agent velocity as team success. Both are my inference; no source documents them.

### Gaps
- I found no study measuring sprint overcommitment or spillover before and after AI adoption.
- I found no sourced writing that uses the term "cargo cult" for Scrum with AI.
- Faros and METR primary pages were blocked. Figures come from secondary write-ups that partly disagree.

## 7. Surveys with numbers on agile teams adopting AI

### Takeaway
Adoption is high in every survey: 83–90% of respondents use AI. Governance, training and trust lag well behind. Agile-specific surveys are small and skewed toward coaches and consultants: Digital.ai has 349 respondents and Scrum.org 289. Large developer surveys (Stack Overflow 49,009; DORA nearly 5,000; Atlassian 3,500) show rising use, falling trust, and time gains lost to friction and rework.

### Cited Findings
Digital.ai, 18th State of Agile Report (released 28 October 2025) [Vendor survey]
- 349 agile practitioners surveyed from 11 July to 20 August 2025. The sample skews toward agile coaches and consultants at large enterprises. — (search summary only) [Scrum.org summary](https://www.scrum.org/resources/blog/18th-state-agile-report); [Report PDF mirror](https://www.meriroos.ee/Stuff/Digital-ai-18th-State-of-Agile.pdf)
- AI use rose from 68% to 84% in a year. Only 49% have AI guardrails or governance. Over a quarter of AI users are experimenting with agentic AI. 41% implement AI tools in a coordinated way across teams. Digital.ai calls its model "Agentic Agile Planning". — (search summary only) [BusinessWire](https://www.businesswire.com/news/home/20251028047166/en/Digital.ais-18th-State-of-Agile-Report-Marks-the-Start-of-the-Fourth-Wave-of-Software-Delivery-AI-Is-Transforming-Agile-from-a-Team-Practice-into-an-Enterprise-Wide-Advantage); [Intelligent CIO](https://www.intelligentcio.com/north-america/2025/10/28/digital-ais-18th-state-of-agile-report-marks-the-start-of-the-fourth-wave-of-software-delivery/); [Peak Digital](https://peakdigital.online/reports/state-of-agile-2025-ai-adoption-governance/)
- 41% increased agile spending over two years. 74% use hybrid, blended or homegrown agile models. A secondary source reports only 10% have formalized AI-assisted models. — (search summary only) [ITPro](https://www.itpro.com/software/development/ai-is-transforming-agile-development-practices-as-teams-battle-mounting-delivery-cycle-pressure-and-roi-concerns); [IT Brief](https://itbrief.news/story/ai-driven-software-delivery-reshapes-agile-practices-worldwide)

Scrum.org, AI4Agile Practitioners Report 2026 [Vendor/training-body survey]
- 289 agile practitioners in over 20 countries: Scrum Masters, coaches, POs, PMs and others. 83% use AI, but 55% spend 10% or less of their working time with it. Only 15% had formal training in AI for agile work. The top barrier is not knowing where AI fits (54%). — (search summary only) [Scrum.org](https://www.scrum.org/resources/blog/ai4agile-practitioners-report-2026); [DZone](https://dzone.com/articles/ai4agile-practitioners-report)
- Top benefits: productivity 73.7%, reduced cognitive load 71.6%, greater focus 71.6%. Only 7.6% see AI as a significant threat. — (search summary only) [Scrum.org](https://www.scrum.org/resources/blog/ai4agile-practitioners-report-2026); [DZone](https://dzone.com/articles/ai4agile-practitioners-report)
- An older, undated Scrum.org survey is cited secondhand: 80% of Scrum Masters thought AI could help them, and 12% felt threatened. Unverified. — (search summary only) [Echometer](https://echometerapp.com/en/scrum-statistics-2026/); [ThinkCloudly](https://thinkcloudly.com/blog/management/ai-scrum-masters/)

Forrester, via InfoQ (February 2026) [Analyst]
- 95% still find agile relevant. Nearly half use generative AI in their agile practices. Only 7% reach full proficiency. — (search summary only) [InfoQ](https://www.infoq.com/news/2026/02/ai-agile-manifesto-debate/)

Stack Overflow Developer Survey 2025 [Vendor survey, large sample]
- 49,009 responses from 166 countries, collected 29 May to 23 June 2025. Respondents are mostly recruited through Stack Overflow's own channels. — (search summary only) [TechRepublic](https://www.techrepublic.com/article/news-developer-trust-in-ai-declines/); [VentureBeat](https://venturebeat.com/ai/stack-overflow-data-reveals-the-hidden-productivity-tax-of-almost-right-ai-code)
- "More developers actively distrust the accuracy of AI tools (46%) than trust it (33%)". Only 3% highly trust AI output. One outlet gives trust as 29%, down from 40%; the 33% and 29% figures conflict. — (search summary only) [TechRepublic](https://www.techrepublic.com/article/news-developer-trust-in-ai-declines/); [ShiftMag](https://shiftmag.dev/stack-overflow-survey-2025-ai-5653/)
- 66% say "almost right, but not quite" AI answers are their top frustration. 75% would still ask a person "when I don't trust AI's answers". — (search summary only) [VentureBeat](https://venturebeat.com/ai/stack-overflow-data-reveals-the-hidden-productivity-tax-of-almost-right-ai-code)
- AI agents: 31% use them, 17% plan to, and 38% do not plan to. 14.1% use agents daily. 87% are concerned about the accuracy of agents' information, and 81% about security and privacy. 69% of agent users report higher productivity. — (search summary only) [DevOps.com](https://devops.com/stack-overflow-survey-shows-ai-adoption-for-devs/); [ShiftMag](https://shiftmag.dev/stack-overflow-survey-2025-ai-5653/); [ADTmag](https://adtmag.com/blogs/watersworks/2026/01/stack-overflow-survey.aspx)
- About 72% say "vibe coding" is not part of their professional work. VentureBeat reports 77%; the figures conflict. — (search summary only) [DEV Community](https://dev.to/takiuddinahmed/what-the-2025-stack-overflow-survey-tells-us-about-ai-developer-tools-20ac); [VentureBeat](https://venturebeat.com/ai/stack-overflow-data-reveals-the-hidden-productivity-tax-of-almost-right-ai-code)
- 60% view AI tools favourably, down from over 70% in earlier years. This is as cited in the Vella and Blincoe paper. — [arXiv 2605.23135 via alphaXiv](https://www.alphaxiv.org/abs/2605.23135)

Atlassian State of Developer Experience 2025 [Vendor survey]
- 3,500 developers and managers in six countries. 99% report time savings from AI, and 68% save more than 10 hours a week. 50% lose 10+ hours a week to organizational inefficiency, up from 33% the year before. 90% lose 6+ hours. — (search summary only) [Atlassian blog](https://www.atlassian.com/blog/developer/developer-experience-report-2025); [SD Times](https://sdtimes.com/ai/report-ai-productivity-gains-cancelled-out-by-friction-points-in-other-areas-that-slow-developers-down/); [Techzine](https://www.techzine.eu/news/devops/132992/ai-saves-development-time-but-inefficiencies-still-cause-losses)

DORA 2024 and 2025 [Research, Google-sponsored]
- See section 4. 2024: over 75% rely on AI daily and 39% have little or no trust. 2025: 90% use AI, over 80% feel more productive, 30% have little or no trust, and the negative stability link continues. — [Google Cloud 2024](https://cloud.google.com/blog/products/devops-sre/announcing-the-2024-dora-report); [Google Cloud 2025](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report)

Academic surveys [Research]
- Perkusich et al. (arXiv, February 2026): 70 Brazilian professionals; 49 use Scrum; 33 use LLMs in Scrum. Data collected October–November 2025. 85% have intermediate or advanced proficiency, and 52% use LLMs daily. Benefits: productivity 78%, quality 78%, less repetitive effort 75%. Risks: "almost correct" outputs 81%, varying output quality 63%, confidentiality 63%, hallucinations 59%, hard-to-validate output 59%, legal or ethical doubts 56%. 36% have no AI policy and 36% have a formal one. Nearly 30% worry that over-reliance erodes skills. The sample is small and not random. — [arXiv 2602.08192 via alphaXiv](https://www.alphaxiv.org/abs/2602.08192)
- Vella and Blincoe (arXiv, May 2026): see section 6. 158, then 101, matched 95, across 28 countries. 82% spend less time writing code. 84% report productivity gains. Worse developer experience rose from 14% to 27%. — [arXiv 2605.23135 via alphaXiv](https://www.alphaxiv.org/abs/2605.23135)

### Inferences
- Across surveys, AI use among agile practitioners (83–84%) is close to developers' (DORA 90%). Depth differs: most agile practitioners spend 10% or less of their time with AI. Formal AI-assisted operating models are rare (about 10%, unverified).
- The governance gap (49% have guardrails, 15% have training, 36% have no policy) means most agile teams use AI informally. An explicit DoD and working agreements would fill that gap.
- Trust is falling while use rises. This argues for evidence-based Done criteria rather than trust-based ones.

### Gaps
- Atlassian's State of DevEx 2026 reportedly shows fewer people saving 10+ hours, nearly half spending 4+ hours a week managing AI tools, and 65% fixing AI work that missed the intent. I could not verify these figures or trace them to a primary page (atlassian.com blocked). Lead: [Techzine coverage](https://www.techzine.eu/news/devops/145185/atlassian-ai-speeds-up-coding-but-friction-remains-an-issue/).
- I could not confirm the commonly quoted Stack Overflow figures for overall AI tool use and daily use from a primary page (survey.stackoverflow.co blocked).
- I found no Scrum Alliance survey, and no Digital.ai figures on estimation or sprint length.
- DORA 2024's sample size and the full DORA 2025 report were not reachable (dora.dev blocked).
