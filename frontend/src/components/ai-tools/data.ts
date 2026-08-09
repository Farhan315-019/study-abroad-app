import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Sparkles,
  Building2,
  Award,
  Target,
  ClipboardCheck,
  MailOpen,
  Stamp,
  FileText,
  Globe2,
  Wallet,
  ShieldCheck,
  Search,
  Compass,
  Layers,
  User,
  CalendarClock,
  Send,
  Plane,
  Rocket,
  BadgeCheck,
  MessagesSquare,
  TrendingUp,
  Globe,
} from "lucide-react";

/* ------------------------------- Hero ------------------------------- */

export const AI_HERO = {
  tag: "Your AI-Powered Study Abroad Assistant",
  title: "Everything You Need to Study Abroad.",
  highlight: "Powered by AI.",
  subtitle:
    "Plan, prepare and apply for your study abroad journey — one conversation at a time. GlobleEdu.ai brings your universities, scholarships, documents and visa steps into a single, personalized AI-powered experience.",
  micro: [
    "One profile.",
    "Personalized recommendations.",
    "Smarter decisions.",
    "One complete journey.",
  ],
};

/* --------------------------- Command Center --------------------------- */

export const COMMAND_CENTER = {
  tag: "AI Command Center",
  title: "Ask GlobleEdu AI",
  highlight: "Anything",
  subtitle:
    "Your personal study abroad consultant — ready 24/7 to answer questions about countries, universities, scholarships, documents, deadlines and visas.",
  prompts: [
    "Which country is affordable for my budget?",
    "Find Computer Science universities under my budget.",
    "Can I study in Germany with my IELTS score?",
    "What scholarships am I eligible for?",
    "What documents do I need for a UK student visa?",
    "Which universities match my academic profile?",
  ],
};

export const DEMO_SCRIPT: {
  role: "user" | "bot";
  text: string;
  card?: { label: string; value: string; tint: string }[];
}[] = [
  {
    role: "bot",
    text: "Hi! I'm your GlobleEdu AI consultant 👋 Ask me anything about studying abroad — countries, universities, scholarships or visas.",
  },
  {
    role: "user",
    text: "I have a $15,000 budget and IELTS 6.5. Where can I go?",
  },
  {
    role: "bot",
    text: "Great profile! With that budget, here's what fits you best:",
    card: [
      { label: "Germany · Public Uni", value: "96% fit", tint: "#f59e0b" },
      { label: "Malaysia · Affordable", value: "94% fit", tint: "#06b6d4" },
      { label: "Ireland · 2-yr visa", value: "88% fit", tint: "#22c55e" },
    ],
  },
];

export const DEMO_REPLIES: Record<string, string> = {
  "Which country is affordable for my budget?":
    "Malaysia, Germany and Ireland are excellent budget-friendly options. Germany keeps tuition low at public universities, Malaysia has very affordable fees, and Ireland lets you work while you study. Sign in and I'll match options to your exact budget! 🎯",
  "Find Computer Science universities under my budget.":
    "On it! Many strong CS programs fit a modest budget — public universities in Germany (like TU Munich) and affordable programs in Malaysia and Ireland. Sign in and I'll rank them with fees and requirements! 💻",
  "Can I study in Germany with my IELTS score?":
    "Germany is a great choice! Most programs accept IELTS 6.0–6.5 and public universities charge very low tuition. Sign in and I'll check your exact eligibility against real requirements! 🇩🇪",
  "What scholarships am I eligible for?":
    "That depends on your profile, country and degree. The scholarship matcher filters grants by eligibility and deadline — so you only see ones you can actually win. Sign in to see your matches! 🎓",
  "What documents do I need for a UK student visa?":
    "You'll typically need: passport, CAS, financial proof, language test scores, academic documents and a valid reason for your course. Sign in for a clear step-by-step checklist! 📋",
  "Which universities match my academic profile?":
    "Tell me your scores, budget and target country — I'll shortlist universities ranked by match, with reasons and scholarship odds. Sign in and I'll personalize the results for you! 🏫",
};

export const DEMO_SIGNIN_NOTE =
  "This is a preview. Sign in to get real, personalized answers — and save your chat history.";

/* ---------------------------- Consultant ---------------------------- */

export const CONSULTANT = {
  tag: "AI Consultant",
  title: "Meet Your AI",
  highlight: "Study Abroad Consultant",
  subtitle:
    "Not a search engine. Not a form. An intelligent consultant that understands your background, your goals and your budget — and guides you to the right decisions.",
  steps: [
    {
      title: "Tell Us About Yourself",
      text: "Complete your profile with your academics, budget and goals.",
    },
    {
      title: "AI Understands Your Profile",
      text: "Our AI analyzes your background and builds your personalized picture.",
    },
    {
      title: "Discover Your Best Options",
      text: "Get matched with the universities, countries and scholarships that fit you best.",
    },
    {
      title: "Build Your Roadmap",
      text: "Get a clear step-by-step plan for applications, documents and deadlines.",
    },
    {
      title: "Move Forward With Confidence",
      text: "Apply, track and prepare for your visa — with AI support at every step.",
    },
  ],
};

/* ---------------------------- Categories ---------------------------- */

export const CATEGORIES = {
  tag: "Tool Categories",
  title: "AI Tools Built Around",
  highlight: "Your Journey",
  subtitle:
    "Seven focused AI tools that guide you through every stage — from the first idea to your first day abroad.",
  items: [
    {
      icon: Compass,
      name: "Discover",
      text: "Find universities and countries that match your profile, budget and goals.",
      tint: "#3b82f6",
    },
    {
      icon: ClipboardCheck,
      name: "Apply",
      text: "Build, track and manage your applications with AI-guided drafts.",
      tint: "#06b6d4",
    },
    {
      icon: Award,
      name: "Scholarships",
      text: "Uncover scholarships you're actually eligible for.",
      tint: "#f59e0b",
    },
    {
      icon: FileText,
      name: "Documents",
      text: "Generate SOPs, CVs and checklists in minutes.",
      tint: "#8b5cf6",
    },
    {
      icon: Stamp,
      name: "Visa",
      text: "Get clear visa roadmaps and document checklists.",
      tint: "#ec4899",
    },
    {
      icon: Rocket,
      name: "Preparation",
      text: "Interview prep, deadlines and planning — handled for you.",
      tint: "#f97316",
    },
    {
      icon: Wallet,
      name: "Finance",
      text: "Budget planning and financial documentation support.",
      tint: "#14b8a6",
    },
  ],
};

/* ----------------------------- Core Tools ----------------------------- */

export type ToolStatus = "Live" | "In Applications" | "Coming Soon";

export interface ToolCard {
  id: string;
  icon: LucideIcon;
  name: string;
  value: string;
  desc: string;
  helps: string[];
  cta: string;
  to: string;
  status: ToolStatus;
  tint: string;
}

export const TOOLS = {
  tag: "Core Tools",
  title: "Your Complete",
  highlight: "AI Toolbox",
  subtitle:
    "Seven powerful tools — each one focused, connected and ready to guide you through a specific part of your journey.",
  cards: [
    {
      id: "university-finder",
      icon: Building2,
      name: "AI University Finder",
      value: "Find universities that actually fit you.",
      desc: "Search 141 universities with verified requirements, deadlines, fees and application steps — filtered by your budget, scores and preferences.",
      helps: [
        "Filter by country, budget and scores",
        "Compare requirements side-by-side",
        "See official requirement details",
      ],
      cta: "Find My Universities",
      to: "/universities",
      status: "Live" as ToolStatus,
      tint: "#3b82f6",
    },
    {
      id: "scholarship-matcher",
      icon: Award,
      name: "AI Scholarship Matcher",
      value: "Discover scholarships you can win.",
      desc: "Browse 50+ scholarships and filter by country, degree, deadline and eligibility — matched to your academic profile.",
      helps: [
        "Filter by country, degree and deadline",
        "Match against your academic profile",
        "Check eligibility before you apply",
      ],
      cta: "Find My Scholarships",
      to: "/scholarships",
      status: "Live" as ToolStatus,
      tint: "#f59e0b",
    },
    {
      id: "country-advisor",
      icon: Globe2,
      name: "AI Country Advisor",
      value: "Find your best-fit country.",
      desc: "Get matched countries with clear, explained reasons based on your budget, degree and academics — not guesswork.",
      helps: [
        "Budget-based country matches",
        "Clear reasons for every match",
        "Compare study, work and visa options",
      ],
      cta: "Compare Countries",
      to: "/recommendations",
      status: "Live" as ToolStatus,
      tint: "#06b6d4",
    },
    {
      id: "application-assistant",
      icon: ClipboardCheck,
      name: "AI Application Assistant",
      value: "Track every application in one place.",
      desc: "Track university applications and generate SOP, email and checklist drafts — everything organized by application.",
      helps: [
        "Track status from draft to offer",
        "Generate SOP and email drafts",
        "Checklist per university",
      ],
      cta: "Start Application",
      to: "/applications",
      status: "Live" as ToolStatus,
      tint: "#22c55e",
    },
    {
      id: "email-assistant",
      icon: MailOpen,
      name: "AI Email Assistant",
      value: "Write professional emails in seconds.",
      desc: "Draft admissions, follow-up and inquiry emails that sound professional and get responses.",
      helps: [
        "Admissions inquiry drafts",
        "Follow-up email templates",
        "Professional tone, ready to send",
      ],
      cta: "Open Email Assistant",
      to: "/applications",
      status: "In Applications" as ToolStatus,
      tint: "#8b5cf6",
    },
    {
      id: "chat-consultant",
      icon: Bot,
      name: "AI Chat Consultant",
      value: "Ask anything, anytime.",
      desc: "Your 24/7 study abroad advisor — instant answers about countries, universities, scholarships, documents and visas in English, Urdu and Hindi.",
      helps: [
        "Instant answers 24/7",
        "English, Urdu & Hindi support",
        "Personalized with your profile",
      ],
      cta: "Chat With AI",
      to: "/chat",
      status: "Live" as ToolStatus,
      tint: "#6366f1",
    },
    {
      id: "visa-assistant",
      icon: Stamp,
      name: "AI Visa Assistant",
      value: "Your visa roadmap, step by step.",
      desc: "Know exactly what to prepare — document checklists and clear guidance for your visa application.",
      helps: [
        "Step-by-step visa roadmap",
        "Document checklist per country",
        "Avoid common mistakes",
      ],
      cta: "Start Visa Guide",
      to: "/applications",
      status: "In Applications" as ToolStatus,
      tint: "#ec4899",
    },
  ] as ToolCard[],
};

/* --------------------------- Document Tools --------------------------- */

export const DOCUMENT_TOOLS = {
  tag: "Documents",
  title: "Turn Your Documents Into",
  highlight: "Strong Applications",
  subtitle:
    "Your SOP, CV and documents can make or break your application. These tools help you craft them with confidence.",
  items: [
    {
      icon: FileText,
      name: "AI SOP Generator",
      text: "Generate a tailored Statement of Purpose draft from your profile and target programs.",
      to: "/applications",
      status: "In Applications" as ToolStatus,
      tint: "#8b5cf6",
    },
    {
      icon: Search,
      name: "AI SOP Analyzer",
      text: "Get feedback on your SOP and strengthen your story before you submit.",
      status: "Coming Soon" as ToolStatus,
      tint: "#f97316",
    },
    {
      icon: User,
      name: "AI CV Builder",
      text: "Build an academic CV designed for international applications.",
      status: "Coming Soon" as ToolStatus,
      tint: "#06b6d4",
    },
    {
      icon: MessagesSquare,
      name: "LOR Assistant",
      text: "Plan and draft letters of recommendation requests.",
      status: "Coming Soon" as ToolStatus,
      tint: "#6366f1",
    },
    {
      icon: ClipboardCheck,
      name: "Document Checklist",
      text: "Never miss a required document with per-university checklists.",
      to: "/applications",
      status: "In Applications" as ToolStatus,
      tint: "#22c55e",
    },
  ],
};

/* ---------------------------- Product Demo ---------------------------- */

export const DEMO_JOURNEY = {
  tag: "Product Demo",
  title: "See How GlobleEdu.ai",
  highlight: "Simplifies the Journey",
  subtitle:
    "From your first profile to your visa approval — watch how one AI platform turns a long, confusing process into a clear journey.",
  label: "One Platform. One Personalized Journey.",
  steps: [
    { icon: User, label: "Student Profile" },
    { icon: Sparkles, label: "AI Analysis" },
    { icon: Globe2, label: "Country Recommendations" },
    { icon: Building2, label: "University Matches" },
    { icon: Award, label: "Scholarships" },
    { icon: FileText, label: "Documents" },
    { icon: Send, label: "Application" },
    { icon: BadgeCheck, label: "Offer" },
    { icon: Stamp, label: "Visa" },
  ],
};

/* ------------------------ One Platform Every Step ------------------------ */

export const JOURNEY_STEPS = {
  tag: "One Platform",
  title: "From Your First Question to",
  highlight: "Your First Day Abroad",
  subtitle:
    "Every step of your journey — discover, match, fund, prepare, apply, track, visa and arrive — supported by one AI platform.",
  steps: [
    { icon: Compass, title: "Discover", text: "Explore universities and countries that fit your goals." },
    { icon: Target, title: "Match", text: "Get a personalized shortlist with reasons." },
    { icon: Wallet, title: "Fund", text: "Find scholarships and plan your budget." },
    { icon: FileText, title: "Prepare", text: "Build documents and get ready to apply." },
    { icon: Send, title: "Apply", text: "Apply to universities with AI guidance." },
    { icon: TrendingUp, title: "Track", text: "Track every application from submitted to offer." },
    { icon: Stamp, title: "Visa", text: "Follow your visa roadmap step by step." },
    { icon: Plane, title: "Arrive", text: "Prepare for your first day abroad." },
  ],
};

/* ----------------------------- Tool Finder ----------------------------- */

export const TOOL_FINDER = {
  tag: "Tool Finder",
  title: "Don't Know Which",
  highlight: "Tool to Use?",
  subtitle: "Tell us what you need help with today and we'll point you to the right tool.",
  question: "What do you need help with today?",
  options: [
    { icon: Building2, label: "Find universities for my profile", to: "/universities", tint: "#3b82f6" },
    { icon: Globe2, label: "Match me with countries", to: "/recommendations", tint: "#06b6d4" },
    { icon: Award, label: "Find scholarships for me", to: "/scholarships", tint: "#f59e0b" },
    { icon: ClipboardCheck, label: "Track my applications", to: "/applications", tint: "#22c55e" },
    { icon: FileText, label: "Generate my SOP or email drafts", to: "/applications", tint: "#8b5cf6" },
    { icon: Stamp, label: "Get a document checklist", to: "/applications", tint: "#ec4899" },
    { icon: ShieldCheck, label: "Understand visa requirements", to: "/applications", tint: "#14b8a6" },
    { icon: Wallet, label: "Plan my budget and finances", to: "/chat", tint: "#f97316" },
    { icon: Bot, label: "Ask AI anything", to: "/chat", tint: "#6366f1" },
  ],
};

/* -------------------------------- Why -------------------------------- */

export const WHY_AI = {
  tag: "Why GlobleEdu.AI",
  title: "Why Students Choose an",
  highlight: "AI-Powered Journey",
  subtitle: "Thousands of students trust GlobleEdu.ai to simplify the complex.",
  cards: [
    {
      icon: User,
      title: "One Profile",
      text: "Your complete academic, budget and goal details in one place.",
      tint: "#3b82f6",
    },
    {
      icon: Search,
      title: "Less Searching",
      text: "Stop digging through scattered websites. The AI curates what matters.",
      tint: "#06b6d4",
    },
    {
      icon: Target,
      title: "Personalized Guidance",
      text: "Advice shaped around your scores, budget and goals — not generic tips.",
      tint: "#8b5cf6",
    },
    {
      icon: Layers,
      title: "One Place",
      text: "Universities, scholarships, documents, applications and visa — all in one platform.",
      tint: "#f59e0b",
    },
    {
      icon: CalendarClock,
      title: "Available When You Need It",
      text: "24/7 instant answers. No waiting for business hours or appointments.",
      tint: "#22c55e",
    },
    {
      icon: Globe,
      title: "Global Perspective",
      text: "Compare opportunities across countries and make informed decisions.",
      tint: "#ec4899",
    },
  ],
};

/* -------------------------------- How -------------------------------- */

export const HOW_AI = {
  tag: "How It Works",
  title: "How AI Fits Into Your",
  highlight: "Study Abroad Journey",
  subtitle: "AI is your guide and assistant — here's how it helps.",
  points: [
    "Analyzes your academic profile and budget",
    "Organizes and explains university requirements",
    "Identifies countries and universities that match your goals",
    "Compares options with clear reasons",
    "Generates drafts for SOPs, emails and checklists",
    "Explains visa requirements step by step",
    "Helps you prepare for interviews and deadlines",
    "Keeps your whole journey organized in one place",
  ],
  disclaimer:
    "AI provides guidance and assistance. Final decisions remain with universities, scholarship providers and government authorities.",
};

/* -------------------------------- FAQ -------------------------------- */

export const AI_FAQS: { q: string; a: string }[] = [
  {
    q: "Is this really free?",
    a: "Yes. The platform is free to use — searching universities, browsing scholarships and chatting with the AI cost nothing. You only pay, if you choose, for optional premium plans later.",
  },
  {
    q: "How is GlobleEdu.ai different from Google?",
    a: "We index official university pages, admissions portals and embassy sources, then link every requirement to its source. The AI curates and compares for you — so you stop digging through scattered results.",
  },
  {
    q: "Can the AI actually help with my profile?",
    a: "Yes. Complete your profile with your academics, budget and goals, and the AI personalizes answers and recommendations around you — not generic advice.",
  },
  {
    q: "Do I need IELTS/PTE to use it?",
    a: "No. Start with your current scores. The AI will guide you to options that fit, including universities that accept other tests or pathway programs.",
  },
  {
    q: "Which countries does it cover?",
    a: "70+ destinations including Germany, Canada, Australia, USA, UK, Ireland, New Zealand, Malaysia, the Netherlands, Sweden, Japan and more.",
  },
  {
    q: "How accurate is the data?",
    a: "We index official sources and keep each requirement linked to its origin. Always confirm critical deadlines and requirements on the official page.",
  },
  {
    q: "Can I really get scholarships with it?",
    a: "You'll see scholarships you're actually eligible for, filtered by country, degree and deadline — then the AI helps you understand what's needed to apply.",
  },
  {
    q: "Is the AI a replacement for a consultant?",
    a: "For most applicants, yes — it's faster, cheaper and always available. For complex edge cases, we recommend also consulting official sources and professionals.",
  },
  {
    q: "Is my data safe?",
    a: "Your profile and documents are encrypted, never sold and never shared with agencies or universities without your consent. You can delete your data anytime.",
  },
  {
    q: "Do I need to pay for visa help?",
    a: "Visa guidance and document checklists are part of the platform. Official visa decisions and fees always come from government authorities.",
  },
  {
    q: "What documents do I need for applications?",
    a: "Typically: academic transcripts, degree certificates, passport, language test scores (IELTS/PTE/TOEFL), SOP, CV, recommendation letters and financial proof — the AI gives you a per-university checklist.",
  },
  {
    q: "Can I chat in Urdu or Hindi?",
    a: "Yes! Ask in English, Urdu or Hindi — the AI understands and responds in a way you'll find easy to understand.",
  },
];

/* ------------------------------ Final CTA ------------------------------ */

export const FINAL_CTA = {
  title: "Stop Searching Everywhere. Start Your Journey",
  highlight: "in One Place.",
  subtitle:
    "Create your free profile and discover what your study abroad journey could look like — with AI support at every step.",
  primary: "Start My AI Journey",
  secondary: "Explore Universities",
  micro: "Create your profile and discover what your study abroad journey could look like.",
};

export type { LucideIcon };
