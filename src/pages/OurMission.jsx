import React from "react";
import { Globe, Heart, ShieldAlert, Sparkles } from "lucide-react";
import PageHeader from "@/components/PageHeader";

const pillars = [
  {
    icon: Heart,
    title: "Admissions equity",
    description:
      "The same blueprints and frameworks that expensive consulting firms keep behind paywalls, published openly for candidates who cannot buy them.",
  },
  {
    icon: Globe,
    title: "Global reach",
    description:
      "Open across all 50 states and 190+ countries, so international applicants get the same structure as domestic ones.",
  },
  {
    icon: Sparkles,
    title: "Free and self-serve",
    description:
      "No sign-ups, zero personal data collected, no hidden coaching packages. There is nothing to upgrade to.",
  },
];

export default function OurMission() {
  return (
    <div>
      <PageHeader
        eyebrow="About"
        title="Our mission"
        subtitle="Working toward total equity in the college admissions process by dismantling financial barriers."
      />

      <section className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="type-h2 optical-left text-balance">
            Dismantling barriers to higher education
          </h2>

          <div className="mt-6 space-y-5">
            <p className="type-body text-foreground/62">
              Every year, wealthy applicants spend thousands of dollars on private college
              admissions counseling. That systemic gap creates an uneven field for
              high-achieving, self-driven candidates.
            </p>
            <p className="type-body text-foreground/62">
              Our core goal is{" "}
              <strong className="text-foreground font-medium">
                total equity in the college admissions process
              </strong>
              . Access to guides on building high-impact extracurriculars, scoring well on
              standardized tests, and compiling strong applications should be democratic,
              transparent, and completely free.
            </p>
            <p className="type-body text-foreground/62">
              This platform is a self-service playbook depository, helping students navigate
              competitive college tracks across{" "}
              <strong className="text-foreground font-medium">all 50 U.S. states</strong> and
              globally across{" "}
              <strong className="text-foreground font-medium">190+ countries</strong> where
              international applicants seek equitable access to higher education.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {pillars.map((pillar, i) => (
            <div
              key={pillar.title}
              className="stagger-in panel p-7 flex gap-5"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-muted text-foreground/70">
                <pillar.icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
              </div>
              <div>
                <h3 className="type-h3">{pillar.title}</h3>
                <p className="type-small text-foreground/58 mt-2">{pillar.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 lg:mt-28">
        <div className="panel p-8 sm:p-10 flex flex-col sm:flex-row gap-6 items-start">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-muted text-foreground/70">
            <ShieldAlert className="h-[18px] w-[18px]" strokeWidth={1.8} />
          </div>
          <div>
            <h3 className="type-h3">Democratizing knowledge, not selling services</h3>
            <p className="type-body text-foreground/58 mt-3 max-w-[68ch]">
              Movement for Admissions Pathways and Success is a self-service resource
              directory. We do not solicit personal details, sell consulting packages, or
              offer 1-on-1 editing. We provide the strategies and tools; you provide the
              dedication to write your own future.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
