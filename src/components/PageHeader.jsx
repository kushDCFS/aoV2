import React from "react";

/**
 * Page header.
 *
 * The `icon` prop is accepted and deliberately ignored: an icon tile beside a
 * page title is a dashboard-template tic, and it competes with the one thing
 * the header exists to do. Callers keep passing it; the design drops it.
 * An eyebrow label carries the same wayfinding signal for a fraction of the ink.
 */
export default function PageHeader({ title, subtitle, eyebrow }) {
  return (
    <header className="mb-14">
      {eyebrow && <div className="type-label text-accent mb-3">{eyebrow}</div>}
      <h1 className="type-h1 optical-left text-balance">{title}</h1>
      {subtitle && (
        <p className="type-lead text-foreground/58 mt-4 max-w-[62ch]">{subtitle}</p>
      )}
    </header>
  );
}
