import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { quizQuestions } from "@/lib/pathwayData";

export default function MajorQuiz({ onComplete, onBack }) {
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState({});
  const [selected, setSelected] = useState(null);

  const question = quizQuestions[current];
  const progress = (current / quizQuestions.length) * 100;

  const handleSelect = (field) => {
    if (selected) return;
    setSelected(field);
    const newScores = { ...scores, [field]: (scores[field] || 0) + 1 };
    setScores(newScores);
    setTimeout(() => {
      setSelected(null);
      if (current + 1 < quizQuestions.length) {
        setCurrent(current + 1);
      } else {
        const sorted = Object.entries(newScores).sort((a, b) => b[1] - a[1]);
        const top = sorted.slice(0, 2).map(([key]) => key);
        onComplete(top);
      }
    }, 400);
  };

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <button
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-700"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div className="mb-3 flex items-center justify-between text-sm">
        <span className="font-medium text-slate-500">
          Question {current + 1} of {quizQuestions.length}
        </span>
        <span className="text-slate-400">{Math.round(progress)}%</span>
      </div>
      <div className="mb-8 h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
          initial={{ width: `${progress}%` }}
          animate={{ width: `${((current + 1) / quizQuestions.length) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="font-heading text-2xl font-bold tracking-tight text-slate-900">{question.question}</h2>
          <div className="mt-6 space-y-3">
            {question.options.map((option, i) => (
              <button
                key={i}
                onClick={() => handleSelect(option.field)}
                className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition-all ${
                  selected === option.field
                    ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200"
                    : "border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50"
                }`}
              >
                <span
                  className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                    selected === option.field ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-sm font-medium text-slate-800">{option.text}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}