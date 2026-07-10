import React from "react";
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
  return (
    <div>
      <PageHeader
        title="Academic Paths"
        subtitle="Structured, zero-cost frameworks for AP/IB exams and SAT prep. No paid courses, no tutors — just free resources used in a proven system."
        icon={BookOpen}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 sm:space-y-20">
        {/* Section 1: AP & IB Bootcamps */}
        <section>
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">AP & IB Self-Study Bootcamps</h2>
            <p className="mt-2 text-slate-500 max-w-3xl">
              An 8-week structured study timeline that maps free resources to each phase of AP/IB exam preparation.
              Follow this schedule for each AP/IB subject you're self-studying.
            </p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="px-4 py-3.5 font-semibold whitespace-nowrap">Week</th>
                  <th className="px-4 py-3.5 font-semibold whitespace-nowrap">Phase</th>
                  <th className="px-4 py-3.5 font-semibold">Key Actions</th>
                  <th className="px-4 py-3.5 font-semibold">Free Resources</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {apBootcampWeeks.map((row) => (
                  <tr key={row.week} className="bg-white hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3.5 font-semibold text-blue-600 whitespace-nowrap">{row.week}</td>
                    <td className="px-4 py-3.5 font-medium text-slate-900 whitespace-nowrap">{row.phase}</td>
                    <td className="px-4 py-3.5 text-slate-600">{row.actions}</td>
                    <td className="px-4 py-3.5 text-slate-600">{row.resources}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Free Resources */}
          <div className="mt-8">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Core Free Resources</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {freeResources.map((res) => (
                <a
                  key={res.name}
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-blue-300 hover:shadow-md"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <h4 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">{res.name}</h4>
                    <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">{res.description}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: SAT Framework */}
        <section>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100">
                <GraduationCap className="h-5 w-5 text-violet-600" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Zero-Dollar SAT 1500+ Framework</h2>
            </div>
            <p className="mt-2 text-slate-500 max-w-3xl">
              A step-by-step guide to setting up a daily Khan Academy feedback loop that can take you from any starting
              score to 1500+ — without spending a dollar on prep courses or tutors.
            </p>
          </div>

          <div className="space-y-4">
            {satSteps.map((step, i) => (
              <div key={i} className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{step.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{step.content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl bg-emerald-50 border border-emerald-200 p-5">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-600 mt-0.5" />
              <p className="text-sm text-emerald-800 leading-relaxed">
                <strong>The key insight:</strong> The students who score 1500+ aren't smarter — they just review their
                mistakes more systematically. The mistakes journal is what separates a 1400 from a 1550. Every wrong
                answer is a free lesson if you write down why you missed it.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}