import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useState, useEffect, useRef } from "react";

import { NAVY, GOLD, GOLD_LIGHT, OFF_WHITE, CHARCOAL } from '../constants'; // ADR-029

const styles = `

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'DM Sans', sans-serif; background: ${OFF_WHITE}; color: ${CHARCOAL}; overflow-x: hidden; }
; }
; border-radius: 3px; }
to { opacity: 1; transform: translateY(0); } }
to { opacity: 1; } }
50% { box-shadow: 0 0 0 14px rgba(212,175,55,0); } }
  @keyframes wa-pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.08); } }
100% { background-position: 600px 0; }
  }

  .nav-link { color: rgba(255,255,255,0.85); text-decoration: none; font-family: 'Space Grotesk', sans-serif; font-size: 14px; font-weight: 500; letter-spacing: 0.5px; position: relative; padding-bottom: 4px; transition: color 0.3s; }
  .nav-link::after { content: ''; position: absolute; left: 0; bottom: 0; width: 0; height: 2px; background: ${GOLD}; transition: width 0.3s; }
  .nav-link:hover { color: ${GOLD}; }
  .nav-link:hover::after { width: 100%; }
  .nav-link.active { color: ${GOLD}; }
  .nav-link.active::after { width: 100%; }
; color: ${NAVY}; border: none; padding: 14px 32px; border-radius: 8px; font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 15px; cursor: pointer; transition: all 0.3s; letter-spacing: 0.5px; }
; transform: translateY(-3px); box-shadow: 0 12px 30px rgba(212,175,55,0.4); }
; border: 2px solid ${GOLD}; padding: 13px 32px; border-radius: 8px; font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 15px; cursor: pointer; transition: all 0.3s; letter-spacing: 0.5px; }
; color: ${NAVY}; transform: translateY(-3px); }
  .btn-sm { padding: 8px 20px; font-size: 12px; border-radius: 6px; }
; font-size: 13px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 12px; }
  .section-heading { font-family: 'Playfair Display', serif; font-size: clamp(32px, 4vw, 52px); font-weight: 900; color: ${NAVY}; line-height: 1.15; }
  .section-heading-light { font-family: 'Playfair Display', serif; font-size: clamp(32px, 4vw, 52px); font-weight: 900; color: white; line-height: 1.15; }
, ${GOLD_LIGHT}); border-radius: 2px; margin: 16px 0 24px; }
; }
; color: ${GOLD}; border-color: ${NAVY}; }
; color: ${GOLD}; }

  .project-card {
    background: white; border-radius: 20px; overflow: hidden;
    border: 1px solid rgba(10,31,68,0.08);
    transition: all 0.4s cubic-bezier(0.25,0.8,0.25,1);
    cursor: pointer;
  }
  .project-card:hover { transform: translateY(-12px); box-shadow: 0 28px 60px rgba(212,175,55,0.2), 0 8px 20px rgba(10,31,68,0.1); border-color: ${GOLD}; }
  .project-card:hover .project-overlay { opacity: 1; }
  .project-overlay { position: absolute; inset: 0; background: rgba(10,31,68,0.82); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; opacity: 0; transition: opacity 0.3s; }

  .stat-number { font-family: 'Playfair Display', serif; font-size: 36px; font-weight: 900; color: ${GOLD}; }
  .stat-label { font-family: 'Space Grotesk', sans-serif; font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.6); letter-spacing: 1px; }

  .case-study-panel {
    position: fixed; top: 0; right: 0; bottom: 0; width: min(620px, 100vw);
    background: white; z-index: 500; overflow-y: auto;
    box-shadow: -20px 0 80px rgba(10,31,68,0.25);
    transform: translateX(100%); transition: transform 0.45s cubic-bezier(0.25,0.8,0.25,1);
  }
  .case-study-panel.open { transform: translateX(0); }
  .case-study-overlay { position: fixed; inset: 0; background: rgba(10,31,68,0.5); z-index: 499; opacity: 0; pointer-events: none; transition: opacity 0.4s; }
  .case-study-overlay.open { opacity: 1; pointer-events: auto; }

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


import { PROJECTS, CATEGORIES } from '../data/projects';
import AnimSection from '../components/AnimSection';
import { useInView } from '../hooks/useInView';



function CaseStudyPanel({ project, onClose }) {
  const isOpen = !!project;
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <div className={`case-study-overlay${isOpen ? " open" : ""}`} onClick={onClose} />
      <div className={`case-study-panel${isOpen ? " open" : ""}`}>
        {project && (
          <div>
            {/* Header image */}
            <div style={{ height: 280, overflow: "hidden", position: "relative" }}>
              <img src={project.img} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(10,31,68,0.85) 100%)" }} />
              <button onClick={onClose} style={{
                position: "absolute", top: 20, right: 20,
                width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.3)",
                color: "white", fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              }}>✕</button>
              <div style={{ position: "absolute", bottom: 24, left: 28 }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", color: GOLD, fontSize: 11, fontWeight: 600, letterSpacing: 2, marginBottom: 6 }}>{project.category.toUpperCase()} · {project.year}</div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", color: "white", fontSize: 26, fontWeight: 900, lineHeight: 1.2 }}>{project.title}</h2>
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: "36px 32px" }}>
              {/* Client info */}
              <div style={{ display: "flex", gap: 20, marginBottom: 32, flexWrap: "wrap" }}>
                {[["Client", project.client], ["Industry", project.industry], ["Year", project.year]].map(([k, v]) => (
                  <div key={k} style={{ background: "#f5f5f5", borderRadius: 10, padding: "10px 18px" }}>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, fontWeight: 600, color: "#999", letterSpacing: 1, marginBottom: 2 }}>{k.toUpperCase()}</div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600, color: NAVY }}>{v}</div>
                  </div>
                ))}
              </div>

              {/* Results */}
              <div style={{ background: NAVY, borderRadius: 16, padding: "28px 24px", marginBottom: 32 }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", color: GOLD, fontSize: 11, fontWeight: 600, letterSpacing: 2, marginBottom: 20 }}>KEY RESULTS</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }}>
                  {project.results.map(r => (
                    <div key={r.label}>
                      <div className="stat-number">{r.val}</div>
                      <div className="stat-label">{r.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Challenge / Solution / Outcome */}
              {[
                { title: "The Challenge", icon: "🎯", content: project.challenge },
                { title: "Our Solution", icon: "💡", content: project.solution },
                { title: "The Outcome", icon: "🚀", content: project.outcome },
              ].map(({ title, icon, content }) => (
                <div key={title} style={{ marginBottom: 28 }}>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", color: NAVY, fontSize: 16, fontWeight: 700, marginBottom: 10, display: "flex", gap: 8, alignItems: "center" }}>
                    <span>{icon}</span>{title}
                  </h3>
                  <p style={{ color: "#555", lineHeight: 1.85, fontSize: 14 }}>{content}</p>
                </div>
              ))}

              {/* Tech stack */}
              <div style={{ marginBottom: 28 }}>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", color: NAVY, fontSize: 16, fontWeight: 700, marginBottom: 16, display: "flex", gap: 8, alignItems: "center" }}>
                  <span>🛠️</span>Tech Stack
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {project.techStack.map(t => (
                    <div key={t.name} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ background: `rgba(212,175,55,0.12)`, color: NAVY, border: `1px solid ${GOLD}`, padding: "4px 12px", borderRadius: 20, fontSize: 11, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, flexShrink: 0 }}>{t.name}</span>
                      <span style={{ color: "#888", fontSize: 13 }}>{t.role}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonial */}
              <div style={{ background: "#f9f8f4", border: `1px solid rgba(212,175,55,0.25)`, borderRadius: 16, padding: "24px 24px", marginBottom: 32 }}>
                <div style={{ color: GOLD, fontSize: 36, lineHeight: 1, marginBottom: 12 }}>"</div>
                <p style={{ fontStyle: "italic", color: "#444", lineHeight: 1.8, fontSize: 15, marginBottom: 16 }}>{project.testimonial.quote}</p>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: NAVY, fontSize: 14 }}>{project.testimonial.name}</div>
                <div style={{ color: GOLD, fontSize: 12, fontWeight: 500 }}>{project.testimonial.role}</div>
              </div>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
                {project.tags.map(t => (
                  <span key={t} style={{ background: NAVY, color: GOLD, padding: "4px 14px", borderRadius: 20, fontSize: 11, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>{t}</span>
                ))}
              </div>

              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ display: "block", marginBottom: 12 }}>
                  <button className="btn-outline-gold" style={{ width: "100%", padding: "14px", fontSize: 14 }}>
                    View Live on NeuroSpark →
                  </button>
                </a>
              )}
              <a href="/#contact">
                <button className="btn-gold" style={{ width: "100%", padding: "16px", fontSize: 15 }}>
                  Start a Similar Project →
                </button>
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default function ProjectsPage() {
  useDocumentMeta({
    title:       "Projects & Case Studies",
    description: "Real client results: AI agents, compliance platforms, e-commerce builds, and SEO campaigns for East African businesses.",
    canonical:   "/projects",
  });
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  return (
    <>
      <style>{styles}</style>



      {/* ─── HERO ─── */}
      <section style={{
        background: NAVY, paddingTop: 140, paddingBottom: 80, textAlign: "center",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `radial-gradient(ellipse at 20% 50%, rgba(212,175,55,0.07) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(212,175,55,0.05) 0%, transparent 60%)`,
        }} />
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `linear-gradient(rgba(212,175,55,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.03) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto", padding: "0 40px", animation: "fadeInUp 0.8s ease both" }}>
          <div className="section-label" style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>// Portfolio</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 900, color: "white", lineHeight: 1.1, marginBottom: 20 }}>
            Projects That<br /><span style={{ color: GOLD }}>Speak for Themselves</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 17, lineHeight: 1.8, maxWidth: 540, margin: "0 auto 48px" }}>
            Real problems. Measurable outcomes. Every project here represents a business transformed through intelligent technology.
          </p>

          {/* Aggregate stats */}
          <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
            {[["6+", "Projects Shown"], ["50+", "Total Delivered"], ["100%", "Client Retention"], ["5★", "Avg Rating"]].map(([val, lab]) => (
              <div key={lab} style={{ textAlign: "center", padding: "16px 24px", background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)", borderRadius: 12 }}>
                <div style={{ fontFamily: "'Playfair Display', serif", color: GOLD, fontSize: 28, fontWeight: 900 }}>{val}</div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", color: "rgba(255,255,255,0.6)", fontSize: 11, fontWeight: 600, letterSpacing: 1 }}>{lab}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FILTER BAR ─── */}
      <div style={{
        position: "sticky", top: 72, zIndex: 90, background: "rgba(249,248,244,0.97)",
        backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(10,31,68,0.08)",
        padding: "16px 40px", display: "flex", gap: 10, flexWrap: "wrap",
      }}>
        {CATEGORIES.map(cat => (
          <button key={cat} className={`filter-btn${filter === cat ? " active" : ""}`} onClick={() => setFilter(cat)}>
            {cat}
          </button>
        ))}
        <div style={{ marginLeft: "auto", fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: "#888", display: "flex", alignItems: "center" }}>
          {filtered.length} {filtered.length === 1 ? "project" : "projects"}
        </div>
      </div>

      {/* ─── FEATURED PROJECTS ─── */}
      {filter === "All" && (
        <section style={{ background: OFF_WHITE, padding: "80px 40px 40px" }}>
          <div style={{ maxWidth: 1160, margin: "0 auto" }}>
            <AnimSection style={{ marginBottom: 40 }}>
              <div className="section-label">// Featured Work</div>
              <h2 className="section-heading">Flagship <span style={{ color: GOLD }}>Case Studies</span></h2>
              <div className="gold-divider" />
            </AnimSection>

            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              {PROJECTS.filter(p => p.featured).map((project, i) => (
                <AnimSection key={project.id} delay={i * 0.1}>
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: i % 2 === 0 ? "1fr 1fr" : "1fr 1fr",
                    gap: 0, borderRadius: 20, overflow: "hidden",
                    border: "1px solid rgba(10,31,68,0.08)",
                    transition: "box-shadow 0.4s",
                    cursor: "pointer",
                  }}
                    className="project-card"
                    onClick={() => setSelectedProject(project)}
                  >
                    {/* Image */}
                    <div style={{ order: i % 2 === 0 ? 0 : 1, height: 320, overflow: "hidden", position: "relative" }}>
                      <img src={project.img} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s" }}
                        onMouseEnter={e => e.target.style.transform = "scale(1.06)"}
                        onMouseLeave={e => e.target.style.transform = "scale(1)"} />
                      <div className="project-overlay">
                        <div style={{ color: GOLD, fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600, letterSpacing: 1 }}>CLICK TO READ CASE STUDY</div>
                        <div style={{ color: "white", fontSize: 28 }}>→</div>
                      </div>
                    </div>
                    {/* Content */}
                    <div style={{ order: i % 2 === 0 ? 1 : 0, padding: "40px 36px", background: "white", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
                        <span style={{ background: `rgba(212,175,55,0.12)`, color: NAVY, border: `1px solid ${GOLD}`, padding: "3px 12px", borderRadius: 20, fontSize: 11, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>{project.category}</span>
                        <span style={{ background: `rgba(10,31,68,0.06)`, color: "#777", padding: "3px 12px", borderRadius: 20, fontSize: 11, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>{project.industry}</span>
                        {project.metric && (
                          <span style={{ background: GOLD, color: NAVY, padding: "3px 12px", borderRadius: 20, fontSize: 11, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, letterSpacing: 0.3 }}>
                            ★ {project.metric.val} {project.metric.label}
                          </span>
                        )}
                      </div>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", color: NAVY, fontSize: 26, fontWeight: 900, marginBottom: 12, lineHeight: 1.2 }}>{project.title}</h3>
                      <p style={{ color: "#666", fontSize: 14, lineHeight: 1.8, marginBottom: 24 }}>{project.shortDesc}</p>
                      {/* Mini results */}
                      <div style={{ display: "flex", gap: 20, marginBottom: 24, flexWrap: "wrap" }}>
                        {project.results.slice(0, 3).map(r => (
                          <div key={r.label}>
                            <div style={{ fontFamily: "'Playfair Display', serif", color: GOLD, fontSize: 22, fontWeight: 900 }}>{r.val}</div>
                            <div style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#888", fontSize: 10, fontWeight: 600, letterSpacing: 0.5 }}>{r.label}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
                        {project.tags.slice(0, 4).map(t => (
                          <span key={t} style={{ background: NAVY, color: GOLD, padding: "3px 10px", borderRadius: 20, fontSize: 10, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>{t}</span>
                        ))}
                      </div>
                      <button className="btn-gold" style={{ alignSelf: "flex-start", padding: "10px 24px", fontSize: 13 }}>
                        Read Case Study →
                      </button>
                    </div>
                  </div>
                </AnimSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── ALL PROJECTS GRID ─── */}
      <section style={{ background: filter === "All" ? NAVY : OFF_WHITE, padding: "80px 40px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          {filter === "All" && (
            <AnimSection style={{ textAlign: "center", marginBottom: 56 }}>
              <div className="section-label">// All Projects</div>
              <h2 className="section-heading-light">More <span style={{ color: GOLD }}>Work</span></h2>
              <div className="gold-divider" style={{ margin: "16px auto 0" }} />
            </AnimSection>
          )}

          <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28 }}>
            {(filter === "All" ? PROJECTS.filter(p => !p.featured) : filtered).map((project, i) => (
              <AnimSection key={project.id} delay={i * 0.1}>
                <div className="project-card" onClick={() => setSelectedProject(project)}>
                  <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
                    <img src={project.img} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}
                      onMouseEnter={e => e.target.style.transform = "scale(1.1)"}
                      onMouseLeave={e => e.target.style.transform = "scale(1)"} />
                    <div className="project-overlay">
                      <div style={{ color: GOLD, fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: 1 }}>VIEW CASE STUDY</div>
                      <div style={{ color: "white", fontSize: 24 }}>→</div>
                    </div>
                    <div style={{ position: "absolute", top: 14, left: 14 }}>
                      <span style={{ background: "rgba(10,31,68,0.85)", color: GOLD, padding: "4px 12px", borderRadius: 20, fontSize: 10, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, backdropFilter: "blur(8px)" }}>{project.category}</span>
                    </div>
                    {project.metric && (
                      <div style={{ position: "absolute", bottom: 12, left: 14 }}>
                        <span style={{ background: GOLD, color: NAVY, padding: "4px 12px", borderRadius: 20, fontSize: 11, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, letterSpacing: 0.3 }}>
                          {project.metric.val} {project.metric.label}
                        </span>
                      </div>
                    )}
                  </div>
                  <div style={{ padding: "22px 22px 26px", background: filter !== "All" ? "white" : "#0d2450" }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", color: filter !== "All" ? NAVY : "white", fontSize: 19, fontWeight: 700, marginBottom: 8, lineHeight: 1.3 }}>{project.title}</h3>
                    <p style={{ color: filter !== "All" ? "#666" : "rgba(255,255,255,0.65)", fontSize: 13, lineHeight: 1.65, marginBottom: 14 }}>{project.shortDesc}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
                      {project.tags.slice(0, 3).map(t => (
                        <span key={t} style={{ background: "rgba(212,175,55,0.15)", color: filter !== "All" ? NAVY : "rgba(255,255,255,0.85)", padding: "2px 10px", borderRadius: 20, fontSize: 10, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, border: `1px solid ${GOLD}` }}>{t}</span>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: 12 }}>
                      {project.results.slice(0, 2).map(r => (
                        <div key={r.label}>
                          <div style={{ fontFamily: "'Playfair Display', serif", color: GOLD, fontSize: 18, fontWeight: 900 }}>{r.val}</div>
                          <div style={{ fontFamily: "'Space Grotesk', sans-serif", color: filter !== "All" ? "#888" : "rgba(255,255,255,0.5)", fontSize: 9, fontWeight: 600, letterSpacing: 0.5 }}>{r.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA STRIP ─── */}
      <section style={{
        background: OFF_WHITE, padding: "80px 40px", textAlign: "center",
        borderTop: "1px solid rgba(10,31,68,0.08)",
      }}>
        <AnimSection>
          <div className="section-label" style={{ display: "flex", justifyContent: "center" }}>// Next Steps</div>
          <h2 className="section-heading" style={{ marginBottom: 16 }}>
            Ready to Be My<br /><span style={{ color: GOLD }}>Next Success Story?</span>
          </h2>
          <p style={{ color: "#666", fontSize: 17, marginBottom: 40, maxWidth: 500, margin: "0 auto 40px" }}>
            Let's talk about your business challenges. I'll tell you exactly what's possible and what it takes to get there.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/#contact"><button className="btn-gold" style={{ fontSize: 16, padding: "16px 40px" }}>Start a Project →</button></a>
            <a href="/services"><button className="btn-outline-gold" style={{ fontSize: 16, padding: "16px 40px", color: NAVY, borderColor: NAVY }}>Explore Services</button></a>
          </div>
        </AnimSection>
      </section>


      {/* ─── CASE STUDY PANEL ─── */}
      <CaseStudyPanel project={selectedProject} onClose={() => setSelectedProject(null)} />

    </>
  );
}
