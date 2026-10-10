"use strict";
// Shared by the content files: the video helpers, the track registry and extendTrack.
// Loaded first; each track file registers itself in TRACKS (trackview.js, roleview.js).

// A verified YouTube video: id, title, channel.
const V = (id, title, ch) => ({ id, title, ch });
const IBM = (id, title) => V(id, title, "IBM Technology");
const IBM_CHANNEL = { name: "IBM Technology", url: "https://www.youtube.com/@IBMTechnology" };

const TRACKS = {};

// Merge extra learning (cloud-more.js / ai-more.js) into a track. New groups/weeks replace the
// old ones, and topics are re-ordered to follow the groups so Previous/Next matches the sidebar.
function extendTrack(T, x) {
  T.topics.push(...(x.topics || []));
  for (const [tid, html] of Object.entries(x.append || {})) { const t = T.topics.find((t) => t.id === tid); t.body += html; }
  for (const [tid, exs] of Object.entries(x.exercises || {})) { const t = T.topics.find((t) => t.id === tid); t.exercises = (t.exercises || []).concat(exs); }
  for (const [tid, cards] of Object.entries(x.cards || {})) { const t = T.topics.find((t) => t.id === tid); t.cards = t.cards.concat(cards); }
  if (x.groups) T.groups = x.groups;
  if (x.weeks) T.weeks = x.weeks;
  const order = T.groups.flatMap(([, ids]) => ids);
  T.topics.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
  T.questions.push(...(x.questions || []));
  T.quiz.push(...(x.quiz || []));
  T.glossary = (T.glossary || []).concat(x.glossary || []).sort((a, b) => a[0].localeCompare(b[0]));
  T.certs.push(...(x.certs || []));
  for (const [cid, tids] of Object.entries(x.certTopics || {})) { const c = T.certs.find((c) => c.id === cid); c.topics = [...new Set(c.topics.concat(tids))]; }
  for (const [k, list] of Object.entries(x.videos || {})) T.videos[k] = (T.videos[k] || []).concat(list);
}
