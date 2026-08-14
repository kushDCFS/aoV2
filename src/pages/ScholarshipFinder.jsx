import React, { useMemo, useState } from "react";
import {
  MapPin, Landmark, FlaskConical, Palette, DoorOpen, Wheat, HeartPulse, X, ExternalLink,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import UsStateMap from "@/components/UsStateMap";
import { scholarships, noEssayScholarships, localScholarshipSteps } from "@/lib/scholarshipData";
import { stateFlagshipPrograms, scholarshipCategories, stateFullNames, searchLink } from "@/lib/stateScholarshipData";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";

const categoryIcons = { Landmark, FlaskConical, Palette, DoorOpen, Wheat, HeartPulse };

function SegmentedSwitch({ tab, setTab }) {
  return (
    <div role="tablist" className="panel inline-flex gap-1 p-1.5">
      {[
        { key: "state", label: "Browse by state" },
        { key: "national", label: "National lists" },
      ].map((t) => (
        <button
          key={t.key}
          role="tab"
          aria-selected={tab === t.key}
          onClick={() => setTab(t.key)}
          className={`press rounded-lg px-4 h-9 text-[13.5px] font-medium transition-colors duration-150 ${
            tab === t.key
              ? "bg-foreground text-background"
              : "text-foreground/55 hover:text-foreground hover:bg-muted"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

export default function ScholarshipFinder() {
  const [selectedState, setSelectedState] = useState(null);
  const [tab, setTab] = useState("state");

  const flagship = selectedState ? stateFlagshipPrograms[selectedState] : null;
  const stateName = selectedState ? stateFullNames[selectedState] : null;

  const stateCount = useMemo(() => Object.keys(stateFlagshipPrograms).length, []);

  return (
    <div>
      <PageHeader
        eyebrow="Playbook"
        title="Scholarship finder"
        subtitle={`${scholarships.length + noEssayScholarships.length}+ national scholarships, plus a flagship aid program and search directory for all ${stateCount} states.`}
      />

      <Reveal>
        <SegmentedSwitch tab={tab} setTab={setTab} />
      </Reveal>

      {tab === "state" && (
        <section className="grid gap-6 lg:grid-cols-5 mt-8">
          {/* Map */}
          <Reveal delay={0.05} className="lg:col-span-3 panel p-7">
            <div className="flex items-center justify-between mb-1">
              <h2 className="type-h4">Select a state</h2>
              {selectedState && (
                <button
                  onClick={() => setSelectedState(null)}
                  className="press link-arrow text-foreground/45 hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" /> Clear
                </button>
              )}
            </div>
            <p className="type-small text-foreground/50 mb-5">
              Hover to preview, click to open a state&rsquo;s aid directory.
            </p>
            <UsStateMap selectedState={selectedState} onSelectState={setSelectedState} />
          </Reveal>

          {/* State detail panel */}
          <div className="lg:col-span-2">
            {!selectedState ? (
              <div className="panel h-full min-h-[280px] flex flex-col items-center justify-center text-center gap-4 px-8">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-muted text-foreground/50">
                  <MapPin className="h-5 w-5" strokeWidth={1.6} />
                </div>
                <p className="type-small text-foreground/50 max-w-[30ch]">
                  Click any state on the map to see its flagship financial-aid program and where
                  to look for local awards.
                </p>
              </div>
            ) : (
              <div key={selectedState} className="stagger-in panel p-7 space-y-6">
                <div>
                  <div className="type-label text-accent">{selectedState}</div>
                  <h3 className="type-h2 mt-1.5">{stateName}</h3>
                </div>

                <div className="rounded-lg bg-muted/60 p-5">
                  <div className="type-label text-foreground/40 mb-1.5">
                    Flagship state aid program
                  </div>
                  <p className="type-h4">{flagship.name}</p>
                  <p className="type-small text-foreground/58 mt-1.5">{flagship.note}</p>
                  <a
                    href={searchLink(`${flagship.name} ${stateName} official site`)}
                    target="_blank"
                    rel="noreferrer"
                    className="link-arrow text-accent mt-3"
                  >
                    Find official site <ExternalLink className="h-3 w-3" strokeWidth={2} />
                  </a>
                </div>

                <div>
                  <div className="type-label text-foreground/40 mb-3">
                    Where else to look in {stateName}
                  </div>
                  <div className="divide-y divide-border -mx-7">
                    {scholarshipCategories.map((cat) => {
                      const Icon = categoryIcons[cat.icon];
                      return (
                        <a
                          key={cat.key}
                          href={searchLink(`${cat.label} scholarships ${stateName} high school students`)}
                          target="_blank"
                          rel="noreferrer"
                          className="row group flex items-center gap-3 px-7 py-3"
                        >
                          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-muted text-foreground/60">
                            <Icon className="h-4 w-4" strokeWidth={1.8} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="type-small font-medium text-foreground">{cat.label}</p>
                            <p className="type-small text-foreground/50">{cat.description}</p>
                          </div>
                          <ExternalLink
                            className="h-3.5 w-3.5 text-foreground/20 group-hover:text-accent flex-shrink-0 transition-colors"
                            strokeWidth={1.8}
                          />
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
        <div className="mt-8 space-y-16">
          {/* Major National Scholarships */}
          <section>
            <Reveal className="mb-6">
              <h2 className="type-h3">Major national scholarships</h2>
              <p className="type-body text-foreground/58 mt-2 max-w-[62ch]">
                The highest-value, most reputable scholarships for ambitious scholars.
              </p>
            </Reveal>

            <Reveal delay={0.06} className="panel overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Eligibility</th>
                    <th>Award</th>
                    <th>Strategy</th>
                  </tr>
                </thead>
                <tbody>
                  {scholarships.map((s) => (
                    <tr key={s.name}>
                      <td className="min-w-[190px]">
                        <a
                          href={s.url || searchLink(s.name)}
                          target="_blank"
                          rel="noreferrer"
                          className="link-arrow text-foreground hover:text-accent"
                        >
                          {s.name}
                          <ExternalLink className="h-3 w-3 text-foreground/30" strokeWidth={2} />
                        </a>
                      </td>
                      <td className="min-w-[240px]">{s.eligibility}</td>
                      <td className="min-w-[180px] tnum">{s.award}</td>
                      <td className="min-w-[260px]">{s.strategy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Reveal>
          </section>

          {/* No-Essay Scholarships */}
          <section>
            <Reveal className="mb-6">
              <h2 className="type-h3">No-essay &amp; rolling monthly scholarships</h2>
              <p className="type-body text-foreground/58 mt-2 max-w-[62ch]">
                No essays. Reset every month or quarter. Enter as many as you can, every cycle.
              </p>
            </Reveal>

            <Reveal delay={0.06} className="panel overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Award</th>
                    <th>Deadline</th>
                    <th>Details</th>
                    <th className="w-8" />
                  </tr>
                </thead>
                <tbody>
                  {noEssayScholarships.map((s) => (
                    <tr key={s.name}>
                      <td className="min-w-[190px]">{s.name}</td>
                      <td className="tnum whitespace-nowrap">{s.award}</td>
                      <td className="text-accent font-medium whitespace-nowrap">{s.deadline}</td>
                      <td className="min-w-[240px]">{s.details}</td>
                      <td>
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-foreground/30 hover:text-accent transition-colors"
                        >
                          <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.8} />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Reveal>
          </section>

          {/* Hyper-local strategy */}
          <section>
            <Reveal className="flex items-center gap-3 pb-4 mb-6 border-b border-border">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-foreground/60">
                <MapPin className="h-4 w-4" strokeWidth={1.8} />
              </div>
              <h2 className="type-h3">The hyper-local strategy</h2>
            </Reveal>

            <RevealGroup className="grid gap-4 md:grid-cols-2">
              {localScholarshipSteps.map((step, i) => (
                <RevealItem key={i}>
                  <div className="card p-6 flex h-full gap-4">
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-muted text-[12px] font-semibold text-foreground/60 tnum">
                      {i + 1}
                    </div>
                    <div>
                      <p className="type-small text-foreground/70">{step}</p>
                      <a
                        href={searchLink(step.split(".")[0])}
                        target="_blank"
                        rel="noreferrer"
                        className="link-arrow text-accent mt-2.5"
                      >
                        Search this now <ExternalLink className="h-3 w-3" strokeWidth={2} />
                      </a>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </section>
        </div>
      )}
    </div>
  );
}
