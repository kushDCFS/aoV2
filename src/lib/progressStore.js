import React from "react";
import { scholarships } from "@/lib/scholarshipData";

/**
 * The whole "account" for this site.
 *
 * There is no server-side user, because there is no server-side anything —
 * the site publicly promises it collects zero personal data. So progress is
 * a handful of localStorage keys on one device, and that is the entire
 * storage layer. Nothing here is transmitted, batched, or synced.
 *
 * Two of these keys are already written by the playbook pages via the Layout
 * outlet context (`maps_checked_weeks`, `maps_checked_sat_steps`,
 * `maps_tracked_scholarships`). This module reads the same keys rather than
 * introducing a parallel copy, so the panel reflects real work the student
 * did on the playbook pages, not a separate score.
 */

export const KEYS = {
  weeks: "maps_checked_weeks",
  satSteps: "maps_checked_sat_steps",
  scholarships: "maps_tracked_scholarships",
  outreach: "maps_outreach_log",
  grade: "maps_route_grade",
};

/* Denominators come from the playbook pages that own the checklists.
   AcademicPaths.jsx renders an 8-row bootcamp table and a 7-step SAT
   framework; if either changes, change it here too. */
export const TOTAL_WEEKS = 8;
export const TOTAL_SAT_STEPS = 7;
export const TOTAL_SCHOLARSHIPS = scholarships.length;

/* The next concrete action behind each route segment. Titles only — the
   playbook page remains the source of the actual content. */
const WEEK_PHASES = [
  "Diagnostic & planning",
  "Foundation building I",
  "Foundation building II",
  "Targeted practice I",
  "Targeted practice II",
  "Integration & FRQ practice",
  "Full-length mock exams",
  "Final review",
];

const SAT_PHASES = [
  "Establish your baseline",
  "Link Khan Academy to College Board",
  "Build the daily feedback loop",
  "Maintain a mistakes journal",
  "Escalate difficulty",
  "Final two-week sprint",
  "Test day protocol",
];

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw == null) return fallback;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    /* Private browsing, disabled storage, or corrupted value. Treating this
       as "no progress yet" is the safe direction to fail in — the panel shows
       its empty state rather than throwing on a student's phone. */
    return fallback;
  }
}

function readString(key) {
  try {
    return localStorage.getItem(key) || null;
  } catch {
    return null;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, typeof value === "string" ? value : JSON.stringify(value));
    /* localStorage does not fire `storage` in the tab that wrote it, so the
       panel would go stale after its own writes. One custom event keeps every
       mounted reader in sync. */
    window.dispatchEvent(new CustomEvent("maps:progress"));
    return true;
  } catch {
    return false;
  }
}

/** Append an outreach send. Exported for OutreachLab.jsx to call later. */
export function logOutreachSent(id) {
  const log = readJSON(KEYS.outreach, []);
  write(KEYS.outreach, [...log, { id: id ?? `send-${Date.now()}`, at: Date.now() }]);
}

export function setRouteGrade(grade) {
  write(KEYS.grade, grade);
}

export function clearRouteGrade() {
  try {
    localStorage.removeItem(KEYS.grade);
    window.dispatchEvent(new CustomEvent("maps:progress"));
  } catch {
    /* nothing to clear */
  }
}

function snapshot() {
  const weeks = readJSON(KEYS.weeks, []);
  const satSteps = readJSON(KEYS.satSteps, []);
  const tracked = readJSON(KEYS.scholarships, []);
  const outreach = readJSON(KEYS.outreach, []);
  const grade = readString(KEYS.grade);

  const nextIndex = (done, total) => {
    for (let i = 0; i < total; i += 1) if (!done.includes(i)) return i;
    return null;
  };

  /* Week checkboxes are stored 1-based by AcademicPaths.jsx; SAT steps are
     stored 0-based. Normalise here so the UI never has to care. */
  const weekDone = weeks.map((w) => w - 1).filter((w) => w >= 0);
  const nextWeek = nextIndex(weekDone, TOTAL_WEEKS);
  const nextSat = nextIndex(satSteps, TOTAL_SAT_STEPS);

  const segments = [
    {
      id: "ap",
      label: "AP & IB bootcamp",
      unit: "weeks",
      done: Math.min(weekDone.length, TOTAL_WEEKS),
      total: TOTAL_WEEKS,
      to: "/academic-paths",
      category: "academic",
      next: nextWeek == null ? null : `Week ${nextWeek + 1} — ${WEEK_PHASES[nextWeek]}`,
    },
    {
      id: "sat",
      label: "SAT 1500 framework",
      unit: "steps",
      done: Math.min(satSteps.length, TOTAL_SAT_STEPS),
      total: TOTAL_SAT_STEPS,
      to: "/academic-paths",
      category: "academic",
      next: nextSat == null ? null : `Step ${nextSat + 1} — ${SAT_PHASES[nextSat]}`,
    },
    {
      id: "money",
      label: "Scholarships tracked",
      unit: "awards",
      done: Math.min(tracked.length, TOTAL_SCHOLARSHIPS),
      total: TOTAL_SCHOLARSHIPS,
      to: "/scholarship-finder",
      category: "money",
      next: tracked.length === 0 ? "Star an award to start tracking it" : null,
    },
  ];

  return {
    grade,
    hasRoute: Boolean(grade),
    segments,
    /* Outreach has no honest denominator — there is no correct number of cold
       emails to send — so it is reported as a count, never as a percentage. */
    outreachCount: outreach.length,
    touched:
      weekDone.length + satSteps.length + tracked.length + outreach.length > 0,
  };
}

const EMPTY = {
  grade: null,
  hasRoute: false,
  segments: [],
  outreachCount: 0,
  touched: false,
};

/**
 * Subscribe to the local progress snapshot.
 *
 * Seeded from `EMPTY` and filled in an effect rather than read during render,
 * so the markup is identical on the server-rendered/first paint and on the
 * client. Reading localStorage during render is the classic way to get a
 * hydration mismatch and a flash of the wrong state.
 */
export function useProgress() {
  const [state, setState] = React.useState(EMPTY);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const sync = () => setState(snapshot());
    sync();
    setReady(true);
    window.addEventListener("maps:progress", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("maps:progress", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return { ...state, ready };
}

export const GRADES = [
  { id: "9", label: "9th grade", horizon: "Four years out — time to explore widely." },
  { id: "10", label: "10th grade", horizon: "Three years out — start building a track." },
  { id: "11", label: "11th grade", horizon: "Testing year. Scholarships open next fall." },
  { id: "12", label: "12th grade", horizon: "Application year. Deadlines are live now." },
  { id: "other", label: "Something else", horizon: "Transfer, gap year, or returning student." },
];

export const gradeLabel = (id) => GRADES.find((g) => g.id === id)?.label ?? null;
export const gradeHorizon = (id) => GRADES.find((g) => g.id === id)?.horizon ?? null;
