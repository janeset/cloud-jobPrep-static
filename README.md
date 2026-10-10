# Cloud Prep

Cloud engineering prep for AWS and Azure roles around Toronto and Kitchener-Waterloo: an 8-week
track with hands-on labs, AWS certification practice exams, and the skills real Cloud Engineer
postings ask for. No build step, no backend: plain HTML, CSS and JavaScript. Part of [Job Preps](../README.md).

## Run it

```bash
python -m http.server 5175
```

Then visit http://localhost:5175. Opening `index.html` directly also works, but embedded videos need a server.

## What's inside

| Page | What it does |
| --- | --- |
| Home | Track progress, AWS readiness, role readiness, a weekly rhythm and the 8 weeks at a glance |
| Cloud | Overview, roadmap, lessons with AWS vs Azure maps, interview question bank, exam-style quiz, labs with resume bullets, certification paths |
| AWS Certs | Exam prep for CLF-C02 and SAA-C03: official domains and weightings, study notes, readiness checklists, week-by-week plans, timed practice exams and tutor mode with per-domain results |
| Interview | Timed mock interviews (technical questions for Cloud Engineer or AI Cloud Engineer, plus behavioural) with self-scoring; weak answers are flagged "Review again" in the question bank. STAR story bank with theme and skill coverage; history |
| Roles | Cloud Engineer and AI Cloud Engineer: skill demand across postings, self-rating and readiness, an **Add posting** form with skill suggestions, gap lessons with runnable Python exercises, questions, quiz and projects |
| Companies | What cloud interviews look like at each tier of local employer, and an application tracker linked to postings |
| Settings | 9 themes, accent colour, text size, density, plan start date, export / import |
| Search | **Ctrl+K** (or **/**) searches lessons, questions, labs, AWS domains, role skills, postings and your stories |

Python exercises run in the browser via [Pyodide](https://pyodide.org) (loaded from a CDN on first run).

## Files

| File | Contents |
| --- | --- |
| `index.html`, `style.css`, `app.js` | App shell, design system / themes, Home / Companies / Settings and the Python runner |
| `tracks.js` | Video helpers, the track registry and `extendTrack` (loaded first) |
| `cloud.js`, `cloud-more.js` | Cloud track content, and extra lessons, questions and glossary merged into it |
| `trackview.js` | Track engine (overview, learn, questions, quiz, labs, certs) and the Home page |
| `awscerts.js`, `awsview.js` | AWS certification content and the practice-exam engine |
| `roles.js` | Role definitions, the shared skill catalog, skill keywords and built-in postings |
| `roles-learn.js` | Roles lessons, questions, quiz, projects and glossary |
| `roleview.js` | Roles pages: demand, readiness, postings and the add-posting form |
| `interview.js` | Mock interviews, behavioural question bank, STAR story bank and mock history |
| `router.js` | URL routing (`#/cloud/learn/networking`, `#/aws/saa`...): refresh, Back/Forward and bookmarks |
| `search.js` | Search index and the Ctrl+K dialog |

## Your data

Progress is stored in the browser's `localStorage` under `cloud-prep-v1`, including postings you
add, stories and mock history. Use **Settings > Export** to back it up. An export from the
combined Prep Hub app imports here too (its Cloud track, AWS and Roles progress carries over).
