import React, { useState } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import { Compass, AlertTriangle, X, Menu, BookOpen, Users, Award, Mail, Globe, LogIn, LogOut } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

const navLinks = [
  { to: "/", label: "Dashboard Home", icon: Compass, end: true },
  { to: "/academic-paths", label: "Academic Paths", icon: BookOpen },
  { to: "/extracurricular-tracks", label: "Extracurricular Tracks", icon: Users },
  { to: "/scholarship-finder", label: "Scholarship Finder", icon: Award },
  { to: "/outreach-lab", label: "The Outreach Lab", icon: Mail },
  { to: "/our-mission", label: "Our Mission", icon: Globe },
];

export default function Layout() {
  const [bannerOpen, setBannerOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, user, logout, navigateToLogin } = useAuth();

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50/50 via-[#FAF7F2] to-white flex flex-col lg:flex-row text-[#1E1B4B]">
      
      {/* Mobile Top Bar */}
      <header className="lg:hidden sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border/60 bg-[#FAF7F2]/90 backdrop-blur-md px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Compass className="h-5 w-5 text-white" />
          </div>
          <span className="font-serif font-bold text-primary text-sm sm:text-base tracking-tight">MAPS Dashboard</span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-foreground/75 hover:text-primary hover:bg-primary/5 transition-all duration-300"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-border/50 bg-[#FAF7F2]/90 backdrop-blur-lg transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex h-20 items-center justify-between px-6 border-b border-border/40">
          <Link to="/" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-md shadow-primary/10">
              <Compass className="h-5.5 w-5.5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-primary leading-none text-base tracking-tight">MAPS Playbook</span>
              <span className="text-[9px] font-semibold text-accent tracking-widest uppercase mt-0.5">Admissions Hub</span>
            </div>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden rounded-lg p-1.5 text-foreground/50 hover:bg-muted/40 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Sidebar Navigation Links */}
        <nav className="flex-1 space-y-1.5 px-4 py-6 overflow-y-auto">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 ease-in-out hover:scale-[1.01] hover:-translate-y-0.5 active:scale-[0.99] ${
                  isActive
                    ? "text-primary bg-white shadow-md shadow-indigo-950/5 border border-white/60"
                    : "text-foreground/70 hover:text-primary hover:bg-white/50"
                }`
              }
            >
              <link.icon className="h-4.5 w-4.5 flex-shrink-0" />
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Profile Setup */}
        <div className="p-4 border-t border-border/40 space-y-2">
          {isAuthenticated ? (
            <div className="rounded-2xl bg-white border border-border/50 p-4 shadow-sm flex items-center justify-between gap-2">
              <div className="truncate">
                <span className="text-[9px] font-bold text-foreground/50 uppercase tracking-widest block">Active Profile</span>
                <span className="text-xs font-semibold text-primary truncate block mt-0.5">{user?.name || studentInfo.name}</span>
              </div>
              <button
                onClick={() => logout(true)}
                className="rounded-lg p-1.5 text-foreground/50 hover:text-red-500 hover:bg-red-50 transition-all"
                title="Sign out"
              >
                <LogOut className="h-4.5 w-4.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={navigateToLogin}
              className="w-full rounded-2xl bg-white border border-border/50 p-4 shadow-sm flex items-center justify-between text-left hover:bg-primary/5 transition-all"
            >
              <div>
                <span className="text-[9px] font-bold text-foreground/50 uppercase tracking-widest block">Guest Mode</span>
                <span className="text-xs font-semibold text-primary block mt-0.5">Sign in to save</span>
              </div>
              <LogIn className="h-4.5 w-4.5 text-foreground/60" />
            </button>
          )}

          <div className="rounded-2xl bg-secondary/30 p-4 border border-border/50">
            <span className="text-[9px] font-bold text-secondary-foreground uppercase tracking-widest block">Access Status</span>
            <span className="text-xs font-semibold text-primary mt-1 block">100% Free · Public Tier</span>
          </div>
        </div>
      </aside>

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Banner container */}
        {bannerOpen && (
          <div className="bg-secondary/40 border-b border-border/50 transition-all duration-300">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between gap-3 py-3">
                <p className="flex items-start gap-2 text-xs sm:text-sm text-secondary-foreground leading-relaxed">
                  <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span><strong>Disclaimer:</strong> This platform is a 100% free, self-service tool repository. We provide independent structural frameworks; we do not offer 1-on-1 coaching or advisory.</span>
                </p>
                <button
                  onClick={() => setBannerOpen(false)}
                  className="flex-shrink-0 rounded-lg p-1 text-secondary-foreground/80 hover:bg-secondary-foreground/10 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content viewport */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mx-auto max-w-7xl">
            <Outlet context={{ studentInfo, handleStudentInfoChange, checkedWeeks, toggleWeek, checkedSatSteps, toggleSatStep, checkedMilestones, toggleMilestone, trackedScholarships, toggleTrackScholarship, essayOutline, updateEssayOutline }} />
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border/40 bg-[#FAF7F2]/40 py-8 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
                <Compass className="h-4 w-4 text-white" />
              </div>
              <span className="font-serif font-bold text-primary text-sm">Movement for Admissions Pathways and Success</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Democratizing college admissions knowledge. All playbooks are free.
            </p>
          </div>
        </footer>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/20 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}
    </div>
  );
}