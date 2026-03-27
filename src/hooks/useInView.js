/**
 * useInView.js — IntersectionObserver hook
 * Paul Nyang'wara Portfolio v6.2
 *
 * Returns [ref, inView]. Fires once when the element enters the viewport.
 * Used by AnimSection and useCountUp.
 */
import { useRef, useState, useEffect } from 'react';

export function useInView(threshold = 0.1) {
  const ref    = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
}
