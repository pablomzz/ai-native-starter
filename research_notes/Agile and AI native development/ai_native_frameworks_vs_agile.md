# AI-native process frameworks compared with agile: AI-DLC, spec-driven development, Shape Up and vendor playbooks

Source-access note: the fetch tool could not open martinfowler.com, aws.amazon.com or github.blog (their hosts are not allowed in this session). Claims from those sites come from search-engine extracts, not full reads. The Anthropic playbook on claude.com was read directly. Tags used below: [Vendor] = a company writing about its own method or product. [Customer] = a vendor's customer, often published by the vendor. [Practitioner] = an independent blog or case study. [Research] = a study or survey. [Author] = a named thought leader's own words.

## 1. AWS AI-DLC (2025): phases, bolts, mob elaboration, human oversight, and AWS claims compared with practitioner reports

### Takeaway
AI-DLC (AI-Driven Development Life Cycle) has three phases: Inception, Construction and Operations. It replaces sprints with "bolts" lasting hours or days, and epics with "units of work". People approve the work at every stage. All productivity numbers come from AWS or its customers. Independent reports say the effort moves to requirements. They also report heavy approval overhead and documents that drift away from the code.

### Cited Findings
- [Vendor] AI-DLC has three phases. In Inception, AI turns business intent into requirements, stories and "units" during a "Mob Elaboration" session. In that session the whole team checks the AI's questions and proposals. In Construction, AI proposes architecture, domain models, code and tests in a "Mob Construction" session — [AWS DevOps blog, "AI-Driven Development Life Cycle: Reimagining Software Engineering"](https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle/) (search extract)
- [Vendor] AWS writes: "Traditional 'sprints' are replaced by 'bolts' – shorter, more intense work cycles measured in hours or days rather than weeks." "Units of Work" replace epics — [AWS DevOps blog](https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle/) (search extract)
- [Vendor] Plans, requirements and design files live in the project repository, so work can resume across sessions — [AWS DevOps blog](https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle/) (search extract)
- [Vendor] AWS presents AI-DLC as a redesign, not an add-on to existing practice. It sums up the core rule as "AI proposes, humans decide". It also says "Human approvals are embedded at every decision gate, preserving oversight while maintaining velocity." I could not confirm which AWS page holds each exact phrase — [AWS: ConnectiveRx case](https://aws.amazon.com/blogs/publicsector/how-connectiverx-accelerated-innovation-with-ai-dlc/); [AWS: Dynata case](https://aws.amazon.com/blogs/architecture/how-dynata-scaled-ai-across-the-development-lifecycle-with-ai-dlc-and-kiro-ide/)
- [Vendor] "AI-DLC addresses this challenge by requiring a collaborative human-in-the-loop cycle at every stage of the workflow." AI writes a plan, people review it, and only approved plans run — [AWS: Open-sourcing adaptive workflows for AI-DLC](https://aws.amazon.com/blogs/devops/open-sourcing-adaptive-workflows-for-ai-driven-development-life-cycle-ai-dlc/)
- [Vendor] For financial services, AWS says humans keep oversight, decision rights and accountability — [AWS Industries blog](https://aws.amazon.com/blogs/industries/ai-driven-development-lifecycle-for-financial-services/)
- [Vendor] The open-source repo now describes "5 phases and 33 stages, human approval gates and source-bound review evidence, and a 131-event audit trail" — [awslabs/aidlc-workflows](https://github.com/awslabs/aidlc-workflows)
- [Vendor] The repo's first rule is "The human drives the engine". The person decides what to build, whether each gate passes, what to trade off and when to stop — [aidlc-workflows AGENTS.md](https://github.com/awslabs/aidlc-workflows/blob/main/AGENTS.md). The older v1 guide told users to review every AI plan and approve each stage — [aidlc-workflows v1](https://github.com/awslabs/aidlc-workflows/tree/v1)
- [Practitioner, inside the AWS repo] An RFC asks for "fewer approvals for small work". It calls such approvals "approvals the person did not look at". The default gates stay — [Issue #1643](https://github.com/awslabs/aidlc-workflows/issues/1643)
- [Practitioner, inside the AWS repo] An issue asks how to keep AI-DLC requirement and design documents in sync with the code — [Issue #40](https://github.com/awslabs/aidlc-workflows/issues/40)
- [Vendor] In AWS's AgentCore example, the team uses Kiro for Inception and reviews AI-written specs together. Construction uses Claude Code and Kiro — [AWS ML blog](https://aws.amazon.com/blogs/machine-learning/ai-driven-development-lifecycle-using-amazon-bedrock-agentcore/)
- [Customer] Rescale's team answered more than 20 AI-generated clarifying questions as a group during Inception — [AWS ML blog, Rescale](https://aws.amazon.com/blogs/machine-learning/how-rescale-built-an-ai-triage-agent-with-strands-agents-and-ai-dlc/)
- [Customer] ConnectiveRx reports 68–87% less effort per use case. About 180 hours of work took about 24 hours — [AWS Public Sector blog](https://aws.amazon.com/blogs/publicsector/how-connectiverx-accelerated-innovation-with-ai-dlc/)
- [Customer] Dynata says a workshop that usually took days or weeks of meetings fit into one structured day — [AWS Architecture blog](https://aws.amazon.com/blogs/architecture/how-dynata-scaled-ai-across-the-development-lifecycle-with-ai-dlc-and-kiro-ide/)
- [Customer] Benevity saw a wide spread in early bolt speed. Its best team reached about six times the normalised velocity of a comparable sprint. Its headline is "Agile was the last revolution: AI-DLC is the next one" — [Benevity](https://benevity.com/blog/ai-dlc-software-development-agile-unleashed)
- [Vendor] InfoQ reports that AWS suggests "Intent Design" in place of sprint planning — [InfoQ, 17 February 2026](https://www.infoq.com/news/2026/02/ai-agile-manifesto-debate/)
- [Practitioner] Fujitsu, using Kiro: "the largest single portion of project effort is spent refining requirements rather than writing code" — [Fujitsu blog, 15 July 2026](https://corporate-blog.global.fujitsu.com/fgb/2026-07-15/01)
- [Practitioner] Metal Toad says units and bolts need more client check-ins than clients can give. It runs a Scrum and AI-DLC hybrid. It claims 40–60% faster delivery, which no one has checked — [Metal Toad](https://www.metaltoad.com/blog/the-ai-driven-workflow-a-necessary-evolution-of-the-sdlc)
- [Practitioner, AWS-hosted] An Apache SeaTunnel case found large AI errors that a human gate caught. Bolt-sized changes still waited days or weeks for community review. The AI did not handle license headers or secrets by itself — [AWS China blog](https://aws.amazon.com/cn/blogs/china/apache-seatunnel-aidlc-practice/)
- [Practitioner] One author tested AI-DLC for regulated public-service delivery. The author flags their own bias: they used and judged both methods — [AI-DLC APS fit analysis](https://ai-dlc-xk92m.pages.dev/ai-dlc-aps-analysis)
- [Practitioner] Community versions do not agree on the terms. One adds Elaboration, Hardening and Evolution phases and defines a bolt as a 1–4 hour task — [msifoss/ai-dlc](https://github.com/msifoss/ai-dlc), [glossary](https://github.com/msifoss/ai-dlc/blob/main/docs/reference/GLOSSARY.md). Another kit warns against copying AWS ritual names as if they were a standard — [agentic-sdlc-kit terminology](https://github.com/jitendraapi/agentic-sdlc-kit/blob/main/docs/terminology.md). A Claude Code kit keeps three phases and adds five gates, "proof over prose" — [wico216/ai-sdlc](https://github.com/wico216/ai-sdlc)

### Inferences
- Compared with agile: AI-DLC keeps iteration, whole-team work and an operations feedback loop. It drops time-boxed sprints and epics. It adds AI-written questions and plans, a gate at every stage, and files stored in the repo.
- The phase names (Inception, Elaboration, Construction) echo the older Rational Unified Process. This is my observation from general knowledge, not from a source. It suggests a phase-gate model with short loops inside it.
- The method grew heavier over time: 3 phases in the blog, then 5 phases and 33 stages in the repo.
- For a solo first-time builder, "mob" sessions do not apply. One pattern does transfer: the AI asks clarifying questions, the person answers, then the person approves a short plan.
- A gate at every step invites rubber-stamping (Issue #1643). This matters for an owner who "may say yes to everything". Fewer gates, each with clear evidence, may serve better.

### Gaps
- I could not open aws.amazon.com. The author and date of the original AI-DLC post are unverified here.
- I found no independent controlled study of AI-DLC results. All numbers are self-reported by AWS or customers.
- I did not read the AWS AI-DLC whitepaper or the re:Invent 2025 session ([DVT214 summary](https://dev.to/kazuya_dev/aws-reinvent-2025-introducing-ai-driven-development-lifecycle-ai-dlc-dvt214-32b)).

## 2. Spec-driven development: GitHub Spec Kit, AWS Kiro, Tessl, and the critiques

### Takeaway
Spec-driven development (SDD) means writing a structured spec (requirements, then design, then tasks) before an agent writes code. The tools differ in weight. Kiro uses three files, Spec Kit uses a "constitution" plus many files, and Tessl aims to make the spec the source and the code disposable. The main critiques: one process for every size of problem, long markdown that is harder to review than code, a false sense of control, non-deterministic output, spec drift, and a risk of waterfall when specs freeze.

### Cited Findings
- [Practitioner/Author] Birgitta Böckeler (Thoughtworks) wrote "Understanding Spec-Driven-Development: Kiro, spec-kit, and Tessl", dated 15 October 2025. She says the meaning of SDD is "still in flux" — [martinfowler.com](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html) (search extract)
- [Author] She describes three levels: spec-first, spec-anchored (the spec is kept and updated) and spec-as-source (people edit only the spec) — [martinfowler.com](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html); [secondary summary](https://daniliants-com.pages.dev/insights/understanding-spec-driven-development-kiro-spec-kit-and-tessl)
- [Author] Kiro was the lightest. It "created only 3 files", and "requirements > design > tasks" was easy to understand. But it was "way too verbose for the small bug I was asking it to fix" — [martinfowler.com](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html) (search extract)
- [Author] Spec Kit felt like overkill for the problem size. Its markdown files were "repetitive, both with each other, and with the code that already existed, and just very verbose and tedious to review" — [martinfowler.com](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html) (search extract)
- [Author] On Tessl: "I have seen the non-determinism in action though, when I generated code multiple times from the same spec." — [martinfowler.com](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html) (search extract)
- [Author] She doubts one workflow fits all problem sizes. She warns of a false sense of control: the Spec Kit agent took existing notes as new specs and created duplicate code — [martinfowler.com](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html) (search extract)
- [Secondary] Summaries say she compares spec-as-source to Model-Driven Development (MDD). She warns it may combine MDD's rigidity with LLM non-determinism — [daniliants summary](https://daniliants-com.pages.dev/insights/understanding-spec-driven-development-kiro-spec-kit-and-tessl); [engineered.at](https://engineered.at/articles/understanding-spec-driven-development-kiro-spec-kit-and-tessl)
- [Vendor] GitHub's Spec Kit was announced on the GitHub blog by Den Delimarsky. It works with GitHub Copilot, Claude Code and Gemini CLI. The spec is the central artifact that drives implementation, checklists and task breakdowns. It is MIT-licensed — [GitHub blog](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/) (search extract)
- [Practitioner] The Spec Kit command chain is constitution → specify → (clarify) → plan → tasks → implement. The constitution holds principles, limits, quality gates and governance. An analysis step checks spec, plan and tasks against the constitution and flags conflicts by severity. Each feature gets a numbered folder of markdown files — [David Burela, 7 October 2025](https://blog.davidburela.com/2025/10/07/github-spec-kit/); [Levelop guide](https://levelop.dev/blog/github-spec-kit-hands-on-guide); [Plannotator docs](https://docs.plannotator.ai/frameworks/github-spec-kit)
- [Research] A paper describes the Spec Kit phases and says people review and refine at each phase before going on — [arXiv 2602.00180](https://arxiv.org/pdf/2602.00180) (search extract; not opened)
- [Vendor] A Kiro spec is three markdown files. requirements.md holds user stories and acceptance criteria in EARS notation. design.md holds architecture, sequence diagrams and components. tasks.md holds discrete tasks with live status. Bug fixes use bugfix.md with current, expected and unchanged behaviour — [Kiro docs](https://kiro.dev/docs/specs/concepts)
- [Vendor] EARS (Easy Approach to Requirements Syntax) is a structured way to write clear, testable requirements, for example "WHEN [condition] THE SYSTEM SHALL [behaviour]" — [Kiro docs](https://kiro.dev/docs/specs/concepts)
- [Author] Kiro also has "steering" files that work like a memory bank — [martinfowler.com](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html) (via search summary)
- [Vendor] On 16 September 2025 Tessl launched a Spec Registry (open beta, over 10,000 usage specs for open-source libraries) and the Tessl Framework (closed beta) — [AI Native Dev podcast](https://podwise.ai/episodes/5211904); [codemyspec review](https://codemyspec.com/blog/tessl-review)
- [Practitioner] A 2026 review calls Tessl "the most aggressive SDD vision" and "the least proven". It says the regeneration engine is closed beta, JavaScript-only and non-deterministic — [codemyspec](https://codemyspec.com/blog/tessl-review)
- [Practitioner] The waterfall debate: critics say frozen specs handed to implementers repeat waterfall failures. "The useful critique is not 'specs are bad.' It is 'long upfront planning before feedback is bad.'" Defenders say waterfall treats documents as gates (write, approve, freeze, hand off). They say SDD treats documents as a working tool that can change during build. I could not map each quote to one page — [Augment Code](https://www.augmentcode.com/guides/spec-driven-development-vs-waterfall); [Atomic Object](https://spin.atomicobject.com/spec-driven-vs-waterfall/); [Allstacks](https://www.allstacks.com/blog/spec-driven-development-isnt-waterfall-why-the-ai-coding-bottleneck-changed-everything); [Glukhov](https://glukhov.org/ai-devtools/vibe-coding/spec-driven-development-vs-vibe-coding/)
- [Practitioner] Spec drift example: an agent adds a caching layer the spec never planned. Three sessions later it is part of the data model and costly to remove. Suggested fixes: explicit non-goals, and specs small enough to fit on one screen — [dev.to: why SDD fails](https://dev.to/casamia918/why-spec-driven-development-fails-and-what-we-can-learn-from-it-2pec); [Alex Cloudstar](https://alexcloudstar.com/blog/spec-driven-development-2026/)
- [Practitioner] Addy Osmani advises starting a spec from a high-level vision and letting the agent draft details. Boundaries should be explicit in three tiers: always, ask first, never (tier attribution via search extract) — [addyosmani.com](https://addyosmani.com/blog/good-spec/)
- [Practitioner] One writer says the useful loop is spec → execution → evidence → human review → spec update, which keeps the spec current — [search summary of spec-writing guides](https://deliberate.codes/blog/2026/writing-specs-for-ai-coding-agents/)

### Inferences
- Compared with agile: SDD keeps user stories, acceptance criteria and task breakdown. It shifts weight back toward written documents, against the manifesto's "working software over comprehensive documentation". It adds a constitution, structured requirement syntax and agent-run task lists.
- Defenders and critics agree on one point. Specs are fine if small, living and quickly tested. They fail when big, frozen or treated as the source of truth.
- For first-time builders, a Kiro-sized spec fits best: one screen, with non-goals, and criteria phrased as "When …, the page shall …". Each criterion can become one test.
- Spec-as-source (Tessl) is too immature and non-deterministic for beginners.
- A separate light path for small bug fixes (like Kiro's bugfix.md) answers Böckeler's "one size for all" critique.

### Gaps
- martinfowler.com and github.blog could not be opened. Quotes come from search extracts. The exact Spec Kit announcement date is unverified.
- I found the Thoughtworks Technology Radar warning on "heavy up-front specification" only second-hand.
- I found no empirical study comparing outcomes with and without SDD. Unread possible leads: [arXiv 2605.02455](https://arxiv.org/pdf/2605.02455) and Böckeler's later pieces ([TDD inside the agent loop](https://martinfowler.com/articles/exploring-gen-ai/tdd-in-the-agent-loop.html), [Structured-Prompt-Driven Development](https://martinfowler.com/articles/structured-prompt-driven/)).

## 3. Shape Up: appetite, shaping, betting table, cycles, cool-down, hill charts, no backlog; adaptations for AI agents

### Takeaway
Shape Up (Basecamp, Ryan Singer) fixes time and varies scope. It replaces estimates with "appetite" and backlogs with a betting table that picks a few shaped pitches. Work runs in six-week cycles, then a two-week cool-down. Hill charts show progress. A pitch looks a lot like an AI spec, and some practitioners map pitch → spec. I found no statement by Singer on using Shape Up with agents.

### Cited Findings
- [Author] Basecamp's book describes six-week cycles of shaped work — [Shape Up](https://basecamp.com/shapeup)
- [Author] Appetite is "the amount of time we want to spend on a project, as opposed to an estimate" — [Glossary](https://basecamp.com/shapeup/4.5-appendix-06); [Set Boundaries](https://basecamp.com/shapeup/1.2-chapter-03)
- [Author] Shaped work is rough, solved and bounded. "Wireframes are too concrete" and "words are too abstract" — [Principles of Shaping](https://basecamp.com/shapeup/1.1-chapter-02)
- [Author] A pitch has five parts: problem, appetite, solution, rabbit holes and no-gos — [Write the Pitch](https://basecamp.com/shapeup/1.5-chapter-06)
- [Author] "Bets, Not Backlogs": there is no central backlog. Only a few well-shaped options reach the betting table. Other lists "are not direct inputs to the betting process" — [Chapter 7](https://basecamp.com/shapeup/2.1-chapter-07)
- [Author] The betting table is a meeting during cool-down where stakeholders choose the next cycle's pitches. Work that does not ship in one cycle is cancelled by default, not extended (the "circuit breaker") — [The Betting Table](https://basecamp.com/shapeup/2.2-chapter-08)
- [Author] Cool-down is a two-week break between cycles for small tasks and bug fixes — [Glossary](https://basecamp.com/shapeup/4.5-appendix-06)
- [Author] A hill chart shows work from unknown to known to done. Uphill means unknowns remain. Downhill means only execution is left — [Glossary](https://basecamp.com/shapeup/4.5-appendix-06)
- [Author] The book tells teams to compare against current reality, not an ideal, and to cut scope to ship — [Decide When to Stop](https://basecamp.com/shapeup/3.5-chapter-14)
- [Author] A very small team can skip formal cycles, cool-down and the betting table — [Adjust to Your Size](https://basecamp.com/shapeup/4.1-appendix-02)
- [Author] On Lenny's Podcast (March 2025), Singer stresses fixing a time budget first and working back to a scope that fits — [podwise summary](https://podwise.ai/dashboard/episodes/3493903); [podcast summary](https://podcasts-distilled-hugo-content.pages.dev/lennys-podcast-product-career-growth/a-better-way-to-plan-build-and-ship-products-ryan-singer-creator-of-shape-up-early-employee-at/)
- [Practitioner] A GitHub project adapts Shape Up for AI-native teams. It splits Building into Spec, Plan and Implement. It adds a "Pitch → Technical Spec: Requirements + Constraints + Architecture Decisions" step. It runs separate workshops for shaping work for agents and for betting when agents move fast — [shape-up-ai-native](https://github.com/sergiolindolfoferreira/shape-up-ai-native)
- [Practitioner] A spec-coding guide puts Shape Up at the cycle level (pitch + appetite). The spec is the implementation agreement inside shaped work — [spec-coding.dev](https://spec-coding.dev/)
- [Practitioner] People package Shape Up as a Claude Code skill — [mcpmarket](https://mcpmarket.com/tools/skills/shape-up-product-strategy)

### Inferences
- Compared with agile: Shape Up keeps time-boxes and small teams. It drops backlogs, estimates and velocity. It adds appetite, shaping, pitches, betting, cool-down, hill charts and the circuit breaker.
- Appetite transfers best to AI work. Agents make "more" cheap, so a fixed time budget guards against scope creep.
- "No-gos" and "rabbit holes" are the same idea as the "non-goals" that SDD writers use against drift.
- The circuit breaker ("stop and re-shape, do not extend") suits a beginner stuck in a loop with an agent.
- "Uphill / downhill" is a simple status word a beginner can use.
- "Adjust to Your Size" supports dropping cycles and betting meetings for a solo builder.
- Shorter cycles with AI are a practitioner idea, not a tested result.

### Gaps
- I found no statement by Ryan Singer or 37signals on using Shape Up with AI agents.
- I found no data on whether AI shortens cycles in practice.

## 4. Anthropic's AI-native SDLC playbook and other vendor lifecycles (Google, Microsoft, GitLab, Atlassian): sprints, planning and gates

### Takeaway
Vendors agree on a loop: written intent, then spec, then plan, then agent build, then automatic checks, then human gates before production. Anthropic's playbook drops sprint cadence completely: events trigger each step. AWS shortens sprints into bolts. Atlassian keeps sprints and backlogs in Jira and adds agents as assignees. No vendor gives independent productivity evidence. Google's DORA research is the closest. It finds that AI amplifies existing practice, and that small batches matter more with AI.

### Cited Findings
- [Vendor] Anthropic's "The AI-native SDLC playbook" is by Louis Claxton, dated 21 August 2026. It opens with "Code is no longer the bottleneck". Planning, review/test and deploy still run at human speed — [claude.com](https://claude.com/blog/the-ai-native-sdlc-playbook) (read directly)
- [Vendor] Six stages. Plan: the originator writes intent.md with Claude, and the product owner reviews it. Design: Claude writes spec.md, shaped by skills; the product owner reviews but "doesn't write it". Build: start in plan mode and commit plan.md. Test: Claude checks its own work, and evals run in CI. Deploy: agentic PR review (REVIEW.md) and hooks as gates. Maintain: monitoring findings return as a new intent.md — [claude.com](https://claude.com/blog/the-ai-native-sdlc-playbook)
- [Vendor] The playbook never discusses sprints or agile ceremonies. "Backlog entries, user stories, story points, and refinement meetings" appear only in the "traditional" column. Events drive the work: "an approved spec.md triggers plan mode" — [claude.com](https://claude.com/blog/the-ai-native-sdlc-playbook)
- [Vendor] On gates: "Humans remain accountable for every decision that requires judgment." "Design review happens before any code is generated, when changing course is still a matter of editing a document." "Separation of duties is preserved, because the agent that wrote the code has no way to approve it." The agent "may act up to the production gate and cannot pass it." — [claude.com](https://claude.com/blog/the-ai-native-sdlc-playbook)
- [Vendor] On tests: for a bug fix, commit a failing test first, then block edits to test files. "Evals are the AI-native equivalent of stage-gate QA." Production incidents become permanent evals — [claude.com](https://claude.com/blog/the-ai-native-sdlc-playbook)
- [Vendor] CLAUDE.md should stay "under a page". When Claude makes the same mistake twice, the fix goes into CLAUDE.md. Autonomy depends on the environment: free in development, authorised in production — [claude.com](https://claude.com/blog/the-ai-native-sdlc-playbook)
- [Vendor] Suggested measures include time to a committed intent.md, the share of spec.md changes after plan.md (rework), first-pass CI success, review time per PR, change failure rate and DORA measures. The page gives no benchmark data — [claude.com](https://claude.com/blog/the-ai-native-sdlc-playbook)
- [Secondary] Coverage paraphrases it as humans "above the loop". The page itself ends with "The loop keeps running. Human judgement stays above it." — [DevOps.com](https://devops.com/from-the-horses-mouth-anthropic-says-ai-has-changed-the-sdlc); [claude.com](https://claude.com/blog/the-ai-native-sdlc-playbook)
- [Vendor] Atlassian makes Jira the control point to plan, assign and track work by humans and coding agents. It reports internal benchmarks: agents with Teamwork Graph context were 44% more accurate and used 48% fewer tokens — [IT Brief UK](https://itbrief.co.uk/story/atlassian-adds-jira-tools-for-ai-native-software-teams); [Atlassian blog](https://www.atlassian.com/blog/company-news/team26-europe-ai-sdlc); [Team '26 session](https://events.atlassian.com/teameurope/session/4361212/build-an-ai-native-sdlc-in-jira-how-atlassian-did-it-and-how-you-can-too)
- [Vendor] GitLab's Duo Agent Platform became generally available in January 2026 with GitLab 18.8, with seven agents at first. An earlier "Software Development Flow" lets several agents plan, implement and test changes end to end — [GitLab press release](https://s204.q4cdn.com/984476563/files/doc_news/GitLab-Announces-the-General-Availability-of-GitLab-Duo-Agent-Platform-2026.pdf); [GitLab 18.3 blog](https://about.gitlab.com/blog/gitlab-18-3-expanding-ai-orchestration-in-software-engineering/)
- [Vendor] Microsoft announced "Agentic DevOps" at Build 2025 (19–22 May): agents from planning to production. You assign an issue to the Copilot coding agent, and it works in a GitHub Actions environment. Microsoft says this moves Copilot "from a pair programmer to peer" — [Azure blog](https://azure.microsoft.com/en-us/blog/agentic-devops-evolving-software-development-with-github-copilot-and-microsoft-azure/); [Microsoft developer blog, 29 May 2025](https://developer.microsoft.com/blog/reimagining-every-phase-of-the-developer-lifecycle/)
- [Vendor] Microsoft's GH-600 exam lists skills such as: keep agent planning separate from execution, have agents output a structured plan, and "prevent agent action until the agent checked and approved". It adds: "configure human intervention for autonomous agents without slowing delivery" — [Microsoft Learn GH-600](https://learn.microsoft.com/credentials/certifications/resources/study-guides/gh-600)
- [Vendor] Microsoft's agent guidance: "Require human approval for actions that are hard to reverse or that affect people, money, or compliance." Give reviewers enough context so review "adds judgment without becoming a bottleneck" — [Microsoft Learn](https://learn.microsoft.com/agents/center-of-excellence/responsible-ai)
- [Vendor] Google Antigravity (November 2025) has a planning mode. It produces a task list and an implementation plan as reviewable "artifacts" before execution. A review setting, "Asks for Review", makes the agent wait for approval of the plan. Users can comment on artifacts — [Google Cloud demo](https://googlecloudplatform.github.io/cloud-solutions/build-with-gemini-demo/agentic-development-with-antigravity); [OpenReplay guide](https://blog.openreplay.com/google-antigravity-ide-guide/); [Gigazine](https://www.gigazine.net/gsc_news/en/20251119-google-antigravity)
- [Research, Google-funded] DORA's 2025 report calls AI an amplifier of both strengths and dysfunctions. Its AI Capabilities Model lists working in small batches among seven capabilities — [Google Cloud blog](https://cloud.google.com/blog/products/ai-machine-learning/introducing-doras-inaugural-ai-capabilities-model); [DORA 2025 report](https://research.google/pubs/dora-2025-state-of-ai-assisted-software-development-report/)
- [Research summary] Code review becomes the main bottleneck. More code without better review slows throughput — [DX newsletter on DORA 2025](https://newsletter.getdx.com/p/doras-2025-research-on-the-impact)

### Inferences
- This starter kit's CLAUDE.md follows the Anthropic playbook closely: intent → spec → plan, CLAUDE.md, REVIEW.md, the same-mistake-twice rule, incidents becoming tests, and owner-only gates.
- Vendor positions follow their products. Atlassian sells sprint and backlog tools and keeps them. Anthropic sells an agent and drops cadence. AWS adds team rituals for enterprise customers.
- The shared gate design has two strong points: review the design before code, and the agent cannot pass the production gate. Microsoft and AWS both note that gates must not stall delivery.

### Gaps
- The Anthropic playbook is a 40-minute read. I used a tool extraction, not a full verbatim read.
- I found no Google document named "AI-native SDLC". Antigravity and DORA stand in.
- Microsoft's view is spread across marketing blogs and Learn pages. I found no single Microsoft lifecycle document for building software with agents.
- No vendor explains sprint length except AWS (bolts).

## 5. What Agile Manifesto authors and leading agile voices say about AI; the "agile is dead" debate (2024–2026)

### Takeaway
No manifesto author I found declares agile dead. Most say AI changes the practices and moves the rigour into tests, verification and specs. They say the values (people, feedback, small steps) still hold. Fowler says a new manifesto is "way too early". Kern is enthusiastic, Jeffries objects to LLMs, and Sutherland recasts Scrum for AI agents. "Agile is dead" claims come mostly from consultants and bloggers. They usually target Scrum ceremonies, not agile values.

### Cited Findings
- [Author] Kent Beck separates "augmented coding" from vibe coding: "In vibe coding you don't care about the code, just the behaviour of the system." In augmented coding you care about the code, its complexity, the tests and their coverage — [kentbeck.com summary](https://kentbeck.com/summaries/augmented-coding-beyond-the-vibes/); [Tidy First](https://tidyfirst.substack.com/p/augmented-coding-beyond-the-vibes)
- [Author] Beck calls the AI a "genie". He warns "Don't eat the seed corn … My coding genie unfortunately doesn't know this farming wisdom" — [kentbeck.com](https://kentbeck.com/)
- [Author] Beck sketches a flow: "Spike with vibe coding => learn and throw away => write design doc … => TDD => Tidy when necessary" — [newsletter comments](https://newsletter.kentbeck.com/p/augmented-coding-beyond-the-vibes/comments)
- [Author] Beck has had trouble stopping AI agents from deleting tests to make them "pass" — [Pragmatic Engineer podcast](https://newsletter.pragmaticengineer.com/p/tdd-ai-agents-and-coding-with-kent)
- [Secondary] In a 2025 talk with Fowler, Beck reportedly called AI an "imagination amplifier" that is "re-soloing programming". This wording is unverified — [besthub summary](https://www.besthub.dev/articles/is-the-agile-manifesto-dead-in-the-ai-era-insights-from-martin-fowler-and-kent-beck-216b749b6e9a)
- [Author] Martin Fowler compares LLMs to the move from assembler to high-level languages. But LLMs are "not just raising the level of abstraction, but also forcing us to consider what it means to program with non-deterministic tools" — [martinfowler.com](https://martinfowler.com/articles/2025-nature-abstraction.html)
- [Author] Fowler (August 2025) says LLMs readily claim "all tests green" when that is false. He advises asking several times to see variation — [martinfowler.com](https://martinfowler.com/articles/202508-ai-thoughts.html)
- [Author] A 2026 Fowler note raises "cognitive debt" when teams hand work to LLMs (attribution via search summary) — [Fragments, 9 February 2026](https://martinfowler.com/fragments/2026-02-09.html)
- [Author/Report] For the manifesto's 25th anniversary, Fowler and Thoughtworks hosted a "Future of Software Development" retreat in Deer Valley, Utah, in February 2026. The report says rigour "does not disappear, it moves elsewhere". It says TDD gives dramatically better results from AI agents. Asked about a new manifesto, Fowler said it is "way too early". Themes included "Where does the rigor go?" and "The middle loop: a new category of work" — [The Register, 20 February 2026](https://www.theregister.com/2026/02/20/from_agile_to_ai_anniversary/); [Fowler bliki](https://martinfowler.com/bliki/FutureOfSoftwareDevelopment.html); [Fragments, 18 February 2026](https://martinfowler.com/fragments/2026-02-18.html)
- [Author] Jon Kern (signatory) is "smitten" with vibe coding and uses Replit. "This is something that will exaggerate either your abilities, or possibly, if you're not so good at it, it might exaggerate that." He cites an insurer that dropped its coders and got wrong output. He thinks "individuals and interactions" will endure — [The Register, 19 February 2026](https://www.theregister.com/software/2026/02/19/agile-manifesto-co-author-smitten-with-vibe-coding/4904040)
- [Author] Jim Highsmith (July 2025) says AI "isn't just a tool, but a new context for agility". He says capability may matter more than knowledge, and describes a new "choreographer" role — [Scrum.org](https://www.scrum.org/resources/blog/jim-highsmith-future-agile). At Agile2025 he spoke about managing "both people and bots" — [PMI podcast](https://www.pmi.org/ai-today-podcast/jim-highsmith-on-reimagining-agility-in-an-ai-world). He argues AI upskilling must keep human judgment — [PMI blog](https://www.pmi.org/blog/adaptive-capacity-ai-decision-making)
- [Author] Alistair Cockburn's "Heart of Agile" is four verbs: Collaborate, Deliver, Reflect, Improve. His AI session asks: if you can prototype in minutes and deploy in an hour, "what's the point of the ScrumMaster and the daily stand-up meeting?" — [iSAQB session](https://conferences.isaqb.org/software-architecture-gathering/session/the-heart-of-agile-now-with-ai/)
- [Author] Cockburn calls AI a "fast typist: powerful, useful… and still error-prone". It does not solve humans working together — [LeSS keynote](https://less.works/videos/keynote-it-s-still-about-the-people-even-with-ai); [GOTO 2025 masterclass](https://gotocph.com/2025/masterclasses/499)
- [Author] Dave Thomas wrote "AI Coding Is Based on a Faulty Premise" (January 2025) — [discussion of the post](https://jsr6720.github.io/duly-noted-jsrowe/dave-agile-manifesto-on-ai-coding). A slide deck quotes him: "The agent should move at the speed of the verification, not the speed of the typing" — [Speaker Deck](https://speakerdeck.com/snoozer05/lets-change-our-world-again). In 2014 he already argued for "agility over agile" — [InfoQ 2014](https://www.infoq.com/news/2014/10/pragmatic-dave-agility/)
- [Author] Ron Jeffries (31 March 2025) says he has "strong objections to the so-called 'AI' LLM systems" — [ronjeffries.com](https://www.ronjeffries.com/categories/llm-ai/)
- [Author, promotional] Jeff Sutherland's 2025 book "First Principles in Scrum: OpenClaw Scrum and Scrum@Scale" promises "hyperproductive AI agent teams". He runs six AI agents plus a human Scrum Master in daily sprints. His LinkedIn says "SCRUM IS AN AI PROTOCOL" — [Leanpub](https://leanpub.com/firstprinciplesinscrumscrumandscrumscaleforopenclaw); [Leanpub launch](https://leanpub.com/blog/leanpub-book-launch-first-principles-in-scrum-openclaw-scrum-and-scrum-scale-create-trust-at-machine-speed-by-jeff-sutherland/); [LinkedIn](https://linkedin.com/in/jeffsutherland)
- [Debate] Steve Jones (Capgemini) says AI has ended the manifesto's relevance. Speed breaks agile's cadence, and AI makes software that "looks like it works", so docs and architecture matter more. Replies: Sonya Siderova says agile "is optimizing a constraint that moved". Forrester reports 95% still find agile relevant — [InfoQ, 17 February 2026](https://www.infoq.com/news/2026/02/ai-agile-manifesto-debate/)
- [Practitioner] Blog posts declare "AI killed Scrum" — [Defragzone](https://defragzone.substack.com/p/ai-killed-scrum); [Scrum is dead](https://shildebrandt.substack.com/p/scrum-is-dead). Others say agile matters more, because the bottleneck moves to deciding what to build and judging output — [Full Scale](https://fullscale.io/blog/is-agile-dead/)
- [2024 context] Kern criticised a 2024 report on agile failure rates and attacked the "Agile Industrial Complex" — [The Register forum, July 2024](https://forums.theregister.com/forum/all/2024/07/16/jon_kern/); [The Register, July 2024](https://www.theregister.com/2024/07/16/jon_kern/)

### Inferences
- XP practices (TDD, small steps, tidying or refactoring, design notes) get the most support from signatories for AI work. Scrum ceremonies (stand-ups, Scrum Master, sprint planning) get the most questions.
- Signatories agree that verification is the new constraint (Thomas, Fowler, Beck, Register report).
- For a beginner kit: keep the values and the XP-style tests-first habit, and drop the ceremonies.

### Gaps
- I found no AI-specific statement by Allen Holub.
- I found no coding-specific AI view from Ron Jeffries beyond his general objection.
- Highsmith interview transcripts and the Beck/Fowler conversation were not available.
- I did not read the XP2025 workshop paper ([arXiv 2506.20159](https://arxiv.org/pdf/2506.20159)) or the full Deer Valley report PDF.
- A secondary summary cites a Wharton paper: people approved flawed AI code as correct 80% of the time. I could not verify it.

## 6. Where the frameworks agree and conflict, and what each keeps, drops and adds compared with Scrum, Kanban, XP and Lean

### Takeaway
They agree on short loops and small batches, written intent before code, human gates, tests as proof, and context stored in the repo. They conflict on how much to specify upfront, on cadence (sprints, six-week cycles, bolts, or none), on team rituals versus solo work, on backlogs, and on how many gates to use. Independent evidence is thin. One randomised study found experienced developers 19% slower with early-2025 AI tools.

### Cited Findings
- [Research] METR's randomised trial (February–June 2025): 16 experienced open-source developers did 246 real tasks. With AI allowed, tasks took 19% longer. Developers expected a 24% speed-up and afterwards believed they had been 20% faster. METR says other settings may differ, such as smaller projects or less experienced developers — [Simon Willison](https://simonwillison.net/2025/Jul/12/ai-open-source-productivity/); [eWeek](https://eweek.com/news/news-ai-tools-slow-developer-productivity-study)
- [Research] DORA's data has long shown that smaller batches lead to better delivery. DORA 2025 treats small batches as a key AI capability — [DX newsletter](https://newsletter.getdx.com/p/doras-2025-research-on-the-impact); [Google Cloud blog](https://cloud.google.com/blog/products/ai-machine-learning/introducing-doras-inaugural-ai-capabilities-model)
- [Practitioner] Kanban writers say WIP (work in progress) limits matter more with AI, because review becomes the constraint. "WIP limits don't solve the bottleneck – they expose it." They suggest a limit on work waiting for review — [Kanban Zone, 2026](https://kanbanzone.com/2026/ai-flow-and-the-limits-of-human-judgment/); [Scrum with Kanban post](https://yeret-agility-site.pages.dev/blog/limiting-work-in-progress-wip-in-scrum-with-kanban-what-when-who-how/); [dev.to review bottleneck](https://dev.to/code-board/the-review-bottleneck-why-faster-code-generation-broke-your-pr-process-31gi)
- [Practitioner] A talk treats AI agents as pull-based pipeline stages with WIP limits, escalating to humans only when needed — [GitNation](https://gitnation.com/contents/the-factory-model-for-ai-agents-wip-limits-flow-and-10x-throughput)
- Agreement, short loops: bolts of hours or days ([AWS](https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle/)); a loop driven by events ([Anthropic](https://claude.com/blog/the-ai-native-sdlc-playbook)); a fixed time budget ([Shape Up](https://basecamp.com/shapeup/4.5-appendix-06)); "speed of the verification" ([Thomas](https://speakerdeck.com/snoozer05/lets-change-our-world-again))
- Agreement, written intent first: intent.md and spec.md ([Anthropic](https://claude.com/blog/the-ai-native-sdlc-playbook)); requirements.md ([Kiro](https://kiro.dev/docs/specs/concepts)); the pitch ([Shape Up](https://basecamp.com/shapeup/1.5-chapter-06)); a design doc so "humans and genies" share context ([Beck](https://newsletter.kentbeck.com/p/augmented-coding-beyond-the-vibes/comments))
- Agreement, human gates: production gate ([Anthropic](https://claude.com/blog/the-ai-native-sdlc-playbook)); every stage ([AWS](https://aws.amazon.com/blogs/devops/open-sourcing-adaptive-workflows-for-ai-driven-development-life-cycle-ai-dlc/)); plan review ([Antigravity](https://googlecloudplatform.github.io/cloud-solutions/build-with-gemini-demo/agentic-development-with-antigravity)); approval for hard-to-reverse actions ([Microsoft](https://learn.microsoft.com/agents/center-of-excellence/responsible-ai))
- Agreement, tests as proof: failing test first ([Anthropic](https://claude.com/blog/the-ai-native-sdlc-playbook)); TDD gives better agent results ([The Register](https://www.theregister.com/2026/02/20/from_agile_to_ai_anniversary/)); false "all tests green" claims ([Fowler](https://martinfowler.com/articles/202508-ai-thoughts.html)); agents deleting tests ([Beck](https://newsletter.pragmaticengineer.com/p/tdd-ai-agents-and-coding-with-kent))
- Conflict, upfront depth: Spec Kit and Tessl favour full specs. Böckeler finds them overkill for small problems ([martinfowler.com](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html)). Beck spikes and throws away before the design doc. Shape Up wants work "rough" and not too concrete ([Shape Up](https://basecamp.com/shapeup/1.1-chapter-02)).
- Conflict, rituals: AI-DLC uses whole-team "mob" sessions ([AWS](https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle/)). Anthropic says "One engineer can drive several streams of work at once" ([claude.com](https://claude.com/blog/the-ai-native-sdlc-playbook)). Sutherland keeps daily sprints with agents ([Leanpub](https://leanpub.com/firstprinciplesinscrumscrumandscrumscaleforopenclaw)).
- Conflict, backlog: Shape Up has none ([Chapter 7](https://basecamp.com/shapeup/2.1-chapter-07)). Atlassian keeps Jira as the control point ([IT Brief](https://itbrief.co.uk/story/atlassian-adds-jira-tools-for-ai-native-software-teams)).
- Conflict, gate density: AWS gates every stage, yet its own users ask for fewer approvals on small work ([Issue #1643](https://github.com/awslabs/aidlc-workflows/issues/1643)).

### Inferences
Keeps / drops / adds compared with agile (my synthesis of the findings above):

| Framework | Keeps from agile | Drops | Adds |
|---|---|---|---|
| AWS AI-DLC | Iteration, whole-team work (like XP mob work and Scrum refinement), ops feedback | Sprints (now bolts), epics (now units) | AI questions and plans, a gate per stage, repo files, three phases |
| SDD (Spec Kit, Kiro, Tessl) | User stories, acceptance criteria, task lists, tests | The light "working software over documents" balance | Constitution, EARS requirements, design file, spec-as-source |
| Shape Up | Time-boxes, small teams, shipping at cycle end | Backlog, estimates, velocity | Appetite, pitch, betting, cool-down, hill charts, circuit breaker |
| Anthropic playbook | CI, tests first (XP), learning from failures (like retros) | Sprints, backlog, story points, refinement meetings | intent/spec/plan files, CLAUDE.md, hooks as gates, evals, agentic review |
| Kanban / Lean (baseline) | Flow, WIP limits, small batches: these gain weight with AI | — | WIP limit on work waiting for review |

Ideas that suit a light starter kit for first-time builders:
1. Keep one short intent per change. Add an appetite (time budget) and non-goals ("no-gos"). Sources: Shape Up, spec drift fixes.
2. Write acceptance criteria as "When …, the page shall …". Turn each one into a test first. Sources: Kiro/EARS, Beck, Anthropic, DORA.
3. Keep work small: one intent, one branch, one PR. Do not start a new intent while a PR waits for review (WIP limit of one). Sources: DORA, Kanban.
4. Match the ceremony to the size. Give tiny bug fixes a light path: failing test, then fix, with no spec. Sources: Böckeler, Kiro bugfix.md, AWS Issue #1643, Shape Up "Adjust to Your Size".
5. Put gates where they matter: design review before code, and a merge or production gate the agent cannot pass. Each gate should show evidence, such as test output, not just ask "OK?". Sources: Anthropic, Microsoft, Fowler, Beck.
6. Keep specs living, not frozen and not the source of truth. Update the spec when the plan changes, and count such changes as rework. Sources: Böckeler levels, Anthropic metric, AWS Issue #40.
7. Use a circuit breaker. If work passes its appetite, stop and re-shape it; do not keep going. Source: Shape Up.
8. Allow a throw-away "spike" to learn what you want before writing the spec. Source: Beck.
9. Drop sprints, story points, velocity, stand-ups, mob rituals and a backlog the agent works through. Keep a simple idea list.
10. Keep the learning loop: incidents become tests, and a repeated mistake goes into CLAUDE.md. This matches Cockburn's Reflect and Improve. Source: Anthropic.
11. Avoid heavy tooling for beginners: Spec Kit's many files, AI-DLC's 33 stages, and Tessl's spec-as-source.

### Gaps
- I found no controlled study comparing these frameworks with each other or with Scrum.
- The METR result covers early-2025 tools and experienced developers. It may not apply to first-time builders.
- Most Kanban and WIP evidence for AI work is opinion, not measured research.
- Kanban and Lean baseline definitions in the table come from general knowledge, not from sources gathered here.
