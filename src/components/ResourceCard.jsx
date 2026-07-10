import React from "react";
import { ExternalLink, Star } from "lucide-react";
import { motion } from "framer-motion";

const categoryColors = {
  "AP & IB Courses": { bg: "bg-blue-50", text: "text-blue-700", ring: "ring-blue-200" },
  "SAT Prep": { bg: "bg-violet-50", text: "text-violet-700", ring: "ring-violet-200" },
  "Engineering ECs": { bg: "bg-cyan-50", text: "text-cyan-700", ring: "ring-cyan-200" },
  "Law ECs": { bg: "bg-amber-50", text: "text-amber-700", ring: "ring-amber-200" },
  "Healthcare ECs": { bg: "bg-rose-50", text: "text-rose-700", ring: "ring-rose-200" },
  "Finance ECs": { bg: "bg-emerald-50", text: "text-emerald-700", ring: "ring-emerald-200" },
  Scholarships: { bg: "bg-indigo-50", text: "text-indigo-700", ring: "ring-indigo-200" },
  "Research & Cold Email": { bg: "bg-fuchsia-50", text: "text-fuchsia-700", ring: "ring-fuchsia-200" },
};

const costStyles = {
  Free: "bg-emerald-100 text-emerald-700",
  "Free to Apply": "bg-emerald-100 text-emerald-700",
  "Low Cost": "bg-amber-100 text-amber-700",
  Varies: "bg-slate-100 text-slate-600",
};

export default function ResourceCard({ resource, index = 0 }) {
  const colors = categoryColors[resource.category] || categoryColors["AP & IB Courses"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.4) }}
      className="group relative flex flex-col rounded-2xl border border-slate-200/80 bg-white p-5 transition-all hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100/50"
    >
      {resource.featured && (
        <div className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-amber-400 text-white shadow-md">
          <Star className="h-3.5 w-3.5 fill-white" />
        </div>
      )}

      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colors.bg} ${colors.text} ring-1 ${colors.ring}`}>
          {resource.category}
        </span>
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${costStyles[resource.cost] || costStyles.Varies}`}>
          {resource.cost}
        </span>
      </div>

      <h3 className="font-heading text-base font-semibold leading-snug text-slate-900 group-hover:text-indigo-700 transition-colors">
        {resource.title}
      </h3>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">
        {resource.description}
      </p>

      {resource.tags && resource.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {resource.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="rounded-md bg-slate-50 px-2 py-0.5 text-xs text-slate-500">
              {tag}
            </span>
          ))}
        </div>
      )}

      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-800"
      >
        Visit resource
        <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </a>
    </motion.div>
  );
}