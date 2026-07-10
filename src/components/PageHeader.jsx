import React from "react";

export default function PageHeader({ title, subtitle, icon: Icon }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 mb-8 border-b border-border/40">
      <div className="flex items-center gap-4">
        {Icon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-border/60 text-primary shadow-sm shadow-indigo-950/5">
            <Icon className="h-5.5 w-5.5" />
          </div>
        )}
        <div>
          <h1 className="text-3xl font-serif font-extrabold tracking-tight text-primary leading-none">{title}</h1>
          {subtitle && <p className="text-sm text-foreground/70 mt-2 max-w-2xl leading-relaxed">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}
