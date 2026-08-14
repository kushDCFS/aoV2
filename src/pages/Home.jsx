import React from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Users,
  Award,
  Mail,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { scholarships, noEssayScholarships } from "@/lib/scholarshipData";
import { tracks } from "@/lib/trackData";
import { emailTemplates, professorTemplates } from "@/lib/outreachData";
import { searchLink } from "@/lib/stateScholarshipData";
import EditorialImage from "@/components/EditorialImage";
import { Reveal, RevealGroup, RevealItem, CountUp } from "@/components/Reveal";
import { motion } from "framer-motion";

const totalScholarships = scholarships.length + noEssayScholarships.length;
const totalTracks = tracks?.length || 6;
const totalTemplates = (emailTemplates?.length || 0) + (professorTemplates?.length || 0);

const stats = [
  { label: "Scholarships listed", value: `${totalScholarships}+` },
  { label: "Extracurricular tracks", value: `${totalTracks}` },
  { label: "Outreach templates", value: `${totalTemplates}+` },
  { label: "Cost to use any of it", value: "$0" },
];

const sections = [
  {
    to: "/academic-paths",
    icon: BookOpen,
    title: "Academic Paths",
    description:
      "8-week AP/IB self-study bootcamps and a zero-dollar SAT 1500+ framework built entirely on free resources.",
    meta: "2 frameworks",
  },
  {
    to: "/extracurricular-tracks",
    icon: Users,
    title: "Extracurricular Tracks",
    description:
      "Six career-field tracks with free national competitions, $0 portfolio blueprints, and virtual shadowing playbooks.",
    meta: `${totalTracks} tracks`,
  },
  {
    to: "/scholarship-finder",
    icon: Award,
    title: "Scholarship Finder",
    description:
      "Major national awards alongside no-essay, rolling-monthly money you can enter before the end of today.",
    meta: `${totalScholarships}+ awards`,
  },
  {
    to: "/outreach-lab",
    icon: Mail,
    title: "The Outreach Lab",
    description:
      "Copy-paste cold email templates for research labs, businesses, and nonprofits — plus a follow-up tracker matrix.",
    meta: `${totalTemplates}+ templates`,
  },
];

// Pull just the dollar figure out of a longer award sentence, e.g.
// "Up to $55,000 per year for 4 years (total up to $220,000)." -> "Up to $220,000"
const extractAward = (text) => {
  const matches = text.match(/\$[\d,]+(?:\s?(?:per year|\/year))?/gi);
  if (matches) {
    return matches[matches.length - 1]
      .replace(/\s?(per year|\/year)/i, "")
      // Trailing separators get swept up by the [\d,] class — "$25,000," —
      // so trim any comma the number didn't actually need.
      .replace(/[,.]+$/, "");
  }
  return "Full ride";
};

const opportunityFeed = [
  ...scholarships.map((s) => ({
    name: s.name,
    award: extractAward(s.award),
    tag: "Major award",
    url: s.url || searchLink(s.name),
  })),
  ...noEssayScholarships.map((s) => ({
    name: s.name,
    award: s.award,
    tag: "No essay",
    url: s.url || searchLink(s.name),
  })),
];

const previewFeed = opportunityFeed.slice(0, 10);

const principles = [
  { k: "No account", v: "Nothing is gated. There is no sign-up wall anywhere on this site." },
  { k: "No cost", v: "Every listed resource is free to use or $0 to enter. No affiliate links." },
  { k: "No tracking", v: "We collect zero personal data, so there is nothing to opt out of." },
  { k: "No vagueness", v: "Structured frameworks with dates and steps — not motivational advice." },
];

/* A section header: eyebrow label, title, optional trailing action.
   No icon. Icons beside section titles are a dashboard-template tic. */
function SectionHead({ label, title, action }) {
  return (
    <Reveal className="flex items-end justify-between gap-6 mb-8">
      <div>
        <div className="type-label text-accent">{label}</div>
        <h2 className="type-h2 mt-3 optical-left">{title}</h2>
      </div>
      {action}
    </Reveal>
  );
}

export default function Home() {
  return (
    <div>
      {/* ── Hero ───────────────────────────────────────────────────────────
          Asymmetric 7/5 split. The image is not decoration bolted on the
          right — it carries the emotional argument the copy cannot. The
          hero plays once on load (not on scroll — it's already in view),
          staggered word-group by word-group so the page feels like it
          switched on rather than just appeared. */}
      <section className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <div className="lg:col-span-7">
          <motion.div
            className="type-label text-accent"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            No sign-up · No paywall · Ever
          </motion.div>

          <motion.h1
            className="type-display mt-6 optical-left text-balance"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            Every free admissions opportunity,{" "}
            <span className="type-editorial">in one place.</span>
          </motion.h1>

          <motion.p
            className="type-lead text-foreground/62 mt-7 max-w-[54ch]"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            {totalScholarships}+ scholarships, self-study roadmaps, extracurricular tracks,
            and outreach templates — fully open, nothing held behind an account.
            Browse it like a catalog, not a dashboard.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link to="/scholarship-finder" className="btn-primary">
              Browse {totalScholarships}+ scholarships
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </Link>
            <Link to="/academic-paths" className="btn-secondary">
              Explore academic paths
            </Link>
          </motion.div>

          <motion.p
            className="type-small text-foreground/42 mt-7"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Built for students without a $300/hour counselor.
          </motion.p>
        </div>

        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <EditorialImage
            src="/images/hero-desk.jpg"
            alt="A student working through college applications at a kitchen table in late afternoon light."
            ratio="4 / 5"
            priority
          />
        </motion.div>
      </section>

      {/* ── Stat bar ───────────────────────────────────────────────────────
          One panel with hairline dividers, not four floating cards. Four
          bordered boxes in a row is the single most template-looking pattern
          in dashboard design. */}
      <section className="mt-20 lg:mt-28">
        <Reveal className="panel grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-border">
          {stats.map((stat) => (
            <div key={stat.label} className="px-6 py-7">
              <div className="type-stat tnum">
                <CountUp value={stat.value} />
              </div>
              <div className="type-small text-foreground/50 mt-2">{stat.label}</div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ── Playbooks ──────────────────────────────────────────────────── */}
      <section className="mt-20 lg:mt-28">
        <SectionHead label="The library" title="Four playbooks, fully open" />

        <RevealGroup className="grid gap-4 sm:grid-cols-2">
          {sections.map((section) => (
            <RevealItem key={section.to}>
              <Link to={section.to} className="group card p-7 flex h-full flex-col">
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-foreground/70">
                    <section.icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
                  </div>
                  <span className="type-small text-foreground/38 tnum">{section.meta}</span>
                </div>

                <h3 className="type-h3 mt-6">{section.title}</h3>
                <p className="type-body text-foreground/58 mt-2.5 flex-1">{section.description}</p>

                <span className="link-arrow text-foreground/70 group-hover:text-accent mt-6">
                  Open playbook
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* ── Opportunity feed ───────────────────────────────────────────────
          A catalog is a list, not a grid of cards. Rows separated by
          hairlines scan far faster and read as a real database. */}
      <section className="mt-20 lg:mt-28">
        <SectionHead
          label="Money"
          title="Live opportunity feed"
          action={
            <Link to="/scholarship-finder" className="link-arrow text-accent">
              All {totalScholarships}+ opportunities
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
            </Link>
          }
        />

        <Reveal className="panel overflow-hidden">
          {previewFeed.map((op, i) => (
            <a
              key={op.name}
              href={op.url}
              target="_blank"
              rel="noreferrer"
              className={`row group flex items-center gap-5 px-6 py-4 ${
                i !== 0 ? "border-t border-border" : ""
              }`}
            >
              <span className="type-small text-foreground/28 tnum w-6 flex-shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>

              <span className="type-h4 flex-1 min-w-0 truncate">{op.name}</span>

              <span className="type-small text-foreground/45 hidden sm:block w-24 flex-shrink-0">
                {op.tag}
              </span>

              <span className="type-small font-medium tnum text-right w-32 flex-shrink-0 whitespace-nowrap">
                {op.award}
              </span>

              <ArrowUpRight
                className="h-4 w-4 text-foreground/20 group-hover:text-accent flex-shrink-0 transition-colors"
                strokeWidth={1.8}
              />
            </a>
          ))}
        </Reveal>
      </section>

      {/* ── Mission ────────────────────────────────────────────────────────
          Inverted ink panel. One dark moment breaks a long white page and
          gives the close real weight. */}
      <section className="mt-20 lg:mt-28">
        <Reveal className="panel-ink overflow-hidden grid lg:grid-cols-2" y={30}>
          <div className="p-10 lg:p-14 flex flex-col justify-center">
            <div className="type-label text-white/45">Why this exists</div>

            <h2 className="type-h2 text-white mt-4 optical-left text-balance">
              College admissions shouldn&rsquo;t require a{" "}
              <span className="type-editorial">paid consultant.</span>
            </h2>

            <p className="type-body text-white/60 mt-6 max-w-[46ch]">
              Expensive coaching services sell structure — deadlines, templates, curated
              lists. None of it is secret. We publish the same structure, for free, to
              everyone, permanently.
            </p>

            <dl className="mt-10 grid sm:grid-cols-2 gap-x-8 gap-y-6">
              {principles.map((p) => (
                <div key={p.k}>
                  <dt className="type-h4 text-white">{p.k}</dt>
                  <dd className="type-small text-white/50 mt-1.5">{p.v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-11">
              <Link
                to="/our-mission"
                className="btn-secondary bg-white/[0.07] border-white/15 text-white hover:bg-white/[0.13]"
              >
                Read our mission
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </Link>
            </div>
          </div>

          <div className="relative min-h-[360px] lg:min-h-0">
            <EditorialImage
              src="/images/mission-hall.jpg"
              alt="A student walking alone down a school corridor toward daylight at the end of the hall."
              fill
              scrim
              position="center 38%"
            />
          </div>
        </Reveal>
      </section>
    </div>
  );
}
