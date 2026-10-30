# Kanban, Lean and flow-based delivery in AI-native software development

Research notes for the report writer, 30 October 2026. Sources run from 2024 to 2026 unless marked. "Vendor" marks data from a company that sells engineering-metrics or AI tools. Treat vendor data as company telemetry, not neutral research.

How I got the facts:
- This session could open only Google Cloud blog pages (cloud.google.com). I read four of them in full.
- These sites failed to open (blocked by the session's network policy): faros.ai, linearb.io, yuvalyeret.com, jawnb.github.io.
- The proxy log also shows blocks on dora.dev, services.google.com (the DORA PDFs), arxiv.org, export.arxiv.org, www.alphaxiv.org, martinfowler.com, infoq.com, thoughtworks.com, getdx.com, metr.org, atlassian.com, augmentcode.com, medium.com, dev.to and stackoverflow.blog.
- For blocked sites, the numbers below come from search-engine summaries that quote those pages. I mark these links "(not opened)". Check them against the original before a final report quotes them.
- Where summaries disagree, I say so and give both versions.

Words used below:
- WIP (work in progress): work that has started but is not finished.
- Cycle time: how long one item takes from start to finish.
- Throughput: how many items finish per day or week. It is a count, not a size.
- Work item age: how long an unfinished item has been in progress so far.
- PR (pull request): a proposed code change. It waits for review, then gets merged.
- Pickup time: how long a PR waits before someone starts to review it.
- Agentic PR: a PR written mostly by an autonomous coding agent.
- Little's Law: average cycle time = average WIP ÷ average throughput.
- Utilization: the share of time a stage, such as review, is busy.
- Batch size: how much change goes into one PR or one release.

## 1. Where does the bottleneck move when AI writes code?

### Takeaway
The constraint moves away from writing code. Downstream, it moves to review, verification and stability. Upstream, it moves to deciding what to build and writing clear specs. Vendor telemetry shows more and larger PRs that wait longer for review. DORA 2025 links AI to higher throughput but still to lower stability.

### Cited Findings

DORA (Google's DevOps Research and Assessment program; survey research):
- DORA 2025, "State of AI-assisted Software Development", was published 23 September 2025. It drew on survey responses from nearly 5,000 technology professionals and over 100 hours of qualitative data. 90% of respondents use AI at work. More than 80% believe it raised their productivity. — [Google Cloud blog, 2025 DORA report](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report)
- DORA 2025: "Unlike last year, we observe a positive relationship between AI adoption on both software delivery throughput and product performance." — [Google Cloud blog, 2025 DORA report](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report)
- DORA 2025: "AI adoption does continue to have a negative relationship with software delivery stability." — [Google Cloud blog, 2025 DORA report](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report)
- DORA 2025 on the cause: "AI accelerates software development, but that acceleration can expose weaknesses downstream." Without "robust control systems, like strong automated testing, mature version control practices, and fast feedback loops, an increase in change volume leads to instability." — [Google Cloud blog, 2025 DORA report](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report)
- DORA 2025 framing: "AI doesn't fix a team; it amplifies what's already there." — [Google Cloud blog, 2025 DORA report](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report)
- DORA 2024 (published 22 October 2024, Nathen Harvey and Derek DeBellis): "As AI adoption increased, it was accompanied by an estimated decrease in delivery throughput by 1.5%, and an estimated reduction in delivery stability by 7.2%." — [Google Cloud blog, 2024 DORA report](https://cloud.google.com/blog/products/devops-sre/announcing-the-2024-dora-report)
- The 2024 Google page does not say what size of adoption increase these two figures belong to. Secondary write-ups tie them to a 25% increase in AI adoption. — [Google Cloud blog, 2024 DORA report](https://cloud.google.com/blog/products/devops-sre/announcing-the-2024-dora-report); [DX summary by Laura Tacho (not opened)](https://getdx.com/blog/2024-dora-report-summary-laura-tacho/)
- DORA 2024 explanation: "improving the development process does not automatically improve software delivery — at least not without proper adherence to the basics of successful software delivery, like small batch sizes and robust testing mechanisms." — [Google Cloud blog, 2024 DORA report](https://cloud.google.com/blog/products/devops-sre/announcing-the-2024-dora-report)
- DORA 2024 local gains: "A 25% increase in AI adoption is associated with" 7.5% better documentation quality, 3.4% better code quality and 3.1% faster code review. — [Google Cloud blog, 2024 DORA report](https://cloud.google.com/blog/products/devops-sre/announcing-the-2024-dora-report)
- Trust: 39% reported little or no trust in AI-generated code in 2024. In 2025 it was 30%. — [Google Cloud blog, 2024](https://cloud.google.com/blog/products/devops-sre/announcing-the-2024-dora-report); [Google Cloud blog, 2025](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report)
- DORA says a quality internal platform "prevents individual productivity gains from being lost to downstream bottlenecks." — [Google Cloud blog, Harvey and Park, 10 December 2025](https://cloud.google.com/blog/products/ai-machine-learning/from-adoption-to-impact-putting-the-dora-ai-capabilities-model-to-work?hl=en)
- DORA on direction: "Speed is irrelevant if you are moving in the wrong direction." And: "Adopting AI tools can actually harm teams that lack a user-centric focus." — [Google Cloud blog, Harvey and Park, 10 December 2025](https://cloud.google.com/blog/products/ai-machine-learning/from-adoption-to-impact-putting-the-dora-ai-capabilities-model-to-work?hl=en)

Vendor telemetry:
- Faros AI 2025, "The AI Productivity Paradox" (vendor). Telemetry from about 10,000 developers in 1,255 teams. With high AI adoption, developers completed about 21% more tasks and merged about 98% more PRs. — [Faros AI research hub (not opened)](https://faros.ai/research); secondary: [DEV, "The review bottleneck" (not opened)](https://dev.to/code-board/the-review-bottleneck-why-faster-code-generation-isnt-faster-delivery-2of)
- Faros AI 2025, same report: PR review time rose about 91%. Average PR size rose about 154%. Bugs per developer rose about 9%. Company-level delivery, including DORA metrics, showed no measurable gain. — [Faros AI research hub (not opened)](https://faros.ai/research)
- Faros AI 2026, "AI Engineering Report: The Acceleration Whiplash" (vendor). Two years of telemetry from about 22,000 developers in more than 4,000 teams. Faros says it uses system data, not self-reported surveys. — [Faros report PDF (not opened)](https://pages.faros.ai/hubfs/AI_Engineering_Report_2026_The_Acceleration_Whiplash_Faros.pdf); [ADTmag, 22 April 2026](https://adtmag.com/articles/2026/04/22/more-code-more-bugs.aspx)
- Faros 2026, as reported in write-ups: task completion per developer +34%. Epics completed per developer +66%. Median wait for a first code review +156.6%. Average time a task spends in progress +225.2%. — [Faros blog, "AI is making engineers faster. So why is delivery slower?" (not opened)](https://www.faros.ai/blog/ai-engineers-faster-delivery-slower); [Jim Nielsen, "Ten takeaways", 12 June 2026](https://notes.jim-nielsen.com/n/2026-06-12-1119/)
- Faros 2026, same write-ups: 31.3% more PRs merged with no human review after AI adoption. Bugs per developer +54% (one source says 55%). Production incidents per PR roughly tripled (+242.7%; one source says 245%). The pattern held at both high- and low-performing organizations. — [Faros blog, AI code review burden (not opened)](https://www.faros.ai/blog/ai-code-quality-senior-engineer-review-burden); [Matthew Aberham](https://www.matthewaberham.com/blog/faros-acceleration-whiplash); [Vibe Graveyard](https://vibegraveyard.ai/story/faros-ai-acceleration-whiplash-study/)
- Conflict: other write-ups give different Faros 2026 numbers. One gives PR size +51%, bugs per PR +28% and median review time 5x (+441%). Another gives PR merge time −20% and incidents +23.5%. I could not open the PDF to settle this. — search results including [makmel blog](https://makmel.pages.dev/blog/2026-04-30-ai-productivity-paradox) and [Alex Cloudstar](https://alexcloudstar.com/blog/ai-productivity-paradox-developers-2026/)
- LinearB 2026 Software Engineering Benchmarks Report (vendor). About 8.1 million PRs from about 4,800 teams (sources say 4,800 or 4,813). PRs that LinearB labels as AI merged within 30 days 32.7% of the time. Unassisted PRs merged 84.4% of the time. — [LinearB report PDF (not opened)](https://assets.linearb.io/image/upload/v1765300694/resources/LinearB_2026_Software_Engineering_Benchmarks_Report.pdf); [LinearB blog (not opened)](https://linearb.io/blog/engineering-benchmarks-report)
- LinearB 2026: agentic AI PRs waited 5.3x longer for pickup: 1,055 minutes versus 201 for unassisted PRs. A secondary blog gives 4.6x as the average across all AI PRs. — [LinearB report PDF (not opened)](https://assets.linearb.io/image/upload/v1765300694/resources/LinearB_2026_Software_Engineering_Benchmarks_Report.pdf); [baeseokjae summary](https://baeseokjae.github.io/posts/linearb-2026-engineering-benchmarks/)
- LinearB 2026, one source: once review started, AI-assisted PRs cleared review in 3.2 hours versus 4.2 hours for unassisted PRs. — [baeseokjae summary](https://baeseokjae.github.io/posts/linearb-2026-engineering-benchmarks/)
- LinearB's pickup-time tiers: elite under 1 hour; good 1–4 hours; fair 5–16 hours; needs focus over 16 hours. — [LinearB report PDF (not opened)](https://assets.linearb.io/image/upload/v1765300694/resources/LinearB_2026_Software_Engineering_Benchmarks_Report.pdf)
- Jellyfish, June 2025 (vendor). 259 companies, 21,209 engineers, 2,160,981 merged PRs from Copilot users, June 2024 to mid-June 2025. AI use rose 260% year on year. "High-AI" tasks (AI used three or more times a week) had average PR cycle times 16% faster in Q2 2025. — [Jellyfish blog, June 2025](https://jellyfish.co/blog/ai-impact-data-june-2025/)
- Jellyfish also reported average PR cycle time falling from 95.5 to 83.8 hours. It said 8.6 hours were saved in coding and 5.1 in review. Those parts (13.7 hours) exceed the total drop (11.7 hours), so check the original. — [Jellyfish blog, June 2025](https://jellyfish.co/blog/ai-impact-data-june-2025/)
- Jellyfish benchmark, later (vendor): moving from 0% to 100% AI adoption correlates with about 2x PRs merged per engineer per week. Median cycle time (first commit to merge) falls about 24%. Jellyfish says this came without a quality cost; I could not check that. — [Jellyfish newsroom](https://jellyfish.co/newsroom/jellyfish-reveals-ais-real-impact-on-engineering-teams/)
- A Jellyfish–OpenAI analysis (vendor): PRs per engineer rose from 1.36 to 2.90 on average (+113%). — [Jellyfish and OpenAI](https://jellyfish.co/blog/jellyfish-openai-team-up-to-measure-impact-of-ai-coding-tools/)
- Atlassian State of Developer Experience 2025 (vendor survey; 3,500 developers and managers in six countries). 99% report time savings from AI. 68% save more than 10 hours a week. — [Atlassian blog (not opened)](https://www.atlassian.com/blog/developer/developer-experience-report-2025)
- Same Atlassian survey: 50% lose 10 or more hours a week, and 90% lose 6 or more hours, mostly to organizational inefficiencies. 63% say leaders don't understand their pain points, up from 44% the year before. — [Atlassian blog (not opened)](https://www.atlassian.com/blog/developer/developer-experience-report-2025)
- A secondary analysis says Atlassian's 2026 edition shows only about a quarter saving 10+ hours a week. Only 28% report noticeably less friction than before AI. Unverified. — [i-scoop](https://www.i-scoop.eu/ai-developer-productivity/)

Independent and academic research:
- He et al. (Carnegie Mellon and co-authors), arXiv 2511.04427, November 2025. Version 3 (January 2026) is titled "Speed at the Cost of Quality". It uses difference-in-differences: it compares GitHub projects that adopted Cursor with matched projects that did not, before and after. — [arXiv 2511.04427 (not opened)](https://arxiv.org/abs/2511.04427v2)
- Same study: lines added rose 3–5x in the first month after adoption. The gain faded after about two months. — [arXiv 2511.04427 (not opened)](https://arxiv.org/abs/2511.04427v2)
- Same study: static-analysis warnings rose about 30% and code complexity about 41%, and the rise persisted. The authors' models suggest this debt later lowers velocity. — [arXiv 2511.04427 (not opened)](https://arxiv.org/abs/2511.04427v2)
- METR, February 2026 follow-up (57 developers, 143 repositories, more than 800 tasks). Estimated speedup: 18% for returning developers (confidence interval from 38% faster to 9% slower), 4% for new ones. METR calls this "only very weak evidence". — [METR post, reposted on Conffab](https://conffab.com/?p=10163); [Feedbagel summary](https://feedbagel.com/post/metr-adjusts-developer-productivity-experiment-design-due-to-unreliable-ai-impac)
- METR's follow-up had selection bias: more developers declined to take part because they did not want to work without AI. — [Feedbagel summary](https://feedbagel.com/post/metr-adjusts-developer-productivity-experiment-design-due-to-unreliable-ai-impac)
- METR's original 2025 trial: experienced open-source developers took 19% longer with AI. Afterward they believed AI had sped them up by about 20%. METR now labels those results historical. — [Feedbagel summary](https://feedbagel.com/post/metr-adjusts-developer-productivity-experiment-design-due-to-unreliable-ai-impac)
- AIDev dataset (Li et al., arXiv 2507.15003, July 2025): 456,535 agent-written PRs in about 61,000 repositories. Agents: Codex, Devin, Copilot, Cursor and Claude Code. Acceptance rates: Codex 64%, Devin 49%, Copilot 35%. Human PRs: 76.8%. — [alphaXiv 2507.15003 (not opened)](https://www.alphaxiv.org/abs/2507.15003v1); [Emergent Mind summary](https://emergentmind.com/topics/aidev-dataset)
- AIDev: accepted Codex PRs had a median review time of 0.3 hours versus 3.9 for human PRs. — [Emergent Mind summary](https://emergentmind.com/topics/aidev-dataset)
- Conflict: a later AIDev study on popular repositories reports different acceptance rates (Codex 0.83, Copilot 0.45). Different subsets and time windows likely explain this. — [arXiv 2602.02345 (not opened)](https://arxiv.org/abs/2602.02345v1)
- AIDev caveat: teams often accept PRs outside visible review channels. So comment-based measures understate the real review effort. — [Emergent Mind summary](https://emergentmind.com/topics/aidev-dataset)
- Case study, arXiv 2605.18461 (May 2026; a large Brazilian financial institution). One staff engineer with four AI agents, using spec-driven development, delivered a brownfield project scoped for a four-person squad. It took half the planned time. 90% of AI-generated code was accepted on first review. — [arXiv 2605.18461 (not opened)](https://arxiv.org/pdf/2605.18461.pdf)
- The authors conclude that "specification quality and institutional knowledge, not model capability" were the binding constraints. A commentary says the speedup came from removing waiting and handoffs, not from faster coding. — [arXiv 2605.18461 (not opened)](https://arxiv.org/pdf/2605.18461.pdf); [lilting.ch commentary](https://lilting.ch/en/articles/one-developer-ai-augmented-squad-brownfield-enterprise)

Kanban practitioners:
- Dan Vacanti and Prateek Singh discussed "AI and Flow" in episode 118 of their Drunk Agile podcast. The promotion text reads: "Everyone is asking whether AI makes developers faster. Nobody is asking what happens to the queue after them. Faster input into an unchanged system is not more flow." — [Drunk Agile on Apple Podcasts](https://podcasts.apple.com/ie/podcast/drunk-agile/id1550106773) (quote from a LinkedIn promotion seen in search; no transcript found)

### Inferences
- All datasets agree that output per developer rises. They disagree on time per PR. Faros and LinearB show longer review waits; Jellyfish shows shorter cycle times. Likely causes: different stage definitions, different customer bases, and tools that change fast. The writer should not merge these into one number.
- By LinearB's own tiers, agentic PR pickup (1,055 minutes, about 17.6 hours) lands in "needs focus" (over 16 hours). Unassisted PRs (201 minutes, about 3.4 hours) land in "good" (1–4 hours).
- The constraint moved in two directions. Downstream: review, testing and stability (Faros, LinearB, DORA). Upstream: clear specs and user focus (the one-person case; DORA's user-centric finding).
- Theory of Constraints logic fits the data: speeding up one stage does not raise system output if the slowest stage stays the same. Faros 2025 (no company-level gain) and Atlassian (save 10 hours, lose 10 hours) both show this pattern.
- The 31.3% rise in unreviewed merges (Faros 2026, secondary) suggests some teams relieve the review queue by skipping review. The rise in incidents per PR fits that story, but the data are correlations.
- Trust in AI code rose a little (39% to 30% low trust), while stability stayed negative. Trust and stability may be moving apart; this needs care.

### Gaps
- I could not open Faros, LinearB, Atlassian, METR, arXiv or the DORA PDFs. All their numbers come from search summaries.
- I found no measured data that isolates testing or CI (continuous integration) as the new constraint. One headline, "CI throughput up, main branch success falling" (hyrax.dev, 5 August 2026), was seen but not read.
- I found no measured data on time spent deciding what to build (product discovery) with AI.
- DORA 2024's sample size, and the number of repositories in the Cursor study, were not in the material I could read.
- GitClear and Swarmia publish no PR cycle-time numbers that I could find.
- METR's 2025 sample size was not in the summaries I saw, so I left it out.

## 2. WIP limits with agents: agent fleets versus limiting work in progress

### Takeaway
People who run many agents report that review and attention, not agent count, cap useful parallel work. They put the limit at roughly 3–6 agents per person, but this is anecdote. Kanban-minded writers argue WIP limits matter more with agents and should sit on human stages such as spec and review. The main Kanban authorities have published little on AI.

### Cited Findings

Practitioner reports on parallel agents:
- Simon Willison, "Embracing the parallel coding agent lifestyle" (5 October 2025). AI-written code must be reviewed, so his review speed sets the pace. He keeps parallel agents on research, proofs of concept and low-stakes maintenance. Summaries quote him focusing on "reviewing and landing one significant change at a time". — [Simon Willison's weblog](https://simonwillison.net/2025/Oct/5/parallel-coding-agents/)
- Willison later said, on Lenny's Podcast, that running several agents leaves him mentally exhausted by mid-morning. One outlet says he regularly runs four agents in parallel. This is reported secondhand (2026). — [Let's Data Science](https://letsdatascience.com/news/software-engineers-feel-exhausted-by-ai-agents-19115894); [Startup Fortune, 14 July 2026](https://startupfortune.com/ai-coding-agents-make-engineers-faster-and-more-exhausted/)
- Git worktree guides report a practical ceiling. (A worktree is a second working copy of the repository, so each agent edits its own folder and branch.) Writers give 3–4, 3–5 or 5–6 agents per reviewer. Review bandwidth is the stated limit. — [Nx blog](https://nx.dev/blog/git-worktrees-ai-agents); [Understanding Data](https://understandingdata.com/posts/git-worktrees-parallel-dev/); [Laurent Kempé, 31 March 2026](https://laurentkempe.com/2026/03/31/from-3-worktrees-to-n-ai-powered-parallel-development-on-windows/)
- One of these guides says that past about five sessions, the context-switching cost between terminals "eats the parallelism gain". Anecdotal. — [Understanding Data](https://understandingdata.com/posts/git-worktrees-parallel-dev/); [Developers Digest](https://www.developersdigest.tech/blog/git-worktrees-claude-code-parallel-agents-guide)
- Higher claims exist. A vendor "playbook" covers running 6–8 agents at once. A vendor team says its engineers run "up to 20 parallel agents". The Pragmatic Engineer called "programming by kicking off parallel AI agents" a new trend. I saw titles only. — [Morph playbook](https://www.morphllm.com/parallel-coding-agent-playbook); [Kilo Code blog](https://blog.kilo.ai/p/how-7-kilo-code-engineers-run-up); [Pragmatic Engineer](https://blog.pragmaticengineer.com/new-trend-programming-by-kicking-off-parallel-ai-agents/)
- OpenAI's Codex docs recommend parallel subagents mainly for read-heavy work, with more caution for write-heavy work. — [OpenAI Codex docs, subagents](https://developers.openai.com/codex/concepts/subagents.md)
- One guide warns that uncoordinated parallel agents break codebases when they edit the same files. — [Augment Code guide (not opened)](https://www.augmentcode.com/guides/how-to-run-a-multi-agent-coding-workspace)

Cognitive load research:
- BCG and UC Riverside published a study in Harvard Business Review in March 2026. It surveyed 1,488 US full-time workers, not only developers. "AI brain fry" means mental fatigue from using or overseeing AI beyond one's capacity. Overseeing agents was the strongest driver. — [The Register, 9 March 2026](https://theregister.com/2026/03/09/ai_brain_fry_managing_agents); [The Decoder](https://the-decoder.com/study-warns-of-ai-brain-fry-as-workers-hit-cognitive-limits-overseeing-ai-agents/)
- Same study: workers with high oversight demands reported more strain than those with low oversight. They reported 14% more mental effort, 12% more mental fatigue and 19% more information overload. — [The Register, 9 March 2026](https://theregister.com/2026/03/09/ai_brain_fry_managing_agents)
- The authors recommend limits on how much agent oversight one person carries. Headlines say "three agents is about all we can handle". I could not confirm that the study itself sets that number. — [The Register, 9 March 2026](https://theregister.com/2026/03/09/ai_brain_fry_managing_agents); [Help Net Security](https://www.helpnetsecurity.com/2026/03/09/harvard-business-review-ai-workplace-fatigue-report/)
- arXiv 2606.05770 ("Human Oversight and Overload", 2026) argues that AI raises the number of alternatives and micro-decisions, which can amplify cognitive load. It builds on grey literature about "AI fatigue". — [arXiv 2606.05770 (not opened)](https://arxiv.org/pdf/2606.05770)
- arXiv 2609.24234 ("The Work Behind Delegation", 2026) interviewed 20 people about how developers supervise coding agents. It is a framework study, not a fatigue measurement. — [arXiv 2609.24234 (not opened)](https://arxiv.org/pdf/2609.24234)
- METR said its time measurements were unreliable for developers who use multiple agents at once (February 2026). — [METR post, reposted on Conffab](https://conffab.com/?p=10163)
- Faros 2026 (vendor, secondary): average time a task spends in progress rose 225.2% under high AI adoption. — [Faros blog (not opened)](https://www.faros.ai/blog/ai-engineers-faster-delivery-slower); [Jim Nielsen](https://notes.jim-nielsen.com/n/2026-06-12-1119/)

Kanban voices:
- Vacanti and Singh's "AI and Flow" episode asks whether AI changes anything for flow metrics and Kanban. Its promotion stresses the queue after the developer (quoted in section 1). — [Drunk Agile on Apple Podcasts](https://podcasts.apple.com/ie/podcast/drunk-agile/id1550106773)
- Yuval Yeret (Kanban and Scrum trainer) argues that WIP limits "have become the critical regulatory mechanism" in AI-assisted development. He treats the spec as the unit of WIP. He limits how many specs are open and how many agent-made changes sit unreviewed. — [Yuval Yeret, WIP limits for spec-driven agentic development (not opened)](https://yuvalyeret.com/blog/limiting-work-in-progress-wip-in-scrum-with-kanban-what-when-who-how/)
- Yeret also says: count active feature directories, not agents. Do not set WIP by dividing headcount. Telling reviewers to work faster is the wrong answer to more PRs. — [Yuval Yeret, "Do WIP limits still make sense when agents write the code?" (not opened)](https://yuvalyeret.com/blog/calculate-kanban-wip-limits-ai-age/)
- Yeret: "until agent output can move safely through the whole loop, counting agent sessions as capacity mostly moves unfinished work toward the next human." — [Yuval Yeret (not opened)](https://yuvalyeret.com/blog/calculate-kanban-wip-limits-ai-age/)
- AgentPatterns.ai recommends WIP=1 for a single coding agent: at most one task active at a time. A blocked task still holds its WIP slot. — [AgentPatterns.ai, WIP=1 and Little's Law](https://agentpatterns.ai/patterns/agent-design/wip-1-littles-law-agent-throughput/)
- Open-source agent Kanban tools already enforce limits. One defaults to Backlog 10, In Progress 3, In Review 5, so agents finish work before they pull new tickets. — [github-kanban-agents](https://github.com/dandye/BenPerel-github-kanban-agents)
- Another project proposes per-agent WIP limits because one agent "can consume the entire WIP budget, starving others". — [yurtle-kanban issue 12](https://github.com/Congruentsys/yurtle-kanban/issues/12)
- ProKanban's Kanban Guide keeps control of WIP central. A Thrivve Partners post notes the guide treats WIP limits as one way to control WIP, not the only way. — [ProKanban, The Kanban Guide](https://prokanban.org/the-kanban-guide); [Thrivve Partners on Medium (not opened)](https://medium.com/thrivve-partners/wip-without-limits-actually-thats-the-point-f87a6f5b68ae)
- An older ProKanban field report (pre-AI, about 2020) looked at team WIP limits. It found a "sweet spot" at 2/3 to 3/4 of the number of developers. — [ProKanban blog](https://www.prokanban.org/blog/https-prokanban-org-blog-dont-just-limit-wip-optimize-it)
- Jim Benson (Personal Kanban) offers an "AI and Automation Gut Check". It compares what AI produces with its cost in review, rework and "invisible WIP". This is a service description, not a study. — [Jim Benson booking page](https://cal.com/jim-benson)
- Kanban University's core practices: visualize, limit WIP, manage flow, make policies explicit, implement feedback loops, and improve through experiments. I found no Kanban University or David J. Anderson statement on AI agents. — [Kanban University, The Kanban Method](https://edu.kanban.university/kanban-method)

### Inferences
- Agents add generation capacity, not review or decision capacity. So the WIP limits that matter sit on human stages: open specs, PRs waiting for review, and items waiting to merge.
- Running a "fleet" of agents without a pull signal is a push system. Work then piles up in front of review. That is what the Faros and LinearB data show.
- A practical rule follows: do not start a new agent task while the review column is full. Kanban calls this "stop starting, start finishing".
- Parallel agents fit best on read-only or throwaway work, such as research and spikes. That output does not need full review before merge.
- The fatigue reports (Willison, BCG/UC Riverside) suggest the human limit is attention, not just review hours. A WIP limit protects attention too.

### Gaps
- No controlled study measures the best number of parallel agents per developer. The 3–6 range is anecdote.
- I found no AI-specific writing by David J. Anderson, Mike Burrows or Kanban University. The Vacanti and Singh episode had no transcript I could read.
- I could not open Yeret's posts. Quotes come from search summaries.
- I found no numbers on half-finished or abandoned agent branches.

## 3. Small batches, trunk-based development and queueing

### Takeaway
DORA lists working in small batches as one of seven capabilities that amplify AI's benefits. The reason: AI makes large, hard-to-review changes easy. Queueing theory explains the review slowdown. When reviewers are already busy, a modest rise in PR arrivals multiplies waiting time.

### Cited Findings
- DORA AI Capabilities Model (Kevin Storer and Derek DeBellis, 23 September 2025). It drew on 78 in-depth interviews and a survey of almost 5,000 respondents. — [Google Cloud blog, AI Capabilities Model](https://cloud.google.com/blog/products/ai-machine-learning/introducing-doras-inaugural-ai-capabilities-model)
- The seven capabilities, as Google lists them — [Google Cloud blog, AI Capabilities Model](https://cloud.google.com/blog/products/ai-machine-learning/introducing-doras-inaugural-ai-capabilities-model):
  1. Clear and communicated AI stance.
  2. Healthy data ecosystems.
  3. AI-accessible internal data.
  4. Strong version control practices.
  5. Working in small batches.
  6. User-centric focus.
  7. Quality internal platforms.
- Small batches: "Working in small batches, a long-standing DORA principle, is especially powerful in an AI-assisted environment. This practice amplifies the positive influence of AI on product performance and reduces friction for development teams." — [Google Cloud blog, AI Capabilities Model](https://cloud.google.com/blog/products/ai-machine-learning/introducing-doras-inaugural-ai-capabilities-model)
- Version control: "Frequent commits amplify AI's positive influence on individual effectiveness, while the frequent use of rollback features boosts the performance of AI-assisted teams." — [Google Cloud blog, AI Capabilities Model](https://cloud.google.com/blog/products/ai-machine-learning/introducing-doras-inaugural-ai-capabilities-model)
- User-centric focus: without it, "AI adoption can have a negative impact on team performance." — [Google Cloud blog, AI Capabilities Model](https://cloud.google.com/blog/products/ai-machine-learning/introducing-doras-inaugural-ai-capabilities-model)
- The blog gives no effect sizes for any capability. — [Google Cloud blog, AI Capabilities Model](https://cloud.google.com/blog/products/ai-machine-learning/introducing-doras-inaugural-ai-capabilities-model)
- Nathen Harvey and Allison Park (10 December 2025): "AI can easily generate massive blocks of code, which are hard to review and test. Enforcing the discipline of small batches counteracts this risk, ensuring that speed translates to product performance rather than instability." — [Google Cloud blog, From adoption to impact](https://cloud.google.com/blog/products/ai-machine-learning/from-adoption-to-impact-putting-the-dora-ai-capabilities-model-to-work?hl=en)
- Same source: "As AI increases the volume and velocity of code generation, version control becomes your critical safety net." — [Google Cloud blog, From adoption to impact](https://cloud.google.com/blog/products/ai-machine-learning/from-adoption-to-impact-putting-the-dora-ai-capabilities-model-to-work?hl=en)
- DORA 2024 named "small batch sizes and robust testing mechanisms" as the basics needed before process gains reach delivery. — [Google Cloud blog, 2024 DORA report](https://cloud.google.com/blog/products/devops-sre/announcing-the-2024-dora-report)
- PR size: Faros 2025 (vendor) found average PR size up about 154% under high AI adoption. A secondary source gives +51% for Faros 2026. — [Faros AI research hub (not opened)](https://faros.ai/research); [makmel blog](https://makmel.pages.dev/blog/2026-04-30-ai-productivity-paradox)
- Swarmia (vendor) states that "AI assistants make it easy to generate large pull requests, and large changes are harder to review well." This is a rationale, not a measured result. — [Swarmia help, AI impact on PR metrics](https://help.swarmia.com/measure-the-productivity-impact-of-ai-tools/ai-impact-on-pr-metrics)
- Little's Law as Vacanti teaches it: average cycle time = average WIP ÷ average throughput. — [Vacanti, Actionable Agile Metrics slides](https://www.slideshare.net/slideshow/actionable-agile-metrics-for-predictability-daniel-vacanti/69347448); [ProKanban, Kanban Pocket Guide chapter 6](https://prokanban.org/blog/the-kanban-pocket-guide-chapter-6-the-basic-metrics-of-flow)
- A practitioner queue model: a review team with a fixed capacity of 10 reviews a day. Arrivals rise from 7 to 9.5 a day (x1.36). Time in queue rises about sixfold. Open PRs rise from about 2.3 to 19. These are illustrative numbers, not measurements. — [jawnb, "The optimal number of unreviewed PRs is not zero" (not opened)](https://jawnb.github.io/unreviewed-prs/)
- A practitioner post argues that a review stage that was fine at 80% utilization "crosses the bend", and the queue starts feeding itself. — practitioner posts found in search, e.g. [Brief](https://briefhq.ai/blog/throughput/) and [ainoya.dev](https://ainoya-dev.pages.dev/posts/pr-review-timing-in-the-ai-era/) (not opened; I cannot tell which one said it)
- Practitioners warn that Little's Law needs a stable boundary, such as "ready for review" to "merged". DORA's lead time (commit to production) contains the review queue but does not isolate it. They advise measuring the review queue itself. — same practitioner posts, plus [SoftwareSeni](https://www.softwareseni.com/why-code-review-became-the-bottleneck-and-what-the-numbers-show) (not opened)
- Sizing WIP: Yeret suggests target WIP ≈ throughput × target cycle time (Little's Law rearranged). — [Yuval Yeret (not opened)](https://yuvalyeret.com/blog/calculate-kanban-wip-limits-ai-age/)
- Trunk-based development means everyone merges small changes into one main branch, at least daily. I found no AI-era study of it. DORA's AI guidance stresses frequent commits and rollback instead. — [Google Cloud blog, AI Capabilities Model](https://cloud.google.com/blog/products/ai-machine-learning/introducing-doras-inaugural-ai-capabilities-model)

### Inferences
- I checked the queue model's arithmetic. It matches a textbook single-server queue (M/M/1: random arrivals, random review times). Items in the system = u ÷ (1 − u), where u is utilization. At 70% utilization that gives 2.33 items; at 95% it gives 19.
- Little's Law then turns this into waiting time. Before: 2.33 ÷ 7 = 0.33 days. After: 19 ÷ 9.5 = 2 days. That is the sixfold rise.
- So the blow-up comes from running review close to full capacity. A 36% rise in arrivals moved utilization from 70% to 95%.
- Kingman's formula (standard queueing theory) adds a second effect: waits also grow with variability in job size. Large, uneven AI PRs raise variability. Waits can grow even when utilization stays the same.
- Small batches cut both the review time per PR and its variability. That gives a mechanism for DORA's small-batch finding.
- For LinearB's agentic PRs, most of the delay comes before review starts (pickup). That looks like a queue problem: PRs wait for a reviewer more than they take long to review.
- Trunk-based development, small batches and automated tests are the "robust control systems" DORA names. They likely matter more with AI because change volume rises. No AI-era study tests this directly.

### Gaps
- No study compares trunk-based development with long-lived branches under heavy AI use.
- I found no measured data on review-queue utilization with AI. The queue numbers are a model.
- DORA's capability effect sizes are in the full report, which I could not open.

## 4. Flow metrics as the way to measure AI impact

### Takeaway
Flow metrics show what output counts hide. In Faros 2026, tasks per developer rose 34%, but time in progress rose 225%. Measurement vendors and DORA steer away from lines of code and "percent of code written by AI". They favor flow and quality measures, split by AI-assisted and other work.

### Cited Findings
- Vacanti's basic flow metrics: WIP, cycle time, work item age and throughput. Throughput counts finished items; it does not measure size or effort. Cycle-time percentiles (50th, 85th, 95th) support forecasts. — [ProKanban, Kanban Pocket Guide chapter 6](https://prokanban.org/blog/the-kanban-pocket-guide-chapter-6-the-basic-metrics-of-flow); [Vacanti slides](https://www.slideshare.net/slideshow/actionable-agile-metrics-for-predictability-daniel-vacanti/69347448)
- DORA 2025 says value stream management (VSM), "the practice of visualizing, analyzing, and improving the flow of work from idea to customer, acts as a force multiplier for AI". — [2025 DORA report PDF (not opened)](https://services.google.com/fh/files/misc/2025_state_of_ai_assisted_software_development.pdf); [Lean Enterprise Institute](https://www.lean.org/the-lean-post/articles/value-stream-mapping-is-your-missing-ai-superpower/)
- Correction: one secondary summary lists VSM as one of the seven AI capabilities. Google's official list does not include it. VSM is a separate finding in the report. — [Google Cloud blog, AI Capabilities Model](https://cloud.google.com/blog/products/ai-machine-learning/introducing-doras-inaugural-ai-capabilities-model)
- DX (vendor) AI Measurement Framework: stressing "percent of code written by AI" without business outcomes leads to misleading conclusions. DX recommends measuring time savings, satisfaction and quality. — [DX AI measurement hub (not opened)](https://getdx.com/blog/ai-measurement-hub/)
- DX keeps PR throughput as an imperfect but reasonable proxy for the rate of change. It also tracks a complexity-weighted "true throughput". — [WorkOS summary of a DX talk](https://workos.com/blog/justin-reock-dx-ai-roi-bottleneck-elc-2026); [DX, Core 4 revisited (not opened)](https://getdx.com/blog/revisiting-the-dx-core-4-in-the-age-of-ai/)
- Brian Houck calls lines of code a "heavily problematic" way to measure AI. — [Aviator podcast](https://aviator.co/podcast/developer-productivity-ai-brian-houck)
- A DX-sourced figure, reported by a competitor: PR throughput rose about 10% while AI usage rose 65%. Secondhand and unverified. — [Exceeds AI blog](https://blog.exceeds.ai/dx-dora-metrics-limitations-2026/)
- Several sources recommend pairing throughput with quality signals: change failure rate, rework and review load. — [Pragmatic Engineer](https://newsletter.pragmaticengineer.com/p/how-tech-companies-measure-the-impact-of-ai); [Kunal Ganglani](https://www.kunalganglani.com/blog/measure-ai-coding-impact-metrics.md)
- Vendors now split flow metrics by AI use. Swarmia compares PRs assisted by Copilot, Cursor, Claude Code or no AI on throughput, cycle time, batch size and review time. — [Swarmia help, AI impact code](https://help.swarmia.com/features/ai-tools/ai-impact-code)
- LinearB reports pickup time, review time and merge rate by AI type (agentic, AI-assisted, unassisted). — [LinearB report PDF (not opened)](https://assets.linearb.io/image/upload/v1765300694/resources/LinearB_2026_Software_Engineering_Benchmarks_Report.pdf)
- Faros 2026 (vendor, secondary): tasks per developer +34%, while time a task spends in progress +225.2% and first-review wait +156.6%. — [Jim Nielsen](https://notes.jim-nielsen.com/n/2026-06-12-1119/); [Faros blog (not opened)](https://www.faros.ai/blog/ai-engineers-faster-delivery-slower)
- METR found time-on-task measurement unreliable for developers running several agents at once. — [METR post, reposted on Conffab](https://conffab.com/?p=10163)
- DORA's delivery outcomes are throughput and stability (instability in 2025 wording). — [Google Cloud blog, 2024](https://cloud.google.com/blog/products/devops-sre/announcing-the-2024-dora-report); [Google Cloud blog, 2025](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report)

### Inferences
- PR counts inflate with AI (Jellyfish: about 2x per engineer). Yet LinearB's AI PRs merge within 30 days only 32.7% of the time. So count finished work that reaches users, not PRs opened.
- Little's Law gives a quick check. If throughput stays flat and WIP rises, cycle time must rise. The Faros 2026 pattern (more output, much longer time in progress) suggests WIP grew faster than finishing.
- Work item age is the early warning for agent-made inventory. It flags stuck work while it is still open. Cycle time shows the problem only after items finish.
- System-level flow metrics are easier to trust than individual speed once one person runs several agents (METR's problem).
- A sensible set for an AI-native team: WIP, work item age, cycle time with percentiles, and throughput of items that reach users. Add change failure rate and rework for quality.

### Gaps
- No peer-reviewed study shows flow metrics are the best measure of AI impact.
- I found no written piece by Vacanti or Actionable Agile on AI metrics.
- DX's pages were blocked. Quotes come from summaries.

## 5. Lean waste with AI

### Takeaway
The AI-era data map well onto Lean's wastes. Overproduction: AI PRs that never merge. Inventory: PRs waiting for review. Rework: churn and duplicated code. Defects: more bugs and incidents. Cheap code moves cost to review, verification and upkeep.

### Cited Findings
- Lean software development lists wastes such as partially done work, extra features, task switching, waiting and defects. It treats partially done work as the software version of inventory. — [Wikipedia, Lean software development](https://en.wikipedia.org/wiki/Lean_software_development)
- Lean guides count code that is unchecked-in, untested, undocumented or not yet in production as partially done work. They recommend WIP limits and small batches as remedies. — [HackerNoon, 7 wastes](https://hackernoon.com/7-wastes-in-lean-software-development-and-how-to-prevent-them-7bi3tqp); [Martinelli](https://martinelli.ch/eliminating-waste-the-cornerstone-of-lean-software-development/)
- GitClear 2025 (vendor; 211 million changed lines, 2020–2024). "Moved" code, a sign of refactoring, fell from 24.8% of changed lines in 2021 to 9.5% in 2024. Copy-pasted code rose from 8.4% to 12.3%. — [GitClear 2025 research](https://www.gitclear.com/ai_assistant_code_quality_2025_research)
- GitClear 2025: commits with duplicated blocks of five or more lines rose eightfold during 2024. Churn rose from 3.3% in 2021 to 5.7% in 2024. (Churn means lines changed again soon after being written.) — [GitClear 2025 research](https://www.gitclear.com/ai_assistant_code_quality_2025_research); [DevClass, 20 February 2025](https://devclass.com/2025/02/20/ai-is-eroding-code-quality-states-new-in-depth-report/)
- GitClear cautions that the data show trends while AI spread. They do not prove that AI wrote each duplicated block. — [GitClear 2025 research](https://www.gitclear.com/ai_assistant_code_quality_2025_research)
- Later GitClear-attributed figures appear elsewhere: copy-paste up to 18% of changes, and 2025 churn of about 7.1%. Unverified. — [GitClear Atlas](https://gitclear.com/recent_ai_developer_productivity_code_quality_research); [Larridin](https://larridin.com/developer-productivity-hub/code-churn-ai-era-doubled)
- Overproduction signal: LinearB's AI PRs merged within 30 days 32.7% of the time, versus 84.4% for unassisted PRs. — [LinearB report PDF (not opened)](https://assets.linearb.io/image/upload/v1765300694/resources/LinearB_2026_Software_Engineering_Benchmarks_Report.pdf)
- AIDev: agent PRs were accepted 35–64% of the time, versus 76.8% for human PRs. — [alphaXiv 2507.15003 (not opened)](https://www.alphaxiv.org/abs/2507.15003v1)
- Rework and defects: after Cursor adoption, complexity rose about 41% and static-analysis warnings about 30%, and both persisted. The debt later slowed velocity. — [arXiv 2511.04427 (not opened)](https://arxiv.org/abs/2511.04427v2)
- Faros 2026 (vendor, secondary): bugs per developer +54%; incidents per PR about 3x. One source reports code churn +861%. — [Vibe Graveyard](https://vibegraveyard.ai/story/faros-ai-acceleration-whiplash-study/); [Matthew Aberham](https://www.matthewaberham.com/blog/faros-acceleration-whiplash)
- Faros 2025 (vendor): bugs per developer +9%. — [Faros AI research hub (not opened)](https://faros.ai/research)
- Skipped verification: Faros 2026 reports 31.3% more PRs merged with no human review. — [Faros blog, AI code review burden (not opened)](https://www.faros.ai/blog/ai-code-quality-senior-engineer-review-burden)
- Extra features: DORA warns that AI tools "can actually harm teams that lack a user-centric focus." — [Google Cloud blog, Harvey and Park](https://cloud.google.com/blog/products/ai-machine-learning/from-adoption-to-impact-putting-the-dora-ai-capabilities-model-to-work?hl=en)
- Waiting and handoffs: in the one-person squad case, a commentary says the speedup came from removing wait time and handoffs. — [lilting.ch commentary](https://lilting.ch/en/articles/one-developer-ai-augmented-squad-brownfield-enterprise)
- Jim Benson frames AI's hidden cost as review, rework and "invisible WIP" (service description). — [Jim Benson booking page](https://cal.com/jim-benson)

### Inferences
- A waste map for AI-native work:
  - Overproduction: agent PRs that nobody merges.
  - Inventory (partially done work): PRs and branches waiting for review or release.
  - Waiting: long pickup times.
  - Rework: churn, duplication and rollbacks.
  - Defects: bugs and incidents.
  - Task switching: supervising many agents at once.
  - Extra features: output not tied to a user need.
- AI cuts the cost of making code. It does not cut the cost of verifying, integrating or maintaining it. Lean thinking says to optimize the whole value stream, so spend the savings on review, tests and smaller batches.
- Cheap generation raises the temptation to overproduce. A WIP limit on review is the Lean brake.

### Gaps
- No study measures "code nobody needs" (features shipped but unused) with AI.
- I found no data on how many agent branches are abandoned before review.
- Later GitClear and Faros numbers are unverified.

## 6. Personal Kanban and WIP for one person

### Takeaway
Personal Kanban's two rules, visualize your work and limit your WIP, fit a solo builder who works with agents. I found no study of "WIP of one" for solo AI builders. Practitioner reports and one case study suggest that one person's attention and review set the limit.

### Cited Findings
- Personal Kanban was created by Jim Benson with Tonianne DeMaria Barry. It has two rules: visualize your work and limit your WIP. — [Lean Enterprise Institute, Jim Benson](https://www.lean.org/about-lei/faculty/jim-benson/); [Agile Humans conversation with Benson and DeMaria Barry](https://agilehumans.city/essence-of-personal-kanban)
- Personal Kanban summaries describe the WIP limit as a way to force completion, quality and focus. — [get-alfred.ai](https://get-alfred.ai/blog/personal-kanban); [Agile Humans](https://agilehumans.city/essence-of-personal-kanban)
- Benson compares a WIP limit to a speed limit: above it, quality or cost breaks down. — [iSixSigma interview transcript](https://www.isixsigma.com/wp-content/uploads/transcripts/Jim-Benson-PersonalKanban-Presentation.pdf)
- A secondary blog says Benson and DeMaria Barry suggest a WIP limit of 3 for individuals. I could not confirm this in a primary source. — [get-alfred.ai](https://get-alfred.ai/blog/personal-kanban)
- Benson's "AI and Automation Gut Check" weighs AI output against review, rework and invisible WIP. It is a service, not published research. — [Jim Benson booking page](https://cal.com/jim-benson)
- AgentPatterns.ai: WIP=1 per coding agent. A blocked task keeps its WIP slot. — [AgentPatterns.ai](https://agentpatterns.ai/patterns/agent-design/wip-1-littles-law-agent-throughput/)
- One-person squad case (arXiv 2605.18461, May 2026): one engineer with four agents did a four-person scope in half the planned time. Spec quality and institutional knowledge were the limits. — [arXiv 2605.18461 (not opened)](https://arxiv.org/pdf/2605.18461.pdf)
- Commentators flag key-person risk in that case: if the one person leaves or takes time off, work stops. They also note the proposed "two-person pair plus part-time product owner" setup is a proposal, not a tested result. — [lilting.ch commentary](https://lilting.ch/en/articles/one-developer-ai-augmented-squad-brownfield-enterprise)
- Simon Willison: review and land "one significant change at a time"; use parallel agents for low-stakes work. He reports fatigue when running several agents. — [Simon Willison's weblog](https://simonwillison.net/2025/Oct/5/parallel-coding-agents/); [Let's Data Science](https://letsdatascience.com/news/software-engineers-feel-exhausted-by-ai-agents-19115894)
- Oversight fatigue: the BCG and UC Riverside survey covered 1,488 workers. High oversight demands meant 14% more mental effort, 12% more fatigue and 19% more information overload. — [The Register, 9 March 2026](https://theregister.com/2026/03/09/ai_brain_fry_managing_agents)

### Inferences
- For a solo owner who is new to coding, one item in review at a time is a sound default. It matches this project's own rule: "one intent, one branch, one pull request" (CLAUDE.md).
- A simple board for this kit: Intent → Spec → Plan → Build (agent) → Review (owner) → Done. Put the tightest limit, 1, on Build and Review. Allow a small separate lane for read-only research agents.
- Put each running agent session on the board as a card. That makes "invisible WIP" visible.
- Work item age on the board is the solo builder's warning sign. A card stuck in Review means: stop starting new agent work.
- The one-person case suggests that a solo builder's real limit is clear specs and knowledge of the problem. That supports this kit's intent → spec → plan steps before any build.

### Gaps
- No empirical study tests WIP limits for solo builders who use AI agents.
- I found nothing by Benson or DeMaria Barry on AI agents beyond the service page.
- The "WIP of 3" advice for individuals is unverified.
- General multitasking research from before AI was outside this search budget.
