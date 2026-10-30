# Agile practices for solo builders, first-time builders and very small teams using AI coding agents

Compiled 30 October 2026. Labels: [Independent research], [Practitioner], [Opinion]. "WIP" means work in progress: tasks started but not finished.

## 1. Solo and small-team agile: personal Kanban, Scrum for one, weekly reviews, timeboxing

### Takeaway
No study tests "Scrum for one" or personal Kanban directly. The strongest evidence is for written if-then plans, visible progress, and planning steps before using AI. Strict Scrum does not fit one person; practitioners keep the timebox, the board and the retro, and drop team meetings.

### Cited Findings
- [Practitioner] Personal Kanban has two rules: make your work visible, and limit work in progress. Benson's sources found give no fixed number; guides suggest 1 to 3 items. — [personalkanban.com](https://personalkanban.com); [Tech Lead Journal ep. 97](https://techleadjournal.dev/episodes/97/)
- [Opinion] Scrum.org forum answers say a one-person "Scrum team" does not match the Scrum Guide. They say the Daily Scrum has little value for one developer. Solo adaptations keep timeboxes and retros. — [Scrum.org forum](https://www.scrum.org/node/50125); [Lucidchart "Scrum for one"](https://lucidchart.com/blog/scrum-for-one)
- [Practitioner] Shape Up (Basecamp, 2019): decide an "appetite" (time budget) first, fix the time, cut scope instead of extending. Six-week cycles, two-week cool-down, teams of 1 designer plus 1–2 programmers. (Secondary summaries; book not opened.) — [Beeminder review](https://doc.beeminder.com/shapeup); [rubick.com](https://www.rubick.com/wiki/process/shape-up)
- [Independent research] Implementation intentions ("If X happens, then I will do Y") help people reach goals: d = 0.65 across 94 tests (2006). A 2024 update across 642 tests found d = 0.27–0.66. — [summary with sources](https://goalsandprogress.com/implementation-intentions-research/); [Uni Konstanz record](https://kops.uni-konstanz.de/entities/publication/2e749bfb-8533-437c-8203-7e788c910c5f)
- [Independent research] Progress in meaningful work was the top driver of good workdays. Source: about 12,000 diary entries from 238 people in 26 project teams at 7 companies (Amabile and Kramer, 2011). — [HBS Working Knowledge](https://hbswk.hbs.edu/item/6685.html)
- [Independent research] Randomized trial, 297 knowledge workers, 594 essays (Microsoft Research, October 2026). Prompts to write the goal and break the task into parts before the AI drafted improved quality. The gain lasted after the prompts were removed, and recall was better 3 days later. But people rated the AI as less helpful and more effort. — [arXiv 2610.30945](https://www.alphaxiv.org/abs/2610.30945)
- [Independent research] Deadlines: Ariely and Wertenbroch (2002) found evenly spaced outside deadlines beat self-set ones. A replication of their Study 2 failed (Bisin and Hyndman, 2020; journal version 2026). — [PubMed](https://pubmed.ncbi.nlm.nih.gov/12009041/); [replication PDF](https://bpb-us-e1.wpmucdn.com/wp.nyu.edu/dist/c/16384/files/2025/09/Ariely_Replication-1.pdf)
- [Independent research] Student teams in a Scrum course mostly disagreed that they "worked on too many user stories simultaneously" (mean 4.4 on 1–5 scale where 5 = disagree; 42 students, 6 teams). — [Matthies et al., ICSE-SEET 2019](https://arxiv.org/pdf/1903.01866)
- [Practitioner] Solo developers report a 15-minute Friday retro: what went well, what did not, one change. — [stackfolo blog](https://stackfolo-blog.pages.dev/blog/weekly-retrospective-system-developer/); [dev.to, solo coder feedback loop](https://dev.to/vickylai/how-to-set-up-a-short-feedback-loop-as-a-solo-coder-4gbc)

### Inferences
- For a kit: one visible board, WIP limit of 1, a fixed weekly timebox, a written goal in if-then form, a Friday 15-minute retro.
- Planning steps feel slower and "less helpful" while working better. Newcomers may skip them, so the kit should make them the default.
- Use Shape Up's "fix time, cut scope" instead of estimates, which beginners cannot do well.

### Gaps
- No controlled study of personal Kanban or WIP=1 for individuals was found.
- Gail Matthews' "written goals" study, Locke and Latham goal-setting, GTD weekly review and "Agile Results" were not checked.
- scrumguides.org was blocked; Scrum Guide wording was taken from forum quotes.

## 2. Computing education research: agile in student and capstone projects, with GenAI (2023–2026)

### Takeaway
Students use GenAI heavily and say "keep your own understanding." Their main risk is "comprehension debt": code grows faster than understanding. One-week sprints, short weekly meetings, client demos and a pre-agreed minimum product help. Daily stand-ups and big teams cause friction.

### Cited Findings
- [Independent research] Capstone, Hannover (EASE 2026): 178 students, 18 teams, 15 clients, 4 months; 150 surveyed. 139/150 used GenAI. Top uses: code or debugging (97), learning new tech (96); design (27) and requirements (25) less. 100/150 had no professional experience. — [arXiv 2604.24521](https://www.alphaxiv.org/abs/2604.24521)
- Same study: students' advice themes were "retain understanding" (20.1% of codes) and "review outputs" (14.9%). One said: "work your way forward step by step." Another: "otherwise you end up with 20 different solutions." Clients' top worry: students cannot explain decisions. — [arXiv 2604.24521](https://www.alphaxiv.org/abs/2604.24521)
- Same study: weekly 5–10 minute team Scrum, 20–40 minute client meeting with a required board, rotating 1:1 checks of commit history. Teams of 9–10 had more AI-driven drift (different tools, inconsistent terms). Authors propose an "AI coordinator" role. — [arXiv 2604.24521](https://www.alphaxiv.org/abs/2604.24521)
- [Independent research] 621 diaries from 207 students, 8 weeks, four 2-week sprints (Karlstad, EASE 2026). Four debt patterns: black-box acceptance, context mismatch, dependency atrophy, skipped verification. Protective habit: rewrite AI code and understand it before commit. — [arXiv 2604.13277](https://www.alphaxiv.org/abs/2604.13277)
- [Independent research] Year-long case of one 8-person student team (TUM, 2026). One-week sprints, weekly reviews replacing daily stand-ups, planned "pause weeks" around exams. 70% of tasks done on time. Single team only. — [arXiv 2601.03364](https://www.alphaxiv.org/abs/2601.03364)
- [Independent research] SIGCSE 2024: 179 students, 16 projects. A GPT-3.5/GPT-4 Slack bot suggested edits to weekly written stand-up reports; report quality improved and satisfaction was high (survey-based). — [SIGCSE 2024 page](https://sigcse2024.sigcse.org/details/sigcse-ts-2024-Papers-1/78/Exploring-the-Impact-of-Generative-AI-for-StandUp-Report-Recommendations-in-Software-)
- [Independent research] ICSE 2024, 22 students: ChatGPT gave no significant gain in productivity or self-efficacy versus normal resources; frustration was significantly higher. — [catalog record](https://ersearch2.cvtisr.sk/vufind/SummonRecord/FETCH-LOGICAL-a2321-db5547e61e25d4f9c1ce80bddd84396f604f8ddae112f96718aeb7c8358efdf43/Details?lng=en)
- [Independent research] ICER 2024, 21 novices: GenAI made metacognitive problems worse for struggling students and added three new ones. Lower self-efficacy linked to more problems. — [arXiv 2405.17739](https://arxiv.org/abs/2405.17739)
- [Independent research] Stand-ups: 102 observed, 60 interviews, 15 teams, 5 countries. Many members had negative experiences; status reporting to managers and long or frequent meetings hurt. — [arXiv 1808.07650](https://arxiv.org/abs/1808.07650v1)
- [Independent research] Uneven contribution: in student teams, at least half of teams per assignment showed low or extreme inequality; inequality did not consistently predict grades or code quality. — [METU record, JSS 2023](https://avesis.ncc.metu.edu.tr/yayin/84eb2053-5b29-4ad0-874b-21c2a4e05d11/the-impact-of-unequal-contributions-in-student-software-engineering-team-projects)
- [Independent research] Students' Scrum perceptions did not change much across sprints; role changed views (42 students). — [Matthies et al. 2019](https://arxiv.org/pdf/1903.01866)

### Inferences
- For 1–3 people: weekly sprint, written async stand-up (not a meeting), a demo to a real person each week.
- Add a "can I explain this?" check before each merge.

### Gaps
- No study found on GenAI's effect on free riding in student pairs.
- Estimation struggles of students were not directly sourced in this round.

## 3. Retrospectives and reflection for learners

### Takeaway
Short, structured reflection improves performance, mostly by raising self-efficacy. With AI, the retro should also ask "what don't I understand yet?"

### Cited Findings
- [Independent research] Field experiment at Wipro: 15 minutes of end-of-day reflection raised performance about 21% (other summaries say ~23%). Mechanism: self-efficacy. Working paper, revised 2023. — [SSRN](https://papers.ssrn.com/abstract=2414478); [IDEAS/HEC](https://ideas.repec.org/p/ebg/heccah/1181.html)
- [Independent research] Authors recommend retros with a "comprehension surfacing" step: list code the team does not understand. — [arXiv 2604.13277](https://www.alphaxiv.org/abs/2604.13277)
- [Independent research] Goal and task-breakdown prompts improved AI-assisted work quality and recall (n=297). — [arXiv 2610.30945](https://www.alphaxiv.org/abs/2610.30945)
- [Practitioner] 4Ls retro (Liked, Learned, Lacked, Longed for) by Gorman and Gottesdiener. — [Parabol](https://www.parabol.co/?p=2750)
- [Practitioner] Start/Stop/Continue works for solo weekly reviews; keep the "start" list short. — [wayline.io](https://www.wayline.io/blog/no-nonsense-retrospectives-solo-game-dev)

### Inferences
- Solo retro: 3 questions plus "one thing I can't explain yet," 15 minutes, written to a file.

### Gaps
- SRL meta-analyses (e.g., Theobald 2021) and Loksa et al. 2016 not checked.

## 4. Definition of Done and acceptance criteria for beginners

### Takeaway
Scrum: unfinished work is not shown or released. Job stories ("When…, I want…, so I can…") suit beginners because they start from a situation. Most practitioners use no story quality rules.

### Cited Findings
- [Practitioner] Scrum Guide 2020 (via forum quotes): "If a Product Backlog item does not meet the Definition of Done, it cannot be released or even presented at the Sprint Review." — [Scrum.org forum](https://www.scrum.org/node/47504)
- [Independent research] 182 practitioners plus 21 interviews (REFSQ 2016): 39.5% used no story quality rules, 33% self-made rules, 23.5% INVEST. — [Matthies et al. citing Lucassen](https://arxiv.org/pdf/1903.01866); [paper](https://webspace.science.uu.nl/~dalpi001/papers/luca-dalp-werf-brin-16-refsq.pdf)
- [Practitioner] Job stories from Intercom/Alan Klement; credit is disputed. — [jtbdux](https://jtbdux-protocol.pages.dev/foundations/job-stories)
- [Independent research] Capstone used client-signed acceptance criteria, tested with the client in the final week. — [arXiv 2604.24521](https://www.alphaxiv.org/abs/2604.24521)
- [Independent research] Non-developers were the only group reporting they never check AI code; ~45% of professionals always check (n=162). — [arXiv 2605.24521](https://www.alphaxiv.org/abs/2605.24521)

### Inferences
- Beginner DoD: tests pass, I can explain it, someone tried it, it is merged.

### Gaps
- No empirical study of DoD use by beginners found. Intercom original not opened.

## 5. Vertical slicing and small releases for newcomers

### Takeaway
Evidence for beginners is indirect: early, incremental work predicts better student projects. DORA finds small batches make AI help rather than harm.

### Cited Findings
- [Independent research] DORA 2025 (~5,000 respondents): small batches amplify AI's positive effect on product performance and reduce friction. User focus amplifies team performance; without it AI can hurt. — [Google Cloud blog](https://cloud.google.com/blog/products/ai-machine-learning/introducing-doras-inaugural-ai-capabilities-model)
- [Independent research, secondary] Small-batch teams report slightly lower felt individual productivity. — [Faros summary](https://faros.ai/blog/key-takeaways-from-the-dora-report-2025)
- [Independent research] Kazerouni et al. (ICER 2017): starting early and working often predicted more correct projects; students mostly worked under 10 days before deadline. (Search snippets only.) — [thesis](https://vtechworks.lib.vt.edu/items/2cf819d9-4fcc-4125-98de-31479d9fddbb/full)
- [Practitioner] Walking skeleton (Cockburn): "a tiny implementation of the system that performs a small end-to-end function"; meant to grow, not be thrown away. — [O'Reilly 97 Things](https://oreilly.com/library/view/97-things-every/9780596800611/ch60.html); [Gojko Adzic](https://gojko.net/2014/06/09/forget-the-walking-skeleton-put-it-on-crutches/)
- [Practitioner] Kniberg (2016): "Earliest Testable/Usable/Lovable Product"; the skateboard is usable. — [Goodreads reprint](https://www.goodreads.com/author_blog_posts/9805280-making-sense-of-mvp-minimum-viable-product-and-why-i-prefer-earliest?tab=book)
- [Independent research] Hackathon: a participant gave AI small chunks normally but "had to let it write a bigger chunk" under time pressure. — [arXiv 2607.29178](https://www.alphaxiv.org/abs/2607.29178)

### Inferences
- First week: a walking skeleton deployed. Each later slice: one thing a real user can do.

### Gaps
- No direct study of slicing helping beginners finish. Elephant carpaccio not checked.

## 6. Failure modes for solo AI builders

### Takeaway
Main risks: feeling fast while not being fast, code you do not understand, the hard "last 30%," and no checking. Traffic to vibe-coding tools fell sharply in mid-2025.

### Cited Findings
- [Independent research] METR 2025: 16 experienced developers, 246 tasks; AI made them 19% slower; they still believed 20% faster. — [METR](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/)
- [Opinion] Osmani's "70% problem": AI gets you 70% fast; the last 30% needs judgement. — [addyosmani.com](https://addyosmani.com/agentic-engineering/the-70-percent-problem/)
- [Independent research] Less-experienced vibe coders reprompt instead of debugging; abandoning tasks when code gets messy was reported across groups (n=162). — [arXiv 2605.24521](https://www.alphaxiv.org/abs/2605.24521)
- [Independent research] One-day novice "Vibe Hack" (31 students): almost all teams shipped working but buggy prototypes; most explored 5 or fewer ideas; trust in AI code ~40–45%. — [arXiv 2512.02750](https://arxiv.org/abs/2512.02750)
- [Independent research] Hackathon continuation (Nolte et al. 2020): intense short-term activity linked to lower long-term continuation; skill diversity and intent to grow reach linked to higher. Exact rates not opened. — [UT video page](https://www.uttv.ee/naita?id=30436); [Secret Life of Hackathon Code, 22,183 projects](https://ar5iv.labs.arxiv.org/html/2103.01145)
- [Independent research, third-party] Barclays (Sept 2025): visits since May down 64% (v0), ~40% (Lovable), 27% (bolt.new). Traffic is not churn. — [dev.ua](https://dev.ua/en/news/vibecoding-1759144404)
- [Independent research, survey] Stack Overflow 2025: 84% use or plan AI; 33% trust its accuracy. — [arXiv 2605.24521](https://www.alphaxiv.org/abs/2605.24521). 66% cite "almost right" answers as top frustration. — [VentureBeat](https://venturebeat.com/ai/stack-overflow-data-reveals-the-hidden-productivity-tax-of-almost-right-ai-code); 72% vs 77% say vibe coding is not in their work (sources conflict).

### Inferences
- Guard against "almost done" features: WIP=1 and a DoD with tests.

### Gaps
- No reliable data on side-project abandonment rates. par.nsf.gov blocked.

## 7. What indie hackers and solo AI founders report (2024–2026)

### Takeaway
Solo founding is rising. Founders praise weekly shipping and building in public but warn weekly AI releases without tests bring regressions, and an audience is not a market.

### Cited Findings
- [Independent research, industry data] Solo-founder share of new US startups rose from 23.7% (2019) to 36.3% (H1 2025). Solo-led firms were 30% of 2024 startups but got 14.7% of priced-round cash. — [Carta](https://carta.com/data/solo-founders-report)
- [Practitioner] Pieter Levels built fly.pieter.com in about 3 hours with Cursor; he reports $87k MRR (~$1M ARR) after 17 days. Founder-reported. — [levels.io](https://levels.io/full-multiplayer-python-websockets-game-ai)
- [Practitioner] "Shipping weekly is still the single strongest habit," but weekly AI code with no CI means weekly regressions. — [agentiqa](https://agentiqa.com/en/blog/indie-hacker-tips)
- [Practitioner] "Your build-in-public audience is not your market." — [Indie Hackers](https://www.indiehackers.com/post/ship-fast-period-b85a51fa30)
- [Practitioner] About a quarter of recent YC startups have codebases almost fully AI-written (industry report). — [cited in arXiv 2605.24521](https://www.alphaxiv.org/abs/2605.24521)

### Inferences
- Copy the weekly ship-and-share rhythm, add tests, and get one real user's feedback each week.

### Gaps
- Most indie data is self-reported. simonwillison.net ("vibe engineering") was blocked.
