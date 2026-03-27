/**
 * LandingSkills.jsx — Tech stack ticker section for the landing page
 * Paul Nyang'wara Portfolio v6.6
 *
 * Extracted from PaulNyangwaraLanding.jsx (ADR-042).
 */
import AnimSection from '../../components/AnimSection';
import { C }       from '../../constants';
import { SKILLS }  from '../../data/landing';

const { navy: NAVY, gold: GOLD } = C;

export default function LandingSkills() {
  return (
    <section id="skills" style={{ background: NAVY, padding: '100px 0' }}>
      <div style={{ textAlign: 'center', marginBottom: 56, padding: '0 40px' }}>
        <AnimSection>
          <div className="section-label">// Tech Stack</div>
          <h2 className="section-heading-light">Technologies We <span style={{ color: GOLD }}>Master</span></h2>
          <div className="gold-divider" style={{ margin: '16px auto 0' }} />
        </AnimSection>
      </div>

      {/* Forward ticker */}
      <div style={{ overflow: 'hidden', padding: '16px 0' }}>
        <div style={{ display: 'flex', animation: 'ticker 30s linear infinite', width: 'max-content' }}>
          {[...SKILLS, ...SKILLS].map((s, i) => (
            <div key={i} className="skill-icon-wrap" style={{ color: 'white' }}>
              <span style={{ fontSize: 32 }}>{s.emoji}</span>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: 600, letterSpacing: 0.5, whiteSpace: 'nowrap' }}>{s.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reverse ticker */}
      <div style={{ overflow: 'hidden', padding: '16px 0' }}>
        <div style={{ display: 'flex', animation: 'ticker 40s linear infinite reverse', width: 'max-content' }}>
          {[...SKILLS.slice(8), ...SKILLS.slice(0, 8), ...SKILLS.slice(8), ...SKILLS.slice(0, 8)].map((s, i) => (
            <div key={i} className="skill-icon-wrap" style={{ color: 'white' }}>
              <span style={{ fontSize: 32 }}>{s.emoji}</span>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: 600, letterSpacing: 0.5, whiteSpace: 'nowrap' }}>{s.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
