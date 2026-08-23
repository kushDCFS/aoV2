import React from "react";

/**
 * The MAPS mark — an "A" with a route sweeping up through it.
 *
 * The A is drawn as a single open arch (one stroke, round caps) rather than
 * three separate members, so it holds together at 20px in the top bar. The
 * rising path replaces the crossbar: it enters low on the left, crosses the
 * A's waist, and exits as an arrowhead at upper right. The crossbar doing
 * double duty as the trajectory is the whole idea — access going up.
 *
 * `tone="invert"` is for the dark bar; the arrow keeps full opacity in both
 * tones because it is the load-bearing half of the mark.
 */
export function Mark({ className = "h-6 w-6", tone = "ink" }) {
  const color = tone === "invert" ? "#FFFFFF" : "currentColor";

  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      {/* The A — one open arch, apex rounded, legs splayed wide enough that the
          counter survives at 20px. */}
      <path
        d="M11 40 L20.4 15.8 A 3.9 3.9 0 0 1 27.6 15.8 L37 40"
        stroke={color}
        strokeWidth="5.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* The route. Crosses the A where the crossbar would be — the crossbar
          doing double duty as the trajectory is the mark's whole idea — then
          climbs clear of the right leg before the head. */}
      <path
        d="M6.8 34.4 C13.4 35.4 18.6 33.6 24.2 29.8 C29 26.5 32.6 22.8 35.8 19"
        stroke={color}
        strokeWidth="4.9"
        strokeLinecap="round"
        fill="none"
      />
      {/* Arrowhead, aligned to the path's exit bearing. */}
      <path
        d="M43.2 9.8 L33.6 11.6 L41.1 18.9 Z"
        fill={color}
        stroke={color}
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Mark + wordmark lockup. */
export function Logo({ className = "", markClass = "h-[22px] w-[22px]", tone = "ink" }) {
  return (
    <span className={`inline-flex items-center gap-[7px] ${className}`}>
      <Mark className={markClass} tone={tone} />
      <span className="type-wordmark">MAPS</span>
    </span>
  );
}

export default Logo;
