import React, { useState, useEffect, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import { Copy, Check, Search, Sparkles, ExternalLink, Loader2, GraduationCap, BookOpen, AlertCircle, RefreshCw } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { emailTemplates, trackerExample, professorTemplates } from "@/lib/outreachData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";

/* The upstream professor feed leaks placeholder strings — "NaN", "N/A",
   "null", "undefined" — straight into fields. These are falsy-looking but are
   real non-empty strings, so `value || fallback` renders them verbatim.
   Normalize to empty so callers can fall back properly. */
const JUNK = new Set(["nan", "n/a", "na", "null", "undefined", "none", "-", ""]);

const clean = (value) => {
  if (value == null) return "";
  const text = String(value).trim();
  return JUNK.has(text.toLowerCase()) ? "" : text;
};

const majorTracks = [
  { name: "All Tracks", key: "All" },
  { name: "Computer Science (CS)", key: "CS" },
  { name: "Engineering", key: "Engineering" },
  { name: "Premed / Healthcare", key: "Premed" },
  { name: "Prelaw / Law", key: "Prelaw" },
  { name: "Finance / Business", key: "Finance" },
  { name: "Biology / Life Sciences", key: "Biology" },
  { name: "Environmental Science", key: "Environmental" },
  { name: "Psychology & Behavioral", key: "Psychology" },
  { name: "Arts & Humanities", key: "Arts" },
];

const getDomainsForTrack = (track, allDomains) => {
  if (track === "All") return [];
  const keywordMap = {
    cs: ["computer", "machine learning", "intelligence", "robotic", "network", "hci", "systems", "nlp", "vision", "formal methods", "algorithm", "data science"],
    engineering: ["engineering", "robotic", "mechanical", "electrical", "materials", "aerospace", "systems", "nano", "circuits", "energy"],
    premed: ["medical", "health", "biomedical", "biology", "clinical", "neuroscience", "bioinformatics", "pharmacology", "imaging", "nanobio"],
    prelaw: ["law", "legal", "policy", "ethics", "justice", "governance"],
    finance: ["finance", "accounting", "economics", "business", "management", "marketing"],
    biology: ["biology", "biotechnology", "bioinformatics", "genetics", "neuroscience", "ecology", "microbiology", "nanobio"],
    environmental: ["environmental", "earth", "climate", "sustainability", "energy", "ecology", "ocean", "hydrology"],
    psychology: ["psychology", "cognitive", "behavioral", "brain", "choice"],
    arts: ["art", "design", "media", "humanities", "history", "languages", "literature", "culture"],
  };
  const keywords = keywordMap[track.toLowerCase()] || [];
  return allDomains.filter(d =>
    keywords.some(kw => d.toLowerCase().includes(kw))
  );
};

const getLastName = (fullName) => {
  if (!fullName) return "";
  let cleanName = fullName.replace(/^(Dr\.|Prof\.|Doctor|Professor)\s+/i, "").trim();
  const parts = cleanName.split(" ");
  return parts[parts.length - 1] || "";
};

const compileEmail = (templateBody, templateSubject, prof, studentInfo) => {
  if (!prof) return { subject: "", body: "" };

  const lastName = getLastName(prof.name);
  const topics = prof.domain || prof.department || "your research area";

  let interests = prof.ai_keywords || "";
  if (!interests && prof.research_interests) {
    const firstLine = prof.research_interests.split('\n')[0];
    interests = firstLine.replace(/^(Methodology:)/i, "").trim();
  }
  if (!interests) interests = "your research field";

  const replacements = {
    "\\[Professor \\]?\\[Last Name\\]": `Professor ${lastName}`,
    "\\[Last Name\\]": lastName,
    "\\[Professor \\]?\\[Name\\]": `Professor ${prof.name}`,
    "\\[Name\\]": prof.name,
    "\\[University\\]": prof.university || "your university",
    "\\[Research Domain\\]": topics,
    "\\[Research Interests/Keywords\\]": interests,
    "\\[Your Name\\]": studentInfo.name || "[Your Name]",
    "\\[Your Email\\]": studentInfo.email || "[Your Email]",
    "\\[Grade Level\\]": studentInfo.grade || "[Grade Level]",
    "\\[High School\\]": studentInfo.highSchool || "[High School]",
    "\\[Your Skills\\]": studentInfo.skills || "[Your Skills]",
  };

  let subject = templateSubject;
  let body = templateBody;

  Object.entries(replacements).forEach(([placeholder, val]) => {
    const regex = new RegExp(placeholder, "g");
    subject = subject.replace(regex, val);
    body = body.replace(regex, val);
  });

  return { subject, body };
};

/* Tracker status: semantic color, kept separate from the site's one accent.
   Muted tints, not saturated Tailwind defaults — quiet enough to sit next to
   the rest of the token palette. */
const STATUS_STYLE = {
  "No Response": "bg-foreground/[0.06] text-foreground/55",
  "Awaiting Reply": "bg-amber-500/10 text-amber-700",
  "Interview Scheduled": "bg-accent/10 text-accent",
  "Replied": "bg-emerald-500/10 text-emerald-700",
  "Accepted": "bg-emerald-500/10 text-emerald-700",
};

const inputCls =
  "w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm text-foreground";

export default function OutreachLab() {
  const [copiedId, setCopiedId] = useState(null);

  const [professors, setProfessors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingFilters, setLoadingFilters] = useState(false);
  const [wakingUp, setWakingUp] = useState(false);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTrack, setSelectedTrack] = useState("All");
  const [selectedUniversity, setSelectedUniversity] = useState("All");
  const [filterOptions, setFilterOptions] = useState({ domain: [], university: [] });

  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 20;

  const [selectedProf, setSelectedProf] = useState(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState("standard");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [copiedSubject, setCopiedSubject] = useState(false);
  const [copiedBody, setCopiedBody] = useState(false);

  const { studentInfo, handleStudentInfoChange } = useOutletContext();

  useEffect(() => {
    setLoadingFilters(true);
    const wakeupTimer = setTimeout(() => {
      setWakingUp(true);
    }, 1500);

    fetch("https://profping.onrender.com/filters")
      .then((res) => res.json())
      .then((data) => {
        clearTimeout(wakeupTimer);
        setWakingUp(false);
        setFilterOptions({
          domain: data.domain || [],
          university: data.university || [],
        });
      })
      .catch((err) => {
        console.error("Failed to load filters:", err);
        setFilterOptions({
          domain: [],
          university: [
            "Brown University", "Caltech", "Carnegie Mellon University", "Columbia University",
            "Cornell University", "Dartmouth College", "EPFL", "ETH Zurich", "Harvard University",
            "MIT", "Princeton University", "Stanford University", "UC Berkeley", "University of Cambridge",
            "University of Oxford", "Yale University"
          ]
        });
      })
      .finally(() => {
        setLoadingFilters(false);
      });

    return () => clearTimeout(wakeupTimer);
  }, []);

  const fetchProfessors = useCallback((isNewSearch = false) => {
    setLoading(true);
    setError(null);

    const currentOffset = isNewSearch ? 0 : offset;
    const mappedDomains = getDomainsForTrack(selectedTrack, filterOptions.domain);

    const params = new URLSearchParams();
    mappedDomains.forEach((d) => params.append("domain", d));

    if (selectedUniversity !== "All") {
      params.append("university", selectedUniversity);
    }
    if (searchQuery) {
      params.append("search", searchQuery);
    }
    params.append("limit", limit.toString());
    params.append("offset", currentOffset.toString());

    fetch(`https://profping.onrender.com/professors?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (isNewSearch) {
          setProfessors(data);
          setOffset(limit);
        } else {
          setProfessors((prev) => [...prev, ...data]);
          setOffset((prev) => prev + limit);
        }
        setHasMore(data.length === limit);
      })
      .catch((err) => {
        console.error("Failed to load professors:", err);
        setError("Unable to connect to the professor database. Please check your internet connection or try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedTrack, selectedUniversity, searchQuery, offset, filterOptions.domain]);

  useEffect(() => {
    fetchProfessors(true);
  }, [selectedTrack, selectedUniversity]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProfessors(true);
  };

  const handleCopyPlaybook = (template) => {
    const fullText = `Subject: ${template.subject}\n\n${template.body}`;
    navigator.clipboard.writeText(fullText);
    setCopiedId(template.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const currentTemplate = professorTemplates.find((t) => t.id === selectedTemplateId) || professorTemplates[0];
  const compiled = compileEmail(currentTemplate.body, currentTemplate.subject, selectedProf, studentInfo);

  const handleCopySubject = () => {
    navigator.clipboard.writeText(compiled.subject);
    setCopiedSubject(true);
    setTimeout(() => setCopiedSubject(false), 2000);
  };

  const handleCopyBody = () => {
    navigator.clipboard.writeText(compiled.body);
    setCopiedBody(true);
    setTimeout(() => setCopiedBody(false), 2000);
  };

  return (
    <div>
      <PageHeader
        eyebrow="Playbook"
        tone="var(--c-outreach-ink)"
        title="The outreach lab"
        subtitle="Search a database of active research professors from top universities, filter by major track, and dynamically draft personalized cold emails in seconds."
      />

      <Tabs defaultValue="professors">
        <TabsList className="page-card inline-flex flex-wrap gap-1 p-1.5 h-auto bg-card max-w-full">
          <TabsTrigger
            value="professors"
            className="flex items-center gap-2 rounded-lg px-4 h-9 text-[13.5px] font-medium text-foreground/55 data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-none transition-colors duration-150"
          >
            <GraduationCap className="h-3.5 w-3.5 flex-shrink-0" strokeWidth={1.9} />
            Find professors
          </TabsTrigger>
          <TabsTrigger
            value="playbooks"
            className="flex items-center gap-2 rounded-lg px-4 h-9 text-[13.5px] font-medium text-foreground/55 data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-none transition-colors duration-150"
          >
            <BookOpen className="h-3.5 w-3.5 flex-shrink-0" strokeWidth={1.9} />
            Playbooks &amp; tracker
          </TabsTrigger>
        </TabsList>

        <TabsContent value="professors" className="mt-8 space-y-6 outline-none">
          {wakingUp && (
            <div className="page-card flex items-center gap-4 p-5">
              <Loader2 className="h-4 w-4 animate-spin flex-shrink-0 text-foreground/50" />
              <p className="type-small text-foreground/62">
                <strong className="text-foreground font-medium">Waking up the database server.</strong>{" "}
                It's hosted on a free server that sleeps after inactivity — this can take 30-40 seconds
                on the first request.
              </p>
            </div>
          )}

          <form onSubmit={handleSearchSubmit} className="page-card p-7">
            <h3 className="type-h4 mb-5">Filter &amp; search engine</h3>

            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <label className="type-label text-foreground/40 block mb-2">Major track</label>
                <select
                  value={selectedTrack}
                  onChange={(e) => setSelectedTrack(e.target.value)}
                  className={inputCls}
                >
                  {majorTracks.map((track) => (
                    <option key={track.key} value={track.key}>
                      {track.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="type-label text-foreground/40 block mb-2">University</label>
                <select
                  value={selectedUniversity}
                  onChange={(e) => setSelectedUniversity(e.target.value)}
                  className={inputCls}
                  disabled={loadingFilters}
                >
                  <option value="All">All universities</option>
                  {filterOptions.university.map((uni) => (
                    <option key={uni} value={uni}>
                      {uni}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="type-label text-foreground/40 block mb-2">Search keywords</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. AI, genetics, cancer..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`${inputCls} pl-10`}
                  />
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/35" strokeWidth={1.8} />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-5 mt-5 border-t border-border">
              <button type="submit" disabled={loading} className="btn-primary disabled:opacity-50">
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" strokeWidth={2} />
                )}
                Apply search query
              </button>
            </div>
          </form>

          {error && (
            <div className="page-card flex items-center gap-4 p-5 border-destructive/20 bg-destructive/[0.04]">
              <AlertCircle className="h-4 w-4 flex-shrink-0 text-destructive" strokeWidth={1.9} />
              <span className="type-small text-foreground/75 flex-1">{error}</span>
              <button
                onClick={() => fetchProfessors(true)}
                className="press link-arrow text-destructive flex-shrink-0"
              >
                <RefreshCw className="h-3.5 w-3.5" strokeWidth={1.9} /> Try again
              </button>
            </div>
          )}

          {professors.length === 0 && !loading && !error ? (
            <div className="page-card flex flex-col items-center justify-center py-20 text-center">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-muted text-foreground/50 mb-4">
                <Search className="h-5 w-5" strokeWidth={1.7} />
              </div>
              <h4 className="type-h4">No professors found</h4>
              <p className="type-small text-foreground/55 max-w-[36ch] mt-2">
                Try clearing your keyword filters or broadening your search queries.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              <RevealGroup className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {professors.map((prof, idx) => (
                  <RevealItem key={`${prof.id}-${idx}`}>
                    <div className="group flex h-full flex-col card p-6">
                      <div className="flex-1">
                        {/* University leads as a label, not a pill. A
                            rounded-full badge whose text wraps to two lines
                            renders as a giant lozenge — and long university
                            names always wrap. */}
                        <div className="type-label" style={{ color: "hsl(var(--c-outreach-ink))" }}>{clean(prof.university)}</div>

                        <h4 className="type-h3 mt-2.5 group-hover:text-accent transition-colors duration-200">
                          {clean(prof.name)}
                        </h4>

                        {clean(prof.department) && (
                          <p className="type-small text-foreground/50 mt-1">
                            {clean(prof.department)}
                          </p>
                        )}

                        <dl className="mt-5 space-y-3.5">
                          <div>
                            <dt className="type-label text-foreground/38">Research domain</dt>
                            <dd className="type-small text-foreground/75 mt-1.5 line-clamp-1">
                              {clean(prof.domain) || "Not listed"}
                            </dd>
                          </div>
                          <div>
                            <dt className="type-label text-foreground/38">Keywords &amp; projects</dt>
                            <dd className="type-small text-foreground/60 mt-1.5 line-clamp-3">
                              {clean(prof.ai_keywords) ||
                                clean(prof.research_interests) ||
                                "No research details provided."}
                            </dd>
                          </div>
                        </dl>
                      </div>

                      <div className="mt-6 pt-5 border-t border-border flex items-center justify-between gap-3">
                        <span className="type-small font-mono text-foreground/45 truncate">
                          {clean(prof.email) || "Email not listed"}
                        </span>

                        <button
                          onClick={() => {
                            setSelectedProf(prof);
                            setIsDialogOpen(true);
                          }}
                          className="btn-primary flex-shrink-0 px-4"
                          style={{ height: "2.25rem", fontSize: "0.8125rem" }}
                        >
                          <Sparkles className="h-3.5 w-3.5" strokeWidth={1.9} />
                          Draft email
                        </button>
                      </div>
                    </div>
                  </RevealItem>
                ))}

                {loading && professors.length === 0 &&
                  Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-56 animate-pulse rounded-xl bg-muted" />
                  ))}
              </RevealGroup>

              {hasMore && !error && (
                <div className="flex justify-center pt-2">
                  <button
                    onClick={() => fetchProfessors(false)}
                    disabled={loading}
                    className="btn-secondary disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Loading more...
                      </>
                    ) : (
                      "Load more professors"
                    )}
                  </button>
                </div>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="playbooks" className="mt-8 space-y-16 outline-none">
          <section>
            <Reveal className="mb-6">
              <div className="type-label" style={{ color: "hsl(var(--c-outreach-ink))" }}>Outreach strategy</div>
              <h2 className="type-h3 mt-2">Cold email playbook</h2>
              <p className="type-body text-foreground/58 mt-2 max-w-[62ch]">
                Three fill-in-the-blank email templates for high school students. Replace every
                bracketed placeholder with your own information.
              </p>
            </Reveal>

            <RevealGroup className="grid gap-4 grid-cols-1 md:grid-cols-3">
              {emailTemplates.map((template) => (
                <RevealItem key={template.id}>
                  <div className="card flex h-full flex-col overflow-hidden">
                    <div className="flex items-center justify-between px-5 h-12 border-b border-border">
                      <h3 className="type-h4">{template.title}</h3>
                      <button
                        onClick={() => handleCopyPlaybook(template)}
                        className={`press inline-flex items-center gap-1.5 rounded-md px-2.5 h-7 text-xs font-medium transition-colors duration-150 ${
                          copiedId === template.id
                            ? "bg-emerald-500/10 text-emerald-700"
                            : "bg-muted text-foreground/65 hover:bg-foreground hover:text-background"
                        }`}
                      >
                        {copiedId === template.id ? (
                          <>
                            <Check className="h-3 w-3" strokeWidth={2} /> Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" strokeWidth={1.8} /> Copy
                          </>
                        )}
                      </button>
                    </div>
                    <div className="p-5 flex-1">
                      <p className="type-small font-medium text-foreground/70 mb-3 pb-3 border-b border-border">
                        {template.subject}
                      </p>
                      <pre className="whitespace-pre-wrap font-mono text-[11.5px] text-foreground/68 leading-relaxed max-h-48 overflow-y-auto">
                        {template.body}
                      </pre>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal delay={0.1} className="page-card mt-4 p-6">
              <p className="type-small text-foreground/65">
                <strong className="text-foreground font-medium">Pro tip:</strong> Send emails on
                Tuesday or Wednesday mornings (8–10 AM). Follow up exactly 7 days after your first
                email if you don&rsquo;t hear back. One polite follow-up is expected and shows
                persistence — two is pushy.
              </p>
            </Reveal>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Reveal className="mb-6">
                <div className="type-label" style={{ color: "hsl(var(--c-outreach-ink))" }}>Worksheets</div>
                <h2 className="type-h3 mt-2">Tracker matrix</h2>
              </Reveal>

              <Reveal delay={0.06} className="page-card overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Organization / professor</th>
                      <th>Date sent</th>
                      <th>Follow-up date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trackerExample.map((row, i) => (
                      <tr key={i}>
                        <td className="font-medium text-foreground">{row.organization}</td>
                        <td className="whitespace-nowrap tnum">{row.dateSent}</td>
                        <td className="whitespace-nowrap tnum">{row.followUpDate}</td>
                        <td>
                          <span
                            className={`inline-flex rounded-md px-2 py-0.5 text-xs font-medium ${
                              STATUS_STYLE[row.status] ?? "bg-muted text-foreground/60"
                            }`}
                          >
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Reveal>
            </div>

            <Reveal delay={0.1} className="page-card p-7 flex flex-col justify-between">
              <div>
                <div className="type-label" style={{ color: "hsl(var(--c-outreach-ink))" }}>Setup instructions</div>
                <h4 className="type-h4 mt-2 mb-4">Recreate in Google Sheets</h4>
                <ol className="space-y-3.5">
                  {[
                    ["New spreadsheet", "Go to sheets.google.com and create a blank spreadsheet."],
                    ["Add headers", "Enter Organization, Date Sent, Follow-up Date, and Status in row 1."],
                    ["Notes field", "Add a column for notes to log communication highlights."],
                    ["Validation dropdowns", "Use Data → Data Validation for Status: No Response, Awaiting Reply, Replied, Accepted, Declined."],
                  ].map(([title, body], i) => (
                    <li key={title} className="flex gap-3">
                      <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-semibold text-foreground/55 tnum mt-0.5">
                        {i + 1}
                      </span>
                      <p className="type-small text-foreground/65">
                        <span className="text-foreground font-medium">{title}.</span> {body}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
              <a
                href="https://sheets.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-6"
              >
                Open Google Sheets <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} />
              </a>
            </Reveal>
          </section>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[88vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" strokeWidth={1.9} />
              Dynamic email copilot
            </DialogTitle>
            <DialogDescription>
              Drafting a personalized cold email for{" "}
              <span className="text-foreground font-medium">{selectedProf?.name}</span> at{" "}
              <span className="text-foreground font-medium">{selectedProf?.university}</span>.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-8 md:grid-cols-5">
            <div className="md:col-span-2 space-y-4 md:border-r md:border-border md:pr-6">
              <h4 className="type-label" style={{ color: "hsl(var(--c-outreach-ink))" }}>Your profile</h4>

              <div>
                <label className="type-small font-medium text-foreground/62 block mb-1.5">Your full name</label>
                <input
                  type="text"
                  placeholder="e.g. Alex Chen"
                  value={studentInfo.name}
                  onChange={(e) => handleStudentInfoChange("name", e.target.value)}
                  className={inputCls}
                />
              </div>

              <div>
                <label className="type-small font-medium text-foreground/62 block mb-1.5">Your email address</label>
                <input
                  type="email"
                  placeholder="e.g. alexchen@gmail.com"
                  value={studentInfo.email}
                  onChange={(e) => handleStudentInfoChange("email", e.target.value)}
                  className={inputCls}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="type-small font-medium text-foreground/62 block mb-1.5">Grade level</label>
                  <select
                    value={studentInfo.grade}
                    onChange={(e) => handleStudentInfoChange("grade", e.target.value)}
                    className={inputCls}
                  >
                    <option value="Freshman">Freshman</option>
                    <option value="Sophomore">Sophomore</option>
                    <option value="Junior">Junior</option>
                    <option value="Senior">Senior</option>
                  </select>
                </div>

                <div>
                  <label className="type-small font-medium text-foreground/62 block mb-1.5">High school</label>
                  <input
                    type="text"
                    placeholder="Oakridge High"
                    value={studentInfo.highSchool}
                    onChange={(e) => handleStudentInfoChange("highSchool", e.target.value)}
                    className={inputCls}
                  />
                </div>
              </div>

              <div>
                <label className="type-small font-medium text-foreground/62 block mb-1.5">Relevant skills</label>
                <textarea
                  rows="2"
                  placeholder="Python, basic statistical analysis, literature reviews..."
                  value={studentInfo.skills}
                  onChange={(e) => handleStudentInfoChange("skills", e.target.value)}
                  className={`${inputCls} resize-none`}
                />
              </div>

              <div className="pt-4 border-t border-border">
                <label className="type-small font-medium text-foreground/62 block mb-1.5">Select outreach blueprint</label>
                <select
                  value={selectedTemplateId}
                  onChange={(e) => setSelectedTemplateId(e.target.value)}
                  className={inputCls}
                >
                  {professorTemplates.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="md:col-span-3 flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="type-label" style={{ color: "hsl(var(--c-outreach-ink))" }}>Generated draft</h4>
                {clean(selectedProf?.email) && (
                  <a
                    href={`mailto:${selectedProf.email}?subject=${encodeURIComponent(compiled.subject)}&body=${encodeURIComponent(compiled.body)}`}
                    className="link-arrow text-accent"
                  >
                    Open in Mail app <ExternalLink className="h-3 w-3" strokeWidth={2} />
                  </a>
                )}
              </div>

              <div className="relative page-card px-5 py-4">
                <div className="type-label text-foreground/38 mb-1.5">Subject</div>
                <div className="type-small font-medium text-foreground pr-10">{compiled.subject}</div>
                <button
                  onClick={handleCopySubject}
                  className="press absolute right-3.5 top-1/2 -translate-y-1/2 rounded-lg p-2 text-foreground/45 hover:text-foreground hover:bg-muted"
                  title="Copy subject"
                >
                  {copiedSubject ? (
                    <Check className="h-3.5 w-3.5 text-emerald-600" strokeWidth={2} />
                  ) : (
                    <Copy className="h-3.5 w-3.5" strokeWidth={1.8} />
                  )}
                </button>
              </div>

              <div className="relative flex-1 page-card p-5 flex flex-col">
                <div className="type-label text-foreground/38 mb-2">Message body</div>
                <div className="type-small text-foreground/55 mb-2.5 pb-2.5 border-b border-border">
                  To:{" "}
                  <span className="font-mono text-foreground/75">
                    {clean(selectedProf?.email) || "Not found — check directory"}
                  </span>
                </div>
                <div className="flex-1 overflow-y-auto max-h-[30vh] type-small font-mono text-foreground/78 leading-relaxed whitespace-pre-wrap pr-2 pb-12">
                  {compiled.body}
                </div>
                <button
                  onClick={handleCopyBody}
                  className="btn-primary absolute right-4 bottom-4 px-4"
                  style={{ height: "2.25rem", fontSize: "0.8125rem" }}
                >
                  {copiedBody ? (
                    <>
                      <Check className="h-3.5 w-3.5" strokeWidth={2} /> Copied body
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" strokeWidth={1.8} /> Copy message body
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
