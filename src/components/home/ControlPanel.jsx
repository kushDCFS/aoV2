import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check, RotateCcw } from "lucide-react";
import PlaybookBadge from "@/components/home/PlaybookBadge";
import {
  useProgress,
  setRouteGrade,
  clearRouteGrade,
  GRADES,
  gradeHorizon,
} from "@/lib/progressStore";
import {
  deadlineWaypoints,
  approximateWindows,
  WEEKDAYS,
  MONTH_ABBR,
  countdownLabel,
} from "@/lib/deadlines";
import { scholarships } from "@/lib/scholarshipData";

/**
 * The control panel.
 *
 * Reads as a dashboard — dark rail, rounded cards on a soft field, one pastel
 * per playbook — but there is no account behind it. Every number here is either
 * derived from this site's own content or from localStorage on this device.
 * Nothing is fetched and nothing is sent. Where there is no honest number
 * (how many cold emails "should" a student send?) the module reports a count
 * or is omitted rather than inventing a denominator.
 */

/* Colour is always paired with the badge geometry and a text label — it never
   carries meaning by itself. */
const PLAYBOOKS = [
  {
    to: "/academic-paths",
    name: "Academic Paths",
    blurb: "8-week AP/IB bootcamp and a $0 SAT 1500 framework.",
    shape: "contour",
    category: "academic",
    tone: "var(--c-academic)",
    ink: "var(--c-academic-ink)",
  },
  {
    to: "/extracurricular-tracks",
    name: "Extracurricular Tracks",
    blurb: "Career-field tracks, free national competitions, $0 portfolios.",
    shape: "junction",
    category: "extra",
    tone: "var(--c-extra)",
    ink: "var(--c-extra-ink)",
  },
  {
    to: "/scholarship-finder",
    name: "Scholarship Finder",
    blurb: "Major awards open right now, plus how to find local ones.",
    shape: "waypoint",
    category: "money",
    tone: "var(--c-money)",
    ink: "var(--c-money-ink)",
  },
  {
    to: "/outreach-lab",
    name: "The Outreach Lab",
    blurb: "Cold-email templates for labs, businesses and nonprofits.",
    shape: "bearing",
    category: "outreach",
    tone: "var(--c-outreach)",
    ink: "var(--c-outreach-ink)",
  },
];

/* `bar` paints a surface, `ink` paints type — see the note beside the
   *-ink tokens in index.css. */
const SEGMENT_TONE = {
  ap: "var(--c-academic)",
  sat: "var(--c-sky)",
  money: "var(--c-money)",
};

const SEGMENT_INK = {
  ap: "var(--c-academic-ink)",
  sat: "var(--c-sky-ink)",
  money: "var(--c-money-ink)",
};

function Meter({ done, total, tone }) {
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <div
        className="meter flex-1"
        style={{ "--tone": tone }}
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <span style={{ width: `${pct}%` }} />
      </div>
      <span className="tnum w-9 shrink-0 text-right text-[0.8rem] font-semibold text-foreground/70">
        {pct}%
      </span>
    </div>
  );
}

/* ── Empty state ──────────────────────────────────────────────────────────
   This is what almost every visitor sees, so it gets the most design, not the
   least. No zeroed-out bars: one question, five buttons, no verification. */
function PlotRoute() {
  return (
    <div className="dash-card p-6 sm:p-8">
      <div className="type-label" style={{ color: "hsl(var(--c-academic-ink))" }}>
        Start here
      </div>
      <h2 className="type-h2 mt-2">Plot your route.</h2>
      <p className="type-body mt-3 max-w-[46ch] text-foreground/62">
        There is no sign-up and nothing to verify. Say what year you are in and
        this panel becomes your checklist — the four playbooks, ordered by what
        is actually urgent for you.
      </p>

      <fieldset className="mt-7">
        <legend className="type-label text-foreground/45">
          What year are you in?
        </legend>
        <div className="mt-3 flex flex-wrap gap-2.5">
          {GRADES.map((g) => (
            <button
              key={g.id}
              onClick={() => setRouteGrade(g.id)}
              className="dash-tile min-h-[44px] rounded-full border border-[hsl(220_30%_90%)] bg-white px-5 text-[0.875rem] font-medium text-foreground/78 hover:border-transparent hover:text-foreground"
              style={{ "--tw-ring-color": "hsl(var(--c-academic))" }}
            >
              {g.label}
            </button>
          ))}
        </div>
      </fieldset>

      <p className="type-small mt-7 flex items-start gap-2 text-foreground/45">
        <span
          aria-hidden="true"
          className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full"
          style={{ background: "hsl(var(--c-extra))" }}
        />
        Saved on this device only. There is no account and no server — nothing
        you check off here is ever sent anywhere.
      </p>
    </div>
  );
}

/* ── Populated state ─────────────────────────────────────────────────────── */
function YourProgress({ grade, segments, outreachCount }) {
  const horizon = gradeHorizon(grade);

  return (
    <div className="dash-card p-6 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="type-label" style={{ color: "hsl(var(--c-academic-ink))" }}>
            Your route
          </div>
          <h2 className="type-h2 mt-2">Your progress.</h2>
          {horizon && (
            <p className="type-small mt-2 text-foreground/55">{horizon}</p>
          )}
        </div>
        <button
          onClick={clearRouteGrade}
          className="press flex min-h-[44px] items-center gap-1.5 rounded-full px-3 text-[0.78rem] font-medium text-foreground/45 hover:bg-[hsl(var(--panel))] hover:text-foreground/75"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Reset
        </button>
      </div>

      <ul className="mt-7 space-y-5">
        {segments.map((seg) => (
          <li key={seg.id}>
            <div className="flex items-baseline justify-between gap-3">
              <Link
                to={seg.to}
                className="text-[0.9rem] font-semibold text-foreground hover:underline"
              >
                {seg.label}
              </Link>
              <span className="tnum type-small shrink-0 text-foreground/45">
                {seg.done > 0
                  ? `${seg.done} of ${seg.total} ${seg.unit}`
                  : `${seg.total} ${seg.unit}`}
              </span>
            </div>
            {/* A segment nobody has started yet is shown as an invitation, not
                as a 0% bar. Four zeroed meters is the first thing a new student
                would see otherwise, and it reads as failure before they have
                done anything. */}
            {seg.done > 0 && (
              <div className="mt-2.5">
                <Meter done={seg.done} total={seg.total} tone={SEGMENT_TONE[seg.id]} />
              </div>
            )}
            {seg.next && (
              <Link
                to={seg.to}
                className="type-small mt-2 inline-flex items-center gap-1.5 font-medium hover:underline"
                style={{ color: `hsl(${SEGMENT_INK[seg.id]})` }}
              >
                {seg.done > 0 ? "Next" : "Start"} — {seg.next}
                <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </Link>
            )}
            {!seg.next && seg.done === seg.total && (
              <p
                className="type-small mt-2 flex items-center gap-1.5 font-medium"
                style={{ color: "hsl(var(--c-extra-ink))" }}
              >
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
                Complete
              </p>
            )}
          </li>
        ))}

        {/* Reported as a count, deliberately. There is no correct number of
            cold emails, so a percentage here would be a fabricated target. */}
        <li className="flex items-center justify-between border-t border-[hsl(220_30%_94%)] pt-5">
          <Link
            to="/outreach-lab"
            className="text-[0.9rem] font-semibold text-foreground hover:underline"
          >
            Outreach emails sent
          </Link>
          <span
            className="tnum rounded-full px-3 py-1 text-[0.8rem] font-semibold"
            style={{
              background: "hsl(var(--c-outreach) / 0.22)",
              color: "hsl(var(--c-outreach-ink))",
            }}
          >
            {outreachCount}
          </span>
        </li>
      </ul>
    </div>
  );
}

/* ── Deadlines ────────────────────────────────────────────────────────────
   Dates are derived in lib/deadlines.js from the scholarship data; anything
   that cannot be resolved to a real calendar date is dropped, not guessed. */
function Waypoints() {
  const exact = React.useMemo(() => deadlineWaypoints(4), []);
  /* Exact calendar dates are preferred, but the awards that remain publish
     prose windows rather than dates. Falling back to the stated window keeps
     this column useful without inventing a deadline. */
  const windows = React.useMemo(
    () => (exact.length ? [] : approximateWindows(scholarships, 4)),
    [exact.length]
  );
  if (exact.length === 0 && windows.length === 0) return null;

  return (
    <div
      className="rounded-[var(--r-card)] p-6 sm:p-7"
      style={{ background: "hsl(var(--panel))" }}
    >
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="type-h4">Closing soonest</h3>
        <Link
          to="/scholarship-finder"
          className="type-small inline-flex items-center gap-1 font-medium text-foreground/55 hover:text-foreground"
        >
          All <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
      <p className="type-small mt-1 text-foreground/50">
        {exact.length
          ? "Open right now, sorted by what closes first."
          : "Typical application windows — always confirm the exact date on the award\u2019s own page."}
      </p>

      <ul className="mt-5 space-y-2.5">
        {exact.map((d, i) => (
          <li key={`${d.name}-${i}`}>
            <a
              href={d.url}
              target="_blank"
              rel="noopener noreferrer"
              className="dash-tile flex items-stretch gap-4 bg-white p-4"
            >
              <div
                className="flex w-14 shrink-0 flex-col items-center justify-center rounded-xl py-2"
                style={{ background: `hsl(${i === 0 ? "var(--c-money)" : "var(--c-sky)"} / 0.16)` }}
              >
                <span className="type-label text-foreground/45">{WEEKDAYS[d.date.getDay()]}</span>
                <span className="tnum text-[1.35rem] font-bold leading-none text-foreground">
                  {d.date.getDate()}
                </span>
                <span className="type-label text-foreground/45">{MONTH_ABBR[d.date.getMonth()]}</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[0.875rem] font-semibold leading-snug text-foreground">{d.name}</p>
                <p className="type-small mt-1 text-foreground/50">{d.award}</p>
                <p
                  className="type-small mt-1.5 font-semibold"
                  style={{ color: d.daysAway <= 7 ? "hsl(350 70% 42%)" : "hsl(var(--c-academic-ink))" }}
                >
                  {countdownLabel(d.daysAway)}
                </p>
              </div>
            </a>
          </li>
        ))}

        {windows.map((w, i) => (
          <li key={w.name}>
            <a
              href={w.url}
              target="_blank"
              rel="noopener noreferrer"
              className="dash-tile flex items-stretch gap-4 bg-white p-4"
            >
              <div
                className="flex w-14 shrink-0 flex-col items-center justify-center rounded-xl py-2.5"
                style={{ background: `hsl(${i === 0 ? "var(--c-money)" : "var(--c-sky)"} / 0.16)` }}
              >
                <span className="type-label text-center leading-tight text-foreground/50">
                  {w.window.split(" ")[0]}
                </span>
                <span className="text-[0.95rem] font-bold leading-none text-foreground">
                  {w.month.slice(0, 3)}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[0.875rem] font-semibold leading-snug text-foreground">{w.name}</p>
                  <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-foreground/30" aria-hidden="true" />
                </div>
                <p className="type-small mt-1 line-clamp-2 text-foreground/50">{w.award}</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Playbook tiles ───────────────────────────────────────────────────────── */
function Playbooks() {
  return (
    <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {PLAYBOOKS.map((p) => (
        <Link
          key={p.to}
          to={p.to}
          className="dash-tile group bg-white p-5"
          style={{ "--cat": p.tone, boxShadow: "var(--shadow-card)" }}
        >
          <span
            className="flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{ background: `hsl(${p.tone} / 0.16)` }}
          >
            <PlaybookBadge shape={p.shape} category={p.category} className="h-9 w-9" />
          </span>
          <h3 className="type-h4 mt-4">{p.name}</h3>
          <p className="type-small mt-1.5 leading-snug text-foreground/55">
            {p.blurb}
          </p>
          <span
            className="type-small mt-4 inline-flex items-center gap-1 font-semibold"
            style={{ color: `hsl(${p.ink})` }}
          >
            Open
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </span>
        </Link>
      ))}
    </div>
  );
}

export default function ControlPanel({ scholarshipCount }) {
  const { hasRoute, grade, segments, outreachCount, ready } = useProgress();

  return (
    <section>
      <div className="type-label" style={{ color: "hsl(var(--c-academic-ink))" }}>
        Your workspace
      </div>
      <h2 className="type-h2 mt-2 max-w-[20ch]">Your admissions control panel.</h2>
      <p className="type-body mt-2.5 max-w-[62ch] text-foreground/60">
        Pick your year and this becomes a checklist — the four playbooks ordered
        by what is urgent for you, and the deadlines that are open right now.
      </p>

      <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1.38fr)_minmax(0,1fr)] lg:gap-5">
        <div>
          {/* `ready` gates only the swap between the two real states — it never
              renders placeholder numbers. */}
          {ready && hasRoute ? (
            <YourProgress
              grade={grade}
              segments={segments}
              outreachCount={outreachCount}
            />
          ) : (
            <PlotRoute />
          )}
        </div>
        <Waypoints />
      </div>

      <Playbooks />
    </section>
  );
}
