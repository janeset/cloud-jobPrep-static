"use strict";
// URL routing: every page has an address (#/cloud/learn/networking, #/aws/clf, #/roles/postings),
// so refresh keeps your place, Back/Forward work and any page can be bookmarked.
// The URL is derived from app state after each render; handlers keep setting `tab` and the
// selection as before and never touch the URL themselves.
// Loaded before app.js; it only uses app.js globals (tab, S, views, render...) at call time.

const SIMPLE_TABS = ["home", "companies", "settings"];
const SEL_TRACKS = ["cloud", "roles"]; // tracks whose Learn page has a selected topic

// The address for the current state, without the leading "#/".
function currentPath() {
  const sec = sectionOf(tab), sub = tab.split(":")[1] || "overview";
  if (SEL_TRACKS.includes(sec)) {
    const st = trState(sec);
    if (sub === "learn") return `${sec}/learn/${st.sel || TRACKS[sec].topics[0].id}`;
    if (sub === "ibm" && st.ibmSel && st.ibmSel !== "overview") return `${sec}/ibm/${st.ibmSel}`;
    return `${sec}/${sub}`;
  }
  if (sec === "aws" || sec === "interview") return `${sec}/${sub}`;
  return tab;
}

// Sets state from an address. Unknown addresses fall back to Home.
function applyPath(hash) {
  const parts = decodeURIComponent(String(hash || "").replace(/^#\/?/, "")).split("/").filter(Boolean);
  const [a, b, c] = parts;
  if (!a) { tab = "home"; return; }
  if (SEL_TRACKS.includes(a)) {
    tab = `${a}:${b || "overview"}`;
    if (b === "learn") trState(a).sel = c || null;
    if (b === "ibm") trState(a).ibmSel = parts.slice(2).join("/") || "overview";
  } else if (a === "aws" || a === "interview") tab = `${a}:${b || "overview"}`;
  else if (SIMPLE_TABS.includes(a)) tab = a;
  else tab = "home";
  const s = sectionOf(tab);
  if (s) { S.lastTab = S.lastTab || {}; S.lastTab[s] = tab; }
}

// Called at the end of render(): push a history entry when the page changed. The entry being
// left remembers its scroll position so Back returns to the same spot.
let lastPath = null;
function syncUrl() {
  const p = currentPath();
  if (p === lastPath) return;
  const h = "#/" + p;
  if (lastPath === null) history.replaceState({ y: 0 }, "", h);
  else { history.replaceState({ y: window.scrollY }, "", location.hash); history.pushState({ y: 0 }, "", h); }
  lastPath = p;
}
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
window.addEventListener("popstate", (e) => {
  applyPath(location.hash);
  lastPath = currentPath();
  history.replaceState(e.state, "", "#/" + lastPath);
  render();
  window.scrollTo(0, (e.state && e.state.y) || 0);
});

// Re-render in place: keeps the page scroll position and puts keyboard focus back on the same
// control (matched by id or its first data-* attribute), so ticking a box doesn't jump the page.
function focusKey(el) {
  if (!el || el === document.body) return null;
  if (el.id) return "#" + CSS.escape(el.id);
  const d = Object.keys(el.dataset || {})[0];
  if (!d) return null;
  const attr = "data-" + d.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
  return `${el.tagName.toLowerCase()}[${attr}="${CSS.escape(el.dataset[d])}"]`;
}
function rerender() {
  const y = window.scrollY, key = focusKey(document.activeElement);
  render();
  window.scrollTo(0, y);
  if (key) { const n = document.querySelector(key); if (n) n.focus({ preventScroll: true }); }
}
