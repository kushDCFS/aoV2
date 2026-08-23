import { medicinePrograms } from "./medicine";
import { stemPrograms } from "./stem";
import { csPrograms } from "./cs";
import { businessPrograms } from "./business";
import { humanitiesPrograms } from "./humanities";
import { nationalPrograms } from "./national";
import { artsPrograms } from "./arts";

/**
 * Summer programs — the aggregated catalog.
 *
 * Every entry links DIRECTLY to the host institution's own page. The source
 * list this was built from routed every program through a third-party
 * aggregator; those redirects were discarded rather than republished, for the
 * same reason this site refuses affiliate scholarship links.
 *
 * `cost` is the axis the catalog is built around, because it is the axis that
 * actually decides whether a given student can go:
 *   pays-student  — the student is paid a stipend or wage
 *   free          — no cost to attend
 *   free-plus-aid — free, and travel/housing/meals are covered
 *   costs-money   — the student pays tuition
 *   varies        — genuinely differs by track
 *   unknown       — not verified; shown as unknown rather than guessed
 *
 * `openEnrollment: true` marks programs that admit essentially everyone who
 * pays. Labelling them is the honest thing to do: this site exists because
 * money should not be able to buy the appearance of merit.
 *
 * DEADLINES. Two fields, and the distinction matters:
 *   deadlineISO  — "2027-02-24", only when the host publishes an exact date.
 *                  This is the machine-readable one; the countdown, the sort,
 *                  and the homepage waypoint column all read it and nothing
 *                  else. Never derive it from a guess.
 *   deadline     — the human string, exactly as published ("late February",
 *                  "rolling until filled", "varies by track"). Shown to the
 *                  student when there is no exact date.
 * An entry may have both, either, or neither. A missing deadline is honest; an
 * invented one makes a student plan a year around a date nobody published.
 */

export const COST_TIERS = {
  "pays-student": { label: "Paid to attend", weight: 0, tone: "var(--c-extra)", ink: "var(--c-extra-ink)" },
  "free": { label: "Free", weight: 1, tone: "var(--c-sky)", ink: "var(--c-sky-ink)" },
  "free-plus-aid": { label: "Free + costs covered", weight: 0, tone: "var(--c-extra)", ink: "var(--c-extra-ink)" },
  "varies": { label: "Varies", weight: 2, tone: "var(--c-money)", ink: "var(--c-money-ink)" },
  "costs-money": { label: "Costs money", weight: 3, tone: "var(--c-outreach)", ink: "var(--c-outreach-ink)" },
  "unknown": { label: "Cost unverified", weight: 4, tone: "var(--c-academic)", ink: "var(--c-academic-ink)" },
};

export const CATEGORIES = {
  national: "National & Leadership",
  medicine: "Medicine & Health",
  stem: "Science & Engineering",
  cs: "Computer Science",
  business: "Business",
  humanities: "Humanities & Writing",
  arts: "Arts & Performance",
};

/**
 * Entries withheld from the catalog.
 *
 * Filtered here rather than deleted from the source files: the research behind
 * each one is real and worth keeping, and a program that is suspended this year
 * may reopen next year. Restoring one is a one-line change.
 *
 * Two reasons only — both amount to "a high schooler cannot actually do this":
 *   audience  — the program is not open to current high school students
 *   suspended — the program is not running, per the host's own page
 */
export const WITHHELD = {
  "ialr-biotechnology-intern": "audience — eligibility is recent HS graduates and college students",
  "ialr-coding-robotics": "audience — eligibility is recent HS graduates and college students",
  "binghamton-sri": "audience — requires a year of completed college coursework",
  "pppl-summer-internship": "suspended — PPPL's K-12 page states it will not run in summer 2026",
  "mit-lincoln-lab-hs-internship": "suspended — Lincoln Lab suspended it for the foreseeable future",
  "cincinnati-childrens-hs-summer-internship": "suspended — not offered 2026; applications said to reopen Nov 2026",
  "msu-hshsp": "suspended — no program since 2024 and no confirmation it resumed",
};

/*
 * Category files are researched concurrently and independently, so the same
 * national program (Senate Page, NSLI-Y, Telluride TASS...) sometimes gets
 * filed under both its subject-matter category and `national`. Rather than
 * have researchers cross-check 300+ ids against each other's in-flight work,
 * dedupe here: first occurrence wins, and `national` is listed last so its
 * copy — the more accurate home for a cross-subject program — wins the tie.
 */
const catalog = dedupeById([
  ...medicinePrograms,
  ...stemPrograms,
  ...csPrograms,
  ...businessPrograms,
  ...humanitiesPrograms,
  ...artsPrograms,
  ...nationalPrograms,
]);

function dedupeById(programs) {
  const byId = new Map();
  for (const p of programs) byId.set(p.id, p); // last write wins
  return [...byId.values()];
}

export const allPrograms = catalog.filter((p) => !WITHHELD[p.id]);

/** Kept for reference and for anyone auditing what was removed and why. */
export const withheldPrograms = catalog.filter((p) => WITHHELD[p.id]);

/**
 * True when the entry has a real, resolvable official page.
 *
 * 37 entries carry `url: ""` — the researchers refused to guess a URL they
 * could not verify, which is the correct failure. Those must never render as
 * links; the page shows the program with an "official page not yet verified"
 * note instead of sending a student somewhere that may not exist.
 */
export const hasLink = (p) => typeof p.url === "string" && p.url.startsWith("https://");

/**
 * `social` — optional, additive, and absent on nearly every entry today.
 *
 * { website, instagram } as full URLs, separate from `url` because `url` is
 * the specific apply/program page and a host's marketing site or Instagram is
 * often a different address entirely. Never invented: a program with no
 * verified social presence simply omits the field, and the UI must treat a
 * missing key as "not shown," never as "not found" or an error state.
 */
export const hasWebsite = (p) => typeof p.social?.website === "string" && p.social.website.startsWith("https://");
export const hasInstagram = (p) => typeof p.social?.instagram === "string" && p.social.instagram.startsWith("https://");

/** Free-or-paid first, then by name. The default order is the mission. */
export const byAccessibility = (a, b) => {
  const wa = COST_TIERS[a.cost]?.weight ?? 9;
  const wb = COST_TIERS[b.cost]?.weight ?? 9;
  return wa - wb || a.name.localeCompare(b.name);
};

export const countBy = (key) =>
  allPrograms.reduce((acc, p) => ((acc[p[key]] = (acc[p[key]] || 0) + 1), acc), {});
