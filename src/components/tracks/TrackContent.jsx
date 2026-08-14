import React from "react";
import { Trophy, FolderKanban, Eye, Heart, ExternalLink, Sun, MapPin, DollarSign, Clock } from "lucide-react";
import EditorialImage from "@/components/EditorialImage";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";

function StepList({ steps }) {
  return (
    <ol className="space-y-3.5">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-4">
          <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-muted text-[11px] font-semibold text-foreground/60 tnum">
            {i + 1}
          </span>
          <span className="type-small text-foreground/70 pt-0.5">{step}</span>
        </li>
      ))}
    </ol>
  );
}

/* Every module (competition, portfolio, shadowing, community, summer
   programs) uses the same icon treatment — muted tile, foreground icon.
   The old version gave each one a different accent (blue/violet/emerald/
   orange), which is exactly the color-soup pattern the rest of the site
   moved away from. One accent, spent only on links. */
function Module({ icon: Icon, eyebrow, title, description, children }) {
  return (
    <RevealItem>
      <div className="card p-7 sm:p-9">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-muted text-foreground/70">
            <Icon className="h-5 w-5" strokeWidth={1.8} />
          </div>
          <div>
            {eyebrow && <div className="type-label text-accent mb-1">{eyebrow}</div>}
            <h3 className="type-h3">{title}</h3>
          </div>
        </div>
        {description && <p className="type-body text-foreground/62 mb-6 max-w-[68ch]">{description}</p>}
        {children}
      </div>
    </RevealItem>
  );
}

export default function TrackContent({ track }) {
  return (
    <div>
      <Reveal>
        <EditorialImage
          src={`/images/tracks/${track.key}.jpg`}
          alt={`A student mid-project in the ${track.name.toLowerCase()} track — hands-on, unposed, documentary in tone.`}
          ratio="21 / 6"
          className="mb-10 hidden sm:block"
        />
      </Reveal>

      <RevealGroup className="space-y-4">
        <Module icon={Trophy} title="Free national competition">
          <a
            href={track.competition.url}
            target="_blank"
            rel="noopener noreferrer"
            className="link-arrow type-h4 text-foreground hover:text-accent mb-4"
          >
            {track.competition.name}
            <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} />
          </a>
          <p className="type-body text-foreground/62 mb-6 max-w-[68ch]">{track.competition.description}</p>
          <StepList steps={track.competition.steps} />
        </Module>

        <Module icon={FolderKanban} title={track.portfolio.title} description={track.portfolio.description}>
          <StepList steps={track.portfolio.steps} />
        </Module>

        <Module icon={Eye} title={track.shadowing.title} description={track.shadowing.description}>
          <StepList steps={track.shadowing.steps} />
        </Module>

        {track.communityGiving && (
          <Module
            icon={Heart}
            title={track.communityGiving.title}
            description={track.communityGiving.description}
          >
            <StepList steps={track.communityGiving.steps} />
          </Module>
        )}

        {track.summerPrograms && track.summerPrograms.length > 0 && (
          <Module icon={Sun} title="Free & low-cost summer programs">
            <p className="type-body text-foreground/62 mb-2 max-w-[68ch]">
              Curated from{" "}
              <a
                href="https://www.teenlife.com/for/free-low-cost-summer-programs/?program-type=summer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-foreground font-medium transition-colors duration-150"
              >
                TeenLife&rsquo;s free &amp; low-cost directory
              </a>
              . All programs are free or under $500.
            </p>

            <div className="divide-y divide-border -mx-7 sm:-mx-9">
              {track.summerPrograms.map((program) => (
                <div key={program.name} className="row px-7 sm:px-9 py-5">
                  <a
                    href={program.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-arrow type-h4 text-foreground hover:text-accent"
                  >
                    {program.name}
                    <ExternalLink className="h-3.5 w-3.5 text-foreground/30" strokeWidth={1.8} />
                  </a>
                  <p className="type-small text-foreground/58 mt-1.5 max-w-[68ch]">{program.description}</p>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 type-small text-foreground/50">
                    <span className="inline-flex items-center gap-1.5">
                      <DollarSign className="h-3.5 w-3.5" strokeWidth={1.8} />
                      {program.cost}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" strokeWidth={1.8} />
                      {program.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" strokeWidth={1.8} />
                      {program.format}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Module>
        )}
      </RevealGroup>
    </div>
  );
}
