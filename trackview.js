"use strict";
// Track engine for Cloud Prep (data in cloud.js) and the Roles lessons, plus the Home page.
// Loaded before app.js; it only calls app.js helpers (esc, $, vids, yt, execPy, render, S, save,
// today, dayDiff, streak...) at event/render time, after app.js has run.

TRACKS.cloud = CLOUD;
CLOUD.earned = true; // topics complete through their checks (topicDone)

const TRACK_TABS = (id) => TRACKS[id].tabs || [["overview", "Overview"], ["roadmap", "Roadmap"], ["learn", "Learn"], ["questions", "Questions"], ["quiz", "Quiz"], ["labs", TRACKS[id].labsName], ["certs", "Certs"]];
const CERT_STATUSES = ["Not planned", "Planning", "Studying", "Booked", "Passed"];
const TRACK_ICON = {
  cloud: `<svg viewBox="0 0 24 24"><path d="M7 18h10.5a4 4 0 0 0 .4-8A6 6 0 0 0 6.4 9.2 4.5 4.5 0 0 0 7 18z"/></svg>`,
  aws: `<svg viewBox="0 0 24 24"><circle cx="12" cy="9" r="5"/><path d="M8.5 13 7 21l5-2.5L17 21l-1.5-8"/></svg>`,
};

function sectionOf(t) {
  const m = /^(cloud|aws|roles|interview):/.exec(t);
  return m ? m[1] : null;
}

// Cloud's state carries a version (v) so migrateCloud knows saved progress is already in the new shape.
function trState(id) {
  S.tr = S.tr || {};
  S.tr[id] = Object.assign({ start: null, read: {}, qa: {}, quiz: {}, labs: {}, certs: {}, ex: {}, sel: null }, id === "cloud" ? { v: 2, pick: {} } : null, S.tr[id] || {});
  return S.tr[id];
}
function bump() { const t = today(); S.activity[t] = (S.activity[t] || 0) + 1; }
function trackWeek(id) {
  const st = trState(id), T = TRACKS[id];
  if (!st.start) return 0;
  return Math.min(trWeeks(T).length, Math.max(1, Math.floor(dayDiff(st.start, today()) / 7) + 1));
}
const labDone = (id, lab) => lab.steps.every((_, k) => trState(id).labs[`${lab.id}:${k}`]);
const labSteps = (id, lab) => lab.steps.filter((_, k) => trState(id).labs[`${lab.id}:${k}`]).length;
function trackProgress(id) {
  const T = TRACKS[id], st = trState(id), topics = learnPath(T);
  const read = topics.filter((t) => topicDone(T, st, t.id)).length, labs = T.labs.filter((l) => labDone(id, l)).length;
  const answered = Object.keys(st.quiz).length, correct = Object.values(st.quiz).filter(Boolean).length;
  const got = T.questions.filter((q) => st.qa[q.id] === "got").length;
  const exTotal = T.topics.reduce((n, t) => n + (t.exercises || []).length, 0), exDone = Object.keys(st.ex).filter((k) => st.ex[k]).length;
  // The ring shows lessons; labs are counted separately (progressText), so every page shows the same two numbers.
  return { read, topics: topics.length, labs, labsTotal: T.labs.length, answered, correct, got, exTotal, exDone, pct: topics.length ? read / topics.length : 0 };
}
const progressText = (p) => `${p.read}/${p.topics} lessons · ${p.labs}/${p.labsTotal} labs`;

// ---------------- the Learn path (Cloud) ----------------
// Home asks where you're starting from. New to IT (the default until you choose): Cloud from zero,
// then the topics in an order that builds on itself (groupsNew / weeksNew in cloud-zero.js).
// Already in IT: the original order, with Cloud from zero shown as optional and left off the path.
// Tracks without groupsNew (Roles) keep their own groups and order.
const LEVELS = [["new", "I'm new to IT and cloud"], ["it", "I already work in IT or software"]];
const beginner = () => S.level !== "it";
const trGroups = (T) => (T.groupsNew && beginner() ? T.groupsNew : T.groups);
const trWeeks = (T) => (T.weeksNew && beginner() ? T.weeksNew : T.weeks);
const isZero = (T, tid) => !!T.zero && T.zero.includes(tid);
// Sidebar order, used for Previous / Next.
const sideOrder = (T) => (T.groupsNew ? trGroups(T).flatMap(([, ids]) => ids).map((tid) => topicById(T, tid)) : T.topics);
const learnPath = (T) => sideOrder(T).filter((t) => beginner() || !isZero(T, t.id));
const learnNext = (T, st) => learnPath(T).find((t) => !topicDone(T, st, t.id));
// "Cloud from zero: Computers, servers and networks" where a bare title would be ambiguous (Home, Next).
const topicLabel = (T, t) => (isZero(T, t.id) ? `Cloud from zero: ${t.title}` : t.title);

// A topic is complete when every check (the quiz questions tagged with its id) is answered
// correctly, on the topic page or in the Quiz tab. There's no "mark as reviewed" for Cloud.
// Tracks without `earned` (Roles) still complete a lesson by marking it reviewed.
const topicChecks = (T, tid) => T.quiz.filter((q) => q.topic === tid);
function topicDone(T, st, tid) {
  if (!T.earned) return !!st.read[tid];
  const qs = topicChecks(T, tid);
  return qs.length > 0 && qs.every((q) => st.quiz[q.id] === true);
}

// Which cloud the lessons lead with: "aws" (the default, so beginners learn one provider's names),
// "azure", or "both" side by side.
const CLOUD_PICKS = [["aws", "AWS"], ["azure", "Azure"], ["both", "AWS and Azure"]];
const cloudPick = () => S.cloudPick || "aws";
const LEAN_NOTE = "Applying to banks and insurers? Lean Azure. Startups and mid-size tech? Lean AWS.";
const TIMELINE_NOTE = "8 weeks gets you to cloud-practitioner level. Interview-ready for a cloud engineer role typically takes several months of hands-on labs, Linux, and scripting.";
// The track's one-line description, naming the cloud you follow.
const trTagline = (T) => T.id !== "cloud" || cloudPick() === "both" ? T.tagline
  : cloudPick() === "aws" ? "AWS for interviews, hands-on labs and certifications, with the Azure names alongside" : "Azure for interviews, hands-on labs and certifications, with the AWS names alongside";
const PV_RE = /\[\[([^|\]]+)\|([^\]]+)\]\]/g;
// Lesson text names services as [[AWS name|Azure name]]. Following one cloud shows its name first
// and the other as "(on Azure: ...)"; following both shows them side by side.
function pv(s) {
  const pick = cloudPick();
  return String(s).replace(PV_RE, (_, a, z) => pick === "aws" ? `${a} <span class="pv-alt">(on Azure: ${z})</span>`
    : pick === "azure" ? `${z} <span class="pv-alt">(on AWS: ${a})</span>`
    : a.length > 40 || z.length > 40 ? `<span class="pv-tag">AWS</span> ${a}; <span class="pv-tag">Azure</span> ${z}` : `${a} / ${z}`);
}
const pvPlain = (s) => String(s).replace(PV_RE, "$1 / $2");
const pickSeg = () => `<div class="seg pick-seg">${CLOUD_PICKS.map(([v, l]) => `<button data-cloudpick="${v}" class="${cloudPick() === v ? "on" : ""}">${l}</button>`).join("")}</div>`;

// Learn addresses: ids, short names ("k8s", "1") and a few obvious words open their lesson.
function resolveTopic(T, key) {
  if (!key) return null;
  if (key === "courses" || key === "glossary" || topicById(T, key)) return key;
  const k = String(key).toLowerCase(), slug = (s) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const t = T.topics.find((t) => t.id === k || (t.short || "").toLowerCase() === k || slug(t.title) === k);
  return t ? t.id : (T.aliases || {})[k] || null;
}

// Progress saved before checks decided completion: "Mark as reviewed" no longer completes a Cloud
// topic, so the old marks move to readOld (kept, and shown as a note on the topic), and lab ticks
// follow their steps to the new positions (each step's `old` index). Nothing else is touched.
// Runs on load and after an import (app.js), before anything calls trState.
function migrateCloud(s) {
  const c = s && s.tr && s.tr.cloud;
  if (!c || c.v >= 2) return s;
  if (c.read && Object.keys(c.read).length) c.readOld = Object.assign({}, c.readOld, c.read);
  c.read = {};
  const old = c.labs || {}, labs = {};
  for (const [k, v] of Object.entries(old)) if (!CLOUD.labs.some((l) => k.startsWith(l.id + ":"))) labs[k] = v;
  CLOUD.labs.forEach((l) => l.steps.forEach((step, k) => { if (step.old !== undefined && old[`${l.id}:${step.old}`]) labs[`${l.id}:${k}`] = true; }));
  c.labs = labs; c.pick = c.pick || {}; c.v = 2;
  return s;
}
function ring(pct, label, size = 120) {
  const C = 2 * Math.PI * 52;
  return `<div class="ring" style="width:${size}px;height:${size}px"><svg viewBox="0 0 120 120"><circle class="track" cx="60" cy="60" r="52" fill="none" stroke-width="10"/>
    <circle class="prog" cx="60" cy="60" r="52" fill="none" stroke-width="10" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - pct)}"/></svg>
    <div class="ring-label"><b>${Math.round(pct * 100)}%</b><span>${label}</span></div></div>`;
}
// Cross-links can name a track this version doesn't have; those come back undefined.
const topicById = (T, tid) => (T ? T.topics.find((t) => t.id === tid) : undefined);
const channelLink = (T, prefix = "") => T.channel ? `<a class="btn small ghost" href="${T.channel.url}" target="_blank" rel="noopener">${prefix}${esc(T.channel.name)} channel &nearr;</a>` : "";
const goLearn = (id, tid) => `data-trgo="${id}|learn|${tid}"`;

// ---------------- navigation ----------------
function renderNav() {
  const sec = sectionOf(tab);
  document.querySelectorAll("#nav button").forEach((b) => b.classList.toggle("active", (b.dataset.nav && b.dataset.nav === tab) || (!!b.dataset.track && b.dataset.track === sec)));
  const sub = $("#subnav");
  if (!sub) return;
  if (!sec) { sub.hidden = true; sub.innerHTML = ""; return; }
  const items = sec === "aws" ? AWS_TABS.map(([k, l]) => ["aws:" + k, l]) : sec === "interview" ? IV_TABS.map(([k, l]) => ["interview:" + k, l]) : TRACK_TABS(sec).map(([k, l]) => [sec + ":" + k, l]);
  sub.hidden = false;
  sub.innerHTML = `<div class="subnav-inner"><span class="subnav-title t-${sec}">${TRACK_ICON[sec]}${sec === "aws" ? "AWS Certs" : sec === "interview" ? "Interview" : esc(TRACKS[sec].name)}</span>
    <div class="subnav-tabs">${items.map(([k, l]) => `<button data-tab="${k}" class="${k === tab ? "active" : ""}">${esc(l)}</button>`).join("")}</div></div>`;
}
// The page a top-level section opens on the first time.
const defaultTab = (k) => (k === "interview" ? "interview:mock" : k + ":overview");
function go(t) {
  tab = t;
  const s = sectionOf(t);
  if (s) { S.lastTab = S.lastTab || {}; S.lastTab[s] = t; save(); }
  render();
  window.scrollTo(0, 0);
}

// ---------------- home ----------------
function homeView() {
  const hr = new Date().getHours(), hello = hr < 12 ? "Good morning" : hr < 18 ? "Good afternoon" : "Good evening";
  const dateStr = new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
  const st = streak(), todayCount = S.activity[today()] || 0;
  const T = TRACKS.cloud, s = trState("cloud"), wk = trackWeek("cloud"), weeks = trWeeks(T);
  const path = learnPath(T), next = learnNext(T, s), done = path.filter((t) => topicDone(T, s, t.id)).length;
  const fresh = !done && !Object.keys(S.activity).length;
  const zeroDone = T.zero.filter((tid) => topicDone(T, s, tid)).length;

  const trackCard = (id) => {
    const T = TRACKS[id], s = trState(id), p = trackProgress(id), wk = trackWeek(id), weeks = trWeeks(T);
    const w = wk ? weeks[wk - 1] : weeks[0], nextTopic = learnNext(T, s);
    return `<div class="card track-card t-${id}">
      <div class="tc-head"><span class="tc-icon">${TRACK_ICON[id]}</span><div><h3>${esc(T.name)}</h3><p class="muted">${esc(trTagline(T))}</p></div></div>
      <div class="tc-body">${ring(p.pct, `${p.read}/${p.topics} lessons`, 104)}
        <div class="tc-meta"><div class="label">${wk ? `Week ${wk} of ${weeks.length}` : "Plan not started"}</div><div>${esc(w.title)}</div>
          ${nextTopic ? `<div class="muted">Next: ${esc(topicLabel(T, nextTopic))}</div>` : ""}
          <div class="muted">${p.labs}/${p.labsTotal} labs</div>
          ${p.answered ? `<span class="badge plain">Quiz ${Math.round(100 * p.correct / p.answered)}%</span>` : ""}</div></div>
      <div class="row">${nextTopic ? `<button class="btn primary" ${goLearn(id, nextTopic.id)}>${fresh ? "Start here" : "Continue"} &rarr;</button>` : `<button class="btn primary" data-track-go="${id}">Open &rarr;</button>`}
        ${s.start ? "" : `<button class="btn ghost" data-trstart="${id}" title="Sets today as week 1 of the plan">Start the ${weeks.length}-week plan</button>`}</div></div>`;
  };

  // Shown until the learner chooses; the same choice is in Settings.
  const levelPick = S.level ? "" : `<div class="card level-pick"><h3 style="margin-top:0">Where are you starting from?</h3>
      <p class="muted">This sets the order of the lessons. You can change it any time in Settings.</p>
      <div class="level-opts">
        <button class="level-opt" data-level="new"><b>${esc(LEVELS[0][1])}</b><span class="muted">Start with Cloud from zero: what servers, networks and the internet are, the command line, and staying safe online, in plain language. Then the cloud topics, in an order where each one builds on the last.</span></button>
        <button class="level-opt" data-level="it"><b>${esc(LEVELS[1][1])}</b><span class="muted">Start with Cloud fundamentals and IAM and follow the full topic list. Cloud from zero stays in the sidebar as an optional refresher.</span></button>
      </div></div>`;
  const pickName = CLOUD_PICKS.find(([v]) => v === cloudPick())[1];
  const pathLine = `<p class="lang-line">${beginner() ? `Your path starts with <b style="color:var(--text)">Cloud from zero</b> (${zeroDone}/${T.zero.length} lessons done)` : "Your path starts with <b style=\"color:var(--text)\">Cloud fundamentals</b>"}, and you're following <b style="color:var(--text)">${esc(pickName)}</b>. <button class="link-btn inline-link" data-nav-go="settings">Change</button></p>
    <p class="lang-line">${LEAN_NOTE}</p>`;
  // A beginner who hasn't finished Lesson 1 gets one plain next step; after that, Continue.
  const first = T.zero[0], lesson1 = beginner() && next && next.id === first;
  const primary = lesson1 ? `<button class="btn primary" ${goLearn("cloud", first)}>Today: Lesson 1, about 45 minutes &rarr;</button>`
    : next ? `<button class="btn primary" ${goLearn("cloud", next.id)}>${fresh ? "Start here" : "Continue"}: ${esc(topicLabel(T, next))} &rarr;</button>`
    : `<button class="btn primary" data-trgo="cloud|labs|">All lessons complete: on to the labs &rarr;</button>`;
  // Everything but the next step sits behind "More", closed for beginners so Home isn't overwhelming.
  const moreOpen = views._homeMore ?? !beginner();

  return `${levelPick}<section class="card hero home-hero">
      <div style="position:relative;z-index:1">
        <div class="eyebrow">${esc(dateStr)} · Toronto &amp; Kitchener-Waterloo</div>
        <h1>${hello}.</h1>
        <p>Cloud engineering prep, following ${esc(pickName)}. ${beginner() ? "New to IT? Start from zero: five plain-language lessons, then" : "Work through"} ${path.length - (beginner() ? T.zero.length : 0)} cloud topics, each finished by answering its checks, plus hands-on labs, AWS certification practice exams, and the skills real Cloud Engineer postings ask for.</p>
        ${pathLine}
        <div class="row" style="margin-top:14px">${primary}</div>
        <p class="lang-line timeline-note">${TIMELINE_NOTE}</p>
      </div>
    </section>
    <details class="home-more" ${moreOpen ? "open" : ""}><summary>More: your progress, the ${weeks.length}-week plan and certifications</summary>
    <div class="row" style="margin-bottom:var(--gap)">
      <span class="badge plain">&#128293; ${st} day streak</span><span class="badge plain">${todayCount} thing${todayCount === 1 ? "" : "s"} done today</span>
      <span class="badge plain">${progressText(trackProgress("cloud"))}</span>
    </div>
    <div class="track-grid">${trackCard("cloud")}${awsHomeCard()}${rolesHomeCard()}</div>
    <div class="cols-2">
      <div class="card"><h3>A sustainable weekly rhythm</h3>
        <table><tr><th>Day</th><th>Focus</th></tr>
          <tr><td>Mon / Wed</td><td>One lesson and its checks (45-60 min)</td></tr>
          <tr><td>Tue / Thu</td><td>Lab work: build it, then write the resume bullet (60 min)</td></tr>
          <tr><td>Fri</td><td>Interview questions out loud, or a mock interview (45 min)</td></tr>
          <tr><td>Sat</td><td>AWS practice exam or a weak-domain drill (60 min)</td></tr>
          <tr><td>Sun</td><td>Light review: glossary, flashcards, plan the week</td></tr></table>
        <p class="muted">Applying to banks and insurers? Lean Azure. Startups and mid-size tech? Lean AWS. Both value hands-on labs you can talk about.</p></div>
      <div class="card"><div class="section-head"><h3>Your ${weeks.length} weeks</h3><button class="btn small ghost" data-trgo="cloud|roadmap|">Roadmap &rarr;</button></div><div class="list">
        ${weeks.map((w) => `<div class="li"><div><span class="t">Week ${w.n}</span><div class="muted">${esc(w.title)}</div></div>${w.n === wk ? '<span class="badge accent">This week</span>' : ""}</div>`).join("")}
      </div>${s.start ? "" : `<p class="muted">Start the plan from the track card to track your current week.</p>`}</div>
    </div></details>`;
}

function awsHomeCard() {
  const rows = AWS_EXAMS.map((e) => { const r = readiness(e); return `<div class="li"><div><span class="t">${esc(e.code)}</span><div class="muted">${esc(e.level)} · best ${r.best ? r.best + "%" : "-"}</div></div>
    <div class="bar" style="width:70px;margin:0"><i style="width:${Math.round(r.pct * 100)}%"></i></div></div>`; }).join("");
  return `<div class="card track-card t-aws">
    <div class="tc-head"><span class="tc-icon">${TRACK_ICON.aws}</span><div><h3>AWS Certs</h3><p class="muted">Exam prep for Cloud Practitioner (CLF-C02) and Solutions Architect Associate (SAA-C03)</p></div></div>
    <div class="list">${rows}</div>
    <div class="row"><button class="btn primary" data-track-go="aws">Continue &rarr;</button></div></div>`;
}

// ---------------- track pages ----------------
function trackView(id, sub) {
  const T = TRACKS[id], st = trState(id);
  switch (sub) {
    case "roadmap": return trRoadmap(T, st);
    case "learn": return trLearn(T, st);
    case "questions": return trQuestions(T, st);
    case "quiz": return trQuiz(T, st);
    case "labs": return trLabs(T, st);
    case "certs": return trCerts(T, st);
    case "ibm": return ibmView(T, st);
    default: return trOverview(T, st);
  }
}

function topicRow(T, st, tid) {
  const t = topicById(T, tid);
  const n = topicChecks(T, tid).length, right = topicChecks(T, tid).filter((q) => st.quiz[q.id] === true).length;
  const meta = [T.earned ? `${right}/${n} checks right` : "", t.exercises ? `${t.exercises.length} coding exercise${t.exercises.length === 1 ? "" : "s"}` : ""].filter(Boolean).join(" · ");
  return `<div class="li"><div><span class="t">${esc(topicLabel(T, t))}</span>${meta ? `<div class="muted">${meta}</div>` : ""}</div>
    <div class="row">${topicDone(T, st, tid) ? `<span class="badge done">${T.earned ? "Complete" : "Reviewed"}</span>` : '<span class="badge">To do</span>'}<button class="btn small" ${goLearn(T.id, tid)}>Open</button></div></div>`;
}
function labRow(T, lab) {
  const n = labSteps(T.id, lab);
  return `<div class="li"><div><span class="t">${esc(lab.title)}</span><div class="muted">${esc(T.labsName.slice(0, -1))} · ${esc(lab.level)} · ${esc(lab.time)}</div></div>
    <div class="row"><span class="badge ${n === lab.steps.length ? "done" : ""}">${n}/${lab.steps.length} steps</span><button class="btn small" data-trgo="${T.id}|labs|${lab.id}">Open</button></div></div>`;
}

function trOverview(T, st) {
  const id = T.id, p = trackProgress(id), wk = trackWeek(id), weeks = trWeeks(T), w = wk ? weeks[wk - 1] : weeks[0];
  const nextTopic = learnNext(T, st);
  return `<section class="card hero t-${id}">
      <div style="position:relative;z-index:1">
        <div class="eyebrow">${wk ? `Week ${wk} of ${weeks.length}` : "Plan not started yet"}</div>
        <h1>${esc(T.name)}</h1>
        <p>${esc(trTagline(T))}. ${wk ? `This week: <b style="color:var(--text)">${esc(w.title)}</b>.` : `An ${weeks.length}-week plan, about 4-6 hours a week.`} A topic is complete when you've answered all its checks correctly.</p>
        <div class="row" style="margin-top:14px">
          ${nextTopic ? `<button class="btn primary" ${goLearn(id, nextTopic.id)}>${p.read ? "Continue" : "Start"}: ${esc(topicLabel(T, nextTopic))} &rarr;</button>` : `<button class="btn primary" data-trgo="${id}|quiz|">Take a quiz &rarr;</button>`}
          ${st.start ? "" : `<button class="btn" data-trstart="${id}">Start the ${weeks.length}-week plan</button>`}
          <button class="btn" data-trgo="${id}|roadmap|">View roadmap</button>
        </div>
      </div>
      ${ring(p.pct, `${p.read}/${p.topics} lessons`)}
    </section>
    <div class="grid">
      <div class="card"><div class="label">Lessons complete</div><div class="stat">${p.read}<small> / ${p.topics}</small></div><div class="bar"><i style="width:${(100 * p.read / p.topics) | 0}%"></i></div></div>
      <div class="card"><div class="label">Questions mastered</div><div class="stat">${p.got}<small> / ${T.questions.length}</small></div><div class="muted">Interview question bank</div></div>
      <div class="card"><div class="label">Quiz accuracy</div><div class="stat">${p.answered ? Math.round(100 * p.correct / p.answered) + "%" : "-"}</div><div class="muted">${p.answered} answered</div></div>
      <div class="card"><div class="label">${esc(T.labsName)} completed</div><div class="stat">${p.labs}<small> / ${T.labs.length}</small></div><div class="muted">${p.exTotal ? `${p.exDone}/${p.exTotal} coding exercises` : "Resume-ready hands-on work"}</div></div>
    </div>
    <div class="cols-2">
      <div class="card"><div class="section-head"><h3>${wk ? "This week" : "Week 1 preview"} · ${esc(w.title)}</h3></div>
        <p class="muted">${esc(w.goal)}</p>
        <div class="list">${w.topics.map((t) => topicRow(T, st, t)).join("")}${w.labs.map((l) => labRow(T, T.labs.find((x) => x.id === l))).join("")}
          ${!w.topics.length && !w.labs.length ? `<div class="li"><span>Review week: quizzes, the question bank and certification prep.</span><button class="btn small" data-trgo="${id}|quiz|">Quiz</button></div>` : ""}</div></div>
      <div class="card"><div class="section-head"><h3>Certifications</h3><button class="btn small ghost" data-trgo="${id}|certs|">All certs &rarr;</button></div>
        <div class="list">${T.certs.map((c) => `<div class="li"><div><span class="t">${esc(c.code)}</span><div class="muted">${esc(c.name)}</div></div><span class="badge ${st.certs[c.id]?.status === "Passed" ? "done" : "plain"}">${esc(st.certs[c.id]?.status || "Not planned")}</span></div>`).join("")}</div></div>
    </div>
    <div class="card"><div class="section-head"><h3>Full courses</h3>${channelLink(T, "Recommended channel: ")}</div>${T.earned ? COURSES_NOTE : ""}${vids(T.videos.courses)}</div>`;
}

function trRoadmap(T, st) {
  const wk = trackWeek(T.id), weeks = trWeeks(T);
  return pageHead(`${esc(T.name)} roadmap`, `${weeks.length} weeks${beginner() ? ", starting with Cloud from zero" : ""}. ${st.start ? `Started ${st.start}; change the date in Settings.` : "Start the plan from the Overview to track your current week."}`) +
    `<p class="callout timeline-note" style="margin-bottom:var(--gap)">${TIMELINE_NOTE}</p>` +
    weeks.map((w) => {
      const done = w.topics.filter((t) => topicDone(T, st, t)).length + w.labs.filter((l) => labDone(T.id, T.labs.find((x) => x.id === l))).length, total = w.topics.length + w.labs.length;
      return `<details class="card week ${w.n === wk ? "current" : ""}" ${w.n === wk || (!wk && w.n === 1) ? "open" : ""}>
        <summary><span style="flex:1">Week ${w.n} · ${esc(w.title)}</span>${w.n === wk ? '<span class="badge accent">This week</span>' : ""}<span class="muted">${total ? `${done}/${total}` : "review"}</span></summary>
        <p class="muted">${esc(w.goal)}</p>
        <div class="list">${w.topics.map((t) => topicRow(T, st, t)).join("")}${w.labs.map((l) => labRow(T, T.labs.find((x) => x.id === l))).join("")}
          ${!total ? `<div class="li"><span>Take full quizzes for your target exam and drill the question bank.</span><div class="row"><button class="btn small" data-trgo="${T.id}|quiz|">Quiz</button><button class="btn small" data-trgo="${T.id}|questions|">Questions</button></div></div>` : ""}</div></details>`;
    }).join("");
}

// ---------------- learn ----------------
// Shown above the freeCodeCamp full courses (Overview, Learn > Full courses, Certs).
const COURSES_NOTE = `<p class="muted">These are 4+ hours long. Start with the first hour only if you are new to IT.</p>`;
// The Learn page a track opens on with no topic in the address: the next lesson on the path (Cloud),
// or the first topic.
const defaultTopic = (T, st) => (T.earned ? (learnNext(T, st) || learnPath(T)[0]) : T.topics[0]).id;
function trLearn(T, st) {
  const id = T.id, valid = st.sel && (st.sel === "courses" || st.sel === "glossary" || topicById(T, st.sel));
  // An address that matches no lesson says so (Cloud); other tracks fall back to the first topic.
  const missing = T.earned && st.sel && !valid, sel = missing ? null : valid ? st.sel : defaultTopic(T, st);
  const side = trGroups(T).map(([g, tids]) => `<div class="side-h" style="cursor:default">${esc(g)}${T.zero && tids === T.zero && !beginner() ? " (optional)" : ""}</div>` + tids.map((tid) => {
    const t = topicById(T, tid), n = T.earned ? topicChecks(T, tid).length : 0;
    const mark = topicDone(T, st, tid) ? "✓" : n ? `${topicChecks(T, tid).filter((q) => st.quiz[q.id] === true).length}/${n}` : "";
    return `<button class="side-i ${sel === tid ? "active" : ""}" data-trsel="${id}|${tid}"><span class="lbl">${esc(t.title)}</span><span class="muted lbl">${mark}</span></button>`;
  }).join("")).join("") + `<div class="side-h" style="cursor:default">Reference</div>
    ${T.glossary && T.glossary.length ? `<button class="side-i ${sel === "glossary" ? "active" : ""}" data-trsel="${id}|glossary"><span class="lbl">Glossary</span><span class="muted lbl">${T.glossary.length}</span></button>` : ""}
    ${T.videos.courses && T.videos.courses.length ? `<button class="side-i ${sel === "courses" ? "active" : ""}" data-trsel="${id}|courses"><span class="lbl">Full courses</span></button>` : ""}`;
  const body = missing ? trMissing(T, st) : sel === "courses" ? `<h2>Full courses</h2><p class="muted">Long-form videos to watch in chunks alongside the plan.</p><div class="card">${T.earned ? COURSES_NOTE : ""}${vids(T.videos.courses)}</div>`
    : sel === "glossary" ? trGlossary(T) : trTopic(T, st, sel);
  return `<div class="ref-layout"><aside class="ref-side">${side}</aside><section class="ref-main">${body}</section></div>`;
}

// A Learn address that matches no lesson (mistyped, or from an older version of the app).
function trMissing(T, st) {
  const to = learnNext(T, st) || learnPath(T)[0];
  return `<div class="label">Learn</div><h2>Lesson not found</h2>
    <div class="card"><p>There's no lesson at <code>${esc(st.sel)}</code>. The link may be mistyped or from an older version of the app.</p>
      <p class="muted">Lessons aren't locked: you can open any of them from the sidebar.</p>
      <div class="row"><button class="btn primary" ${goLearn(T.id, to.id)}>Go to ${esc(topicLabel(T, to))} &rarr;</button></div></div>`;
}

function trGlossary(T) {
  const q = ((views._trgl = views._trgl || {})[T.id] || "").toLowerCase();
  const list = T.glossary.filter(([term, def]) => !q || term.toLowerCase().includes(q) || def.toLowerCase().includes(q));
  return `<h2>Glossary <span class="muted">${list.length}</span></h2><p class="muted">Key terms in one line each. Great for a last review before an interview or exam.</p>
    <div class="card toolbar"><label class="search">${ICON_SEARCH}<input data-trgl="${T.id}" placeholder="Search terms..." value="${esc(views._trgl[T.id] || "")}" autocomplete="off"></label></div>
    <div class="card"><dl class="gloss">${list.map(([term, def]) => `<dt>${esc(term)}</dt><dd>${esc(def)}</dd>`).join("") || '<p class="muted">No matching terms.</p>'}</dl></div>`;
}

function trTopic(T, st, tid) {
  if (T.earned) return trEarnedTopic(T, st, tid);
  const id = T.id, i = T.topics.findIndex((t) => t.id === tid), t = T.topics[i];
  const group = (T.groups.find(([, ids]) => ids.includes(tid)) || [""])[0], shown = views._trq = views._trq || {};
  const mapTable = t.map ? `<div class="card"><h3>AWS vs Azure</h3><div class="table-wrap"><table><tr><th>Concept</th><th>AWS</th><th>Azure</th></tr>
    ${t.map.map(([c, a, z]) => `<tr><td>${esc(c)}</td><td><b style="font-weight:500">${esc(a)}</b></td><td><b style="font-weight:500">${esc(z)}</b></td></tr>`).join("")}</table></div></div>` : "";
  const codes = (t.code || []).map((c, k) => `<div class="card"><div class="section-head"><h3>${esc(c.label)}</h3><button class="btn small" data-trcopy="${id}|${tid}|${k}">Copy</button></div><pre>${esc(c.code)}</pre></div>`).join("");
  const exercises = (t.exercises || []).map((ex, j) => {
    const key = `${id}:${tid}-${j}`, rid = `trres-${id}-${tid}-${j}`;
    return `<div class="card"><b>Exercise ${j + 1}${st.ex[key] ? ' <span class="s-solved">passed</span>' : ""}</b><p>${esc(ex.prompt)}</p>
      <textarea data-trcode="${id}|${tid}|${j}" rows="${Math.max(6, ex.starter.split("\n").length + 3)}" spellcheck="false">${esc(S.code["tx:" + key] ?? ex.starter)}</textarea>
      <div class="row"><button class="btn primary small" data-trex="${id}|${tid}|${j}">Run tests</button><button class="btn small" data-trexreset="${id}|${tid}|${j}">Reset</button></div>
      <pre id="${rid}" class="muted" style="display:none"></pre></div>`;
  }).join("");
  const vlist = T.videos[tid] || [];
  const read = !!st.read[tid];
  return `<div class="label">${esc(group)}</div><h2>${esc(t.title)}</h2>
    <div class="card">${t.body}</div>${mapTable}${codes}
    ${exercises ? `<div class="label" style="margin:6px 0 8px">Coding exercises (run in your browser)</div>${exercises}` : ""}
    <div class="card"><h3>Check yourself</h3>${t.cards.map(([q, a], k) => { const key = `${id}:${tid}:${k}`; return `<div class="flash"><div class="row between"><b>${esc(q)}</b>
      <button class="btn small ${shown[key] ? "ghost" : ""}" data-trq="${key}">${shown[key] ? "Hide" : "Show answer"}</button></div>${shown[key] ? `<p class="flash-a">${esc(a)}</p>` : ""}</div>`; }).join("")}</div>
    <div class="card"><div class="section-head"><h3>Videos</h3><span class="row"><a class="btn small" href="${yt(t.yt || t.title + (id === "cloud" ? " AWS Azure explained" : " LLM explained"))}" target="_blank" rel="noopener">More videos &nearr;</a>${channelLink(T)}</span></div>
      ${vlist.length ? vids(vlist) : `<p class="muted">No verified video for this topic yet; the search link finds popular ones. The full courses cover it too.</p>`}</div>
    <div class="row" style="margin-bottom:var(--gap)"><button class="btn ${read ? "" : "primary"}" data-trread="${id}|${tid}">${read ? "Reviewed ✓ (undo)" : "Mark as reviewed"}</button>
      <button class="btn ghost" data-trgo="${id}|questions|${tid}">Interview questions on this</button><button class="btn ghost" data-trgo="${id}|quiz|${tid}">Quiz on this</button></div>
    <div class="row between">${i > 0 ? `<button class="btn" data-trsel="${id}|${T.topics[i - 1].id}">&larr; ${esc(T.topics[i - 1].title)}</button>` : "<span></span>"}
      ${i < T.topics.length - 1 ? `<button class="btn primary" data-trsel="${id}|${T.topics[i + 1].id}">${esc(T.topics[i + 1].title)} &rarr;</button>` : `<button class="btn primary" data-trgo="${id}|quiz|">Take a quiz &rarr;</button>`}</div>`;
}

// A Cloud topic, written for someone meeting the terms for the first time: where it sits on the
// path, the cloud being followed, the words it uses, the lesson, a guided task (Cloud from zero),
// the AWS / Azure map, code, exercises with hints and model answers, then the checks that
// complete it. Previous / Next follow the sidebar.
function trEarnedTopic(T, st, tid) {
  const id = T.id, order = sideOrder(T), i = order.findIndex((t) => t.id === tid), t = order[i];
  const group = (trGroups(T).find(([, ids]) => ids.includes(tid)) || [""])[0], shown = views._trq = views._trq || {};
  const pick = cloudPick(), done = topicDone(T, st, tid), checks = topicChecks(T, tid);
  const right = checks.filter((q) => st.quiz[q.id] === true).length;
  let pos = "";
  if (isZero(T, tid)) {
    const k = T.zero.indexOf(tid), nx = T.zero[k + 1] ? topicById(T, T.zero[k + 1]) : order.find((x) => !isZero(T, x.id));
    pos = `<p class="lesson-pos">Lesson ${k + 1} of ${T.zero.length} in Cloud from zero. Next: <button class="link-btn inline-link" data-trsel="${id}|${nx.id}">${esc(T.zero[k + 1] ? nx.title : topicLabel(T, nx))}</button></p>
      <p class="gap-note">Cloud engineer interviews often test Linux and scripting (Bash or Python). These are not covered in depth yet. <a class="inline-link" href="TODO-content.md" target="_blank" rel="noopener">See the list of planned lessons</a>.</p>`;
  }
  const status = done ? `<span class="badge done">Complete</span> You answered all ${checks.length} checks correctly.`
    : `<span class="badge">To do</span> To complete this ${isZero(T, tid) ? "lesson" : "topic"}, answer the ${checks.length} checks at the end correctly (${right}/${checks.length} so far).`
      + (st.readOld && st.readOld[tid] ? " You marked it reviewed in an earlier version; topics are now completed by their checks." : "");
  const terms = t.terms ? `<div class="card terms"><h3>Words used in this ${isZero(T, tid) ? "lesson" : "topic"}</h3><dl class="gloss">${t.terms.map(([term, def, link]) =>
    `<dt>${esc(term)}</dt><dd>${esc(def)}${link ? ` <button class="link-btn inline-link" data-trsel="${id}|${link}">Lesson: ${esc(topicById(T, link).title)}</button>` : ""}</dd>`).join("")}</dl></div>` : "";
  const task = t.task ? `<div class="card task"><h3>Try it yourself: ${esc(t.task.title)}</h3><p>${esc(t.task.intro)}</p>
      <ol>${t.task.steps.map((s) => `<li>${esc(s)}</li>`).join("")}</ol>
      <div class="lab-see"><div class="label">What you should see</div><p>${esc(t.task.expect)}</p></div>
      <details class="ex-help"><summary>Stuck? Open a hint</summary><p>${esc(t.task.hint)}</p></details>
      <details class="ex-help"><summary>What good looks like</summary><pre>${esc(t.task.good)}</pre></details>
      <p class="muted" style="margin-bottom:0">One of the checks below asks what you saw.</p></div>` : "";
  // The provider you follow comes first; the other is shown as "On Azure" / "On AWS".
  const cols = pick === "aws" ? [["AWS", 1], ["On Azure", 2]] : pick === "azure" ? [["Azure", 2], ["On AWS", 1]] : [["AWS", 1], ["Azure", 2]];
  const mapTable = t.map ? `<div class="card"><h3>${pick === "both" ? "AWS vs Azure" : `${cols[0][0]} names, with the ${cols[1][0].slice(3)} equivalent`}</h3><div class="table-wrap"><table><tr><th>Concept</th><th>${cols[0][0]}</th><th>${cols[1][0]}</th></tr>
    ${t.map.map((r) => `<tr><td>${esc(r[0])}</td><td><b style="font-weight:500">${esc(r[cols[0][1]])}</b></td><td${pick === "both" ? "" : ' class="muted"'}>${pick === "both" ? `<b style="font-weight:500">${esc(r[cols[1][1]])}</b>` : esc(r[cols[1][1]])}</td></tr>`).join("")}</table></div></div>` : "";
  const codes = (t.code || []).map((c, k) => `<div class="card"><div class="section-head"><h3>${esc(c.label)}</h3><button class="btn small" data-trcopy="${id}|${tid}|${k}">Copy</button></div>
    ${c.note ? `<p class="muted" style="margin-top:0"><b>What this does:</b> ${esc(c.note)}</p>` : ""}<pre>${esc(c.code)}</pre></div>`).join("");
  const exercises = (t.exercises || []).map((ex, j) => {
    const key = `${id}:${tid}-${j}`, rid = `trres-${id}-${tid}-${j}`;
    return `<div class="card ex-card"><b>Exercise ${j + 1}${st.ex[key] ? ' <span class="s-solved">passed</span>' : ""}</b><p>${esc(ex.prompt)}</p>
      <textarea data-trcode="${id}|${tid}|${j}" rows="${Math.max(6, ex.starter.split("\n").length + 3)}" spellcheck="false" aria-label="Your code for exercise ${j + 1}">${esc(S.code["tx:" + key] ?? ex.starter)}</textarea>
      <div class="row"><button class="btn primary small" data-trex="${id}|${tid}|${j}">Run tests</button><button class="btn small" data-trexreset="${id}|${tid}|${j}">Reset</button></div>
      <pre id="${rid}" class="muted" style="display:none"></pre>
      ${ex.hint ? `<details class="ex-help"><summary>Hint</summary><p>${esc(ex.hint)}</p></details>` : ""}
      ${ex.solution ? `<details class="ex-help"><summary>Model answer</summary><p class="muted">Try the hint first. If you open this, read it line by line, then close it and type your own version: that's what makes it stick.</p><pre>${esc(ex.solution)}</pre></details>` : ""}</div>`;
  }).join("");
  const tryit = t.tryit ? `<div class="card task tryit"><div class="section-head"><h3>Try it: ${esc(t.tryit.title)}</h3><span class="badge plain">Optional, recommended</span></div>
      <p>${esc(t.tryit.intro)}</p>
      <ol>${t.tryit.steps.map((s) => `<li>${esc(s.text)} <a class="inline-link" href="${s.link}" target="_blank" rel="noopener">${esc(s.label)} &nearr;</a></li>`).join("")}</ol>
      ${t.tryit.plans ? `<p class="muted"><a class="inline-link" href="${t.tryit.plans.link}" target="_blank" rel="noopener">${esc(t.tryit.plans.label)} &nearr;</a></p>` : ""}
      <p class="muted" style="margin-bottom:0">You don't need this to complete the lesson: only the checks below count.</p></div>` : "";
  const vlist = T.videos[tid] || [], hasQs = T.questions.some((q) => q.topic === tid);
  const prev = order[i - 1], next = order[i + 1];
  return `<div class="label">${esc(group)}</div><h2>${esc(t.title)}</h2>${pos}
    <div class="topic-meta"><p class="lang-line" style="margin:0">${status}</p>
      <div class="pick-line"><span class="muted">Following:</span>${pickSeg()}</div></div>
    ${terms}
    <div class="card lesson-body">${pv(t.body)}</div>${task}${mapTable}${codes}
    ${exercises ? `<div class="label" style="margin:6px 0 8px">Coding exercises (run in your browser; optional, they don't affect completion)</div>${exercises}` : ""}
    ${tryit}${trChecks(T, st, tid)}
    <div class="card"><h3>Flashcards</h3><p class="muted">Say your answer out loud, then reveal it. These are for practice; the checks above are what complete the ${isZero(T, tid) ? "lesson" : "topic"}.</p>${t.cards.map(([q, a], k) => { const key = `${id}:${tid}:${k}`; return `<div class="flash"><div class="row between"><b>${esc(q)}</b>
      <button class="btn small ${shown[key] ? "ghost" : ""}" data-trq="${key}">${shown[key] ? "Hide" : "Show answer"}</button></div>${shown[key] ? `<p class="flash-a">${esc(a)}</p>` : ""}</div>`; }).join("")}</div>
    <div class="card"><div class="section-head"><h3>Videos</h3><span class="row"><a class="btn small" href="${yt(t.yt || t.title + " AWS Azure explained")}" target="_blank" rel="noopener">Find videos on YouTube &nearr;</a>${channelLink(T)}</span></div>
      ${vlist.length ? vids(vlist) : `<p class="muted">No hand-picked video for this ${isZero(T, tid) ? "lesson" : "topic"} yet; the YouTube link searches for popular ones. If you're new to IT, pick a video under 20 minutes that covers this ${isZero(T, tid) ? "lesson" : "topic"}'s subject, and skip long full courses for now.</p>`}</div>
    ${hasQs ? `<div class="row" style="margin-bottom:var(--gap)"><button class="btn ghost" data-trgo="${id}|questions|${tid}">Interview questions on this</button></div>` : ""}
    <div class="row between">${prev ? `<button class="btn" data-trsel="${id}|${prev.id}">&larr; ${esc(isZero(T, prev.id) === isZero(T, tid) ? prev.title : topicLabel(T, prev))}</button>` : "<span></span>"}
      ${next ? `<button class="btn primary" data-trsel="${id}|${next.id}">Next: ${esc(isZero(T, next.id) === isZero(T, tid) ? next.title : topicLabel(T, next))} &rarr;</button>` : `<button class="btn primary" data-trgo="${id}|labs|">On to the labs &rarr;</button>`}</div>`;
}

// "Check your understanding": the topic's quiz questions, answered in place. A right answer explains
// why; a wrong one explains too and can be tried again. Answers are saved (st.quiz, as in the Quiz
// tab, plus st.pick for the option chosen here), so a topic stays complete after a reload.
function trChecks(T, st, tid) {
  const qs = topicChecks(T, tid), pick = st.pick || {};
  if (!qs.length) return "";
  const right = qs.filter((q) => st.quiz[q.id] === true).length;
  return `<div class="card checks" id="checks-${tid}"><div class="section-head"><h3>Check your understanding</h3><span class="badge ${right === qs.length ? "done" : ""}">${right}/${qs.length} right</span></div>
    <p class="muted">Answer every question correctly to complete this ${isZero(T, tid) ? "lesson" : "topic"}. Each answer comes with an explanation.</p>` +
    qs.map((q, n) => {
      const ok = st.quiz[q.id] === true, c = ok && pick[q.id] === undefined ? q.answer : pick[q.id], answered = c !== undefined;
      return `<div class="check-q"><p class="check-qq"><span class="label">Check ${n + 1}</span> ${esc(q.q)}</p>
        <div class="quiz-opts">${q.options.map((o, k) => `<button class="quiz-opt ${answered ? (k === c ? (k === q.answer ? "right" : "wrong") : "") : ""}" data-trcheck="${T.id}|${q.id}|${k}" ${answered ? "disabled" : ""}><span class="qk">${"ABCD"[k]}</span>${esc(o)}</button>`).join("")}</div>
        ${answered ? (c === q.answer ? `<p class="check-why"><b class="s-solved">Correct.</b> ${esc(q.why)}</p>`
          : `<p class="check-why"><b class="M">Not quite.</b> ${esc(q.why)}</p><button class="btn small" data-trcheckretry="${T.id}|${q.id}">Try again</button>`) : ""}</div>`;
    }).join("") + `</div>`;
}

// ---------------- questions ----------------
function trQuestions(T, st) {
  const id = T.id, f = (views._trqf = views._trqf || {})[id] = (views._trqf[id] || { topic: "", status: "" });
  const shown = views._tra = views._tra || {};
  const list = T.questions.filter((q) => (!f.topic || q.topic === f.topic) && (!f.status || (f.status === "new" ? !st.qa[q.id] : st.qa[q.id] === f.status)));
  const got = T.questions.filter((q) => st.qa[q.id] === "got").length, rev = T.questions.filter((q) => st.qa[q.id] === "review").length;
  return pageHead(`Interview questions <span class="muted">${list.length}</span>`, "Say your answer out loud first (or write it down), then reveal the model answer and mark how you did.") +
    `<div class="card toolbar">
      <select data-trqf="${id}|topic"><option value="">All topics</option>${T.topics.map((t) => `<option value="${t.id}" ${f.topic === t.id ? "selected" : ""}>${esc(t.title)}</option>`).join("")}</select>
      <select data-trqf="${id}|status">${[["", "Any status"], ["new", "Not tried"], ["review", "Review again"], ["got", "Got it"]].map(([v, l]) => `<option value="${v}" ${f.status === v ? "selected" : ""}>${l}</option>`).join("")}</select>
      <span class="muted">${got} got it · ${rev} to review · ${T.questions.length - got - rev} not tried</span></div>` +
    (list.length ? list.map((q) => {
      const key = `${id}:${q.id}`, s = st.qa[q.id];
      return `<div class="card"><div class="section-head"><span class="label">${esc(topicById(T, q.topic).title)}</span>${s === "got" ? '<span class="badge done">Got it</span>' : s === "review" ? '<span class="badge due">Review again</span>' : ""}</div>
        <p style="font-weight:600;font-size:1.02rem;margin-top:0">${esc(q.q)}</p>
        ${shown[key] ? `<div class="callout">${esc(q.a)}</div>` : ""}
        <div class="row" style="margin-top:12px"><button class="btn small ${shown[key] ? "ghost" : ""}" data-trshow="${key}">${shown[key] ? "Hide answer" : "Show model answer"}</button>
          <button class="btn small ${s === "got" ? "primary" : ""}" data-trqa="${id}|${q.id}|got">Got it</button>
          <button class="btn small" data-trqa="${id}|${q.id}|review">Review again</button></div></div>`;
    }).join("") : `<div class="card empty">No questions match these filters.</div>`);
}

// ---------------- quiz ----------------
function trQuiz(T, st) {
  const id = T.id, f = (views._tqf = views._tqf || {})[id] = (views._tqf[id] || { tag: "", topic: "" });
  const pool = T.quiz.filter((q) => (!f.tag || q.tags.includes(f.tag)) && (!f.topic || q.topic === f.topic));
  const set = (views._tqs = views._tqs || {})[id], chosen = (views._tqa = views._tqa || {})[id] = views._tqa[id] || {};
  const qs = set ? set.map((qid) => T.quiz.find((q) => q.id === qid)).filter(Boolean) : pool;
  const answered = qs.filter((q) => chosen[q.id] !== undefined), right = answered.filter((q) => chosen[q.id] === q.answer).length;
  const tags = [...new Set(T.quiz.flatMap((q) => q.tags))];
  const certName = (tag) => (T.tagNames || {})[tag] || (T.certs.find((c) => c.tag === tag) || {}).code || tag;
  return pageHead("Practice quiz", "Exam-style multiple choice. Filter by certification or topic, or take a random 10-question set.") +
    `<div class="card toolbar">
      <select data-tqf="${id}|tag"><option value="">${esc(T.tagLabel || "All exams")}</option>${tags.map((t) => `<option value="${t}" ${f.tag === t ? "selected" : ""}>${esc(certName(t))}</option>`).join("")}</select>
      <select data-tqf="${id}|topic"><option value="">All topics</option>${T.topics.map((t) => `<option value="${t.id}" ${f.topic === t.id ? "selected" : ""}>${esc(t.title)}</option>`).join("")}</select>
      <button class="btn primary" data-tqnew="${id}">Random 10</button>${set ? `<button class="btn" data-tqall="${id}">Show all ${pool.length}</button>` : ""}
      <button class="btn ghost" data-tqreset="${id}">Clear answers</button></div>
    <div class="card row between"><div><b>${set ? "Random set" : "All matching questions"}:</b> ${answered.length}/${qs.length} answered${answered.length ? `, <b>${Math.round(100 * right / answered.length)}%</b> correct` : ""}</div>
      ${answered.length === qs.length && qs.length ? `<span class="badge ${right / qs.length >= 0.7 ? "done" : "due"}">${right / qs.length >= 0.7 ? "Passing range" : "Keep practicing"}</span>` : ""}</div>` +
    (qs.length ? qs.map((q, n) => {
      const c = chosen[q.id], done = c !== undefined;
      return `<div class="card"><div class="section-head"><span class="label">Q${n + 1} · ${esc(topicById(T, q.topic).title)}</span><span class="row">${q.tags.map((t) => `<span class="tag">${esc(certName(t))}</span>`).join("")}</span></div>
        <p style="font-weight:600;margin-top:0">${esc(q.q)}</p>
        <div class="quiz-opts">${q.options.map((o, k) => `<button class="quiz-opt ${done ? (k === q.answer ? "right" : k === c ? "wrong" : "") : ""}" data-tq="${id}|${q.id}|${k}" ${done ? "disabled" : ""}><span class="qk">${"ABCD"[k]}</span>${esc(o)}</button>`).join("")}</div>
        ${done ? `<p class="${c === q.answer ? "s-solved" : "M"}" style="margin-top:12px"><b>${c === q.answer ? "Correct." : "Not quite."}</b> <span style="color:var(--text);font-weight:400">${esc(q.why)}</span></p>` : ""}</div>`;
    }).join("") : `<div class="card empty">No questions match these filters.</div>`);
}

// ---------------- labs ----------------
function trLabs(T, st) {
  const id = T.id, focus = views._trlab;
  const structured = T.labs.some((l) => typeof l.steps[0] === "object");
  return pageHead(esc(T.labsName), structured
    ? "Hands-on work in a real cloud account, to put on your resume. Each step says what to do, what you should see, a hint, and what good looks like. Ticking a step is self-reported: nothing checks your cloud account, so tick it once you've seen the expected result."
    : "Hands-on work to put on your resume. Tick steps as you go; each one has a ready-made resume bullet.") +
    T.labs.map((l) => {
      const n = labSteps(id, l), all = n === l.steps.length;
      // Labs with structured steps (Cloud) open with a cost warning and end with a clean-up step.
      const steps = typeof l.steps[0] === "object" ? `<div class="callout lab-warn"><b>Before you start: this lab creates real cloud resources, and some cost money.</b>
          <p><b>What can cost money:</b> ${esc(l.costs)}</p><p><b>Staying in the free tier:</b> ${esc(l.free)}</p>
          <p style="margin-bottom:0">Set a budget alert first (step 1), work through the lab in one sitting, and always finish with the <b>Clean up</b> step so nothing keeps billing.</p></div>
        <p class="muted lab-self">Ticking a step is self-reported: nothing checks your cloud account.</p>
        ${l.steps.map((s, k) => `<div class="lab-step${k === l.steps.length - 1 ? " clean" : ""}">
          <label class="check"><input type="checkbox" data-trlab="${id}|${l.id}|${k}" ${st.labs[`${l.id}:${k}`] ? "checked" : ""}><span><b>Step ${k + 1}.</b> ${pv(esc(s.do))}</span></label>
          <div class="lab-see"><span class="label">What you should see</span> ${esc(s.see)}</div>
          <details class="ex-help"><summary>Stuck? Open a hint</summary><p>${esc(s.hint)}</p></details>
          <details class="ex-help"><summary>What good looks like</summary><pre>${esc(s.good)}</pre></details></div>`).join("")}`
        : l.steps.map((s, k) => `<label class="check"><input type="checkbox" data-trlab="${id}|${l.id}|${k}" ${st.labs[`${l.id}:${k}`] ? "checked" : ""}><span>${esc(s)}</span></label>`).join("")
          + `<div class="callout" style="margin-top:12px"><b>Cost &amp; safety:</b> ${esc(l.cost)}</div>`;
      return `<div class="card lab ${focus === l.id ? "focus" : ""}" id="lab-${l.id}">
        <div class="section-head"><h3>${esc(l.title)}</h3><span class="badge ${all ? "done" : ""}">${n}/${l.steps.length} steps</span></div>
        <div class="row" style="margin-bottom:10px"><span class="pill">${esc(l.level)}</span><span class="pill">${esc(l.time)}</span>${l.stack.map((s) => `<span class="tag">${esc(s)}</span>`).join("")}</div>
        <p>${esc(l.goal)}</p>
        <div class="bar" style="margin-bottom:10px"><i style="width:${(100 * n / l.steps.length) | 0}%"></i></div>
        ${steps}
        <h3>Resume bullet</h3><div class="row between resume"><p style="margin:0;flex:1">${esc(l.resume)}</p><button class="btn small" data-trres="${id}|${l.id}">Copy</button></div>
        <h3>Stretch goals</h3><ul>${l.stretch.map((s) => `<li>${esc(s)}</li>`).join("")}</ul></div>`;
    }).join("");
}

// ---------------- certs ----------------
function trCerts(T, st) {
  const id = T.id;
  return pageHead("Certifications", "Pick one that matches your target employers. Exam codes and content change, so always confirm details on the official page before booking.") +
    `<div class="track-grid">${T.certs.map((c) => {
      const s = st.certs[c.id] || {};
      return `<div class="card cert"><div class="section-head"><span class="badge accent">${esc(c.provider)} · ${esc(c.level)}</span><b class="cert-code">${esc(c.code)}</b></div>
        <h3 style="margin-top:6px">${esc(c.name)}</h3><p class="muted">${esc(c.why)}</p>
        <div class="label" style="margin-top:10px">Covered in Learn</div><div>${c.topics.map((tid) => `<button class="tag tag-btn" ${goLearn(id, tid)}>${esc(topicById(T, tid).title)}</button>`).join("")}</div>
        <div class="row" style="margin-top:12px"><select data-trcert="${id}|${c.id}">${CERT_STATUSES.map((v) => `<option ${v === (s.status || "Not planned") ? "selected" : ""}>${v}</option>`).join("")}</select>
          <input type="date" data-trcertdate="${id}|${c.id}" value="${esc(s.date || "")}" title="Exam date"></div>
        <div class="row" style="margin-top:12px">${AWS_EXAMS.some((x) => x.code === c.code) ? `<button class="btn small primary" data-awsgo="${AWS_EXAMS.find((x) => x.code === c.code).id}">Open exam prep &rarr;</button>` : ""}
          ${T.quiz.some((q) => q.tags.includes(c.tag)) ? `<button class="btn small ${AWS_EXAMS.some((x) => x.code === c.code) ? "" : "primary"}" data-tqtag="${id}|${c.tag}">Practice questions</button>` : ""}
          <a class="btn small ghost" href="${c.link}" target="_blank" rel="noopener">Official page &nearr;</a></div></div>`;
    }).join("")}</div>
    <div class="card"><h3>Full certification courses</h3>${T.earned ? COURSES_NOTE : ""}${vids(T.videos.courses)}</div>`;
}

// ---------------- running AI exercises ----------------
async function runTrackExercise(id, tid, j) {
  const t = topicById(TRACKS[id], tid), ex = t.exercises[j], key = `${id}:${tid}-${j}`, rid = `trres-${id}-${tid}-${j}`;
  const code = document.querySelector(`[data-trcode="${id}|${tid}|${j}"]`).value;
  S.code["tx:" + key] = code; save();
  const res = document.getElementById(rid);
  res.style.display = "block"; res.className = "muted"; res.textContent = "Running... (Python loads on first run)";
  const { out, err } = await execPy(code + "\n\n" + ex.tests, true);
  if (err) { res.textContent = "Not yet:\n" + err + (out ? "\n\nOutput:\n" + out : ""); res.className = "M"; return; }
  const st = trState(id);
  if (!st.ex[key]) bump();
  st.ex[key] = true; save();
  rerender();
  const r = document.getElementById(rid); r.style.display = "block"; r.className = "s-solved"; r.textContent = "All tests passed!" + (out ? "\n\nOutput:\n" + out : "");
}

// ---------------- events ----------------
document.addEventListener("click", (e) => {
  const t = e.target;
  const el = (sel) => t.closest(sel);
  let b;
  if ((b = el("[data-track-go]"))) { const k = b.dataset.trackGo; return go(S.lastTab?.[k] || defaultTab(k)); }
  if ((b = el("[data-nav-go]"))) return go(b.dataset.navGo);
  if ((b = el("[data-trstart]"))) { const st = trState(b.dataset.trstart); st.start = st.start || today(); save(); return go(b.dataset.trstart + ":overview"); }
  if ((b = el("[data-trgo]"))) {
    const [id, sub, arg] = b.dataset.trgo.split("|"), st = trState(id);
    if (sub === "learn" && arg) st.sel = arg;
    if (sub === "questions") ((views._trqf = views._trqf || {})[id] = { topic: arg || "", status: "" });
    if (sub === "quiz") { (views._tqf = views._tqf || {})[id] = { tag: "", topic: arg || "" }; (views._tqs = views._tqs || {})[id] = null; }
    views._trlab = sub === "labs" ? arg : null;
    save(); go(id + ":" + sub);
    if (sub === "labs" && arg) { const n = document.getElementById("lab-" + arg); if (n) n.scrollIntoView({ block: "start" }); window.scrollBy(0, -120); }
    return;
  }
  if ((b = el("[data-trsel]"))) {
    const [id, tid] = b.dataset.trsel.split("|");
    trState(id).sel = tid; save();
    if (sectionOf(tab) !== id || !tab.endsWith(":learn")) return go(id + ":learn"); // links in Home, lessons or labs
    render(); return window.scrollTo(0, 0);
  }
  if ((b = el("[data-trread]"))) {
    const [id, tid] = b.dataset.trread.split("|"), st = trState(id);
    st.read[tid] = !st.read[tid]; if (st.read[tid]) bump(); else delete st.read[tid];
    save(); return rerender();
  }
  if ((b = el("[data-trcheck]"))) {
    const [id, qid, k] = b.dataset.trcheck.split("|"), q = TRACKS[id].quiz.find((x) => x.id === qid), st = trState(id);
    st.pick = st.pick || {}; st.pick[qid] = +k; st.quiz[qid] = +k === q.answer;
    bump(); save(); return rerender();
  }
  if ((b = el("[data-trcheckretry]"))) { const [id, qid] = b.dataset.trcheckretry.split("|"); delete trState(id).pick[qid]; save(); return rerender(); }
  if ((b = el("[data-level]"))) { S.level = b.dataset.level; save(); return rerender(); }
  if ((b = el("[data-cloudpick]"))) { S.cloudPick = b.dataset.cloudpick; save(); return rerender(); }
  if ((b = el("[data-trq]"))) { views._trq = views._trq || {}; views._trq[b.dataset.trq] = !views._trq[b.dataset.trq]; return rerender(); }
  if ((b = el("[data-trshow]"))) { views._tra = views._tra || {}; views._tra[b.dataset.trshow] = !views._tra[b.dataset.trshow]; return rerender(); }
  if ((b = el("[data-trqa]"))) {
    const [id, qid, v] = b.dataset.trqa.split("|"), st = trState(id);
    if (st.qa[qid] !== v && v === "got") bump();
    st.qa[qid] = v; save(); return rerender();
  }
  if ((b = el("[data-trex]"))) { const [id, tid, j] = b.dataset.trex.split("|"); return runTrackExercise(id, tid, +j); }
  if ((b = el("[data-trexreset]"))) { const [id, tid, j] = b.dataset.trexreset.split("|"); delete S.code[`tx:${id}:${tid}-${j}`]; save(); return rerender(); }
  if ((b = el("[data-trcopy]"))) {
    const [id, tid, k] = b.dataset.trcopy.split("|");
    return navigator.clipboard?.writeText(topicById(TRACKS[id], tid).code[+k].code).then(() => { b.textContent = "Copied!"; }, () => {});
  }
  if ((b = el("[data-trres]"))) {
    const [id, lid] = b.dataset.trres.split("|");
    return navigator.clipboard?.writeText(TRACKS[id].labs.find((l) => l.id === lid).resume).then(() => { b.textContent = "Copied!"; }, () => {});
  }
  if ((b = el("[data-tq]"))) {
    const [id, qid, k] = b.dataset.tq.split("|"), q = TRACKS[id].quiz.find((x) => x.id === qid), st = trState(id);
    views._tqa = views._tqa || {}; (views._tqa[id] = views._tqa[id] || {})[qid] = +k;
    st.quiz[qid] = +k === q.answer; bump(); save();
    return rerender();
  }
  if ((b = el("[data-tqnew]"))) {
    const id = b.dataset.tqnew, T = TRACKS[id], f = (views._tqf || {})[id] || { tag: "", topic: "" };
    const pool = T.quiz.filter((q) => (!f.tag || q.tags.includes(f.tag)) && (!f.topic || q.topic === f.topic)).map((q) => q.id);
    for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
    (views._tqs = views._tqs || {})[id] = pool.slice(0, 10);
    (views._tqa = views._tqa || {})[id] = {};
    render(); return window.scrollTo(0, 0);
  }
  if ((b = el("[data-tqall]"))) { (views._tqs = views._tqs || {})[b.dataset.tqall] = null; return render(); }
  if ((b = el("[data-tqreset]"))) { (views._tqa = views._tqa || {})[b.dataset.tqreset] = {}; return render(); }
  if ((b = el("[data-tqtag]"))) {
    const [id, tag] = b.dataset.tqtag.split("|");
    (views._tqf = views._tqf || {})[id] = { tag, topic: "" }; (views._tqs = views._tqs || {})[id] = null; (views._tqa = views._tqa || {})[id] = {};
    return go(id + ":quiz");
  }
});

document.addEventListener("change", (e) => {
  const t = e.target, d = t.dataset || {};
  if (d.trlab) {
    const [id, lid, k] = d.trlab.split("|"), st = trState(id);
    if (t.checked) { st.labs[`${lid}:${k}`] = true; bump(); } else delete st.labs[`${lid}:${k}`];
    save(); return rerender();
  }
  if (d.trqf) { const [id, key] = d.trqf.split("|"); views._trqf[id][key] = t.value; return render(); }
  if (d.tqf) { const [id, key] = d.tqf.split("|"); views._tqf[id][key] = t.value; (views._tqs = views._tqs || {})[id] = null; return render(); }
  if (d.trcert) { const [id, cid] = d.trcert.split("|"), st = trState(id); st.certs[cid] = Object.assign({}, st.certs[cid], { status: t.value }); if (t.value === "Passed") bump(); save(); return; }
  if (d.trcertdate) { const [id, cid] = d.trcertdate.split("|"), st = trState(id); st.certs[cid] = Object.assign({}, st.certs[cid], { date: t.value }); save(); return; }
  if (d.trstartdate) { const st = trState(d.trstartdate); st.start = t.value || null; save(); return render(); }
});

// Remember whether Home's "More" section is open, so re-rendering after a click inside it keeps it open.
document.addEventListener("toggle", (e) => { if (e.target.classList && e.target.classList.contains("home-more")) views._homeMore = e.target.open; }, true);

document.addEventListener("input", (e) => {
  const d = e.target.dataset || {};
  if (d.trcode) { const [id, tid, j] = d.trcode.split("|"); S.code[`tx:${id}:${tid}-${j}`] = e.target.value; save(); }
  if (d.trgl) {
    views._trgl[d.trgl] = e.target.value; const pos = e.target.selectionStart; render();
    const el = document.querySelector(`[data-trgl="${d.trgl}"]`); el.focus(); el.setSelectionRange(pos, pos);
  }
});
