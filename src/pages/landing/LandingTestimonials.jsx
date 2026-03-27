/**
 * LandingTestimonials.jsx — Client testimonials section for the landing page
 * Paul Nyang'wara Portfolio v6.6
 *
 * Extracted from PaulNyangwaraLanding.jsx (ADR-042).
 */
import { useState, useEffect } from 'react';
import AnimSection              from '../../components/AnimSection';
import { C }                   from '../../constants';
import { TESTIMONIALS }        from '../../data/landing';

const { navy: NAVY, gold: GOLD, offWhite: OFF_WHITE } = C;

export default function LandingTestimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive(t => (t + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="testimonials" style={{ background: OFF_WHITE, padding: '100px 40px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <AnimSection style={{ textAlign: 'center', marginBottom: 60 }}>
          <div className="section-label">// Client Love</div>
          <h2 className="section-heading">What Our Clients <span style={{ color: GOLD }}>Say</span></h2>
          <div className="gold-divider" style={{ margin: '16px auto 0' }} />
        </AnimSection>

        <AnimSection delay={0.2}>
          <div className="testimonial-card">
            <div style={{ marginBottom: 16, animation: 'starGlow 3s ease-in-out infinite' }}>
              {'★★★★★'.split('').map((s, i) => <span key={i} style={{ color: GOLD, fontSize: 20 }}>{s}</span>)}
            </div>
            <p style={{ fontSize: 'clamp(15px,2vw,18px)', lineHeight: 1.8, color: '#444', fontStyle: 'italic', marginBottom: 28 }}>
              "{TESTIMONIALS[active].quote}"
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <img
                src={TESTIMONIALS[active].avatar}
                alt={TESTIMONIALS[active].name}
                style={{ width: 52, height: 52, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${GOLD}` }}
              />
              <div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: NAVY, fontSize: 16 }}>{TESTIMONIALS[active].name}</div>
                <div style={{ color: GOLD, fontSize: 13, fontWeight: 500 }}>{TESTIMONIALS[active].company}</div>
              </div>
            </div>
          </div>

          {/* Dot nav */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 28 }}>
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{ width: i === active ? 28 : 10, height: 10, borderRadius: 5, background: i === active ? GOLD : 'rgba(10,31,68,0.2)', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }}
              />
            ))}
          </div>

          {/* Arrow nav */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 16 }}>
            {['←', '→'].map((arrow, di) => (
              <button
                key={arrow}
                onClick={() => setActive(t => (t + (di ? 1 : -1) + TESTIMONIALS.length) % TESTIMONIALS.length)}
                style={{ width: 42, height: 42, borderRadius: '50%', background: 'transparent', border: `2px solid ${GOLD}`, color: GOLD, fontSize: 18, cursor: 'pointer', transition: 'all 0.3s' }}
                onMouseEnter={e => { e.target.style.background = GOLD;          e.target.style.color = NAVY; }}
                onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = GOLD; }}
              >
                {arrow}
              </button>
            ))}
          </div>
        </AnimSection>
      </div>
    </section>
  );
}
