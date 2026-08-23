import React from "react";
import {
  ArrowUpRight,
  Globe,
  Instagram,
  CircleAlert,
  Info,
  Link2Off,
  CalendarClock,
  MapPin,
  Users,
  Layers,
} from "lucide-react";
import { COST_TIERS, CATEGORIES, hasLink, hasWebsite, hasInstagram } from "@/lib/programs";
import { CATEGORY_TONE } from "./categoryTone";
import { curl, parseISO, fmtDate, daysUntil, FORMAT_LABELS } from "./programFormat";
import ProgramAvatar from "./ProgramAvatar";

function Fact({ icon: Icon, label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-foreground/35" aria-hidden="true" />
      <div>
        <div className="type-label text-foreground/40">{label}</div>
        <p className="type-body mt-0.5 text-foreground/80">{value}</p>
      </div>
    </div>
  );
}

function DeadlineFact({ program }) {
  const exact = parseISO(program.deadlineISO);
  if (exact) {
    const days = daysUntil(exact);
    const past = days < 0;
    const urgent = !past && days <= 14;
    return (
      <Fact
        icon={CalendarClock}
        label="Deadline"
        value={
          <>
            {past ? "Closed " : "Closes "}
            {fmtDate(exact)}
            {!past && days <= 90 && (
              <span
                className="tnum ml-2 rounded-full px-2 py-0.5 text-[0.72rem] font-semibold"
                style={{
                  color: urgent ? "hsl(var(--c-money-ink))" : "hsl(var(--foreground) / 0.55)",
                  background: urgent ? "hsl(var(--c-money) / 0.22)" : "hsl(220 30% 96%)",
                }}
              >
                {days === 0 ? "today" : days === 1 ? "1 day left" : `${days} days left`}
              </span>
            )}
          </>
        }
      />
    );
  }
  if (program.deadline) {
    return (
      <Fact
        icon={CalendarClock}
        label="Deadline"
        value={
          <>
            {curl(program.deadline)}{" "}
            <span className="whitespace-nowrap text-[0.8rem] text-foreground/45">
              (no exact date published)
            </span>
          </>
        }
      />
    );
  }
  return null;
}

/**
 * The detail panel — desktop right pane, mobile full-screen sheet.
 *
 * Everything here is a real field or nothing at all. There is no fake logo,
 * no invented "open roles" list (a program is one offering, not a set of
 * postings), and no social icon unless `social.website` / `social.instagram`
 * actually resolves — most entries have neither today, and the panel is built
 * to look complete without them, not to look broken.
 */
export default function ProgramDetailPanel({ program, onClose }) {
  const tier = COST_TIERS[program.cost] ?? COST_TIERS.unknown;
  const tone = CATEGORY_TONE[program.category];
  const checked = parseISO(program.verifiedOn);
  const unverified = program.verified === false;
  const linked = hasLink(program);
  const website = hasWebsite(program) ? program.social.website : null;
  const instagram = hasInstagram(program) ? program.social.instagram : null;

  const location = [
    program.location,
    program.residential === true ? "Residential" : program.residential === false ? "Commuter" : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start gap-4 p-6 pb-5 sm:p-7 sm:pb-6">
        <ProgramAvatar program={program} tone={tone} size="lg" />
        <div className="min-w-0 flex-1">
          <h2 className="type-h2 text-balance">{curl(program.name)}</h2>
          {program.host && <p className="type-body mt-1 text-foreground/55">{curl(program.host)}</p>}
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close program details"
            className="press -mr-1 -mt-1 rounded-full p-2 text-foreground/40 hover:bg-foreground/5 hover:text-foreground lg:hidden"
          >
            ✕
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2 px-6 sm:px-7">
        <span
          className="inline-flex items-center rounded-full px-3 py-1.5 text-[0.8125rem] font-semibold"
          style={{ color: `hsl(${tier.ink})`, background: `hsl(${tier.tone} / 0.2)` }}
        >
          {tier.label}
        </span>
        {CATEGORIES[program.category] && (
          <span
            className="inline-flex items-center rounded-full px-3 py-1.5 text-[0.8125rem] font-medium"
            style={{ color: `hsl(${tone?.ink})`, background: `hsl(${tone?.tone} / 0.16)` }}
          >
            {CATEGORIES[program.category]}
          </span>
        )}
        {program.verified !== false && (
          <span
            className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[0.8125rem] font-medium"
            style={{ color: "hsl(var(--c-extra-ink))", background: "hsl(var(--c-extra) / 0.16)" }}
          >
            ✓ Verified
          </span>
        )}
      </div>

      {/* CTA row — only real, resolvable links get a button. */}
      <div className="mt-5 flex items-center gap-2 px-6 sm:px-7">
        {linked ? (
          <a
            href={program.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex-1 justify-center gap-2 sm:flex-initial sm:px-8"
          >
            Visit official page
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        ) : (
          <div className="flex flex-1 items-center gap-2 rounded-full bg-[hsl(220_30%_96%)] px-4 py-3 text-[0.85rem] text-foreground/50 sm:flex-initial">
            <Link2Off className="h-4 w-4 shrink-0" aria-hidden="true" />
            Official page not yet verified
          </div>
        )}
        {website && (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Program website"
            className="press inline-flex h-11 w-11 items-center justify-center rounded-full border border-[hsl(220_30%_88%)] text-foreground/60 hover:border-[hsl(220_25%_78%)] hover:text-foreground"
          >
            <Globe className="h-[18px] w-[18px]" aria-hidden="true" />
          </a>
        )}
        {instagram && (
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Program Instagram"
            className="press inline-flex h-11 w-11 items-center justify-center rounded-full border border-[hsl(220_30%_88%)] text-foreground/60 hover:border-[hsl(220_25%_78%)] hover:text-foreground"
          >
            <Instagram className="h-[18px] w-[18px]" aria-hidden="true" />
          </a>
        )}
      </div>

      <div className="mt-6 space-y-5 border-t border-[hsl(220_30%_94%)] px-6 py-6 sm:px-7">
        <Fact icon={Layers} label="Format" value={FORMAT_LABELS[program.format]} />
        <Fact icon={MapPin} label="Location" value={location || null} />
        <Fact icon={Users} label="Eligibility" value={program.eligibility ? curl(program.eligibility) : null} />
        <DeadlineFact program={program} />
        {program.costDetail && (
          <Fact icon={Info} label="Cost, in detail" value={curl(program.costDetail)} />
        )}
      </div>

      {(program.openEnrollment || unverified) && (
        <div className="flex flex-wrap gap-2 px-6 pb-2 sm:px-7">
          {program.openEnrollment && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[hsl(220_30%_96%)] px-2.5 py-1 text-[0.75rem] font-medium text-foreground/62">
              <Info className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              Open enrollment &mdash; admits all who pay
            </span>
          )}
          {unverified && (
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.75rem] font-medium"
              style={{ color: "hsl(var(--c-money-ink))", background: "hsl(var(--c-money) / 0.16)" }}
            >
              <CircleAlert className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              Unverified &mdash; we have not confirmed this entry
            </span>
          )}
        </div>
      )}

      {checked && (
        <p className="mt-auto px-6 pb-6 pt-4 text-[0.78rem] text-foreground/42 sm:px-7">
          Checked {fmtDate(checked)}.
          {linked ? " Confirm on the host’s page before you rely on it." : ""}
        </p>
      )}
    </div>
  );
}
