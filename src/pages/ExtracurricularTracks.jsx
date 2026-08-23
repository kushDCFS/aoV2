import React from "react";
import PageHeader from "@/components/PageHeader";
import TrackContent from "@/components/tracks/TrackContent";
import { tracks } from "@/lib/trackData";

export default function ExtracurricularTracks() {
  const [active, setActive] = React.useState(tracks[0].key);
  const activeTrack = tracks.find((t) => t.key === active) ?? tracks[0];

  return (
    <div>
      <PageHeader
        eyebrow="Playbook"
        tone="var(--c-extra-ink)"
        title="Extracurricular tracks"
        subtitle="Six career-field tracks. Each one includes a free national competition, a $0 portfolio project blueprint, and a virtual experience/shadowing playbook — all using free resources."
      />

      {/* Segmented control: hairline-bordered, accent underline on active —
          the site's surface language (.card/.panel), not a default gray
          pill row. A row of six is dense; wraps cleanly on small screens. */}
      <div
        role="tablist"
        aria-label="Extracurricular tracks"
        className="page-card flex flex-wrap gap-1 p-1.5 mb-10"
      >
        {tracks.map((track) => {
          const isActive = track.key === active;
          return (
            <button
              key={track.key}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(track.key)}
              className={`press relative flex items-center gap-2 rounded-lg px-3.5 h-9 text-[13.5px] font-medium transition-colors duration-150 ${
                isActive
                  ? "bg-foreground text-background"
                  : "text-foreground/55 hover:text-foreground hover:bg-muted"
              }`}
            >
              <track.icon className="h-3.5 w-3.5 flex-shrink-0" strokeWidth={1.9} />
              <span className="hidden sm:inline">{track.name}</span>
              <span className="sm:hidden">{track.name.split(" ")[0]}</span>
            </button>
          );
        })}
      </div>

      <TrackContent key={activeTrack.key} track={activeTrack} />
    </div>
  );
}
