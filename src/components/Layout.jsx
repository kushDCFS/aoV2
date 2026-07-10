import React, { useState } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import { Compass, AlertTriangle, X, Menu } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/academic-paths", label: "Academic Paths" },
  { to: "/extracurricular-tracks", label: "Extracurricular Tracks" },
  { to: "/scholarship-finder", label: "Scholarship Finder" },
  { to: "/outreach-lab", label: "The Outreach Lab" },
  { to: "/our-mission", label: "Our Mission" },
];

export default function Layout() {
  const [bannerOpen, setBannerOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="sticky top-0 z-50">
        {bannerOpen && (
          <div className="bg-amber-50 border-b border-amber-200">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between gap-3 py-2.5">
                <p className="flex items-start gap-2 text-xs sm:text-sm text-amber-800 leading-relaxed">
                  <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span><strong>Disclaimer:</strong> This platform is a 100% free, self-service tool repository. We provide independent structural frameworks and templates; we do not offer 1-on-1 coaching or personalized advisory services.</span>
                </p>
                <button onClick={() => setBannerOpen(false)} className="flex-shrink-0 rounded p-1 text-amber-600 hover:bg-amber-100 transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        <nav className="border-b border-slate-800 bg-slate-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <Link to="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                  <Compass className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-white text-sm sm:text-base">Movement for Admissions Pathways and Success</span>
              </Link>

              <div className="hidden lg:flex items-center gap-0.5">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.end}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive ? "text-white bg-slate-800" : "text-slate-300 hover:text-white hover:bg-slate-800"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden rounded-md p-2 text-slate-300 hover:text-white hover:bg-slate-800"
              >
                {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {mobileOpen && (
            <div className="lg:hidden border-t border-slate-800 bg-slate-900">
              <div className="px-4 py-3 space-y-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.end}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive ? "text-white bg-slate-800" : "text-slate-300 hover:text-white hover:bg-slate-800"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </div>
          )}
        </nav>
      </div>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-slate-900 border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                <Compass className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-white">Movement for Admissions Pathways and Success</span>
            </div>
            <p className="text-sm text-slate-400 max-w-2xl">
              A premium, open-access, zero-barrier college playbook designed to bring absolute transparency to the admissions process for all self-driven students.
            </p>
            <p className="mt-6 text-xs text-slate-500">
              Built to democratize college admissions knowledge. All resources are free or low-cost.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}