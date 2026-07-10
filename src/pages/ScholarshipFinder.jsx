import React from "react";
import { Award, MapPin, ExternalLink } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { scholarships, noEssayScholarships, localScholarshipSteps } from "@/lib/scholarshipData";

export default function ScholarshipFinder() {
  return (
    <div>
      <PageHeader
        title="Scholarship Finder"
        subtitle="A curated table of major national scholarships targeting high-achieving candidates, plus a guide to finding hyper-local awards with lower competition."
        icon={Award}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        {/* Section 1: Major Scholarships Table */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Major National Scholarships</h2>
          <p className="text-slate-500 mb-6 max-w-3xl">
            These are the highest-value, most reputable scholarships for ambitious scholars. Start with these —
            they have the largest awards and the most established support networks.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="px-4 py-4 font-semibold whitespace-nowrap">Scholarship Name</th>
                  <th className="px-4 py-4 font-semibold">Eligibility Criteria</th>
                  <th className="px-4 py-4 font-semibold whitespace-nowrap">Award Value</th>
                  <th className="px-4 py-4 font-semibold">Application Strategy Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {scholarships.map((s) => (
                  <tr key={s.name} className="bg-white align-top hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-4 font-bold text-slate-900 whitespace-nowrap min-w-[180px]">
                      {s.name}
                    </td>
                    <td className="px-4 py-4 text-slate-600 leading-relaxed min-w-[260px]">{s.eligibility}</td>
                    <td className="px-4 py-4 text-slate-900 font-medium leading-relaxed min-w-[200px]">{s.award}</td>
                    <td className="px-4 py-4 text-slate-600 leading-relaxed min-w-[280px]">{s.strategy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 2: No-Essay & Rolling Monthly Scholarships */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">No-Essay &amp; Rolling Monthly Scholarships</h2>
          <p className="text-slate-500 mb-6 max-w-3xl">
            These scholarships require no essays and reset every month or quarter — meaning you can apply repeatedly
            throughout your senior year. They're lower-stakes than the major awards above, but the cumulative value adds
            up. Enter as many as you can, every cycle.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="px-4 py-4 font-semibold">Scholarship Name</th>
                  <th className="px-4 py-4 font-semibold whitespace-nowrap">Award Value</th>
                  <th className="px-4 py-4 font-semibold whitespace-nowrap">Deadline</th>
                  <th className="px-4 py-4 font-semibold">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {noEssayScholarships.map((s) => (
                  <tr key={s.name} className="bg-white align-top hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-4 font-bold text-slate-900 min-w-[200px]">
                      <a href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors inline-flex items-center gap-1">
                        {s.name}
                        <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
                      </a>
                    </td>
                    <td className="px-4 py-4 text-slate-900 font-medium whitespace-nowrap">{s.award}</td>
                    <td className="px-4 py-4 text-slate-600 whitespace-nowrap">{s.deadline}</td>
                    <td className="px-4 py-4 text-slate-600 leading-relaxed min-w-[280px]">{s.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: Hyper-Local Scholarships */}
        <section>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
              <MapPin className="h-5 w-5 text-emerald-600" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Finding Hyper-Local Scholarships</h2>
          </div>
          <p className="text-slate-500 mb-6 max-w-3xl">
            National scholarships are competitive. Hyper-local scholarships — those only available to students in your
            city, county, or school — have far fewer applicants. Here's how to find them.
          </p>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <ol className="space-y-4">
              {localScholarshipSteps.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="text-sm text-slate-700 leading-relaxed pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <a
              href="https://bigfuture.collegeboard.org/scholarship-search"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-emerald-300 hover:shadow-md"
            >
              <div>
                <h4 className="font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors">BigFuture (College Board)</h4>
                <p className="text-sm text-slate-500">Reputable official College Board scholarship search tool.</p>
              </div>
              <ExternalLink className="h-5 w-5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
            </a>
            <a
              href="https://www.fastweb.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-emerald-300 hover:shadow-md"
            >
              <div>
                <h4 className="font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors">Fastweb</h4>
                <p className="text-sm text-slate-500">Large scholarship database with niche filters.</p>
              </div>
              <ExternalLink className="h-5 w-5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}