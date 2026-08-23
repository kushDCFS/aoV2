import React from "react";

/**
 * A program's identity tile.
 *
 * There are no real institution logos in this data — fabricating one would be
 * the same failure mode as an invented URL, just harder to notice. Instead:
 * the host's initials on a category-tinted tile. Deterministic, honest, and
 * legible at both the 40px list size and the 64px detail-panel size.
 */
function initials(host, name) {
  const source = (host || name || "?").trim();
  const words = source.split(/\s+/).filter((w) => /[A-Za-z]/.test(w));
  if (words.length === 0) return "?";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

export default function ProgramAvatar({ program, tone, size = "sm" }) {
  const dims = size === "lg" ? "h-16 w-16 text-[1.35rem]" : "h-10 w-10 text-[0.8rem]";
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center rounded-2xl font-bold ${dims}`}
      style={{
        background: `hsl(${tone?.tone ?? "var(--c-academic)"} / 0.18)`,
        color: `hsl(${tone?.ink ?? "var(--c-academic-ink)"})`,
      }}
    >
      {initials(program.host, program.name)}
    </span>
  );
}
