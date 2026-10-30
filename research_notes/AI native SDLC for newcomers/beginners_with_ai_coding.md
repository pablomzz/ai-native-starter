# How beginners and first-time builders experience building software with AI coding tools

Research notes, gathered 2026-10-30. Method note: web search worked, but direct page fetches to arxiv.org, teachingcs.substack.com and gigazine.net failed (those hosts are blocked in this session's network settings). So most findings below come from abstracts, search-result summaries and secondary write-ups, not full paper text. Where a number comes from a secondary source, that is said. Items marked "(not verified this session)" come from prior knowledge of the paper and should be checked before quoting.

## 1. What computing-education research finds about novices using Copilot, ChatGPT and agents

### Takeaway
AI helps most novices finish tasks, but it splits them: students who already have a plan speed up, while weaker students get carried along by suggestions, overrate their own understanding ("illusion of competence"), and struggle to read or verify the code. Help that explains is often weaker than people expect (LLM error explanations do not beat human-written ones; AI fixes were right about a third of the time in early tests).

### Cited Findings
- **Prather et al., "The Widening Gap" (ICER 2024), n = 21 CS1 students, lab sessions with observation, interviews and eye tracking.** 20 of 21 finished the task, but there was a divide: students who "accelerated" used GenAI to build code they had already planned and ignored unhelpful suggestions; struggling students often overestimated their performance and finished with an "illusion of competence." — [arXiv 2405.17739](https://arxiv.org/abs/2405.17739); [ICER 2024 listing](https://icer2024.acm.org/details/icer-2024-papers/26/The-Widening-Gap-The-Benefits-and-Harms-of-Generative-AI-for-Novice-Programmers)
- Same study: eight metacognitive difficulties were identified, five known from earlier work and three new ones tied to GenAI use; 10 of 21 participants showed at least one difficulty, 11 showed none. Old difficulties persisted and GenAI could compound them. Authors recommend scaffolding AI use and explicitly teaching metacognition (planning, monitoring, checking). — [arXiv 2405.17739](https://arxiv.org/abs/2405.17739); [Bohrium summary](https://bohrium.dp.tech/paper/arxiv/2405.17739)
- The three new GenAI difficulties are, as I recall the paper, "interruption" (suggestions break the student's train of thought), "mislead" (suggestions send the student down a wrong path) and "progression" (the student accepts code and moves on without understanding it). (Not verified this session; check the paper.) — [arXiv 2405.17739](https://arxiv.org/abs/2405.17739)
- **Prather et al., "It's Weird That it Knows What I Want" (ACM TOCHI 2024, vol. 31 issue 1).** First-time CS1 users of GitHub Copilot were observed and interviewed. Two interaction patterns: "shepherding" (steering suggestions) and "drifting" (students carried along by wrong suggestions, moving from one to the next and getting lost). Students reported time saved, fewer syntax errors and excitement that it "anticipates" them, with mixed reflections overall. — [arXiv 2304.02491](https://arxiv.org/abs/2304.02491v1); [dblp](https://dblp.uni-trier.de/rec/journals/tochi/PratherRDBLLPFS24.html); [ar5iv](https://ar5iv.labs.arxiv.org/html/2304.02491); [Emergent Mind summary](https://emergentmind.com/papers/2304.02491)
- **Kazemitabaar et al. (CHI 2023), n = 69 novices aged 10-17**, controlled experiment with Codex: access to Codex significantly improved code-authoring performance and did not hurt manual code-modification skills, but authors flagged over-reliance risk. — [arXiv 2302.07427](https://arxiv.org/pdf/2302.07427)
- **Kazemitabaar et al. (Koli Calling 2023), log analysis of 33 learners aged 10-17**: found signs of both over-reliance and self-regulation; per the abstract, the highest correctness on AI-assisted authoring tasks went with the lowest correctness on later manual modification tasks (i.e. those who leaned on AI most did worse afterwards). — [Stanford SCALE repository entry](https://scale.stanford.edu/ai/repository/how-novices-use-llm-based-code-generators-solve-cs1-coding-tasks-self-paced-learning); [arXiv 2309.14049](https://arxiv.org/pdf/2309.14049)
- **Kazemitabaar et al., CodeAid (CHI 2024)**: an LLM assistant designed to help without handing over full code solutions, deployed to ~700 students over a 12-week semester to study usage patterns and perceptions. Detailed results not retrieved. — [Montreal AI Ethics summary](https://montrealethics.ai/codeaid-evaluating-a-classroom-deployment-of-an-llm-based-programming-assistant-that-balances-student-and-educator-needs); [Warwick listing](https://warwick.ac.uk/fac/cross_fac/eduport/edufund/projects/yang/projects/codeaid-evaluating-a-classroom-deployment-of-an-llm-based-programming-assistant-that-balances-72b90e/)
- **Leinonen, Denny et al. (SIGCSE 2023)**: Codex explanations of Python error messages were mostly understandable, but its suggested fixes were correct only 33% of the time. — [arXiv 2210.11630](https://arxiv.org/abs/2210.11630v1)
- **"Not the Silver Bullet: LLM-enhanced Programming Error Messages are Ineffective in Practice"**, within-subjects study, n = 106 novices fixing six buggy C programs: expert handwritten explanations outperformed both GPT-4 explanations and stock compiler messages on objective and subjective measures. (Author list and year not confirmed this session.) — reported in search results alongside [Denny et al., "Computing Education in the Era of Generative AI"](https://arxiv.org/pdf/2306.02608)
- Zi et al. (2025), as cited in a review: CS1 students scored only 32.5% on comprehension tasks about LLM-generated code. (Secondary citation.) — via search summary of [arXiv vibe coding literature](https://arxiv.org/pdf/2607.21652)
- **Geng et al., "Exploring Student-AI Interactions in Vibe Coding" (arXiv, July 2025, UC San Diego)**: intro programming and advanced software-engineering students built web apps on Replit while thinking aloud. Both groups spent most of their time testing and debugging the running app and rarely opened the code. Advanced students' prompts far more often included feature and codebase context; advanced students were somewhat more willing to work with the code. Authors argue all levels should learn to read code and write prompts with programming context. — [arXiv 2507.22614](https://arxiv.org/html/2507.22614); [Stanford SCALE entry](https://scale.stanford.edu/ai/repository/exploring-student-ai-interactions-vibe-coding)
- **Stack Overflow Developer Survey 2025** (49,000+ respondents, 177 countries): 44% of respondents use AI tools to learn to code, up from 37% in 2024; among those learning to code for AI, 53% used AI tools. More respondents distrust AI accuracy (46%) than trust it (33%). Only 31% use AI agents. — [Stack Overflow press release, 2025](https://stackoverflow.co/company/press/archive/stack-overflow-2025-developer-survey/)

### Inferences
- A realistic novice persona should not be "fails to finish". Most novices finish. The realistic risk is finishing with a false sense of understanding, then being stuck when something breaks later or when asked to change the code by hand.
- Two persona poles are well supported: the "planner/accelerator" (knows what they want, uses AI to type it, rejects bad suggestions) and the "drifter" (accepts suggestion after suggestion, loses the thread, overrates progress).
- Explanations from the AI are not a cure: novices struggle to judge whether a fix or explanation is right.

### Gaps
- Could not read full text of the Widening Gap or Copilot papers, so exact names and counts of the three new difficulties and Copilot sample size are not verified here.
- CodeAid's specific results (e.g. what share of queries were for debugging vs concepts) were not retrieved.
- Few peer-reviewed studies yet of novices using terminal agents like Claude Code specifically (as opposed to Copilot autocomplete or chat).

## 2. Specific struggles: errors, terminal/Git basics, setup, reading AI output, knowing when code is wrong, prompting, over-reliance, giving up

### Takeaway
The recurring failure loop is: error appears, novice cannot read it, pastes it back into the AI, AI tries a fix, repeat. Less experienced users reprompt instead of debugging, rarely look at the code, give less context in prompts, and get confused by code they cannot read. Environment setup (PATH, installs, "command not found") is a long-standing first-week hurdle that pulls attention away from the actual task.

### Cited Findings
- Chou et al. (2025), as cited in a later paper: non-professionals struggled to debug; one user blindly copy-pasted 31 consecutive error messages as debugging prompts. (Secondary citation.) — [arXiv 2512.14012, "Professional Software Developers Don't Vibe, They Control"](https://arxiv.org/pdf/2512.14012)
- **"From Prompting to Verification: How Experience Shapes Vibe Coding Practices" (arXiv 2605.24521, May 2026), survey of 162 vibe coders split evenly into non-developers, novice developers and professionals.** Non-developers were more likely than professionals to reprompt instead of debugging manually; novices did not differ significantly from either group. Less experienced participants reported more confusion when facing incomprehensible AI-generated code. Non-developers reported more reliance on AI-led generation; professionals gave richer context. Structured planning and verification-oriented prompting did not differ significantly between groups. Authors: vibe coding "selectively democratizes code production", broadening access but not the skills needed for verification and debugging. — [arXiv 2605.24521](https://arxiv.org/html/2605.24521); [Moonlight review](https://www.themoonlight.io/review/from-prompting-to-verification-how-experience-shapes-vibe-coding-practices)
- Survey items in that study include "If an error occurs, I reprompt instead of manually debugging" and "I usually reprompt several times to get usable results" (per-group percentages not retrieved). — [arXiv 2605.24521](https://arxiv.org/pdf/2605.24521)
- Same study on motivation: non-developers are most motivated by accessibility (being able to build at all); novices by learning and experimentation; professionals use it more for work. — [arXiv 2605.24521](https://arxiv.org/html/2605.24521v1)
- Students in a Replit vibe-coding study mostly tested and debugged the running app and rarely looked at code; intro students gave less feature and codebase context in prompts. — [arXiv 2507.22614](https://arxiv.org/html/2507.22614)
- A multivocal literature review of vibe coding found hallucinated or incorrect code generation to be the most frequently reported failure mode (evidence strength rated moderate). — [arXiv 2607.21652](https://arxiv.org/pdf/2607.21652)
- Columbia DAPLab analyzed failures of coding agents (Cline, Cursor, Replit, V0) and identified nine failure patterns; error handling and business logic were the most serious and common. (Blog post, not peer reviewed, not novice-specific.) — [Columbia DAPLab, Jan 2026](https://daplab.cs.columbia.edu/general/2026/01/07/why-vibe-coding-fails-and-how-to-fix-it.html)
- AI-suggested fixes for Python errors were correct only 33% of the time (Codex, 2023). — [arXiv 2210.11630](https://arxiv.org/abs/2210.11630v1)
- Environment setup: instructors have long reported that the Windows Python installer not adding Python to PATH forced them to make documents and screencasts, and diverted students' first-week energy away from the course; students struggled to understand ~20 lines of course code "let alone" the setup lines. (Old, 2008, but the pattern persists.) — [Python edu-sig mailing list, 2008](https://www.python.org/pipermail/edu-sig/2008-December/008953.html); [edu-sig thread](https://www.python.org/pipermail/edu-sig/2008-December/008921.html)
- A 2012 python-dev message notes that people teaching beginners reported PATH editing as a substantial hurdle. — [python-dev, 2012](https://www.python.org/pipermail/python-dev/2012-March/117837.html)
- A current course troubleshooting guide: "command not found" / "is not recognized" means the program is not installed or not on PATH; fix by reinstalling with "Add to PATH"; teach students to read the last line of an error first. — [Ray's Programming troubleshooting page](https://rays-programming.netlify.app/troubleshooting)
- Practitioner tests of AI app builders report that non-programmers hit walls when a fix needs manual configuration (one test: a fix "took 6 additional prompts and manual configuration — tasks a non-programmer cannot do"), and that Replit's ceiling is when the Agent "can no longer make progress without human code intervention". (Blogs, some vendor or affiliate, anecdotal.) — [dev.to comparison, 2026](https://dev.to/razen-creations/i-tested-4-ai-website-builders-so-you-dont-have-to-lovable-vs-bolt-vs-replit-vs-wix-2026-3eec); [MindStudio comparison](https://www.mindstudio.ai/blog/full-stack-ai-app-builders-compared)

### Inferences
- A realistic newcomer persona in a terminal-based repo will: paste errors verbatim back to the agent; not open the files the agent changed; struggle when the agent asks them to run a command or edit config; and stop when the agent itself loops.
- "Command not found" (Node or npm not installed, or not on PATH) is a likely first blocker for a repo whose commands are `npm run ...`, especially on Windows.
- Starter repos that make verification concrete (one command that says pass or fail, like `npm run test` / `npm run check`) target exactly the skill these studies say novices lack.

### Gaps
- No rigorous recent (2023-2026) study found that quantifies environment-setup or PATH failures for AI-assisted beginners; evidence is old mailing lists and course pages.
- No study found that measures "giving up" or abandonment rates among novice AI-tool users.
- Per-group percentages from the 162-person vibe coding survey were not retrievable.

## 3. How non-programmers and "vibe coders" use Claude Code, Replit Agent, Lovable, Bolt, Cursor

### Takeaway
Non-programmers do use agents and app builders, and on ordinary tasks get close to engineers' success rates in Claude Code, but domain expertise and experience matter more than coding background, and novices succeed far less often. Academic research on non-programmers specifically in Lovable/Bolt/Replit is thin; most material is vendor blogs and anecdotes.

### Cited Findings
- **Anthropic, "Agentic Coding and Persistent Returns to Expertise" (published June 16, 2026)**: privacy-preserving analysis of ~400,000 Claude Code sessions from ~235,000 users, Oct 2025 to Apr 2026. On "verified success", software engineers reached ~34% and non-software occupations ~29%. (Secondary reporting; primary not retrieved.) — [Digital Applied summary](https://www.digitalapplied.com/blog/anthropic-400k-session-study-expert-user-no-code-ai); [Digital Today](https://www.digitaltoday.co.kr/en/view/67522/claude-code-400000-session-analysis-non-developers-use-expands); [KuCoin news](https://www.kucoin.com/news/flash/anthropic-study-non-programmers-using-claude-code-near-software-engineers-success-rate)
- Same study, expertise: one summary says expert-rated sessions reached 28-33% verified success vs 15% for novice sessions; another write-up claims ~91% for experts vs ~15% for novices. These conflict; the 15% novice figure appears in both. A Rangle blog gives 26% (non-software) vs 30% (engineers), also conflicting with 29%/34%. Check the primary paper. — [Digital Applied](https://www.digitalapplied.com/blog/agentic-coding-domain-expertise-moat-anthropic-research-2026); [bestagent.dev](https://bestagent.dev/ai-coding-rewards-expertise-2026/); [Rangle blog](https://rangle.io/blog/what-is-vibe-coding-surprising-data-on-whos-best-at-it)
- Same study, split of work: users make ~70% of planning decisions; sources differ on execution (Claude ~80% of execution decisions). Caveat: success is judged within the session, so whether code was shipped or abandoned afterwards is unknown. — [Digital Applied](https://www.digitalapplied.com/blog/anthropic-400k-session-study-expert-user-no-code-ai); [Sensemaker post](https://sensemaker.leaflet.pub/coding-agents-reward-expertise)
- Sarkar & Drosos, "Vibe coding: programming through conversation with AI" (arXiv 2506.23253, 2025): analysis of vibe-coding videos; explicitly notes none of the selected videos showed non-expert end-users, and calls for research on non-experts. — [arXiv 2506.23253](https://arxiv.org/html/2506.23253v2); [author PDF](https://advait.org/files/sarkar_2025_vibe_coding.pdf)
- "Good Vibrations?" qualitative study of co-creation, flow and trust in vibe coding (arXiv 2509.12491). Details not retrieved. — [arXiv 2509.12491](https://arxiv.org/pdf/2509.12491)
- Grey literature review of vibe coding motivations and challenges (arXiv 2510.00328). Details not retrieved. — [arXiv 2510.00328](https://arxiv.org/html/2510.00328v1)
- Experienced professional developers observed in 2025 "avoided pure vibe coding" and kept control of agents. — [arXiv 2512.14012](https://arxiv.org/pdf/2512.14012)
- A widely repeated claim that 63% of vibe-coding users are non-developers traces to an analysis of 1,000 Reddit posts (Solveo); weak evidence. — reported in search summary of [Hostinger vibe coding statistics](https://www.hostinger.com/blog/vibe-coding-statistics/)
- Practitioner comparisons say Lovable and Bolt are the most approachable for people without development background; Lovable cited as the easiest start for a complete non-coder; Bolt issues include production auth. A vendor anecdote (one user, $800K+ ARR in nine months) is not evidence of typical outcomes. — [MindStudio](https://www.mindstudio.ai/blog/full-stack-ai-app-builders-compared); [G2 Learn test](https://learn.g2.com/replit-vs-lovable?hs_amp=true); [Lovable guide (vendor)](https://lovable.dev/guides/bolt-vs-replit-vs-lovable)
- A CHI 2026 paper titled "From Throw-Away to Takeaway: How GenAI and Vibe Coding Accelerate Prototyping Across Technical Skill Levels" appears in reference lists; methods and findings not retrieved. — seen in search results for [arXiv 2605.24521](https://arxiv.org/html/2605.24521v1)

### Inferences
- Persona goals for non-programmers: "build a thing I need" (access), not "learn to code". Novice developers: learning and experimenting. This changes how they react to a repo full of process docs (intent, spec, plan): non-programmers may see it as friction unless it clearly helps them get the thing built.
- Domain experts without coding background (e.g. a manager, a teacher) are a plausible "successful newcomer" persona; pure novices with no domain grounding succeed least.

### Gaps
- No peer-reviewed interview or survey study found specifically on non-programmers using Lovable, Bolt or Replit Agent, including their abandonment rates.
- Primary Anthropic paper not retrieved; the numbers above conflict across secondary sources.
- No data found on Cursor use by absolute beginners.

## 4. Differences by background: language, operating system, age, prior experience, solo vs pairs, accessibility

### Takeaway
Prior experience and context-giving are the strongest documented differences. Non-native English speakers can prompt in their own language but trip on programming terms and often get better accuracy in English. Screen-reader users benefit but struggle with too many suggestions, interpreting output and verifying code. OS, age and pair-vs-solo effects with AI tools are weakly documented.

### Cited Findings
- **Language: Prather et al., "Breaking the Programming Language Barrier: Multilingual Prompting to Empower Non-Native English Learners" (ACE 2025; arXiv Dec 2024)**: students wrote prompts in Arabic, Chinese and Portuguese. They could solve problems in their native language but had trouble with programming terminology; Portuguese and Chinese speakers did better than Arabic speakers (linked to weaker model performance in Arabic and hard-to-translate concepts). Students felt more expressive in their own language but often got better accuracy in English. — [arXiv 2412.12800](https://arxiv.org/abs/2412.12800v1); [aitopics](https://aitopics.org/doc/arxivorg:AFEB8EAC)
- **Prior experience**: advanced students give more feature and codebase context and engage more with code than intro students. — [arXiv 2507.22614](https://arxiv.org/html/2507.22614). Non-developers reprompt instead of debugging more than professionals. — [arXiv 2605.24521](https://arxiv.org/html/2605.24521)
- **Expertise vs coding background**: novice sessions ~15% verified success in Claude Code vs much higher for experts (secondary, conflicting figures). — [Digital Applied](https://www.digitalapplied.com/blog/agentic-coding-domain-expertise-moat-anthropic-research-2026)
- **Age**: Kazemitabaar's Codex studies used learners aged 10-17 (n = 69; n = 33 in follow-up) and found AI helped authoring without harming modification on average, with over-reliance signs in some. — [arXiv 2302.07427](https://arxiv.org/pdf/2302.07427); [Stanford SCALE](https://scale.stanford.edu/ai/repository/how-novices-use-llm-based-code-generators-solve-cs1-coding-tasks-self-paced-learning)
- **Accessibility: Chen et al. (Microsoft Research, arXiv 2506.13270, 2025), two-week longitudinal study of 16 screen-reader programmers**: AI assistants improved efficiency and bridged accessibility gaps, but participants struggled to convey intent, interpret AI output and keep situational awareness across multiple views. — [arXiv 2506.13270](https://arxiv.org/html/2506.13270v2); [Microsoft Research](https://www.microsoft.com/en-us/research/?p=1161985)
- **Accessibility: Flores-Saviaga et al. (arXiv 2503.16491, 2025)**, developers with visual impairments: found AI assistants beneficial but were overwhelmed by too many suggestions; some asked for "AI timeouts". — [arXiv 2503.16491](https://arxiv.org/html/2503.16491v1); [NSF PAR](https://par.nsf.gov/biblio/10590836-impact-generative-ai-coding-assistants-developers-who-visually-impaired)
- Blind and low-vision developers find verifying AI-generated code hard because they cannot rely on visual inspection. — [arXiv 2504.17018](https://arxiv.org/pdf/2504.17018v1.pdf)
- **Operating system**: Windows PATH/installer problems are a long-documented first-week hurdle for beginners (older sources). — [Python edu-sig, 2008](https://www.python.org/pipermail/edu-sig/2008-December/008953.html); [python-dev, 2012](https://www.python.org/pipermail/python-dev/2012-March/117837.html)

### Inferences
- Personas should include a non-native English speaker who writes prompts in their own language and gets confused by English-only error messages and docs; a repo written in plain language helps them.
- A screen-reader user persona will find long agent output and multi-file diffs hard to follow; short summaries and single pass/fail commands help.
- A Windows user persona is likely to hit shell differences (PowerShell vs bash), PATH and line-ending issues earlier than a Mac user (inference; not measured in recent studies).

### Gaps
- No recent study found comparing Windows vs Mac beginners' success with AI coding tools.
- No study found on working in pairs vs alone with AI agents for novices (pair programming with AI exists as a topic, but nothing retrieved here).
- No data found on career changers or older adults specifically.

## 5. Most common Git/GitHub confusions for beginners

### Takeaway
Git research for novices is older and thinner than AI research. The documented themes are being overwhelmed by commands and options, local setup and SSH (authentication), not adopting small iterative commits, and difficulty with basic GitHub workflows; merge conflicts are commonly taught by deliberately causing them.

### Cited Findings
- Wagner & Thurner (Journal of Information Systems Education, 2025): students report feeling overwhelmed by Git's many commands and options, including local setup and SSH connections. — [JISE vol. 36 iss. 1](https://aisel.aisnet.org/jise/vol36/iss1/1)
- Postner et al., ITiCSE poster (listing dated 2026), GitKit data across several institutions: studies student misconceptions and strategies in executing basic GitHub workflows (details not retrieved). — [Drexel research listing](https://researchdiscovery.drexel.edu/esploro/outputs/conferenceProceeding/Student-Misconceptions-and-Strategies-in-GitGitHub/991022194937804721)
- Kapoor et al. (ASEE 2026): in a data structures course, most students had limited interaction with GitHub features without structured resources. — [ASEE PEER](https://peer.asee.org/evaluating-the-impact-of-structured-educational-resources-on-git-github-usage-in-an-introductory-programming-course)
- Isomöttönen & Cochez (2014): challenges and confusions learning Git across several courses; students do not readily adopt iterative workflows and tend to postpone work (older). — [JYX repository](https://jyx.jyu.fi/handle/123456789/44859)
- Eraslan et al. (2020): list of student errors and poor Git practices from a focus group with teaching staff (older). — [METU listing](https://avesis.ncc.metu.edu.tr/yayin/fe20e448-4fe3-4afc-9596-122a8b6704ef/errors-and-poor-practices-of-software-engineering-students-in-using-git)
- GitHub's classroom guidance recommends deliberately introducing merge conflicts in class so students can handle them later (practitioner advice). — [GitHub blog](https://github.blog/developer-skills/career-growth/merge-conflicts-in-the-classroom/)

### Inferences
- For a newcomer persona, the likely Git sticking points are: authentication when pushing (SSH keys or tokens), not knowing what a commit or branch is for, being told "push rejected" because the remote moved, and panicking at merge conflict markers. An AI agent may handle these commands, which hides the concepts until something goes wrong.
- A repo rule like "one intent, one branch, one pull request" asks for a workflow that research suggests beginners do not adopt on their own.

### Gaps
- No 2023-2026 empirical study found that ranks specific Git errors (push rejected, detached HEAD, authentication) by frequency for beginners.
- No study found on how AI agents change novices' Git experience (e.g. agent runs git for them).
