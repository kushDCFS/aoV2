import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Search, SlidersHorizontal, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import ProgramListRow from "@/components/summer/ProgramListRow";
import ProgramDetailPanel from "@/components/summer/ProgramDetailPanel";
import { FORMAT_LABELS, parseISO } from "@/components/summer/programFormat";
import { FilterChip, FilterGroup } from "@/components/summer/FilterControls";
import {
  allPrograms,
  byAccessibility,
  COST_TIERS,
  CATEGORIES,
} from "@/lib/programs";

/**
 * The summer programs catalog.
 *
 * Cost is the primary axis, not a facet. A student who cannot pay should be
 * able to answer their real question — "what can I actually go to?" — in one
 * tap, and then send that exact view to a friend or a counsellor as a URL.
 * There are no accounts here, so the query string is the only shareable state.
 *
 * Nothing on this page invents data. Where the source says a cost is unknown,
 * the card says the cost is unverified; where an entry has not been confirmed,
 * the card says so. An empty catalog renders an empty catalog.
 */

const PER_PAGE = 24;

/* The one-tap query almost every visitor actually has. */
const ACCESS_TIERS = ["pays-student", "free", "free-plus-aid"];

const TIER_ORDER = ["pays-student", "free", "free-plus-aid", "varies", "costs-money", "unknown"];
const FORMATS = ["in-person", "virtual", "hybrid"];

const readSet = (params, key) => {
  const raw = params.get(key);
  return new Set(raw ? raw.split(",").filter(Boolean) : []);
};

const norm = (value) => (value == null ? "" : String(value).toLowerCase());

/* `programs` is injectable so the three data volumes this page must survive
   (0, a dozen, ~450) can be exercised directly. Production always uses the
   real catalog. */
export default function SummerPrograms({ programs = allPrograms }) {
  const [params, setParams] = useSearchParams();
  const reduceMotion = useReducedMotion();
  const [sheetOpen, setSheetOpen] = useState(false);
  const resultsTop = useRef(null);

  const costs = readSet(params, "cost");
  const cats = readSet(params, "cat");
  const formats = readSet(params, "fmt");
  const residential = params.get("res") || "";
  const query = params.get("q") || "";
  const SORTS = ["access", "deadline", "name"];
  const sort = SORTS.includes(params.get("sort")) ? params.get("sort") : "access";
  const page = Math.max(1, parseInt(params.get("page") || "1", 10) || 1);
  const selectedId = params.get("sel") || "";

  /* Every write goes through here, so the URL is always the whole truth and a
     changed filter always returns the reader to the first page. */
  const update = useCallback(
    (changes, { keepPage = false } = {}) => {
      const next = new URLSearchParams(params);
      Object.entries(changes).forEach(([key, value]) => {
        if (!value || (value instanceof Set && value.size === 0)) next.delete(key);
        else next.set(key, value instanceof Set ? [...value].join(",") : String(value));
      });
      if (!keepPage) next.delete("page");
      setParams(next, { replace: true });
    },
    [params, setParams]
  );

  const toggleIn = (set, key, value) => {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    update({ [key]: next });
  };

  const accessOn = ACCESS_TIERS.every((t) => costs.has(t)) && costs.size === ACCESS_TIERS.length;

  const toggleAccess = () => {
    update({ cost: accessOn ? new Set() : new Set(ACCESS_TIERS) });
  };

  const activeCount =
    cats.size + formats.size + (residential ? 1 : 0);
  const anyFilter = activeCount > 0 || costs.size > 0 || query.length > 0;

  const clearAll = () => {
    draftRef.current = "";
    setDraft("");
    setParams(new URLSearchParams(), { replace: true });
  };

  /* `skip` lets a dimension exclude itself, so each chip's count answers
     "how many would I get if I added this one?" rather than always 0. */
  const passes = useCallback(
    (p, skip) => {
      if (skip !== "cost" && costs.size > 0 && !costs.has(p.cost)) return false;
      if (skip !== "cat" && cats.size > 0 && !cats.has(p.category)) return false;
      if (skip !== "fmt" && formats.size > 0 && !formats.has(p.format)) return false;
      if (skip !== "res" && residential) {
        if (residential === "yes" && p.residential !== true) return false;
        if (residential === "no" && p.residential !== false) return false;
      }
      if (query) {
        const needle = query.toLowerCase();
        const hay = `${norm(p.name)} ${norm(p.host)} ${norm(p.eligibility)}`;
        if (!hay.includes(needle)) return false;
      }
      return true;
    },
    [costs, cats, formats, residential, query]
  );

  const results = useMemo(() => {
    const matched = programs.filter((p) => passes(p));
    if (sort === "name") return matched.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "deadline") {
      /* Only deadlineISO can order anything. An entry with no exact date is
         not "due today" and must not jump the queue — it sorts to the end and
         falls back to the mission order among its peers. */
      return matched.sort((a, b) => {
        const da = parseISO(a.deadlineISO);
        const db = parseISO(b.deadlineISO);
        if (da && db) return da - db || byAccessibility(a, b);
        if (da) return -1;
        if (db) return 1;
        return byAccessibility(a, b);
      });
    }
    return matched.sort(byAccessibility);
  }, [passes, sort, programs]);

  /* Chip counts used to be nineteen separate full-array scans on every
     keystroke. At ~530 entries that is ~10k predicate evaluations per render.
     One tallying pass per dimension, memoised, keeps typing smooth on a
     mid-range phone — and it is the same number either way, just cheaper. */
  const tallies = useMemo(() => {
    const t = { cost: {}, cat: {}, fmt: {}, res: {}, access: 0 };
    for (const p of programs) {
      if (passes(p, "cost")) {
        t.cost[p.cost] = (t.cost[p.cost] || 0) + 1;
        if (ACCESS_TIERS.includes(p.cost)) t.access += 1;
      }
      if (passes(p, "cat")) t.cat[p.category] = (t.cat[p.category] || 0) + 1;
      if (passes(p, "fmt")) t.fmt[p.format] = (t.fmt[p.format] || 0) + 1;
      if (passes(p, "res") && typeof p.residential === "boolean") {
        const key = p.residential ? "yes" : "no";
        t.res[key] = (t.res[key] || 0) + 1;
      }
    }
    return t;
  }, [programs, passes]);

  const totalPages = Math.max(1, Math.ceil(results.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const pageItems = results.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  /* The selected program is shareable state (?sel=id), same as every other
     filter. If the id is not on the current page — a filter changed under it,
     or the URL was pasted in cold — the panel falls back to the first result
     on the page rather than rendering empty, but that fallback never rewrites
     the URL itself; only an explicit tap does. */
  const selectedProgram =
    pageItems.find((p) => p.id === selectedId) ?? pageItems[0] ?? null;
  const selectProgram = (id) => update({ sel: id }, { keepPage: true });
  const closeDetail = () => update({ sel: "" }, { keepPage: true });

  const goToPage = (next) => {
    update({ page: next > 1 ? next : "" }, { keepPage: true });
    resultsTop.current?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  /* The search box is the one control that must not go through the router on
     every keystroke: a controlled input whose value round-trips through
     useSearchParams re-filters and re-renders synchronously between keydown
     and paint, which is fine on a laptop and is not on a mid-range Android at
     five hundred entries. The field owns its own state and publishes to the
     URL on a short debounce, so typing stays at frame rate and the URL is
     still the whole shareable truth a moment later. */
  const [draft, setDraft] = useState(query);
  const draftRef = useRef(query);

  useEffect(() => {
    /* A URL changed from outside (back button, a pasted link) wins. */
    if (query !== draftRef.current) {
      draftRef.current = query;
      setDraft(query);
    }
  }, [query]);

  useEffect(() => {
    if (draft === query) return;
    const id = setTimeout(() => {
      draftRef.current = draft;
      update({ q: draft });
    }, 200);
    return () => clearTimeout(id);
  }, [draft, query, update]);

  /* Sheet keyboard contract: Escape closes, background scroll locks. */
  useEffect(() => {
    if (!sheetOpen) return;
    const onKey = (e) => e.key === "Escape" && setSheetOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [sheetOpen]);

  const catalogEmpty = programs.length === 0;

  /* ── Secondary filters. Same markup in the desktop panel and the phone sheet. */
  const secondaryFilters = (
    <div className="space-y-7">
      <FilterGroup legend="Field">
        {Object.entries(CATEGORIES).map(([key, label]) => (
          <FilterChip
            key={key}
            checked={cats.has(key)}
            onChange={() => toggleIn(cats, "cat", key)}
            count={tallies.cat[key] || 0}
          >
            {label}
          </FilterChip>
        ))}
      </FilterGroup>

      <FilterGroup legend="Format">
        {FORMATS.map((key) => (
          <FilterChip
            key={key}
            checked={formats.has(key)}
            onChange={() => toggleIn(formats, "fmt", key)}
            count={tallies.fmt[key] || 0}
          >
            {FORMAT_LABELS[key]}
          </FilterChip>
        ))}
      </FilterGroup>

      <FilterGroup legend="Housing">
        <FilterChip
          type="radio"
          name="residential"
          checked={residential === "yes"}
          onChange={() => update({ res: residential === "yes" ? "" : "yes" })}
          count={tallies.res.yes || 0}
        >
          Residential
        </FilterChip>
        <FilterChip
          type="radio"
          name="residential"
          checked={residential === "no"}
          onChange={() => update({ res: residential === "no" ? "" : "no" })}
          count={tallies.res.no || 0}
        >
          Commuter
        </FilterChip>
      </FilterGroup>
    </div>
  );

  return (
    <div className="w-full">
      {/* ── Search-first hero. A sky gradient and a big centred search box
          reframe "filter a database" as "look something up" — the register
          a free public tool should have, ahead of the dashboard register the
          rest of the site uses. ── */}
      <Reveal>
        <section className="hero-sky -mx-5 -mt-8 rounded-b-[var(--r-card)] px-5 pb-9 pt-11 text-center sm:-mx-7 sm:px-7 lg:-mx-9 lg:-mt-11 lg:px-9 lg:pb-12 lg:pt-16">
          <div className="type-label" style={{ color: "hsl(var(--c-sky-ink))" }}>
            Summer programs
          </div>
          <h1 className="type-h1 optical-left mx-auto mt-3 max-w-[26ch] text-balance">
            Stop guessing which summer programs you can afford.
          </h1>
          <p className="type-lead mx-auto mt-4 max-w-[52ch] text-foreground/58">
            Search {allPrograms.length.toLocaleString()} real programs and see the cost before
            anything else — every one links straight to the host&rsquo;s own page.
          </p>

          {!catalogEmpty && (
            <div className="relative mx-auto mt-8 max-w-[560px]">
              <Search
                className="pointer-events-none absolute left-5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-foreground/35"
                aria-hidden="true"
              />
              <input
                type="search"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Try: paid research internship, no essay, remote"
                aria-label="Search programs by name, host or eligibility"
                className="hero-search w-full pl-12 pr-5 text-[0.95rem]"
              />
            </div>
          )}

          <p className="type-small mt-4 text-foreground/45">
            {tallies.access} of them are free or pay the student — filter to just those below.
          </p>
        </section>
      </Reveal>

      {/* ── The cost panel. Primary axis, visible at every breakpoint. ── */}
      {!catalogEmpty && (
      <section
        aria-labelledby="cost-heading"
        className="dash-card mt-6 p-5 sm:p-7"
        style={{ background: "hsl(var(--panel))" }}
      >
        <h2 id="cost-heading" className="sr-only">
          Filter programs
        </h2>

        <fieldset className="mt-6">
          <legend className="type-label text-foreground/45">Cost to the student</legend>
          {/* The shortcut gets its own line and its own weight. It is the query
              almost every visitor arrives with; burying it in a chip row would
              make the mission a facet. */}
          <div className="mt-3">
            <FilterChip
              size="hero"
              primary
              checked={accessOn}
              onChange={toggleAccess}
              tone="var(--c-extra)"
              ink="var(--c-extra-ink)"
              count={tallies.access}
            >
              Free or paid to attend
            </FilterChip>
          </div>
          <p className="type-label mt-5 text-foreground/38">Or choose exact tiers</p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {TIER_ORDER.map((key) => (
              <FilterChip
                key={key}
                checked={costs.has(key)}
                onChange={() => toggleIn(costs, "cost", key)}
                tone={COST_TIERS[key].tone}
                ink={COST_TIERS[key].ink}
                count={tallies.cost[key] || 0}
              >
                {COST_TIERS[key].label}
              </FilterChip>
            ))}
          </div>
        </fieldset>

        {/* Secondary filters: inline on desktop, in a sheet on a phone. */}
        <div className="mt-7 hidden border-t border-[hsl(220_30%_92%)] pt-7 lg:block">
          {secondaryFilters}
        </div>

        <button
          type="button"
          onClick={() => setSheetOpen(true)}
          aria-expanded={sheetOpen}
          className="press mt-5 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-[hsl(220_30%_88%)] bg-white px-5 text-[0.875rem] font-medium text-foreground/80 lg:hidden"
        >
          <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
          Field, format &amp; housing
          {activeCount > 0 && (
            <span className="tnum rounded-full bg-foreground px-2 py-0.5 text-[0.75rem] font-semibold text-white">
              {activeCount}
            </span>
          )}
        </button>
      </section>
      )}

      {/* ── Result bar ── */}
      {!catalogEmpty && (
      <div
        ref={resultsTop}
        className="mt-7 flex flex-wrap items-center justify-between gap-3 scroll-mt-24"
      >
        <p role="status" aria-live="polite" className="type-body text-foreground/62">
          <span className="tnum font-semibold text-foreground">{results.length}</span>{" "}
          {results.length === 1 ? "program" : "programs"}
          {anyFilter
            ? results.length === 1
              ? " matches these filters"
              : " match these filters"
            : " in the catalog"}
        </p>

        <div className="flex items-center gap-3">
          {anyFilter && (
            <button
              type="button"
              onClick={clearAll}
              className="press type-small rounded-full px-3 py-2 font-medium text-foreground/55 underline decoration-foreground/25 underline-offset-[3px] hover:text-foreground"
            >
              Clear filters
            </button>
          )}
          <label className="type-small flex items-center gap-2 text-foreground/55">
            <span>Sort</span>
            <select
              value={sort}
              onChange={(e) => update({ sort: e.target.value === "access" ? "" : e.target.value })}
              className="h-10 rounded-full border-[hsl(220_30%_88%)] bg-white px-3 text-[0.84375rem]"
            >
              <option value="access">Most accessible first</option>
              <option value="deadline">Deadline soonest</option>
              <option value="name">Name, A&ndash;Z</option>
            </select>
          </label>
        </div>
      </div>
      )}

      {/* ── Results ── */}
      {catalogEmpty ? (
        <section className="dash-card mt-5 px-6 py-16 text-center sm:px-10">
          <h2 className="type-h2 text-balance">No programs are listed yet.</h2>
          <p className="type-body mx-auto mt-3 max-w-[46ch] text-foreground/62">
            This catalog is still being researched. Rather than fill the page with
            placeholder entries, it shows nothing until there are real, verified
            programs to show. Check back &mdash; or use the playbooks, which are complete
            today.
          </p>
          <Link to="/" className="btn-secondary mt-7">
            Back to the overview
          </Link>
        </section>
      ) : results.length === 0 ? (
        <section className="dash-card mt-5 px-6 py-16 text-center sm:px-10">
          <h2 className="type-h2 text-balance">Nothing matches these filters.</h2>
          <p className="type-body mx-auto mt-3 max-w-[46ch] text-foreground/62">
            There are {programs.length} programs in the catalog. Widening the cost
            filter is usually what brings results back.
          </p>
          <button type="button" onClick={clearAll} className="btn-primary mt-7">
            Clear all filters
          </button>
        </section>
      ) : (
        <>
          {/* Master–detail at lg+: a scrolling list on the left, a sticky
              detail pane on the right that never reloads the page to show a
              different program. Below lg, the list is the whole page and
              tapping a row opens the same panel as a bottom sheet — there is
              no room to show both at once on a phone. */}
          <div className="mt-5 grid gap-5 lg:grid-cols-[380px_1fr]">
            <ul className="space-y-1.5">
              {pageItems.map((program) => (
                <ProgramListRow
                  key={program.id}
                  program={program}
                  active={program.id === selectedProgram?.id}
                  onSelect={() => selectProgram(program.id)}
                />
              ))}
            </ul>

            <div className="dash-card hidden self-start overflow-hidden lg:sticky lg:top-[calc(74px+1.25rem)] lg:block">
              {selectedProgram && <ProgramDetailPanel program={selectedProgram} />}
            </div>
          </div>

          {totalPages > 1 && (
            <nav
              aria-label="Program pages"
              className="mt-8 flex items-center justify-center gap-3"
            >
              <button
                type="button"
                onClick={() => goToPage(safePage - 1)}
                disabled={safePage === 1}
                className="press inline-flex h-11 min-w-[44px] items-center gap-1.5 rounded-full border border-[hsl(220_30%_88%)] bg-white px-4 text-[0.875rem] font-medium text-foreground/75 disabled:opacity-35"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                Previous
              </button>
              <p className="type-small tnum px-2 text-foreground/55">
                Page {safePage} of {totalPages}
              </p>
              <button
                type="button"
                onClick={() => goToPage(safePage + 1)}
                disabled={safePage === totalPages}
                className="press inline-flex h-11 min-w-[44px] items-center gap-1.5 rounded-full border border-[hsl(220_30%_88%)] bg-white px-4 text-[0.875rem] font-medium text-foreground/75 disabled:opacity-35"
              >
                Next
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </nav>
          )}
        </>
      )}

      {/* ── Phone detail sheet — the same panel, opened by tapping a row. ── */}
      <AnimatePresence>
        {selectedProgram && params.get("sel") && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.button
              type="button"
              aria-label="Close program details"
              onClick={closeDetail}
              className="absolute inset-0 bg-[hsl(206_56%_14%_/_0.45)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={selectedProgram.name}
              className="absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto rounded-t-[28px] bg-white"
              initial={reduceMotion ? false : { transform: "translateY(100%)" }}
              animate={{ transform: "translateY(0%)" }}
              exit={reduceMotion ? {} : { transform: "translateY(100%)" }}
              transition={{ duration: 0.26, ease: [0.32, 0.72, 0, 1] }}
            >
              <div className="flex justify-center pt-3">
                <span className="h-1 w-10 rounded-full bg-[hsl(220_20%_88%)]" aria-hidden="true" />
              </div>
              <ProgramDetailPanel program={selectedProgram} onClose={closeDetail} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Phone sheet ── */}
      <AnimatePresence>
        {sheetOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.button
              type="button"
              aria-label="Close filters"
              onClick={() => setSheetOpen(false)}
              className="absolute inset-0 bg-[hsl(206_56%_14%_/_0.45)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Field, format and housing filters"
              className="absolute inset-x-0 bottom-0 max-h-[86vh] overflow-y-auto rounded-t-[28px] bg-white px-5 pb-8 pt-5"
              initial={reduceMotion ? false : { transform: "translateY(100%)" }}
              animate={{ transform: "translateY(0%)" }}
              exit={reduceMotion ? {} : { transform: "translateY(100%)" }}
              transition={{ duration: 0.26, ease: [0.32, 0.72, 0, 1] }}
            >
              <div className="mb-5 flex items-center justify-between">
                <h2 className="type-h3">Field, format &amp; housing</h2>
                <button
                  type="button"
                  onClick={() => setSheetOpen(false)}
                  aria-label="Close filters"
                  autoFocus
                  className="press -mr-2 rounded-full p-2.5 text-foreground/45 hover:bg-foreground/5 hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              {secondaryFilters}
              <button
                type="button"
                onClick={() => setSheetOpen(false)}
                className="btn-primary mt-8 w-full"
              >
                Show {results.length} {results.length === 1 ? "program" : "programs"}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
