import { useState, useEffect, useRef, useCallback } from "react";

const NAVY       = "#0A1F44";
const GOLD       = "#D4AF37";
const GOLD_LIGHT = "#F0D060";
const OFF_WHITE  = "#F9F8F4";
const CHARCOAL   = "#1A1A2E";

// ─── Carousel Slides ────────────────────────────────────────────────────────
const SLIDES = [
  {
    id: "hero",
    bg: "/corridor.jpg",
    label: "FOUNDER · CEO · AI INNOVATOR",
    heading: "Paul Nyang'wara",
    accent: "Portfolio",
    sub: "Founder & CEO of <b style='color:#D4AF37'>NeuroSpark Corporation</b> — Kenya's premier AI & automation studio. I build AI agents, automate workflows, craft high-converting websites, and drive search rankings for businesses across Africa.",
    ctas: [
      { label: "Explore Our Work", href: "#projects", variant: "gold"    },
      { label: "Get In Touch",     href: "#contact",  variant: "outline" },
    ],
  },
  {
    id: "ai",
    bg: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1800&q=80",
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
    bg: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1800&q=80",
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
    bg: "https://images.unsplash.com/photo-1562577309-2592ab84b1bc?w=1800&q=80",
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

const PROJECTS = [
  { title: "NeuroBot CRM Agent",  desc: "AI-powered customer relationship agent for a Nairobi retail SME.",  tags: ["Python","LangChain","OpenAI"],     img: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&q=80" },
  { title: "SwiftSEO Dashboard",  desc: "SEO analytics tool built for a Kenyan e-commerce brand.",           tags: ["React","Node.js","Analytics"],     img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80" },
  { title: "AfriCart E-Commerce", desc: "Full-stack online store with M-Pesa integration.",                  tags: ["Next.js","M-Pesa API","Supabase"], img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80" },
  { title: "AutoLead AI",         desc: "Automated lead generation and outreach agent.",                      tags: ["Python","Zapier","GPT-4"],         img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80" },
  { title: "CorpSite Redesign",   desc: "Corporate website redesign for a financial services firm.",         tags: ["React","Figma","WordPress"],       img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80" },
  { title: "SmartDesk Chatbot",   desc: "24/7 customer support AI chatbot for a hospitality brand.",         tags: ["NLP","WhatsApp API","Node.js"],    img: "https://images.unsplash.com/photo-1525338078858-d762b5e32f2c?w=600&q=80" },
];

const SKILLS = [
  { name: "Python",           emoji: "🐍" }, { name: "JavaScript",     emoji: "🟨" }, { name: "React",      emoji: "⚛️" },
  { name: "Next.js",          emoji: "▲"  }, { name: "Node.js",        emoji: "🟢" }, { name: "OpenAI",     emoji: "🤖" },
  { name: "LangChain",        emoji: "🔗" }, { name: "WordPress",      emoji: "🌐" }, { name: "Figma",      emoji: "🎨" },
  { name: "Google Analytics", emoji: "📊" }, { name: "Ahrefs",         emoji: "📡" }, { name: "SEMrush",    emoji: "🔍" },
  { name: "Make",             emoji: "⚙️" }, { name: "Zapier",         emoji: "⚡" }, { name: "Supabase",   emoji: "🗄️" },
  { name: "AWS",              emoji: "☁️" }, { name: "PostgreSQL",     emoji: "🐘" }, { name: "Vercel",     emoji: "🔺" },
];

const TESTIMONIALS = [
  { name: "Amara Osei",    company: "QuickMart Kenya",     avatar: "https://images.unsplash.com/photo-1507152832244-10d45c7eda57?w=120&q=80", quote: "NeuroSpark built us an AI agent that handles 80% of our customer queries automatically. Our team now focuses on growth, not repetitive tasks. Paul and his team are simply world-class." },
  { name: "Fatima Hassan", company: "Nairobi Digital Co.", avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=120&q=80", quote: "Our website traffic tripled within 4 months of engaging NeuroSpark for SEO. The results speak for themselves. Highly professional, data-driven, and always delivering on their promises." },
  { name: "David Kiprono", company: "AfriFinance Ltd.",    avatar: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=120&q=80", quote: "The website NeuroSpark designed for us is stunning and converts incredibly well. Paul understood our vision from day one and brought it to life beyond expectations. A true partner." },
];

const SKILLS_BARS = [
  { label: "AI & Automation",     pct: 95 },
  { label: "Web Development",     pct: 90 },
  { label: "SEO Strategy",        pct: 88 },
  { label: "Business Consulting", pct: 85 },
];

// ─── SVG Icons ───────────────────────────────────────────────────────────────
const IconEmail = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="3"/>
    <path d="M2 8l10 7 10-7"/>
  </svg>
);
const IconPhone = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.4 2.18 2 2 0 012.38 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
  </svg>
);
const IconPin = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);
const IconGitHub = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);
const IconFacebook = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
  </svg>
);
const IconX = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
const IconInstagram = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);
const IconPlay = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
);
const IconPause = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
);

const SOCIALS = [
  { label: "GitHub",    href: "https://github.com/oprobandi",       Icon: IconGitHub    },
  { label: "Facebook",  href: "https://www.facebook.com/oprobandi", Icon: IconFacebook  },
  { label: "X",         href: "https://x.com/o_probandi",           Icon: IconX         },
  { label: "Instagram", href: "https://instagram.com/oprobandi",    Icon: IconInstagram },
];

const CONTACT_INFO = [
  { Icon: IconEmail, label: "Email",    value: "pnyangwara@gmail.com" },
  { Icon: IconPhone, label: "Phone",    value: "+254 799 644 100"     },
  { Icon: IconPin,   label: "Location", value: "Nairobi, Kenya 🇰🇪"   },
];

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600&family=Space+Grotesk:wght@400;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'DM Sans', sans-serif; background: ${OFF_WHITE}; color: ${CHARCOAL}; overflow-x: hidden; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: ${NAVY}; }
  ::-webkit-scrollbar-thumb { background: ${GOLD}; border-radius: 3px; }

  @keyframes pulse-gold { 0%,100%{box-shadow:0 0 0 0 rgba(212,175,55,0.7)}50%{box-shadow:0 0 0 14px rgba(212,175,55,0)}}
  @keyframes bounce-arrow { 0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(-10px)}}
  @keyframes float { 0%,100%{transform:translateY(0px) rotate(0deg)}33%{transform:translateY(-20px) rotate(1deg)}66%{transform:translateY(-10px) rotate(-1deg)}}
  @keyframes ticker { 0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
  @keyframes fadeInUp { from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn { from{opacity:0}to{opacity:1}}
  @keyframes starGlow { 0%,100%{text-shadow:0 0 4px ${GOLD}}50%{text-shadow:0 0 12px ${GOLD_LIGHT}}}
  @keyframes wa-pulse { 0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}
  @keyframes slideUp { from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}

  /* ── Carousel ── */
  .carousel-wrap {
    position: relative;
    height: 100vh;
    min-height: 700px;
    overflow: hidden;
  }
  .carousel-slide {
    position: absolute;
    inset: 0;
    transition: opacity 0.85s ease;
    pointer-events: none;
  }
  .carousel-slide.active {
    pointer-events: auto;
  }
  .carousel-bg {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    transition: transform 8s ease-out;
    transform: scale(1.04);
  }
  .carousel-bg.zoomed {
    transform: scale(1.1);
  }
  .carousel-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(10,31,68,0.78) 0%, rgba(10,31,68,0.48) 55%, rgba(0,0,0,0.38) 100%);
  }
  .carousel-body {
    position: relative;
    z-index: 2;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 80px;
  }

  /* Arrows */
  .c-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 20;
    width: 50px; height: 50px;
    border-radius: 50%;
    background: rgba(10,31,68,0.55);
    border: 1.5px solid rgba(212,175,55,0.5);
    color: ${GOLD};
    font-size: 22px;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.3s;
    backdrop-filter: blur(8px);
    line-height: 1;
  }
  .c-arrow:hover {
    background: rgba(212,175,55,0.18);
    border-color: ${GOLD};
    transform: translateY(-50%) scale(1.1);
  }
  .c-arrow.left  { left: 24px; }
  .c-arrow.right { right: 24px; }

  /* Dots */
  .c-dots {
    position: absolute;
    bottom: 76px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 20;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .c-dot {
    height: 8px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
    background: rgba(255,255,255,0.35);
    padding: 0;
  }
  .c-dot.on { background: ${GOLD}; }

  /* Play/Pause */
  .c-pp {
    position: absolute;
    bottom: 72px;
    right: 28px;
    z-index: 20;
    width: 34px; height: 34px;
    border-radius: 50%;
    background: rgba(10,31,68,0.55);
    border: 1px solid rgba(212,175,55,0.45);
    color: ${GOLD};
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.3s;
    backdrop-filter: blur(8px);
  }
  .c-pp:hover { background: rgba(212,175,55,0.18); border-color: ${GOLD}; }

  /* Progress bar */
  .c-progress {
    position: absolute;
    bottom: 0; left: 0;
    height: 3px;
    background: ${GOLD};
    z-index: 20;
    transition: width 0.1s linear;
    box-shadow: 0 0 8px rgba(212,175,55,0.6);
  }

  /* Glass card */
  .glass-card {
    background: rgba(10,31,68,0.68);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(212,175,55,0.3);
    border-radius: 20px;
    padding: 52px 48px;
    max-width: 800px;
    width: 100%;
    animation: slideUp 0.75s cubic-bezier(0.16,1,0.3,1) both;
  }

  /* Shared buttons */
  .btn-gold {
    background: ${GOLD}; color: ${NAVY}; border: none;
    padding: 14px 32px; border-radius: 8px;
    font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 15px;
    cursor: pointer; transition: all 0.3s; letter-spacing: 0.5px;
    text-decoration: none; display: inline-block;
  }
  .btn-gold:hover { background: ${GOLD_LIGHT}; transform: translateY(-3px); box-shadow: 0 12px 30px rgba(212,175,55,0.4); }
  .btn-outline {
    background: transparent; color: white; border: 2px solid ${GOLD};
    padding: 13px 32px; border-radius: 8px;
    font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 15px;
    cursor: pointer; transition: all 0.3s; letter-spacing: 0.5px;
    text-decoration: none; display: inline-block;
  }
  .btn-outline:hover { background: ${GOLD}; color: ${NAVY}; transform: translateY(-3px); box-shadow: 0 12px 30px rgba(212,175,55,0.4); }

  /* Project cards */
  .project-card { background: white; border-radius: 16px; overflow: hidden; border: 1px solid rgba(10,31,68,0.08); transition: all 0.4s cubic-bezier(0.25,0.8,0.25,1); }
  .project-card:hover { transform: translateY(-10px); box-shadow: 0 20px 50px rgba(212,175,55,0.2), 0 6px 15px rgba(10,31,68,0.12); border-color: ${GOLD}; }
  .project-card:hover .project-overlay { opacity: 1; }
  .project-overlay { position: absolute; inset: 0; background: rgba(10,31,68,0.75); display: flex; align-items: center; justify-content: center; gap: 12px; opacity: 0; transition: opacity 0.3s; }

  /* Skills */
  .skill-icon-wrap { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 20px 16px; border-radius: 12px; transition: all 0.3s; cursor: default; min-width: 80px; }
  .skill-icon-wrap:hover { background: rgba(212,175,55,0.15); transform: translateY(-6px); }

  /* Testimonials */
  .testimonial-card { background: white; border-radius: 16px; padding: 36px; border: 1px solid rgba(10,31,68,0.08); box-shadow: 0 4px 20px rgba(10,31,68,0.06); transition: all 0.4s; }
  .testimonial-card:hover { box-shadow: 0 12px 40px rgba(212,175,55,0.15); border-color: ${GOLD}; transform: translateY(-4px); }

  /* Form */
  .input-field { width: 100%; padding: 14px 18px; border: 1.5px solid rgba(10,31,68,0.15); border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 15px; background: white; color: ${CHARCOAL}; outline: none; transition: border-color 0.3s, box-shadow 0.3s; }
  .input-field:focus { border-color: ${GOLD}; box-shadow: 0 0 0 3px rgba(212,175,55,0.15); }

  /* Social icon buttons */
  .soc-btn { display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 9px; border: 1px solid rgba(212,175,55,0.4); color: rgba(212,175,55,0.7); background: transparent; text-decoration: none; transition: all 0.3s; }
  .soc-btn:hover { border-color: ${GOLD}; color: ${GOLD}; background: rgba(212,175,55,0.08); transform: translateY(-2px); }

  /* Contact info icon box */
  .ci-box { width: 46px; height: 46px; background: rgba(212,175,55,0.1); border: 1px solid rgba(212,175,55,0.3); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: ${GOLD}; flex-shrink: 0; transition: all 0.3s; }
  .ci-box:hover { background: rgba(212,175,55,0.18); border-color: ${GOLD}; }

  /* Typography helpers */
  .section-label { font-family: 'Space Grotesk', sans-serif; color: ${GOLD}; font-size: 13px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 12px; }
  .section-heading { font-family: 'Playfair Display', serif; font-size: clamp(32px,4vw,52px); font-weight: 900; color: ${NAVY}; line-height: 1.15; }
  .section-heading-light { font-family: 'Playfair Display', serif; font-size: clamp(32px,4vw,52px); font-weight: 900; color: white; line-height: 1.15; }
  .gold-divider { width: 60px; height: 3px; background: linear-gradient(90deg,${GOLD},${GOLD_LIGHT}); border-radius: 2px; margin: 16px 0 24px; }

  .stat-card { text-align: center; padding: 24px 20px; border: 1px solid rgba(212,175,55,0.3); border-radius: 12px; background: rgba(212,175,55,0.05); transition: all 0.3s; }
  .stat-card:hover { background: rgba(212,175,55,0.12); border-color: ${GOLD}; transform: translateY(-4px); }

  .mobile-menu { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: ${NAVY}; z-index: 998; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 32px; animation: fadeIn 0.3s ease; }

  @media (max-width: 768px) {
    .glass-card { padding: 32px 20px; }
    .carousel-body { padding: 0 20px; }
    .c-arrow { width: 38px; height: 38px; font-size: 18px; }
    .c-arrow.left  { left: 10px; }
    .c-arrow.right { right: 10px; }
    .desktop-nav { display: none !important; }
    .grid-3 { grid-template-columns: 1fr !important; }
    .grid-2 { grid-template-columns: 1fr !important; }
    .about-grid { grid-template-columns: 1fr !important; }
    .stats-row { flex-direction: column; }
  }
  @media (min-width: 769px) { .mobile-menu-btn { display: none !important; } }
`;

// ─── Helpers ─────────────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function AnimSection({ children, style = {}, delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(40px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

function SkillBar({ label, pct }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: NAVY }}>{label}</span>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700, color: GOLD }}>{pct}%</span>
      </div>
      <div style={{ height: 8, background: "rgba(10,31,68,0.1)", borderRadius: 4, overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: inView ? `${pct}%` : "0%",
          background: `linear-gradient(90deg,${NAVY},${GOLD})`,
          borderRadius: 4,
          transition: "width 1.2s cubic-bezier(0.4,0,0.2,1) 0.3s",
        }} />
      </div>
    </div>
  );
}

// ─── Hero Carousel Component ──────────────────────────────────────────────────
const AUTOPLAY_MS = 5000;

function HeroCarousel() {
  const [current, setCurrent]   = useState(0);
  const [playing, setPlaying]   = useState(true);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused]     = useState(false); // hover pause
  const rafRef       = useRef(null);
  const startRef     = useRef(null);
  const elapsedRef   = useRef(0);
  const pausedRef    = useRef(false);
  const playingRef   = useRef(true);

  // Keep refs in sync
  useEffect(() => { pausedRef.current = paused; }, [paused]);
  useEffect(() => { playingRef.current = playing; }, [playing]);

  const goTo = useCallback((idx) => {
    setCurrent((idx + SLIDES.length) % SLIDES.length);
    elapsedRef.current = 0;
    setProgress(0);
    startRef.current = null;
  }, []);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // rAF-based progress ticker
  useEffect(() => {
    cancelAnimationFrame(rafRef.current);

    const tick = (timestamp) => {
      if (!playingRef.current || pausedRef.current) {
        // Suspended — store elapsed so far, then retry next frame
        if (startRef.current !== null) {
          elapsedRef.current += timestamp - startRef.current;
          startRef.current = null;
        }
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      // Running
      if (startRef.current === null) startRef.current = timestamp;
      const total = elapsedRef.current + (timestamp - startRef.current);
      const pct   = Math.min((total / AUTOPLAY_MS) * 100, 100);
      setProgress(pct);

      if (total >= AUTOPLAY_MS) {
        setCurrent(c => (c + 1) % SLIDES.length);
        elapsedRef.current = 0;
        startRef.current   = null;
        setProgress(0);
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [current]); // restart on slide change

  // Keyboard nav
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") { next(); }
      else if (e.key === "ArrowLeft") { prev(); }
      else if (e.key === " ") { e.preventDefault(); setPlaying(p => !p); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  return (
    <section
      id="home"
      className="carousel-wrap"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slide layers */}
      {SLIDES.map((slide, i) => {
        const isActive = i === current;
        return (
          <div
            key={slide.id}
            className={`carousel-slide${isActive ? " active" : ""}`}
            style={{ opacity: isActive ? 1 : 0, zIndex: isActive ? 1 : 0 }}
          >
            <div
              className={`carousel-bg${isActive ? " zoomed" : ""}`}
              style={{ backgroundImage: `url(${slide.bg})` }}
            />
            <div className="carousel-overlay" />

            {/* Slide content — only render when active for clean re-animation */}
            {isActive && (
              <div className="carousel-body">
                <div className="glass-card" key={`card-${i}`}>
                  {/* Badge */}
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    background: "rgba(212,175,55,0.15)", border: `1px solid ${GOLD}`,
                    borderRadius: 20, padding: "6px 16px", marginBottom: 22,
                  }}>
                    <span style={{ fontSize: 13 }}>⚡</span>
                    <span style={{ color: GOLD, fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 2 }}>
                      {slide.label}
                    </span>
                  </div>

                  {/* Heading */}
                  <h1 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(26px,4.5vw,54px)",
                    fontWeight: 900, color: "white", lineHeight: 1.15, marginBottom: 18,
                  }}>
                    {slide.heading}<br />
                    <span style={{ color: GOLD }}>{slide.accent}</span>
                  </h1>

                  {/* Sub */}
                  <p
                    style={{ color: "rgba(255,255,255,0.85)", fontSize: "clamp(13px,1.7vw,17px)", lineHeight: 1.78, marginBottom: 34, fontWeight: 300, maxWidth: 580 }}
                    dangerouslySetInnerHTML={{ __html: slide.sub }}
                  />

                  {/* CTAs */}
                  <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                    {slide.ctas.map(cta => (
                      <a key={cta.label} href={cta.href} style={{ textDecoration: "none" }}>
                        <button className={cta.variant === "gold" ? "btn-gold" : "btn-outline"}>
                          {cta.label}
                        </button>
                      </a>
                    ))}
                  </div>

                  {/* Slide counter */}
                  <div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", color: GOLD, fontSize: 14, fontWeight: 700 }}>
                      {String(current + 1).padStart(2, "0")}
                    </span>
                    <div style={{ width: 56, height: 1, background: "rgba(212,175,55,0.35)" }} />
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", color: "rgba(255,255,255,0.38)", fontSize: 14 }}>
                      {String(SLIDES.length).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Arrows */}
      <button className="c-arrow left"  onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous slide">‹</button>
      <button className="c-arrow right" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next slide">›</button>

      {/* Dots */}
      <div className="c-dots">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`c-dot${i === current ? " on" : ""}`}
            style={{ width: i === current ? 28 : 8 }}
            onClick={(e) => { e.stopPropagation(); goTo(i); }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Play / Pause */}
      <button
        className="c-pp"
        onClick={(e) => { e.stopPropagation(); setPlaying(p => !p); }}
        title={playing ? "Pause (Space)" : "Play (Space)"}
        aria-label={playing ? "Pause autoplay" : "Resume autoplay"}
      >
        {playing && !paused ? <IconPause /> : <IconPlay />}
      </button>

      {/* Progress bar */}
      <div className="c-progress" style={{ width: `${progress}%` }} />

      {/* Scroll hint */}
      <div
        style={{ position: "absolute", bottom: 28, left: "50%", animation: "bounce-arrow 2s infinite", cursor: "pointer", zIndex: 10 }}
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        aria-label="Scroll to About"
      >
        <div style={{ color: GOLD, fontSize: 26, filter: "drop-shadow(0 0 8px rgba(212,175,55,0.8))" }}>↓</div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PaulNyangwaraPortfolio() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [formState, setFormState]   = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [submitted, setSubmitted]   = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError]   = useState("");

  useEffect(() => {
    const interval = setInterval(() => setActiveTestimonial(t => (t + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError("");
    try {
      const res = await fetch("https://formspree.io/f/maqdryly", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formState),
      });
      if (res.ok) {
        setSubmitted(true);
        setFormState({ name: "", email: "", phone: "", service: "", message: "" });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setFormError("Something went wrong. Please try again or email us directly.");
      }
    } catch {
      setFormError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <style>{styles}</style>

      {/* ─── HERO CAROUSEL ─── */}
      <HeroCarousel />

      {/* ─── ABOUT ─── */}
      <section id="about" style={{ background: OFF_WHITE, padding: "100px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 64, alignItems: "center" }}>

            <AnimSection>
              <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{
                  width: 280, height: 280, borderRadius: "50%", border: `4px solid ${GOLD}`,
                  overflow: "hidden", boxShadow: `0 0 0 8px rgba(212,175,55,0.15), 0 20px 60px rgba(10,31,68,0.2)`,
                  animation: "float 6s ease-in-out infinite",
                }}>
                  <img src="/paul-headshot.jpg" alt="Paul Nyang'wara" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ marginTop: 20, background: NAVY, color: "white", padding: "8px 20px", borderRadius: 20, fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, border: `1px solid ${GOLD}` }}>
                  🇰🇪 Nairobi, Kenya
                </div>
                <div className="stats-row" style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap", justifyContent: "center" }}>
                  {[["50+", "Clients"], ["3", "Services"], ["100%", "Kenya-Focused"]].map(([val, lab]) => (
                    <div key={lab} className="stat-card">
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 900, color: NAVY }}>{val}</div>
                      <div style={{ color: GOLD, fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 1 }}>{lab}</div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimSection>

            <AnimSection delay={0.2}>
              <div className="section-label">// About Me</div>
              <h2 className="section-heading">Builder. Innovator.<br /><span style={{ color: GOLD }}>AI Visionary.</span></h2>
              <div className="gold-divider" />
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "#444", marginBottom: 32 }}>
                Paul Nyang'wara is the visionary Founder and CEO of <strong style={{ color: NAVY }}>NeuroSpark Corporation</strong> — a cutting-edge technology company headquartered in Kenya. With a passion for leveraging artificial intelligence to solve real-world problems for African businesses, Paul leads a team dedicated to building smart AI agents, automation pipelines, SEO strategies, and professional digital experiences that drive measurable growth for SMEs.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {SKILLS_BARS.map(({ label, pct }) => <SkillBar key={label} label={label} pct={pct} />)}
              </div>
            </AnimSection>

          </div>
        </div>
      </section>

      {/* ─── PROJECTS ─── */}
      <section id="projects" style={{ background: OFF_WHITE, padding: "100px 40px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <AnimSection style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="section-label">// Our Work</div>
            <h2 className="section-heading">Projects That<br /><span style={{ color: GOLD }}>Speak for Themselves</span></h2>
            <div className="gold-divider" style={{ margin: "16px auto 0" }} />
          </AnimSection>
          <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {PROJECTS.map((p, i) => (
              <AnimSection key={p.title} delay={i * 0.1}>
                <div className="project-card">
                  <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
                    <img src={p.img} alt={p.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}
                      onMouseEnter={e => e.target.style.transform = "scale(1.1)"}
                      onMouseLeave={e => e.target.style.transform = "scale(1)"} />
                    <div className="project-overlay">
                      <button className="btn-gold" style={{ padding: "9px 18px", fontSize: 12 }}>View Live</button>
                      <button className="btn-outline" style={{ padding: "8px 18px", fontSize: 12, borderColor: "white", color: "white" }}>Case Study</button>
                    </div>
                  </div>
                  <div style={{ padding: "20px 20px 24px" }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", color: NAVY, fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{p.title}</h3>
                    <p style={{ color: "#666", fontSize: 13, lineHeight: 1.6, marginBottom: 12 }}>{p.desc}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {p.tags.map(t => (
                        <span key={t} style={{ background: NAVY, color: GOLD, padding: "2px 10px", borderRadius: 20, fontSize: 10, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SKILLS ─── */}
      <section id="skills" style={{ background: NAVY, padding: "100px 0" }}>
        <div style={{ textAlign: "center", marginBottom: 56, padding: "0 40px" }}>
          <AnimSection>
            <div className="section-label">// Tech Stack</div>
            <h2 className="section-heading-light">Technologies We <span style={{ color: GOLD }}>Master</span></h2>
            <div className="gold-divider" style={{ margin: "16px auto 0" }} />
          </AnimSection>
        </div>
        <div style={{ overflow: "hidden", padding: "16px 0" }}>
          <div style={{ display: "flex", animation: "ticker 30s linear infinite", width: "max-content" }}>
            {[...SKILLS, ...SKILLS].map((s, i) => (
              <div key={i} className="skill-icon-wrap" style={{ color: "white" }}>
                <span style={{ fontSize: 32 }}>{s.emoji}</span>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.7)", fontWeight: 600, letterSpacing: 0.5, whiteSpace: "nowrap" }}>{s.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ overflow: "hidden", padding: "16px 0" }}>
          <div style={{ display: "flex", animation: "ticker 40s linear infinite reverse", width: "max-content" }}>
            {[...SKILLS.slice(8), ...SKILLS.slice(0, 8), ...SKILLS.slice(8), ...SKILLS.slice(0, 8)].map((s, i) => (
              <div key={i} className="skill-icon-wrap" style={{ color: "white" }}>
                <span style={{ fontSize: 32 }}>{s.emoji}</span>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.7)", fontWeight: 600, letterSpacing: 0.5, whiteSpace: "nowrap" }}>{s.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section id="testimonials" style={{ background: OFF_WHITE, padding: "100px 40px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <AnimSection style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="section-label">// Client Love</div>
            <h2 className="section-heading">What Our Clients <span style={{ color: GOLD }}>Say</span></h2>
            <div className="gold-divider" style={{ margin: "16px auto 0" }} />
          </AnimSection>
          <AnimSection delay={0.2}>
            <div className="testimonial-card">
              <div style={{ marginBottom: 16, animation: "starGlow 3s ease-in-out infinite" }}>
                {"★★★★★".split("").map((s, i) => <span key={i} style={{ color: GOLD, fontSize: 20 }}>{s}</span>)}
              </div>
              <p style={{ fontSize: "clamp(15px,2vw,18px)", lineHeight: 1.8, color: "#444", fontStyle: "italic", marginBottom: 28 }}>
                "{TESTIMONIALS[activeTestimonial].quote}"
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <img src={TESTIMONIALS[activeTestimonial].avatar} alt={TESTIMONIALS[activeTestimonial].name}
                  style={{ width: 52, height: 52, borderRadius: "50%", objectFit: "cover", border: `2px solid ${GOLD}` }} />
                <div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: NAVY, fontSize: 16 }}>{TESTIMONIALS[activeTestimonial].name}</div>
                  <div style={{ color: GOLD, fontSize: 13, fontWeight: 500 }}>{TESTIMONIALS[activeTestimonial].company}</div>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 28 }}>
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setActiveTestimonial(i)} style={{ width: i === activeTestimonial ? 28 : 10, height: 10, borderRadius: 5, background: i === activeTestimonial ? GOLD : "rgba(10,31,68,0.2)", border: "none", cursor: "pointer", transition: "all 0.3s" }} />
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 16 }}>
              {["←", "→"].map((arrow, di) => (
                <button key={arrow}
                  onClick={() => setActiveTestimonial(t => (t + (di ? 1 : -1) + TESTIMONIALS.length) % TESTIMONIALS.length)}
                  style={{ width: 42, height: 42, borderRadius: "50%", background: "transparent", border: `2px solid ${GOLD}`, color: GOLD, fontSize: 18, cursor: "pointer", transition: "all 0.3s" }}
                  onMouseEnter={e => { e.target.style.background = GOLD; e.target.style.color = NAVY; }}
                  onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = GOLD; }}>
                  {arrow}
                </button>
              ))}
            </div>
          </AnimSection>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" style={{ background: NAVY, padding: "100px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>

            {/* Left */}
            <AnimSection>
              <div className="section-label">// Let's Connect</div>
              <h2 className="section-heading-light">Ready to Transform<br /><span style={{ color: GOLD }}>Your Business?</span></h2>
              <div className="gold-divider" />
              <p style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.8, marginBottom: 36, fontSize: 15 }}>
                Whether you want to automate your operations, build your digital presence, or rank #1 on Google — NeuroSpark Corporation is your partner. Reach out and let's build something extraordinary.
              </p>

              {/* Contact info — SVG icons */}
              {CONTACT_INFO.map(({ Icon, label, value }) => (
                <div key={label} style={{ display: "flex", gap: 16, marginBottom: 20, alignItems: "center" }}>
                  <div className="ci-box"><Icon /></div>
                  <div>
                    <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: 1.5, textTransform: "uppercase" }}>{label}</div>
                    <div style={{ color: "white", fontSize: 15, fontWeight: 500, marginTop: 2 }}>{value}</div>
                  </div>
                </div>
              ))}

              {/* Social icons — same as footer */}
              <div style={{ display: "flex", gap: 10, marginTop: 24, flexWrap: "wrap" }}>
                {SOCIALS.map(({ label, href, Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="soc-btn" aria-label={label} title={label}>
                    <Icon />
                  </a>
                ))}
              </div>
            </AnimSection>

            {/* Form */}
            <AnimSection delay={0.2}>
              <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(212,175,55,0.2)", borderRadius: 16, padding: "40px 36px" }}>
                {submitted ? (
                  <div style={{ textAlign: "center", padding: "40px 0", animation: "fadeInUp 0.5s ease" }}>
                    <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", color: "white", fontSize: 24, marginBottom: 8 }}>Message Sent!</h3>
                    <p style={{ color: "rgba(255,255,255,0.7)" }}>We'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {[["Full Name", "name", "text", true], ["Email Address", "email", "email", true], ["Phone Number", "phone", "tel", false]].map(([ph, key, type, req]) => (
                      <input key={key} className="input-field" type={type} placeholder={ph} required={req}
                        value={formState[key]}
                        onChange={e => setFormState(s => ({ ...s, [key]: e.target.value }))} />
                    ))}
                    <select className="input-field" value={formState.service}
                      onChange={e => setFormState(s => ({ ...s, service: e.target.value }))} required>
                      <option value="">Service Interested In…</option>
                      <option>AI Agents &amp; Automation</option>
                      <option>Website Development</option>
                      <option>Search Engine Optimisation</option>
                    </select>
                    <textarea className="input-field" placeholder="Your Message…" rows={4} required
                      value={formState.message}
                      onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                      style={{ resize: "vertical" }} />
                    {formError && (
                      <p style={{ color: "#ff6b6b", fontSize: 13, fontFamily: "'Space Grotesk', sans-serif" }}>{formError}</p>
                    )}
                    <button type="submit" className="btn-gold" style={{ fontSize: 15, padding: "15px 32px", opacity: submitting ? 0.7 : 1, cursor: submitting ? "not-allowed" : "pointer" }} disabled={submitting}>
                      {submitting ? "Sending…" : "Send Message →"}
                    </button>
                  </form>
                )}
              </div>
            </AnimSection>

          </div>
        </div>
      </section>
    </>
  );
}
