const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Compass, BookOpen, GraduationCap, Wrench, Scale, HeartPulse, TrendingUp, Award, Mail, X } from "lucide-react";

import ResourceCard from "@/components/ResourceCard";

const categoryConfig = [
  { name: "All", icon: Compass, color: "bg-primary text-white" },
  { name: "AP & IB Courses", icon: BookOpen, color: "bg-blue-100/60 text-blue-700 border border-blue-200/50" },
  { name: "SAT Prep", icon: GraduationCap, color: "bg-violet-100/60 text-violet-700 border border-violet-200/50" },
  { name: "Engineering ECs", icon: Wrench, color: "bg-cyan-100/60 text-cyan-700 border border-cyan-200/50" },
  { name: "Law ECs", icon: Scale, color: "bg-amber-100/60 text-amber-700 border border-amber-200/50" },
  { name: "Healthcare ECs", icon: HeartPulse, color: "bg-rose-100/60 text-rose-700 border border-rose-200/50" },
  { name: "Finance ECs", icon: TrendingUp, color: "bg-emerald-100/60 text-emerald-700 border border-emerald-200/50" },
  { name: "Scholarships", icon: Award, color: "bg-indigo-100/60 text-indigo-700 border border-indigo-200/50" },
  { name: "Research & Cold Email", icon: Mail, color: "bg-fuchsia-100/60 text-fuchsia-700 border border-fuchsia-200/50" },
];

export default function Resources() {
  const urlParams = new URLSearchParams(window.location.search);
  const initialCategory = urlParams.get("category") || "All";

  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [search, setSearch] = useState("");

  useEffect(() => {
    db.entities.Resource.list("-created_date", 100)
      .then(setResources)
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return resources.filter((r) => {
      const matchesCategory = activeCategory === "All" || r.category === activeCategory;
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        r.title?.toLowerCase().includes(q) ||
        r.description?.toLowerCase().includes(q) ||
        r.tags?.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [resources, activeCategory, search]);

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
              <Compass className="h-5 w-5 text-white" />
            </div>
            <span className="font-heading text-lg font-bold tracking-tight text-primary">Pathfinder</span>
          </Link>
          <Link to="/" className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary">
            Home
          </Link>
        </div>
      </nav>

      {/* Header */}
      <div className="border-b border-border/80 bg-background/50">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <h1 className="font-heading text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Resource Library
          </h1>
          <p className="mt-2 text-foreground/70">
            Browse {resources.length} curated resources. Filter by category or search by keyword.
          </p>

          {/* Search */}
          <div className="relative mt-6 max-w-xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/50" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search resources, programs, scholarships..."
              className="w-full rounded-full border border-border bg-card py-3 pl-11 pr-10 text-sm text-foreground placeholder-foreground/45 transition-all focus:border-primary/40 focus:bg-card focus:outline-none focus:ring-4 focus:ring-primary/10"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-foreground/50 hover:bg-muted/40 hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category pills */}
      <div className="sticky top-[65px] z-40 border-b border-border/80 bg-background/90 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6 py-3">
          <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categoryConfig.map((cat) => {
              const isActive = activeCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`inline-flex flex-shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-primary text-white shadow-sm"
                      : "bg-muted/40 text-foreground/80 hover:bg-muted/65"
                  }`}
                >
                  <cat.icon className="h-3.5 w-3.5" />
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mx-auto max-w-6xl px-6 py-8">
        {loading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="h-48 animate-pulse rounded-2xl bg-muted/30" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted/30">
              <Search className="h-7 w-7 text-foreground/50" />
            </div>
            <h3 className="mt-4 font-heading text-lg font-semibold text-primary">No resources found</h3>
            <p className="mt-1 text-sm text-foreground/70">Try a different search or category.</p>
          </div>
        ) : (
          <>
            <p className="mb-5 text-sm text-foreground/70">
              Showing <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
              {filtered.length === 1 ? "resource" : "resources"}
              {activeCategory !== "All" && (
                <> in <span className="font-semibold text-foreground">{activeCategory}</span></>
              )}
            </p>
            <AnimatePresence mode="popLayout">
              <motion.div
                layout
                className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
              >
                {filtered.map((res, i) => (
                  <ResourceCard key={res.id} resource={res} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
}