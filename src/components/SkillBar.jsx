/**
 * SkillBar.jsx — Animated skill progress bar
 * Paul Nyang'wara Portfolio v6.6
 *
 * Extracted from PaulNyangwaraLanding.jsx (ADR-042).
 * Props: label (string), pct (number 0–100)
 *
 * Depends on .skill-bar-track / .skill-bar-fill CSS classes defined in
 * src/index.css, and on the page-level <style> block in
 * PaulNyangwaraLanding.jsx for colour values.
 */
import { useCountUp } from '../hooks/useCountUp';
import { useInView }  from '../hooks/useInView';
import { C }          from '../constants';

export default function SkillBar({ label, pct }) {
  const [countRef, display] = useCountUp(pct);
  const [barRef,   inView]  = useInView();

  return (
    <div ref={barRef} style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: C.navy }}>
          {label}
        </span>
        <span ref={countRef} style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700, color: C.gold }}>
          {display}%
        </span>
      </div>
      <div className="skill-bar-track">
        <div
          className="skill-bar-fill"
          style={{ width: inView ? `${pct}%` : '0%', transition: 'width 1.4s cubic-bezier(0.25,0.8,0.25,1)' }}
        />
      </div>
    </div>
  );
}
