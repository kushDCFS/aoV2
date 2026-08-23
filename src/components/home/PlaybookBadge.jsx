import React from "react";

/**
 * A playbook's map marker.
 *
 * Four badges, each a different piece of cartographic grammar — elevation
 * rings, a trail junction, a surveyed waypoint, a bearing fan. The geometry is
 * the identifier; the colour only reinforces it. That is deliberate: a student
 * who cannot distinguish teal from ochre can still tell a contour ring from a
 * compass fan, and every badge is captioned with the playbook's name anyway.
 *
 * Flat vector, no gradients, ~30 lines of path data each — this is the
 * "illustrated" register the panel needs without shipping a raster asset.
 */

const STROKE = "hsl(var(--cat, var(--accent)))";
const SOFT = "hsl(var(--cat, var(--accent)) / 0.20)";
const WASH = "hsl(var(--cat, var(--accent)) / 0.10)";

function Contour() {
  // Academic Paths — elevation rings climbing to a summit. Study as ascent.
  return (
    <>
      <ellipse cx="24" cy="27" rx="17" ry="11" fill={WASH} />
      <ellipse cx="24" cy="26" rx="17" ry="11" stroke={STROKE} strokeWidth="1.6" fill="none" opacity="0.42" />
      <ellipse cx="24" cy="24" rx="11.5" ry="7.5" stroke={STROKE} strokeWidth="1.6" fill="none" opacity="0.7" />
      <ellipse cx="24" cy="22" rx="6" ry="4" stroke={STROKE} strokeWidth="1.8" fill="none" />
      <circle cx="24" cy="21" r="2.4" fill={STROKE} />
    </>
  );
}

function Junction() {
  // Extracurricular Tracks — one path forking into several. Six tracks, one start.
  return (
    <>
      <circle cx="24" cy="24" r="18" fill={WASH} />
      <path d="M24 39 V27" stroke={STROKE} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M24 27 C24 20 15 21 15 13" stroke={STROKE} strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M24 27 C24 20 33 21 33 13" stroke={STROKE} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.62" />
      <path d="M24 27 V12" stroke={STROKE} strokeWidth="2" strokeLinecap="round" strokeDasharray="1.5 4.5" opacity="0.5" />
      <circle cx="24" cy="39" r="3" fill={STROKE} />
      <circle cx="15" cy="12" r="2.6" fill={STROKE} />
      <circle cx="33" cy="12" r="2.6" fill={STROKE} opacity="0.62" />
    </>
  );
}

function Waypoint() {
  // Scholarship Finder — the surveyed marker from the brand's route mark,
  // set on a plotted grid. Money is a destination you navigate to.
  return (
    <>
      <circle cx="24" cy="24" r="18" fill={WASH} />
      <path d="M8 30 H40" stroke={STROKE} strokeWidth="1.4" opacity="0.3" strokeDasharray="2 4" />
      <path d="M8 36 H40" stroke={STROKE} strokeWidth="1.4" opacity="0.18" strokeDasharray="2 4" />
      <path d="M24 9 39 17 24 25 9 17 24 9Z" fill={STROKE} />
      <path d="M24 25 39 17 V21 L24 29Z" fill={STROKE} opacity="0.42" />
      <path d="M24 25 9 17 V21 L24 29Z" fill={STROKE} opacity="0.26" />
    </>
  );
}

function Bearing() {
  // The Outreach Lab — a bearing fan opening outward from a fixed point.
  // Cold email is a signal sent on a heading, most of which never comes back.
  return (
    <>
      <circle cx="24" cy="24" r="18" fill={WASH} />
      <path d="M13 33 A16 16 0 0 1 13 15" stroke={STROKE} strokeWidth="1.6" fill="none" opacity="0.32" />
      <path d="M13 33 L37 21" stroke={STROKE} strokeWidth="2" strokeLinecap="round" />
      <path d="M13 33 L36 30" stroke={STROKE} strokeWidth="2" strokeLinecap="round" opacity="0.55" strokeDasharray="1.5 4" />
      <path d="M13 33 L31 13" stroke={STROKE} strokeWidth="2" strokeLinecap="round" opacity="0.35" strokeDasharray="1.5 4" />
      <circle cx="13" cy="33" r="3.4" fill={STROKE} />
      <circle cx="37" cy="21" r="2.6" fill={STROKE} />
    </>
  );
}

const SHAPES = {
  contour: Contour,
  junction: Junction,
  waypoint: Waypoint,
  bearing: Bearing,
};

export default function PlaybookBadge({ shape, category, className = "h-12 w-12" }) {
  const Shape = SHAPES[shape] ?? Contour;
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full ${className}`}
      style={{
        "--cat": `var(--cat-${category})`,
        background: SOFT.replace("0.20", "0.09"),
      }}
    >
      <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden="true" focusable="false">
        <Shape />
      </svg>
    </span>
  );
}
