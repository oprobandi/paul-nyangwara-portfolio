import { useState, useEffect, useRef } from "react";

const NAVY = "#0A1F44";
const GOLD = "#D4AF37";
const GOLD_LIGHT = "#F0D060";
const OFF_WHITE = "#F9F8F4";
const CHARCOAL = "#1A1A2E";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600&family=Space+Grotesk:wght@400;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'DM Sans', sans-serif; background: ${OFF_WHITE}; color: ${CHARCOAL}; overflow-x: hidden; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: ${NAVY}; }
  ::-webkit-scrollbar-thumb { background: ${GOLD}; border-radius: 3px; }

  @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes pulse-gold { 0%,100% { box-shadow: 0 0 0 0 rgba(212,175,55,0.7); } 50% { box-shadow: 0 0 0 14px rgba(212,175,55,0); } }
  @keyframes wa-pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.08); } }
  @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  @keyframes tickerRev { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
  @keyframes starGlow { 0%,100% { opacity:1; } 50% { opacity:0.7; } }
  @keyframes countUp { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
  @keyframes cardSlide { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }

  .nav-link { color: rgba(255,255,255,0.85); text-decoration: none; font-family: 'Space Grotesk', sans-serif; font-size: 14px; font-weight: 500; letter-spacing: 0.5px; position: relative; padding-bottom: 4px; transition: color 0.3s; }
  .nav-link::after { content: ''; position: absolute; left:0; bottom:0; width:0; height:2px; background:${GOLD}; transition: width 0.3s; }
  .nav-link:hover { color: ${GOLD}; }
  .nav-link:hover::after, .nav-link.active::after { width: 100%; }
  .nav-link.active { color: ${GOLD}; }

  .btn-gold { background: ${GOLD}; color: ${NAVY}; border: none; padding: 14px 32px; border-radius: 8px; font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 15px; cursor: pointer; transition: all 0.3s; letter-spacing: 0.5px; }
  .btn-gold:hover { background: ${GOLD_LIGHT}; transform: translateY(-3px); box-shadow: 0 12px 30px rgba(212,175,55,0.4); }
  .btn-outline-gold { background: transparent; color: ${GOLD}; border: 2px solid ${GOLD}; padding: 13px 32px; border-radius: 8px; font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 15px; cursor: pointer; transition: all 0.3s; }
  .btn-outline-gold:hover { background: ${GOLD}; color: ${NAVY}; transform: translateY(-3px); }

  .section-label { font-family: 'Space Grotesk', sans-serif; color: ${GOLD}; font-size: 13px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 12px; }
  .section-heading { font-family: 'Playfair Display', serif; font-size: clamp(32px,4vw,52px); font-weight: 900; color: ${NAVY}; line-height: 1.15; }
  .section-heading-light { font-family: 'Playfair Display', serif; font-size: clamp(32px,4vw,52px); font-weight: 900; color: white; line-height: 1.15; }
  .gold-divider { width: 60px; height: 3px; background: linear-gradient(90deg,${GOLD},${GOLD_LIGHT}); border-radius: 2px; margin: 16px 0 24px; }

  .skill-icon-wrap { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 24px 20px; border-radius: 14px; transition: all 0.3s; cursor: default; min-width: 90px; }
  .skill-icon-wrap:hover { background: rgba(212,175,55,0.15); transform: translateY(-6px); }

  .skill-category-card { background: white; border-radius: 20px; padding: 32px 28px; border: 1px solid rgba(10,31,68,0.08); transition: all 0.4s; }
  .skill-category-card:hover { box-shadow: 0 16px 48px rgba(212,175,55,0.15); border-color: ${GOLD}; transform: translateY(-4px); }

  .skill-bar-track { height: 8px; background: rgba(10,31,68,0.08); border-radius: 4px; overflow: hidden; margin-top: 6px; }
  .skill-bar-fill { height: 100%; background: linear-gradient(90deg, ${NAVY}, ${GOLD}); border-radius: 4px; transition: width 1.4s cubic-bezier(0.4,0,0.2,1) 0.2s; }

  .testimonial-card { background: white; border-radius: 20px; padding: 40px 36px; border: 1px solid rgba(10,31,68,0.07); transition: all 0.4s; position: relative; overflow: hidden; }
  .testimonial-card::before { content: '"'; position: absolute; top: 16px; left: 24px; font-family: 'Playfair Display', serif; font-size: 120px; color: rgba(212,175,55,0.08); line-height: 1; pointer-events: none; }
  .testimonial-card:hover { box-shadow: 0 20px 50px rgba(212,175,55,0.18); border-color: ${GOLD}; transform: translateY(-4px); }

  .rating-star { color: ${GOLD}; font-size: 18px; animation: starGlow 3s ease-in-out infinite; }

  .video-testimonial { background: ${NAVY}; border-radius: 20px; overflow: hidden; border: 1px solid rgba(212,175,55,0.2); transition: all 0.4s; cursor: pointer; }
  .video-testimonial:hover { border-color: ${GOLD}; box-shadow: 0 16px 40px rgba(212,175,55,0.15); }

  .mobile-menu { position: fixed; top:0; left:0; right:0; bottom:0; background: ${NAVY}; z-index: 998; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 32px; animation: fadeIn 0.3s ease; }
  .wa-widget { position: fixed; bottom: 32px; right: 32px; z-index: 9999; display: flex; flex-direction: column; align-items: flex-end; gap: 10px; }
  .wa-btn { width: 60px; height: 60px; border-radius: 50%; background: #25D366; display: flex; align-items: center; justify-content: center; cursor: pointer; animation: pulse-gold 2.5s infinite, wa-pulse 3s ease-in-out infinite; box-shadow: 0 6px 24px rgba(37,211,102,0.5); text-decoration: none; }
  .wa-btn:hover { transform: scale(1.15) !important; }
  .wa-tooltip { background: ${NAVY}; color: white; padding: 10px 16px; border-radius: 8px; font-family: 'Space Grotesk', sans-serif; font-size: 13px; font-weight: 500; white-space: nowrap; border: 1px solid ${GOLD}; animation: fadeIn 0.3s ease; }

  @media (max-width: 768px) {
    .desktop-nav { display: none !important; }
    .mobile-menu-btn { display: flex !important; }
    .grid-2 { grid-template-columns: 1fr !important; }
    .grid-3 { grid-template-columns: 1fr !important; }
    .grid-4 { grid-template-columns: repeat(2,1fr) !important; }
  }
  @media (min-width: 769px) { .mobile-menu-btn { display: none !important; } }
`;


const SKILLS_TICKER = [
  { name: "Python", emoji: "🐍" }, { name: "JavaScript", emoji: "🟨" }, { name: "React", emoji: "⚛️" },
  { name: "Next.js", emoji: "▲" }, { name: "Node.js", emoji: "🟢" }, { name: "OpenAI", emoji: "🤖" },
  { name: "LangChain", emoji: "🔗" }, { name: "WordPress", emoji: "🌐" }, { name: "Figma", emoji: "🎨" },
  { name: "Google Analytics", emoji: "📊" }, { name: "Ahrefs", emoji: "📡" }, { name: "SEMrush", emoji: "🔍" },
  { name: "Make", emoji: "⚙️" }, { name: "Zapier", emoji: "⚡" }, { name: "Supabase", emoji: "🗄️" },
  { name: "AWS", emoji: "☁️" }, { name: "PostgreSQL", emoji: "🐘" }, { name: "Vercel", emoji: "🔺" },
  { name: "Docker", emoji: "🐳" }, { name: "N8N", emoji: "🔄" },
];

const SKILL_CATEGORIES = [
  {
    title: "AI & Machine Learning",
    icon: "🤖",
    color: "#1a3a6e",
    skills: [
      { name: "LangChain / LangGraph", pct: 95, tag: "Expert" },
      { name: "OpenAI GPT-4 & Fine-tuning", pct: 93, tag: "Expert" },
      { name: "Retrieval-Augmented Generation", pct: 90, tag: "Expert" },
      { name: "Python (ML/Data Science)", pct: 88, tag: "Advanced" },
      { name: "Hugging Face Transformers", pct: 80, tag: "Advanced" },
    ],
  },
  {
    title: "Web Development",
    icon: "🌐",
    color: "#1a4a3e",
    skills: [
      { name: "React / Next.js 14", pct: 92, tag: "Expert" },
      { name: "Node.js / Express", pct: 89, tag: "Expert" },
      { name: "TypeScript", pct: 85, tag: "Advanced" },
      { name: "WordPress / Headless CMS", pct: 86, tag: "Advanced" },
      { name: "Figma / UI Design", pct: 83, tag: "Advanced" },
    ],
  },
  {
    title: "SEO & Growth",
    icon: "📈",
    color: "#3a2a0e",
    skills: [
      { name: "Technical SEO", pct: 90, tag: "Expert" },
      { name: "Google Analytics 4", pct: 92, tag: "Expert" },
      { name: "Ahrefs & SEMrush", pct: 88, tag: "Expert" },
      { name: "Content Strategy", pct: 87, tag: "Advanced" },
      { name: "Local SEO", pct: 89, tag: "Expert" },
    ],
  },
  {
    title: "Automation & Cloud",
    icon: "⚙️",
    color: "#2a1a4e",
    skills: [
      { name: "Make / N8N / Zapier", pct: 94, tag: "Expert" },
      { name: "Supabase / PostgreSQL", pct: 86, tag: "Advanced" },
      { name: "AWS (EC2, S3, Lambda)", pct: 82, tag: "Advanced" },
      { name: "Docker / Linux", pct: 80, tag: "Advanced" },
      { name: "Vercel / Netlify", pct: 91, tag: "Expert" },
    ],
  },
];

const TESTIMONIALS = [
  {
    name: "Amara Osei",
    role: "Operations Manager",
    company: "QuickMart Kenya",
    avatar: "https://images.unsplash.com/photo-1507152832244-10d45c7eda57?w=120&q=80",
    quote: "NeuroSpark built us an AI agent that handles 80% of our customer queries automatically. Our team now focuses on growth, not repetitive tasks. Paul and his team are simply world-class.",
    service: "AI Automation",
    rating: 5,
    result: "80% queries automated",
  },
  {
    name: "Fatima Hassan",
    role: "Marketing Director",
    company: "Nairobi Digital Co.",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=120&q=80",
    quote: "Our website traffic tripled within 4 months of engaging NeuroSpark for SEO. The results speak for themselves. Highly professional, data-driven, and always delivering on promises.",
    service: "SEO",
    rating: 5,
    result: "3× organic traffic",
  },
  {
    name: "David Kiprono",
    role: "Managing Partner",
    company: "AfriFinance Ltd.",
    avatar: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=120&q=80",
    quote: "The website NeuroSpark designed for us is stunning and converts incredibly well. Paul understood our vision from day one and brought it to life beyond expectations. A true partner.",
    service: "Web Development",
    rating: 5,
    result: "3× enquiry rate",
  },
  {
    name: "Grace Wambui",
    role: "CEO",
    company: "NairobiShops.co.ke",
    avatar: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=120&q=80",
    quote: "We finally understand what's happening with our SEO in real time. Paul built a custom dashboard that's saved us 8 hours of weekly reporting. The ROI is extraordinary.",
    service: "SEO + Web Dev",
    rating: 5,
    result: "220% organic revenue",
  },
  {
    name: "Peter Kamau",
    role: "Sales Director",
    company: "Apex Insurance",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&q=80",
    quote: "AutoLead books more qualified meetings in a week than my team used to in a month. It's like having a full-time SDR that never sleeps. Paul truly delivered on his promise.",
    service: "AI Automation",
    rating: 5,
    result: "5× lead volume",
  },
  {
    name: "Njeri Kamau",
    role: "Guest Experience Manager",
    company: "Serena Hotels",
    avatar: "https://images.unsplash.com/photo-1596728325488-58c87691e9af?w=120&q=80",
    quote: "SmartDesk handles our late-night guest queries better than some of our junior staff. Paul truly understood the hospitality context and built something that genuinely delights guests.",
    service: "AI Automation",
    rating: 5,
    result: "85% self-service rate",
  },
  {
    name: "Daniel Mwangi",
    role: "Founder",
    company: "AfriCart Ltd.",
    avatar: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=120&q=80",
    quote: "Paul built exactly what Kenya's e-commerce market needed. The M-Pesa integration is seamless, our Lighthouse score is 94, and we did KES 2M GMV in our first month. Unbelievable.",
    service: "Web Development",
    rating: 5,
    result: "KES 2M+ GMV month 1",
  },
  {
    name: "Sarah Odhiambo",
    role: "Managing Partner",
    company: "Sterling Capital",
    avatar: "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=120&q=80",
    quote: "Within a month of launching the new site, we had more qualified enquiries than the entire previous quarter. The ROI has been extraordinary. Paul is a rare talent in this market.",
    service: "Web Development",
    rating: 5,
    result: "3× enquiry rate",
  },
];

const SERVICES_FILTER = ["All", "AI Automation", "Web Development", "SEO", "SEO + Web Dev"];

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
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(36px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`, ...style }}>
      {children}
    </div>
  );
}

function SkillBar({ name, pct, tag }) {
  const [ref, inView] = useInView();
  const tagColor = tag === "Expert" ? GOLD : "#7cb8ff";
  return (
    <div ref={ref} style={{ marginBottom: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: NAVY }}>{name}</span>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ background: `${tagColor}20`, color: tagColor, border: `1px solid ${tagColor}40`, padding: "1px 8px", borderRadius: 10, fontSize: 10, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>{tag}</span>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 700, color: GOLD }}>{pct}%</span>
        </div>
      </div>
      <div className="skill-bar-track">
        <div className="skill-bar-fill" style={{ width: inView ? `${pct}%` : "0%" }} />
      </div>
    </div>
  );
}

export default function SkillsTestimonialsPage() {
  const [activeTab, setActiveTab] = useState("skills"); // "skills" | "testimonials"
  const [testimonialFilter, setTestimonialFilter] = useState("All");
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);
  const [expandedSkillCat, setExpandedSkillCat] = useState(null);

  const filteredTestimonials = testimonialFilter === "All"
    ? TESTIMONIALS
    : TESTIMONIALS.filter(t => t.service === testimonialFilter);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonialIdx(i => (i + 1) % filteredTestimonials.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [filteredTestimonials.length]);

  useEffect(() => {
    setActiveTestimonialIdx(0);
  }, [testimonialFilter]);

  return (
    <>
      <style>{styles}</style>



      {/* ─── HERO ─── */}
      <section style={{ background: NAVY, paddingTop: 140, paddingBottom: 0, textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(212,175,55,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.03) 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.08), transparent 60%)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 680, margin: "0 auto", padding: "0 40px", animation: "fadeInUp 0.8s ease both" }}>
          <div className="section-label" style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>// Depth & Trust</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px,5vw,64px)", fontWeight: 900, color: "white", lineHeight: 1.1, marginBottom: 20 }}>
            Skills & <span style={{ color: GOLD }}>Testimonials</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 17, lineHeight: 1.8, maxWidth: 500, margin: "0 auto 48px" }}>
            The technologies I've mastered and the clients whose businesses were transformed. Evidence over claims.
          </p>

          {/* Page tabs */}
          <div style={{ display: "flex", background: "rgba(255,255,255,0.07)", borderRadius: 50, padding: 6, gap: 4, maxWidth: 320, margin: "0 auto 64px", border: "1px solid rgba(212,175,55,0.2)" }}>
            {["skills", "testimonials"].map(tab => (
              <button key={tab} onClick={() => { setActiveTab(tab); document.getElementById(tab).scrollIntoView({ behavior: "smooth" }); }}
                style={{
                  flex: 1, padding: "12px 24px", borderRadius: 40, border: "none", cursor: "pointer",
                  background: activeTab === tab ? GOLD : "transparent",
                  color: activeTab === tab ? NAVY : "rgba(255,255,255,0.7)",
                  fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 14, transition: "all 0.3s", textTransform: "capitalize",
                }}>{tab}</button>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════ */}
      {/* ─── SKILLS SECTION ─── */}
      {/* ══════════════════════════════════════════════ */}
      <div id="skills">

        {/* Tech Ticker */}
        <section style={{ background: NAVY, padding: "0 0 60px" }}>
          <div style={{ overflow: "hidden", padding: "16px 0" }}>
            <div style={{ display: "flex", animation: "ticker 28s linear infinite", width: "max-content" }}>
              {[...SKILLS_TICKER, ...SKILLS_TICKER].map((s, i) => (
                <div key={i} className="skill-icon-wrap" style={{ color: "white" }}>
                  <span style={{ fontSize: 34 }}>{s.emoji}</span>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.65)", fontWeight: 600, letterSpacing: 0.5, whiteSpace: "nowrap" }}>{s.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ overflow: "hidden", padding: "16px 0" }}>
            <div style={{ display: "flex", animation: "tickerRev 36s linear infinite", width: "max-content" }}>
              {[...SKILLS_TICKER.slice(10), ...SKILLS_TICKER.slice(0, 10), ...SKILLS_TICKER.slice(10), ...SKILLS_TICKER.slice(0, 10)].map((s, i) => (
                <div key={i} className="skill-icon-wrap" style={{ color: "white" }}>
                  <span style={{ fontSize: 34 }}>{s.emoji}</span>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.65)", fontWeight: 600, letterSpacing: 0.5, whiteSpace: "nowrap" }}>{s.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Deep skill categories */}
        <section style={{ background: OFF_WHITE, padding: "80px 40px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <AnimSection style={{ textAlign: "center", marginBottom: 56 }}>
              <div className="section-label">// Skill Depth</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", color: NAVY, fontSize: "clamp(32px,4vw,52px)", fontWeight: 900, lineHeight: 1.15 }}>
                Proficiency <span style={{ color: GOLD }}>Breakdown</span>
              </h2>
              <div className="gold-divider" style={{ margin: "16px auto 0" }} />
              <p style={{ color: "#777", marginTop: 16, fontSize: 15, maxWidth: 500, margin: "16px auto 0" }}>
                Not generalist shallow — deep expertise in each domain, built over 5+ years of real-world projects.
              </p>
            </AnimSection>

            <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
              {SKILL_CATEGORIES.map((cat, i) => (
                <AnimSection key={cat.title} delay={i * 0.1}>
                  <div className="skill-category-card" style={{ borderTop: `4px solid ${GOLD}` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                      <div style={{ width: 48, height: 48, borderRadius: 12, background: NAVY, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{cat.icon}</div>
                      <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", color: NAVY, fontSize: 17, fontWeight: 700 }}>{cat.title}</h3>
                    </div>
                    {cat.skills.map(skill => <SkillBar key={skill.name} {...skill} />)}
                  </div>
                </AnimSection>
              ))}
            </div>
          </div>
        </section>

        {/* Tool grid */}
        <section style={{ background: NAVY, padding: "80px 40px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <AnimSection style={{ textAlign: "center", marginBottom: 56 }}>
              <div className="section-label">// Full Stack</div>
              <h2 className="section-heading-light">Every Tool in the <span style={{ color: GOLD }}>Arsenal</span></h2>
              <div className="gold-divider" style={{ margin: "16px auto 0" }} />
            </AnimSection>
            <div className="grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
              {[
                { name: "Python", level: "Expert", icon: "🐍" },
                { name: "JavaScript", level: "Expert", icon: "🟨" },
                { name: "TypeScript", level: "Advanced", icon: "💙" },
                { name: "React", level: "Expert", icon: "⚛️" },
                { name: "Next.js 14", level: "Expert", icon: "▲" },
                { name: "Node.js", level: "Expert", icon: "🟢" },
                { name: "LangChain", level: "Expert", icon: "🔗" },
                { name: "OpenAI API", level: "Expert", icon: "🤖" },
                { name: "Supabase", level: "Advanced", icon: "🗄️" },
                { name: "PostgreSQL", level: "Advanced", icon: "🐘" },
                { name: "WordPress", level: "Expert", icon: "🌐" },
                { name: "Figma", level: "Advanced", icon: "🎨" },
                { name: "AWS", level: "Advanced", icon: "☁️" },
                { name: "Vercel", level: "Expert", icon: "🔺" },
                { name: "Docker", level: "Advanced", icon: "🐳" },
                { name: "Make / N8N", level: "Expert", icon: "⚙️" },
                { name: "Ahrefs", level: "Expert", icon: "📡" },
                { name: "SEMrush", level: "Expert", icon: "🔍" },
                { name: "GA4", level: "Expert", icon: "📊" },
                { name: "M-Pesa API", level: "Expert", icon: "💚" },
              ].map((tool, i) => (
                <AnimSection key={tool.name} delay={i * 0.03}>
                  <div style={{
                    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(212,175,55,0.15)",
                    borderRadius: 12, padding: "16px 14px", textAlign: "center", transition: "all 0.3s",
                    cursor: "default",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(212,175,55,0.1)"; e.currentTarget.style.borderColor = GOLD; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(212,175,55,0.15)"; }}>
                    <div style={{ fontSize: 24, marginBottom: 8 }}>{tool.icon}</div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", color: "white", fontSize: 12, fontWeight: 600, marginBottom: 4 }}>{tool.name}</div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", color: tool.level === "Expert" ? GOLD : "rgba(255,255,255,0.4)", fontSize: 10, fontWeight: 600, letterSpacing: 0.5 }}>{tool.level.toUpperCase()}</div>
                  </div>
                </AnimSection>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ══════════════════════════════════════════════ */}
      {/* ─── TESTIMONIALS SECTION ─── */}
      {/* ══════════════════════════════════════════════ */}
      <div id="testimonials">

        {/* Featured testimonial slider */}
        <section style={{ background: OFF_WHITE, padding: "80px 40px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <AnimSection style={{ textAlign: "center", marginBottom: 48 }}>
              <div className="section-label">// Social Proof</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", color: NAVY, fontSize: "clamp(32px,4vw,52px)", fontWeight: 900, lineHeight: 1.15 }}>
                What <span style={{ color: GOLD }}>Clients Say</span>
              </h2>
              <div className="gold-divider" style={{ margin: "16px auto 0" }} />
            </AnimSection>

            {/* Filter by service */}
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
              {SERVICES_FILTER.map(svc => (
                <button key={svc} onClick={() => setTestimonialFilter(svc)} style={{
                  padding: "8px 20px", borderRadius: 30, border: `2px solid ${testimonialFilter === svc ? GOLD : "rgba(10,31,68,0.15)"}`,
                  background: testimonialFilter === svc ? NAVY : "white",
                  color: testimonialFilter === svc ? GOLD : "#666",
                  fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 12, cursor: "pointer", transition: "all 0.3s",
                }}>{svc}</button>
              ))}
            </div>

            {/* Spotlight card */}
            <AnimSection>
              <div style={{ background: NAVY, borderRadius: 24, padding: "48px 44px", border: "1px solid rgba(212,175,55,0.2)", position: "relative", overflow: "hidden", marginBottom: 20 }}>
                <div style={{ position: "absolute", top: 20, right: 28, fontSize: 100, fontFamily: "'Playfair Display', serif", color: "rgba(212,175,55,0.06)", lineHeight: 1 }}>"</div>

                <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
                  {Array(5).fill(0).map((_, i) => <span key={i} className="rating-star">★</span>)}
                </div>

                <p style={{ fontFamily: "'Playfair Display', serif", color: "white", fontSize: "clamp(17px,2vw,22px)", lineHeight: 1.7, fontStyle: "italic", marginBottom: 32, minHeight: 96, transition: "all 0.4s" }}>
                  "{filteredTestimonials[activeTestimonialIdx]?.quote}"
                </p>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
                  <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                    <img src={filteredTestimonials[activeTestimonialIdx]?.avatar} alt="avatar"
                      style={{ width: 56, height: 56, borderRadius: "50%", objectFit: "cover", border: `2px solid ${GOLD}` }} />
                    <div>
                      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "white", fontSize: 16 }}>{filteredTestimonials[activeTestimonialIdx]?.name}</div>
                      <div style={{ color: GOLD, fontSize: 13, fontWeight: 500 }}>{filteredTestimonials[activeTestimonialIdx]?.role}, {filteredTestimonials[activeTestimonialIdx]?.company}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                    <span style={{ background: "rgba(212,175,55,0.12)", border: `1px solid rgba(212,175,55,0.3)`, color: GOLD, padding: "5px 14px", borderRadius: 20, fontSize: 11, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>
                      🚀 {filteredTestimonials[activeTestimonialIdx]?.result}
                    </span>
                  </div>
                </div>
              </div>
            </AnimSection>

            {/* Dots + arrows */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12 }}>
              <button onClick={() => setActiveTestimonialIdx(i => (i - 1 + filteredTestimonials.length) % filteredTestimonials.length)}
                style={{ width: 40, height: 40, borderRadius: "50%", background: "transparent", border: `2px solid ${GOLD}`, color: GOLD, fontSize: 16, cursor: "pointer", transition: "all 0.3s" }}
                onMouseEnter={e => { e.target.style.background = GOLD; e.target.style.color = NAVY; }}
                onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = GOLD; }}>←</button>
              {filteredTestimonials.map((_, i) => (
                <button key={i} onClick={() => setActiveTestimonialIdx(i)} style={{
                  width: i === activeTestimonialIdx ? 28 : 10, height: 10, borderRadius: 5,
                  background: i === activeTestimonialIdx ? GOLD : "rgba(10,31,68,0.2)",
                  border: "none", cursor: "pointer", transition: "all 0.3s",
                }} />
              ))}
              <button onClick={() => setActiveTestimonialIdx(i => (i + 1) % filteredTestimonials.length)}
                style={{ width: 40, height: 40, borderRadius: "50%", background: "transparent", border: `2px solid ${GOLD}`, color: GOLD, fontSize: 16, cursor: "pointer", transition: "all 0.3s" }}
                onMouseEnter={e => { e.target.style.background = GOLD; e.target.style.color = NAVY; }}
                onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = GOLD; }}>→</button>
            </div>
          </div>
        </section>

        {/* Testimonials grid */}
        <section style={{ background: NAVY, padding: "80px 40px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <AnimSection style={{ textAlign: "center", marginBottom: 56 }}>
              <div className="section-label">// All Reviews</div>
              <h2 className="section-heading-light">Every <span style={{ color: GOLD }}>Voice</span></h2>
              <div className="gold-divider" style={{ margin: "16px auto 0" }} />
            </AnimSection>
            <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
              {TESTIMONIALS.map((t, i) => (
                <AnimSection key={t.name} delay={i * 0.08}>
                  <div className="testimonial-card">
                    <div style={{ display: "flex", gap: 3, marginBottom: 14 }}>
                      {Array(5).fill(0).map((_, si) => <span key={si} style={{ color: GOLD, fontSize: 16 }}>★</span>)}
                    </div>
                    <p style={{ color: "#444", fontSize: 14, lineHeight: 1.8, fontStyle: "italic", marginBottom: 20 }}>"{t.quote}"</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 16, borderTop: "1px solid rgba(10,31,68,0.08)" }}>
                      <img src={t.avatar} alt={t.name} style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover", border: `2px solid ${GOLD}` }} />
                      <div>
                        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: NAVY, fontSize: 14 }}>{t.name}</div>
                        <div style={{ color: "#888", fontSize: 12 }}>{t.role}, {t.company}</div>
                      </div>
                      <div style={{ marginLeft: "auto" }}>
                        <span style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.3)", color: GOLD, padding: "3px 10px", borderRadius: 20, fontSize: 10, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>{t.service}</span>
                      </div>
                    </div>
                  </div>
                </AnimSection>
              ))}
            </div>
          </div>
        </section>

        {/* Trust metrics */}
        <section style={{ background: OFF_WHITE, padding: "80px 40px" }}>
          <div style={{ maxWidth: 960, margin: "0 auto" }}>
            <AnimSection style={{ textAlign: "center", marginBottom: 56 }}>
              <div className="section-label">// The Numbers Don't Lie</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", color: NAVY, fontSize: "clamp(28px,4vw,48px)", fontWeight: 900 }}>
                Aggregate <span style={{ color: GOLD }}>Client Outcomes</span>
              </h2>
              <div className="gold-divider" style={{ margin: "16px auto 0" }} />
            </AnimSection>
            <div className="grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
              {[
                { icon: "⭐", val: "4.9/5", label: "Average Rating", sub: "Across 50+ clients" },
                { icon: "🔁", val: "100%", label: "Retention Rate", sub: "Clients who return" },
                { icon: "📈", val: "200%+", label: "Avg Revenue Growth", sub: "12 months post-project" },
                { icon: "⚡", val: "< 48h", label: "Response Time", sub: "On all enquiries" },
              ].map((stat, i) => (
                <AnimSection key={stat.label} delay={i * 0.1}>
                  <div style={{ background: NAVY, borderRadius: 16, padding: "28px 20px", textAlign: "center", border: "1px solid rgba(212,175,55,0.2)", transition: "all 0.3s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.transform = "translateY(-4px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(212,175,55,0.2)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                    <div style={{ fontSize: 28, marginBottom: 10 }}>{stat.icon}</div>
                    <div style={{ fontFamily: "'Playfair Display', serif", color: GOLD, fontSize: 32, fontWeight: 900, marginBottom: 4 }}>{stat.val}</div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", color: "white", fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{stat.label}</div>
                    <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>{stat.sub}</div>
                  </div>
                </AnimSection>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ─── CTA ─── */}
      <section style={{ background: NAVY, padding: "80px 40px", textAlign: "center", backgroundImage: `radial-gradient(ellipse at center, rgba(212,175,55,0.08) 0%, transparent 70%)` }}>
        <AnimSection>
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: "white", fontSize: "clamp(28px,4vw,48px)", fontWeight: 900, marginBottom: 16 }}>
            Join the <span style={{ color: GOLD }}>Success Stories</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 17, marginBottom: 40, maxWidth: 500, margin: "0 auto 40px" }}>
            Your business could be next. Let's have a conversation about what's possible.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/#contact"><button className="btn-gold" style={{ fontSize: 16, padding: "16px 40px" }}>Book a Free Discovery Call →</button></a>
            <a href="/projects"><button className="btn-outline-gold" style={{ fontSize: 16, padding: "16px 40px" }}>View Case Studies</button></a>
          </div>
        </AnimSection>
      </section>


    </>
  );
}
