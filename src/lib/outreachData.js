export const emailTemplates = [
  {
    id: "A",
    title: "Template A: University Research Lab",
    subject: "Inquiry from a high school student — [Your Name]",
    body: `Dear Professor [Last Name],

My name is [Your Name], and I am a [grade level] at [Your High School] in [City, State]. I am writing to express my interest in your research on [specific topic from their recent paper or lab page].

I recently read your paper titled "[Paper Title]" and was particularly fascinated by [specific finding or method]. This connects to my own interest in [your field of interest], which I have been exploring through [relevant coursework, project, or self-study].

I would be grateful for the opportunity to contribute to your lab as a volunteer or remote research assistant. I am available [number] hours per week and am comfortable with [relevant skills: data entry, literature review, Python, basic statistical analysis, etc.]. I understand you may not have a position available, but I would also appreciate any guidance on how to prepare for research in this field.

I have attached my resume for your reference. Thank you for your time and consideration.

Sincerely,
[Your Name]
[Your Email]
[Your Phone Number]`,
  },
  {
    id: "B",
    title: "Template B: Local Business Externship",
    subject: "High school student inquiry — externship opportunity at [Company Name]",
    body: `Dear [Mr./Ms. Last Name],

My name is [Your Name], and I am a [grade level] at [Your High School] in [City, State]. I found your company, [Company Name], through [how you found them: LinkedIn, local chamber of commerce, etc.], and I am impressed by your work in [specific area: e.g., sustainable architecture, supply chain logistics, digital marketing].

I am writing to ask whether [Company Name] offers any externship or job-shadowing opportunities for high school students. I am interested in pursuing a career in [field] and would value the opportunity to observe your team's day-to-day operations and learn from professionals in the field.

I am available [days/times, e.g., weekday afternoons or during school breaks] and can commit to [duration, e.g., a one-day shadow or a two-week externship]. I am comfortable with [relevant skills or willingness to help with: data entry, social media, research, filing, etc.].

I understand this is a significant request. If an externship is not possible, I would also appreciate a brief informational interview (15-20 minutes by phone or video) to learn about your career path.

Thank you for your time and consideration. I have attached my resume for your reference.

Sincerely,
[Your Name]
[Your Email]
[Your Phone Number]`,
  },
  {
    id: "C",
    title: "Template C: Non-Profit Shadowing",
    subject: "High school volunteer inquiry — [Non-Profit Name]",
    body: `Dear [Mr./Ms. Last Name or "Volunteer Coordinator"],

My name is [Your Name], and I am a [grade level] at [Your High School] in [City, State]. I am writing because I am passionate about [specific cause the non-profit addresses: e.g., food security, literacy, environmental justice] and would like to contribute to [Non-Profit Name]'s mission.

I learned about your organization through [how you found them] and was particularly inspired by [specific program or initiative]. I am interested in [volunteering / shadowing / completing a service project] with your team.

I am available [days/times] and can commit to [number] hours per [week/month]. I am comfortable with [relevant skills: direct service, social media, event planning, tutoring, data entry, etc.]. I am also happy to undergo any required background checks or training.

If you have a volunteer application or onboarding process, please let me know and I will complete it promptly. If no formal positions are available, I would appreciate guidance on other ways I can support your work.

Thank you for your time and for the important work your organization does in our community.

Sincerely,
[Your Name]
[Your Email]
[Your Phone Number]`,
  },
];

export const trackerExample = [
  { organization: "Dr. Jane Smith — MIT CSAIL", dateSent: "2024-09-15", followUpDate: "2024-09-22", status: "No Response" },
  { organization: "Acme Corp — Engineering Dept.", dateSent: "2024-09-20", followUpDate: "2024-09-27", status: "Interview Scheduled" },
  { organization: "Local Red Cross Chapter", dateSent: "2024-09-25", followUpDate: "2024-10-02", status: "Awaiting Reply" },
  { organization: "Prof. John Lee — Stanford Bio", dateSent: "2024-10-01", followUpDate: "2024-10-08", status: "Replied — Call Set" },
];

export const professorTemplates = [
  {
    id: "standard",
    name: "Standard Inquiry",
    subject: "Research Opportunity Inquiry - [Your Name]",
    body: `Dear Professor [Last Name],

My name is [Your Name], and I am a [Grade Level] at [High School]. I am writing to inquire about potential volunteer or assistant research opportunities in your lab at [University], specifically regarding your work in [Research Domain].

I have been self-studying [Research Domain] and recently read about your projects. I am particularly interested in how your lab approaches [Research Interests/Keywords]. I have developed skills in [Your Skills] which I believe could be useful in helping with data analysis, literature reviews, or administrative tasks in your lab.

I have attached my resume for your review. Would you be available for a brief 10-minute Zoom call sometime next week to discuss your research and any potential ways I could contribute?

Thank you for your time and consideration.

Sincerely,

[Your Name]
[Your Email]`
  },
  {
    id: "direct",
    name: "Direct & Brief",
    subject: "Inquiry regarding [Research Domain] research - [Your Name]",
    body: `Dear Professor [Last Name],

I hope this email finds you well.

My name is [Your Name], and I am a high school student at [High School] with a strong passion for [Research Domain]. I am reaching out to see if you have any remote or volunteer research opportunities for students in your lab at [University] this semester/summer.

I am very interested in your work on [Research Interests/Keywords]. I have basic experience with [Your Skills] and would love to assist your team with research tasks, literature reviews, or data preparation.

I've attached my resume to this email. If you have 5-10 minutes, I would appreciate the chance to connect.

Best regards,

[Your Name]
[Your Email]`
  },
  {
    id: "detailed",
    name: "Detailed & Paper-Focused",
    subject: "Academic Inquiry: Research Assistantship - [Your Name]",
    body: `Dear Professor [Last Name],

My name is [Your Name], a student at [High School]. I am writing to express my strong interest in the research you are conducting at [University] on [Research Domain].

I recently read your work regarding [Research Interests/Keywords]. I was fascinated by your methodology and findings, particularly [describe a specific point or finding you liked]. 

I am seeking an opportunity to volunteer as a research helper or assistant under your guidance. I can dedicate [Hours per week, e.g. 5-10] hours per week and bring skills in [Your Skills]. I am eager to learn and help with any of the unglamorous but necessary tasks of research, such as data entry, formatting, or literature reviews.

My resume is attached. Thank you for considering my request, and I look forward to hearing from you.

Respectfully,

[Your Name]
[Your Email]`
  }
];