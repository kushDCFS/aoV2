import { Code, Wrench, HeartPulse, Scale, TrendingUp, FlaskConical, Leaf, Brain, Palette } from "lucide-react";

export const fields = [
  { key: "cs", name: "Computer Science", icon: Code, description: "Software, AI, and the technology that powers the modern world.", gradient: "from-indigo-500 to-blue-600", accent: "text-indigo-600", bg: "bg-indigo-50" },
  { key: "engineering", name: "Engineering", icon: Wrench, description: "Designing and building machines, systems, and structures.", gradient: "from-cyan-500 to-sky-600", accent: "text-cyan-600", bg: "bg-cyan-50" },
  { key: "premed", name: "Pre-Med & Healthcare", icon: HeartPulse, description: "Caring for patients and advancing medicine.", gradient: "from-rose-500 to-pink-600", accent: "text-rose-600", bg: "bg-rose-50" },
  { key: "prelaw", name: "Pre-Law & Political Science", icon: Scale, description: "Advocacy, justice, and shaping public policy.", gradient: "from-amber-500 to-orange-600", accent: "text-amber-600", bg: "bg-amber-50" },
  { key: "finance", name: "Finance & Economics", icon: TrendingUp, description: "Markets, money, and business strategy.", gradient: "from-emerald-500 to-green-600", accent: "text-emerald-600", bg: "bg-emerald-50" },
  { key: "biology", name: "Biology & Research", icon: FlaskConical, description: "Discovering how life works through research.", gradient: "from-green-500 to-teal-600", accent: "text-green-600", bg: "bg-green-50" },
  { key: "environmental", name: "Environmental Science", icon: Leaf, description: "Protecting ecosystems and fighting climate change.", gradient: "from-teal-500 to-cyan-600", accent: "text-teal-600", bg: "bg-teal-50" },
  { key: "psychology", name: "Psychology & Social Sciences", icon: Brain, description: "Understanding the mind and helping people thrive.", gradient: "from-violet-500 to-purple-600", accent: "text-violet-600", bg: "bg-violet-50" },
  { key: "arts", name: "Arts & Communications", icon: Palette, description: "Storytelling, design, media, and creative expression.", gradient: "from-pink-500 to-rose-600", accent: "text-pink-600", bg: "bg-pink-50" },
];

export const fieldMap = Object.fromEntries(fields.map((f) => [f.key, f]));

export const quizQuestions = [
  {
    question: "Which type of problem do you most enjoy solving?",
    options: [
      { text: "Logic puzzles and coding challenges", field: "cs" },
      { text: "Building or fixing physical machines", field: "engineering" },
      { text: "Understanding how living things work", field: "biology" },
      { text: "Debating rules, rights, and policies", field: "prelaw" },
    ],
  },
  {
    question: "What would you do on a free Saturday?",
    options: [
      { text: "Write a story, draw, or make a video", field: "arts" },
      { text: "Take apart and rebuild electronics", field: "engineering" },
      { text: "Volunteer at a hospital or shelter", field: "premed" },
      { text: "Help a friend through a tough time", field: "psychology" },
    ],
  },
  {
    question: "Which subject excites you the most?",
    options: [
      { text: "Computer Science", field: "cs" },
      { text: "Physics or Math", field: "engineering" },
      { text: "Biology or Chemistry", field: "premed" },
      { text: "Economics or Accounting", field: "finance" },
    ],
  },
  {
    question: "What kind of impact do you want to make?",
    options: [
      { text: "Build technology people use every day", field: "cs" },
      { text: "Engineer solutions to big challenges", field: "engineering" },
      { text: "Improve people's health and wellbeing", field: "premed" },
      { text: "Protect the planet and its ecosystems", field: "environmental" },
    ],
  },
  {
    question: "Which club would you join first?",
    options: [
      { text: "Coding or Robotics Club", field: "cs" },
      { text: "Debate or Mock Trial", field: "prelaw" },
      { text: "HOSA or Red Cross", field: "premed" },
      { text: "DECA or Investment Club", field: "finance" },
    ],
  },
  {
    question: "How do you prefer to work?",
    options: [
      { text: "Creatively, expressing ideas through media", field: "arts" },
      { text: "Hands-on, building prototypes", field: "engineering" },
      { text: "Listening and supporting people one-on-one", field: "psychology" },
      { text: "Leading teams and persuading crowds", field: "prelaw" },
    ],
  },
  {
    question: "Which documentary would you watch?",
    options: [
      { text: "Becoming Warren Buffett", field: "finance" },
      { text: "The Story of Film", field: "arts" },
      { text: "The Vaccine — public health in action", field: "premed" },
      { text: "Our Planet — nature and wildlife", field: "environmental" },
    ],
  },
  {
    question: "What's your dream project?",
    options: [
      { text: "Launch an app used by millions", field: "cs" },
      { text: "Build a robot that competes", field: "engineering" },
      { text: "Discover a new medical treatment", field: "biology" },
      { text: "Argue a case before the Supreme Court", field: "prelaw" },
    ],
  },
  {
    question: "Which phrase describes you best?",
    options: [
      { text: "Analytical and numbers-driven", field: "finance" },
      { text: "Creative and expressive", field: "arts" },
      { text: "Empathetic and a great listener", field: "psychology" },
      { text: "Outspoken and persuasive", field: "prelaw" },
    ],
  },
  {
    question: "If you could fix one problem in the world...",
    options: [
      { text: "Make technology accessible to everyone", field: "cs" },
      { text: "Build sustainable energy systems", field: "environmental" },
      { text: "Cure a disease", field: "biology" },
      { text: "Improve mental health care", field: "psychology" },
    ],
  },
];