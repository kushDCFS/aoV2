import { Wrench, Code, Scale, HeartPulse, TrendingUp, PenTool } from "lucide-react";

// Free & low-cost summer programs sourced from TeenLife's free/low-cost directory
// (teenlife.com/for/free-low-cost-summer-programs) and program websites.

export const tracks = [
  {
    key: "engineering",
    name: "Engineering",
    icon: Wrench,
    competition: {
      name: "Congressional App Challenge",
      url: "https://www.congressionalappchallenge.us/",
      description:
        "A nationwide coding competition hosted by the U.S. House of Representatives. Students in participating districts build an app and submit a demo video. No entry fee. Winners are recognized by their congressional representative.",
      steps: [
        "Check if your congressional district participates at congressionalappchallenge.us",
        "Form a team of up to 4 students or compete solo",
        "Identify a community problem your app can solve",
        "Build the app using free tools: MIT App Inventor, Thunkable, or VS Code with free extensions",
        "Record a 1-3 minute demo video showing the app in action",
        "Submit your app and video by the November deadline",
      ],
    },
    portfolio: {
      title: "CAD Design Portfolio Blueprint ($0)",
      description:
        "Build a 3D CAD portfolio using free Onshape software that demonstrates mechanical design thinking and engineering communication skills.",
      steps: [
        "Create a free Onshape Education account at onshape.com/education",
        "Complete the self-paced Onshape Learning Pathway (free, built-in tutorials)",
        "Design 3 progressive projects: a simple bracket, a multi-part mechanical assembly, and a functional mechanism (e.g., a hinge or clamp)",
        "Document each project with technical drawings: orthographic views with dimensions and tolerances",
        "Render photorealistic images of each model using Onshape's built-in renderer",
        "Publish your portfolio on a free Google Sites or Notion page with a design rationale for each project",
      ],
    },
    shadowing: {
      title: "Virtual Engineering Shadowing Playbook",
      description:
        "Use free virtual platforms to observe engineering work, build technical literacy, and document your learning for college applications.",
      steps: [
        "Create a free account on Trailhead (Salesforce) or Microsoft Learn and complete 2-3 engineering-focused modules",
        "Watch free engineering deep-dive videos on YouTube: Real Engineering, Mark Rober, and Practical Engineering",
        "Use O*NET OnLine (free) to research 3 engineering subfields and their day-to-day responsibilities",
        "Join free engineering webinars from ASME, IEEE, or AIAA (many are open to students at no cost)",
        "Document each shadowing experience in a reflection journal: what you observed, what interested you, and what questions you still have",
        "Reference your virtual shadowing in college application essays to demonstrate genuine field exposure",
      ],
    },
    communityGiving: {
      title: "Assistive Tech & Maker Project (100% Free · $0)",
      description: "Use free CAD software to design custom assistive tools (like pen grips or page turners) for local seniors or students with motor difficulties, using cardboard prototyping or free school 3D printers.",
      steps: [
        "Partner with a school special education class or local senior center to identify physical challenges they face daily.",
        "Use a free Onshape Education account to design simple assistive devices (e.g., customized bottle openers, thick pen holders, or page turners).",
        "Prototype your designs first using free recycled cardboard, tape, and hot glue to test sizing.",
        "Use your school's or local library's free 3D-printing credits (or low-cost scrap materials) to manufacture the final piece.",
        "Deliver the tool to the partner to test and refine the design based on their feedback.",
        "Upload the final STL design files to a free site like Printables or Thingiverse so anyone worldwide can use them.",
      ],
    },
    summerPrograms: [
      {
        name: "MIT Beaver Works Summer Institute (BWSI)",
        url: "https://www.ll.mit.edu/outreach/beaver-works-summer-institute",
        description: "A free, 4-week residential STEM program at MIT for rising high school seniors. Project-based courses in autonomous vehicles, AI, cybersecurity, radar, and more. One of the most prestigious free engineering summer programs in the country.",
        cost: "Free",
        location: "MIT, Cambridge, MA",
        format: "Residential · 4 weeks",
      },
      {
        name: "REHAMS (Recruiting into Engineering High-Ability Multicultural Students)",
        url: "https://www.teenlife.com/l/summer/recruiting-into-engineering-high-ability-multicultural-students-rehams/",
        description: "A free one-week residential camp at LSU for 10th–12th graders from underrepresented backgrounds. Hands-on engineering projects, lab tours, and mentorship from LSU engineering faculty and students.",
        cost: "Free",
        location: "LSU, Baton Rouge, LA",
        format: "Residential · 1 week",
      },
      {
        name: "Startable Pittsburgh",
        url: "https://www.innovationworks.org/programs/youth-programs/",
        description: "A free virtual program teaching students ages 13–18 entrepreneurial and engineering skills through the design and commercialization of hardware products. Participants build their own business, keep all profits, and pitch for prize money. 100% virtual — open to individual students nationwide.",
        cost: "Free",
        location: "Virtual (Pittsburgh-based)",
        format: "Virtual · 2 months",
      },
    ],
  },
  {
    key: "cs",
    name: "Computer Science",
    icon: Code,
    competition: {
      name: "Major League Hacking (MLH) Hackathons",
      url: "https://mlh.io/seasons",
      description:
        "The largest student hackathon organization in the world. Free in-person and online events where you build a project in 24-48 hours. No experience required. Great for building a portfolio and networking with recruiters.",
      steps: [
        "Create a free account at mlh.io and browse upcoming hackathons by season",
        "Join the MLH Discord or your local hackathon's Slack to find teammates",
        "Attend a beginner-friendly hackathon — many offer starter tracks for first-timers",
        "Build a project using free APIs, open-source libraries, and free cloud tiers (Vercel, Netlify, Railway)",
        "Present your project to judges — practice a 2-minute pitch",
        "Add your project to GitHub with a clear README and add it to your college application portfolio",
      ],
    },
    portfolio: {
      title: "GitHub Open-Source Project Blueprint ($0)",
      description:
        "Build and publish a real open-source project on GitHub that demonstrates coding ability, documentation skills, and initiative.",
      steps: [
        "Create a free GitHub account and learn Git basics using GitHub's free interactive guides (skills.github.com)",
        "Choose a project that solves a real problem you personally experience (e.g., a homework tracker, a local transit notifier)",
        "Build the project using a free tech stack: HTML/CSS/JS, or Python with Flask, or React with Vite",
        "Write a professional README.md with: project description, screenshots, installation instructions, and usage examples",
        "Add a free MIT or Apache 2.0 license (GitHub provides templates)",
        "Host the project for free on GitHub Pages, Vercel, or Netlify and link the live demo in your README",
      ],
    },
    shadowing: {
      title: "Free Coding Certificates & Virtual Experience",
      description:
        "Earn verifiable, free industry certifications and complete virtual work-experience modules that simulate real software engineering tasks.",
      steps: [
        "Complete freeCodeCamp's Responsive Web Design or JavaScript Algorithms certifications (free, verifiable)",
        "Complete Forage (formerly InsideSherpa) virtual work experience modules — free simulations of real tech company tasks (e.g., JPMorgan, Deloitte, Accenture)",
        "Earn the free Google Data Analytics or IT Support certificate on Coursera (financial aid available — apply for a full fee waiver)",
        "Contribute to an open-source project on GitHub tagged 'good first issue' — even a documentation fix counts",
        "Document each certificate and virtual experience on your resume under 'Certifications' and 'Projects'",
        "Reference specific technologies and methodologies you learned in your college application essays",
      ],
    },
    communityGiving: {
      title: "Non-Profit Web Solution (100% Free · $0)",
      description: "Build and deploy a free website, donation tracker, or volunteer schedule tool for a local charity, community group, or neighborhood club.",
      steps: [
        "Contact 2-3 local community organizations (e.g., food banks, neighborhood associations) to ask about their tech needs.",
        "Propose a simple web tool (like a community fridge map, volunteer calendar, or static informational landing page).",
        "Code the project using free frameworks: HTML/CSS/JS or React/Vite.",
        "Deploy the website for free on Vercel, Netlify, or GitHub Pages so there are zero hosting costs.",
        "Create a free training guide on a Google Doc to teach their volunteers how to update the text or images.",
        "Hand off the website and publish your code on GitHub to showcase community-first software development.",
      ],
    },
    summerPrograms: [
      {
        name: "Girls Who Code Summer Immersion Program",
        url: "https://girlswhocode.com/",
        description: "A free 2-week summer program for rising 10th–11th grade girls and nonbinary students. Learn coding fundamentals, web development, and tech career pathways. Offered in-person and virtually. Designed to close the gender gap in tech.",
        cost: "Free",
        location: "Various U.S. cities + Virtual",
        format: "In-person or Virtual · 2 weeks",
      },
      {
        name: "Kode with Klossy",
        url: "https://www.kodewithklossy.com/",
        description: "A free coding camp for young women and nonbinary students ages 13–18. Two-week summer sessions covering web development, mobile app development, and data science. No prior coding experience required. Offered in multiple U.S. cities.",
        cost: "Free",
        location: "Various U.S. cities",
        format: "In-person · 2 weeks",
      },
      {
        name: "Google Computer Science Summer Institute (CSSI)",
        url: "https://edu.google.com/programs/cs/",
        description: "A free 3-week residential program for graduating high school seniors committed to pursuing CS degrees. Held at Google offices. Includes project-based coding curriculum, mentorship from Google engineers, and a stipend. Highly selective.",
        cost: "Free (includes stipend)",
        location: "Google offices, various",
        format: "Residential · 3 weeks",
      },
    ],
  },
  {
    key: "law",
    name: "Law & Policy",
    icon: Scale,
    competition: {
      name: "Mock Trial (AMTA / State Bar Associations)",
      url: "https://www.amta.org/",
      description:
        "The premier mock trial competition framework. Students play attorneys and witnesses in a simulated court case. Develops public speaking, legal reasoning, and teamwork. Many states host free regional competitions.",
      steps: [
        "Check if your school has a mock trial team — if not, ask a teacher to start one using the free AMTA case materials",
        "Download the free annual case problem from your state's bar association website (most publish a new case each year)",
        "Assign roles: attorneys (direct/cross examination), witnesses, and a timekeeper",
        "Study the case materials, legal statutes, and rules of evidence (simplified AMTA rules are free online)",
        "Practice direct and cross examinations, opening statements, and closing arguments",
        "Compete in your state's regional tournament — many are free to enter through your school",
      ],
    },
    portfolio: {
      title: "Local City Council Policy Brief Guide ($0)",
      description:
        "Research a local issue and write a professional policy brief that you present to your city council. Demonstrates research, writing, and civic engagement.",
      steps: [
        "Identify a local issue that matters to your community (e.g., public transit, zoning, park funding, youth services)",
        "Research the issue using free public records: city council meeting minutes, budget documents, and local news archives",
        "Find 3-5 data points from free sources: Census Bureau (data.census.gov), Bureau of Labor Statistics, or local government open data portals",
        "Write a 2-3 page policy brief with: Executive Summary, Problem Statement, Data Analysis, Policy Options, and Recommendation",
        "Submit the brief to your city council's public comment portal or present it during a public comment period (free, open to all residents)",
        "Publish the brief on a free Google Sites or Medium page and link it in your college application",
      ],
    },
    shadowing: {
      title: "Virtual Court Observation Playbook",
      description:
        "Observe real court proceedings online for free and document your learning to demonstrate genuine interest in law.",
      steps: [
        "Find your local court's free live stream — many federal and state courts now broadcast proceedings on YouTube or court websites",
        "Watch 3-5 proceedings across different case types (criminal, civil, family, appellate)",
        "Take structured notes: case type, legal arguments, objections sustained/overruled, and judicial reasoning",
        "Research one legal concept from each session using free resources: Cornell Legal Information Institute (law.cornell.edu) or FindLaw",
        "Write a 1-page reflection on each proceeding: what you learned and how it connects to your interest in law",
        "Compile your reflections into a 'Court Observation Journal' and reference it in your college application",
      ],
    },
    communityGiving: {
      title: "Civic Advocacy Campaign (100% Free · $0)",
      description: "Draft a policy brief and present a formal recommendation on local youth or transit issues to your town council using only free public registers.",
      steps: [
        "Select a local civic issue (like public transit routes, student bus fares, or park facilities) that impacts your peers.",
        "Gather supporting data using free public records: town board minutes, local news, and census data (data.census.gov).",
        "Write a 2-page advocacy memo summarizing your research and proposing a budget-neutral solution.",
        "Use free tools (like Google Forms or a paper clipboard) to collect signatures supporting your proposal from local residents.",
        "Request a free public speaking slot at your next city council or school board meeting.",
        "Present your findings and hand over the petition to local officials, documenting their response.",
      ],
    },
    summerPrograms: [
      {
        name: "Legal Outreach Summer Law Institute (SLI)",
        url: "https://legaloutreach.org/?page_id=155",
        description: "A free 5-week program for rising 9th graders in New York City (Brooklyn, Bronx, Manhattan, Queens, Staten Island). Students learn criminal justice, the criminal trial process, and participate in a mock trial competition in front of actual judges. Meets attorneys and judges, attends field trips, and builds critical thinking, writing, and public speaking skills.",
        cost: "Free",
        location: "New York City, NY",
        format: "Day · 5 weeks",
      },
      {
        name: "Massachusetts State Student Trooper Program",
        url: "https://www.teenlife.com/l/summer/massachusetts-state-student-trooper-program/",
        description: "A residential program at the Massachusetts State Police Academy for high school students interested in law enforcement and criminal justice. Hands-on exposure to police training, forensics, and the daily demands of a law enforcement career.",
        cost: "Low Cost (<$500)",
        location: "Massachusetts State Police Academy",
        format: "Residential · 1 week",
      },
    ],
  },
  {
    key: "healthcare",
    name: "Healthcare",
    icon: HeartPulse,
    competition: {
      name: "HOSA — Future Health Professionals",
      url: "https://hosa.org/",
      description:
        "The largest career and technical student organization for future health professionals. Compete in events ranging from medical terminology to clinical nursing to biomedical debate. Low membership fee.",
      steps: [
        "Check if your school has a HOSA chapter — if not, start one using the free charter materials at hosa.org",
        "Choose a competitive event that matches your interest: Medical Terminology, Pharmacology, Biomedical Debate, or Clinical Nursing",
        "Download the free event guidelines and competencies from the HOSA website",
        "Study using free resources: Khan Academy MCAT (for biology/chemistry), free medical terminology apps, and OpenStax Anatomy & Physiology",
        "Practice with your chapter and compete at the regional and state levels",
        "Document your competition results and leadership roles for your college application",
      ],
    },
    portfolio: {
      title: "Clinical Case Study Analysis Guidelines ($0)",
      description:
        "Analyze and write up published clinical case studies to demonstrate scientific thinking and medical knowledge — no clinical access required.",
      steps: [
        "Find free published case studies on PubMed Central (free, full-text articles at pubmed.ncbi.nlm.nih.gov)",
        "Choose 3-5 case studies in your area of interest (e.g., cardiology, neurology, infectious disease)",
        "For each case, write a structured analysis: Patient Presentation, Differential Diagnosis, Diagnostic Workup, Treatment Plan, and Outcome",
        "Research the underlying pathophysiology using free resources: OpenStax Anatomy & Physiology and Khan Academy MCAT Biology",
        "Write a 1-2 page analysis for each case in your own words, citing the original PubMed source",
        "Compile your analyses into a portfolio document and reference it in your college application as evidence of independent medical study",
      ],
    },
    shadowing: {
      title: "Free Medical Certifications & Virtual Shadowing",
      description:
        "Earn free healthcare certifications and complete virtual shadowing modules to demonstrate clinical exposure without needing in-person access.",
      steps: [
        "Complete the free Medical Terminology course on Coursera (apply for financial aid for a full fee waiver and certificate)",
        "Sign up for free virtual shadowing sessions through Health Occupations Students of America partners or YouTube channels like 'Doctor in the House'",
        "Complete the free HIPAA training module (many free providers online) — add it to your resume as a certification",
        "Watch free grand rounds and medical lectures on YouTube channels: Osmosis, Armando Hasudungan, and Ninja Nerd",
        "Document each virtual shadowing session: specialty observed, procedures discussed, and your reflections",
        "Log your hours and reference your virtual clinical exposure in your college application essays",
      ],
    },
    communityGiving: {
      title: "Public Health Awareness Campaign (100% Free · $0)",
      description: "Design and distribute free digital or paper-printed health flyers (such as heat safety or student mental health guides) utilizing free design software and library printing allowances.",
      steps: [
        "Pick a relevant public health topic for your community (e.g., teen stress management, heat stroke prevention, or nutrition tips).",
        "Source accurate guidance from reputable free sites: CDC (cdc.gov) or World Health Organization (who.int).",
        "Create engaging infocards or brochures using Canva's free tier.",
        "Translate your guides into multiple languages spoken locally (utilize free translation tools or bilingual classmates).",
        "Share the guides digitally via local community Facebook pages, school newsletters, or by printing them for free using school/library printing allowances.",
        "Send your digital guides to school nurses and local clinics to host on their resources page.",
      ],
    },
    summerPrograms: [
      {
        name: "Public Health Leadership & Medical Academy Summer Institute",
        url: "https://www.bcph.org/institute/",
        description: "A college-preparatory summer institute exploring public health, clinical medicine, and social justice. Available in-person and via download. Includes campus immersion tours of Harvard, UCLA, Georgetown, the White House, and the Supreme Court. Students earn certificates in Public Health and Academic Journalism, plus a free journal publication and mock interview prep.",
        cost: "Low Cost (<$500)",
        location: "Boston, DC, Los Angeles + Online",
        format: "In-person or Online · 1 week",
      },
      {
        name: "SHPEP (Summer Health Professions Education Program)",
        url: "https://www.shpep.org/",
        description: "A fully free, funded summer program for students from underrepresented backgrounds exploring medicine, dentistry, nursing, pharmacy, and public health. Held at partner universities (Columbia, Howard, Rutgers, UCLA, and more). The #1 pipeline program for diverse health professionals. Includes clinical exposure, academic planning, and networking.",
        cost: "Free (includes housing + stipend)",
        location: "Multiple university campuses",
        format: "Residential · 6 weeks",
      },
    ],
  },
  {
    key: "finance",
    name: "Finance",
    icon: TrendingUp,
    competition: {
      name: "Wharton Global High School Investment Competition",
      url: "https://globalyouth.wharton.upenn.edu/programs/investment-competition/",
      description:
        "A free global competition from the Wharton School where teams manage a $100,000 virtual portfolio. Top teams present their strategy to Wharton faculty. No entry fee. One of the most prestigious high school finance competitions.",
      steps: [
        "Form a team of 4-7 students at your school and register for free at the Wharton Global Youth website",
        "Study the competition rules and the Wharton investment framework (provided free after registration)",
        "Research sectors and companies using free tools: Yahoo Finance, SEC EDGAR (free filings), and company investor relations pages",
        "Build a portfolio with a written investment strategy and rationale for each holding",
        "Submit your mid-term and final team deliverables (written reports, not just portfolio performance)",
        "Top teams are invited to present their strategy to Wharton faculty — a standout achievement for any college application",
      ],
    },
    portfolio: {
      title: "Open-Source Equity Research Report Template ($0)",
      description:
        "Write a professional equity research report on a public company using only free data sources. Demonstrates analytical ability and financial literacy.",
      steps: [
        "Choose a publicly traded company with accessible free financial data (e.g., a large-cap stock on the S&P 500)",
        "Download the company's 10-K and 10-Q filings for free from SEC EDGAR (sec.gov/edgar)",
        "Analyze the financials using free resources: Yahoo Finance for ratios, company investor relations pages for guidance",
        "Write a structured equity research report: Investment Thesis, Business Overview, Financial Analysis, Valuation, Risks, and Recommendation (Buy/Hold/Sell)",
        "Build a simple DCF or comparable company valuation using a free Google Sheets template (many free templates available online)",
        "Publish your report on a free Google Sites or Notion page and link it in your college application as a writing sample",
      ],
    },
    shadowing: {
      title: "Virtual Finance Experience & Stock Market Simulation",
      description:
        "Use free virtual platforms to simulate finance work, build a track record, and demonstrate market literacy.",
      steps: [
        "Create a free account on Investopedia's Stock Simulator and manage a $100,000 virtual portfolio for 3+ months",
        "Complete free Forage (formerly InsideSherpa) virtual work experience modules for JPMorgan, Citi, or Deloitte — these simulate real finance tasks",
        "Read free financial news daily: Bloomberg (free tier), WSJ (student rate), and Yahoo Finance",
        "Join a free Discord or Reddit community like r/investing or r/financialcareers to learn from others",
        "Document your portfolio performance, investment thesis, and lessons learned in a quarterly reflection",
        "Reference your virtual finance experience and portfolio track record in your college application",
      ],
    },
    communityGiving: {
      title: "Financial Literacy Workshops (100% Free · $0)",
      description: "Host free peer mentoring sessions teaching basic budgeting, student savings, and credit basics using free Google Sheets tools and free venues (like classrooms or public library rooms).",
      steps: [
        "Reach out to a school counselor, local youth club, or library coordinator to reserve a free meeting room or classroom slot.",
        "Design 3 core educational modules: personal budgeting, credit pitfalls, and saving frameworks.",
        "Build a sample student budget template using free Google Sheets that participants can copy and use.",
        "Deliver the workshops in-person or host them for free via Zoom/Google Meet.",
        "Distribute your custom budgeting templates digitally so classmates can track their goals for free.",
        "Gather feedback forms (via free Google Forms) to document your teaching's community impact.",
      ],
    },
    summerPrograms: [
      {
        name: "Wharton Summer High School Programs",
        url: "https://globalyouth.wharton.upenn.edu/",
        description: "Residential summer programs at the Wharton School (UPenn) for students in grades 9–11. Programs include Future of the Business World, Moneyball Academy (data analytics), Management & Technology Summer Institute, and Saturn Parable. Led by Wharton faculty. Scholarships and financial aid available for students with demonstrated need.",
        cost: "Free (with scholarship) / Varies",
        location: "Philadelphia, PA",
        format: "Residential · 4 weeks",
      },
      {
        name: "UT Austin McCombs: DYNAMC",
        url: "https://www.mccombs.utexas.edu/undergraduate-programs/bba/academics/bba-summer-high-school-programs/",
        description: "Discover Yourself In Accounting Majors and Careers (DYNAMC) is a free 6-day residential program at UT Austin for current sophomores and juniors. Learn from world-renowned faculty, network with industry professionals, and receive mentorship from current UT student leaders. Requires a minimum 3.5 GPA.",
        cost: "Free",
        location: "Austin, TX",
        format: "Residential · 1 week",
      },
      {
        name: "Startable Pittsburgh",
        url: "https://www.innovationworks.org/programs/youth-programs/",
        description: "A free virtual program teaching students ages 13–18 entrepreneurial and engineering skills through the design and commercialization of hardware products. Participants build their own business, keep all profits, and pitch for prize money. 100% virtual — open to individual students nationwide.",
        cost: "Free",
        location: "Virtual (Pittsburgh-based)",
        format: "Virtual · 2 months",
      },
    ],
  },
  {
    key: "humanities",
    name: "Humanities & Creative Writing",
    icon: PenTool,
    competition: {
      name: "Scholastic Art & Writing Awards",
      url: "https://www.artandwriting.org/",
      description:
        "The nation's longest-running, most prestigious recognition program for creative teens. Awards, exhibitions, and scholarships for art and writing submissions. Fee waivers available for students with financial need.",
      steps: [
        "Create a free account at artandwriting.org and review the categories (poetry, short story, personal essay, journalism, critical essay, and more)",
        "Review past winning works (free online gallery) to understand the quality bar",
        "Write or revise 2-3 pieces in your strongest category — aim for originality and craft",
        "Ask an English teacher or mentor to review your work before submission",
        "Submit by the December deadline — apply for a fee waiver if cost is a barrier (Scholastic offers them)",
        "Even a regional Gold Key award is a significant recognition for your college application",
      ],
    },
    portfolio: {
      title: "Digital Independent School Newspaper Blueprint ($0)",
      description:
        "Start and run a digital school newspaper using free tools. Demonstrates journalism, leadership, and digital media skills.",
      steps: [
        "Choose a free publishing platform: Google Sites, WordPress.com (free tier), or Notion (free for students)",
        "Define your newspaper's scope: school news, opinion, arts reviews, or community issues",
        "Recruit 3-5 writers and assign beats (news, opinion, sports, arts, features)",
        "Publish 1-2 articles per week — use free tools like Canva for graphics and Unsplash for stock photos",
        "Promote the newspaper through school social media accounts and a free email newsletter (Substack or Mailchimp free tier)",
        "Archive every issue and document your role (Editor-in-Chief, Managing Editor, etc.) for your college application",
      ],
    },
    shadowing: {
      title: "Virtual Journalism Workshops & Media Literacy",
      description:
        "Use free online journalism training and media literacy resources to build reporting skills and demonstrate genuine interest in the field.",
      steps: [
        "Complete free journalism courses on Poynter's News University (poynter.org) — many are free or low-cost",
        "Watch free journalism masterclasses on YouTube: Poynter, Reuters Institute, and Columbia Journalism Review",
        "Complete the free News Literacy Project's Checkology modules (thenewsliteracyproject.org) — verifiable certificate",
        "Read 3-5 long-form articles per week from free sources: ProPublica, The Marshall Project, and local public radio",
        "Write a media analysis essay: compare coverage of the same story across 3 outlets and analyze framing, sourcing, and bias",
        "Compile your coursework, certificates, and writing samples into a portfolio for your college application",
      ],
    },
    communityGiving: {
      title: "Community Literacy & Zine Clinic (100% Free · $0)",
      description: "Host creative writing circles for younger children at a library or shelter, compiling their stories into a free digital zine hosted online for their families.",
      steps: [
        "Partner with a local elementary school, shelter, or community center to coordinate free writing circles for kids.",
        "Draft fun, creative prompts (e.g., character creation, fable writing) that require only pencil and paper.",
        "Facilitate a 3-week workshop guiding students through writing and illustrating their own stories.",
        "Scan or photograph their stories and type them into a digital zine format using Canva's free tools.",
        "Publish the completed anthology for free on digital reading sites (like Issuu, Notion, or school website pages).",
        "Host a free reading celebration (in person or on Zoom) where the kids can read their stories to family and friends.",
      ],
    },
    summerPrograms: [
      {
        name: "Docs In Progress: Summer Teen Workshops",
        url: "https://www.docsinprogress.org/youth",
        description: "Free in-person summer filmmaking workshops in Silver Spring, MD for ages 13–17. Students work in small teams to plan, shoot, and edit short documentary films for local partners or personal projects. Hands-on access to cameras and editing tools. Finished films are screened for family and community audiences.",
        cost: "Free",
        location: "Silver Spring, MD",
        format: "Day · 1–2 weeks",
      },
      {
        name: "United Boys & Girls Club: Teen Film Camp at Camp Whittier",
        url: "https://www.teenlife.com/l/summer/united-boys-girls-club-teen-film-camp-at-camp-whittier/",
        description: "A residential film camp in Santa Barbara, CA offered in partnership with the Santa Barbara International Film Festival. Students learn filmmaking fundamentals, produce short films, and screen their work. Designed for students who may not otherwise have access to film education.",
        cost: "Low Cost (<$500)",
        location: "Santa Barbara, CA",
        format: "Residential · 1 week",
      },
    ],
  },
];