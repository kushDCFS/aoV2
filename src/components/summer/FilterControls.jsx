import React from "react";
import { Check } from "lucide-react";

/**
 * Every filter is a real checkbox or radio inside a <fieldset> with a <legend>.
 * The chip is the label; the input stays in the accessibility tree and keeps
 * the keyboard contract. Focus is drawn on the chip from the input's
 * focus-visible state, using the --ring token.
 */

const RING =
  "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[hsl(var(--ring))]";

export function FilterChip({
  type = "checkbox",
  name,
  checked,
  onChange,
  count,
  tone,
  ink,
  size = "default",
  primary = false,
  children,
}) {
  const empty = count === 0 && !checked;
  /* The primary chip carries a resting tint so it reads as the headline
     question even before anyone touches it. Every other chip stays neutral
     until chosen, which is what keeps this one legible as *the* shortcut. */
  const resting = primary
    ? { background: `hsl(${tone} / 0.1)`, borderColor: `hsl(${tone} / 0.55)`, color: `hsl(${ink})` }
    : undefined;
  return (
    <label className="relative inline-flex cursor-pointer">
      <input
        type={type}
        name={name}
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />
      <span
        className={`${RING} inline-flex min-h-[44px] items-center gap-2 rounded-full border px-4 transition-[background-color,border-color,color] duration-150 ${
          size === "hero"
            ? "text-[0.9375rem] font-semibold sm:px-5"
            : "text-[0.875rem] font-medium"
        } ${
          checked
            ? "border-transparent"
            : primary
              ? ""
              : empty
                ? "border-[hsl(220_30%_92%)] bg-white text-foreground/35"
                : "border-[hsl(220_30%_88%)] bg-white text-foreground/75 hover:border-[hsl(220_25%_78%)] hover:text-foreground"
        }`}
        style={
          checked
            ? {
                background: `hsl(${tone ?? "var(--foreground)"} / ${tone ? 0.24 : 1})`,
                color: tone ? `hsl(${ink ?? tone})` : "white",
              }
            : resting
        }
      >
        {checked && <Check className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden="true" />}
        <span>{children}</span>
        {typeof count === "number" && (
          <span className="tnum text-[0.8125rem] font-semibold opacity-55">{count}</span>
        )}
      </span>
    </label>
  );
}

export function FilterGroup({ legend, children, className = "" }) {
  return (
    <fieldset className={className}>
      <legend className="type-label text-foreground/45">{legend}</legend>
      <div className="mt-3 flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );
}
