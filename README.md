# Cloud Prep

Cloud engineering prep for AWS and Azure roles around Toronto and Kitchener-Waterloo: a phased plan
from zero to five AWS certifications (Cloud Practitioner, AI Practitioner, Solutions Architect –
Associate, Developer – Associate, Solutions Architect – Professional), with hands-on labs, AWS
certification practice exams, and the skills real Cloud Engineer postings ask for. No build step, no backend: plain HTML, CSS and JavaScript. One of four Job Preps apps, each in its own repo: DSA Prep, Cloud Prep, AI / LLM Prep and System Design Prep.

## Run it

```bash
python -m http.server 5175
```

Then visit http://localhost:5175. Opening `index.html` directly also works, but embedded videos need a server.

## What's inside

| Page | What it does |
| --- | --- |
| Home | "Where are you starting from?" (new to IT, or already in IT) and one next step ("Today: Lesson 1", then Continue). Progress, the plan's phases, AWS and role readiness and a weekly rhythm sit under **More** |
| Cloud | **Cloud from zero** (five plain-language lessons for people with no IT background: computers and servers, how the internet works, the command line, what the cloud is, accounts and security), then 24 topics (including Linux, Bash, Python for automation, Terraform basics, billing and three AWS deep dives). Each lesson defines its terms, leads with the cloud you follow (AWS, Azure or both) and ends with checks; a lesson is complete when its checks are all answered correctly. Also: a roadmap in six phases, each ending in an AWS exam, with target dates at your pace (10, 12 or 15 hours a week), interview question bank, exam-style quiz, labs (each step has the expected result, a hint and an example; every lab starts with a cost warning and ends with a clean-up step), AWS certifications (Certs) and Azure / Google Cloud certifications (Other certifications) |
| AWS Certs | Exam prep for CLF-C02 and SAA-C03: official domains and weightings, study notes, readiness checklists, week-by-week plans, timed practice exams and tutor mode with per-domain results |
| Interview | Timed mock interviews (technical questions for Cloud Engineer or AI Cloud Engineer, plus behavioural) with self-scoring; weak answers are flagged "Review again" in the question bank. STAR story bank with theme and skill coverage; history |
| Roles | Cloud Engineer and AI Cloud Engineer: skill demand across postings, self-rating and readiness, an **Add posting** form with skill suggestions, gap lessons with runnable Python exercises, questions, quiz and projects |
| Companies | What cloud interviews look like at each tier of local employer, and an application tracker linked to postings |
| Settings | Where you're starting from, which cloud you follow, hours a week, 9 themes, accent colour, text size, density, plan start date, export / import |
| Search | **Ctrl+K** (or **/**) searches lessons, questions, labs, AWS domains, role skills, postings and your stories |

Python exercises run in the browser via [Pyodide](https://pyodide.org) (loaded from a CDN on first run).

## Files

| File | Contents |
| --- | --- |
| `index.html`, `style.css`, `app.js`, `favicon.svg` | App shell, design system / themes, Home / Companies / Settings and the Python runner |
| `tracks.js` | Video helpers, the track registry and `extendTrack` (loaded first) |
| `cloud.js`, `cloud-more.js` | Cloud track content, and extra lessons, exercises (with hints and model answers), questions and glossary merged into it |
| `cloud-skills.js` | Linux, Bash, Python for automation and Terraform basics lessons |
| `cloud-aws.js` | AWS exam-depth lessons: billing, pricing & support, and the networking, storage / databases and security deep dives |
| `cloud-zero.js` | Cloud from zero (the beginner lessons and their checks), the lesson order for each path, and short Learn addresses |
| `cloud-plan.js` | The study plan (phases, weeks and exams) and the certifications shown in Certs and Other certifications |
| `trackview.js` | Track engine (overview, learn, questions, quiz, labs, certs), the Learn path and checks-based completion, the progress migration, and the Home page |
| `awscerts.js`, `awsview.js` | AWS certification content and the practice-exam engine |
| `roles.js` | Role definitions, the shared skill catalog, skill keywords and built-in postings |
| `roles-learn.js` | Roles lessons, questions, quiz, projects and glossary |
| `roleview.js` | Roles pages: demand, readiness, postings and the add-posting form |
| `interview.js` | Mock interviews, behavioural question bank, STAR story bank and mock history |
| `router.js` | URL routing (`#/cloud/learn/networking`, `#/aws/saa`...): refresh, Back/Forward and bookmarks |
| `search.js` | Search index and the Ctrl+K dialog |
| `TODO-content.md` | Lessons and exam pages still to write for the plan's later phases |

## Your data

Progress is stored in the browser's `localStorage` under `cloud-prep-v1`, including postings you
add, stories and mock history. Use **Settings > Export** to back it up. Older progress loads as before, except that
topics marked "reviewed" in earlier versions are no longer counted as complete: a topic is now completed by answering its checks. An export from the
combined Prep Hub app imports here too (its Cloud track, AWS and Roles progress carries over).
