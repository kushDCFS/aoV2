import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Check, ArrowRight } from "lucide-react";
import { fields } from "@/lib/pathwayData";

export default function MajorSelector({ onSelect, onBack }) {
  const [selected, setSelected] = useState([]);

  const toggle = (key) => {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : prev.length < 3 ? [...prev, key] : prev
    );
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <button
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-700"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>
      <h1 className="font-heading text-3xl font-bold tracking-tight text-slate-900">Pick your field</h1>
      <p className="mt-2 text-slate-500">
        Select up to 3 fields you're considering. We'll build your resource list from there.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {fields.map((field, i) => {
          const isSelected = selected.includes(field.key);
          return (
            <motion.button
              key={field.key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              onClick={() => toggle(field.key)}
              className={`relative flex flex-col items-start rounded-2xl border p-5 text-left transition-all ${
                isSelected
                  ? "border-indigo-400 bg-indigo-50/50 ring-2 ring-indigo-200"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md"
              }`}
            >
              {isSelected && (
                <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600">
                  <Check className="h-3.5 w-3.5 text-white" />
                </div>
              )}
              <div className={`mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${field.gradient} shadow-md`}>
                <field.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-heading text-sm font-semibold text-slate-900">{field.name}</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">{field.description}</p>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <span className="text-sm text-slate-400">{selected.length} of 3 selected</span>
        <button
          disabled={selected.length === 0}
          onClick={() => onSelect(selected)}
          className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
        >
          See my resources
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}