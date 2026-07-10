import React from "react";
import { motion } from "framer-motion";
import { Globe, Heart, ShieldAlert, Sparkles } from "lucide-react";
import PageHeader from "@/components/PageHeader";

const pillars = [
  {
    icon: Heart,
    title: "Admissions Equity",
    description: "Work toward total equity by providing under-resourced students the same blueprints and frameworks that expensive consulting firms keep behind paywalls.",
    color: "bg-blue-600",
  },
  {
    icon: Globe,
    title: "Global Outreach",
    description: "Access is open across all 50 states and globally across over 190+ countries, empowering international applicants seeking equitable entry to higher education.",
    color: "bg-violet-600",
  },
  {
    icon: Sparkles,
    title: "100% Free & Self-Serve",
    description: "No sign-up barriers, no memberships, and no hidden coaching packages. Actionable, copy-pasteable templates designed for self-directed success.",
    color: "bg-emerald-600",
  },
];

export default function OurMission() {
  return (
    <div>
      <PageHeader
        title="Our Mission"
        subtitle="Working toward total equity in the college admissions process by dismantling financial barriers."
        icon={Globe}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        {/* Detail text */}
        <section className="grid gap-8 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Dismantling Barriers to Higher Education
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Every year, wealthy applicants spend thousands of dollars on private college admissions counseling. This systemic gap leaves high-achieving, under-resourced students behind.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Our core goal is to work toward **total equity in the college admissions process**. We believe that access to guides on building high-impact extracurriculars, scoring high on standardized tests, and compiling strong applications should be democratic, transparent, and completely free.
            </p>
            <p className="text-slate-600 leading-relaxed">
              This platform serves as a self-service playbook depository, helping students navigate competitive college tracks across **all 50 U.S. states** and globally across **over 190+ countries** where international applicants seek equitable access to higher education.
            </p>
          </div>

          {/* Pillars grid */}
          <div className="space-y-6">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex gap-4 p-5 rounded-2xl border border-slate-200 bg-white"
              >
                <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${pillar.color}`}>
                  <pillar.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{pillar.title}</h3>
                  <p className="mt-1 text-sm text-slate-500 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Disclaimer / Call to Action */}
        <section className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Democratizing Knowledge, Not Selling Services</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Please note that Movement for Admissions Pathways and Success is a self-service resources directory. We do not solicit personal details, sell consulting packages, or offer 1-on-1 editing. We provide the strategies and tools; you provide the dedication and drive to write your own future.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
