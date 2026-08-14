import React, { useMemo, useState } from "react";
import {
  Award, MapPin, Landmark, FlaskConical, Palette, DoorOpen, Wheat, HeartPulse, X, ExternalLink,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import UsStateMap from "@/components/UsStateMap";
import { scholarships, noEssayScholarships, localScholarshipSteps } from "@/lib/scholarshipData";
import { stateFlagshipPrograms, scholarshipCategories, stateFullNames, searchLink } from "@/lib/stateScholarshipData";

const categoryIcons = { Landmark, FlaskConical, Palette, DoorOpen, Wheat, HeartPulse };

export default function ScholarshipFinder() {
  const [selectedState, setSelectedState] = useState(null);
  const [tab, setTab] = useState("state");

  const flagship = selectedState ? stateFlagshipPrograms[selectedState] : null;
  const stateName = selectedState ? stateFullNames[selectedState] : null;

  const stateCount = useMemo(() => Object.keys(stateFlagshipPrograms).length, []);

  return (
    <div className="space-y-10">
      <PageHeader
        title="Scholarship Finder"
        subtitle={`${scholarships.length + noEssayScholarships.length}+ national scholarships, plus a flagship aid program and search directory for all ${stateCount} states.`}
        icon={Award}
      />

      {/* Tab switch */}
      <div className="inline-flex rounded-lg border border-border bg-card p-1">
        <button
          onClick={() => setTab("state")}
          className={`press rounded-md px-4 py-2 text-sm font-medium ${tab === "state" ? "bg-primary text-primary-foreground" : "text-foreground/60"}`}
        >
          Browse by State
        </button>
        <button
          onClick={() => setTab("national")}
          className={`press rounded-md px-4 py-2 text-sm font-medium ${tab === "national" ? "bg-primary text-primary-foreground" : "text-foreground/60"}`}
        >
          National Lists
        </button>
      </div>

      {tab === "state" && (
        <section className="grid gap-8 lg:grid-cols-5">
          {/* Map */}
          <div className="lg:col-span-3 card p-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-heading font-semibold text-foreground">Select a state</h2>
              {selectedState && (
                <button
                  onClick={() => setSelectedState(null)}
                  className="press inline-flex items-center gap-1 text-xs font-medium text-foreground/50 hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" /> Clear
                </button>
              )}
            </div>
            <p className="text-xs text-foreground/55 mb-4">Hover to preview, click to open a state's aid directory.</p>
            <UsStateMap selectedState={selectedState} onSelectState={setSelectedState} />
          </div>

          {/* State detail panel */}
          <div className="lg:col-span-2">
            {!selectedState ? (
              <div className="card p-8 h-full flex flex-col items-center justify-center text-center gap-3 border-dashed">
                <MapPin className="h-6 w-6 text-foreground/30" />
                <p className="text-sm text-foreground/55 max-w-xs">
                  Click any state on the map to see its flagship financial-aid program and where to look for local awards.
                </p>
              </div>
            ) : (
              <div className="card p-7 space-y-6 stagger-in">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-accent">{selectedState}</span>
                  <h3 className="text-2xl font-heading font-semibold text-foreground mt-0.5">{stateName}</h3>
                </div>

                <div className="rounded-lg bg-muted/50 border border-border p-4">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-foreground/50 block mb-1">
                    Flagship State Aid Program
                  </span>
                  <p className="text-sm font-semibold text-foreground">{flagship.name}</p>
                  <p className="text-xs text-foreground/65 leading-relaxed mt-1.5">{flagship.note}</p>
                  <a
                    href={searchLink(`${flagship.name} ${stateName} official site`)}
                    target="_blank"
                    rel="noreferrer"
                    className="press mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-accent"
                  >
                    Find official site <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-foreground/50 block mb-3">
                    Where else to look in {stateName}
                  </span>
                  <div className="space-y-2.5">
                    {scholarshipCategories.map((cat) => {
                      const Icon = categoryIcons[cat.icon];
                      return (
                        <a
                          key={cat.key}
                          href={searchLink(`${cat.label} scholarships ${stateName} high school students`)}
                          target="_blank"
                          rel="noreferrer"
                          className="card-interactive card flex gap-3 p-3 -mx-3"
                        >
                          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-accent/8 text-accent border border-accent/15">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-foreground">{cat.label}</p>
                            <p className="text-[11px] text-foreground/60 leading-relaxed mt-0.5">{cat.description}</p>
                          </div>
                          <ExternalLink className="h-3.5 w-3.5 text-foreground/25 flex-shrink-0 mt-0.5" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {tab === "national" && (
        <div className="space-y-12">
          {/* Major National Scholarships */}
          <section className="space-y-4">
            <div>
              <h2 className="text-xl font-heading font-semibold text-foreground">Major National Scholarships</h2>
              <p className="text-sm text-foreground/60 mt-1 max-w-3xl leading-relaxed">
                The highest-value, most reputable scholarships for ambitious scholars.
              </p>
            </div>

            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr className="border-b border-border bg-muted/40">
                      <th className="px-5 py-3 font-semibold text-xs uppercase tracking-wide text-foreground/60 whitespace-nowrap">Name</th>
                      <th className="px-5 py-3 font-semibold text-xs uppercase tracking-wide text-foreground/60">Eligibility</th>
                      <th className="px-5 py-3 font-semibold text-xs uppercase tracking-wide text-foreground/60 whitespace-nowrap">Award</th>
                      <th className="px-5 py-3 font-semibold text-xs uppercase tracking-wide text-foreground/60">Strategy</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {scholarships.map((s) => (
                      <tr key={s.name} className="align-top hover:bg-muted/30 transition-colors duration-150">
                        <td className="px-5 py-4 font-semibold min-w-[200px]">
                          <a
                            href={s.url || searchLink(s.name)}
                            target="_blank"
                            rel="noreferrer"
                            className="text-foreground hover:text-accent inline-flex items-start gap-1.5"
                          >
                            {s.name}
                            <ExternalLink className="h-3 w-3 mt-1 flex-shrink-0 text-foreground/30" />
                          </a>
                        </td>
                        <td className="px-5 py-4 text-foreground/70 leading-relaxed min-w-[260px]">{s.eligibility}</td>
                        <td className="px-5 py-4 text-foreground/85 font-medium leading-relaxed min-w-[200px]">{s.award}</td>
                        <td className="px-5 py-4 text-foreground/70 leading-relaxed min-w-[280px]">{s.strategy}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* No-Essay Scholarships */}
          <section className="space-y-4">
            <div>
              <h2 className="text-xl font-heading font-semibold text-foreground">No-Essay &amp; Rolling Monthly Scholarships</h2>
              <p className="text-sm text-foreground/60 mt-1 max-w-3xl leading-relaxed">
                No essays. Reset every month or quarter. Enter as many as you can, every cycle.
              </p>
            </div>

            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr className="border-b border-border bg-muted/40">
                      <th className="px-5 py-3 font-semibold text-xs uppercase tracking-wide text-foreground/60">Name</th>
                      <th className="px-5 py-3 font-semibold text-xs uppercase tracking-wide text-foreground/60 whitespace-nowrap">Award</th>
                      <th className="px-5 py-3 font-semibold text-xs uppercase tracking-wide text-foreground/60 whitespace-nowrap">Deadline</th>
                      <th className="px-5 py-3 font-semibold text-xs uppercase tracking-wide text-foreground/60">Details</th>
                      <th className="px-5 py-3 font-semibold text-xs uppercase tracking-wide text-foreground/60 w-8" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {noEssayScholarships.map((s) => (
                      <tr key={s.name} className="align-top hover:bg-muted/30 transition-colors duration-150">
                        <td className="px-5 py-4 font-semibold text-foreground min-w-[200px]">{s.name}</td>
                        <td className="px-5 py-4 text-foreground/85 font-medium whitespace-nowrap">{s.award}</td>
                        <td className="px-5 py-4 text-accent font-medium whitespace-nowrap">{s.deadline}</td>
                        <td className="px-5 py-4 text-foreground/70 leading-relaxed">{s.details}</td>
                        <td className="px-5 py-4">
                          <a href={s.url} target="_blank" rel="noreferrer" className="text-foreground/30 hover:text-accent">
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Hyper-local strategy */}
          <section className="space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b border-border">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent border border-accent/20">
                <MapPin className="h-4.5 w-4.5" />
              </div>
              <h2 className="text-xl font-heading font-semibold text-foreground">The Hyper-Local Strategy</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {localScholarshipSteps.map((step, i) => (
                <div key={i} className="card p-6 flex gap-4">
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-sm text-foreground/75 leading-relaxed">{step}</p>
                    <a
                      href={searchLink(step.split(".")[0])}
                      target="_blank"
                      rel="noreferrer"
                      className="press mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-accent"
                    >
                      Search this now <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
