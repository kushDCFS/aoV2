import React from "react";

export default function PageHeader({ title, subtitle, icon: Icon }) {
  return (
    <div className="border-b border-slate-800 bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {Icon && (
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
            <Icon className="h-6 w-6 text-white" />
          </div>
        )}
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">{title}</h1>
        {subtitle && <p className="mt-3 text-lg text-slate-300 max-w-2xl leading-relaxed">{subtitle}</p>}
      </div>
    </div>
  );
}