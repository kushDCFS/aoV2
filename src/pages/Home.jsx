import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { scholarships } from "@/lib/scholarshipData";
import { tracks } from "@/lib/trackData";
import { emailTemplates, professorTemplates } from "@/lib/outreachData";
import { searchLink } from "@/lib/stateScholarshipData";
import { Reveal, CountUp } from "@/components/Reveal";
import ControlPanel from "@/components/home/ControlPanel";
import { allPrograms } from "@/lib/programs";

/* Every number on this page is derived from the catalogs, never typed in.
   A landing page that overstates what is behind it is the same problem as a
   consultant who overstates what they can do for you. */
const totalScholarships = scholarships.length;
const totalTracks = tracks?.length || 6;
const totalTemplates = (emailTemplates?.length || 0) + (professorTemplates?.length || 0);
const freeOrPaidPrograms = allPrograms.filter((p) =>
  ["pays-student", "free", "free-plus-aid"].includes(p.cost)
).length;

const stats = [
  { value: `${freeOrPaidPrograms}`, label: "Summer programs that are free, or pay you" },
  { value: `${totalScholarships}`, label: "Major scholarships, linked direct" },
  { value: `${totalTracks}`, label: "Extracurricular tracks" },
  { value: `${totalTemplates}+`, label: "Cold-email templates" },
];

/* The four promises, stated as what we refuse to do. Easier to hold us to. */
const promises = [
  {
    k: "No account, ever",
    v: "Nothing is gated. There is no sign-up wall anywhere on this site, and no email box asking for yours.",
    tone: "var(--c-academic)",
  },
  {
    k: "No affiliate links",
    v: "We removed every referral link that paid us. Each program and award points straight at the institution running it.",
    tone: "var(--c-extra)",
  },
  {
    k: "Nothing collected",
    v: "There is no server storing anything about you. What you check off is saved on your own device and never sent.",
    tone: "var(--c-sky)",
  },
  {
    k: "No vague advice",
    v: "Dated frameworks, real deadlines, and templates you can paste today — not “follow your passion.”",
    tone: "var(--c-outreach)",
  },
];

const extractAward = (text) => {
  const matches = text.match(/\$[\d,]+(?:\s?(?:per year|\/year))?/gi);
  if (matches) {
    return matches[matches.length - 1]
      .replace(/\s?(per year|\/year)/i, "")
      .replace(/[,.]+$/, "");
  }
  return "Full ride";
};

const previewFeed = scholarships
  .map((s) => ({
    name: s.name,
    award: extractAward(s.award),
    url: s.url || searchLink(s.name),
  }))
  .slice(0, 8);

function SectionHead({ label, title, blurb, action, tone = "var(--c-academic-ink)" }) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-[54ch]">
        <div className="type-label" style={{ color: `hsl(${tone})` }}>
          {label}
        </div>
        <h2 className="type-h2 mt-2">{title}</h2>
        {blurb && <p className="type-body mt-2.5 text-foreground/60">{blurb}</p>}
      </div>
      {action}
    </div>
  );
}

export default function Home() {
  return (
    <div>
      {/* ── Why this exists ─────────────────────────────────────────────────
          The landing has to answer one question before anything else: why
          should a student trust a free site about a thing everyone else
          charges for. So the reason comes first, and the tool comes second. */}
      <section className="panel-field rounded-[var(--r-card)] px-6 pb-12 pt-11 sm:px-9 lg:px-12 lg:pb-16 lg:pt-16">
        <div className="max-w-[60ch]">
          <span
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[0.78rem] font-semibold"
            style={{
              background: "hsl(var(--c-extra) / 0.18)",
              color: "hsl(var(--c-extra-ink))",
            }}
          >
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "hsl(var(--c-extra-ink))" }}
            />
            Free forever · No account · No data collected
          </span>

          <h1 className="type-display mt-6">
            Getting into a great college shouldn&rsquo;t depend on what your
            family can pay.
          </h1>

          <p className="type-lead mt-5 text-foreground/65">
            Private admissions consultants charge thousands of dollars for
            something that is mostly just structure — which programs exist, when
            they close, and what to write. None of that is secret. We publish all
            of it, for free, to everyone, permanently.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/summer-programs"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full px-6 text-[0.95rem] font-semibold text-white transition-transform hover:-translate-y-0.5"
              style={{ background: "hsl(var(--c-academic-ink))" }}
            >
              Find a free summer program
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              to="/our-mission"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-white px-6 text-[0.95rem] font-semibold text-foreground/80 transition-transform hover:-translate-y-0.5 hover:text-foreground"
            >
              Why we built this
            </Link>
          </div>
        </div>

        {/* Proof, immediately under the claim. */}
        <Reveal className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="dash-card p-5 sm:p-6">
              <div className="type-stat tnum">
                <CountUp value={s.value} />
              </div>
              <div className="type-small mt-2 leading-snug text-foreground/55">
                {s.label}
              </div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ── The tool ───────────────────────────────────────────────────────── */}
      <section className="mt-14 lg:mt-20">
        <ControlPanel scholarshipCount={totalScholarships} />
      </section>

      {/* ── What we refuse to do ───────────────────────────────────────────
          Promises are easier to verify when they are stated as refusals. */}
      <section className="mt-16 lg:mt-24">
        <SectionHead
          label="How this works"
          title="Four things we will never do."
          blurb="Most free college sites are free because you are the product. Here is what we give up in order not to be."
          tone="var(--c-extra-ink)"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {promises.map((p) => (
            <div key={p.k} className="dash-card p-6">
              <span
                aria-hidden="true"
                className="block h-1.5 w-10 rounded-full"
                style={{ background: `hsl(${p.tone})` }}
              />
              <h3 className="type-h4 mt-4">{p.k}</h3>
              <p className="type-small mt-2 leading-relaxed text-foreground/60">
                {p.v}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Awards ─────────────────────────────────────────────────────────── */}
      <section className="mt-16 lg:mt-24">
        <SectionHead
          label="Money"
          title="The awards actually worth your time."
          blurb="No-essay sweepstakes were removed from this site — they sell your contact details and pay out like a raffle. These are the real ones."
          tone="var(--c-money-ink)"
          action={
            <Link
              to="/scholarship-finder"
              className="type-small inline-flex items-center gap-1.5 font-semibold"
              style={{ color: "hsl(var(--c-money-ink))" }}
            >
              All {totalScholarships} awards
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          }
        />
        <ul className="dash-card divide-y divide-[hsl(220_30%_95%)] overflow-hidden">
          {previewFeed.map((s, i) => (
            <li key={s.name}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-[hsl(var(--panel))] sm:px-6"
              >
                <span className="tnum type-small w-6 shrink-0 text-foreground/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1 text-[0.9rem] font-semibold text-foreground">
                  {s.name}
                </span>
                <span
                  className="tnum shrink-0 rounded-full px-3 py-1 text-[0.8rem] font-semibold"
                  style={{
                    background: "hsl(var(--c-money) / 0.2)",
                    color: "hsl(var(--c-money-ink))",
                  }}
                >
                  {s.award}
                </span>
                <ArrowUpRight
                  className="h-4 w-4 shrink-0 text-foreground/25"
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Closing ────────────────────────────────────────────────────────── */}
      <section className="mt-16 lg:mt-24">
        <div
          className="overflow-hidden rounded-[var(--r-card)] px-6 py-12 sm:px-10 lg:px-14 lg:py-16"
          style={{ background: "hsl(var(--rail))" }}
        >
          <div className="max-w-[56ch]">
            <div className="type-label text-white/45">Why we exist</div>
            <h2 className="type-h1 mt-3 text-white">
              The information was never the hard part.{" "}
              <span className="type-editorial text-white/70">
                Access to it was.
              </span>
            </h2>
            <p className="type-body mt-5 text-white/65">
              A student with a $6,000 consultant and a student without one are
              not separated by talent. They are separated by a list of deadlines
              and a few templates. That gap is small, it is entirely fixable, and
              closing it is the only thing this site does.
            </p>
            <p className="type-body mt-4 text-white/65">
              {allPrograms.length} summer programs, {totalScholarships} major
              scholarships, and every playbook on this site are free and will
              stay free. You never have to tell us who you are.
            </p>
            <Link
              to="/our-mission"
              className="mt-8 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-white px-6 text-[0.95rem] font-semibold text-foreground transition-transform hover:-translate-y-0.5"
            >
              Read the full mission
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
