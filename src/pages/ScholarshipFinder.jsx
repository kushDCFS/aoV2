import React from "react";
import { Award, MapPin } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { scholarships, noEssayScholarships, localScholarshipSteps } from "@/lib/scholarshipData";

export default function ScholarshipFinder() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Scholarship Finder"
        subtitle="A curated database of major, reputable scholarships with actual strategy notes, plus a guide to finding hyper-local awards that have low competition."
        icon={Award}
      />

      <div className="space-y-12">
        {/* Section 1: Major Institutional Awards */}
        <section className="glass-card p-8 border border-white/40 shadow-xl shadow-indigo-950/5">
          <div className="mb-6">
            <h2 className="text-2xl font-serif font-bold text-primary">Major National Scholarships</h2>
            <p className="text-sm text-foreground/70 mt-1 max-w-3xl leading-relaxed">
              These are the highest-value, most reputable scholarships for ambitious scholars.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-border/50 bg-white/40 shadow-sm">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="px-5 py-4.5 font-semibold whitespace-nowrap">Scholarship Name</th>
                  <th className="px-5 py-4.5 font-semibold">Eligibility Criteria</th>
                  <th className="px-5 py-4.5 font-semibold whitespace-nowrap">Award Value</th>
                  <th className="px-5 py-4.5 font-semibold">Application Strategy Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {scholarships.map((s) => (
                  <tr key={s.name} className="align-top hover:bg-white/60 transition-colors duration-300">
                    <td className="px-5 py-4.5 font-bold text-[#1E1B4B] min-w-[200px]">{s.name}</td>
                    <td className="px-5 py-4.5 text-foreground/80 leading-relaxed min-w-[260px]">{s.eligibility}</td>
                    <td className="px-5 py-4.5 text-foreground/90 font-medium leading-relaxed min-w-[200px]">{s.award}</td>
                    <td className="px-5 py-4.5 text-foreground/80 leading-relaxed min-w-[280px]">{s.strategy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 2: No-Essay & Rolling Monthly Scholarships */}
        <section className="glass-card p-8 border border-white/40 shadow-xl shadow-indigo-950/5">
          <div className="mb-6">
            <h2 className="text-2xl font-serif font-bold text-primary">No-Essay &amp; Rolling Monthly Scholarships</h2>
            <p className="text-sm text-foreground/70 mt-1 max-w-3xl leading-relaxed">
              These scholarships require no essays and reset every month or quarter. Enter as many as you can, every cycle.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-border/50 bg-white/40 shadow-sm">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="px-5 py-4.5 font-semibold">Scholarship Name</th>
                  <th className="px-5 py-4.5 font-semibold whitespace-nowrap">Award Value</th>
                  <th className="px-5 py-4.5 font-semibold whitespace-nowrap">Deadline</th>
                  <th className="px-5 py-4.5 font-semibold">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {noEssayScholarships.map((s) => (
                  <tr key={s.name} className="align-top hover:bg-white/60 transition-colors duration-300">
                    <td className="px-5 py-4.5 font-bold text-[#1E1B4B] min-w-[200px]">{s.name}</td>
                    <td className="px-5 py-4.5 text-foreground/90 font-medium whitespace-nowrap">{s.award}</td>
                    <td className="px-5 py-4.5 text-[#0F766E] font-semibold whitespace-nowrap">{s.deadline}</td>
                    <td className="px-5 py-4.5 text-foreground/80 leading-relaxed">{s.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: Hyper-Local Strategy */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border/40">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent border border-accent/20">
                <MapPin className="h-5.5 w-5.5" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-primary">The Hyper-Local Strategy (Tactic)</h2>
            </div>
            <span className="text-xs font-semibold text-foreground/50">4 Step Framework</span>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {localScholarshipSteps.map((step, i) => (
              <div key={i} className="glass-card p-8 flex gap-5 hover:scale-[1.01] hover:-translate-y-0.5 active:scale-[0.99] transition-all duration-300 border border-white/40 shadow-md shadow-indigo-950/2">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-serif font-bold text-primary text-base mb-1.5">{step.title}</h3>
                  <p className="text-xs text-foreground/80 leading-relaxed">{step.content}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}