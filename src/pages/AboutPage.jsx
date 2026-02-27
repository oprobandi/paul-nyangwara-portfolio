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
  @keyframes float { 0%,100% { transform: translateY(0) rotate(-1deg); } 50% { transform: translateY(-14px) rotate(1deg); } }
  @keyframes pulse-gold { 0%,100% { box-shadow: 0 0 0 0 rgba(212,175,55,0.7); } 50% { box-shadow: 0 0 0 14px rgba(212,175,55,0); } }
  @keyframes wa-pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.08); } }
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

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

  .timeline-item { display: flex; gap: 28px; padding-bottom: 48px; position: relative; }
  .timeline-item::before { content: ''; position: absolute; left: 19px; top: 40px; bottom: 0; width: 2px; background: rgba(212,175,55,0.2); }
  .timeline-item:last-child::before { display: none; }
  .timeline-dot { width: 40px; height: 40px; border-radius: 50%; background: ${NAVY}; border: 3px solid ${GOLD}; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 14px; z-index: 1; }

  .value-card { background: white; border-radius: 16px; padding: 32px 28px; border: 1px solid rgba(10,31,68,0.08); transition: all 0.4s; }
  .value-card:hover { transform: translateY(-8px); box-shadow: 0 20px 50px rgba(212,175,55,0.18); border-color: ${GOLD}; }

  .skill-bar-wrap { margin-bottom: 20px; }
  .skill-bar-track { height: 8px; background: rgba(10,31,68,0.08); border-radius: 4px; overflow: hidden; }
  .skill-bar-fill { height: 100%; background: linear-gradient(90deg, ${NAVY}, ${GOLD}); border-radius: 4px; transition: width 1.4s cubic-bezier(0.4,0,0.2,1) 0.3s; }

  .award-card { background: ${NAVY}; border-radius: 14px; padding: 24px 20px; border: 1px solid rgba(212,175,55,0.2); text-align: center; transition: all 0.3s; }
  .award-card:hover { border-color: ${GOLD}; transform: translateY(-4px); box-shadow: 0 12px 30px rgba(212,175,55,0.15); }

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
    .hero-grid { grid-template-columns: 1fr !important; }
  }
  @media (min-width: 769px) { .mobile-menu-btn { display: none !important; } }
`;


const TIMELINE = [
  { year: "2018", icon: "🎓", title: "University of Nairobi", role: "BSc Computer Science", desc: "Graduated with Honours. Developed a deep passion for applied machine learning and distributed systems. Led the university's tech club and built my first automation tool during this time." },
  { year: "2019", icon: "💼", title: "Junior Developer", role: "Safaricom PLC — Nairobi", desc: "Joined Kenya's largest telco as a junior software engineer. Worked on internal tooling, API integrations, and gained exposure to enterprise-scale systems processing millions of transactions daily." },
  { year: "2021", icon: "🤖", title: "AI Engineer", role: "Andela — Remote", desc: "Transitioned into AI engineering, building NLP pipelines and ML models for clients across the US and Europe. Honed skills in LangChain, OpenAI APIs, and production-grade model deployment." },
  { year: "2022", icon: "⚡", title: "Founded NeuroSpark Corporation", role: "CEO & Lead Engineer", desc: "Took the leap. Founded NeuroSpark Corporation with a mission to bring enterprise-grade AI and automation to African SMEs. Started with 3 clients, grew to 50+ within 18 months." },
  { year: "2024", icon: "🌍", title: "NeuroSpark Expands", role: "Pan-African Operations", desc: "Expanded services across East Africa. Established partnerships with agencies in Uganda, Tanzania, and Rwanda. Launched the AI Automation Academy to train the next generation of Kenyan AI engineers." },
];

const VALUES = [
  { icon: "🌍", title: "Africa First", desc: "Every solution I build is designed for the African context — M-Pesa payments, low-bandwidth environments, local languages, and the realities of SME budgets." },
  { icon: "⚡", title: "Speed & Precision", desc: "I move fast without breaking things. Rapid prototyping, weekly demos, and relentless iteration until the solution does exactly what the business needs." },
  { icon: "🤝", title: "Partnership Over Transactions", desc: "I don't disappear after launch. I build long-term relationships where I'm invested in your growth, not just your invoice." },
  { icon: "📊", title: "Outcomes, Not Outputs", desc: "Code is a means to an end. I measure success by the business metrics that change — revenue, time saved, leads generated, rankings achieved." },
  { icon: "🔍", title: "Radical Transparency", desc: "No jargon, no smoke and mirrors. You always know exactly what I'm building, why, how it's performing, and what comes next." },
  { icon: "🧠", title: "Lifelong Learning", desc: "AI moves fast. I dedicate 10+ hours weekly to studying new models, tools, and techniques so your business always has access to the cutting edge." },
];

const SKILLS_DEEP = [
  { cat: "AI & Machine Learning", items: [{ name: "LangChain / LangGraph", pct: 95 }, { name: "OpenAI GPT-4 / Fine-tuning", pct: 93 }, { name: "RAG Architectures", pct: 90 }, { name: "Python ML (scikit-learn, pandas)", pct: 88 }] },
  { cat: "Web Development", items: [{ name: "React / Next.js 14", pct: 92 }, { name: "Node.js / Express", pct: 89 }, { name: "WordPress / Headless CMS", pct: 85 }, { name: "UI/UX Design (Figma)", pct: 83 }] },
  { cat: "SEO & Growth", items: [{ name: "Technical SEO", pct: 90 }, { name: "Content Strategy", pct: 87 }, { name: "Ahrefs / SEMrush", pct: 88 }, { name: "Google Analytics 4", pct: 92 }] },
  { cat: "Infrastructure & Tools", items: [{ name: "Supabase / PostgreSQL", pct: 86 }, { name: "AWS / Vercel", pct: 82 }, { name: "Make / Zapier / N8N", pct: 94 }, { name: "Docker / Linux", pct: 80 }] },
];

const ACHIEVEMENTS = [
  { icon: "🏆", val: "50+", label: "Clients Served" },
  { icon: "⭐", val: "4.9/5", label: "Average Rating" },
  { icon: "🤖", val: "30+", label: "AI Agents Built" },
  { icon: "🌍", val: "5", label: "Countries Reached" },
  { icon: "📈", val: "200%+", label: "Avg Client Growth" },
  { icon: "⚡", val: "3yr+", label: "Running NeuroSpark" },
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
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(36px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`, ...style }}>
      {children}
    </div>
  );
}

function SkillBar({ name, pct }) {
  const [ref, inView] = useInView();
  return (
    <div className="skill-bar-wrap" ref={ref}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: NAVY }}>{name}</span>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700, color: GOLD }}>{pct}%</span>
      </div>
      <div className="skill-bar-track">
        <div className="skill-bar-fill" style={{ width: inView ? `${pct}%` : "0%" }} />
      </div>
    </div>
  );
}

export default function AboutPage() {
  const [activeSkillCat, setActiveSkillCat] = useState(0);

  return (
    <>
      <style>{styles}</style>



      {/* ─── HERO ─── */}
      <section style={{ background: NAVY, minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", padding: "120px 40px 80px" }}>
        {/* Grid bg */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(212,175,55,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.04) 1px, transparent 1px)`, backgroundSize: "48px 48px" }} />
        {/* Radial glow */}
        <div style={{ position: "absolute", top: "20%", right: "10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
          <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 80, alignItems: "center" }}>

            {/* Photo column */}
            <AnimSection>
              <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
                {/* Decorative ring */}
                <div style={{ position: "absolute", width: 340, height: 340, borderRadius: "50%", border: `1px solid rgba(212,175,55,0.2)`, animation: "spin 20s linear infinite", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
                <div style={{ position: "absolute", width: 390, height: 390, borderRadius: "50%", border: `1px dashed rgba(212,175,55,0.1)`, animation: "spin 30s linear infinite reverse", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />

                {/* Photo */}
                <div style={{ width: 300, height: 300, borderRadius: "50%", border: `4px solid ${GOLD}`, overflow: "hidden", boxShadow: `0 0 0 10px rgba(212,175,55,0.1), 0 30px 80px rgba(0,0,0,0.4)`, animation: "float 7s ease-in-out infinite", zIndex: 1, flexShrink: 0 }}>
                  <img src="/paul-headshot.jpg" alt="Paul Nyang'wara" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>

                {/* Floating badge: location */}
                <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", background: "rgba(10,31,68,0.9)", border: `1px solid ${GOLD}`, borderRadius: 30, padding: "8px 20px", backdropFilter: "blur(10px)", whiteSpace: "nowrap", zIndex: 2 }}>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", color: "white", fontSize: 13, fontWeight: 600 }}>🇰🇪 Nairobi, Kenya</span>
                </div>

                {/* Floating badge: role */}
                <div style={{ position: "absolute", top: 20, right: 0, background: GOLD, borderRadius: 12, padding: "10px 16px", zIndex: 2 }}>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", color: NAVY, fontSize: 10, fontWeight: 700, letterSpacing: 1 }}>FOUNDER & CEO</div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", color: NAVY, fontSize: 11, fontWeight: 600 }}>NeuroSpark Corp.</div>
                </div>
              </div>
            </AnimSection>

            {/* Text column */}
            <AnimSection delay={0.2}>
              <div className="section-label">// The Person Behind The Work</div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", color: "white", fontSize: "clamp(36px,4.5vw,58px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 8 }}>
                Paul<br /><span style={{ color: GOLD }}>Nyang'wara</span>
              </h1>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", color: "rgba(255,255,255,0.5)", fontSize: 14, fontWeight: 500, letterSpacing: 2, marginBottom: 28 }}>
                AI ENGINEER · WEB ARCHITECT · SEO STRATEGIST
              </div>
              <div className="gold-divider" />
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 16, lineHeight: 1.9, marginBottom: 20 }}>
                I'm a Nairobi-born technologist who believes African businesses deserve the same intelligent tools that power Silicon Valley giants — without the Silicon Valley price tag.
              </p>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 15, lineHeight: 1.85, marginBottom: 36 }}>
                I founded <strong style={{ color: GOLD }}>NeuroSpark Corporation</strong> to bridge that gap. Since 2022, I've been building AI agents, automation systems, high-converting websites, and SEO strategies for SMEs across Kenya and East Africa — turning complex technology into measurable business outcomes.
              </p>

              {/* Quick stats */}
              <div style={{ display: "flex", gap: 32, flexWrap: "wrap", marginBottom: 36 }}>
                {[["5+", "Years in Tech"], ["50+", "Clients"], ["4.9★", "Rating"]].map(([val, lab]) => (
                  <div key={lab}>
                    <div style={{ fontFamily: "'Playfair Display', serif", color: GOLD, fontSize: 30, fontWeight: 900 }}>{val}</div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 600, letterSpacing: 1 }}>{lab}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href="/#contact"><button className="btn-gold">Work With Me →</button></a>
                <a href="/Paul-Nyangwara-CV.pdf" download><button className="btn-outline-gold">Download CV ↓</button></a>
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* ─── ACHIEVEMENTS MARQUEE ─── */}
      <div style={{ background: GOLD, padding: "20px 0", overflow: "hidden" }}>
        <div style={{ display: "flex", animation: "marquee 18s linear infinite", width: "max-content" }}>
          {[...ACHIEVEMENTS, ...ACHIEVEMENTS].map((a, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 40px", whiteSpace: "nowrap" }}>
              <span style={{ fontSize: 20 }}>{a.icon}</span>
              <span style={{ fontFamily: "'Playfair Display', serif", color: NAVY, fontSize: 22, fontWeight: 900 }}>{a.val}</span>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", color: NAVY, fontSize: 12, fontWeight: 700, letterSpacing: 1, opacity: 0.7 }}>{a.label.toUpperCase()}</span>
              <span style={{ color: "rgba(10,31,68,0.3)", fontSize: 18, marginLeft: 8 }}>◆</span>
            </div>
          ))}
        </div>
      </div>

      {/* ─── MY STORY / TIMELINE ─── */}
      <section style={{ background: OFF_WHITE, padding: "100px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 80, alignItems: "start" }}>
            {/* Sticky intro */}
            <AnimSection>
              <div style={{ position: "sticky", top: 100 }}>
                <div className="section-label">// My Journey</div>
                <h2 className="section-heading">From Student Coder<br /><span style={{ color: GOLD }}>to AI Founder</span></h2>
                <div className="gold-divider" />
                <p style={{ color: "#555", lineHeight: 1.9, fontSize: 15, marginBottom: 24 }}>
                  My path wasn't linear — it was a series of deliberate bets on where technology was heading. Each role taught me something critical. Every client taught me something human. The combination became NeuroSpark.
                </p>
                <p style={{ color: "#777", lineHeight: 1.85, fontSize: 14 }}>
                  Today I sit at the intersection of AI engineering, product design, and business strategy — which means I can design a solution, build it, and make sure it actually moves the needle for your business.
                </p>
                {/* Unsplash context image */}
                <div style={{ marginTop: 36, borderRadius: 16, overflow: "hidden", boxShadow: "0 12px 40px rgba(10,31,68,0.12)" }}>
                  <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=700&q=80" alt="Tech workspace" style={{ width: "100%", height: 220, objectFit: "cover" }} />
                </div>
              </div>
            </AnimSection>

            {/* Timeline */}
            <div>
              {TIMELINE.map((item, i) => (
                <AnimSection key={item.year} delay={i * 0.12}>
                  <div className="timeline-item">
                    <div className="timeline-dot">{item.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 6, flexWrap: "wrap" }}>
                        <span style={{ fontFamily: "'Space Grotesk', sans-serif", color: GOLD, fontSize: 12, fontWeight: 700, letterSpacing: 2 }}>{item.year}</span>
                        <span style={{ background: `rgba(212,175,55,0.1)`, border: `1px solid rgba(212,175,55,0.3)`, color: NAVY, padding: "2px 10px", borderRadius: 20, fontSize: 11, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>{item.role}</span>
                      </div>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", color: NAVY, fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{item.title}</h3>
                      <p style={{ color: "#666", fontSize: 14, lineHeight: 1.8 }}>{item.desc}</p>
                    </div>
                  </div>
                </AnimSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── VALUES ─── */}
      <section style={{ background: NAVY, padding: "100px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <AnimSection style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="section-label">// How I Work</div>
            <h2 className="section-heading-light">Principles I <span style={{ color: GOLD }}>Never Compromise On</span></h2>
            <div className="gold-divider" style={{ margin: "16px auto 0" }} />
          </AnimSection>
          <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {VALUES.map((v, i) => (
              <AnimSection key={v.title} delay={i * 0.1}>
                <div className="value-card">
                  <div style={{ fontSize: 36, marginBottom: 16 }}>{v.icon}</div>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", color: NAVY, fontSize: 17, fontWeight: 700, marginBottom: 10 }}>{v.title}</h3>
                  <p style={{ color: "#555", fontSize: 14, lineHeight: 1.75 }}>{v.desc}</p>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SKILLS DEEP DIVE ─── */}
      <section style={{ background: OFF_WHITE, padding: "100px 40px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <AnimSection style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="section-label">// Expertise</div>
            <h2 className="section-heading">Skills & <span style={{ color: GOLD }}>Proficiency</span></h2>
            <div className="gold-divider" style={{ margin: "16px auto 0" }} />
          </AnimSection>

          {/* Category tabs */}
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
            {SKILLS_DEEP.map((cat, i) => (
              <button key={cat.cat} onClick={() => setActiveSkillCat(i)} style={{
                padding: "10px 24px", borderRadius: 30, border: `2px solid ${activeSkillCat === i ? GOLD : "rgba(10,31,68,0.15)"}`,
                background: activeSkillCat === i ? NAVY : "white",
                color: activeSkillCat === i ? GOLD : "#666",
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 13, cursor: "pointer", transition: "all 0.3s",
              }}>{cat.cat}</button>
            ))}
          </div>

          <AnimSection>
            <div style={{ background: "white", borderRadius: 20, padding: "40px", border: "1px solid rgba(10,31,68,0.08)", boxShadow: "0 4px 20px rgba(10,31,68,0.05)" }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", color: GOLD, fontSize: 12, fontWeight: 700, letterSpacing: 2, marginBottom: 28 }}>{SKILLS_DEEP[activeSkillCat].cat.toUpperCase()}</div>
              {SKILLS_DEEP[activeSkillCat].items.map(skill => (
                <SkillBar key={skill.name} name={skill.name} pct={skill.pct} />
              ))}
            </div>
          </AnimSection>
        </div>
      </section>

      {/* ─── ACHIEVEMENTS ─── */}
      <section style={{ background: NAVY, padding: "100px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <AnimSection style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="section-label">// By The Numbers</div>
            <h2 className="section-heading-light">The Work Speaks <span style={{ color: GOLD }}>For Itself</span></h2>
            <div className="gold-divider" style={{ margin: "16px auto 0" }} />
          </AnimSection>
          <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {ACHIEVEMENTS.map((a, i) => (
              <AnimSection key={a.label} delay={i * 0.1}>
                <div className="award-card">
                  <div style={{ fontSize: 32, marginBottom: 12 }}>{a.icon}</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", color: GOLD, fontSize: 36, fontWeight: 900, marginBottom: 4 }}>{a.val}</div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", color: "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: 600, letterSpacing: 1 }}>{a.label.toUpperCase()}</div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PERSONAL / OUTSIDE WORK ─── */}
      <section style={{ background: OFF_WHITE, padding: "100px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <AnimSection>
              <div className="section-label">// Beyond The Screen</div>
              <h2 className="section-heading">The Human <span style={{ color: GOLD }}>Side</span></h2>
              <div className="gold-divider" />
              <p style={{ color: "#555", lineHeight: 1.9, fontSize: 15, marginBottom: 20 }}>
                Outside of building AI systems and websites, I'm a passionate advocate for technology education in Kenya. I mentor young developers through the <strong style={{ color: NAVY }}>NeuroSpark AI Academy</strong> and volunteer with coding bootcamps in Nairobi's informal settlements.
              </p>
              <p style={{ color: "#777", lineHeight: 1.85, fontSize: 14, marginBottom: 28 }}>
                When I'm not at a keyboard, you'll find me on a football pitch, reading about economics and geopolitics, or exploring new restaurants across Nairobi with my family. I believe balance makes better work — a rested mind builds better systems.
              </p>
              <div style={{ display: "flex", gap: 12 }}>
                {["🏈 Football", "📚 Books", "🌆 Nairobi", "🤝 Mentoring"].map(tag => (
                  <span key={tag} style={{ background: `rgba(212,175,55,0.1)`, border: `1px solid ${GOLD}`, color: NAVY, padding: "6px 14px", borderRadius: 20, fontSize: 12, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>{tag}</span>
                ))}
              </div>
            </AnimSection>
            <AnimSection delay={0.2}>
              <div style={{ position: "relative" }}>
                <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 20px 60px rgba(10,31,68,0.15)" }}>
                  <img src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80" alt="Nairobi city" style={{ width: "100%", height: 380, objectFit: "cover" }} />
                </div>
                <div style={{ position: "absolute", bottom: -20, right: -20, background: GOLD, borderRadius: 14, padding: "16px 20px", boxShadow: "0 8px 24px rgba(212,175,55,0.4)" }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", color: NAVY, fontSize: 24, fontWeight: 900 }}>🌍</div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", color: NAVY, fontSize: 11, fontWeight: 700 }}>PROUDLY</div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", color: NAVY, fontSize: 11, fontWeight: 700 }}>KENYAN</div>
                </div>
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section style={{ background: NAVY, padding: "80px 40px", textAlign: "center", backgroundImage: `radial-gradient(ellipse at center, rgba(212,175,55,0.08) 0%, transparent 70%)` }}>
        <AnimSection>
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: "white", fontSize: "clamp(28px,4vw,48px)", fontWeight: 900, marginBottom: 16 }}>
            Let's Build Something<br /><span style={{ color: GOLD }}>Extraordinary Together</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 17, marginBottom: 40, maxWidth: 500, margin: "0 auto 40px" }}>
            Whether you need an AI agent, a stunning website, or to rank #1 on Google — I'm ready.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/#contact"><button className="btn-gold" style={{ fontSize: 16, padding: "16px 40px" }}>Book a Discovery Call →</button></a>
            <a href="/projects"><button className="btn-outline-gold" style={{ fontSize: 16, padding: "16px 40px" }}>View My Work</button></a>
          </div>
        </AnimSection>
      </section>


    </>
  );
}
