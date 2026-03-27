/**
 * LandingProjects.jsx — Projects preview section for the landing page
 * Paul Nyang'wara Portfolio v6.6
 *
 * Extracted from PaulNyangwaraLanding.jsx (ADR-042).
 * Shows 3 featured projects from landing.js data (distinct from the full
 * projects grid on /projects which uses src/data/projects.js).
 */
import AnimSection from '../../components/AnimSection';
import { C }       from '../../constants';
import { PROJECTS } from '../../data/landing';

const { navy: NAVY, gold: GOLD, offWhite: OFF_WHITE } = C;

export default function LandingProjects() {
  return (
    <section id="projects" style={{ background: OFF_WHITE, padding: '100px 40px' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <AnimSection style={{ textAlign: 'center', marginBottom: 60 }}>
          <div className="section-label">// Our Work</div>
          <h2 className="section-heading">Projects That<br /><span style={{ color: GOLD }}>Speak for Themselves</span></h2>
          <div className="gold-divider" style={{ margin: '16px auto 0' }} />
        </AnimSection>

        <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          {PROJECTS.map((p, i) => (
            <AnimSection key={p.title} delay={i * 0.1}>
              <div className="project-card">
                <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
                  <img src={p.img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div className="project-overlay">
                    <button className="btn-gold"    style={{ padding: '9px 18px', fontSize: 12 }}>View Live</button>
                    <button className="btn-outline" style={{ padding: '8px 18px', fontSize: 12, borderColor: 'white', color: 'white' }}>Case Study</button>
                  </div>
                </div>
                <div style={{ padding: '20px 20px 24px' }}>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", color: NAVY, fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{p.title}</h3>
                  <p style={{ color: '#666', fontSize: 13, lineHeight: 1.6, marginBottom: 12 }}>{p.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {p.tags.map(t => (
                      <span key={t} style={{ background: NAVY, color: GOLD, padding: '2px 10px', borderRadius: 20, fontSize: 10, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </AnimSection>
          ))}
        </div>
      </div>
    </section>
  );
}
