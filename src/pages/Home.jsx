import React, { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { BookOpen, Users, Award, Mail, ArrowRight, BookText, Settings2, Sparkles, HelpCircle, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const essayPrompts = [
  { id: "1", title: "Background / Identity", text: "Some students have a background, identity, interest, or talent that is so meaningful they believe their application would be incomplete without it. If this sounds like you, then please share your story." },
  { id: "2", title: "Learning from Obstacles", text: "The lessons we take from obstacles we encounter can be fundamental to later success. Recount a time when you faced a challenge, setback, or failure. How did it affect you, and what did you learn from the experience?" },
  { id: "3", title: "Challenging a Belief", text: "Reflect on a time when you questioned or challenged a belief or idea. What prompted your thinking? What was the outcome?" },
  { id: "4", title: "Gratitude & Appreciation", text: "Reflect on something that someone has done for you that has made you happy or thankful in a surprising way. How has this gratitude affected or motivated you?" },
  { id: "5", title: "Personal Growth", text: "Discuss an accomplishment, event, or realization that sparked a period of personal growth and a new understanding of yourself or others." },
  { id: "6", title: "Captivated by a Topic", text: "Describe a topic, idea, or concept you find so engaging that it makes you lose all track of time. Why does it captivate you? What or who do you turn to when you want to learn more?" },
  { id: "7", title: "Topic of Your Choice", text: "Share an essay on any topic of your choice. It can be one you've already written, one that responds to a different prompt, or one of your own design." },
];

export default function Home() {
  const {
    studentInfo,
    handleStudentInfoChange,
    checkedWeeks,
    checkedSatSteps,
    checkedMilestones,
    trackedScholarships,
    toggleTrackScholarship,
    essayOutline,
    updateEssayOutline,
  } = useOutletContext();

  const [isEssayModalOpen, setIsEssayModalOpen] = useState(false);

  // Dynamic college chances calculations
  const calculateStanfordChance = () => {
    const g = parseFloat(studentInfo.gpa) || 3.5;
    const satBonus = studentInfo.targetSat.includes("1600") ? 4 : studentInfo.targetSat.includes("1550") ? 3 : 1;
    const wBonus = checkedWeeks.length * 0.4;
    const mBonus = checkedMilestones.length * 0.8;
    return Math.min(25, Math.round(g * 2.5 + satBonus + wBonus + mBonus));
  };

  const calculateBerkeleyChance = () => {
    const g = parseFloat(studentInfo.gpa) || 3.5;
    const satBonus = studentInfo.targetSat.includes("1600") ? 8 : studentInfo.targetSat.includes("1550") ? 6 : 3;
    const wBonus = checkedWeeks.length * 1.2;
    const mBonus = checkedMilestones.length * 2.2;
    return Math.min(68, Math.round(g * 8 + satBonus + wBonus + mBonus));
  };

  const calculateMichiganChance = () => {
    const g = parseFloat(studentInfo.gpa) || 3.5;
    const satBonus = studentInfo.targetSat.includes("1600") ? 12 : studentInfo.targetSat.includes("1550") ? 10 : 4;
    const wBonus = checkedWeeks.length * 2.0;
    const mBonus = checkedMilestones.length * 3.0;
    return Math.min(92, Math.round(g * 11 + satBonus + wBonus + mBonus));
  };

  const stanfordChance = calculateStanfordChance();
  const berkeleyChance = calculateBerkeleyChance();
  const michiganChance = calculateMichiganChance();

  // Word count and progress for essay
  const wordCount = essayOutline.text ? essayOutline.text.trim().split(/\s+/).filter(Boolean).length : 0;
  const essayProgressPercent = Math.min(100, Math.round((wordCount / 650) * 100));

  // Dynamic progress bar totals for homepage metrics
  const apProgressPercent = Math.min(Math.round((checkedWeeks.length / 8) * 100), 100);
  const satProgressPercent = Math.min(Math.round((checkedSatSteps.length / 7) * 100), 100);

  const sections = [
    {
      to: "/academic-paths",
      icon: BookOpen,
      title: "Academic Paths",
      description: "8-week AP/IB self-study bootcamps and a zero-dollar SAT 1500+ framework using only free resources.",
      badge: "Academics",
      bgClass: "bg-accent/10 text-accent border border-accent/20",
    },
    {
      to: "/extracurricular-tracks",
      icon: Users,
      title: "Extracurricular Tracks",
      description: "6 career-field tracks with free national competitions, $0 portfolio blueprints, and virtual shadowing playbooks.",
      badge: "Extracurriculars",
      bgClass: "bg-primary/10 text-primary border border-primary/20",
    },
    {
      to: "/scholarship-finder",
      icon: Award,
      title: "Scholarship Finder",
      description: "A curated table of major scholarships for ambitious scholars, plus a guide to finding hyper-local awards.",
      badge: "Funding",
      bgClass: "bg-emerald-600/10 text-emerald-700 border border-emerald-600/20",
    },
    {
      to: "/outreach-lab",
      icon: Mail,
      title: "The Outreach Lab",
      description: "Copy/paste cold email templates for research labs, businesses, and nonprofits — plus a tracker matrix.",
      badge: "Outreach",
      bgClass: "bg-amber-600/10 text-amber-700 border border-amber-600/20",
    },
  ];

  const getInitials = (name) => {
    if (!name) return "AK";
    const parts = name.split(" ");
    return parts.map((n) => n[0]).join("").toUpperCase().substring(0, 2);
  };

  const selectedPromptObj = essayPrompts.find((p) => p.id === essayOutline.prompt) || essayPrompts[0];

  return (
    <div className="space-y-10">
      {/* Dashboard Top welcome */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-border/40">
        <div>
          <span className="text-xs font-bold tracking-wider text-accent uppercase">MAPS Workspace</span>
          <h1 className="text-3xl sm:text-4xl font-serif font-extrabold tracking-tight text-primary mt-1">
            Welcome back, <span className="font-serif italic text-accent">{studentInfo.name || "Scholar"}</span>
          </h1>
          <p className="text-sm text-foreground/75 mt-1">
            Grade: <strong>{studentInfo.grade}</strong> · Target Major: <strong>{studentInfo.targetMajor}</strong> · SAT Goal: <strong>{studentInfo.targetSat}</strong>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/academic-paths"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-primary/10 transition-all duration-300 ease-in-out hover:scale-[1.01] hover:-translate-y-0.5 active:scale-[0.99]"
          >
            Go to Academics <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Analytics & Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Metric 1: AP Study Progress */}
        <div className="glass-card p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold tracking-wider text-foreground/50 uppercase">AP/IB Study Roadmap</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <BookOpen className="h-4.5 w-4.5" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-serif font-extrabold text-primary leading-none">
              {checkedWeeks.length} / 8 Weeks
            </h3>
            <span className="text-[11px] font-semibold text-accent mt-1.5 block">
              {apProgressPercent === 100 ? "Roadmap completed!" : `${apProgressPercent}% study milestones checked`}
            </span>
            
            {/* Custom animated progress bar with glow */}
            <div className="mt-4 w-full bg-muted/40 h-2 rounded-full overflow-hidden relative">
              <div
                style={{ width: `${apProgressPercent}%` }}
                className="bg-accent h-full progress-glow rounded-full transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Metric 2: SAT Prep Progress */}
        <div className="glass-card p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold tracking-wider text-foreground/50 uppercase">SAT Prep Stage</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <BookText className="h-4.5 w-4.5" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-serif font-extrabold text-primary leading-none">
              {checkedSatSteps.length} / 7 Stages
            </h3>
            <span className="text-[11px] font-semibold text-foreground/60 mt-1.5 block">
              Target SAT: {studentInfo.targetSat} ({satProgressPercent}% setup completed)
            </span>
            
            {/* Progress bar */}
            <div className="mt-4 w-full bg-muted/40 h-2 rounded-full overflow-hidden">
              <div
                style={{ width: `${satProgressPercent}%` }}
                className="bg-primary h-full rounded-full transition-all duration-500 relative"
              />
            </div>
          </div>
        </div>

        {/* Metric 3: EC Tracker */}
        <div className="glass-card p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold tracking-wider text-foreground/50 uppercase">EC Milestones</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-600/10 text-amber-700">
              <Users className="h-4.5 w-4.5" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-serif font-extrabold text-primary leading-none">
              {checkedMilestones.length} Active
            </h3>
            <span className="text-[11px] font-semibold text-amber-700 mt-1.5 block">
              {checkedMilestones.length === 0 ? "No milestones checked yet" : `${checkedMilestones.length} items verified`}
            </span>

            {/* Progress bar */}
            <div className="mt-4 w-full bg-muted/40 h-2 rounded-full overflow-hidden">
              <div
                style={{ width: `${Math.max(10, Math.min(100, checkedMilestones.length * 16))}%` }}
                className="bg-amber-500 h-full rounded-full transition-all duration-500 relative"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Profile Settings Widget & Page Features split grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Workspace Customizer */}
        <div className="space-y-6">
          <div className="glass-card p-6 border border-white/40 shadow-xl shadow-indigo-950/5 h-fit space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-border/40">
              <Settings2 className="h-5 w-5 text-accent" />
              <div>
                <h2 className="text-lg font-serif font-bold text-primary leading-none">Profile Setup</h2>
                <span className="text-[9px] font-bold text-foreground/50 uppercase tracking-widest block mt-1">Workspace Sync</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground/60">Your Name</label>
                <input
                  type="text"
                  value={studentInfo.name}
                  onChange={(e) => handleStudentInfoChange("name", e.target.value)}
                  className="w-full rounded-xl border border-border bg-[#FAF7F2]/50 px-3.5 py-2 text-sm text-foreground focus:border-primary/45 focus:bg-card focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all duration-300 ease-in-out"
                  placeholder="e.g. Alex Chen"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground/60">GPA (Unweighted)</label>
                <input
                  type="number"
                  min="1.0"
                  max="4.0"
                  step="0.1"
                  value={studentInfo.gpa}
                  onChange={(e) => handleStudentInfoChange("gpa", e.target.value)}
                  className="w-full rounded-xl border border-border bg-[#FAF7F2]/50 px-3.5 py-2 text-sm text-foreground focus:border-primary/45 focus:bg-card focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all duration-300 ease-in-out"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground/60">Grade Level</label>
                <select
                  value={studentInfo.grade}
                  onChange={(e) => handleStudentInfoChange("grade", e.target.value)}
                  className="w-full rounded-xl border border-border bg-[#FAF7F2]/50 px-3.5 py-2 text-sm text-foreground focus:border-primary/45 focus:bg-card focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all duration-300 ease-in-out"
                >
                  <option value="Freshman">Freshman</option>
                  <option value="Sophomore">Sophomore</option>
                  <option value="Junior">Junior</option>
                  <option value="Senior">Senior</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground/60">Target Major / Field</label>
                <input
                  type="text"
                  value={studentInfo.targetMajor}
                  onChange={(e) => handleStudentInfoChange("targetMajor", e.target.value)}
                  className="w-full rounded-xl border border-border bg-[#FAF7F2]/50 px-3.5 py-2 text-sm text-foreground focus:border-primary/45 focus:bg-card focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all duration-300 ease-in-out"
                  placeholder="e.g. Premed, Finance"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground/60">Target SAT Score</label>
                <select
                  value={studentInfo.targetSat}
                  onChange={(e) => handleStudentInfoChange("targetSat", e.target.value)}
                  className="w-full rounded-xl border border-border bg-[#FAF7F2]/50 px-3.5 py-2 text-sm text-foreground focus:border-primary/45 focus:bg-card focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all duration-300 ease-in-out"
                >
                  <option value="1600">1600 (Perfect)</option>
                  <option value="1550">1550 (Ivy Plus)</option>
                  <option value="1500">1500 (Top 20 Tier)</option>
                  <option value="1400">1400 (Top 50 Tier)</option>
                  <option value="Test-Optional">Test-Optional</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Chancing Meter */}
          <div className="glass-card p-6 border border-white/40 shadow-xl shadow-indigo-950/5 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-border/40">
              <Sparkles className="h-5 w-5 text-accent" />
              <h3 className="font-serif font-bold text-primary text-sm leading-none">Chancing Estimator</h3>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-[#1E1B4B]/80">Stanford University</span>
                  <span className="text-pink-600">{stanfordChance}%</span>
                </div>
                <div className="w-full bg-[#FAF7F2] h-2 rounded-full overflow-hidden">
                  <div style={{ width: `${stanfordChance}%` }} className="bg-pink-500 h-full rounded-full transition-all duration-550" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-[#1E1B4B]/80">UC Berkeley</span>
                  <span className="text-orange-600">{berkeleyChance}%</span>
                </div>
                <div className="w-full bg-[#FAF7F2] h-2 rounded-full overflow-hidden">
                  <div style={{ width: `${berkeleyChance}%` }} className="bg-orange-500 h-full rounded-full transition-all duration-550" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-[#1E1B4B]/80">University of Michigan</span>
                  <span className="text-[#0F766E]">{michiganChance}%</span>
                </div>
                <div className="w-full bg-[#FAF7F2] h-2 rounded-full overflow-hidden">
                  <div style={{ width: `${michiganChance}%` }} className="bg-[#0F766E] h-full rounded-full transition-all duration-550" />
                </div>
              </div>
            </div>
          </div>

          {/* Saved Scholarships */}
          <div className="glass-card p-6 border border-white/40 shadow-xl shadow-indigo-950/5 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-border/40">
              <Award className="h-5 w-5 text-accent" />
              <h3 className="font-serif font-bold text-primary text-sm leading-none">Saved Scholarships</h3>
            </div>
            {trackedScholarships.length === 0 ? (
              <p className="text-xs text-foreground/50 leading-relaxed">
                No scholarships saved yet. Save them in the Scholarship Finder.
              </p>
            ) : (
              <div className="divide-y divide-border/30">
                {trackedScholarships.map((sName) => (
                  <div key={sName} className="flex items-center justify-between py-2 text-xs">
                    <span className="font-medium text-[#1E1B4B]">{sName}</span>
                    <button
                      onClick={() => toggleTrackScholarship(sName)}
                      className="text-red-500 hover:text-red-700 font-semibold transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Features Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between border-b border-border/40 pb-3">
            <h2 className="text-lg font-serif font-bold text-primary flex items-center gap-2">
              <Compass className="h-5 w-5 text-accent" />
              Interactive Playbooks
            </h2>
            <span className="text-xs font-semibold text-foreground/50">Core Utilities</span>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {sections.map((section, i) => (
              <div
                key={section.to}
              >
                <Link
                  to={section.to}
                  className="group flex h-full flex-col glass-card p-6.5 hover:scale-[1.01] hover:-translate-y-0.5 transition-all duration-300 border border-white/40 shadow-md shadow-indigo-950/2"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${section.bgClass}`}>
                      <section.icon className="h-5 w-5" />
                    </div>
                    <span className="text-[9px] font-bold tracking-wider text-accent uppercase bg-accent/5 px-2 py-0.5 rounded border border-accent/10">
                      {section.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-serif font-bold text-primary">{section.title}</h3>
                  <p className="mt-2 flex-1 text-xs text-foreground/75 leading-relaxed">{section.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-accent group-hover:text-primary transition-colors duration-300">
                    Open Playbook
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </div>
            ))}
          </div>

          {/* Common App Essay Outline Card */}
          <div 
            onClick={() => setIsEssayModalOpen(true)}
            className="glass-card p-6 flex items-center justify-between gap-4 border border-white/40 shadow-md shadow-indigo-950/2 cursor-pointer hover:border-indigo-400 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200/50">
                <BookText className="h-5.5 w-5.5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-primary text-base leading-none">Common App Essay Workspace</h3>
                <span className="text-[10px] text-foreground/50 block mt-1">Counselor outlines, prompt selectors, and live word counter</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-24 bg-[#FAF7F2] h-1.5 rounded-full overflow-hidden">
                <div style={{ width: `${essayProgressPercent}%` }} className="bg-indigo-600 h-full rounded-full transition-all" />
              </div>
              <span className="text-xs font-bold text-indigo-600">{essayProgressPercent}%</span>
            </div>
          </div>
        </div>

      </div>

      {/* About Dashboard Widget */}
      <section className="glass-card p-8 border border-white/40 shadow-xl shadow-indigo-950/5">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-[10px] font-bold tracking-wider text-accent uppercase">Project Mission</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mt-1">About the MAPS Initiative</h2>
            <p className="mt-4 text-sm text-foreground/80 leading-relaxed">
              College admissions shouldn't require a paid consultant. This hub exists to level the playing field by
              giving every student free access to the same structural frameworks, templates, and curated resource lists
              that expensive coaching services sell.
            </p>
            <p className="mt-4 text-sm text-foreground/80 leading-relaxed">
              There are no accounts, no paywalls, and no 1-on-1 coaching. Everything here is self-serve: read the
              guides, copy the templates, use the tables, and build your own path.
            </p>
          </div>
          <div className="space-y-3.5">
            {[
              "No sign-up or account required",
              "Every resource is free or $0",
              "Collects zero personal data (privacy-compliant)",
              "Copy/paste templates you can use today",
              "Structured frameworks, not vague advice",
              "Built specifically for independent scholars",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-accent" />
                <span className="text-sm text-foreground/80 font-semibold">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common App Essay Workspace Dialog Modal */}
      <Dialog open={isEssayModalOpen} onOpenChange={setIsEssayModalOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl border border-[#EAE3D8]">
          <DialogHeader className="border-b border-border/40 pb-4">
            <DialogTitle className="text-2xl font-serif font-bold text-[#1E1B4B] flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-accent animate-pulse" />
              Common App Essay Workspace
            </DialogTitle>
            <DialogDescription className="text-xs text-foreground/60 mt-1">
              Select your prompt, sketch your outline, and write your draft. Everything is saved automatically.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 md:grid-cols-3 pt-6">
            {/* Left sidebar inside modal: prompts and details */}
            <div className="space-y-4 md:border-r border-border/40 pr-0 md:pr-6 md:col-span-1">
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#1E1B4B]/60 uppercase tracking-wider block">Select Prompt</label>
                <select
                  value={essayOutline.prompt}
                  onChange={(e) => updateEssayOutline({ prompt: e.target.value })}
                  className="w-full rounded-xl border border-border bg-[#FAF7F2]/50 px-3 py-2 text-xs text-foreground focus:border-primary/45 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all duration-300"
                >
                  {essayPrompts.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.id}. {p.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="rounded-xl bg-[#FAF7F2] p-4 border border-[#EAE3D8]/50 space-y-2">
                <div className="flex items-center gap-1 text-[10px] font-bold text-accent uppercase">
                  <HelpCircle className="h-3.5 w-3.5" /> Prompt Guidelines
                </div>
                <p className="text-[11px] text-[#1E1B4B]/75 leading-relaxed">
                  {selectedPromptObj.text}
                </p>
              </div>

              <div className="rounded-xl bg-[#FEF3C7] p-4 border border-[#FDE68A]/60">
                <span className="text-[10px] font-bold text-[#92400E] uppercase block mb-1">Counselor Tip</span>
                <p className="text-[11px] text-[#92400E] leading-relaxed">
                  Make sure to highlight <strong>reflection</strong> rather than just narration. 70% of the essay should focus on what you learned or how you changed.
                </p>
              </div>
            </div>

            {/* Right side inside modal: textarea editor */}
            <div className="md:col-span-2 flex flex-col space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-[#1E1B4B]/70">Selected Prompt: {selectedPromptObj.title}</span>
                <span className="text-foreground/50">{wordCount} / 650 words</span>
              </div>

              <textarea
                value={essayOutline.text}
                onChange={(e) => updateEssayOutline({ text: e.target.value })}
                rows="14"
                placeholder="Draft your essay or outline here..."
                className="w-full flex-1 rounded-2xl border border-border bg-background p-4 text-sm text-[#1E1B4B] focus:border-primary/45 focus:bg-card focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all duration-300 resize-none font-mono"
              />

              <div className="flex items-center justify-between text-xs border-t border-border/40 pt-3">
                <span className="font-semibold text-[#1E1B4B]/60">Outline Progress:</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-[#FAF7F2] h-2 rounded-full overflow-hidden">
                    <div style={{ width: `${essayProgressPercent}%` }} className="bg-indigo-600 h-full rounded-full transition-all duration-300" />
                  </div>
                  <span className="font-bold text-indigo-600">{essayProgressPercent}%</span>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}