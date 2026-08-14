import React from "react";
import { useOutletContext } from "react-router-dom";
import { ExternalLink, Check } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import EditorialImage from "@/components/EditorialImage";
import { Reveal, RevealGroup, RevealItem, CountUp } from "@/components/Reveal";

const apBootcampWeeks = [
  { week: "1", phase: "Diagnostic & Planning", actions: "Take a full practice exam; identify 3 weakest units", resources: "AP Classroom (free via teacher), College Board AP Course Audit practice questions" },
  { week: "2", phase: "Foundation Building I", actions: "Study 2-3 weak units using free textbooks", resources: "OpenStax (free, peer-reviewed textbooks for AP Bio, Chem, Physics, Calculus)" },
  { week: "3", phase: "Foundation Building II", actions: "Continue studying weak units; start Anki deck", resources: "OpenStax, MIT OpenCourseWare (free lecture notes and videos)" },
  { week: "4", phase: "Targeted Practice I", actions: "Complete practice questions for studied units", resources: "AP Classroom progress checks, Khan Academy (AP Bio, Chem, Physics, Calc, US/World History, Econ)" },
  { week: "5", phase: "Targeted Practice II", actions: "Daily Anki review (30 min); continue practice", resources: "Anki (free, open-source flashcard app), shared AP decks from r/Anki and r/APStudents" },
  { week: "6", phase: "Integration & FRQ Practice", actions: "Practice free-response questions with scoring guidelines", resources: "Past FRQs from College Board (released exams with scoring guidelines)" },
  { week: "7", phase: "Full-Length Mock Exams", actions: "Take 2 full practice exams under timed conditions", resources: "Released exams (ask teacher), Varsity Tutors free practice tests" },
  { week: "8", phase: "Final Review & Weakness Targeting", actions: "Review mistakes journal; re-study remaining weak spots", resources: "Anki review, AP Classroom videos, Crash Course (YouTube) for quick concept review" },
];

const freeResources = [
  { name: "OpenStax", url: "https://openstax.org/", description: "Free, peer-reviewed textbooks for AP Biology, Chemistry, Physics, and Calculus." },
  { name: "Khan Academy AP Courses", url: "https://www.khanacademy.org/", description: "Free video lessons and practice for 10+ AP subjects, aligned with College Board standards." },
  { name: "MIT OpenCourseWare", url: "https://ocw.mit.edu/", description: "Free MIT lecture notes, exams, and videos for advanced STEM subjects." },
  { name: "Anki", url: "https://apps.ankiweb.net/", description: "Free, open-source spaced-repetition flashcard app. Search r/Anki for shared AP decks." },
  { name: "AP Classroom", url: "https://myap.collegeboard.org/", description: "Free official College Board practice questions and videos (access through your teacher)." },
  { name: "Crash Course (YouTube)", url: "https://www.youtube.com/user/crashcourse", description: "Free, fast-paced concept review videos for AP History, Science, and Government." },
];

const satSteps = [
  {
    title: "Establish your baseline",
    content: "Take a full-length official College Board SAT practice test (Tests 1-10 are free on Khan Academy / College Board). Score it using the official scoring guide. Log your score and identify your 3 weakest sub-skills.",
  },
  {
    title: "Connect Khan Academy to College Board",
    content: "Create a free Khan Academy account and link it to your College Board account. This imports your PSAT/SAT scores and generates a personalized practice plan — the only free resource with official College Board questions.",
  },
  {
    title: "Build the daily feedback loop (6-8 weeks)",
    content: "Monday–Friday: 45-60 minutes of targeted practice — 20 min lesson videos, 20 min exercises, 10 min reviewing every wrong answer in a mistakes journal. Saturday: one full timed section. Sunday: review the week's mistakes.",
  },
  {
    title: "Maintain a mistakes journal",
    content: "Three columns: Question/Concept, Why I Got It Wrong, Correct Approach. Review it before every session. This is the single highest-yield habit for breaking 1500.",
  },
  {
    title: "Escalate difficulty (weeks 5-6)",
    content: "Once you're scoring 700+ on a section, switch from exercises to full official practice tests. One full test per week under realistic conditions. Use Tests 7-10 — the most recent and relevant.",
  },
  {
    title: "Final two-week sprint",
    content: "Take 2-3 full practice tests in the final two weeks. Focus entirely on your mistakes journal. Do not learn new content — refine your test-taking strategy and timing.",
  },
  {
    title: "Test day protocol",
    content: "Sleep 8 hours the night before. Eat a protein-rich breakfast. Arrive early with your admission ticket, ID, approved calculator, and snacks. Between sections, breathe and reset — don't dwell on the last one.",
  },
];

export default function AcademicPaths() {
  const { checkedWeeks, toggleWeek, checkedSatSteps, toggleSatStep } = useOutletContext();

  return (
    <div>
      <PageHeader
        eyebrow="Playbook"
        title="Academic paths"
        subtitle="Structured, zero-cost frameworks for AP/IB exams and SAT prep. No paid courses, no tutors — just free resources used in a proven system."
      />

      {/* ── AP/IB section ────────────────────────────────────────────────── */}
      <section>
        <Reveal className="flex items-end justify-between gap-6 mb-6">
          <div>
            <div className="type-label text-accent">Standardized testing</div>
            <h2 className="type-h2 mt-3 optical-left">AP &amp; IB self-study bootcamps</h2>
            <p className="type-body text-foreground/58 mt-3 max-w-[52ch]">
              An 8-week structured timeline. Check off each week as you complete it.
            </p>
          </div>
          <div className="hidden sm:block text-right flex-shrink-0">
            <div className="type-stat tnum">
              <CountUp value={`${checkedWeeks.length}`} />
              <span className="text-foreground/30">/8</span>
            </div>
            <div className="type-small text-foreground/45 mt-1">weeks done</div>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="panel overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Week</th>
                <th>Phase</th>
                <th>Key actions</th>
                <th>Free resources</th>
              </tr>
            </thead>
            <tbody>
              {apBootcampWeeks.map((row) => {
                const weekNum = parseInt(row.week, 10);
                const isChecked = checkedWeeks.includes(weekNum);
                return (
                  <tr key={row.week}>
                    <td>
                      <label className="flex items-center gap-3 cursor-pointer press select-none">
                        <span
                          className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border transition-colors duration-150 ${
                            isChecked ? "bg-accent border-accent" : "border-border bg-card"
                          }`}
                        >
                          {isChecked && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                        </span>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleWeek(weekNum)}
                          className="sr-only"
                        />
                        <span className={isChecked ? "text-foreground/40 line-through" : "text-foreground"}>
                          Week {row.week}
                        </span>
                      </label>
                    </td>
                    <td className="font-medium text-foreground whitespace-nowrap">{row.phase}</td>
                    <td className="min-w-[220px]">{row.actions}</td>
                    <td className="min-w-[260px]">{row.resources}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Reveal>
      </section>

      {/* ── Photo break ──────────────────────────────────────────────────
          A wide, short cinematic strip — not a sidebar squeezed against a
          4-column table, which cramped every cell. */}
      <section className="mt-12">
        <Reveal>
          <EditorialImage
            src="/images/academic-desk.jpg"
            alt="An overhead flat-lay of a hand-drawn 8-week study grid in a spiral notebook, several rows checked off, morning light from the top-left."
            ratio="21 / 6"
            className="hidden sm:block"
          />
        </Reveal>
      </section>

      {/* ── Free resources ──────────────────────────────────────────────── */}
      <section className="mt-16 pt-12 border-t border-border">
        <Reveal>
          <h3 className="type-h3">Core free resources</h3>
        </Reveal>

        <RevealGroup className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {freeResources.map((res) => (
            <RevealItem key={res.name}>
              <a
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group card p-6 flex h-full flex-col"
              >
                <div className="flex items-center justify-between gap-2">
                  <h4 className="type-h4 group-hover:text-accent transition-colors duration-150">
                    {res.name}
                  </h4>
                  <ExternalLink className="h-3.5 w-3.5 text-foreground/25 group-hover:text-accent flex-shrink-0 transition-colors duration-150" />
                </div>
                <p className="type-small text-foreground/58 mt-2 flex-1">{res.description}</p>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* ── SAT framework ────────────────────────────────────────────────── */}
      <section className="mt-20 lg:mt-28">
        <Reveal className="flex items-end justify-between gap-6 mb-8 pb-6 border-b border-border">
          <div>
            <div className="type-label text-accent">Standardized testing</div>
            <h2 className="type-h2 mt-3 optical-left">Zero-dollar SAT 1500+ framework</h2>
          </div>
          <span className="type-small text-foreground/45 tnum flex-shrink-0">
            {checkedSatSteps.length} / 7 completed
          </span>
        </Reveal>

        <RevealGroup className="grid gap-4 md:grid-cols-2">
          {satSteps.map((step, i) => {
            const isStepChecked = checkedSatSteps.includes(i);
            return (
              <RevealItem key={step.title}>
                <button
                  type="button"
                  onClick={() => toggleSatStep(i)}
                  className={`press card p-6 flex h-full gap-4 text-left transition-colors duration-150 ${
                    isStepChecked ? "bg-accent/[0.04] border-accent/25" : ""
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[13px] font-semibold tnum transition-colors duration-150 ${
                      isStepChecked ? "bg-accent text-white" : "bg-muted text-foreground/60"
                    }`}
                  >
                    {isStepChecked ? <Check className="h-3.5 w-3.5" strokeWidth={2.5} /> : i + 1}
                  </span>
                  <div>
                    <h3 className="type-h4 flex items-center gap-2">
                      {step.title}
                      {isStepChecked && (
                        <span className="type-label text-accent normal-case tracking-normal font-medium">
                          Completed
                        </span>
                      )}
                    </h3>
                    <p className="type-small text-foreground/58 mt-1.5">{step.content}</p>
                  </div>
                </button>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <Reveal delay={0.1} className="panel mt-4 p-7 flex items-start gap-4">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-muted text-foreground/70">
            <Check className="h-4 w-4" strokeWidth={2} />
          </div>
          <div>
            <div className="type-label text-accent">Core insight</div>
            <h4 className="type-h4 mt-1">Mistakes journal strategy</h4>
            <p className="type-small text-foreground/58 mt-2 max-w-[62ch]">
              The students who score 1500+ aren&rsquo;t smarter — they just review their mistakes
              more systematically. The mistakes journal is what separates a 1400 from a 1550.
              Every wrong answer is a free lesson if you write down why you missed it.
            </p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
