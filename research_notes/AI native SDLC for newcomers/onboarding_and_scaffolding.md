# Onboarding, scaffolding and tool design that help newcomers succeed (especially with AI coding agents)

Scope note: about 16 searches and fetches. Two hosts (www.ime.usp.br, ar5iv.labs.arxiv.org) were blocked by the session's network settings, so some full texts could not be read. Where a number comes from a secondary write-up and not the paper itself, this says so. Evidence strength labels: **Strong** = randomized or controlled study, or a large field experiment; **Moderate** = controlled study with mixed replications, or a large observational study; **Weak** = survey, self-report, vendor's internal figure or practitioner advice.

## Error message design: do enhanced or plain-language messages help novices?

### Takeaway
The evidence is mixed. Rewritten error messages cut repeat errors in one large CS1 study (Becker 2016), but several replications found little or no learning benefit. The best recent randomized study found that LLM-written (GPT-4) explanations mostly did *not* beat standard messages, while short expert-written explanations did best. For a starter repo, the cheap and well-supported move is short, specific, hand-written messages for the few errors newcomers hit most. "Let an LLM explain every error" should not be treated as a proven fix.

### Cited Findings
- Becker et al. (2016, *Computer Science Education* 26(2-3); SIGCSE '16 version): a custom Java IDE rewrote compiler messages for CS1 students. About 200 students produced about 50,000 errors in a control and intervention design. The intervention group made fewer total errors, fewer errors per student and fewer repeated errors, with a significant effect for 8 specific messages. **Moderate** — [Becker et al. 2016](https://core.ac.uk/works/78318990); [SIGCSE '16](https://researchrepository.ucd.ie/entities/publication/d4b1c9ce-e7ff-48e7-b9b9-f0ebe0c15e8e)
- Contradicting evidence: Denny et al. and Pettit et al. found no conclusive evidence that enhanced messages help. Prather et al. (2017) ran a think-aloud study with 31 students and found no substantial gain in learning outcomes over the control, even though most students read the enhanced messages and generally made effective changes — [Prather et al. 2017](https://digitalcommons.acu.edu/info_tech_computing/4)
- ITiCSE 2019 Working Group, "Compiler Error Messages Considered Unhelpful" (Becker et al., DOI 10.1145/3344429.3372508). It reviews about 300+ papers (Dagstuhl cites 330 papers, 1965–2019) and curates design guidelines, tagging each by the kind of evidence behind it: historical, anecdotal or empirical. It is a map of the research, not a single proven recipe — [WG site](https://iticse19-wg10.github.io); [Never Work in Theory summary](https://neverworkintheory.org/2021/09/02/compiler-error-messages-considered-unhelpful.html); [Dagstuhl report](https://drops.dagstuhl.de/storage/04dagstuhl-reports/volume12/issue01/22052/html/DagRep.12.1.119/DagRep.12.1.119.html)
- A later randomized experiment with over 700 novices tested messages built to the published guidelines. It reported shorter debugging times and higher self-rated usefulness than standard messages. This comes from a search summary; I could not open the paper to confirm authors and effect sizes. **Moderate (unverified detail)** — [search-surfaced record](https://dx.doi.org/10.1145/3545947.3576243)
- Error message *readability* has been studied separately as a factor in novice debugging (Denny et al., ITiCSE 2020) — [record](https://scispace.com/papers/error-message-readability-and-novice-debugging-performance-742o5sde3a)
- Leinonen, Hellas, Sarsa, Reeves, Denny, Prather and Becker (SIGCSE TS 2023): LLM (Codex) explanations of error messages were sometimes more interpretable and actionable than the originals. This was an evaluation of the outputs, not a learning trial — [arXiv 2210.11630](https://arxiv.org/abs/2210.11630v1)
- Santos and Becker (2024), "Not the Silver Bullet: LLM-enhanced Programming Error Messages are Ineffective in Practice". Within-subjects design, N=106, six buggy C programs, each shown with a stock compiler message, an expert hand-written explanation or a GPT-4 explanation. GPT-4 beat stock messages on time-to-fix in only 1 of 6 tasks. Hand-written explanations did best on both objective and subjective measures. **Strong (single study)** — [arXiv 2409.18661](https://arxiv.org/pdf/2409.18661)
- Microsoft Research has also published on how compilers should explain problems to developers (Barik et al.) — [MSR page](https://www.microsoft.com/en-us/research/publication/how-should-compilers-explain-problems-to-developers/)

### Inferences
- Pattern for the starter: the repo's own tools (hooks, `npm run check`, test failures) should print short, specific messages in plain language. Each one should say what happened, why it matters and the exact next command to run. Hand-write these for the 10–20 failures newcomers will hit most. The evidence favours expert-written over generated text.
- Expect enhanced messages to reduce *repeated* errors and frustration more than they raise "learning" scores. That is still worth having for a newcomer working alone.
- An AI agent explaining an error is not the same as a good error message. Santos and Becker 2024 suggests the agent's explanation should not stand in for a clear, deterministic message from the tool.

### Gaps
- I did not retrieve primary sources on the design of Elm or Rust error messages (for example Czaplicki's "Compiler Errors for Humans", 2015, or Rust's diagnostic guidelines). Their influence is widely cited by practitioners, but I found no controlled outcome data in this session.
- I could not verify the authors or effect size of the 700+ novice guideline-based randomized study.

## Scaffolding and worked examples, and how they carry over to AI-assisted work

### Takeaway
In computing education, Parsons problems (putting given lines of code in the right order) are a well-replicated way to practise. Learners finish them faster than writing code from scratch, with the same learning gains. With AI, "guardrailed" structure (tutors that guide rather than hand over answers) protects learning. Unstructured AI access improves practice scores and then harms performance once the AI is taken away.

### Cited Findings
- Ericson, Margulieux and Rick (Koli Calling 2017) and Ericson's dissertation: learners solve Parsons problems significantly faster than fixing or writing the same code, with the same pretest-to-posttest learning gains. A 2019 adaptive Parsons study replicated this ("more efficient, but just as effective"). **Moderate–Strong** (replicated, but mostly by one research group) — [GA Tech dissertation summary](https://hg.gatech.edu/node/603172); [adaptive Parsons 2019](https://www.bibsonomy.org/bibtex/2b2617611446ed22e870de6f4d75f9ab8/brusilovsky)
- ITiCSE 2022 working group systematic review "Parsons Problems and Beyond", plus a 2023 multi-institutional, multi-national follow-up, which summarizes that Parsons problems are typically faster than writing from scratch with equivalent learning gains — [Aalto record](https://aaltodoc.aalto.fi/items/a77c8afa-0f57-4ef6-85d2-4f982776677c); [Strathclyde record](https://pureportal.strath.ac.uk/en/publications/multi-institutional-multi-national-studies-of-parsons-problems/)
- No formal meta-analysis comparing Parsons problems with writing code was found — [search finding; see sources above](https://doi.org/10.1145%2F3560266)
- Bastani et al. (PNAS 2025, vol. 122 no. 26). Field experiment, about 1,000 high school math students. During AI-assisted practice, grades improved +48% with "GPT Base" (plain ChatGPT-like) and +127% with "GPT Tutor" (prompts that give hints, not answers). On the later exam without AI, GPT Base students scored 17% *worse* than the control group, while GPT Tutor students scored about the same as the control group (guardrails removed the harm, but added no exam gain). **Strong** — [PNAS via RePEc](https://ideas.repec.org/a/nas/journl/v122y2025pe2422633122.html); [Wharton summary](https://knowledge.wharton.upenn.edu/article/without-guardrails-generative-ai-can-harm-education); [SSRN](https://papers.ssrn.com/abstract=4895486)
- Kazemitabaar et al. (CHI 2023): 69 novices aged 10–17, 3 weeks of Python, with or without a Codex code generator. Retention a week later: coding 59% vs 50%, multiple choice 44% vs 35%, in favour of Codex (not significant overall). Learners with higher prior skill who used Codex did significantly better (about 74% vs 60%). Codex did not reduce the ability to modify code by hand. **Moderate** — [arXiv 2302.07427](https://arxiv.org/abs/2302.07427?context=cs); [Henley summary](https://austinhenley.com/blog/learningwithai.html)
- A follow-up log analysis of the same study linked *how* novices used the generator (for example, writing their own code and asking for small help, versus asking for whole solutions) to retention — [arXiv 2309.14049](https://arxiv.org/pdf/2309.14049)

### Inferences
- Pattern for the starter: provide **fill-in templates** for intent, spec and plan (the AI-era equivalent of worked examples and Parsons-style "arrange the given parts"). Include one fully worked example per document type, then fade to partly filled templates. This uses the efficiency finding: structure lowers effort without lowering learning.
- Pattern: the agent's default behaviour for newcomers should look like "GPT Tutor" (guide, explain, ask) and not "GPT Base" (just do it), at least for the parts the newcomer has to understand to stay in control: the plan, the tests, and reading the diff. Bastani shows that unstructured help raises output today and can lower skill tomorrow.
- The prior-skill effect (Kazemitabaar 2023; see also "Widening Gap" below) means scaffolds matter most for the weakest newcomers. Do not tune defaults only for confident users.

### Gaps
- I did not retrieve primary sources for classic worked-example or cognitive-load studies (Sweller and Cooper 1985; Renkl's fading research). They are foundational but not cited here.
- I found no controlled study of structured prompting templates or guided agent workflows (for example spec-first or plan-mode) with *novice* builders as the outcome measure. The carry-over to AI agents is inferred, not measured.

## Developer onboarding: what helps new contributors

### Takeaway
Newcomers in open source mostly fail on "finding a way to start", documentation and social barriers. Curated starter tasks help, but alone they are not enough: about 41% of "good first issues" are not solved by newcomers. Industry onboarding research points to a buddy plus a mentor, a small first task merged in the first week, and documentation that is kept up to date.

### Cited Findings
- Steinmacher, Silva and Gerosa (2014 book chapter, 21 studies) and Steinmacher et al. (2015, *Information and Software Technology*, DOI 10.1016/j.infsof.2014.11.001, 291 studies retrieved from 4 libraries). Barrier categories: Social Interactions, Finding a Way to Start, Documentation Problems, Code Issues (including setting up the local workspace), and Newcomers' Knowledge. **Moderate** (systematic review) — [NAU record](https://experts.nau.edu/en/publications/a-systematic-literature-review-on-the-barriers-faced-by-newcomers/); [Springer chapter](https://link.springer.com/content/pdf/10.1007/978-3-642-55128-4_21.pdf); [UCI ISR](https://isr.uci.edu/node/2204.html)
- Steinmacher et al., CSCW 2015 (FLOSScoach portal, built on the barrier model to guide newcomers) — [paper PDF (host blocked, not read)](https://www.ime.usp.br/~gerosa/papers/CSCW_2015.pdf)
- Tan, Zhou and Sun, "A First Look at Good First Issues on GitHub" (ESEC/FSE 2020). 9,368 good first issues (GFIs) from 816 popular projects, plus surveys. GFI use is growing, but GFIs take longer to close than other issues. As cited by GFI-Bot (FSE 2022), 40.9% of GFIs are not solved by newcomers, and 31.2% of newcomers fail to solve a GFI even after several attempts. **Moderate** — [FSE 2020 page](https://2020.esec-fse.org/details/fse-2020-papers/172/A-First-Look-at-Good-First-Issues-on-GitHub); [GFI-Bot 2022](https://hehao98.github.io/files/2022-gfibot.pdf)
- "Is It Enough to Recommend Tasks to Newcomers?" (2023) and the Never Work in Theory write-up "Mentoring on Good First Issues" (2023) argue that recommending a task alone is not enough: mentoring on the task matters — [arXiv 2302.05058](https://ar5iv.labs.arxiv.org/html/2302.05058); [NWIT](https://neverworkintheory.org/2023/04/26/mentoring-on-good-first-issues.html)
- Rodeghero, Zimmermann, Houck and Ford (ICSE SEIP 2021): survey of 267 Microsoft new hires who onboarded remotely in 2020. Building a bond with the team was one of the biggest challenges. 72.9% said remote communication sessions lasted under 30 minutes. Recommendations (from the talk transcript): give the new hire an onboarding buddy *and* a separate technical mentor, and a simple first task so they land a pull request within the first week. The paper also calls for documentation on how things actually work, kept up to date. **Weak–Moderate** (survey) — [arXiv 2011.08130](https://arxiv.org/abs/2011.08130); [NWIT review](https://neverworkintheory.org/2022/03/28/remote-onboarding.html); [talk transcript](https://neverworkintheory.org/static/2022-04/rodeghero-paige-en.txt); [DX summary](https://getdx.com/research/remote-onboarding-of-software-developers/)

### Inferences
- Patterns for the starter, each tied to a Steinmacher barrier:
  - **One-command setup and run** (workspace setup barrier): `npm run start`, `npm run test` and `npm run check`, with no other install steps.
  - **"Your first task" path** (finding-a-way-to-start barrier): a pre-written, tiny first change, used like a GFI, plus an explicit "the agent is your mentor" script. The GFI data says a task with no guidance has about a 40% failure rate.
  - **Short, current README and CLAUDE.md** (documentation barrier), checked automatically so they do not go stale.
- Early win: aim for a merged first pull request in the first session, to mirror "PR in the first week".

### Gaps
- I found no controlled outcome study of dev containers or one-command setup on newcomer success (only practitioner claims). The SPACE and DX frameworks were not retrieved in this session.
- I could not confirm the commonly cited "58 barriers" count (the full text of Steinmacher 2015 was not reachable).

## Guardrails UX: permission prompts, approval fatigue, safe defaults, undo

### Takeaway
Agent vendors themselves name "approval fatigue" as a safety problem: too many prompts lead people to click through without reading. Anthropic reports that sandboxing (limits on which files and which network hosts the agent can reach) cut permission prompts by 84% in internal use. The evidence-backed direction is to make safe actions free inside a sandbox, keep prompts rare and meaningful, and block the truly dangerous actions outright. Asking about everything is not that direction.

### Cited Findings
- Anthropic engineering blog: by default Claude Code is read-only and asks permission before making changes or running commands. This "can lead to 'approval fatigue', where users might not pay close attention to what they're approving". Sandboxing "safely reduces permission prompts by 84%" (Anthropic internal usage). It combines filesystem isolation (writes limited to the working directory) with network isolation (a proxy that only allows approved domains and asks about new ones). The post argues both are needed: without network isolation, an agent could leak files such as SSH keys. **Weak–Moderate** (vendor's internal measure, method not published) — [Anthropic engineering: Claude Code sandboxing](https://www.anthropic.com/engineering/claude-code-sandboxing); [Claude Code sandboxing docs](https://docs.claude.com/en/docs/claude-code/sandboxing); [InfoQ coverage](https://www.infoq.com/news/2025/11/anthropic-claude-code-sandbox)
- Practitioner caveats: on Linux and WSL2 the sandbox needs bubblewrap and socat installed. Users have reported that the VS Code extension did not honour the sandbox setting at one point — [claudefa.st guide](https://claudefa.st/blog/guide/sandboxing-guide); [GitHub issue](https://github.com/anthropics/claude-code/issues/64061)
- An "84% = 100 prompts down to 16" Medium example is an illustration someone made up, not a measurement — [Medium](https://medium.com/@joe.njenga/how-to-use-new-claude-code-sandbox-to-autonomously-code-without-security-disasters-c6efc5e8e652)
- Buçinca et al. (2021, below): the designs that most reduced over-reliance were also the *least liked*. Friction that protects people is unpopular, so guardrails have to be cheap in time and attention — [Buçinca et al. 2021](https://www.eecs.harvard.edu/~kgajos/papers/2021/bucinca2021trust.shtml)

### Inferences
- Patterns for the starter:
  - **Safe-by-default sandbox** with allow-lists for routine commands (test, lint, check), so prompts happen only for the risky actions the owner has named (push to main, deletes, guardrail edits).
  - **Hard blocks via hooks, not prompts**, for actions that should never happen, such as writing secrets or force-pushing. A hook can't be clicked through.
  - **Undo**: branches and small pull requests make every change reversible. Explain this to newcomers so that "allow" feels safe.
  - Watch the prompt rate. If the newcomer is approving dozens of prompts per session, fatigue has set in.

### Gaps
- I found no peer-reviewed usability study of coding-agent permission prompts (Claude Code, Cursor, Copilot agent mode). The approval-fatigue claim rests on vendor framing plus older security-warning research (habituation to warnings), which I did not retrieve in this session.
- I did not retrieve the official docs for Cursor or Copilot agent approvals, or the Claude Code permission-modes and hooks docs page itself.

## Teaching testing and review; explanations and self-review against over-reliance

### Takeaway
Cognitive forcing functions (checklists, deciding before seeing the AI's answer, waiting before showing it) significantly reduce over-reliance on AI. They do not eliminate it, people dislike them, and they help people who enjoy effortful thinking the most. Survey data from knowledge workers shows that trusting the AI more goes with thinking critically less, and that people with little domain knowledge struggle to verify AI output: exactly the newcomer case.

### Cited Findings
- Buçinca, Malaya and Gajos (CSCW 2021, *PACM HCI* 5(CSCW1)): 199 Mechanical Turk participants. Three cognitive forcing designs were compared with two simple explainable-AI designs and a no-AI baseline. The forcing functions significantly reduced over-reliance compared with simple explanations. Participants still relied on wrong AI answers in cases where they would have done better alone. The most effective designs got the lowest preference ratings. The benefit was larger for people high in Need for Cognition (a trait: enjoying effortful thinking). **Strong (single experiment, non-coding task)** — [Harvard page](https://www.eecs.harvard.edu/~kgajos/papers/2021/bucinca2021trust.shtml); [arXiv 2102.09692](https://arxiv.org/abs/2102.09692v1)
- Lee et al. (CHI 2025, DOI 10.1145/3706598.3713778): survey of 319 knowledge workers about 936 real tasks. Higher confidence in GenAI went with less critical thinking, and higher self-confidence with more. GenAI shifts critical thinking toward checking information, combining responses and overseeing the task. Some participants (reported as 58) said limited domain knowledge made it hard to verify AI output (count taken from secondary coverage). **Weak–Moderate** (self-report) — [Microsoft Research](https://www.microsoft.com/en-us/research/?p=1135061); [author PDF](https://advait.org/files/lee_2025_ai_critical_thinking_survey.pdf); [ppc.land coverage](https://ppc.land/study-reveals-complex-shift-in-workplace-critical-thinking-due-to-ai-tools/)

### Inferences
- Patterns for the starter:
  - **Predict-then-reveal**: before the agent builds, the newcomer writes or approves the expected behaviour as tests (test-first). The test is a forcing function that is also useful work, which helps with the "people dislike friction" problem.
  - **Short self-review checklist** before a pull request: "What changed? Why? How did you check it?", answered in the newcomer's own words, plus an agent review against REVIEW.md.
  - **Ask the agent to explain the diff in plain language** and have the newcomer confirm they understand it. Keep it short, given the preference cost.
- Because forcing functions help people high in Need for Cognition the most, pair them with low-effort supports (templates, examples) so less motivated newcomers are not left out.

### Gaps
- I found no controlled study in this session on *test-first with AI* for novices, or on teaching code review to beginners. These patterns are inferred from the forcing-function literature.

## Metacognitive supports for AI-assisted novices

### Takeaway
Tools designed to support learning (CodeAid, the CS50 Duck, GPT Tutor) avoid handing over full solutions and steer students to understanding. They are well received and, in the one large field experiment, prevent the learning harm of plain ChatGPT. Generative AI tends to *widen* the gap: stronger novices speed up, while struggling novices pick up new metacognitive problems (trouble planning, monitoring and judging their own work).

### Cited Findings
- Kazemitabaar et al., CodeAid (CHI 2024): deployed for 12 weeks in a C/Systems course of about 700 students, with more than 8,000 interactions, 10 weekly surveys, 22 interviews and 8 educator interviews. Students used it mostly for concepts and debugging; a minority tried to get direct code. Educators liked the approach but worried about occasional wrong feedback and students defaulting to ChatGPT. Design advice includes avoiding direct answers while encouraging motivated learning, and keeping students able to see and steer how responses are produced. **Moderate** (deployment, not an RCT) — [arXiv 2401.11314](https://arxiv.org/abs/2401.11314)
- CS50.ai / CS50 Duck (Liu et al., SIGCSE 2024): "pedagogical guardrails" that guide rather than give solutions. Rolled out to about 70 summer students, then thousands online, then about 500 on campus. Talk slides report questions to teaching fellows per student fell from 0.89 to 0.28 with AI, about 317K users and about 21K prompts a day (presentation figures, not peer-reviewed outcomes). SIGCSE 2025 follow-up: the AI did not always teach the way instructors wanted, and staff preferred the improved version. **Weak–Moderate** — [paper PDF](https://cs.harvard.edu/malan/publications/V1fp0567-liu.pdf); [slides](https://docs.google.com/presentation/d/1xQPkTsw5E9ytBKq0WDpwgESLYyDMkZ5nMkddbIHWipI/htmlpresent); [Harvard Magazine](https://www.harvardmagazine.com/node/84551); [SIGCSE 2025 talk](https://rosetta.to/u/cs50/sigcse-2025-improving-cs50-with-ai)
- Prather et al., "It's Weird That it Knows What I Want" (ACM TOCHI 2023, vol. 31, art. 4): observations and interviews of novices using Copilot found both cognitive and metacognitive difficulties. The authors call for tools that scaffold novices — [arXiv 2304.02491](https://arxiv.org/abs/2304.02491v1)
- Prather et al., "The Widening Gap" (ICER 2024): known metacognitive difficulties persist, and GenAI can compound them and add new ones for struggling students, while other students use it well to solve problems faster — [record](https://bohrium.dp.tech/paper/arxiv/2405.17739)
- Bastani et al. (PNAS 2025): a guardrailed tutor removed the 17% exam harm of unguarded AI (see the scaffolding section) — [Wharton](https://knowledge.wharton.upenn.edu/article/without-guardrails-generative-ai-can-harm-education)

### Inferences
- Patterns for the starter:
  - **Agent persona for newcomers** that explains before acting, shows its plan, and asks the owner to predict or confirm. This copies CodeAid's design choices.
  - **Visible plan and status trail** (intent, then spec, then plan docs) as a metacognitive aid: it puts "what am I doing and why" outside the newcomer's head, which addresses the planning and monitoring difficulties Prather describes.
  - **A way out when stuck**: since struggling novices are hurt most, give an explicit "I'm lost" route (a slash command or skill that summarises the state and the next step) instead of letting them keep re-prompting.

### Gaps
- I did not retrieve measured effects for Khanmigo. I found no peer-reviewed outcome data in this session.
- The full numbers in "The Widening Gap" (participant count, task design) could not be read (host blocked).
- I found no study of metacognitive supports for *non-student, adult first-time builders* using autonomous coding agents (as opposed to completion tools or chat tutors). This is the most relevant population for this project, and it is unstudied in what I found.
