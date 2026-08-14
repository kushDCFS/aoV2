import React, { useState } from "react";
import { Mark } from "@/components/Brand";

/**
 * An art-directed image slot.
 *
 * If `src` is missing or fails to load it renders a *composed* placeholder —
 * layered duotone wash, film grain, and the mark at low opacity — rather than
 * a gray box, so the page reads as finished at every stage. The aspect ratio
 * is reserved up front, so dropping a real asset in shifts nothing.
 *
 * `fill`  — stretch to a positioned parent instead of holding a ratio.
 * `scrim` — dissolve the left edge into the surrounding surface. Without it a
 *           photo butting against a panel reads as a pasted rectangle; with
 *           it, the panel and the photograph read as one object.
 */
export default function EditorialImage({
  src,
  alt = "",
  ratio = "4 / 5",
  className = "",
  caption,
  priority = false,
  fill = false,
  scrim = false,
  position = "center",
}) {
  const [failed, setFailed] = useState(!src);

  const frame = fill
    ? "absolute inset-0 h-full w-full overflow-hidden"
    : "relative overflow-hidden rounded-xl";

  return (
    <figure className={fill ? `absolute inset-0 ${className}` : className}>
      <div
        className={`${frame} bg-muted`}
        style={fill ? undefined : { aspectRatio: ratio }}
      >
        {!failed && (
          <img
            src={src}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            onError={() => setFailed(true)}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: position }}
          />
        )}

        {failed && (
          <div className="absolute inset-0">
            {/* Duotone wash — ink into accent, angled off-axis so it reads as
                lighting rather than a CSS gradient. */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(148deg, hsl(222 24% 10%) 0%, hsl(235 30% 22%) 42%, hsl(243 55% 42%) 100%)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(120% 90% at 24% 18%, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0) 58%)",
              }}
            />
            {/* Film grain. Without it, large flat fills look synthetic. */}
            <div
              className="absolute inset-0 opacity-[0.16] mix-blend-overlay"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E\")",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Mark className="h-10 w-10 text-white opacity-[0.14]" tone="invert" />
            </div>
          </div>
        )}

        {scrim && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, hsl(222 24% 10%) 0%, hsl(222 24% 10% / 0.72) 22%, hsl(222 24% 10% / 0) 62%)",
            }}
          />
        )}

        {/* Hairline inset — keeps a light image from floating unanchored. */}
        {!fill && (
          <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-foreground/[0.08]" />
        )}
      </div>

      {caption && (
        <figcaption className="type-small text-foreground/45 mt-3">{caption}</figcaption>
      )}
    </figure>
  );
}
