/**
 * landing.js — Landing page data arrays
 * Paul Nyang'wara Portfolio v6.3
 *
 * Extracted from PaulNyangwaraLanding.jsx (TODO #25).
 * Edit content here; the page component handles rendering only.
 *
 * ADR-028 (v6.3): Carousel slides 2–4 updated to African/Nairobi-context imagery.
 * TODO #17: Replace Unsplash placeholders with real NeuroSpark or Nairobi photoshoot images.
 */

export const SLIDES = [
  {
    id: "hero",
    bg: "/corridor.jpg",
    label: "FOUNDER · CEO · AI INNOVATOR",
    heading: "Paul Nyang'wara",
    accent: "Portfolio",
    sub: ["Founder & CEO of ", { accent: "NeuroSpark Corporation" }, " — Kenya's premier AI & automation studio. I build AI agents, automate workflows, craft high-converting websites, and drive search rankings for businesses across Africa."],
    ctas: [
      { label: "Explore Our Work", href: "#projects", variant: "gold"    },
      { label: "Get In Touch",     href: "#contact",  variant: "outline" },
    ],
  },
  {
    id: "ai",
    // ADR-028: African tech professional — swap for NeuroSpark studio photo when available
    bg: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1800&q=80",
    label: "// AI & AUTOMATION",
    heading: "AI Agents &",
    accent: "Intelligent Automation",
    sub: "We design and deploy custom AI agents and automation workflows that eliminate repetitive tasks, streamline operations, and give your SME enterprise-level intelligence — at a fraction of the cost.",
    ctas: [
      { label: "Explore AI Services →", href: "/services", variant: "gold"    },
      { label: "Get In Touch",           href: "#contact",  variant: "outline" },
    ],
  },
  {
    id: "web",
    // ADR-028: African entrepreneur / modern workspace — swap for NeuroSpark client screenshot when available
    bg: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1800&q=80",
    label: "// WEB DEVELOPMENT",
    heading: "Websites That",
    accent: "Convert & Impress",
    sub: "From sleek landing pages to full-scale web applications, we build responsive, fast, and visually compelling digital experiences that turn visitors into loyal customers.",
    ctas: [
      { label: "See Our Web Work →", href: "/services", variant: "gold"    },
      { label: "Get In Touch",        href: "#contact",  variant: "outline" },
    ],
  },
  {
    id: "seo",
    // ADR-028: Business data/analytics desk — swap for Nairobi office shot when available
    bg: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1800&q=80",
    label: "// SEARCH ENGINE OPTIMISATION",
    heading: "Rank #1.",
    accent: "Grow Organically.",
    sub: "We craft data-driven SEO strategies that increase your Google visibility, drive sustained organic traffic, and position your business as the definitive authority in your industry.",
    ctas: [
      { label: "Boost My Rankings →", href: "/services", variant: "gold"    },
      { label: "Get In Touch",          href: "#contact",  variant: "outline" },
    ],
  },
];

export const PROJECTS = [
  { title: "NeuroBot CRM Agent",  desc: "AI-powered customer relationship agent for a Nairobi retail SME.",  tags: ["Python","LangChain","OpenAI"],     img: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&q=80" },
  { title: "SwiftSEO Dashboard",  desc: "SEO analytics tool built for a Kenyan e-commerce brand.",           tags: ["React","Node.js","Analytics"],     img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80" },
  { title: "AfriCart E-Commerce", desc: "Full-stack online store with M-Pesa integration.",                  tags: ["Next.js","M-Pesa API","Supabase"], img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80" },
  { title: "AutoLead AI",         desc: "Automated lead generation and outreach agent.",                      tags: ["Python","Zapier","GPT-4"],         img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80" },
  { title: "CorpSite Redesign",   desc: "Corporate website redesign for a financial services firm.",         tags: ["React","Figma","WordPress"],       img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80" },
  { title: "SmartDesk Chatbot",   desc: "24/7 customer support AI chatbot for a hospitality brand.",         tags: ["NLP","WhatsApp API","Node.js"],    img: "https://images.unsplash.com/photo-1525338078858-d762b5e32f2c?w=600&q=80" },
];

export const SKILLS = [
  { name: "Python",           emoji: "🐍" }, { name: "JavaScript",     emoji: "🟨" }, { name: "React",      emoji: "⚛️" },
  { name: "Next.js",          emoji: "▲"  }, { name: "Node.js",        emoji: "🟢" }, { name: "OpenAI",     emoji: "🤖" },
  { name: "LangChain",        emoji: "🔗" }, { name: "WordPress",      emoji: "🌐" }, { name: "Figma",      emoji: "🎨" },
  { name: "Google Analytics", emoji: "📊" }, { name: "Ahrefs",         emoji: "📡" }, { name: "SEMrush",    emoji: "🔍" },
  { name: "Make",             emoji: "⚙️" }, { name: "Zapier",         emoji: "⚡" }, { name: "Supabase",   emoji: "🗄️" },
  { name: "AWS",              emoji: "☁️" }, { name: "PostgreSQL",     emoji: "🐘" }, { name: "Vercel",     emoji: "🔺" },
  { name: "Multi-Agent AI",   emoji: "🕸️" }, { name: "Event-Driven",   emoji: "🔄" }, { name: "LangGraph",  emoji: "🧠" },
];

export const TESTIMONIALS = [
  { name: "Amara Osei",    company: "QuickMart Kenya",     avatar: "https://images.unsplash.com/photo-1507152832244-10d45c7eda57?w=120&q=80", quote: "NeuroSpark built us an AI agent that handles 80% of our customer queries automatically. Our team now focuses on growth, not repetitive tasks. Paul and his team are simply world-class." },
  { name: "Fatima Hassan", company: "Nairobi Digital Co.", avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=120&q=80", quote: "Our website traffic tripled within 4 months of engaging NeuroSpark for SEO. The results speak for themselves. Highly professional, data-driven, and always delivering on their promises." },
  { name: "David Kiprono", company: "AfriFinance Ltd.",    avatar: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=120&q=80", quote: "The website NeuroSpark designed for us is stunning and converts incredibly well. Paul understood our vision from day one and brought it to life beyond expectations. A true partner." },
];

export const SKILLS_BARS = [
  { label: "AI & Automation",           pct: 95 },
  { label: "Multi-Agent System Design", pct: 91 },
  { label: "Web Development",           pct: 90 },
  { label: "SEO Strategy",              pct: 88 },
];
