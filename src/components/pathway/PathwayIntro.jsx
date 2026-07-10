import React from "react";
import { motion } from "framer-motion";
import { Compass, ArrowRight, HelpCircle } from "lucide-react";

export default function PathwayIntro({ onKnow, onQuiz }) {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16 text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 shadow-lg shadow-indigo-200">
          <Compass className="h-8 w-8 text-white" />
        </div>
        <h1 className="font-heading text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Build your extracurricular plan
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-slate-500">
          Tell us what you want to study and we'll match you with free coaching, prep programs, and extracurriculars
          designed to help under-resourced students stand out.
        </p>
      </motion.div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <button
          onClick={onKnow}
          className="group rounded-2xl border border-slate-200 bg-white p-6 text-left transition-all hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100"
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <ArrowRight className="h-5 w-5" />
          </div>
          <h3 className="font-heading text-base font-semibold text-slate-900">I know my major</h3>
          <p className="mt-1 text-sm text-slate-500">Select your field and see your tailored resources instantly.</p>
        </button>
        <button
          onClick={onQuiz}
          className="group rounded-2xl border border-slate-200 bg-white p-6 text-left transition-all hover:border-violet-300 hover:shadow-lg hover:shadow-violet-100"
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
            <HelpCircle className="h-5 w-5" />
          </div>
          <h3 className="font-heading text-base font-semibold text-slate-900">Help me find it</h3>
          <p className="mt-1 text-sm text-slate-500">Take a 10-question quiz and we'll suggest a field that fits you.</p>
        </button>
      </div>
    </div>
  );
}