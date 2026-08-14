import React from "react";
import { Trophy, FolderKanban, Eye, Heart, ExternalLink, Sun, MapPin, DollarSign, Clock } from "lucide-react";


function StepList({ steps }) {
  return (
    <ol className="space-y-3.5">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-4 text-sm text-foreground/80 leading-relaxed">
          <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
            {i + 1}
          </span>
          <span className="pt-0.5">{step}</span>
        </li>
      ))}
    </ol>
  );
}

export default function TrackContent({ track }) {
  return (
    <div className="space-y-8">
      {/* Competition */}
      <div className="rounded-3xl border border-border/60 bg-card p-8 sm:p-10 transition-all duration-300 ease-in-out hover:border-accent/45 hover:-translate-y-0.5 hover:shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
            <Trophy className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-heading font-bold text-primary">Free National Competition</h3>
            <a
              href={track.competition.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-accent hover:text-primary inline-flex items-center gap-1 transition-colors duration-300"
            >
              {track.competition.name}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
        <p className="text-sm text-foreground/75 leading-relaxed mb-6">{track.competition.description}</p>
        <StepList steps={track.competition.steps} />
      </div>

      {/* Portfolio */}
      <div className="rounded-3xl border border-border/60 bg-card p-8 sm:p-10 transition-all duration-300 ease-in-out hover:border-accent/45 hover:-translate-y-0.5 hover:shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent border border-accent/20">
            <FolderKanban className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-heading font-bold text-primary">{track.portfolio.title}</h3>
        </div>
        <p className="text-sm text-foreground/75 leading-relaxed mb-6">{track.portfolio.description}</p>
        <StepList steps={track.portfolio.steps} />
      </div>

      {/* Shadowing */}
      <div className="rounded-3xl border border-border/60 bg-card p-8 sm:p-10 transition-all duration-300 ease-in-out hover:border-accent/45 hover:-translate-y-0.5 hover:shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
            <Eye className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-heading font-bold text-primary">{track.shadowing.title}</h3>
        </div>
        <p className="text-sm text-foreground/75 leading-relaxed mb-6">{track.shadowing.description}</p>
        <StepList steps={track.shadowing.steps} />
      </div>

      {/* Community Giving */}
      {track.communityGiving && (
        <div className="rounded-3xl border border-border/60 bg-card p-8 sm:p-10 transition-all duration-300 ease-in-out hover:border-accent/45 hover:-translate-y-0.5 hover:shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100/60 text-emerald-700 border border-emerald-200/55">
              <Heart className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-heading font-bold text-primary">{track.communityGiving.title}</h3>
          </div>
          <p className="text-sm text-foreground/75 leading-relaxed mb-6">{track.communityGiving.description}</p>
          <StepList steps={track.communityGiving.steps} />
        </div>
      )}


      {/* Summer Programs */}
      {track.summerPrograms && track.summerPrograms.length > 0 && (
        <div className="rounded-3xl border border-border/60 bg-card p-8 sm:p-10 transition-all duration-300 ease-in-out hover:border-accent/45 hover:-translate-y-0.5 hover:shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100/60 text-orange-700 border border-orange-200/55">
              <Sun className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-heading font-bold text-primary">Free &amp; Low-Cost Summer Programs</h3>
          </div>
          <p className="text-sm text-foreground/75 leading-relaxed mb-6">
            Curated from{" "}
            <a
              href="https://www.teenlife.com/for/free-low-cost-summer-programs/?program-type=summer"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-primary font-semibold transition-colors duration-300"
            >
              TeenLife's free &amp; low-cost directory
            </a>
            . All programs are free or under $500.
          </p>
          <div className="space-y-6">
            {track.summerPrograms.map((program, i) => (
              <div key={i} className="rounded-2xl border border-border/50 bg-secondary/10 p-6 transition-all duration-300 ease-in-out hover:border-accent/35 hover:-translate-y-0.5 hover:shadow-md">
                <a
                  href={program.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-heading font-bold text-primary hover:text-accent transition-colors duration-300 text-base sm:text-lg"
                >
                  {program.name}
                  <ExternalLink className="h-4 w-4 text-foreground/40" />
                </a>
                <p className="mt-2 text-sm text-foreground/75 leading-relaxed">{program.description}</p>
                <div className="mt-4 flex flex-wrap gap-4 text-xs font-semibold">
                  <span className="inline-flex items-center gap-1 text-emerald-700">
                    <DollarSign className="h-3.5 w-3.5" />
                    {program.cost}
                  </span>
                  <span className="inline-flex items-center gap-1 text-foreground/60">
                    <MapPin className="h-3.5 w-3.5" />
                    {program.location}
                  </span>
                  <span className="inline-flex items-center gap-1 text-foreground/60">
                    <Clock className="h-3.5 w-3.5" />
                    {program.format}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}