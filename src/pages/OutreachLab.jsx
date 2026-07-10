import React, { useState, useEffect, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import { Mail, Copy, Check, Table2, Search, Sparkles, ExternalLink, Loader2, GraduationCap, BookOpen, AlertCircle, RefreshCw } from "lucide-react";
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
    <div className="space-y-10">
      <PageHeader
        title="The Outreach Lab"
        subtitle="Search a database of active research professors from top universities, filter by major track, and dynamically draft personalized cold emails in seconds."
        icon={Mail}
      />

      <div className="w-full space-y-10">
        <Tabs defaultValue="professors" className="w-full space-y-10">
          <TabsList className="grid w-full max-w-md grid-cols-2 bg-muted/40 p-1.5 rounded-2xl">
            <TabsTrigger
              value="professors"
              className="flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 ease-in-out data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-md text-foreground/70"
            >
              <GraduationCap className="h-4 w-4" />
              Find Professors
            </TabsTrigger>
            <TabsTrigger
              value="playbooks"
              className="flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 ease-in-out data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-md text-foreground/70"
            >
              <BookOpen className="h-4 w-4" />
              Playbooks & Tracker
            </TabsTrigger>
          </TabsList>

          <TabsContent value="professors" className="space-y-8 outline-none">
            {wakingUp && (
              <div className="flex items-center gap-4 rounded-3xl bg-secondary border border-border/80 p-6 text-secondary-foreground animate-pulse shadow-sm">
                <Loader2 className="h-5 w-5 animate-spin flex-shrink-0" />
                <div className="text-sm">
                  <strong>Waking up the database server...</strong> The search engine is hosted on a Render server that falls asleep due to inactivity. This might take 30-40 seconds on the first request.
                </div>
              </div>
            )}

            <form onSubmit={handleSearchSubmit} className="glass-card p-8 border border-white/40 shadow-xl shadow-indigo-950/5 space-y-6">
              <h3 className="font-serif font-bold text-primary text-xl">Filter & Search Engine</h3>
              
              <div className="grid gap-6 sm:grid-cols-3">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-foreground/50 uppercase tracking-wider">Major Track</label>
                  <select
                    value={selectedTrack}
                    onChange={(e) => setSelectedTrack(e.target.value)}
                    className="w-full rounded-2xl border border-border bg-[#FAF7F2]/50 px-4 py-3 text-sm text-foreground focus:border-primary/45 focus:bg-card focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all duration-300 ease-in-out"
                  >
                    {majorTracks.map((track) => (
                      <option key={track.key} value={track.key}>
                        {track.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-foreground/50 uppercase tracking-wider">University</label>
                  <select
                    value={selectedUniversity}
                    onChange={(e) => setSelectedUniversity(e.target.value)}
                    className="w-full rounded-2xl border border-border bg-[#FAF7F2]/50 px-4 py-3 text-sm text-foreground focus:border-primary/45 focus:bg-card focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all duration-300 ease-in-out"
                    disabled={loadingFilters}
                  >
                    <option value="All">All Universities</option>
                    {filterOptions.university.map((uni) => (
                      <option key={uni} value={uni}>
                        {uni}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-foreground/50 uppercase tracking-wider">Search Keywords</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. AI, genetics, cancer..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full rounded-2xl border border-border bg-[#FAF7F2]/50 pl-11 pr-4 py-3 text-sm text-foreground focus:border-primary/45 focus:bg-card focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all duration-300 ease-in-out"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-border/40">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md shadow-primary/10 transition-all duration-300 ease-in-out hover:bg-primary/95 hover:scale-[1.01] hover:-translate-y-0.5 active:scale-[0.99] disabled:opacity-50"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                  Apply Search Query
                </button>
              </div>
            </form>

            {error && (
              <div className="flex items-center gap-4 rounded-3xl bg-rose-50/50 border border-rose-200 p-6 text-rose-800 shadow-sm">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm font-medium">{error}</span>
                <button
                  onClick={() => fetchProfessors(true)}
                  className="ml-auto inline-flex items-center gap-1.5 text-xs font-bold underline hover:text-rose-900 transition-colors"
                >
                  <RefreshCw className="h-3.5 w-3.5" /> Try again
                </button>
              </div>
            )}

            {professors.length === 0 && !loading && !error ? (
              <div className="flex flex-col items-center justify-center py-24 text-center rounded-3xl border border-dashed border-border bg-card/50">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted/40 text-foreground/50 mb-4">
                  <Search className="h-7 w-7" />
                </div>
                <h4 className="font-serif font-bold text-primary text-xl">No professors found</h4>
                <p className="text-sm text-foreground/70 max-w-sm mt-2">
                  Try clearing your keyword filters or broadening your search queries.
                </p>
              </div>
            ) : (
              <div className="space-y-10">
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {professors.map((prof, idx) => (
                    <div
                      key={`${prof.id}-${idx}`}
                      className="group flex flex-col glass-card p-6 border border-white/40 shadow-md shadow-indigo-950/2"
                    >
                      <div className="flex-1 space-y-4">
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center rounded-full bg-indigo-50/60 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-100">
                            {prof.university}
                          </span>
                          {prof.department && (
                            <span className="inline-flex items-center rounded-full bg-muted/30 px-2.5 py-0.5 text-xs font-medium text-foreground/70">
                              {prof.department}
                            </span>
                          )}
                        </div>

                        <h4 className="font-serif text-base font-bold text-primary group-hover:text-accent transition-colors duration-300">
                          {prof.name}
                        </h4>

                        <div className="space-y-1">
                          <span className="text-[9px] font-bold text-foreground/50 uppercase tracking-wider">Research Domain</span>
                          <p className="text-xs text-foreground/80 font-semibold line-clamp-1">
                            {prof.domain || "N/A"}
                          </p>
                        </div>

                        <div className="space-y-1">
                          <span className="text-[9px] font-bold text-foreground/50 uppercase tracking-wider">Keywords & Projects</span>
                          <p className="text-xs text-foreground/70 leading-relaxed line-clamp-3">
                            {prof.ai_keywords || prof.research_interests || "No research details provided."}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between">
                        <span className="text-xs font-mono text-foreground/50">
                          {prof.email !== "N/A" ? prof.email : "Email not listed"}
                        </span>
                        
                        <button
                          onClick={() => {
                            setSelectedProf(prof);
                            setIsDialogOpen(true);
                          }}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white hover:bg-primary/95 shadow-md shadow-primary/10 transition-all duration-300 ease-in-out hover:scale-[1.01] hover:-translate-y-0.5 active:scale-[0.99]"
                        >
                          <Sparkles className="h-3 w-3" />
                          Draft Email
                        </button>
                      </div>
                    </div>
                  ))}

                  {loading && professors.length === 0 && (
                    Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="h-56 animate-pulse rounded-3xl bg-muted/30 border border-border/50" />
                    ))
                  )}
                </div>

                {hasMore && !error && (
                  <div className="flex justify-center pt-4">
                    <button
                      onClick={() => fetchProfessors(false)}
                      disabled={loading}
                      className="inline-flex items-center gap-2 rounded-xl border border-border/85 bg-white hover:bg-muted/10 px-8 py-4 text-sm font-semibold text-primary shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" /> Loading more...
                        </>
                      ) : (
                        "Load More Professors"
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="playbooks" className="space-y-12 outline-none">
            <section className="space-y-6">
              <div>
                <span className="text-[10px] font-bold tracking-wider text-accent uppercase">Outreach Strategy</span>
                <h2 className="text-2xl font-serif font-bold text-primary">Cold Email Playbook</h2>
                <p className="text-foreground/70 mt-1 max-w-3xl">
                  Three fill-in-the-blank email templates for high school students. Replace every bracketed placeholder with
                  your own information.
                </p>
              </div>

              <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
                {emailTemplates.map((template) => (
                  <div key={template.id} className="glass-card flex flex-col justify-between overflow-hidden shadow-sm border border-white/40">
                    <div className="flex items-center justify-between bg-muted/20 px-6 py-4.5 border-b border-border/40">
                      <h3 className="font-serif font-bold text-primary text-sm">{template.title}</h3>
                      <button
                        onClick={() => handleCopyPlaybook(template)}
                        className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-300 ease-in-out hover:scale-[1.01] hover:-translate-y-0.5 active:scale-[0.99] ${
                          copiedId === template.id
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-primary text-white hover:bg-primary/90"
                        }`}
                      >
                        {copiedId === template.id ? (
                          <>
                            <Check className="h-3 w-3" /> Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" /> Copy
                          </>
                        )}
                      </button>
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <p className="text-xs font-bold text-foreground/50 mb-3 pb-3 border-b border-border/40">
                          {template.subject}
                        </p>
                        <pre className="whitespace-pre-wrap font-mono text-[11px] text-foreground/80 leading-relaxed max-h-48 overflow-y-auto">
                          {template.body}
                        </pre>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="glass-card p-6 border border-white/40 shadow-xl shadow-indigo-950/5">
                <p className="text-sm text-secondary-foreground leading-relaxed">
                  <strong>Pro tip:</strong> Send emails on Tuesday or Wednesday mornings (8-10 AM). Follow up exactly 7 days
                  after your first email if you don't hear back. One polite follow-up is expected and shows persistence —
                  two is pushy.
                </p>
              </div>
            </section>

            {/* Tracker Matrix and instructions: 2-column workspace */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent border border-accent/20">
                    <Table2 className="h-5.5 w-5.5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-wider text-accent uppercase">Worksheets</span>
                    <h2 className="text-2xl font-serif font-bold text-primary">Tracker Matrix</h2>
                  </div>
                </div>
                
                <div className="overflow-x-auto rounded-3xl border border-border/50 bg-white/40 shadow-sm">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="bg-primary text-primary-foreground">
                        <th className="px-5 py-4 font-semibold">Organization / Professor Name</th>
                        <th className="px-5 py-4 font-semibold whitespace-nowrap">Date Sent</th>
                        <th className="px-5 py-4 font-semibold whitespace-nowrap">Follow-up Date</th>
                        <th className="px-5 py-4 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/40">
                      {trackerExample.map((row, i) => (
                        <tr key={i} className="hover:bg-white/60 transition-colors duration-300">
                          <td className="px-5 py-4 font-serif font-bold text-primary">{row.organization}</td>
                          <td className="px-5 py-4 text-foreground/80 whitespace-nowrap">{row.dateSent}</td>
                          <td className="px-5 py-4 text-foreground/80 whitespace-nowrap">{row.followUpDate}</td>
                          <td className="px-5 py-4">
                            <span
                              className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                row.status === "No Response"
                                  ? "bg-red-100/80 text-red-700 ring-1 ring-red-200"
                                  : row.status === "Awaiting Reply"
                                  ? "bg-amber-100/80 text-amber-700 ring-1 ring-amber-200"
                                  : row.status === "Interview Scheduled"
                                  ? "bg-blue-100/80 text-blue-700 ring-1 ring-blue-200"
                                  : "bg-emerald-100/80 text-emerald-700 ring-1 ring-emerald-200"
                              }`}
                            >
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Instructions column */}
              <div className="glass-card p-8 border border-white/40 shadow-xl shadow-indigo-950/5 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold tracking-wider text-accent uppercase">Setup Instructions</span>
                  <h4 className="font-serif font-bold text-primary text-base mt-0.5 mb-4">Recreate in Google Sheets:</h4>
                  <ol className="space-y-3.5 text-xs text-foreground/80 leading-relaxed">
                    <li>
                      <strong className="text-primary">1. New Spreadsheet:</strong> Go to sheets.google.com and create a blank spreadsheet.
                    </li>
                    <li>
                      <strong className="text-primary">2. Add Headers:</strong> Enter Organization, Date Sent, Follow-up Date, and Status in row 1.
                    </li>
                    <li>
                      <strong className="text-primary">3. Notes Field:</strong> Add a column for notes to log communication highlights.
                    </li>
                    <li>
                      <strong className="text-primary">4. Validation dropdowns:</strong> Use Data → Data Validation for Status: No Response, Awaiting Reply, Replied, Accepted, Declined.
                    </li>
                  </ol>
                </div>
                <a
                  href="https://sheets.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-xs font-semibold text-white shadow-md shadow-primary/10 transition-all duration-300 ease-in-out hover:scale-[1.01] hover:-translate-y-0.5 active:scale-[0.99]"
                >
                  Open Google Sheets <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white/95 backdrop-blur-md p-8 shadow-2xl border border-white/50">
          <DialogHeader className="border-b border-border/40 pb-4">
            <DialogTitle className="text-xl font-serif font-bold text-primary flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-accent animate-pulse" />
              Dynamic Email Copilot
            </DialogTitle>
            <DialogDescription className="text-foreground/70 text-sm">
              Drafting a personalized cold email for <span className="font-bold text-foreground">{selectedProf?.name}</span> at <span className="font-bold text-foreground">{selectedProf?.university}</span>.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-8 md:grid-cols-5 pt-6">
            <div className="md:col-span-2 space-y-4 border-r border-border/40 pr-0 md:pr-6">
              <h4 className="font-serif font-bold text-accent text-sm uppercase tracking-wider">Your Profile</h4>
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground/60">Your Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Alex Chen"
                  value={studentInfo.name}
                  onChange={(e) => handleStudentInfoChange("name", e.target.value)}
                  className="w-full rounded-2xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary/45 focus:bg-card focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all duration-300 ease-in-out"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground/60">Your Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. alexchen@gmail.com"
                  value={studentInfo.email}
                  onChange={(e) => handleStudentInfoChange("email", e.target.value)}
                  className="w-full rounded-2xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary/45 focus:bg-card focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all duration-300 ease-in-out"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground/60">Grade Level</label>
                  <select
                    value={studentInfo.grade}
                    onChange={(e) => handleStudentInfoChange("grade", e.target.value)}
                    className="w-full rounded-2xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary/45 focus:bg-card focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all duration-300 ease-in-out"
                  >
                    <option value="Freshman">Freshman</option>
                    <option value="Sophomore">Sophomore</option>
                    <option value="Junior">Junior</option>
                    <option value="Senior">Senior</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground/60">High School</label>
                  <input
                    type="text"
                    placeholder="Oakridge High"
                    value={studentInfo.highSchool}
                    onChange={(e) => handleStudentInfoChange("highSchool", e.target.value)}
                    className="w-full rounded-2xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary/45 focus:bg-card focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all duration-300 ease-in-out"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground/60">Relevant Skills</label>
                <textarea
                  rows="2"
                  placeholder="Python, basic statistical analysis, literature reviews..."
                  value={studentInfo.skills}
                  onChange={(e) => handleStudentInfoChange("skills", e.target.value)}
                  className="w-full rounded-2xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary/45 focus:bg-card focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all duration-300 ease-in-out resize-none"
                />
              </div>

              <div className="space-y-1.5 pt-4 border-t border-border/40">
                <label className="text-xs font-bold text-foreground/60">Select Outreach Blueprint</label>
                <select
                  value={selectedTemplateId}
                  onChange={(e) => setSelectedTemplateId(e.target.value)}
                  className="w-full rounded-2xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary/45 focus:bg-card focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all duration-300 ease-in-out"
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
                <h4 className="font-serif font-bold text-accent text-sm uppercase tracking-wider">Generated Draft</h4>
                {selectedProf?.email && selectedProf.email !== "N/A" && (
                  <a
                    href={`mailto:${selectedProf.email}?subject=${encodeURIComponent(compiled.subject)}&body=${encodeURIComponent(compiled.body)}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:text-primary transition-colors duration-300"
                  >
                    Open in Mail app <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>

              <div className="rounded-2xl border border-border/60 bg-background px-5 py-4 relative group">
                <div className="text-[10px] font-bold text-foreground/50 uppercase tracking-wider mb-1">Subject</div>
                <div className="text-sm font-semibold text-foreground/80 pr-10">{compiled.subject}</div>
                <button
                  onClick={handleCopySubject}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-xl p-2 bg-card border border-border/60 text-foreground/60 hover:text-primary hover:shadow-md transition-all duration-300 ease-in-out"
                  title="Copy Subject"
                >
                  {copiedSubject ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>

              <div className="flex-1 rounded-2xl border border-border/60 bg-background p-6 relative flex flex-col">
                <div className="text-[10px] font-bold text-foreground/50 uppercase tracking-wider mb-2">Message Body</div>
                <div className="text-xs text-foreground/60 mb-2 border-b border-border/40 pb-2">
                  To: <span className="font-mono text-foreground/80">{selectedProf?.email !== "N/A" ? selectedProf?.email : "Name not found (check directory)"}</span>
                </div>
                <div className="flex-1 overflow-y-auto max-h-[30vh] text-sm text-foreground/85 font-mono leading-relaxed whitespace-pre-wrap pr-4">
                  {compiled.body}
                </div>
                <button
                  onClick={handleCopyBody}
                  className="absolute right-4 bottom-4 rounded-xl p-3 bg-primary border border-primary text-white hover:bg-primary/95 transition-all duration-300 ease-in-out hover:scale-[1.01] hover:-translate-y-0.5 active:scale-[0.99] flex items-center gap-1.5 font-semibold text-xs"
                >
                  {copiedBody ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" /> Copied Body!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" /> Copy Message Body
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