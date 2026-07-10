import React from "react";
import { ExternalLink, Star } from "lucide-react";
import { motion } from "framer-motion";
import { fieldMap } from "@/lib/pathwayData";

const costStyles = {
  Free: "bg-emerald-100 text-emerald-700",
  "Free to Apply": "bg-emerald-100 text-emerald-700",
  "Low Cost": "bg-amber-100 text-amber-700",
  Varies: "bg-slate-100 text-slate-600",
};

export default function ECResourceCard({ resource, index = 0 }) {
  const field = fieldMap[resource.major];
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
        {field && (
          <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${field.bg} ${field.accent}`}>
            <field.icon className="h-3 w-3" />
            {field.name}
          </span>
        )}
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${costStyles[resource.cost] || costStyles.Varies}`}>
          {resource.cost}
        </span>
      </div>
      <h3 className="font-heading text-base font-semibold leading-snug text-slate-900 transition-colors group-hover:text-indigo-700">
        {resource.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">{resource.description}</p>
      <div className="mt-3 flex items-center justify-between">
        <span className="rounded-md bg-slate-50 px-2 py-0.5 text-xs text-slate-500">{resource.resource_type}</span>
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-800"
        >
          Visit
          <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </motion.div>
  );
}