import { scholarships } from "@/lib/scholarshipData";

/**
 * Real deadlines, derived — never authored here.
 *
 * `scholarshipData.js` is owned by someone else and is actively being
 * fact-checked and re-dated, so this module hardcodes no date, no award and
 * no scholarship name. It reads whatever that file currently says and
 * converts only the statements that are *unambiguously* convertible into a
 * calendar date. Anything vague ("Rolling", "Varies", "Annual, check dates",
 * a month named inside a prose strategy paragraph) is deliberately dropped
 * rather than guessed at. A missing waypoint is honest; an invented one is not.
 *
 * If the data file later grows a machine-readable field, this picks it up
 * automatically — see ISO_FIELDS.
 */

const ISO_FIELDS = ["deadlineISO", "deadlineDate", "dueDate", "closesOn"];

const MONTHS = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
];

const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const lastDayOfMonth = (y, m) => new Date(y, m + 1, 0);

/** The next occurrence of day-of-month `day`, at or after `from`. */
function nextMonthlyDay(day, from) {
  const y = from.getFullYear();
  const m = from.getMonth();
  const clamp = (yy, mm) => Math.min(day, lastDayOfMonth(yy, mm).getDate());
  const thisMonth = new Date(y, m, clamp(y, m));
  if (thisMonth >= from) return thisMonth;
  const nm = new Date(y, m + 1, 1);
  return new Date(nm.getFullYear(), nm.getMonth(), clamp(nm.getFullYear(), nm.getMonth()));
}

/** The end of the current month, or the next one if this month's has passed. */
function nextMonthEnd(from) {
  const end = lastDayOfMonth(from.getFullYear(), from.getMonth());
  if (end >= from) return end;
  return lastDayOfMonth(from.getFullYear(), from.getMonth() + 1);
}

/** The next occurrence of a fixed calendar day, e.g. "September 30". */
function nextFixedDate(monthIndex, day, from) {
  const candidate = new Date(from.getFullYear(), monthIndex, day);
  if (candidate >= from) return candidate;
  return new Date(from.getFullYear() + 1, monthIndex, day);
}

/**
 * Turn one deadline sentence into { date, recurrence } — or null when the
 * sentence does not actually name a date we can stand behind.
 */
export function parseDeadline(raw, from = new Date()) {
  if (typeof raw !== "string") return null;
  const text = raw.trim().toLowerCase();
  if (!text) return null;
  const today = startOfDay(from);

  // "Monthly", "Rolling monthly", "End of every month", "Last day of each month"
  if (/(^|\b)(monthly|end of (every|each) month|last day of (each|every) month)\b/.test(text)) {
    return { date: nextMonthEnd(today), recurrence: "Recurs every month" };
  }

  // "28th or 29th of each month" — take the earliest day named, so we never
  // tell a student a deadline is later than it might be.
  const ordinal = text.match(/(\d{1,2})\s*(?:st|nd|rd|th)?(?:\s*or\s*\d{1,2}\s*(?:st|nd|rd|th)?)?\s*of (?:each|every) month/);
  if (ordinal) {
    const day = parseInt(ordinal[1], 10);
    if (day >= 1 && day <= 31) {
      return { date: nextMonthlyDay(day, today), recurrence: "Recurs every month" };
    }
  }

  // "September 30" / "30 September"
  const monthDay = text.match(
    new RegExp(`\\b(${MONTHS.join("|")})\\w*\\s+(\\d{1,2})\\b`)
  );
  if (monthDay) {
    const m = MONTHS.indexOf(monthDay[1]);
    const day = parseInt(monthDay[2], 10);
    if (m >= 0 && day >= 1 && day <= lastDayOfMonth(2024, m).getDate()) {
      return { date: nextFixedDate(m, day, today), recurrence: "Annual" };
    }
  }

  // Everything else — "Rolling", "Quarterly", "Varies", "Annual, check dates" —
  // names no date. Say nothing.
  return null;
}

/** Read whichever machine-readable date field the data file happens to carry. */
function isoDate(item) {
  for (const field of ISO_FIELDS) {
    const value = item?.[field];
    if (!value) continue;
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) return startOfDay(parsed);
  }
  return null;
}

/**
 * Every award in the data file whose deadline resolves to a real upcoming
 * date, soonest first. Awards without a resolvable date are omitted.
 */
export function upcomingDeadlines(from = new Date()) {
  const today = startOfDay(from);

  return [...scholarships]
    .map((item) => {
      const iso = isoDate(item);
      const parsed = iso ? { date: iso, recurrence: null } : parseDeadline(item.deadline, today);
      if (!parsed || parsed.date < today) return null;
      return {
        name: item.name,
        award: item.award,
        url: item.url,
        source: item.deadline || null,
        recurrence: parsed.recurrence,
        date: parsed.date,
        daysAway: Math.round((parsed.date - today) / 86400000),
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.date - b.date || a.name.localeCompare(b.name));
}

/**
 * Waypoints for the panel: soonest first, one per distinct date before we
 * allow a second on the same date. Six identical month-end cards would be
 * accurate and useless.
 */
export function deadlineWaypoints(limit = 3, from = new Date()) {
  const all = upcomingDeadlines(from);
  const seen = new Set();
  const distinct = [];
  const rest = [];
  for (const item of all) {
    const key = item.date.toDateString();
    if (seen.has(key)) rest.push(item);
    else {
      seen.add(key);
      distinct.push(item);
    }
  }
  const picked = [...distinct, ...rest].slice(0, limit);
  return picked.map((item) => ({
    ...item,
    alsoOnThisDate: all.filter(
      (o) => o !== item && o.date.getTime() === item.date.getTime()
    ).length,
  }));
}

export const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const MONTH_ABBR = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function countdownLabel(daysAway) {
  if (daysAway === 0) return "Today";
  if (daysAway === 1) return "Tomorrow";
  return `${daysAway} days`;
}

/* ---------------------------------------------------------------------------
   Approximate application windows.

   The 12 remaining awards publish their timing as prose ("apply by late
   September"), not as a date. The precise-date sweepstakes that used to fill
   the waypoint column were removed for selling student data, so rather than
   leave that column empty — or invent a calendar date nobody published — we
   surface the window the organisation actually stated, labelled as approximate,
   with the instruction to confirm at the source. An approximate month a student
   can act on beats a precise lie.
   --------------------------------------------------------------------------- */

const WINDOW_RE =
  /\b(early|mid|late)[- ](January|February|March|April|May|June|July|August|September|October|November|December)\b/i;

const MONTH_INDEX = {
  january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
  july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
};

/** Sort key: months from now, so the soonest window leads. */
function monthsAway(monthName, from = new Date()) {
  const m = MONTH_INDEX[monthName.toLowerCase()];
  if (m == null) return 99;
  const diff = m - from.getMonth();
  return diff < 0 ? diff + 12 : diff;
}

/**
 * Awards whose published strategy text names an application window.
 * Anything without one is omitted rather than guessed at.
 */
export function approximateWindows(list, limit = 4, from = new Date()) {
  return list
    .map((s) => {
      const hit = WINDOW_RE.exec(s.strategy || "");
      if (!hit) return null;
      const [, qualifier, month] = hit;
      return {
        name: s.name,
        url: s.url || "",
        award: s.award || "",
        window: `${qualifier.toLowerCase()} ${month}`,
        month,
        sortKey: monthsAway(month, from),
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.sortKey - b.sortKey)
    .slice(0, limit);
}
