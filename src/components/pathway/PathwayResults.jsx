const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState, useEffect } from "react";
import { RotateCcw, Sparkles, Loader2 } from "lucide-react";

import { fieldMap } from "@/lib/pathwayData";
import ECResourceCard from "./ECResourceCard";

const coachingTypes = ["Free Coaching", "Prep Course", "Mentorship"];

export default function PathwayResults({ majors, onRestart }) {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.entities.ECResource
      .filter({ major: { $in: majors } }, "-created_date", 100)
      .then(setResources)
      .finally(() => setLoading(false));
  }, [majors]);

  const coaching = resources.filter((r) => coachingTypes.includes(r.resource_type));
  const programs = resources.filter((r) => !coachingTypes.includes(r.resource_type));
  const fieldNames = majors.map((k) => fieldMap[k]?.name).filter(Boolean);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 via-indigo-800 to-violet-900 p-8 sm:p-10">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
        <div className="relative">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-indigo-100">
            <Sparkles className="h-3 w-3" /> Your personalized plan
          </span>
          <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {majors.length === 1 ? "Your field" : "Your fields"}
          </h1>
          <div className="mt-4 flex flex-wrap gap-3">
            {majors.map((key) => {
              const field = fieldMap[key];
              if (!field) return null;
              return (
                <div key={key} className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 backdrop-blur-sm">
                  <field.icon className="h-4 w-4 text-white" />
                  <span className="text-sm font-semibold text-white">{field.name}</span>
                </div>
              );
            })}
          </div>
          <p className="mt-5 max-w-2xl text-indigo-100">
            Below are free coaching, prep programs, and extracurriculars selected to help you build a standout profile
            in {fieldNames.join(" and ")}.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="mt-3 text-sm">Curating your resources…</p>
        </div>
      ) : (
        <>
          {coaching.length > 0 && (
            <section className="mt-12">
              <h2 className="font-heading text-2xl font-bold tracking-tight text-slate-900">Free coaching & prep</h2>
              <p className="mt-1 text-slate-500">
                Programs that train you — at no cost — to excel in your extracurriculars.
              </p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {coaching.map((res, i) => (
                  <ECResourceCard key={res.id} resource={res} index={i} />
                ))}
              </div>
            </section>
          )}
          {programs.length > 0 && (
            <section className="mt-12">
              <h2 className="font-heading text-2xl font-bold tracking-tight text-slate-900">EC programs & competitions</h2>
              <p className="mt-1 text-slate-500">
                Join these to build real experience and leadership in your field.
              </p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {programs.map((res, i) => (
                  <ECResourceCard key={res.id} resource={res} index={i} />
                ))}
              </div>
            </section>
          )}
          {resources.length === 0 && (
            <div className="py-20 text-center text-slate-400">No resources found for this field yet.</div>
          )}
        </>
      )}

      <div className="mt-12 text-center">
        <button
          onClick={onRestart}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
        >
          <RotateCcw className="h-4 w-4" /> Start over
        </button>
      </div>
    </div>
  );
}