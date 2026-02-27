import { useState, useEffect, useRef } from "react";

const NAVY = "#0A1F44";
const GOLD = "#D4AF37";
const GOLD_LIGHT = "#F0D060";
const GOLD_DARK = "#A88B20";
const OFF_WHITE = "#F9F8F4";
const CHARCOAL = "#1A1A2E";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600&family=Space+Grotesk:wght@400;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: ${OFF_WHITE};
    color: ${CHARCOAL};
    overflow-x: hidden;
  }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: ${NAVY}; }
  ::-webkit-scrollbar-thumb { background: ${GOLD}; border-radius: 3px; }

  @keyframes pulse-gold {
    0%, 100% { box-shadow: 0 0 0 0 rgba(212,175,55,0.7); }
    50% { box-shadow: 0 0 0 14px rgba(212,175,55,0); }
  }
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-20px) rotate(1deg); }
    66% { transform: translateY(-10px) rotate(-1deg); }
  }
  @keyframes shimmer {
    0% { background-position: -1000px 0; }
    100% { background-position: 1000px 0; }
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(60px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-60px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes ticker {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes spinSlow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes loadBar {
    from { width: 0%; }
    to { width: var(--target-width); }
  }
  @keyframes wa-pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.08); }
  }
  @keyframes starGlow {
    0%, 100% { text-shadow: 0 0 4px ${GOLD}; }
    50% { text-shadow: 0 0 12px ${GOLD_LIGHT}; }
  }

  .hero-section {
    position: relative;
    height: 100vh;
    min-height: 700px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .hero-bg {
    position: absolute;
    inset: 0;
    background-image: url('https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1800&q=80');
    background-size: cover;
    background-position: center;
    z-index: 0;
    transform: scale(1.05);
    transition: transform 0.1s linear;
  }
  .hero-content {
    position: relative;
    z-index: 2;
    text-align: center;
    padding: 0 24px;
    max-width: 860px;
  }
  .glass-card {
    background: rgba(10, 31, 68, 0.7);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border: 1px solid rgba(212,175,55,0.3);
    border-radius: 20px;
    padding: 56px 48px;
  }
  .nav-link {
    color: rgba(255,255,255,0.85);
    text-decoration: none;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.5px;
    position: relative;
    padding-bottom: 4px;
    transition: color 0.3s;
  }
  .nav-link::after {
    content: '';
    position: absolute;
    left: 0; bottom: 0;
    width: 0; height: 2px;
    background: ${GOLD};
    transition: width 0.3s;
  }
  .nav-link:hover { color: ${GOLD}; }
  .nav-link:hover::after { width: 100%; }

  .btn-gold {
    background: ${GOLD};
    color: ${NAVY};
    border: none;
    padding: 14px 32px;
    border-radius: 8px;
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
    font-size: 15px;
    cursor: pointer;
    transition: all 0.3s;
    letter-spacing: 0.5px;
  }
  .btn-gold:hover {
    background: ${GOLD_LIGHT};
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(212,175,55,0.4);
  }
  .btn-outline {
    background: transparent;
    color: white;
    border: 2px solid ${GOLD};
    padding: 13px 32px;
    border-radius: 8px;
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
    font-size: 15px;
    cursor: pointer;
    transition: all 0.3s;
    letter-spacing: 0.5px;
  }
  .btn-outline:hover {
    background: ${GOLD};
    color: ${NAVY};
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(212,175,55,0.4);
  }

  .service-card {
    background: white;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid rgba(10,31,68,0.08);
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    cursor: pointer;
  }
  .service-card:hover {
    transform: translateY(-12px);
    box-shadow: 0 24px 60px rgba(212,175,55,0.25), 0 8px 20px rgba(10,31,68,0.15);
    border-color: ${GOLD};
  }

  .project-card {
    background: white;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid rgba(10,31,68,0.08);
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  }
  .project-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 50px rgba(212,175,55,0.2), 0 6px 15px rgba(10,31,68,0.12);
    border-color: ${GOLD};
  }
  .project-card:hover .project-overlay {
    opacity: 1;
  }
  .project-overlay {
    position: absolute;
    inset: 0;
    background: rgba(10,31,68,0.75);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .skill-icon-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 20px 16px;
    border-radius: 12px;
    transition: all 0.3s;
    cursor: default;
    min-width: 80px;
  }
  .skill-icon-wrap:hover {
    background: rgba(212,175,55,0.15);
    transform: translateY(-6px);
  }

  .testimonial-card {
    background: white;
    border-radius: 16px;
    padding: 36px;
    border: 1px solid rgba(10,31,68,0.08);
    box-shadow: 0 4px 20px rgba(10,31,68,0.06);
    transition: all 0.4s;
  }
  .testimonial-card:hover {
    box-shadow: 0 12px 40px rgba(212,175,55,0.15);
    border-color: ${GOLD};
    transform: translateY(-4px);
  }

  .input-field {
    width: 100%;
    padding: 14px 18px;
    border: 1.5px solid rgba(10,31,68,0.15);
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    background: white;
    color: ${CHARCOAL};
    outline: none;
    transition: border-color 0.3s, box-shadow 0.3s;
  }
  .input-field:focus {
    border-color: ${GOLD};
    box-shadow: 0 0 0 3px rgba(212,175,55,0.15);
  }

  .wa-widget {
    position: fixed;
    bottom: 32px;
    right: 32px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
  }
  .wa-btn {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: #25D366;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    animation: pulse-gold 2.5s infinite, wa-pulse 3s ease-in-out infinite;
    box-shadow: 0 6px 24px rgba(37,211,102,0.5);
    text-decoration: none;
    transition: transform 0.2s;
  }
  .wa-btn:hover { transform: scale(1.15) !important; }
  .wa-tooltip {
    background: ${NAVY};
    color: white;
    padding: 10px 16px;
    border-radius: 8px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 13px;
    font-weight: 500;
    white-space: nowrap;
    border: 1px solid ${GOLD};
    animation: fadeIn 0.3s ease;
    box-shadow: 0 4px 16px rgba(10,31,68,0.3);
  }

  .section-label {
    font-family: 'Space Grotesk', sans-serif;
    color: ${GOLD};
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
    margin-bottom: 12px;
  }
  .section-heading {
    font-family: 'Playfair Display', serif;
    font-size: clamp(32px, 4vw, 52px);
    font-weight: 900;
    color: ${NAVY};
    line-height: 1.15;
  }
  .section-heading-light {
    font-family: 'Playfair Display', serif;
    font-size: clamp(32px, 4vw, 52px);
    font-weight: 900;
    color: white;
    line-height: 1.15;
  }
  .gold-divider {
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, ${GOLD}, ${GOLD_LIGHT});
    border-radius: 2px;
    margin: 16px 0 24px;
  }

  .stat-card {
    text-align: center;
    padding: 24px 20px;
    border: 1px solid rgba(212,175,55,0.3);
    border-radius: 12px;
    background: rgba(212,175,55,0.05);
    transition: all 0.3s;
  }
  .stat-card:hover {
    background: rgba(212,175,55,0.12);
    border-color: ${GOLD};
    transform: translateY(-4px);
  }

  .mobile-menu {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: ${NAVY};
    z-index: 998;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 32px;
    animation: fadeIn 0.3s ease;
  }

  @media (max-width: 768px) {
    .glass-card { padding: 36px 24px; }
    .desktop-nav { display: none !important; }
    .grid-3 { grid-template-columns: 1fr !important; }
    .grid-2 { grid-template-columns: 1fr !important; }
    .about-grid { grid-template-columns: 1fr !important; }
    .stats-row { flex-direction: column; }
  }
  @media (min-width: 769px) {
    .mobile-menu-btn { display: none !important; }
  }
`;

const NAV_LINKS = ["About", "Services", "Projects", "Skills", "Testimonials", "Contact"];

const SERVICES = [
  {
    icon: "🤖",
    title: "AI Agents & Intelligent Automation",
    desc: "We design and deploy custom AI agents and automation workflows that eliminate repetitive tasks, streamline operations, and give your SME enterprise-level intelligence at a fraction of the cost.",
    tags: ["LLMs", "RPA", "Workflow Automation", "Chatbots"],
    img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80",
  },
  {
    icon: "🌐",
    title: "Website Development & Maintenance",
    desc: "From sleek landing pages to full-scale web applications, we build responsive, fast, and visually compelling websites that convert visitors into loyal customers.",
    tags: ["React", "Next.js", "WordPress", "UI/UX"],
    img: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80",
  },
  {
    icon: "📈",
    title: "Search Engine Optimization",
    desc: "We craft data-driven SEO strategies that increase your visibility on Google, drive organic traffic, and position your business as the authority in your industry.",
    tags: ["On-Page SEO", "Technical SEO", "Content Strategy", "Analytics"],
    img: "https://images.unsplash.com/photo-1562577309-2592ab84b1bc?w=600&q=80",
  },
];

const PROJECTS = [
  { title: "NeuroBot CRM Agent", desc: "AI-powered customer relationship agent for a Nairobi retail SME.", tags: ["Python", "LangChain", "OpenAI"], img: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&q=80" },
  { title: "SwiftSEO Dashboard", desc: "SEO analytics tool built for a Kenyan e-commerce brand.", tags: ["React", "Node.js", "Analytics"], img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80" },
  { title: "AfriCart E-Commerce", desc: "Full-stack online store with M-Pesa integration.", tags: ["Next.js", "M-Pesa API", "Supabase"], img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80" },
  { title: "AutoLead AI", desc: "Automated lead generation and outreach agent.", tags: ["Python", "Zapier", "GPT-4"], img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80" },
  { title: "CorpSite Redesign", desc: "Corporate website redesign for a financial services firm.", tags: ["React", "Figma", "WordPress"], img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80" },
  { title: "SmartDesk Chatbot", desc: "24/7 customer support AI chatbot for a hospitality brand.", tags: ["NLP", "WhatsApp API", "Node.js"], img: "https://images.unsplash.com/photo-1525338078858-d762b5e32f2c?w=600&q=80" },
];

const SKILLS = [
  { name: "Python", emoji: "🐍" }, { name: "JavaScript", emoji: "🟨" }, { name: "React", emoji: "⚛️" },
  { name: "Next.js", emoji: "▲" }, { name: "Node.js", emoji: "🟢" }, { name: "OpenAI", emoji: "🤖" },
  { name: "LangChain", emoji: "🔗" }, { name: "WordPress", emoji: "🌐" }, { name: "Figma", emoji: "🎨" },
  { name: "Google Analytics", emoji: "📊" }, { name: "Ahrefs", emoji: "📡" }, { name: "SEMrush", emoji: "🔍" },
  { name: "Make", emoji: "⚙️" }, { name: "Zapier", emoji: "⚡" }, { name: "Supabase", emoji: "🗄️" },
  { name: "AWS", emoji: "☁️" }, { name: "PostgreSQL", emoji: "🐘" }, { name: "Vercel", emoji: "🔺" },
];

const TESTIMONIALS = [
  { name: "Amara Osei", company: "QuickMart Kenya", avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=120&q=80", quote: "NeuroSpark built us an AI agent that handles 80% of our customer queries automatically. Our team now focuses on growth, not repetitive tasks. Paul and his team are simply world-class." },
  { name: "Fatima Hassan", company: "Nairobi Digital Co.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80", quote: "Our website traffic tripled within 4 months of engaging NeuroSpark for SEO. The results speak for themselves. Highly professional, data-driven, and always delivering on their promises." },
  { name: "David Kiprono", company: "AfriFinance Ltd.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80", quote: "The website NeuroSpark designed for us is stunning and converts incredibly well. Paul understood our vision from day one and brought it to life beyond expectations. A true partner." },
];

const SKILLS_BARS = [
  { label: "AI & Automation", pct: 95 },
  { label: "Web Development", pct: 90 },
  { label: "SEO Strategy", pct: 88 },
  { label: "Business Consulting", pct: 85 },
];

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

export default function PaulNyangwaraPortfolio() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [waHover, setWaHover] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroY, setHeroY] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [formState, setFormState] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      setHeroY(window.scrollY * 0.35);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setActiveTestimonial(t => (t + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormState({ name: "", email: "", phone: "", service: "", message: "" });
  };

  return (
    <>
      <style>{styles}</style>

      {/* NAVBAR */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 40px",
        height: 72,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? `rgba(10,31,68,0.97)` : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid rgba(212,175,55,0.2)` : "none",
        transition: "all 0.4s",
      }}>
        {/* Logo */}
        <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <span style={{ fontSize: 24 }}>⚡</span>
          <span style={{ fontFamily: "'Playfair Display', serif", color: "white", fontSize: 20, fontWeight: 700 }}>
            Paul <span style={{ color: GOLD }}>Nyang'wara</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 36 }}>
          {NAV_LINKS.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>
          ))}
          <a href="#contact">
            <button className="btn-gold" style={{ padding: "10px 24px", fontSize: 13 }}>Let's Talk</button>
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button className="mobile-menu-btn" onClick={() => setMobileOpen(true)} style={{
          background: "none", border: "none", cursor: "pointer", color: GOLD, fontSize: 26,
        }}>☰</button>
      </nav>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="mobile-menu" style={{ display: "flex" }}>
          <button onClick={() => setMobileOpen(false)} style={{
            position: "absolute", top: 24, right: 32, background: "none", border: "none",
            color: GOLD, fontSize: 32, cursor: "pointer"
          }}>✕</button>
          <div style={{ fontFamily: "'Playfair Display', serif", color: GOLD, fontSize: 28, marginBottom: 8 }}>
            ⚡ Paul Nyang'wara
          </div>
          {NAV_LINKS.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMobileOpen(false)}
              style={{ color: "white", textDecoration: "none", fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 500, transition: "color 0.2s" }}>
              {l}
            </a>
          ))}
          <a href="#contact" onClick={() => setMobileOpen(false)}>
            <button className="btn-gold">Let's Talk</button>
          </a>
        </div>
      )}

      {/* ─── HERO ─── */}
      <section id="home" className="hero-section">
        <div className="hero-bg" style={{ backgroundPositionY: `calc(50% + ${heroY}px)` }} />

        <div className="hero-content">
          <div className="glass-card" style={{ animation: "fadeInUp 1s ease 0.2s both" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(212,175,55,0.15)", border: `1px solid ${GOLD}`,
              borderRadius: 20, padding: "6px 16px", marginBottom: 24,
            }}>
              <span style={{ fontSize: 14 }}>⚡</span>
              <span style={{ color: GOLD, fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: 2 }}>
                FOUNDER · CEO · AI INNOVATOR
              </span>
            </div>

            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(28px, 5vw, 58px)",
              fontWeight: 900, color: "white", lineHeight: 1.15, marginBottom: 20,
              animation: "fadeInUp 1s ease 0.4s both",
            }}>
              Paul Nyang'wara<br />
              <span style={{ color: GOLD }}>Portfolio</span>
            </h1>

            <p style={{
              color: "rgba(255,255,255,0.85)", fontSize: "clamp(14px, 2vw, 18px)",
              lineHeight: 1.7, marginBottom: 36, fontWeight: 300,
              animation: "fadeInUp 1s ease 0.6s both",
            }}>
              Founder & CEO of <strong style={{ color: GOLD }}>NeuroSpark Corporation</strong> — Kenya's premier AI & automation studio.<br />
              I build AI agents, automate workflows, craft high-converting websites,<br />
              and drive search rankings for businesses across Africa.
            </p>

            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", animation: "fadeInUp 1s ease 0.8s both" }}>
              <a href="#projects"><button className="btn-gold">Explore Our Work</button></a>
              <a href="#contact"><button className="btn-outline">Get In Touch</button></a>
            </div>
          </div>
        </div>

        {/* Scroll arrow */}
        <div style={{
          position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
          animation: "bounce 2s infinite", cursor: "pointer", zIndex: 2,
        }} onClick={() => document.getElementById("about").scrollIntoView({ behavior: "smooth" })}>
          <div style={{ color: GOLD, fontSize: 28, filter: "drop-shadow(0 0 8px rgba(212,175,55,0.8))" }}>↓</div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" style={{ background: OFF_WHITE, padding: "100px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 64, alignItems: "center" }}>
            {/* Photo */}
            <AnimSection>
              <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{
                  width: 280, height: 280, borderRadius: "50%",
                  border: `4px solid ${GOLD}`,
                  overflow: "hidden",
                  boxShadow: `0 0 0 8px rgba(212,175,55,0.15), 0 20px 60px rgba(10,31,68,0.2)`,
                  animation: "float 6s ease-in-out infinite",
                }}>
                  <img
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=560&q=80"
                    alt="Paul Nyang'wara"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div style={{
                  marginTop: 20, background: NAVY, color: "white",
                  padding: "8px 20px", borderRadius: 20,
                  fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600,
                  border: `1px solid ${GOLD}`,
                }}>
                  🇰🇪 Nairobi, Kenya
                </div>

                {/* Stat Cards */}
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

            {/* Bio */}
            <AnimSection delay={0.2}>
              <div className="section-label">// About Me</div>
              <h2 className="section-heading">Builder. Innovator.<br /><span style={{ color: GOLD }}>AI Visionary.</span></h2>
              <div className="gold-divider" />
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "#444", marginBottom: 32 }}>
                Paul Nyang'wara is the visionary Founder and CEO of <strong style={{ color: NAVY }}>NeuroSpark Corporation</strong> — a cutting-edge technology company headquartered in Kenya. With a passion for leveraging artificial intelligence to solve real-world problems for African businesses, Paul leads a team dedicated to building smart AI agents, automation pipelines, SEO strategies, and professional digital experiences that drive measurable growth for SMEs.
              </p>

              {/* Skill Bars */}
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {SKILLS_BARS.map(({ label, pct }) => (
                  <SkillBar key={label} label={label} pct={pct} />
                ))}
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services" style={{ background: NAVY, padding: "100px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <AnimSection style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="section-label">// What We Do</div>
            <h2 className="section-heading-light">Solutions Engineered for<br /><span style={{ color: GOLD }}>Business Growth</span></h2>
            <div className="gold-divider" style={{ margin: "16px auto 0" }} />
            <p style={{ color: "rgba(255,255,255,0.7)", marginTop: 16, fontSize: 16, maxWidth: 560, margin: "16px auto 0" }}>
              At NeuroSpark, we combine cutting-edge AI with deep business understanding to deliver three core pillars of digital transformation.
            </p>
          </AnimSection>

          <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
            {SERVICES.map((s, i) => (
              <AnimSection key={s.title} delay={i * 0.15}>
                <div className="service-card">
                  <div style={{ height: 200, overflow: "hidden", position: "relative" }}>
                    <img src={s.img} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}
                      onMouseEnter={e => e.target.style.transform = "scale(1.08)"}
                      onMouseLeave={e => e.target.style.transform = "scale(1)"} />
                  </div>
                  <div style={{ padding: "28px 24px" }}>
                    <div style={{ fontSize: 32, marginBottom: 12 }}>{s.icon}</div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", color: NAVY, fontSize: 20, fontWeight: 700, marginBottom: 12, lineHeight: 1.3 }}>{s.title}</h3>
                    <p style={{ color: "#666", fontSize: 14, lineHeight: 1.7, marginBottom: 18 }}>{s.desc}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
                      {s.tags.map(t => (
                        <span key={t} style={{ background: `rgba(212,175,55,0.12)`, color: NAVY, border: `1px solid ${GOLD}`, padding: "3px 10px", borderRadius: 20, fontSize: 11, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>{t}</span>
                      ))}
                    </div>
                    <button className="btn-gold" style={{ padding: "10px 20px", fontSize: 13 }}>Learn More →</button>
                  </div>
                </div>
              </AnimSection>
            ))}
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

          <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {PROJECTS.map((p, i) => (
              <AnimSection key={p.title} delay={i * 0.1}>
                <div className="project-card">
                  <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
                    <img src={p.img} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}
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

        {/* Ticker */}
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
            <div className="testimonial-card" style={{ position: "relative" }}>
              {/* Stars */}
              <div style={{ marginBottom: 16, animation: "starGlow 3s ease-in-out infinite" }}>
                {"★★★★★".split("").map((s, i) => (
                  <span key={i} style={{ color: GOLD, fontSize: 20 }}>{s}</span>
                ))}
              </div>
              <p style={{ fontSize: "clamp(15px, 2vw, 18px)", lineHeight: 1.8, color: "#444", fontStyle: "italic", marginBottom: 28, transition: "all 0.5s" }}>
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

            {/* Dots */}
            <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 28 }}>
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setActiveTestimonial(i)} style={{
                  width: i === activeTestimonial ? 28 : 10,
                  height: 10, borderRadius: 5,
                  background: i === activeTestimonial ? GOLD : "rgba(10,31,68,0.2)",
                  border: "none", cursor: "pointer",
                  transition: "all 0.3s",
                }} />
              ))}
            </div>

            {/* Arrow buttons */}
            <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 16 }}>
              {["←", "→"].map((arrow, di) => (
                <button key={arrow} onClick={() => setActiveTestimonial(i => (i + (di ? 1 : -1) + TESTIMONIALS.length) % TESTIMONIALS.length)} style={{
                  width: 42, height: 42, borderRadius: "50%",
                  background: "transparent", border: `2px solid ${GOLD}`,
                  color: GOLD, fontSize: 18, cursor: "pointer", transition: "all 0.3s",
                }}
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

              {[
                { icon: "📧", label: "Email", value: "hello@neurospark.co.ke" },
                { icon: "📞", label: "Phone", value: "+254 799 644 100" },
                { icon: "📍", label: "Location", value: "Nairobi, Kenya 🇰🇪" },
              ].map(({ icon, label, value }) => (
                <div key={label} style={{ display: "flex", gap: 16, marginBottom: 20, alignItems: "center" }}>
                  <div style={{
                    width: 44, height: 44, background: "rgba(212,175,55,0.15)", border: `1px solid ${GOLD}`,
                    borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
                    flexShrink: 0,
                  }}>{icon}</div>
                  <div>
                    <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: 1 }}>{label.toUpperCase()}</div>
                    <div style={{ color: "white", fontSize: 15, fontWeight: 500 }}>{value}</div>
                  </div>
                </div>
              ))}

              {/* Social Icons */}
              <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                {["LinkedIn", "Twitter", "GitHub"].map(s => (
                  <div key={s} style={{
                    padding: "8px 16px", border: `1px solid ${GOLD}`, borderRadius: 8,
                    color: GOLD, fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 600,
                    cursor: "pointer", transition: "all 0.3s",
                  }}
                    onMouseEnter={e => { e.target.style.background = GOLD; e.target.style.color = NAVY; }}
                    onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = GOLD; }}>
                    {s}
                  </div>
                ))}
              </div>
            </AnimSection>

            {/* Form */}
            <AnimSection delay={0.2}>
              <div style={{ background: "rgba(255,255,255,0.05)", border: `1px solid rgba(212,175,55,0.2)`, borderRadius: 16, padding: "40px 36px" }}>
                {submitted ? (
                  <div style={{ textAlign: "center", padding: "40px 0", animation: "fadeInUp 0.5s ease" }}>
                    <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", color: "white", fontSize: 24, marginBottom: 8 }}>Message Sent!</h3>
                    <p style={{ color: "rgba(255,255,255,0.7)" }}>We'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {[["Full Name", "name", "text"], ["Email Address", "email", "email"], ["Phone Number", "phone", "tel"]].map(([ph, key, type]) => (
                      <input key={key} className="input-field" type={type} placeholder={ph} required
                        value={formState[key]}
                        onChange={e => setFormState(s => ({ ...s, [key]: e.target.value }))} />
                    ))}
                    <select className="input-field" value={formState.service}
                      onChange={e => setFormState(s => ({ ...s, service: e.target.value }))} required>
                      <option value="">Service Interested In…</option>
                      <option>AI Agents & Automation</option>
                      <option>Website Development</option>
                      <option>SEO</option>
                    </select>
                    <textarea className="input-field" placeholder="Your Message…" rows={4} required
                      value={formState.message}
                      onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                      style={{ resize: "vertical" }} />
                    <button type="submit" className="btn-gold" style={{ fontSize: 15, padding: "15px 32px" }}>
                      Send Message →
                    </button>
                  </form>
                )}
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ background: "#06132A", borderTop: `1px solid rgba(212,175,55,0.25)`, padding: "60px 40px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
            {/* Brand */}
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", color: "white", fontSize: 24, fontWeight: 700, marginBottom: 12 }}>
                ⚡ Paul <span style={{ color: GOLD }}>Nyang'wara</span>
              </div>
              <div style={{ color: GOLD, fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 2, marginBottom: 10 }}>NEUROSPARK CORPORATION</div>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, lineHeight: 1.7, maxWidth: 260 }}>
                Sparking Africa's AI Revolution, One Business at a Time.
              </p>
            </div>
            {/* Quick Links */}
            <div>
              <div style={{ color: GOLD, fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: 2, marginBottom: 16 }}>QUICK LINKS</div>
              {["Home", "About", "Services", "Projects", "Contact"].map(l => (
                <a key={l} href={`#${l.toLowerCase()}`} style={{ display: "block", color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 14, marginBottom: 10, transition: "color 0.3s" }}
                  onMouseEnter={e => e.target.style.color = GOLD}
                  onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.6)"}>{l}</a>
              ))}
            </div>
            {/* Contact */}
            <div>
              <div style={{ color: GOLD, fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: 2, marginBottom: 16 }}>CONTACT</div>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 2 }}>
                hello@neurospark.co.ke<br />
                +254 799 644 100<br />
                Nairobi, Kenya
              </p>
            </div>
          </div>

          <div style={{ borderTop: `1px solid rgba(212,175,55,0.15)`, paddingTop: 24, textAlign: "center" }}>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>
              © 2025 NeuroSpark Corporation. All Rights Reserved. | Designed with ⚡ in Nairobi, Kenya
            </p>
          </div>
        </div>
      </footer>

      {/* ─── WHATSAPP WIDGET ─── */}
      <div className="wa-widget">
        {waHover && (
          <div className="wa-tooltip">💬 Chat with Paul on WhatsApp</div>
        )}
        <a href="https://wa.me/254799644100" target="_blank" rel="noopener noreferrer"
          className="wa-btn"
          onMouseEnter={() => setWaHover(true)}
          onMouseLeave={() => setWaHover(false)}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
      </div>
    </>
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
          background: `linear-gradient(90deg, ${NAVY}, ${GOLD})`,
          borderRadius: 4,
          transition: "width 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.3s",
        }} />
      </div>
    </div>
  );
}
