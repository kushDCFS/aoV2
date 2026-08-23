/**
 * National & leadership programs for high school students.
 *
 * This is the file for the programs that are not about one academic subject —
 * civic, leadership, government, national-service, and pipeline programs, plus
 * the competitions that function as programs because the money is real.
 *
 * It is also, by design, the poorest-friendly file in the catalog. Most entries
 * here are free, need-blind, or pay the student. That is not a coincidence: a
 * program that costs nothing has no marketing budget, so these are precisely
 * the programs a student without a private counselor never hears about.
 *
 * ---------------------------------------------------------------------------
 * THE `cost` ENUM — see index.js for the canonical definition
 * ---------------------------------------------------------------------------
 *   "pays-student" / "free" / "free-plus-aid" / "costs-money" / "varies" /
 *   "unknown"  — "unknown" is used honestly, never as a guess.
 *
 * ---------------------------------------------------------------------------
 * "YOU HAVE BEEN NOMINATED!" — READ THIS BEFORE TRUSTING A LETTER
 * ---------------------------------------------------------------------------
 * This category is where nomination-mail preys on exactly the students this
 * site is for. The pattern: an official-looking letter or email says a student
 * has been "selected" or "nominated" for a leadership congress, a young
 * scholars academy, or a national honor society — then asks for $1,000–$5,000.
 * The selection is a purchased mailing list. Entries here that admit anyone who
 * pays carry `openEnrollment: true`, and the ones that market implied
 * selectivity carry a `note` saying so plainly. A real free program never asks
 * a family for money to accept a place.
 *
 * ---------------------------------------------------------------------------
 * DEADLINES
 * ---------------------------------------------------------------------------
 * `deadlineISO` only when the host publishes an exact date. `deadline` is the
 * human string exactly as published. Never derive one from the other. Programs
 * whose current cycle has closed carry the human string describing the annual
 * window and no ISO, because next year's exact date does not exist yet.
 *
 * Every `url` is the program's own page on the host's domain. No aggregators,
 * no consulting sites — those dominate search for these terms and are the
 * single biggest source of wrong information about free programs.
 */

export const nationalPrograms = [
  // ---------------------------------------------------------------------
  // FULL-RIDE SELECTIVE SUMMERS — free, and they cover everything.
  // ---------------------------------------------------------------------
  {
    id: "telluride-tass",
    name: "TASS",
    fullName: "Telluride Association Summer Seminar",
    host: "Telluride Association",
    category: "national",
    url: "https://www.tellurideassociation.org/our-programs/high-school-students/",
    cost: "free-plus-aid",
    costDetail:
      "Telluride Association covers all program costs for every student — tuition, books, room and board, field trips and facilities fees. Additional financial aid is available for travel, and to replace earnings a student would have made at a summer job",
    financialAid: true,
    format: "in-person",
    location: "Varies by host university",
    eligibility:
      "High school sophomores and juniors; age 15 at program start and no older than 17 at program end. US and international students both eligible",
    deadline: "Applications open mid-October and close in early December",
    residential: true,
    verified: true,
    verifiedOn: "2026-08-23",
    note: "The 2026 cycle opened October 15, 2025 and closed December 3, 2025; the 2027 dates are not yet published, so no deadlineISO. The travel-and-lost-wages aid is the part students miss — TASS will replace the money a student would have earned working that summer.",
  },
  {
    id: "leda-aspects-of-leadership",
    name: "LEDA Aspects of Leadership",
    fullName: "LEDA Aspects of Leadership Summer Institute",
    host: "Leadership Enterprise for a Diverse America",
    category: "national",
    url: "https://www.ledascholars.org/apply",
    cost: "free",
    costDetail:
      "An intensive seven-week program, described by LEDA as completely free of charge",
    financialAid: true,
    format: "in-person",
    location: "Princeton, NJ",
    eligibility:
      "Junior at a US public high school; US citizen, permanent resident or DACA status; cumulative unweighted GPA of 3.5 or above; annual household income of $90,000 or below, with assets also considered",
    deadline: "Application opens in September",
    residential: true,
    verified: true,
    verifiedOn: "2026-08-23",
    note: "LEDA's own page says the Summer 2027 application opens in September 2026 but does not publish a closing date, so no deadlineISO. Public-school-only is a real restriction and is easy to miss.",
  },
  {
    id: "questbridge-college-prep-scholars",
    name: "QuestBridge College Prep Scholars",
    fullName: "QuestBridge College Prep Scholars Program",
    host: "QuestBridge",
    category: "national",
    url: "https://www.questbridge.org/high-school-students/college-prep-scholars",
    cost: "free",
    costDetail:
      "No fee to apply or participate. Scholars receive scholarships, awards and college-admissions resources rather than paying anything",
    financialAid: true,
    format: "hybrid",
    location: "National, with awards including all-expenses-paid campus visits",
    eligibility:
      "High school juniors earning primarily A's in challenging courses with strong writing ability; household income under $65,000 for a family of four with minimal assets",
    deadline: "Spring of junior year",
    residential: false,
    verified: true,
    verifiedOn: "2026-08-23",
    note: "The landing page does not publish an exact date, so no deadlineISO — check QuestBridge's own application page. This is the single highest-leverage entry in the catalog for a low-income junior: it is the on-ramp to the National College Match, which is a full four-year scholarship.",
  },
  {
    id: "a-better-chance",
    name: "A Better Chance",
    fullName: "A Better Chance College Preparatory Schools Program",
    host: "A Better Chance",
    category: "national",
    url: "https://www.abetterchance.org/",
    cost: "varies",
    costDetail:
      "A Better Chance places students at member independent and public schools and works with those schools to leverage financial aid; the organization does not publish a participation cost on its site",
    financialAid: true,
    format: "in-person",
    location: "National — member schools across the US",
    eligibility:
      "High-performing students of color from underserved communities; the site does not publish detailed grade or income criteria",
    deadline: "February 3 – April 15",
    deadlineISO: "2027-04-15",
    residential: true,
    verified: true,
    verifiedOn: "2026-08-23",
    note: "The homepage states applications are open annually from February 3 to April 15; the ISO is that published recurring close date carried to the next cycle. This is a school-placement pipeline, not a summer program — students enter for the school year.",
  },
  {
    id: "summer-search",
    name: "Summer Search",
    fullName: "Summer Search",
    host: "Summer Search",
    category: "national",
    url: "https://summersearch.org/",
    cost: "free",
    costDetail:
      "Free to participants — long-term mentoring, funded summer experiences, career guidance and post-secondary support at no cost to the student",
    financialAid: true,
    format: "hybrid",
    location: "Bay Area, Boston, New York City, Philadelphia and Seattle",
    eligibility:
      "High school students from under-resourced communities; students enter as sophomores",
    deadline: "Applications for high school sophomores open in the fall",
    residential: false,
    verified: true,
    verifiedOn: "2026-08-23",
    note: "No exact date published, so no deadlineISO. Multi-year rather than one summer: a student who joins as a sophomore keeps a mentor through college.",
  },
  {
    id: "sadie-nash-leadership-project",
    name: "Sadie Nash Leadership Project",
    fullName: "Sadie Nash Leadership Project Summer Institute",
    host: "Sadie Nash Leadership Project",
    category: "national",
    url: "https://www.sadienash.org/",
    cost: "unknown",
    costDetail:
      "Cost and stipend information is not published on the pages fetched; several Sadie Nash tracks are known to include stipends but the amount could not be verified",
    financialAid: false,
    format: "in-person",
    location: "New York, NY and Newark, NJ",
    eligibility:
      "Young women and gender-expansive youth of color; the site does not publish specific grade or age criteria on its landing page",
    residential: false,
    verified: false,
    verifiedOn: "2026-08-23",
    note: "Landing page loads and the organization is clearly active, but cost, stipend, eligibility detail and deadline are all on pages that could not be confirmed — so all four are left blank rather than guessed. Worth a phone call: (212) 391-8664.",
  },
  {
    id: "prep-for-prep",
    name: "Prep for Prep",
    fullName: "Prep for Prep",
    host: "Prep for Prep",
    category: "national",
    url: "https://www.prepforprep.org/",
    cost: "unknown",
    costDetail:
      "No cost or tuition figure is published on the site; Prep for Prep places students at independent day and boarding schools and supports them through placement",
    financialAid: true,
    format: "in-person",
    location: "New York, NY",
    eligibility:
      "New York City public school students in 5th and 6th grade (entering 7th) or in 7th grade (entering 9th) — NOT open to current high school students",
    residential: false,
    verified: true,
    verifiedOn: "2026-08-23",
    note: "Listed for a student's younger siblings, not for the student: entry points are 5th–7th grade and close before high school. A high schooler who finds this has already aged out, which is exactly why it belongs in a catalog aimed at families without a counselor.",
  },

  // ---------------------------------------------------------------------
  // GOVERNMENT & CIVIC
  // ---------------------------------------------------------------------
  {
    id: "us-senate-page",
    name: "US Senate Page Program",
    fullName: "United States Senate Page Program",
    host: "United States Senate",
    category: "national",
    url: "https://pageprogram.senate.gov/",
    cost: "unknown",
    costDetail:
      "Pages are employed by the Senate Sergeant at Arms and live in the Daniel Webster Senate Page Residence; neither the pay rate nor the room-and-board charge is published on the pages fetched",
    financialAid: false,
    format: "in-person",
    location: "Washington, DC",
    eligibility:
      "High school juniors, at least 16 years old and currently enrolled in school. A senator must appoint and sponsor each candidate",
    deadline: "Set by each senator's office",
    residential: true,
    verified: true,
    verifiedOn: "2026-08-23",
    note: "There is no central application and no national deadline — a student must contact their own senator's office, and each office runs its own timeline. Four sessions run per year: two academic semesters and two summer sessions of 3–4 weeks. Page School courses are all Honors level and appear on the transcript as such.",
  },
  {
    id: "congressional-award",
    name: "Congressional Award",
    fullName: "The Congressional Award",
    host: "United States Congress",
    category: "national",
    url: "https://www.congressionalaward.org/",
    cost: "unknown",
    costDetail: "Not verified — the official site refused an automated fetch",
    financialAid: false,
    format: "hybrid",
    location: "National — self-directed, done wherever the student lives",
    eligibility: "Not verified from the official page",
    residential: false,
    verified: false,
    verifiedOn: "2026-08-23",
    note: "Official site returned HTTP 403 to an automated fetch, so nothing here is confirmed and every field a student would rely on is left blank. The URL is Congress's own domain and is safe to visit by hand; re-verify manually before a student plans around it.",
  },
  {
    id: "national-youth-science-camp",
    name: "National Youth Science Camp",
    fullName: "National Youth Science Camp",
    host: "National Youth Science Academy",
    category: "national",
    url: "",
    cost: "unknown",
    costDetail:
      "Historically a fully-funded delegate program including travel, but this could not be confirmed against a working official page",
    financialAid: false,
    format: "in-person",
    location: "West Virginia",
    eligibility: "Not verified — graduating seniors selected as state delegates",
    residential: true,
    verified: false,
    verifiedOn: "2026-08-23",
    note: "url deliberately left empty: nysc.org redirects to nysf.com which redirects again to nysacademy.org, and that final page returned 404. Rather than send a student to a broken chain, the entry records that the program exists and needs a human to find its current home.",
  },

  // ---------------------------------------------------------------------
  // PAID WORK & INTERNSHIPS
  // ---------------------------------------------------------------------
  {
    id: "bofa-student-leaders",
    name: "BofA Student Leaders",
    fullName: "Bank of America Student Leaders",
    host: "Bank of America",
    category: "national",
    url: "https://about.bankofamerica.com/en/making-an-impact/student-leaders",
    cost: "pays-student",
    costDetail:
      "A paid internship with a local nonprofit, plus an all-expenses Leadership Summit in Washington, DC. Bank of America's page describes it as a paid six-week internship but does not publish the wage",
    financialAid: false,
    format: "in-person",
    location: "National — students are placed with a nonprofit in their own city",
    eligibility:
      "High school juniors and seniors; the landing page directs applicants to a separate eligibility and FAQ page for specifics",
    deadline: "Applications typically open in the fall",
    residential: false,
    verified: true,
    verifiedOn: "2026-08-23",
    note: "Neither the wage nor an exact deadline is published on the page fetched, so neither is recorded. Note the program page describes six weeks; some Bank of America materials say eight — the six-week figure here is the one on the official page.",
  },

  // ---------------------------------------------------------------------
  // COMPETITIONS THAT FUNCTION AS PROGRAMS — the money is real.
  // ---------------------------------------------------------------------
  {
    id: "regeneron-sts",
    name: "Regeneron STS",
    fullName: "Regeneron Science Talent Search",
    host: "Society for Science",
    category: "national",
    url: "https://www.societyforscience.org/regeneron-sts/",
    cost: "free",
    costDetail:
      "$3.1 million in awards annually; first place is $250,000. The 2026 finalists competed for over $1.8 million. No entry fee is listed on the program page",
    financialAid: false,
    format: "hybrid",
    location: "National — Finals Week is held in Washington, DC",
    eligibility:
      "High school seniors submitting original research; see the Official Rules for full criteria",
    deadline: "November 5, 2026 at 8pm ET",
    deadlineISO: "2026-11-05",
    residential: false,
    verified: true,
    verifiedOn: "2026-08-23",
    note: "For the 2027 cycle: applications June 1 – November 5, 2026; top 300 Scholars announced January 7, 2027; top 40 Finalists January 21, 2027; Finals Week March 11–17, 2027. The oldest and most prestigious science research competition for US high schoolers, and it costs nothing to enter.",
  },
  {
    id: "regeneron-isef",
    name: "Regeneron ISEF",
    fullName: "Regeneron International Science and Engineering Fair",
    host: "Society for Science",
    category: "national",
    url: "https://www.societyforscience.org/isef/",
    cost: "free",
    costDetail:
      "More than $7 million in awards and prizes distributed. Finalists qualify through affiliated fairs; no participation cost is published on the ISEF page",
    financialAid: false,
    format: "in-person",
    location: "Varies annually — 2026 was Phoenix, AZ",
    eligibility:
      "High school students who first place at a Society-affiliated local, regional, state or national science fair. Finalists come from 365 affiliate fairs in more than 60 countries",
    deadline: "Set by each affiliated regional fair",
    residential: true,
    verified: true,
    verifiedOn: "2026-08-23",
    note: "There is no ISEF deadline to meet — a student qualifies by winning a local affiliated fair, and that fair sets its own date. Find the local one through Society for Science's Find-a-Fair database. The 2026 fair ran May 9–15 with more than 1,700 finalists.",
  },
  {
    id: "davidson-fellows",
    name: "Davidson Fellows",
    fullName: "Davidson Fellows Scholarship",
    host: "Davidson Institute",
    category: "national",
    url: "https://www.davidsongifted.org/gifted-programs/fellows-scholarship/",
    cost: "free",
    costDetail:
      "Scholarships of $100,000, $50,000 and $25,000. No entry fee is listed",
    financialAid: false,
    format: "remote",
    location: "National — application is submitted remotely",
    eligibility:
      "18 or younger at the application deadline; US citizen or permanent resident residing in the US, or stationed overseas on active military duty; must have completed a significant piece of work in one of eight categories and be able to show the work is their own. Two-person teams are permitted",
    deadline: "Application opens in the fall",
    residential: false,
    verified: true,
    verifiedOn: "2026-08-23",
    note: "The 2026 application is closed and the 2027 application opens in Fall 2026 — no exact date is published, so no deadlineISO. Categories: Science, Technology, Engineering, Mathematics, Literature, Music, Philosophy, and Outside the Box. The Outside the Box category is genuinely open-ended and is the one most students overlook.",
  },
  {
    id: "scholastic-art-writing",
    name: "Scholastic Art & Writing Awards",
    fullName: "Scholastic Art & Writing Awards",
    host: "Alliance for Young Artists & Writers",
    category: "national",
    url: "https://www.artandwriting.org/awards/how-to-enter/",
    cost: "costs-money",
    costDetail:
      "$15 per individual entry, $40 for a senior portfolio — but every region offers fee waivers for teens who cannot afford the entry fee, so the real cost to a low-income student is zero if they ask",
    financialAid: true,
    format: "remote",
    location: "National — judged by region, with a national ceremony",
    eligibility:
      "Students in grades 7–12; portfolio entries are open only to current seniors",
    deadline: "Set by region, beginning in December",
    residential: false,
    verified: true,
    verifiedOn: "2026-08-23",
    note: "Marked costs-money because a fee exists, but the fee waiver is universal across regions and is the whole point — a student who cannot pay should request one rather than skip the competition. Deadlines are regional and there is no single national date, so no deadlineISO.",
  },
  {
    id: "congressional-app-challenge",
    name: "Congressional App Challenge",
    fullName: "Congressional App Challenge",
    host: "United States Congress",
    category: "national",
    url: "https://www.congressionalappchallenge.us/students/rules/",
    cost: "free",
    costDetail:
      "No entry fee is listed in the official rules. Winning apps are displayed in the US Capitol and winners are recognized by their member of Congress",
    financialAid: false,
    format: "remote",
    location: "National — competition is by congressional district",
    eligibility:
      "Middle or high school students who are US residents at the time of submission. Teams of up to four are allowed, with at least half of the teammates eligible in the competition district",
    deadline: "October 26",
    deadlineISO: "2026-10-26",
    residential: false,
    verified: true,
    verifiedOn: "2026-08-23",
    note: "Any programming language, any platform, any topic — there are no restrictions on what the app does. Because it is judged per congressional district rather than nationally, the field a student competes against is small, which makes this one of the highest odds-to-prestige ratios available. Pre-registration opens January 1; judging in November; winners announced in December.",
  },
  {
    id: "diamond-challenge",
    name: "Diamond Challenge",
    fullName: "Diamond Challenge for High School Entrepreneurs",
    host: "University of Delaware Horn Entrepreneurship",
    category: "national",
    url: "https://diamondchallenge.org/",
    cost: "unknown",
    costDetail:
      "Over $100,000 in total awards. Grand prizes in each of two tracks: $12,000 first, $8,000 second, $4,500 third. No entry fee is stated on the page fetched",
    financialAid: false,
    format: "hybrid",
    location: "Newark, DE for the finals; earlier rounds are submitted remotely",
    eligibility: "High school students worldwide",
    residential: false,
    verified: true,
    verifiedOn: "2026-08-23",
    note: "Two tracks — business innovation and social innovation — plus topical prizes in waste and recycling, technology, economic prosperity, global entrepreneurship and human flourishing. Neither the entry fee nor the submission deadline is published on the landing page, so both are left blank; check the Compete section before relying on either.",
  },
  {
    id: "conrad-challenge",
    name: "Conrad Challenge",
    fullName: "Conrad Challenge",
    host: "Conrad Foundation",
    category: "national",
    url: "",
    cost: "unknown",
    costDetail: "Not verified — the official site could not be reached",
    financialAid: false,
    format: "hybrid",
    location: "Not verified",
    eligibility: "Not verified — historically open to students aged 13–18",
    residential: false,
    verified: false,
    verifiedOn: "2026-08-23",
    note: "url deliberately left empty: conradchallenge.org failed TLS negotiation on repeated attempts, so no field here could be confirmed and none is guessed. The program appears to exist and is worth a manual check; do not publish a link until someone loads it in a browser.",
  },

  // ---------------------------------------------------------------------
  // CIVIC & GOVERNMENT — the state-by-state and nomination-based ones.
  // ---------------------------------------------------------------------
  {
    id: "american-legion-boys-state",
    name: "Boys State",
    fullName: "American Legion Boys State",
    host: "The American Legion",
    category: "national",
    url: "https://www.legion.org/get-involved/youth-programs/boys-state-boys-nation/boys-state-eligibility-dates",
    cost: "varies",
    costDetail:
      "Cost is not published nationally and varies by state. In most states the sponsoring American Legion post covers the delegate's registration fee, so the typical out-of-pocket cost to a selected student is low or zero — but this must be confirmed with the local post",
    financialAid: true,
    format: "in-person",
    location: "All 50 states — each state runs its own program, usually at a state capital or university",
    eligibility:
      "Currently enrolled high school students, in practice rising seniors, who show leadership, character, scholarship, loyalty and service; must not have previously attended a Boys State. Parent and physician consent required",
    deadline: "Set by each state program and local post",
    residential: true,
    verified: true,
    verifiedOn: "2026-08-23",
    note: "One entry for all 50 programs, because the national page is the honest starting point: dates, fees and deadlines differ by state and are listed on the Legion's Boys State Sites and Dates page. Selection normally runs school → local Legion post → interview, so a student without a counselor should contact their local post directly rather than wait to be recommended. That single phone call is the whole barrier here.",
  },
  {
    id: "american-legion-boys-nation",
    name: "Boys Nation",
    fullName: "American Legion Boys Nation",
    host: "The American Legion",
    category: "national",
    url: "https://www.legion.org/get-involved/youth-programs/boys-state-boys-nation",
    cost: "varies",
    costDetail:
      "Delegates are selected and sponsored out of Boys State; the national page does not publish a delegate cost",
    financialAid: true,
    format: "in-person",
    location: "Washington, DC",
    eligibility:
      "Two delegates are selected from each state's Boys State program — a student cannot apply directly",
    deadline: "Not applicable — selection happens at Boys State",
    residential: true,
    verified: true,
    verifiedOn: "2026-08-23",
    note: "Delegates serve as US senators through mock sessions, party conventions and visits to national landmarks. There is no application: the only path is to attend Boys State first and be chosen there.",
  },
  {
    id: "ala-girls-state",
    name: "Girls State",
    fullName: "American Legion Auxiliary Girls State",
    host: "American Legion Auxiliary",
    category: "national",
    url: "https://www.legion-aux.org/ala-girls-state",
    cost: "free",
    costDetail:
      "The Auxiliary states that the cost of ALA Girls State programs is underwritten by each state-level Auxiliary, with delegates' registration fees paid by the sponsoring local unit and additional support sometimes coming from civic and nonprofit organizations",
    financialAid: true,
    format: "in-person",
    location: "All 50 states — each state runs its own program",
    eligibility:
      "High school students who have completed their junior year, competitively selected and sponsored by American Legion Auxiliary units",
    deadline: "Set by each state program and local unit",
    residential: true,
    verified: false,
    verifiedOn: "2026-08-23",
    note: "Details came from the Auxiliary's own indexed pages rather than a direct page load — alaforveterans.org now redirects to legion-aux.org and the fetch did not complete, so this is marked unverified pending a manual check. The funding note is the important part: a selected delegate's fee is normally paid by the sponsoring unit. Students should contact a school counselor or the local Auxiliary unit about the application process and deadline.",
  },
  {
    id: "ala-girls-nation",
    name: "Girls Nation",
    fullName: "American Legion Auxiliary Girls Nation",
    host: "American Legion Auxiliary",
    category: "national",
    url: "https://www.legion-aux.org/ala-girls-nation",
    cost: "varies",
    costDetail: "Not verified from a direct page load",
    financialAid: true,
    format: "in-person",
    location: "Washington, DC",
    eligibility:
      "Delegates are selected from each state's ALA Girls State program — a student cannot apply directly",
    deadline: "Not applicable — selection happens at Girls State",
    residential: true,
    verified: false,
    verifiedOn: "2026-08-23",
    note: "The Girls State counterpart to Boys Nation. Marked unverified for the same reason as the Girls State entry: the Auxiliary domain moved and a direct fetch did not complete.",
  },
  {
    id: "civil-air-patrol-cadets",
    name: "Civil Air Patrol Cadets",
    fullName: "Civil Air Patrol Cadet Program",
    host: "Civil Air Patrol",
    category: "national",
    url: "https://www.gocivilairpatrol.com/programs/cadets",
    cost: "costs-money",
    costDetail:
      "Annual dues of $25–$50 depending on location. CAP estimates a fully-active first-year cadet may spend $300–$600 — but financial assistance exists for uniforms and overnight activities through CadetInvest, the Cadet Encampment Assistance Program, Curry Uniform Vouchers, and LIFT/TOP financial assistance",
    financialAid: true,
    format: "in-person",
    location: "950+ squadrons nationwide plus 12 overseas locations at US military installations",
    eligibility: "Young people aged 12 through 18",
    deadline: "Rolling — squadrons accept new cadets year-round",
    residential: false,
    verified: true,
    verifiedOn: "2026-08-23",
    note: "Listed as costs-money honestly, but the aid stack is unusually complete: encampment fees, uniforms and activity costs all have named assistance programs, so a student who cannot pay should apply anyway and ask. Commitment is roughly a two-hour weekly squadron meeting, a monthly Saturday event, and a week-long summer encampment. Over 33,000 cadets.",
  },
  {
    id: "rotary-ryla",
    name: "RYLA",
    fullName: "Rotary Youth Leadership Awards",
    host: "Rotary International",
    category: "national",
    url: "https://www.rotary.org/en/our-programs/rotary-youth-leadership-awards",
    cost: "varies",
    costDetail:
      "Rotary does not publish a price; costs are set locally and many clubs sponsor their nominees in full. Rotary's own page tells students to contact their local club to ask about costs",
    financialAid: true,
    format: "in-person",
    location: "Worldwide — organized by local Rotary clubs and districts",
    eligibility: "Participants aged 14–30; RYLA participants are nominated by local Rotary clubs",
    deadline: "Set by each local Rotary club and district",
    residential: true,
    verified: true,
    verifiedOn: "2026-08-23",
    note: "Format ranges from a one-day seminar to a three-day retreat to a week-long camp, depending on the district. This is a genuine nomination program — but unlike the scam mail, the nominating body is a real local club a student can walk into and ask, and the club usually pays. Contact the club rather than waiting to be noticed.",
  },
  {
    id: "nsli-y",
    name: "NSLI-Y",
    fullName: "National Security Language Initiative for Youth",
    host: "US Department of State",
    category: "national",
    url: "https://www.nsliforyouth.org/how-to-apply/dates-and-deadlines/",
    cost: "free-plus-aid",
    costDetail:
      "A fully-funded merit-based scholarship from the US Department of State covering program costs for overseas summer and academic-year language study; the Virtual NSLI-Y track is also scholarship-covered",
    financialAid: true,
    format: "varies",
    location: "Overseas immersion in host countries, plus a virtual track",
    eligibility:
      "US high school students; merit-based selection, for study of less-commonly-taught languages critical to US national security and economic competitiveness",
    deadline: "Early November for summer and academic-year programs abroad",
    residential: true,
    verified: true,
    verifiedOn: "2026-08-23",
    note: "The 2026–27 cycle closed November 12, 2025 at 4pm ET and the Fall 2026 Virtual deadline was June 8, 2026 — both past. The next cycle's exact date is not yet published, so no deadlineISO; check the dates-and-deadlines page directly. A fully-funded State Department scholarship to live abroad is close to the most valuable thing on this list for a student with no money, and almost nobody hears about it.",
  },
  {
    id: "kennedy-lugar-yes",
    name: "Kennedy-Lugar YES",
    fullName: "Kennedy-Lugar Youth Exchange and Study Program",
    host: "US Department of State",
    category: "national",
    url: "https://www.yesprograms.org/",
    cost: "free-plus-aid",
    costDetail:
      "A US Department of State program bringing high school students from abroad to live and study in the US for an academic year",
    financialAid: true,
    format: "in-person",
    location: "United States — participants are placed with host families",
    eligibility:
      "High school students from nine participating countries: Bangladesh, Bosnia and Herzegovina, Egypt, India, Indonesia, Kosovo, Malaysia, North Macedonia and Pakistan. NOT an outbound program for US students",
    residential: true,
    verified: true,
    verifiedOn: "2026-08-23",
    note: "Included with its direction stated plainly, because it is routinely mislabelled: YES brings students TO the US. The outbound counterpart for American students is YES Abroad, whose funding, eligibility and deadline are not published on the page fetched and so are not recorded here. Over 15,000 participants since 2003.",
  },

  // ---------------------------------------------------------------------
  // PAID WORK, WORKFORCE & SECOND-CHANCE PROGRAMS
  // These pay the student. For many students this beats any summer camp.
  // ---------------------------------------------------------------------
  {
    id: "job-corps",
    name: "Job Corps",
    fullName: "Job Corps",
    host: "US Department of Labor",
    category: "national",
    url: "https://www.jobcorps.gov/",
    cost: "pays-student",
    costDetail:
      "Completely free with no tuition and no student debt. Free residential housing on campus, meals, basic medical care, and a living allowance paid to students",
    financialAid: true,
    format: "in-person",
    location: "120+ campuses nationwide",
    eligibility:
      "Ages 16 through 24, low income, meeting citizenship/residency requirements, passing background checks and demonstrating readiness and motivation",
    deadline: "Rolling — enrollment is open year-round",
    residential: true,
    verified: true,
    verifiedOn: "2026-08-23",
    note: "The largest free residential career training and education program in the country: housing, food, healthcare, training and a living allowance, all at no cost, for over 60 years. Training spans 100+ areas across 10 in-demand industries. Enroll at enroll.jobcorps.gov or call 800-733-JOBS. For a student for whom a four-year college is not the next step, this is the single most substantial entry in the catalog.",
  },
  {
    id: "youthbuild",
    name: "YouthBuild",
    fullName: "YouthBuild",
    host: "YouthBuild USA",
    category: "national",
    url: "https://www.youthbuild.org/",
    cost: "unknown",
    costDetail:
      "The site does not publish participant cost or stipend information; individual YouthBuild programs are locally run and terms vary",
    financialAid: true,
    format: "in-person",
    location: "340+ programs across seven countries; find one via the program map",
    eligibility:
      "Ages 16–24 in the US (15–29 in other countries); primarily serves young people who are out of school and out of work and who lack a high school diploma and financial resources",
    deadline: "Set by each local program",
    residential: false,
    verified: true,
    verifiedOn: "2026-08-23",
    note: "Cost and stipend are left unknown because the national site does not publish them and local programs differ — do not assume either way without calling. 84% of US enrollees obtained a high school diploma, equivalency or other credential, with credentials available in construction, healthcare, retail and IT. Explicitly built for students who have already left school, which no other entry in this catalog serves.",
  },
  {
    id: "genesys-works",
    name: "Genesys Works",
    fullName: "Genesys Works",
    host: "Genesys Works",
    category: "national",
    url: "https://www.genesysworks.org/",
    cost: "pays-student",
    costDetail:
      "Paid year-long internships with corporate partners. In 2025, 828 students completing internships collectively earned $10.9 million — roughly $13,000 each across the year",
    financialAid: true,
    format: "in-person",
    location:
      "Bay Area, Chicago, Houston, Jacksonville, Nashville, National Capital Region, New York City, Tulsa and Twin Cities",
    eligibility:
      "High school students in underserved communities; the site does not publish specific grade or income criteria on the landing page",
    deadline: "Set locally — see the application page for a student's city",
    residential: false,
    verified: true,
    verifiedOn: "2026-08-23",
    note: "The per-student earnings figure above is arithmetic from the two numbers the organization publishes ($10.9M across 828 students), not a rate Genesys Works states — treat it as an order of magnitude, not a quoted wage. Students get skills training, a paid internship during senior year, college and career coaching, and alumni support afterward.",
  },
  {
    id: "nyc-syep",
    name: "NYC SYEP",
    fullName: "New York City Summer Youth Employment Program",
    host: "NYC Department of Youth and Community Development",
    category: "national",
    url: "https://www.nyc.gov/site/dycd/services/jobs-internships/summer-youth-employment-program-syep.page",
    cost: "pays-student",
    costDetail:
      "A paid summer job; wage and hours are set annually by the City and were not confirmed from the official page",
    financialAid: false,
    format: "in-person",
    location: "New York, NY",
    eligibility: "Not verified from the official page — NYC youth, historically ages 14–24",
    deadline: "Applications typically open in the winter and close in the spring",
    residential: false,
    verified: false,
    verifiedOn: "2026-08-23",
    note: "The official nyc.gov page returned HTTP 403 to an automated fetch, so the wage, age range and deadline are all left unconfirmed rather than filled in from memory. The URL is the City's own domain and loads normally in a browser. Listed as a model: nearly every large US city runs an equivalent paid summer youth employment program — Chicago's One Summer, Los Angeles, San Francisco and others — and a student should search their own city's government site for one, because these are paid work rather than programs a family has to fund.",
  },

  // ---------------------------------------------------------------------
  // SELECTIVE FREE ACADEMIC
  // ---------------------------------------------------------------------
  {
    id: "notre-dame-leadership-seminars",
    name: "Notre Dame Leadership Seminars",
    fullName: "University of Notre Dame Leadership Seminars",
    host: "University of Notre Dame",
    category: "national",
    url: "https://precollege.nd.edu/leadership-seminars/",
    cost: "free-plus-aid",
    costDetail:
      "Free for admitted students — tuition, housing and meals are all paid for by the University. Students may also earn one transferable college credit",
    financialAid: true,
    format: "in-person",
    location: "Notre Dame, IN",
    eligibility:
      "Academically talented high school students demonstrating leadership in their communities; approximately 150 students admitted annually",
    deadline: "October 19, 2026",
    deadlineISO: "2026-10-19",
    residential: true,
    verified: true,
    verifiedOn: "2026-08-23",
    note: "A genuinely free residential program at a top university, with college credit, and a hard deadline more than seven months before the program runs — which is exactly why students without a counselor miss it. 2027 sessions: Session I June 19–30, Session II July 10–21. Notre Dame's other pre-college programs charge tuition; this one does not.",
  },
  {
    id: "yale-young-global-scholars",
    name: "YYGS",
    fullName: "Yale Young Global Scholars",
    host: "Yale University",
    category: "national",
    url: "https://globalscholars.yale.edu/",
    cost: "costs-money",
    costDetail:
      "Tuition-charging, but Yale offers need-based financial aid and scholarships covering up to full tuition; neither the tuition figure nor the aid amounts are published on the page fetched",
    financialAid: true,
    format: "in-person",
    location: "New Haven, CT",
    eligibility:
      "Outstanding high school students from around the world; students attend from over 150 countries and all 50 US states",
    deadline: "Application opens by the end of September",
    residential: true,
    verified: true,
    verifiedOn: "2026-08-23",
    note: "Marked costs-money because it charges tuition, but the need-based aid is real and substantial and is the reason this entry belongs in a catalog built for students without money — apply for aid rather than assuming the sticker price applies. No exact deadline is published yet, so no deadlineISO. 2027 sessions: I June 20–July 2, II July 4–16, III July 18–30.",
  },
  {
    id: "jhu-cty",
    name: "Johns Hopkins CTY",
    fullName: "Johns Hopkins Center for Talented Youth",
    host: "Johns Hopkins University",
    category: "national",
    url: "https://cty.jhu.edu/",
    cost: "unknown",
    costDetail: "Not verified — the official site refused an automated fetch",
    financialAid: true,
    format: "varies",
    location: "Multiple sites plus online courses",
    eligibility: "Not verified from the official page",
    residential: true,
    verified: false,
    verifiedOn: "2026-08-23",
    note: "cty.jhu.edu returned HTTP 403 to an automated fetch, so cost, eligibility and deadline are all left blank rather than guessed. CTY is known to run a substantial need-based financial aid program and the site loads normally in a browser; re-verify by hand before a student plans around it.",
  },
  {
    id: "national-hispanic-institute",
    name: "National Hispanic Institute",
    fullName: "National Hispanic Institute",
    host: "National Hispanic Institute",
    category: "national",
    url: "https://www.nationalhispanicinstitute.org/",
    cost: "unknown",
    costDetail:
      "No pricing is published on the site's landing page; NHI operates a student nomination process",
    financialAid: false,
    format: "in-person",
    location: "Maxwell, TX headquarters; programs run in California, the Midwest and Texas",
    eligibility: "High school students in grades 9–11, with separate tracks by grade level",
    deadline: "Set by program and region",
    residential: true,
    verified: true,
    verifiedOn: "2026-08-23",
    note: "Three flagship programs: the Great Debate (regional formats in California, the Midwest and Texas), the Lorenzo De Zavala Youth Legislative Session, and the Collegiate World Series for college-age participants. NHI runs a nomination process — but a real one tied to named regional programs, not a mailing list. Cost is genuinely unpublished, so ask before committing: +1 (512) 357-6137.",
  },

  // ---------------------------------------------------------------------
  // SCHOLARSHIPS & PIPELINES THAT PAY FOR COLLEGE
  // ---------------------------------------------------------------------
  {
    id: "ron-brown-scholar",
    name: "Ron Brown Scholar Program",
    fullName: "Ron Brown Scholar Program",
    host: "Ron Brown Scholar Fund",
    category: "national",
    url: "https://www.ronbrown.org/",
    cost: "free",
    costDetail: "$40,000 scholarships. No cost to apply",
    financialAid: true,
    format: "remote",
    location: "National — application is submitted remotely",
    eligibility:
      "African American high school seniors who demonstrate academic excellence, leadership potential and a commitment to community service",
    deadline: "Application window opens in the fall",
    residential: false,
    verified: true,
    verifiedOn: "2026-08-23",
    note: "The site confirms the application window is open but does not publish a closing date on the landing page, so no deadlineISO — check the site directly. $40,000 is among the largest single private scholarships a high school senior can win, and the Ron Brown network afterward matters as much as the money.",
  },
  {
    id: "posse-foundation",
    name: "Posse Scholars",
    fullName: "The Posse Foundation",
    host: "The Posse Foundation",
    category: "national",
    url: "https://www.possefoundation.org/",
    cost: "free",
    costDetail:
      "Full-tuition leadership scholarships from Posse's partner colleges and universities. Partner institutions have awarded $2.65 billion in scholarships since 1989",
    financialAid: true,
    format: "in-person",
    location: "20+ cities across the United States",
    eligibility:
      "Students with extraordinary leadership potential, nominated through Posse's nominator network; 57% of Posse Scholars and alumni are first-generation college students",
    deadline: "Nominations generally open in the fall of senior year",
    residential: false,
    verified: true,
    verifiedOn: "2026-08-23",
    note: "Full tuition, and students go to college as a cohort of ten from their own city — which is the actual mechanism, not a perk. Entry requires being nominated by a high school or community organization in a Posse city, so a student who wants this must ask their school to nominate them rather than wait. No deadline is published on the homepage, so no deadlineISO.",
  },
  {
    id: "bezos-scholars",
    name: "Bezos Scholars",
    fullName: "Bezos Scholars Program",
    host: "Bezos Family Foundation",
    category: "national",
    url: "https://www.bezosscholars.org/",
    cost: "unknown",
    costDetail:
      "Program cost is not published on the site; the program is a yearlong leadership initiative culminating in a community project",
    financialAid: false,
    format: "hybrid",
    location: "National",
    eligibility:
      "High school juniors attending US public schools where at least 30% of students qualify for free or reduced lunch, OR the school holds Title I designation, OR the state identifies the school as economically underserved or high need",
    deadline: "Applications reopen annually in November",
    residential: true,
    verified: true,
    verifiedOn: "2026-08-23",
    note: "The 2026 cohort closed January 15, 2026 and applications reopen annually in November; the next cycle's exact close date is not published, so no deadlineISO. The eligibility rule is the notable part — it is keyed to school poverty rather than family income, so a student at a Title I school qualifies on that basis alone. Network of 300+ student alumni and 200+ educator partners.",
  },

  // ---------------------------------------------------------------------
  // CIVIC EDUCATION & TEACHING PIPELINES
  // ---------------------------------------------------------------------
  {
    id: "breakthrough-collaborative",
    name: "Breakthrough Collaborative",
    fullName: "Breakthrough Collaborative",
    host: "Breakthrough Collaborative",
    category: "national",
    url: "https://www.breakthroughcollaborative.org/",
    cost: "unknown",
    costDetail:
      "Whether the Teaching Fellowship is paid is not stated on the page fetched; Breakthrough runs both a student program and a Teaching Fellowship for aspiring educators",
    financialAid: false,
    format: "in-person",
    location: "Multiple US sites",
    eligibility:
      "Not confirmed from the official page — the site does not clarify whether high school students are eligible for the Teaching Fellowship",
    deadline: "Not published on the landing page",
    residential: false,
    verified: false,
    verifiedOn: "2026-08-23",
    note: "Marked unverified because the two things a student most needs to know — whether high schoolers can be Teaching Fellows, and whether the fellowship pays — are both absent from the official landing page, and both are commonly misreported elsewhere. Ask directly: info@breakthroughcollaborative.org or 415-442-0600. Breakthrough serves students in underserved communities and reports higher college enrollment and graduation rates among participants.",
  },
  {
    id: "close-up-washington",
    name: "Close Up",
    fullName: "Close Up Foundation Washington DC Programs",
    host: "Close Up Foundation",
    category: "national",
    url: "https://www.closeup.org/",
    cost: "unknown",
    costDetail:
      "Close Up runs fee-based educational travel programs to Washington, DC and has historically offered scholarship support, but neither the fee nor the scholarship terms are published on the page fetched",
    financialAid: true,
    format: "in-person",
    location: "Washington, DC",
    eligibility:
      "High school students; Close Up also runs middle school and teacher programs",
    deadline: "Set by program session",
    residential: true,
    verified: true,
    verifiedOn: "2026-08-23",
    note: "Cost left unknown deliberately — this is a paid travel program, and a student should get the fee and the scholarship terms in writing before committing. Close Up has run since 1971 and has engaged over a million students. Ask about scholarships explicitly when calling 703-706-3300; they are not advertised on the homepage.",
  },

  // ---------------------------------------------------------------------
  // PAY-TO-ATTEND — flagged so students can tell these apart from the
  // selective free programs above. See the header note on nomination mail.
  // ---------------------------------------------------------------------
  {
    id: "nslc",
    name: "NSLC",
    fullName: "National Student Leadership Conference",
    host: "National Student Leadership Conference",
    category: "national",
    url: "https://www.nslcleaders.org/",
    cost: "costs-money",
    costDetail:
      "Tuition-charging. Tuition covers housing where applicable, meals, course materials, academic expenses, trips, tours and activities; travel to and from the program is not included. The exact tuition figure is not published on the page fetched",
    financialAid: false,
    openEnrollment: true,
    format: "in-person",
    location: "University campuses across the US",
    eligibility:
      "High school students aged 14–18 who have completed at least one year of high school; a middle school track admits students aged 11+ in grades 6–8",
    deadline: "No hard deadline — rolling until programs fill",
    residential: true,
    verified: true,
    verifiedOn: "2026-08-23",
    note: "FLAGGED. NSLC markets implied selectivity it does not have. Its own page states students are nominated by teachers, counselors and alumni, and that students 'may also be invited based on individual results of standardized testing or selected from one of several national talent identification surveys' — that is a purchased mailing list, not a selection. It also states there are no hard deadlines and that it 'will continue to accept applications if space is available in a program or on a program's waitlist.' A program that admits anyone who pays until it runs out of beds is not a competitive honor, and an admissions officer knows that. If a family received an official-looking invitation letter, this is what it was. Attend if the subject genuinely interests the student and the family can afford it — but never on the belief that being invited meant being chosen.",
  },
  {
    id: "envision-experience",
    name: "Envision",
    fullName: "Envision Experience",
    host: "Envision / WorldStrides",
    category: "national",
    url: "https://www.envisionexperience.com/",
    cost: "costs-money",
    costDetail:
      "Tuition-charging; no pricing is disclosed on the homepage, which is itself worth noting",
    financialAid: false,
    openEnrollment: true,
    format: "in-person",
    location: "Various US sites",
    eligibility: "Ages 8–18 across 20+ program topics",
    deadline: "Rolling",
    residential: true,
    verified: true,
    verifiedOn: "2026-08-23",
    note: "FLAGGED. Envision runs a 'Nominate a Student' funnel and sends invitation letters that read as selective, but the homepage discloses no selection criteria, no admission rate and no price, and the programs serve ages 8 through 18. A leadership 'congress' or 'summit' that accepts an 8-year-old on the same brand is not selecting 17-year-olds on merit. Marked openEnrollment. As with NSLC: fine as a paid experience, worthless as a credential, and a bad use of money a family does not have.",
  },
  // ---------------------------------------------------------------------
  // FULL-RIDE COLLEGE SCHOLARSHIPS OPEN TO HIGH SCHOOL SENIORS
  // ---------------------------------------------------------------------
  {
    id: "coolidge-scholarship",
    name: "Coolidge Scholarship",
    fullName: "The Coolidge Scholarship",
    host: "Calvin Coolidge Presidential Foundation",
    category: "national",
    url: "https://www.coolidgescholars.org/apply/",
    cost: "free",
    costDetail:
      "A full-ride, presidential scholarship covering tuition, room, board and expenses for four years of undergraduate study, usable at any accredited US college or university",
    financialAid: true,
    format: "remote",
    location: "National — application submitted remotely; usable at any accredited US institution",
    eligibility:
      "High school seniors; see coolidgescholars.org/eligibility for full criteria, which were not confirmed from the page fetched",
    deadline: "The 2026-27 application opens in late summer or early fall of 2026",
    residential: false,
    verified: true,
    verifiedOn: "2026-08-23",
    note: "One of the largest full-ride scholarships open to a graduating senior anywhere in the country, and unusually flexible because it travels with the student to any accredited school rather than a fixed list of partner colleges. The 2025-26 cycle has closed; no exact 2026-27 date is published yet, so no deadlineISO.",
  },
  {
    id: "gates-scholarship",
    name: "The Gates Scholarship",
    fullName: "The Gates Scholarship",
    host: "The Gates Scholarship (Bill & Melinda Gates Foundation)",
    category: "national",
    url: "https://www.thegatesscholarship.org/",
    cost: "free",
    costDetail:
      "A highly selective, last-dollar scholarship covering the full cost of attendance not met by other financial aid, for the student's full undergraduate education. Award amount is not stated in dollar terms on the homepage because it is calculated per student as a last-dollar award",
    financialAid: true,
    format: "remote",
    location: "National — application submitted remotely",
    eligibility:
      "Outstanding high school seniors from low-income households; historically Pell-eligible and from underrepresented minority backgrounds, in the top 10% of their graduating class",
    deadline: "Not published on the page fetched",
    residential: false,
    verified: false,
    verifiedOn: "2026-08-23",
    note: "Marked unverified because the homepage fetched did not surface eligibility specifics or a deadline — check thegatesscholarship.org's own application page directly before relying on the eligibility detail above, which is drawn from secondary sources rather than the page itself. About 300 students are selected each year; this is a last-dollar award, meaning it stacks with other aid rather than replacing it.",
  },
  {
    id: "jkcf-young-scholars",
    name: "JKCF Young Scholars Program",
    fullName: "Jack Kent Cooke Foundation Young Scholars Program",
    host: "Jack Kent Cooke Foundation",
    category: "national",
    url: "https://www.jkcf.org/our-scholarships/young-scholars-program/",
    cost: "free",
    costDetail:
      "A five-year pre-college scholarship providing academic and college advising plus financial support for school, Cooke-sponsored summer programs, internships and enrichment — NOT open to current high school students; entry is in 7th grade",
    financialAid: true,
    format: "hybrid",
    location: "National",
    eligibility:
      "Exceptionally promising 7th grade students with financial need",
    residential: false,
    verified: true,
    verifiedOn: "2026-08-23",
    note: "Listed for a student's younger sibling, the same way Prep for Prep is: entry is in 7th grade and the current cycle is closed with no dates published for the next one. A high schooler who finds this has aged out — but Jack Kent Cooke's own College Scholarship Program (separate entry, this file) is the equivalent opportunity for seniors.",
  },
  {
    id: "jkcf-college-scholarship",
    name: "JKCF College Scholarship",
    fullName: "Jack Kent Cooke Foundation College Scholarship Program",
    host: "Jack Kent Cooke Foundation",
    category: "national",
    url: "https://www.jkcf.org/our-scholarships/college-scholarship-program/",
    cost: "free",
    costDetail:
      "Up to $55,000 per year, as last-dollar funding designed to minimize debt after institutional aid",
    financialAid: true,
    format: "remote",
    location: "National — application submitted remotely",
    eligibility:
      "High-achieving high school seniors with financial need who intend to attend and graduate from a top four-year college or university",
    deadline: "November 11, 2026",
    deadlineISO: "2026-11-11",
    residential: false,
    verified: true,
    verifiedOn: "2026-08-23",
    note: "One of the largest annual renewable scholarships available to a graduating senior, and the deadline is exact and hard: November 11, 2026. This is the JKCF program a current high schooler should actually apply to — the Young Scholars Program (separate entry) is for 7th graders instead.",
  },
  // ---------------------------------------------------------------------
  // MORE COMPETITIONS & CIVIC PROGRAMS
  // ---------------------------------------------------------------------
  {
    id: "elks-most-valuable-student",
    name: "Elks MVS Scholarship",
    fullName: "Elks National Foundation Most Valuable Student Scholarship",
    host: "Elks National Foundation",
    category: "national",
    url: "https://www.elks.org/scholars/scholarships/MVS.cfm",
    cost: "free",
    costDetail:
      "500 four-year scholarships ranging from $1,000 to $7,500 per year. The top 20 scholars receive $30,000 total; the remaining 480 receive $4,000 each",
    financialAid: true,
    format: "remote",
    location: "National — application submitted remotely",
    eligibility:
      "Current high school seniors (high school graduates are not eligible) who are US citizens at the time of submission, planning to enroll in a four-year undergraduate program at an accredited US college or university",
    deadline: "November 12, 2026 at 11:59pm Pacific",
    deadlineISO: "2026-11-12",
    residential: false,
    verified: true,
    verifiedOn: "2026-08-23",
    note: "500 scholarships awarded every year makes this one of the more winnable major national scholarships by sheer count, even though the top prize is competitive. No GPA or income cutoff is published, so it is worth applying broadly. Contact scholarship@elks.org with questions.",
  },
  {
    id: "we-the-people-civics",
    name: "We the People",
    fullName: "We the People: The Citizen and the Constitution",
    host: "Center for Civic Education",
    category: "national",
    url: "https://www.civiced.org/we-the-people",
    cost: "unknown",
    costDetail:
      "Participation cost is not published on the program page; the program is typically adopted through a school's civics or government class",
    financialAid: false,
    format: "hybrid",
    location: "State competitions nationwide; National Finals in the Washington, DC area",
    eligibility:
      "Students from upper elementary through high school; Level 3 is the high school curriculum. A Virtual National Invitational is also available",
    deadline: "National Finals held annually in spring",
    residential: false,
    verified: true,
    verifiedOn: "2026-08-23",
    note: "Structured as simulated congressional hearings where students testify before judges acting as members of Congress — a genuinely rigorous civics competition rather than a leadership-branding event. Access runs through a school's program, so a student without a class already running We the People should ask a social studies teacher whether the school can start one; cost and exact dates were not confirmed and should be checked with the Center for Civic Education directly.",
  },
  {
    id: "nsda-national-tournament",
    name: "NSDA National Tournament",
    fullName: "National Speech & Debate Association National Tournament",
    host: "National Speech & Debate Association",
    category: "national",
    url: "https://www.speechanddebate.org/",
    cost: "unknown",
    costDetail:
      "Membership and tournament fees are not published on the homepage; the NSDA also offers college scholarships and program grants to expand access",
    financialAid: true,
    format: "in-person",
    location: "Varies annually — national tournament site changes each year",
    eligibility:
      "High school and middle school students who qualify through their school's district tournament; requires a school with an active NSDA program",
    deadline: "Qualification is through district tournaments earlier in the year",
    residential: true,
    verified: true,
    verifiedOn: "2026-08-23",
    note: "The largest speech and debate organization in the US since 1925, spanning ten-plus speech and acting events and five debate formats. The real barrier is access, not talent: NSDA's own materials note only 4,000 of 25,000 US high schools currently have a program, which is exactly why the National Speech & Debate Initiative exists to expand access — a student at a school without a team should ask about starting one rather than assume the opportunity does not exist for them.",
  },
  // ---------------------------------------------------------------------
  // MORE PAID CITY YOUTH EMPLOYMENT — same model as NYC SYEP.
  // ---------------------------------------------------------------------
  {
    id: "hire-la-youth",
    name: "Hire LA's Youth",
    fullName: "Hire LA's Youth",
    host: "City of Los Angeles Economic & Workforce Development Department",
    category: "national",
    url: "https://www.hirelayouth.com/",
    cost: "pays-student",
    costDetail:
      "Paid work experience; wages vary by specific program, ranging from $17.27 to $20.00 per hour",
    financialAid: false,
    format: "in-person",
    location: "Los Angeles, CA",
    eligibility: "Youth ages 14–24; some sub-programs start at 16 or 18",
    deadline: "Rolling — applications accepted on an ongoing basis",
    residential: false,
    verified: true,
    verifiedOn: "2026-08-23",
    note: "Includes work-skills development, financial literacy, career coaching and mentoring alongside the paid work itself. Call 213-744-7300 for the current cycle's specifics. Same model as NYC's SYEP: a real city government paying teenagers to work, which almost never markets itself the way a summer camp does.",
  },
  {
    id: "chicago-youth-works",
    name: "Chicago Youth Works",
    fullName: "Chicago Youth Works (formerly One Summer Chicago)",
    host: "City of Chicago Department of Family and Support Services",
    category: "national",
    url: "https://www.chicago.gov/city/en/depts/fss/provdrs/youth/svcs/youth-employment.html",
    cost: "pays-student",
    costDetail:
      "Paid summer and year-round work experience through city, nonprofit and business partners; exact wage not confirmed from an automated fetch",
    financialAid: false,
    format: "in-person",
    location: "Chicago, IL",
    eligibility: "Youth and young adults ages 14–24",
    deadline: "Applications open each spring for the summer cycle",
    residential: false,
    verified: false,
    verifiedOn: "2026-08-23",
    note: "chicago.gov returned HTTP 403 to an automated fetch, so the wage and exact deadline are unconfirmed and left blank; this entry is based on the City's own press materials describing the program. Formerly branded One Summer Chicago, renamed Chicago Youth Works in 2026, serving over 20,000 youth annually with three tracks: Chicagobility, SYEP, and the Chicago Youth Service Corps. Re-verify at chicagoyouthworks.org before relying on any date.",
  },

  // ---------------------------------------------------------------------
  // MORE UNIFORMED & SERVICE PIPELINES
  // ---------------------------------------------------------------------
  {
    id: "us-naval-sea-cadet-corps",
    name: "Naval Sea Cadet Corps",
    fullName: "U.S. Naval Sea Cadet Corps",
    host: "U.S. Navy and Coast Guard",
    category: "national",
    url: "http://www.seacadets.org/",
    cost: "unknown",
    costDetail:
      "The site references a Fees page but does not state pricing on the page fetched",
    financialAid: false,
    format: "in-person",
    location: "Local units nationwide",
    eligibility:
      "Naval Sea Cadet Corps division: grades 9–12, minimum age 13 (with exceptions for 8th graders after March 1); Navy League Cadet Corps division: grades 5–8, minimum age 10. US citizens or permanent legal residents in good academic standing",
    deadline: "Rolling — join a local unit any time",
    residential: false,
    verified: true,
    verifiedOn: "2026-08-23",
    note: "The official youth program of the Navy and Coast Guard: training in seamanship, aviation, SCUBA, robotics and leadership. Cost is genuinely unpublished on the page fetched — check the Fees page for a local unit before assuming it is free. Contact info@seacadets.org.",
  },
  // ---------------------------------------------------------------------
  // AVIATION & TRADE-ADJACENT SCHOLARSHIPS
  // ---------------------------------------------------------------------
  {
    id: "aopa-flight-training-scholarship",
    name: "AOPA Flight Training Scholarship",
    fullName: "AOPA High School Flight Training Scholarship",
    host: "Aircraft Owners and Pilots Association",
    category: "national",
    url: "https://www.aopa.org/training-and-safety/students/aopa-flight-training-scholarships",
    cost: "free",
    costDetail:
      "At least 90 scholarships of $12,000 each, toward earning a private pilot certificate. High school students can obtain free AOPA membership, which is required to apply",
    financialAid: true,
    format: "remote",
    location: "National — flight training happens locally, application is remote",
    eligibility:
      "High school students aged 16–18, minimum 2.7 GPA, must have passed the FAA Private Pilot written knowledge exam before applying, and be a current (free) AOPA member",
    deadline: "Fall cycle: October 1 – December 30, 11:59pm ET. Spring cycle: April 1 – June 30, 11:59pm ET",
    deadlineISO: "2026-12-30",
    residential: false,
    verified: true,
    verifiedOn: "2026-08-23",
    note: "A genuinely large scholarship — $12,000 covers most of a private pilot certificate — gated behind a real prerequisite (passing the FAA written exam) rather than an essay contest, which keeps the applicant pool self-selected and the odds better than the dollar amount suggests. Fall cycle notifications by September 15; Spring cycle by April 15. deadlineISO reflects the Fall 2026 close, the nearer of the two published recurring dates.",
  },
  {
    id: "nshss",
    name: "NSHSS",
    fullName: "National Society of High School Scholars",
    host: "National Society of High School Scholars",
    category: "national",
    url: "https://www.nshss.org/",
    cost: "costs-money",
    costDetail:
      "A membership fee, independently reported in the $75–$90 range, typically as a one-time payment. NSHSS's own site does not disclose the fee amount; it does state the society awards more than $2.5 million in scholarships to qualified applicants each year",
    financialAid: false,
    openEnrollment: true,
    format: "remote",
    location: "National",
    eligibility:
      "NSHSS's own page: 'Membership is by invitation only to those students who have achieved at least one of our rigorous academic criteria' — criteria are not detailed on the page fetched",
    deadline: "Rolling",
    residential: false,
    verified: true,
    verifiedOn: "2026-08-23",
    note: "FLAGGED. NSHSS sends an 'invitation' letter to students who cross a GPA or test-score threshold pulled from purchased data, then charges a membership fee to actually join — this is the single most common pattern behind the 'you have been nominated!' mail this catalog warns families about. The invitation is not an award and does not by itself indicate selectivity beyond a common statistical cutoff. That said, membership does grant access to a real scholarship pool NSHSS funds (over $2.5 million annually) and other benefits, so it is not pure fraud — it is a real organization selling a real but modestly valuable membership using invitation language that overstates how special the invitation is. A student's time is usually better spent on the free, need-based programs elsewhere in this file before paying to join anything.",
  },
  // ---------------------------------------------------------------------
  // MORE SCHOLARSHIPS
  // ---------------------------------------------------------------------
  {
    id: "actuarial-foundation-stem-stars",
    name: "STEM Stars Actuarial Scholars",
    fullName: "The Actuarial Foundation STEM Stars Actuarial Scholars Program",
    host: "The Actuarial Foundation",
    category: "national",
    url: "https://actuarialfoundation.org/scholarships/stem-stars/",
    cost: "free",
    costDetail: "$20,000 in college scholarships — $5,000 annually for four years",
    financialAid: true,
    format: "remote",
    location: "National — application submitted remotely",
    eligibility:
      "High school students skilled in math and interested in the actuarial field; the Foundation states the goal is increasing access for students interested in an actuarial career",
    deadline: "The 2026 cycle is closed; applications reopen in the fall",
    residential: false,
    verified: true,
    verifiedOn: "2026-08-23",
    note: "No exact reopening date is published, so no deadlineISO. A narrow-niche scholarship — actuarial science specifically — which is exactly why it is underapplied-to relative to its size; a math-strong student who has never heard the word 'actuary' is the target applicant.",
  },
  {
    id: "girl-scouts-gold-award-scholarship",
    name: "Gold Award Scholarship",
    fullName: "GSUSA Gold Award Scholarship",
    host: "Girl Scouts of the USA",
    category: "national",
    url: "https://www.girlscouts.org/goldawardscholarship",
    cost: "unknown",
    costDetail:
      "Reported at $10,000 per council in secondary sources, though the official page returned HTTP 403 to an automated fetch and the figure could not be confirmed directly",
    financialAid: true,
    format: "remote",
    location: "National — one recipient per Girl Scout council",
    eligibility:
      "Gold Award Girl Scouts who completed a Gold Award project demonstrating extraordinary leadership and measurable, sustainable impact on an issue of national or global significance",
    deadline: "Not confirmed",
    residential: false,
    verified: false,
    verifiedOn: "2026-08-23",
    note: "Marked unverified because girlscouts.org blocked the automated fetch; the award amount above is what secondary sources report, not what this catalog confirmed directly, so treat it as approximate until checked on the official page. The real prerequisite — completing a Gold Award project — is itself a multi-month undertaking, not something a senior can start from zero for this deadline.",
  },
  {
    id: "hispanic-scholarship-fund",
    name: "Hispanic Scholarship Fund",
    fullName: "Hispanic Scholarship Fund",
    host: "Hispanic Scholarship Fund",
    category: "national",
    url: "https://www.hsf.net/",
    cost: "free",
    costDetail:
      "No cost to apply. Since 1975, HSF states it has awarded over $756 million in scholarships to more than 65,000 scholars",
    financialAid: true,
    format: "remote",
    location: "National — application submitted remotely",
    eligibility:
      "Not confirmed in detail from the homepage; HSF's Scholarship Finder tool matches students to specific award programs with their own criteria",
    deadline: "Not published on the homepage",
    residential: false,
    verified: true,
    verifiedOn: "2026-08-23",
    note: "Functions as an umbrella over many individual named scholarships rather than one program with one deadline — use HSF's own Scholarship Finder to identify which specific awards a given student qualifies for and when each closes.",
  },
  {
    id: "uncf-scholarships",
    name: "UNCF Scholarships",
    fullName: "United Negro College Fund Scholarship Programs",
    host: "United Negro College Fund",
    category: "national",
    url: "https://uncf.org/scholarships",
    cost: "free",
    costDetail:
      "No cost to apply. UNCF states it awards over $62 million in scholarships annually across 11,000 scholarships and internships",
    financialAid: true,
    format: "remote",
    location: "National — application submitted remotely",
    eligibility:
      "Varies by individual scholarship program; UNCF's scholarships page lists the full set with program-specific criteria",
    deadline: "Varies by individual scholarship program",
    residential: false,
    verified: true,
    verifiedOn: "2026-08-23",
    note: "Like HSF, this is an umbrella over many distinct named scholarships and internships rather than a single program — a student should use UNCF's own scholarships page to find the individual awards they are eligible for rather than treat this entry as one deadline.",
  },
  {
    id: "vfw-voice-of-democracy",
    name: "Voice of Democracy",
    fullName: "VFW Voice of Democracy Scholarship Contest",
    host: "Veterans of Foreign Wars",
    category: "national",
    url: "https://www.vfw.org/community/youth-and-education/youth-scholarships",
    cost: "free",
    costDetail:
      "National first place: $35,000, paid directly to the recipient's college, university or vocational/technical school. Additional national scholarships range up to $21,000; state-level first place winners receive at least $1,000",
    financialAid: true,
    format: "remote",
    location: "National — entries submitted through a local participating VFW Post",
    eligibility:
      "9th through 12th grade students in public, private or parochial school, homeschooled students, or dependents of US military/civilian personnel overseas. No family connection to the military or VFW is required",
    deadline: "Midnight, October 31",
    deadlineISO: "2026-10-31",
    residential: false,
    verified: true,
    verifiedOn: "2026-08-23",
    note: "An audio-essay competition, not a written one — students record a spoken essay on an annual patriotic theme. $35,000 for a first-place national winner is among the largest single-contest scholarships in this catalog, and unlike NHS/NSHSS-style mail, entry is free and runs through a local VFW Post rather than a purchased mailing list. Judging proceeds Post (mid-November) to District (Nov 16–Dec 15) to Department/state (Dec 16–Jan 10) to national.",
  },
];
