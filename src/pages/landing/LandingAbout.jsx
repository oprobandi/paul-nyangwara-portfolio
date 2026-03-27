/**
 * LandingAbout.jsx — About section for the landing page
 * Paul Nyang'wara Portfolio v6.6
 *
 * Extracted from PaulNyangwaraLanding.jsx (ADR-042).
 */
import AnimSection from '../../components/AnimSection';
import SkillBar    from '../../components/SkillBar';
import { C }       from '../../constants';
import { SKILLS_BARS } from '../../data/landing';

const { navy: NAVY, gold: GOLD, offWhite: OFF_WHITE } = C;

export default function LandingAbout() {
  return (
    <section id="about" style={{ background: OFF_WHITE, padding: '100px 40px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 64, alignItems: 'center' }}>

          <AnimSection>
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: 280, height: 280, borderRadius: '50%', border: `4px solid ${GOLD}`, overflow: 'hidden', boxShadow: `0 0 0 8px rgba(212,175,55,0.15), 0 20px 60px rgba(10,31,68,0.2)`, animation: 'float 6s ease-in-out infinite' }}>
                <img src="/paul-headshot.jpg" alt="Paul Nyang'wara" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ marginTop: 20, background: NAVY, color: 'white', padding: '8px 20px', borderRadius: 20, fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, border: `1px solid ${GOLD}` }}>
                🇰🇪 Nairobi, Kenya
              </div>
              <div className="stats-row" style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
                {[['50+', 'Clients'], ['3', 'Services'], ['100%', 'Kenya-Focused']].map(([val, lab]) => (
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
            <p style={{ fontSize: 16, lineHeight: 1.8, color: '#444', marginBottom: 32 }}>
              Paul Nyang'wara is the visionary Founder and CEO of <strong style={{ color: NAVY }}>NeuroSpark Corporation</strong> — a cutting-edge technology company headquartered in Kenya. With a passion for leveraging artificial intelligence to solve real-world problems for African businesses, Paul leads a team dedicated to building smart AI agents, automation pipelines, SEO strategies, and professional digital experiences that drive measurable growth for SMEs.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {SKILLS_BARS.map(({ label, pct }) => <SkillBar key={label} label={label} pct={pct} />)}
            </div>
          </AnimSection>

        </div>
      </div>
    </section>
  );
}
