import React from "react";
import { Trophy, FolderKanban, Eye, Heart, ExternalLink, Sun, MapPin, DollarSign, Clock } from "lucide-react";


function StepList({ steps }) {
  return (
    <ol className="space-y-2.5">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-3 text-sm text-slate-700 leading-relaxed">
          <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
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
    <div className="space-y-6">
      {/* Competition */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
            <Trophy className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Free National Competition</h3>
            <a
              href={track.competition.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
            >
              {track.competition.name}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">{track.competition.description}</p>
        <StepList steps={track.competition.steps} />
      </div>

      {/* Portfolio */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
            <FolderKanban className="h-5 w-5 text-blue-600" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">{track.portfolio.title}</h3>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">{track.portfolio.description}</p>
        <StepList steps={track.portfolio.steps} />
      </div>

      {/* Shadowing */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100">
            <Eye className="h-5 w-5 text-violet-600" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">{track.shadowing.title}</h3>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">{track.shadowing.description}</p>
        <StepList steps={track.shadowing.steps} />
      </div>

      {/* Community Giving */}
      {track.communityGiving && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
              <Heart className="h-5 w-5 text-emerald-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">{track.communityGiving.title}</h3>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">{track.communityGiving.description}</p>
          <StepList steps={track.communityGiving.steps} />
        </div>
      )}


      {/* Summer Programs */}
      {track.summerPrograms && track.summerPrograms.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
              <Sun className="h-5 w-5 text-orange-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Free &amp; Low-Cost Summer Programs</h3>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed mb-5">
            Curated from{" "}
            <a
              href="https://www.teenlife.com/for/free-low-cost-summer-programs/?program-type=summer"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              TeenLife's free &amp; low-cost directory
            </a>
            . All programs are free or under $500.
          </p>
          <div className="space-y-4">
            {track.summerPrograms.map((program, i) => (
              <div key={i} className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 sm:p-5">
                <a
                  href={program.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-bold text-slate-900 hover:text-blue-600 transition-colors text-sm sm:text-base"
                >
                  {program.name}
                  <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
                </a>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{program.description}</p>
                <div className="mt-3 flex flex-wrap gap-3 text-xs">
                  <span className="inline-flex items-center gap-1 text-emerald-700">
                    <DollarSign className="h-3.5 w-3.5" />
                    {program.cost}
                  </span>
                  <span className="inline-flex items-center gap-1 text-slate-500">
                    <MapPin className="h-3.5 w-3.5" />
                    {program.location}
                  </span>
                  <span className="inline-flex items-center gap-1 text-slate-500">
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