import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useState, useEffect, useRef } from "react";

const NAVY = "#0A1F44";
const GOLD = "#C9A84C";
const GOLD_LIGHT = "#b8943e";
const OFF_WHITE = "#F9F8F4";
const CHARCOAL = "#1A1A2E";

const styles = `

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'DM Sans', sans-serif; background: ${OFF_WHITE}; color: ${CHARCOAL}; overflow-x: hidden; }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: ${NAVY}; }
  ::-webkit-scrollbar-thumb { background: ${GOLD}; border-radius: 3px; }

  @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes pulse-gold { 0%, 100% { box-shadow: 0 0 0 0 rgba(212,175,55,0.7); } 50% { box-shadow: 0 0 0 14px rgba(212,175,55,0); } }
  @keyframes wa-pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.08); } }
  @keyframes shimmer { 0% { background-position: -400px 0; } 100% { background-position: 400px 0; } }
  @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
  @keyframes bounce { 0%, 100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(-10px); } }

  .nav-link {
    color: rgba(255,255,255,0.85); text-decoration: none;
    font-family: 'Space Grotesk', sans-serif; font-size: 14px; font-weight: 500;
    letter-spacing: 0.5px; position: relative; padding-bottom: 4px; transition: color 0.3s;
  }
  .nav-link::after { content: ''; position: absolute; left: 0; bottom: 0; width: 0; height: 2px; background: ${GOLD}; transition: width 0.3s; }
  .nav-link:hover { color: ${GOLD}; }
  .nav-link:hover::after { width: 100%; }
  .nav-link.active { color: ${GOLD}; }
  .nav-link.active::after { width: 100%; }

  .btn-gold {
    background: ${GOLD}; color: ${NAVY}; border: none; padding: 14px 32px;
    border-radius: 8px; font-family: 'Space Grotesk', sans-serif; font-weight: 700;
    font-size: 15px; cursor: pointer; transition: all 0.3s; letter-spacing: 0.5px;
  }
  .btn-gold:hover { background: ${GOLD_LIGHT}; transform: translateY(-3px); box-shadow: 0 12px 30px rgba(212,175,55,0.4); }

  .btn-outline {
    background: transparent; color: ${NAVY}; border: 2px solid ${NAVY}; padding: 13px 32px;
    border-radius: 8px; font-family: 'Space Grotesk', sans-serif; font-weight: 700;
    font-size: 15px; cursor: pointer; transition: all 0.3s; letter-spacing: 0.5px;
  }
  .btn-outline:hover { background: ${NAVY}; color: white; transform: translateY(-3px); box-shadow: 0 12px 30px rgba(10,31,68,0.2); }

  .btn-outline-gold {
    background: transparent; color: ${GOLD}; border: 2px solid ${GOLD}; padding: 13px 32px;
    border-radius: 8px; font-family: 'Space Grotesk', sans-serif; font-weight: 700;
    font-size: 15px; cursor: pointer; transition: all 0.3s; letter-spacing: 0.5px;
  }
  .btn-outline-gold:hover { background: ${GOLD}; color: ${NAVY}; transform: translateY(-3px); }

  .section-label { font-family: 'Space Grotesk', sans-serif; color: ${GOLD}; font-size: 13px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 12px; }
  .section-heading { font-family: 'Playfair Display', serif; font-size: clamp(32px, 4vw, 52px); font-weight: 900; color: ${NAVY}; line-height: 1.15; }
  .section-heading-light { font-family: 'Playfair Display', serif; font-size: clamp(32px, 4vw, 52px); font-weight: 900; color: white; line-height: 1.15; }
  .gold-divider { width: 60px; height: 3px; background: linear-gradient(90deg, ${GOLD}, ${GOLD_LIGHT}); border-radius: 2px; margin: 16px 0 24px; }

  .service-hero-tab {
    padding: 14px 28px; border-radius: 40px; border: 2px solid rgba(212,175,55,0.35);
    font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 14px;
    cursor: pointer; transition: all 0.3s; background: transparent; color: rgba(255,255,255,0.75);
  }
  .service-hero-tab.active { background: ${GOLD}; color: ${NAVY}; border-color: ${GOLD}; }
  .service-hero-tab:hover:not(.active) { border-color: ${GOLD}; color: ${GOLD}; }

  .feature-card {
    background: white; border-radius: 16px; padding: 32px 28px;
    border: 1px solid rgba(10,31,68,0.08); transition: all 0.4s cubic-bezier(0.25,0.8,0.25,1);
  }
  .feature-card:hover { transform: translateY(-8px); box-shadow: 0 20px 50px rgba(212,175,55,0.18); border-color: ${GOLD}; }

  .process-step {
    display: flex; gap: 24px; align-items: flex-start; padding: 28px 0;
    border-bottom: 1px solid rgba(10,31,68,0.08);
  }
  .process-step:last-child { border-bottom: none; }

  .faq-item {
    border-bottom: 1px solid rgba(10,31,68,0.08); overflow: hidden;
  }
  .faq-question {
    width: 100%; background: none; border: none; text-align: left;
    padding: 20px 0; cursor: pointer; display: flex; justify-content: space-between; align-items: center;
    font-family: 'Space Grotesk', sans-serif; font-size: 16px; font-weight: 600; color: ${NAVY};
  }
  .faq-answer { padding-bottom: 20px; color: #555; line-height: 1.8; font-size: 15px; }

  .pricing-card {
    background: white; border-radius: 20px; padding: 40px 36px;
    border: 1px solid rgba(10,31,68,0.1); transition: all 0.4s; position: relative; overflow: hidden;
  }
  .pricing-card:hover { transform: translateY(-8px); box-shadow: 0 24px 60px rgba(212,175,55,0.2); border-color: ${GOLD}; }
  .pricing-card.featured { border: 2px solid ${GOLD}; }
  .pricing-badge {
    position: absolute; top: 20px; right: 20px;
    background: ${GOLD}; color: ${NAVY}; padding: 4px 14px;
    border-radius: 20px; font-family: 'Space Grotesk', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 1px;
  }

  .mobile-menu { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: ${NAVY}; z-index: 998; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 32px; animation: fadeIn 0.3s ease; }

  .wa-widget { position: fixed; bottom: 32px; right: 32px; z-index: 9999; display: flex; flex-direction: column; align-items: flex-end; gap: 10px; }
  .wa-btn { width: 60px; height: 60px; border-radius: 50%; background: #25D366; display: flex; align-items: center; justify-content: center; cursor: pointer; animation: pulse-gold 2.5s infinite, wa-pulse 3s ease-in-out infinite; box-shadow: 0 6px 24px rgba(37,211,102,0.5); text-decoration: none; transition: transform 0.2s; }
  .wa-btn:hover { transform: scale(1.15) !important; }
  .wa-tooltip { background: ${NAVY}; color: white; padding: 10px 16px; border-radius: 8px; font-family: 'Space Grotesk', sans-serif; font-size: 13px; font-weight: 500; white-space: nowrap; border: 1px solid ${GOLD}; animation: fadeIn 0.3s ease; box-shadow: 0 4px 16px rgba(10,31,68,0.3); }

  @media (max-width: 768px) {
    .desktop-nav { display: none !important; }
    .mobile-menu-btn { display: flex !important; }
    .grid-3 { grid-template-columns: 1fr !important; }
    .grid-2 { grid-template-columns: 1fr !important; }
  }
  @media (min-width: 769px) {
    .mobile-menu-btn { display: none !important; }
  }
`;


const SERVICES_DATA = [
  {
    id: "ai",
    icon: "🤖",
    label: "AI & Automation",
    title: "AI Agents & Intelligent Automation",
    tagline: "Enterprise Intelligence. SME Pricing.",
    heroImg: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1400&q=80",
    description: "I design and deploy custom AI agents and automation workflows that eliminate repetitive tasks, streamline operations, and give your SME the competitive edge of enterprise-level intelligence — at a fraction of the cost.",
    features: [
      { icon: "🧠", title: "Custom AI Agents", desc: "Bespoke LLM-powered agents that handle customer queries, lead qualification, data processing, and complex decision-making around the clock." },
      { icon: "⚙️", title: "Workflow Automation", desc: "End-to-end automation pipelines using Make, Zapier, and custom code — connecting your apps, eliminating data entry, and saving dozens of hours weekly." },
      { icon: "💬", title: "AI Chatbots", desc: "Intelligent conversational bots for WhatsApp, websites, and apps that understand context, answer naturally, and escalate when needed." },
      { icon: "📊", title: "Data Pipelines", desc: "Automated data collection, cleaning, transformation, and reporting so you always have insights without the manual grind." },
      { icon: "🔗", title: "System Integrations", desc: "Seamlessly connect your CRM, ERP, e-commerce, and marketing platforms so data flows freely and nothing falls through the cracks." },
      { icon: "🛡️", title: "Robotic Process Automation", desc: "Software robots that mimic human interactions with your existing software — no API required, no replacement of legacy systems." },
    ],
    process: [
      { num: "01", title: "Discovery & Audit", desc: "We map your existing workflows, identify automation opportunities, and assess data readiness. This phase uncovers where AI delivers maximum ROI." },
      { num: "02", title: "Solution Architecture", desc: "We design a custom automation blueprint — selecting the right models, tools, and integration approach for your specific business context." },
      { num: "03", title: "Build & Test", desc: "Agile development with weekly demos. We build, test with real data, and iterate rapidly until the solution performs flawlessly." },
      { num: "04", title: "Deploy & Train", desc: "Smooth deployment into your live environment with zero downtime. We train your team and document everything." },
      { num: "05", title: "Monitor & Optimise", desc: "Ongoing performance monitoring, prompt refinement, and continuous improvement to keep your AI agents sharp as your business evolves." },
    ],
    faqs: [
      { q: "How long does it take to build an AI agent?", a: "Simple agents (FAQ bots, lead capture) take 1–2 weeks. Complex multi-step automation systems take 4–8 weeks depending on integrations and data complexity." },
      { q: "Do I need technical staff to manage it?", a: "No. We build for non-technical operators with simple dashboards and clear documentation. We also offer ongoing management retainers." },
      { q: "What happens if the AI makes a mistake?", a: "All critical workflows have human-in-the-loop checkpoints, error handling, and fallback logic. We design for graceful failure, never catastrophic ones." },
      { q: "Can you integrate with our existing software?", a: "Yes. We work with virtually any software that has an API or web interface — M-Pesa, QuickBooks, Salesforce, WhatsApp, and hundreds more." },
    ],
    tags: ["LangChain", "OpenAI GPT-4", "Python", "Make / Zapier", "RPA", "WhatsApp API", "N8N", "Supabase"],
    ctaText: "Start Your Automation Journey",
  },
  {
    id: "web",
    icon: "🌐",
    label: "Web Development",
    title: "Website Development & Maintenance",
    tagline: "Websites That Win Business.",
    heroImg: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1400&q=80",
    description: "From sleek landing pages to full-scale web applications, I build responsive, fast, and visually compelling websites that represent your brand professionally and convert visitors into paying customers.",
    features: [
      { icon: "🎨", title: "UI/UX Design", desc: "Research-driven designs that look stunning and guide users effortlessly toward conversion. Every pixel serves a purpose." },
      { icon: "⚛️", title: "React & Next.js Apps", desc: "Blazing-fast, SEO-friendly web applications built with modern frameworks — from single landing pages to complex multi-role platforms." },
      { icon: "🛒", title: "E-Commerce Solutions", desc: "Full-featured online stores with M-Pesa, card payment integration, inventory management, and customer portals." },
      { icon: "🌍", title: "WordPress Sites", desc: "Professional WordPress builds for businesses that need easy content management without a developer on call." },
      { icon: "🔧", title: "Website Maintenance", desc: "Monthly retainer plans covering updates, backups, security patches, performance monitoring, and content changes." },
      { icon: "🚀", title: "Performance Optimisation", desc: "Speed audits and fixes that push your Lighthouse scores above 90 — faster sites rank higher and convert better." },
    ],
    process: [
      { num: "01", title: "Strategy & Scoping", desc: "We define goals, target audience, sitemap, and technical requirements. A clear brief prevents costly changes later." },
      { num: "02", title: "Design Mockups", desc: "High-fidelity Figma designs for desktop and mobile. You approve every screen before a single line of code is written." },
      { num: "03", title: "Development", desc: "Clean, well-commented code built on modern frameworks. We prioritise accessibility, performance, and security from day one." },
      { num: "04", title: "Content Integration", desc: "We integrate your copy, images, videos, and branding — or help you create content that converts." },
      { num: "05", title: "Testing & Launch", desc: "Cross-browser testing, mobile QA, performance checks, then a smooth launch with DNS management and SSL setup." },
    ],
    faqs: [
      { q: "How much does a website cost?", a: "A professional landing page starts from KES 35,000. E-commerce sites and custom web apps are scoped individually. We provide a detailed quote after the discovery call." },
      { q: "How long does it take to build?", a: "Landing pages: 1–2 weeks. Business websites: 3–4 weeks. E-commerce / web apps: 6–12 weeks. Timeline depends on content readiness and revision rounds." },
      { q: "Do you offer hosting?", a: "Yes. We can manage hosting on Vercel, AWS, or Namecheap — fully configured, optimised, and maintained so you never have to think about it." },
      { q: "Can I update the website myself after launch?", a: "Absolutely. WordPress sites are fully self-editable. For React/Next.js sites, we provide a CMS or simple content dashboard based on your needs." },
    ],
    tags: ["React", "Next.js", "WordPress", "Figma", "Tailwind CSS", "M-Pesa API", "Supabase", "Vercel"],
    ctaText: "Get a Free Quote",
  },
  {
    id: "seo",
    icon: "📈",
    label: "SEO",
    title: "Search Engine Optimisation",
    tagline: "Rank #1. Stay There.",
    heroImg: "https://images.unsplash.com/photo-1562577309-2592ab84b1bc?w=1400&q=80",
    description: "I craft data-driven SEO strategies that increase your visibility on Google, drive qualified organic traffic, and position your business as the undisputed authority in your industry — locally and globally.",
    features: [
      { icon: "🔍", title: "Technical SEO Audit", desc: "Deep-dive crawl analysis identifying and fixing crawl errors, Core Web Vitals issues, indexing problems, and site architecture weaknesses." },
      { icon: "📝", title: "Content Strategy", desc: "Keyword-driven content calendars, topic cluster mapping, and high-quality article creation that ranks and resonates with your audience." },
      { icon: "🔗", title: "Link Building", desc: "Ethical, white-hat outreach campaigns that earn high-authority backlinks from relevant Kenyan and global publications." },
      { icon: "📍", title: "Local SEO", desc: "Google Business Profile optimisation, local citation building, and review strategy to dominate 'near me' searches in Nairobi and beyond." },
      { icon: "📊", title: "Analytics & Reporting", desc: "Monthly reports with plain-English explanations of rankings, traffic, leads generated, and ROI — no vanity metrics, just what matters." },
      { icon: "🛒", title: "E-Commerce SEO", desc: "Product page optimisation, structured data, category architecture, and content that turns searchers into buyers." },
    ],
    process: [
      { num: "01", title: "SEO Audit & Baseline", desc: "Full technical audit, competitor analysis, keyword opportunity mapping, and establishing baseline rankings and traffic data." },
      { num: "02", title: "Strategy & Roadmap", desc: "A prioritised 6–12 month SEO roadmap with clear milestones, effort estimates, and projected traffic/revenue impact." },
      { num: "03", title: "Technical Fixes", desc: "Resolving critical technical issues first — the foundation every other SEO effort depends on." },
      { num: "04", title: "Content Creation", desc: "Publishing optimised, high-quality content consistently. We write it, you approve it, Google indexes it." },
      { num: "05", title: "Authority Building", desc: "Ongoing link acquisition, brand mentions, and digital PR to build the domain authority that sustains top rankings long-term." },
    ],
    faqs: [
      { q: "How long until I see results?", a: "Technical fixes show within 4–8 weeks. Content-driven ranking improvements typically appear in 3–6 months. Competitive keywords in well-established niches can take 6–12 months." },
      { q: "Do you guarantee first-page rankings?", a: "No ethical SEO agency can guarantee specific rankings — Google's algorithm is outside anyone's control. We guarantee a rigorous, proven process and transparent reporting of measurable progress." },
      { q: "What's included in monthly SEO retainers?", a: "Retainers include: monthly reporting, ongoing technical monitoring, 2–4 content pieces per month, link building outreach, and strategy refinement. Packages start from KES 25,000/month." },
      { q: "Can you do SEO for my e-commerce store?", a: "Yes. E-commerce SEO is a speciality — product page optimisation, category structure, schema markup, and content that drives both rankings and conversions." },
    ],
    tags: ["Ahrefs", "SEMrush", "Google Analytics 4", "Google Search Console", "Screaming Frog", "Schema Markup", "Core Web Vitals", "Local SEO"],
    ctaText: "Get a Free SEO Audit",
  },
];

function useInView(threshold = 0.1) {
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
      transform: inView ? "translateY(0)" : "translateY(36px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button className="faq-question" onClick={() => setOpen(o => !o)}>
        <span>{q}</span>
        <span style={{ color: GOLD, fontSize: 22, transition: "transform 0.3s", transform: open ? "rotate(45deg)" : "rotate(0)" }}>+</span>
      </button>
      {open && <div className="faq-answer">{a}</div>}
    </div>
  );
}

export default function ServicesPage() {
  useDocumentTitle('Services — AI Automation, Web Dev & SEO');
  const [activeService, setActiveService] = useState(0);

  const svc = SERVICES_DATA[activeService];

  return (
    <>
      <style>{styles}</style>



      {/* ─── HERO BANNER ─── */}
      <section style={{
        background: NAVY, paddingTop: 120, paddingBottom: 0, textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        {/* Background grid decoration */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `linear-gradient(rgba(212,175,55,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.04) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 800, margin: "0 auto", padding: "0 40px 0" }}>
          <div style={{ animation: "fadeInUp 0.8s ease both" }}>
            <div className="section-label" style={{ justifyContent: "center", display: "flex", marginBottom: 16 }}>// What I Offer</div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 900, color: "white", lineHeight: 1.1, marginBottom: 20 }}>
              Services Built for<br /><span style={{ color: GOLD }}>Real Business Results</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 18, lineHeight: 1.8, maxWidth: 580, margin: "0 auto 48px" }}>
              Three core disciplines. One focused mission — giving African SMEs the digital tools, intelligence, and visibility to compete and win.
            </p>

            {/* Service tabs */}
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 56 }}>
              {SERVICES_DATA.map((s, i) => (
                <button key={s.id} className={`service-hero-tab${activeService === i ? " active" : ""}`}
                  onClick={() => { setActiveService(i); document.getElementById("service-detail").scrollIntoView({ behavior: "smooth" }); }}>
                  {s.icon} {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Hero image strip */}
        <div style={{ height: 340, overflow: "hidden", position: "relative" }}>
          <img src={svc.heroImg} alt={svc.title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%", transition: "all 0.6s ease" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,31,68,0.6) 0%, rgba(10,31,68,0.1) 100%)" }} />
          <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", animation: "bounce 2s infinite", cursor: "pointer" }}
            onClick={() => document.getElementById("service-detail").scrollIntoView({ behavior: "smooth" })}>
            <div style={{ color: GOLD, fontSize: 28, filter: "drop-shadow(0 0 8px rgba(212,175,55,0.8))" }}>↓</div>
          </div>
        </div>
      </section>

      {/* ─── SERVICE SWITCHER (sticky) ─── */}
      <div style={{
        position: "sticky", top: 72, zIndex: 90, background: "rgba(249,248,244,0.97)",
        backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(10,31,68,0.08)",
        padding: "0 40px", display: "flex", gap: 0,
      }}>
        {SERVICES_DATA.map((s, i) => (
          <button key={s.id} onClick={() => { setActiveService(i); document.getElementById("service-detail").scrollIntoView({ behavior: "smooth" }); }}
            style={{
              background: "none", border: "none", padding: "18px 28px", cursor: "pointer",
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 14,
              color: activeService === i ? GOLD : "#666",
              borderBottom: activeService === i ? `3px solid ${GOLD}` : "3px solid transparent",
              transition: "all 0.3s",
            }}>
            {s.icon} {s.label}
          </button>
        ))}
      </div>

      {/* ─── SERVICE DETAIL ─── */}
      <div id="service-detail">

        {/* Overview */}
        <section style={{ background: OFF_WHITE, padding: "80px 40px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
              <AnimSection>
                <div className="section-label">{svc.icon} {svc.label}</div>
                <h2 className="section-heading" style={{ marginBottom: 8 }}>{svc.title}</h2>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", color: GOLD, fontSize: 18, fontWeight: 600, marginBottom: 20, fontStyle: "italic" }}>
                  "{svc.tagline}"
                </div>
                <div className="gold-divider" />
                <p style={{ fontSize: 16, lineHeight: 1.9, color: "#444", marginBottom: 32 }}>{svc.description}</p>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <a href="/#contact"><button className="btn-gold">{svc.ctaText} →</button></a>
                  <a href="/projects"><button className="btn-outline">See Projects</button></a>
                </div>
              </AnimSection>

              <AnimSection delay={0.2}>
                <div style={{ background: NAVY, borderRadius: 20, padding: "36px 32px", border: `1px solid rgba(212,175,55,0.2)` }}>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", color: GOLD, fontSize: 12, fontWeight: 600, letterSpacing: 2, marginBottom: 24 }}>TECHNOLOGIES & TOOLS</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                    {svc.tags.map(t => (
                      <span key={t} style={{
                        background: "rgba(212,175,55,0.12)", color: "white", border: `1px solid rgba(212,175,55,0.3)`,
                        padding: "8px 16px", borderRadius: 20, fontSize: 13,
                        fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500,
                      }}>{t}</span>
                    ))}
                  </div>
                  <div style={{ marginTop: 36, paddingTop: 28, borderTop: "1px solid rgba(212,175,55,0.15)" }}>
                    <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: 1, marginBottom: 16 }}>QUICK STATS</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                      {[["50+", "Projects Delivered"], ["98%", "Client Satisfaction"], ["< 48h", "Response Time"], ["5★", "Average Rating"]].map(([val, lab]) => (
                        <div key={lab}>
                          <div style={{ fontFamily: "'Playfair Display', serif", color: GOLD, fontSize: 28, fontWeight: 900 }}>{val}</div>
                          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>{lab}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimSection>
            </div>
          </div>
        </section>

        {/* Features */}
        <section style={{ background: NAVY, padding: "80px 40px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <AnimSection style={{ textAlign: "center", marginBottom: 56 }}>
              <div className="section-label">// What's Included</div>
              <h2 className="section-heading-light">Everything You Need to <span style={{ color: GOLD }}>Succeed</span></h2>
              <div className="gold-divider" style={{ margin: "16px auto 0" }} />
            </AnimSection>
            <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
              {svc.features.map((f, i) => (
                <AnimSection key={f.title} delay={i * 0.1}>
                  <div className="feature-card">
                    <div style={{ fontSize: 36, marginBottom: 16 }}>{f.icon}</div>
                    <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", color: NAVY, fontSize: 17, fontWeight: 700, marginBottom: 10 }}>{f.title}</h3>
                    <p style={{ color: "#555", fontSize: 14, lineHeight: 1.75 }}>{f.desc}</p>
                  </div>
                </AnimSection>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section style={{ background: OFF_WHITE, padding: "80px 40px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <AnimSection style={{ textAlign: "center", marginBottom: 56 }}>
              <div className="section-label">// How It Works</div>
              <h2 className="section-heading">My <span style={{ color: GOLD }}>Process</span></h2>
              <div className="gold-divider" style={{ margin: "16px auto 0" }} />
            </AnimSection>
            {svc.process.map((step, i) => (
              <AnimSection key={step.num} delay={i * 0.1}>
                <div className="process-step">
                  <div style={{
                    flexShrink: 0, width: 64, height: 64, borderRadius: "50%",
                    background: NAVY, color: GOLD,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700,
                  }}>{step.num}</div>
                  <div>
                    <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", color: NAVY, fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{step.title}</h3>
                    <p style={{ color: "#555", lineHeight: 1.8, fontSize: 15 }}>{step.desc}</p>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section style={{ background: NAVY, padding: "80px 40px" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <AnimSection style={{ textAlign: "center", marginBottom: 56 }}>
              <div className="section-label">// Investment</div>
              <h2 className="section-heading-light">Transparent <span style={{ color: GOLD }}>Pricing</span></h2>
              <div className="gold-divider" style={{ margin: "16px auto 0" }} />
              <p style={{ color: "rgba(255,255,255,0.65)", marginTop: 16, fontSize: 15 }}>All packages are fully customisable. Book a free discovery call for a tailored quote.</p>
            </AnimSection>

            <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
              {[
                { tier: "Starter", price: "From KES 25K", desc: "Perfect for small businesses taking their first step into " + svc.label + ".", features: ["Initial setup & configuration", "Basic implementation", "Email support", "2 revision rounds", "14-day warranty"], featured: false },
                { tier: "Growth", price: "From KES 60K", desc: "For businesses ready to scale with advanced " + svc.label + " capabilities.", features: ["Everything in Starter", "Advanced features & integrations", "Priority support", "Monthly performance review", "4 revision rounds", "30-day warranty"], featured: true },
                { tier: "Enterprise", price: "Custom", desc: "Full-scale " + svc.label + " transformation for established businesses.", features: ["Everything in Growth", "Dedicated account manager", "SLA-backed uptime", "Quarterly strategy sessions", "Unlimited revisions", "90-day warranty"], featured: false },
              ].map((p, i) => (
                <AnimSection key={p.tier} delay={i * 0.15}>
                  <div className={`pricing-card${p.featured ? " featured" : ""}`}>
                    {p.featured && <div className="pricing-badge">MOST POPULAR</div>}
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", color: NAVY, fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>{p.tier.toUpperCase()}</div>
                    <div style={{ fontFamily: "'Playfair Display', serif", color: p.featured ? GOLD : NAVY, fontSize: 32, fontWeight: 900, marginBottom: 8 }}>{p.price}</div>
                    <p style={{ color: "#666", fontSize: 13, lineHeight: 1.7, marginBottom: 24 }}>{p.desc}</p>
                    <div style={{ borderTop: "1px solid rgba(10,31,68,0.08)", paddingTop: 20, marginBottom: 24 }}>
                      {p.features.map(f => (
                        <div key={f} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10, fontSize: 13, color: "#444" }}>
                          <span style={{ color: GOLD, fontWeight: 700, flexShrink: 0 }}>✓</span>
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                    <a href="/#contact">
                      <button style={{ width: "100%" }} className={p.featured ? "btn-gold" : "btn-outline"}>Get Started →</button>
                    </a>
                  </div>
                </AnimSection>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section style={{ background: OFF_WHITE, padding: "80px 40px" }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <AnimSection style={{ textAlign: "center", marginBottom: 48 }}>
              <div className="section-label">// FAQ</div>
              <h2 className="section-heading">Common <span style={{ color: GOLD }}>Questions</span></h2>
              <div className="gold-divider" style={{ margin: "16px auto 0" }} />
            </AnimSection>
            <AnimSection delay={0.2}>
              {svc.faqs.map(faq => <FAQItem key={faq.q} {...faq} />)}
            </AnimSection>
          </div>
        </section>

      </div>

      {/* ─── CTA STRIP ─── */}
      <section style={{
        background: NAVY, padding: "80px 40px", textAlign: "center",
        backgroundImage: `radial-gradient(ellipse at center, rgba(212,175,55,0.08) 0%, transparent 70%)`,
      }}>
        <AnimSection>
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: "white", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, marginBottom: 16 }}>
            Ready to Get Started?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 17, marginBottom: 40, maxWidth: 520, margin: "0 auto 40px" }}>
            Book a free 30-minute discovery call. No commitment. Just clarity on what's possible for your business.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/#contact"><button className="btn-gold" style={{ fontSize: 16, padding: "16px 40px" }}>Book Free Discovery Call →</button></a>
            <a href="/projects"><button className="btn-outline-gold" style={{ fontSize: 16, padding: "16px 40px" }}>View Case Studies</button></a>
          </div>
        </AnimSection>
      </section>


    </>
  );
}
