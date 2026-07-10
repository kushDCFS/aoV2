import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Compass } from "lucide-react";
import PathwayIntro from "@/components/pathway/PathwayIntro";
import MajorSelector from "@/components/pathway/MajorSelector";
import MajorQuiz from "@/components/pathway/MajorQuiz";
import PathwayResults from "@/components/pathway/PathwayResults";

export default function Pathway() {
  const [step, setStep] = useState("intro");
  const [majors, setMajors] = useState([]);

  return (
    <div className="min-h-screen bg-slate-50/50">
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600">
              <Compass className="h-5 w-5 text-white" />
            </div>
            <span className="font-heading text-lg font-bold tracking-tight text-slate-900">Pathfinder</span>
          </Link>
          <div className="flex items-center gap-5">
            <Link to="/resources" className="text-sm font-medium text-slate-600 transition-colors hover:text-indigo-600">
              Resources
            </Link>
            <Link to="/" className="text-sm font-medium text-slate-600 transition-colors hover:text-indigo-600">
              Home
            </Link>
          </div>
        </div>
      </nav>

      {step === "intro" && <PathwayIntro onKnow={() => setStep("select")} onQuiz={() => setStep("quiz")} />}
      {step === "select" && (
        <MajorSelector
          onSelect={(m) => {
            setMajors(m);
            setStep("results");
          }}
          onBack={() => setStep("intro")}
        />
      )}
      {step === "quiz" && (
        <MajorQuiz
          onComplete={(m) => {
            setMajors(m);
            setStep("results");
          }}
          onBack={() => setStep("intro")}
        />
      )}
      {step === "results" && (
        <PathwayResults
          majors={majors}
          onRestart={() => {
            setMajors([]);
            setStep("intro");
          }}
        />
      )}
    </div>
  );
}