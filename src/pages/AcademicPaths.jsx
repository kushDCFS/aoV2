import React from "react";
import { useOutletContext } from "react-router-dom";
import { BookOpen, GraduationCap, ExternalLink, CheckCircle2 } from "lucide-react";
import PageHeader from "@/components/PageHeader";

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
    title: "Establish Your Baseline",
    content: "Take a full-length official College Board SAT practice test (Tests 1-10 are free on Khan Academy / College Board). Score it using the official scoring guide. Log your score and identify your 3 weakest sub-skills.",
  },
  {
    title: "Connect Khan Academy to College Board",
    content: "Create a free Khan Academy account and link it to your College Board account. This imports your PSAT/SAT scores and generates a personalized practice plan. Khan Academy's Official Digital SAT Prep is the only free resource with official College Board questions.",
  },
  {
    title: "Build the Daily Feedback Loop (6-8 weeks)",
    content: "Monday-Friday: 45-60 minutes of targeted practice. 20 min: Watch Khan Academy lesson videos on your weakest sub-skill. 20 min: Complete practice exercises for that sub-skill. 10 min: Review every wrong answer and write down WHY you got it wrong and the correct approach in a mistakes journal. Saturday: 1 full section (Reading, Writing, or Math) under timed conditions. Sunday: Review all mistakes from the week and re-do any missed questions.",
  },
  {
    title: "Maintain a Mistakes Journal (Critical)",
    content: "Create a Google Doc or notebook with 3 columns: Question/Concept, Why I Got It Wrong, Correct Approach. Review this journal before every practice session. This is the single highest-yield habit for breaking 1500.",
  },
  {
    title: "Escalate Difficulty (Weeks 5-6)",
    content: "Once you're scoring 700+ on a section, switch from Khan Academy exercises to full official practice tests. Take one full practice test per week under realistic conditions (timed, no extra breaks, morning start). Use Tests 7-10 (the most recent and relevant).",
  },
  {
    title: "Final 2-Week Sprint",
    content: "Take 2-3 full practice tests in the final 2 weeks. Focus entirely on your mistakes journal. Do not learn new content — refine your test-taking strategy and timing.",
  },
  {
    title: "Test Day Protocol",
    content: "Sleep 8 hours the night before. Eat a protein-rich breakfast. Arrive early with your admission ticket, ID, approved calculator, and snacks. Between sections, take deep breaths and reset — don't dwell on previous sections.",
  },
];

export default function AcademicPaths() {
  const { checkedWeeks, toggleWeek, checkedSatSteps, toggleSatStep } = useOutletContext();

  return (
    <div className="space-y-10">
      <PageHeader
        title="Academic Paths"
        subtitle="Structured, zero-cost frameworks for AP/IB exams and SAT prep. No paid courses, no tutors — just free resources used in a proven system."
        icon={BookOpen}
      />

      <div className="space-y-12">
        {/* Section 1: AP & IB Bootcamps */}
        <section className="card p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-[10px] font-bold tracking-wider text-accent uppercase">Standardized Testing</span>
              <h2 className="text-2xl font-heading font-bold text-primary mt-0.5">AP & IB Self-Study Bootcamps</h2>
              <p className="mt-1 text-sm text-foreground/70 max-w-2xl leading-relaxed">
                An 8-week structured study timeline. Check off each week as you complete it to sync your dashboard progress.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent border border-accent/20">
                {checkedWeeks.length} / 8 Weeks Done
              </span>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-2xl border border-border/50 bg-white/40">
            <table className="data-table">
              <thead>
                <tr>
                  <th className="px-5 font-semibold whitespace-nowrap">Week</th>
                  <th className="px-5 font-semibold whitespace-nowrap">Phase</th>
                  <th className="px-5 font-semibold">Key Actions</th>
                  <th className="px-5 font-semibold">Free Resources</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {apBootcampWeeks.map((row) => {
                  const weekNum = parseInt(row.week);
                  const isChecked = checkedWeeks.includes(weekNum);
                  return (
                    <tr key={row.week} className={`transition-colors duration-300 ${isChecked ? "bg-accent/5 hover:bg-accent/10" : "hover:bg-white/60"}`}>
                      <td className="px-5 font-bold whitespace-nowrap">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleWeek(weekNum)}
                            className="rounded border-border text-accent focus:ring-accent/25 h-4.5 w-4.5 transition-all cursor-pointer"
                          />
                          <span className={isChecked ? "text-accent line-through" : "text-foreground"}>Week {row.week}</span>
                        </label>
                      </td>
                      <td className="px-5 font-heading font-bold text-primary whitespace-nowrap">{row.phase}</td>
                      <td className="px-5 text-foreground/80 leading-relaxed">{row.actions}</td>
                      <td className="px-5 text-foreground/80 leading-relaxed">{row.resources}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Free Resources */}
          <div className="mt-12 pt-8 border-t border-border/40">
            <h3 className="text-lg font-heading font-bold text-primary mb-6">Core Free Resources</h3>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {freeResources.map((res) => (
                <a
                  key={res.name}
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-2xl border border-border/50 bg-white/50 p-6 transition-all duration-300 ease-in-out hover:bg-white hover:scale-[1.01] hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-heading font-bold text-primary group-hover:text-accent transition-colors duration-300">{res.name}</h4>
                    <ExternalLink className="h-4 w-4 text-foreground/40 group-hover:text-accent transition-colors duration-300" />
                  </div>
                  <p className="text-xs text-foreground/75 leading-relaxed">{res.description}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: SAT Framework */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border/40">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                <GraduationCap className="h-5.5 w-5.5" />
              </div>
              <div>
                <span className="text-[10px] font-bold tracking-wider text-accent uppercase">Standardized Testing</span>
                <h2 className="text-2xl font-heading font-bold text-primary">Zero-Dollar SAT 1500+ Framework</h2>
              </div>
            </div>
            <span className="text-xs font-semibold text-foreground/50">{checkedSatSteps.length} / 7 Completed</span>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {satSteps.map((step, i) => {
              const isStepChecked = checkedSatSteps.includes(i);
              return (
                <div
                  key={i}
                  onClick={() => toggleSatStep(i)}
                  className={`card p-8 flex gap-5 hover:scale-[1.01] hover:-translate-y-0.5 active:scale-[0.99] transition-all duration-300 border border-white/40 shadow-md shadow-indigo-950/2 cursor-pointer ${
                    isStepChecked ? "bg-accent/5 hover:bg-accent/10 border-accent/30" : ""
                  }`}
                >
                  <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all duration-350 ${
                    isStepChecked ? "bg-accent text-white" : "bg-primary text-white"
                  }`}>
                    {isStepChecked ? "✓" : i + 1}
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-primary text-base mb-1.5 flex items-center gap-2">
                      {step.title}
                      {isStepChecked && <span className="text-xs text-accent font-semibold">(Completed)</span>}
                    </h3>
                    <p className="text-xs text-foreground/80 leading-relaxed">{step.content}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="card p-8 relative overflow-hidden bg-gradient-to-r from-accent/5 to-transparent">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-accent mt-0.5" />
              <div>
                <span className="text-[10px] font-bold tracking-wider text-accent uppercase">Core Insight</span>
                <h4 className="font-heading font-bold text-primary text-lg mt-0.5">Mistakes Journal Strategy</h4>
                <p className="mt-2 text-sm text-foreground/80 leading-relaxed">
                  The students who score 1500+ aren't smarter — they just review their mistakes more systematically. 
                  The mistakes journal is what separates a 1400 from a 1550. Every wrong answer is a free lesson 
                  if you write down why you missed it.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}