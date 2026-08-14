import React from "react";

/**
 * The MAPS mark — a cartographic north arrow, reduced to constructed geometry.
 *
 * Vertical-dominant (extends 1→23 on Y, only 5→19 on X) so it reads as a bearing
 * needle rather than a generic four-point sparkle. The waist is pinched with
 * quadratic curves; the lower half carries less weight, the way a real compass
 * needle is counterbalanced.
 */
export function Mark({ className = "h-6 w-6", tone = "ink" }) {
  const top = tone === "invert" ? "#FFFFFF" : "currentColor";
  const bottom = tone === "invert" ? "rgba(255,255,255,0.42)" : "currentColor";
  const bottomOpacity = tone === "invert" ? 1 : 0.32;

  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 1 Q13.4 10.6 19 12 L5 12 Q10.6 10.6 12 1 Z"
        fill={top}
      />
      <path
        d="M19 12 Q13.4 13.4 12 23 Q10.6 13.4 5 12 Z"
        fill={bottom}
        opacity={bottomOpacity}
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
