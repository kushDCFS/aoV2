import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Users, Award, Mail, ArrowRight, CheckCircle2 } from "lucide-react";

const sections = [
  {
    to: "/academic-paths",
    icon: BookOpen,
    title: "Academic Paths",
    description: "8-week AP/IB self-study bootcamps and a zero-dollar SAT 1500+ framework using only free resources.",
    color: "bg-blue-600",
  },
  {
    to: "/extracurricular-tracks",
    icon: Users,
    title: "Extracurricular Tracks",
    description: "6 career-field tracks with free national competitions, $0 portfolio blueprints, and virtual shadowing playbooks.",
    color: "bg-violet-600",
  },
  {
    to: "/scholarship-finder",
    icon: Award,
    title: "Scholarship Finder",
    description: "A curated table of major scholarships for ambitious scholars, plus a guide to finding hyper-local awards.",
    color: "bg-emerald-600",
  },
  {
    to: "/outreach-lab",
    icon: Mail,
    title: "The Outreach Lab",
    description: "Copy/paste cold email templates for research labs, businesses, and nonprofits — plus a tracker matrix.",
    color: "bg-amber-600",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950" />
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-violet-600/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/50 px-4 py-1.5 text-sm font-medium text-blue-400">
              <span className="flex h-2 w-2 rounded-full bg-blue-500" />
              100% Free · Self-Service · No Sign-Up Required
            </span>
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              Movement for Admissions Pathways and Success.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed">
              Free, actionable, self-serve playbooks for self-driven students.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/academic-paths"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700"
              >
                Start with Academics
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/scholarship-finder"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/50 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-800"
              >
                Find Scholarships
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="mb-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Explore the Hub</h2>
          <p className="mt-2 text-slate-500">Four core sections. Everything is free.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {sections.map((section, i) => (
            <motion.div
              key={section.to}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Link
                to={section.to}
                className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-slate-300 hover:shadow-lg"
              >
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${section.color}`}>
                  <section.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{section.title}</h3>
                <p className="mt-2 flex-1 text-sm text-slate-500 leading-relaxed">{section.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600">
                  Explore
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">About This Hub</h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                College admissions shouldn't require a paid consultant. This hub exists to level the playing field by
                giving every student free access to the same structural frameworks, templates, and curated resource lists
                that expensive coaching services sell.
              </p>
              <p className="mt-4 text-slate-600 leading-relaxed">
                There are no accounts, no paywalls, and no 1-on-1 coaching. Everything here is self-serve: read the
                guides, copy the templates, use the tables, and build your own path.
              </p>
            </div>
            <div className="space-y-3">
              {[
                "No sign-up or account required",
                "Every resource is free or $0",
                "Collects zero personal data (privacy-compliant)",
                "Copy/paste templates you can use today",
                "Structured frameworks, not vague advice",
                "Built specifically for independent scholars",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-600" />
                  <span className="text-sm text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}