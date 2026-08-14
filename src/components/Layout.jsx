import React, { useState } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import { X, Menu, BookOpen, Users, Award, Mail, Globe, LayoutGrid } from "lucide-react";
import { Mark, Logo } from "@/components/Brand";

/* Grouped IA — a flat list of six links reads as a dump; three labelled groups
   read as a considered information architecture. */
const navGroups = [
  {
    label: null,
    links: [{ to: "/", label: "Overview", icon: LayoutGrid, end: true }],
  },
  {
    label: "Playbooks",
    links: [
      { to: "/academic-paths", label: "Academic Paths", icon: BookOpen },
      { to: "/extracurricular-tracks", label: "Extracurricular Tracks", icon: Users },
      { to: "/scholarship-finder", label: "Scholarship Finder", icon: Award },
      { to: "/outreach-lab", label: "The Outreach Lab", icon: Mail },
    ],
  },
  {
    label: "About",
    links: [{ to: "/our-mission", label: "Our Mission", icon: Globe }],
  },
];

export default function Layout() {
  const [bannerOpen, setBannerOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Shared personalized states
  const [studentInfo, setStudentInfo] = useState(() => ({
    name: localStorage.getItem("outreach_student_name") || "Anika Kapoor",
    email: localStorage.getItem("outreach_student_email") || "anika@gmail.com",
    grade: localStorage.getItem("outreach_student_grade") || "Junior",
    highSchool: localStorage.getItem("outreach_student_highSchool") || "Oakridge High",
    skills: localStorage.getItem("outreach_student_skills") || "Python, data analysis, literature reviews",
    targetSat: localStorage.getItem("maps_student_targetSat") || "1500",
    targetMajor: localStorage.getItem("maps_student_targetMajor") || "Computer Science",
    gpa: localStorage.getItem("maps_student_gpa") || "3.9",
  }));

  const handleStudentInfoChange = (key, value) => {
    setStudentInfo((prev) => {
      const updated = { ...prev, [key]: value };
      localStorage.setItem(`outreach_student_${key}`, value);
      if (key === "targetSat" || key === "targetMajor" || key === "gpa") {
        localStorage.setItem(`maps_student_${key}`, value);
      }
      return updated;
    });
  };

  const [checkedWeeks, setCheckedWeeks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("maps_checked_weeks") || "[]");
    } catch {
      return [];
    }
  });

  const toggleWeek = (weekNum) => {
    setCheckedWeeks((prev) => {
      const updated = prev.includes(weekNum)
        ? prev.filter((w) => w !== weekNum)
        : [...prev, weekNum];
      localStorage.setItem("maps_checked_weeks", JSON.stringify(updated));
      return updated;
    });
  };

  const [checkedSatSteps, setCheckedSatSteps] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("maps_checked_sat_steps") || "[]");
    } catch {
      return [];
    }
  });

  const toggleSatStep = (stepIdx) => {
    setCheckedSatSteps((prev) => {
      const updated = prev.includes(stepIdx)
        ? prev.filter((s) => s !== stepIdx)
        : [...prev, stepIdx];
      localStorage.setItem("maps_checked_sat_steps", JSON.stringify(updated));
      return updated;
    });
  };

  const [checkedMilestones, setCheckedMilestones] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("maps_checked_milestones") || "[]");
    } catch {
      return [];
    }
  });

  const toggleMilestone = (milestoneId) => {
    setCheckedMilestones((prev) => {
      const updated = prev.includes(milestoneId)
        ? prev.filter((m) => m !== milestoneId)
        : [...prev, milestoneId];
      localStorage.setItem("maps_checked_milestones", JSON.stringify(updated));
      return updated;
    });
  };

  const [trackedScholarships, setTrackedScholarships] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("maps_tracked_scholarships") || "[]");
    } catch {
      return [];
    }
  });

  const toggleTrackScholarship = (scholarshipName) => {
    setTrackedScholarships((prev) => {
      const updated = prev.includes(scholarshipName)
        ? prev.filter((s) => s !== scholarshipName)
        : [...prev, scholarshipName];
      localStorage.setItem("maps_tracked_scholarships", JSON.stringify(updated));
      return updated;
    });
  };

  const [essayOutline, setEssayOutline] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("maps_essay_outline") || JSON.stringify({ prompt: "1", text: "" }));
    } catch {
      return { prompt: "1", text: "" };
    }
  });

  const updateEssayOutline = (fields) => {
    setEssayOutline((prev) => {
      const updated = { ...prev, ...fields };
      localStorage.setItem("maps_essay_outline", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row text-foreground">

      {/* Mobile top bar */}
      <header className="lg:hidden sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border bg-background/90 backdrop-blur-md px-4 sm:px-5">
        <Link to="/" onClick={() => setMobileOpen(false)} aria-label="MAPS home">
          <Logo />
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="press rounded-lg p-2 -mr-2 text-foreground/60 hover:text-foreground hover:bg-muted"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[264px] flex-col border-r border-border bg-background transition-transform duration-300 lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ transitionTimingFunction: "var(--ease-out)" }}
      >
        <div className="flex h-14 items-center justify-between px-5">
          <Link to="/" onClick={() => setMobileOpen(false)} aria-label="MAPS home">
            <Logo />
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden press rounded-md p-1.5 -mr-1.5 text-foreground/45 hover:bg-muted"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 px-3 pb-4 overflow-y-auto">
          {navGroups.map((group, gi) => (
            <div key={group.label ?? "root"} className={gi === 0 ? "" : "mt-6"}>
              {group.label && (
                <div className="type-label text-foreground/38 px-3 pb-2">{group.label}</div>
              )}
              <div className="space-y-px">
                {group.links.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.end}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `nav-link relative flex items-center gap-2.5 px-3 h-9 rounded-md ${
                        isActive
                          ? "text-foreground bg-muted font-medium"
                          : "text-foreground/58 hover:text-foreground hover:bg-muted/60"
                      }`
                    }
                    style={{ fontSize: "0.84375rem", letterSpacing: "-0.006em" }}
                  >
                    {({ isActive }) => (
                      <>
                        <link.icon
                          className="h-4 w-4 flex-shrink-0"
                          strokeWidth={isActive ? 2.1 : 1.8}
                        />
                        {link.label}
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-3">
          <div className="rounded-lg bg-muted/70 px-3.5 py-3">
            <div className="type-label text-foreground/45">Open access</div>
            <p className="type-small text-foreground/62 mt-1.5 leading-snug">
              No account, no paywall, no data collected.
            </p>
          </div>
        </div>
      </aside>

      {/* Main pane */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Disclaimer — legally required, visually quiet. A yellow alert bar
            shouts; a hairline strip informs. */}
        {bannerOpen && (
          <div className="border-b border-border bg-muted/45">
            <div className="mx-auto max-w-[1100px] px-6 sm:px-8 lg:px-12">
              <div className="flex items-center justify-between gap-4 py-2.5">
                <p className="type-small text-foreground/58">
                  <span className="text-foreground/80 font-medium">Self-service tool repository.</span>{" "}
                  We publish independent structural frameworks — not 1-on-1 coaching or advisory.
                </p>
                <button
                  onClick={() => setBannerOpen(false)}
                  className="press flex-shrink-0 rounded-md p-1 text-foreground/35 hover:text-foreground/70 hover:bg-foreground/5"
                  aria-label="Dismiss"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content viewport — 1100px measure. 1280 is too wide for reading;
            cards stretch and text lines run long. */}
        <main className="flex-1 px-6 sm:px-8 lg:px-12 py-14 lg:py-20">
          <div className="mx-auto max-w-[1100px]">
            <Outlet context={{ studentInfo, handleStudentInfoChange, checkedWeeks, toggleWeek, checkedSatSteps, toggleSatStep, checkedMilestones, toggleMilestone, trackedScholarships, toggleTrackScholarship, essayOutline, updateEssayOutline }} />
          </div>
        </main>

        <footer className="border-t border-border px-6 sm:px-8 lg:px-12 py-10">
          <div className="mx-auto max-w-[1100px] flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="flex items-center gap-2.5">
              <Mark className="h-5 w-5 text-foreground" />
              <div>
                <div className="type-h4">Movement for Admissions Pathways &amp; Success</div>
                <div className="type-small text-foreground/50 mt-0.5">
                  Democratizing college admissions knowledge.
                </div>
              </div>
            </div>
            <p className="type-small text-foreground/45">
              Every playbook is free. © {new Date().getFullYear()} MAPS.
            </p>
          </div>
        </footer>
      </div>

      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-foreground/25 backdrop-blur-[2px] lg:hidden"
        />
      )}
    </div>
  );
}
