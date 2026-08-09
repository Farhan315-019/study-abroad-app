import {
  Wallet,
  Stamp,
  Briefcase,
  CloudSun,
  Home,
  Award,
  FileText,
  Send,
  Mic,
  MailOpen,
  ScanSearch,
  Target,
  Users,
  MessagesSquare,
  Bot,
  GraduationCap,
  Globe2,
  TrendingUp,
  FileCheck2,
  Plane,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Bell,
  type LucideIcon,
} from "lucide-react";

/* ---------------------------------- Hero ---------------------------------- */

export const HERO_STATS: { value: number; suffix: string; label: string }[] = [
  { value: 10500, suffix: "+", label: "Universities" },
  { value: 70, suffix: "+", label: "Countries" },
  { value: 98000, suffix: "+", label: "Scholarships" },
  { value: 98, suffix: "%", label: "Visa success" },
];

export const PARTNER_UNIS = [
  "University of Toronto",
  "ETH Zürich",
  "NUS Singapore",
  "University of Melbourne",
  "TU Delft",
  "KAIST",
  "LMU Munich",
  "McGill University",
  "University of Auckland",
  "Trinity College Dublin",
  "KTH Stockholm",
  "University of Tokyo",
];

export const HERO_PARTNERS = PARTNER_UNIS.slice(0, 8);

/* ---------------------------------- Why ---------------------------------- */

export const WHY_POINTS: { icon: LucideIcon; title: string; text: string; tint: string }[] = [
  {
    icon: Wallet,
    title: "Agencies charge $3,000+",
    text: "Consultants promise the world but push commission-rich universities you may never have wanted.",
    tint: "#ef4444",
  },
  {
    icon: Bot,
    title: "You deserve better",
    text: "The same advice, from your pocket — trained on live, official admissions data from 70+ countries.",
    tint: "#3b82f6",
  },
  {
    icon: Sparkles,
    title: "Full transparency",
    text: "Every requirement links back to the official university page. No hidden fees. No pressure calls.",
    tint: "#8b5cf6",
  },
];

export const WHY_COMPARE: {
  agents: string[];
  globledu: string[];
} = {
  agents: [
    "Charges ₹50k–3L in fees",
    "Suggests commission universities",
    "Slow WhatsApp replies",
    "One-size-fits-all documents",
    "Ghosts you after visa",
  ],
  globledu: [
    "Free to start, cheaper to finish",
    "Shortlist ranked for YOU",
    "Instant AI answers, 24/7",
    "Personalised SOP & checklists",
    "Your AI coach post-arrival",
  ],
};

/* ---------------------------------- Journey ---------------------------------- */

export const STEPS: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: ScanSearch, title: "Discover", text: "Explore 10,500+ universities filtered by your budget, grades and goals." },
  { icon: Target, title: "Get Matched", text: "Answer 10 quick questions. The AI builds your ranked shortlist with reasons." },
  { icon: Award, title: "Win Scholarships", text: "See every scholarship you're actually eligible for — and how to win it." },
  { icon: FileText, title: "Build Documents", text: "Auto-draft your SOP, CV, and requirement checklists for every university." },
  { icon: Send, title: "Apply in One Click", text: "Generate a complete application package for up to 10 universities at once." },
  { icon: MailOpen, title: "Get Offers & Visa", text: "Track offers, deadlines and visa steps in one place. We hold your hand." },
];

export const JOURNEY_STATS = [
  { value: "60 sec", label: "to first shortlist" },
  { value: "10×", label: "faster applications" },
  { value: "3×", label: "more scholarship matches" },
];

/* ---------------------------------- AI Demo ---------------------------------- */

export const AI_QUICK_ACTIONS: { icon: LucideIcon; label: string; text: string }[] = [
  { icon: Mic, label: "Voice", text: "Just speak your question" },
  { icon: FileText, label: "SOP", text: "Draft my statement of purpose" },
  { icon: Award, label: "Scholarship", text: "Find grants for CS in Germany" },
  { icon: Stamp, label: "Visa", text: "Do I need a financial proof?" },
  { icon: Target, label: "Match", text: "Match me with 5 universities" },
  { icon: Plane, label: "Plan", text: "Plan my move to Australia" },
];

export const AI_POINTS: string[] = [
  "Trained on live official data — not guesswork",
  "Understands Pakistani, Indian, Bangla & Nigerian education systems",
  "Speaks your language, explains like a friend",
  "No scripts. Every answer cites the source",
];

export const CHAT_SUGGESTIONS = [
  "I have 2.8 CGPA, 6.5 IELTS and 4 years gap — where can I go?",
  "Which EU country lets me work 20h/week on a student visa?",
  "Best cheap universities in the USA for a CS degree in 2026?",
  "Can I get a full scholarship with 3.5 CGPA in Germany?",
];

/* ---------------------------------- Countries ---------------------------------- */

import { DESTINATIONS } from "../../data/study";

export const COUNTRIES = (["Germany", "Canada", "Australia", "USA", "UK", "Malaysia"] as const).map((n) => {
  const d = DESTINATIONS.find((x) => x.name === n)!;
  return {
    name: d.name,
    flag: d.flag,
    unis: d.unis,
    fees: d.tuition,
    jobs: d.work,
    stream: d.streams.join(", "),
    visa: d.visaTime,
    tint: d.tint,
  };
});

export const VISA_CHIPS: { icon: LucideIcon; text: string }[] = [
  { icon: Wallet, text: "Financial proof ready in 48h" },
  { icon: Stamp, text: "Visa documents pre-checked by AI" },
  { icon: Briefcase, text: "Work-rights guidance per country" },
  { icon: CloudSun, text: "Climate & cost-of-living fits" },
  { icon: Home, text: "Off-campus housing calculators" },
  { icon: GraduationCap, text: "Post-study work permit options" },
];

/* ---------------------------------- Universities ---------------------------------- */

export const UNI_STATS: { label: string; value: string; hint: string }[] = [
  { label: "Global database", value: "10,500+", hint: "Universities indexed & verified" },
  { label: "Requirements", value: "9,00,000+", hint: "Entries with official links" },
  { label: "Deadlines", value: "12,000+", hint: "Live application deadlines" },
  { label: "Match score", value: "94%", hint: "Shortlist accuracy vs. outcomes" },
];

/* ---------------------------------- Scholarships ---------------------------------- */

export const SCHOLARSHIP_STATS = [
  { value: "98k+", label: "scholarships tracked" },
  { value: "$1.2B", label: "in annual funding indexed" },
  { value: "3×", label: "more matches than agents" },
];

/* ---------------------------------- Features ---------------------------------- */

export const FEATURES: { icon: LucideIcon; title: string; text: string; tint: string }[] = [
  { icon: Bot, title: "AI Consultant", text: "Your 24/7 advisor — country, university, visa, fees, anything.", tint: "#3b82f6" },
  { icon: Sparkles, title: "Smart Search", text: "Find universities by score, budget, program and scholarships.", tint: "#06b6d4" },
  { icon: ShieldCheck, title: "Verified Data", text: "Every requirement links to the official university source.", tint: "#22c55e" },
  { icon: Wallet, title: "Scholarship Radar", text: "Grants you're actually eligible for — never miss one.", tint: "#f59e0b" },
  { icon: FileText, title: "Auto Documents", text: "SOP drafts, CV builder and per-university checklists.", tint: "#8b5cf6" },
  { icon: Send, title: "Bulk Apply", text: "Up to 10 universities, one complete application package.", tint: "#ef4444" },
  { icon: Stamp, title: "Visa Coach", text: "Step-by-step visa roadmap with document validation.", tint: "#ec4899" },
  { icon: Bell, title: "Deadline Alerts", text: "Automatic reminders so you never miss an intake.", tint: "#f97316" },
  { icon: GraduationCap, title: "Offer Tracker", text: "Follow your applications from submitted to admitted.", tint: "#14b8a6" },
  { icon: Users, title: "Alumni Network", text: "Chat with students already living your target country.", tint: "#6366f1" },
  { icon: MessagesSquare, title: "Peer Community", text: "A 10,000+ strong community of applicants like you.", tint: "#0ea5e9" },
  { icon: Globe2, title: "70+ Countries", text: "From Germany to New Zealand — one platform, all routes.", tint: "#10b981" },
];

/* ---------------------------------- Dashboard preview ---------------------------------- */

export const DASH_METRICS: { icon: LucideIcon; label: string; value: string; delta: string; tint: string }[] = [
  { icon: TrendingUp, label: "Profile strength", value: "86%", delta: "+12 this week", tint: "#3b82f6" },
  { icon: FileCheck2, label: "Applications", value: "7", delta: "3 new offers", tint: "#22c55e" },
  { icon: Plane, label: "Visa stage", value: "Ready", delta: "Docs verified", tint: "#06b6d4" },
  { icon: Award, label: "Scholarship odds", value: "72%", delta: "2 grants matched", tint: "#f59e0b" },
];

export const DASH_PIPELINE = [
  { label: "Shortlisted", value: 4, color: "#3b82f6" },
  { label: "Submitted", value: 3, color: "#06b6d4" },
  { label: "Offers", value: 2, color: "#22c55e" },
];

export const DASH_ACTIVITY: { icon: LucideIcon; text: string; time: string; tint: string }[] = [
  { icon: Award, text: "New scholarship match: DAAD EPOS (Germany)", time: "2h ago", tint: "#f59e0b" },
  { icon: CheckCircle2, text: "TU Munich verified your transcript", time: "5h ago", tint: "#22c55e" },
  { icon: Bell, text: "Deadline in 14 days — University of Toronto", time: "1d ago", tint: "#3b82f6" },
  { icon: Mic, text: "AI answered your visa question", time: "1d ago", tint: "#8b5cf6" },
];

export const DASH_APPLICATIONS: {
  uni: string;
  program: string;
  status: string;
  deadline: string;
  progress: number;
  tint: string;
}[] = [
  { uni: "TU Munich", program: "MSc Informatics", status: "Offered", deadline: "Winter 2026", progress: 90, tint: "#22c55e" },
  { uni: "University of Toronto", program: "MEng Mechanical", status: "Submitted", deadline: "Dec 1, 2026", progress: 60, tint: "#3b82f6" },
  { uni: "TU Delft", program: "MSc Aerospace", status: "Documents", deadline: "Nov 15, 2026", progress: 40, tint: "#06b6d4" },
  { uni: "University of Melbourne", program: "MIT Software", status: "Shortlist", deadline: "Jan 31, 2027", progress: 25, tint: "#f59e0b" },
];

export const FEATURE_STATS = [
  { value: "1M+", label: "data points analyzed daily" },
  { value: "38s", label: "average AI response time" },
  { value: "120+", label: "countries served" },
];

/* ---------------------------------- Testimonials ---------------------------------- */

export const TESTIMONIALS: {
  name: string;
  initials: string;
  from: string;
  to: string;
  program: string;
  quote: string;
  rating: number;
  tint: string;
}[] = [
  {
    name: "Ayesha Khan",
    initials: "AK",
    from: "Lahore, PK",
    to: "Germany",
    program: "MSc Data Science",
    quote: "I saved my family 3.5 lakh rupees. The AI found me a full DAAD scholarship and walked me through every visa document. Landed in Berlin 4 months later.",
    rating: 5,
    tint: "#3b82f6",
  },
  {
    name: "Rohan Mehta",
    initials: "RM",
    from: "Mumbai, IN",
    to: "Canada",
    program: "PG Diploma IT",
    quote: "An agency quoted me ₹2.4 lakh. GlobleEdu did the same job — better — in 60 seconds. My visa came in 9 weeks with zero back-and-forth.",
    rating: 5,
    tint: "#06b6d4",
  },
  {
    name: "Fatima Noor",
    initials: "FN",
    from: "Dhaka, BD",
    to: "Malaysia",
    program: "MBBS",
    quote: "The deadline alerts alone saved me. I missed nothing, my checklist was always ready, and the AI answered at 2am when everyone else was asleep.",
    rating: 5,
    tint: "#8b5cf6",
  },
  {
    name: "Chinedu Okafor",
    initials: "CO",
    from: "Lagos, NG",
    to: "UK",
    program: "MSc Finance",
    quote: "The scholarship radar matched me with two grants I didn't even know existed. My SOP was drafted, reviewed and polished within a day.",
    rating: 5,
    tint: "#f59e0b",
  },
  {
    name: "Zainab Alvi",
    initials: "ZA",
    from: "Karachi, PK",
    to: "Australia",
    program: "Bachelor of Nursing",
    quote: "Applied to 8 universities in one afternoon. Tracked every offer in the dashboard. My parents finally understood the whole process.",
    rating: 5,
    tint: "#22c55e",
  },
  {
    name: "Sofia Rahman",
    initials: "SR",
    from: "New Delhi, IN",
    to: "USA",
    program: "MS Computer Science",
    quote: "I used to pay consultants for guesses. Here every 'yes' comes with a source link. Got 3 offers and a 50% scholarship.",
    rating: 5,
    tint: "#ec4899",
  },
];

/* ---------------------------------- Pricing ---------------------------------- */

export const PRICING: {
  name: string;
  price: string;
  period: string;
  tagline: string;
  features: string[];
  cta: string;
  to: string;
  featured: boolean;
}[] = [
  {
    name: "Starter",
    price: "$0",
    period: "/ forever",
    tagline: "Everything you need to start your journey.",
    features: [
      "AI university shortlist (10 results)",
      "Unlimited scholarship matches",
      "Requirement & deadline lookup",
      "Community access",
      "Basic SOP prompts",
    ],
    cta: "Start free",
    to: "/register",
    featured: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "/ month",
    tagline: "For serious applicants ready to apply.",
    features: [
      "Unlimited AI consultant chats",
      "Auto SOP, CV & essay drafts",
      "Apply to 10 universities at once",
      "Visa document validation",
      "Deadline & offer tracking",
      "Priority AI responses",
    ],
    cta: "Go Pro",
    to: "/register",
    featured: true,
  },
  {
    name: "Family",
    price: "$19",
    period: "/ month",
    tagline: "For siblings or a group of friends.",
    features: [
      "Everything in Pro",
      "Up to 4 profiles",
      "Shared document workspace",
      "Dedicated alumni mentor",
      "Monthly progress report",
    ],
    cta: "Start Family",
    to: "/register",
    featured: false,
  },
];

/* ---------------------------------- FAQ ---------------------------------- */

export const FAQS: { q: string; a: string }[] = [
  {
    q: "Is GlobleEdu really free?",
    a: "Yes. The Starter plan is free forever — AI shortlists, scholarship matching, requirements and community access cost nothing. Pro only unlocks unlimited AI chats, auto-documents and bulk applications.",
  },
  {
    q: "How is your data different from a Google search?",
    a: "We index official university pages, admissions portals and embassy sources, then keep each entry linked to its source. Requirements show the date they were last verified, so you never follow stale or fabricated data.",
  },
  {
    q: "Can the AI really replace a consultant?",
    a: "For 95% of applicants, yes. It answers instantly, cites sources and works 24/7. For edge cases — unusual gaps, complex funding, tricky visas — we connect you to verified alumni and mentors who know your target country.",
  },
  {
    q: "Which countries do you cover?",
    a: "70+ destinations including Germany, Canada, Australia, USA, UK, Ireland, New Zealand, Malaysia, the Netherlands, Sweden, Japan and more.",
  },
  {
    q: "Do I need IELTS/PTE to use it?",
    a: "No. Start with your current scores — the AI will recommend the cheapest path, including universities that accept Duolingo, no-exam entry or pathway programs.",
  },
  {
    q: "Is my data safe?",
    a: "Your profile and documents are encrypted, never sold and never shared with any agency or university without your consent. You can delete everything with one click.",
  },
];

/* ---------------------------------- Footer ---------------------------------- */

export const FOOTER_COLS: { title: string; links: { label: string; to: string }[] }[] = [
  {
    title: "Platform",
    links: [
      { label: "Universities", to: "/universities" },
      { label: "Scholarships", to: "/scholarships" },
      { label: "Countries", to: "/countries" },
      { label: "AI Consultant", to: "/chat" },
      { label: "Recommendations", to: "/recommendations" },
      { label: "Applications", to: "/applications" },
    ],
  },
  {
    title: "Students",
    links: [
      { label: "How it works", to: "/how-it-works" },
      { label: "Get matched", to: "/recommendations" },
      { label: "Visa guides", to: "/visa-guides" },
      { label: "SOP templates", to: "/sop-templates" },
      { label: "Community", to: "/community" },
    ],
  },
  {
    title: "Destinations",
    links: [
      { label: "Study in Germany", to: "/study/germany" },
      { label: "Study in Canada", to: "/study/canada" },
      { label: "Study in Australia", to: "/study/australia" },
      { label: "Study in USA", to: "/study/usa" },
      { label: "Study in UK", to: "/study/uk" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "For universities", to: "/collaborate" },
      { label: "About us", to: "/about" },
      { label: "Careers", to: "/careers" },
      { label: "Press kit", to: "/press" },
      { label: "Privacy", to: "/privacy" },
    ],
  },
];

export type { LucideIcon };
