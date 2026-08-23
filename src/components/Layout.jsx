import React, { useCallback, useEffect, useRef, useState } from "react";
import { Outlet, NavLink, Link, useLocation } from "react-router-dom";
import { X, Menu, BookOpen, Users, Award, Mail, Globe, LayoutGrid, Sun } from "lucide-react";
import { Mark, Logo } from "@/components/Brand";

/* The disclaimer is legally load-bearing: it states we publish frameworks and
   do not sell 1-on-1 coaching or personalised advisory. It must always be
   reachable — so the full sentence lives permanently in the footer, and the
   banner is only the *notice* of it. That is what makes it safe to let a
   student dismiss the banner once and never see it again. */
const DISCLAIMER_DISMISSED_KEY = "maps_disclaimer_dismissed_v1";

/* A horizontal bar is a flat row — the rail's three labelled groups do not
   survive the rotation, so the IA is carried by order instead: overview, the
   four playbooks, then about. */
const navLinks = [
  { to: "/", label: "Overview", icon: LayoutGrid, end: true },
  { to: "/academic-paths", label: "Academic", icon: BookOpen },
  { to: "/extracurricular-tracks", label: "Activities", icon: Users },
  { to: "/summer-programs", label: "Summer Programs", icon: Sun },
  { to: "/scholarship-finder", label: "Scholarships", icon: Award },
  { to: "/outreach-lab", label: "Outreach", icon: Mail },
  { to: "/our-mission", label: "Mission", icon: Globe },
];

export default function Layout() {
  const [bannerOpen, setBannerOpen] = useState(() => {
    try {
      return localStorage.getItem(DISCLAIMER_DISMISSED_KEY) !== "1";
    } catch {
      return true;
    }
  });
  const [bannerExpanded, setBannerExpanded] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const dismissBanner = () => {
    setBannerOpen(false);
    try {
      localStorage.setItem(DISCLAIMER_DISMISSED_KEY, "1");
    } catch {
      /* Private browsing / storage disabled — the banner simply returns next
         visit, which is the safe direction to fail in. */
    }
  };

  const location = useLocation();
  const sidebarRef = useRef(null);
  const menuButtonRef = useRef(null);
  const mainRef = useRef(null);
  const closeMenu = useCallback(() => setMobileOpen(false), []);

  /* Route change closes the drawer. Without this, following a link on mobile
     leaves an open overlay covering the page you just navigated to. */
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  /* Drawer keyboard contract: focus moves in on open, Escape closes, Tab is
     trapped inside while it is open, and focus returns to the button that
     opened it. Without the last step a keyboard user is dumped at the top of
     the document every time they close the menu. */
  useEffect(() => {
    if (!mobileOpen) return;
    const node = sidebarRef.current;
    if (!node) return;

    const SELECTOR =
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusables = () =>
      Array.from(node.querySelectorAll(SELECTOR)).filter((el) => el.offsetParent !== null);

    focusables()[0]?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMobileOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      } else if (!node.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      menuButtonRef.current?.focus();
    };
  }, [mobileOpen]);

  // Shared personalized states
  const [studentInfo, setStudentInfo] = useState(() => ({
    name: localStorage.getItem("outreach_student_name") || "",
    email: localStorage.getItem("outreach_student_email") || "",
    grade: localStorage.getItem("outreach_student_grade") || "",
    highSchool: localStorage.getItem("outreach_student_highSchool") || "",
    skills: localStorage.getItem("outreach_student_skills") || "",
    targetSat: localStorage.getItem("maps_student_targetSat") || "",
    targetMajor: localStorage.getItem("maps_student_targetMajor") || "",
    gpa: localStorage.getItem("maps_student_gpa") || "",
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
    <div className="min-h-screen bg-white text-foreground">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-foreground focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <div className="flex min-h-screen w-full flex-col bg-white">

        {/* Top bar */}
        <header className="sticky top-0 z-40 bg-[hsl(var(--rail))]">
          <div className="mx-auto flex h-16 w-full max-w-[1180px] items-center gap-6 px-5 sm:px-7 lg:h-[74px] lg:px-9">
            <Link
              to="/"
              onClick={closeMenu}
              aria-label="MAPS home"
              className="shrink-0 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70"
            >
              <Logo tone="invert" className="text-white" markClass="h-[26px] w-[26px]" />
            </Link>

            {/* Desktop nav */}
            <nav aria-label="Main" className="hidden flex-1 lg:block">
              <ul className="flex items-center gap-1">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      end={link.end}
                      className={({ isActive }) =>
                        `flex h-10 items-center gap-2 rounded-full px-3 text-[0.875rem] font-medium whitespace-nowrap transition-colors ${
                          isActive
                            ? "bg-white text-foreground"
                            : "text-white/70 hover:bg-white/[0.09] hover:text-white"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <link.icon
                            className="h-[17px] w-[17px] shrink-0"
                            strokeWidth={isActive ? 2.2 : 1.75}
                          />
                          {link.label}
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <span className="ml-auto hidden shrink-0 rounded-full bg-white/[0.09] px-3.5 py-1.5 text-[0.75rem] font-medium text-white/70 xl:block">
              No account · No paywall
            </span>

            <button
              ref={menuButtonRef}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="press ml-auto rounded-xl p-2.5 -mr-2 text-white/75 hover:bg-white/10 hover:text-white lg:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile nav — a panel under the bar, not a side drawer. */}
          {mobileOpen && (
            <nav
              id="mobile-nav"
              ref={sidebarRef}
              aria-label="Main"
              className="border-t border-white/10 px-3 pb-4 pt-2 lg:hidden"
            >
              <ul className="space-y-1">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      end={link.end}
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        `flex min-h-[48px] items-center gap-3 rounded-xl px-4 text-[0.95rem] font-medium ${
                          isActive
                            ? "bg-white text-foreground"
                            : "text-white/75 hover:bg-white/[0.09] hover:text-white"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <link.icon
                            className="h-[18px] w-[18px] shrink-0"
                            strokeWidth={isActive ? 2.2 : 1.75}
                          />
                          {link.label}
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </header>

        {/* Main pane */}
        <div className="flex min-w-0 flex-1 flex-col bg-white">
          {bannerOpen && (
            <div className="bg-[hsl(var(--panel))]">
              <div className="mx-auto flex w-full max-w-[1180px] items-start justify-between gap-4 px-5 py-3 sm:px-7 lg:px-9">
                <p className="type-small text-foreground/60">
                  <span className="font-semibold text-foreground/85">Self-service tool repository.</span>{" "}
                  We publish independent structural frameworks — not 1-on-1 coaching or advisory.
                </p>
                <button
                  onClick={dismissBanner}
                  className="press mt-0.5 shrink-0 rounded-lg p-1 text-foreground/35 hover:bg-foreground/5 hover:text-foreground/70"
                  aria-label="Dismiss disclaimer"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}

          <main id="main" ref={mainRef} className="mx-auto w-full max-w-[1180px] flex-1 px-5 py-8 sm:px-7 lg:px-9 lg:py-11">
            <Outlet context={{ studentInfo, handleStudentInfoChange, checkedWeeks, toggleWeek, checkedSatSteps, toggleSatStep, checkedMilestones, toggleMilestone, trackedScholarships, toggleTrackScholarship, essayOutline, updateEssayOutline }} />
          </main>

          <footer className="mt-auto px-5 py-8 sm:px-7 lg:px-9">
            <div className="mx-auto flex w-full max-w-[1180px] flex-col justify-between gap-5 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2.5">
                <Mark className="h-5 w-5 text-foreground" />
                <div>
                  <div className="type-h4">Movement for Admissions Pathways &amp; Success</div>
                  <div className="type-small mt-0.5 text-foreground/50">
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
      </div>
    </div>
  );
}
