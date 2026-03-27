/**
 * useCountUp.js — Count-up animation hook (ported from NeuroSpark v3.0)
 * Paul Nyang'wara Portfolio v6.2
 *
 * Animates a number from 0 to `target` only when the element enters the viewport.
 * Respects prefers-reduced-motion — skips animation and shows final value immediately.
 *
 * Usage:
 *   const [ref, display] = useCountUp(95);           // → "95"
 *   const [ref, display] = useCountUp(4.9, 1);       // → "4.9"  (1 decimal)
 *   const [ref, display] = useCountUp(150, 0, '+');  // → "150+"
 */
import { useRef, useState, useEffect } from 'react';

export function useCountUp(target, decimals = 0, suffix = '') {
  const ref      = useRef(null);
  const [val, setVal] = useState(0);
  const started  = useRef(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { setVal(target); return; }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;

        const duration = 1400;
        const start    = performance.now();

        const tick = (now) => {
          const elapsed  = now - start;
          const progress = Math.min(elapsed / duration, 1);
          // ease-out cubic
          const eased    = 1 - Math.pow(1 - progress, 3);
          setVal(parseFloat((eased * target).toFixed(decimals)));
          if (progress < 1) requestAnimationFrame(tick);
          else setVal(target);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.3 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, decimals]);

  const display = `${val.toFixed(decimals)}${suffix}`;
  return [ref, display];
}
