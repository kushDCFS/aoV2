import React from "react";
import { ChevronRight, CircleAlert } from "lucide-react";
import { COST_TIERS, CATEGORIES } from "@/lib/programs";
import { CATEGORY_TONE } from "./categoryTone";
import { curl, parseISO, fmtDate, daysUntil } from "./programFormat";
import ProgramAvatar from "./ProgramAvatar";

/** One line, deadline-first, for the row — the full deadline story belongs to the detail panel. */
function deadlineTag(program) {
  const exact = parseISO(program.deadlineISO);
  if (exact) {
    const days = daysUntil(exact);
    if (days < 0) return { text: "Closed", urgent: false };
    if (days <= 14) return { text: days === 0 ? "Closes today" : `${days}d left`, urgent: true };
    return { text: `Closes ${fmtDate(exact)}`, urgent: false };
  }
  if (program.deadline) return { text: curl(program.deadline), urgent: false };
  return null;
}

export default function ProgramListRow({ program, active, onSelect }) {
  const tier = COST_TIERS[program.cost] ?? COST_TIERS.unknown;
  const tone = CATEGORY_TONE[program.category];
  const deadline = deadlineTag(program);
  const unverified = program.verified === false;

  return (
    <li>
      <button
        type="button"
        onClick={onSelect}
        aria-current={active ? "true" : undefined}
        className={`press flex w-full items-start gap-3 rounded-2xl border-l-[3px] p-3.5 text-left transition-colors duration-150 ${
          active
            ? "border-l-[hsl(var(--c-sky))] bg-[hsl(var(--c-sky)_/_0.08)]"
            : "border-l-transparent hover:bg-[hsl(220_30%_97%)]"
        }`}
      >
        <ProgramAvatar program={program} tone={tone} />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className="type-h4 truncate">{curl(program.name)}</p>
            <ChevronRight
              className={`mt-0.5 h-4 w-4 shrink-0 transition-transform ${active ? "translate-x-0.5 text-[hsl(var(--c-sky-ink))]" : "text-foreground/25"}`}
              aria-hidden="true"
            />
          </div>
          {program.host && (
            <p className="type-small truncate text-foreground/55">{curl(program.host)}</p>
          )}

          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <span
              className="inline-flex items-center rounded-full px-2 py-0.5 text-[0.72rem] font-semibold"
              style={{ color: `hsl(${tier.ink})`, background: `hsl(${tier.tone} / 0.2)` }}
            >
              {tier.label}
            </span>
            {CATEGORIES[program.category] && (
              <span
                className="inline-flex items-center rounded-full px-2 py-0.5 text-[0.72rem] font-medium"
                style={{ color: `hsl(${tone?.ink})`, background: `hsl(${tone?.tone} / 0.14)` }}
              >
                {CATEGORIES[program.category]}
              </span>
            )}
            {unverified && (
              <CircleAlert
                className="h-3.5 w-3.5 shrink-0 text-[hsl(var(--c-money-ink))]"
                aria-label="Unverified entry"
              />
            )}
          </div>

          {deadline && (
            <p
              className={`type-small mt-1.5 ${deadline.urgent ? "font-semibold text-[hsl(350_70%_42%)]" : "text-foreground/50"}`}
            >
              {deadline.text}
            </p>
          )}
        </div>
      </button>
    </li>
  );
}
