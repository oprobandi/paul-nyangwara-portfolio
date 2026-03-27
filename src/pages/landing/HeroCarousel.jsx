/**
 * HeroCarousel.jsx — Hero carousel section
 * Paul Nyang'wara Portfolio v6.6
 *
 * Extracted from PaulNyangwaraLanding.jsx (ADR-042).
 * Depends on carousel CSS classes injected by PaulNyangwaraLanding's <style> block.
 * Slide data imported from src/data/landing.js.
 */
import { useState, useEffect, useRef, useCallback } from 'react';
import { C } from '../../constants';
import { SLIDES } from '../../data/landing';

const { gold: GOLD, navy: NAVY } = C;

const AUTOPLAY_MS = 5000;

/* ── Local icons (only used here) ───────────────────────────────── */
const IconPlay  = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>;
const IconPause = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>;

export default function HeroCarousel() {
  const [current, setCurrent]   = useState(0);
  const [playing, setPlaying]   = useState(true);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused]     = useState(false);
  const rafRef     = useRef(null);
  const startRef   = useRef(null);
  const elapsedRef = useRef(0);
  const pausedRef  = useRef(false);
  const playingRef = useRef(true);

  useEffect(() => { pausedRef.current  = paused;   }, [paused]);
  useEffect(() => { playingRef.current = playing;  }, [playing]);

  const goTo = useCallback((idx) => {
    setCurrent((idx + SLIDES.length) % SLIDES.length);
    elapsedRef.current = 0;
    setProgress(0);
    startRef.current = null;
  }, []);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  /* rAF-based progress ticker */
  useEffect(() => {
    cancelAnimationFrame(rafRef.current);

    const tick = (timestamp) => {
      if (!playingRef.current || pausedRef.current) {
        if (startRef.current !== null) {
          elapsedRef.current += timestamp - startRef.current;
          startRef.current = null;
        }
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      if (startRef.current === null) startRef.current = timestamp;
      const total = elapsedRef.current + (timestamp - startRef.current);
      const pct   = Math.min((total / AUTOPLAY_MS) * 100, 100);
      setProgress(pct);

      if (total >= AUTOPLAY_MS) {
        setCurrent(c => (c + 1) % SLIDES.length);
        elapsedRef.current = 0;
        startRef.current   = null;
        setProgress(0);
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [current]);

  /* Keyboard nav */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight')      next();
      else if (e.key === 'ArrowLeft')  prev();
      else if (e.key === ' ') { e.preventDefault(); setPlaying(p => !p); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  return (
    <section
      id="home"
      className="carousel-wrap"
      aria-label="Service highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* aria-live region — WCAG 2.1 AA */}
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}
      >
        {SLIDES[current]?.heading} {SLIDES[current]?.accent}
      </div>

      {/* Slide layers */}
      {SLIDES.map((slide, i) => {
        const isActive = i === current;
        return (
          <div
            key={slide.id}
            className={`carousel-slide${isActive ? ' active' : ''}`}
            style={{ opacity: isActive ? 1 : 0, zIndex: isActive ? 1 : 0 }}
          >
            <div className={`carousel-bg${isActive ? ' zoomed' : ''}`} style={{ backgroundImage: `url(${slide.bg})` }} />
            <div className="carousel-overlay" />

            {isActive && (
              <div className="carousel-body">
                <div className="glass-card" key={`card-${i}`}>
                  {/* Badge */}
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(212,175,55,0.15)', border: `1px solid ${GOLD}`, borderRadius: 20, padding: '6px 16px', marginBottom: 22 }}>
                    <span style={{ fontSize: 13 }}>⚡</span>
                    <span style={{ color: GOLD, fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 2 }}>
                      {slide.label}
                    </span>
                  </div>

                  {/* Heading */}
                  <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px,4.5vw,54px)', fontWeight: 900, color: 'white', lineHeight: 1.15, marginBottom: 18 }}>
                    {slide.heading}<br />
                    <span style={{ color: GOLD }}>{slide.accent}</span>
                  </h1>

                  {/* Sub — SEC-02: structured array, no dangerouslySetInnerHTML (ADR-035) */}
                  <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 'clamp(13px,1.7vw,17px)', lineHeight: 1.78, marginBottom: 34, fontWeight: 300, maxWidth: 580 }}>
                    {Array.isArray(slide.sub)
                      ? slide.sub.map((part, j) =>
                          typeof part === 'string'
                            ? part
                            : <span key={j} style={{ color: GOLD, fontWeight: 600 }}>{part.accent}</span>
                        )
                      : slide.sub}
                  </p>

                  {/* Trust pill — slide 1 only */}
                  {i === 0 && (
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.35)', borderRadius: 999, padding: '6px 16px', marginBottom: 20, fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: GOLD, fontWeight: 600 }}>
                      ✓ Trusted by 150+ East African businesses
                    </div>
                  )}

                  {/* CTAs */}
                  <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
                    {slide.ctas.map(cta => (
                      <a key={cta.label} href={cta.href} style={{ textDecoration: 'none' }}>
                        <button className={cta.variant === 'gold' ? 'btn-gold' : 'btn-outline'}>{cta.label}</button>
                      </a>
                    ))}
                    {i === 0 && (
                      <a href="/projects" style={{ textDecoration: 'none' }}>
                        <button className="btn-outline" style={{ borderColor: 'rgba(255,255,255,0.35)', color: 'rgba(255,255,255,0.85)' }}>
                          See My Work →
                        </button>
                      </a>
                    )}
                  </div>

                  {/* Slide counter */}
                  <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", color: GOLD, fontSize: 14, fontWeight: 700 }}>
                      {String(current + 1).padStart(2, '0')}
                    </span>
                    <div style={{ width: 56, height: 1, background: 'rgba(212,175,55,0.35)' }} />
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'rgba(255,255,255,0.38)', fontSize: 14 }}>
                      {String(SLIDES.length).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Arrows */}
      <button className="c-arrow left"  onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous slide">‹</button>
      <button className="c-arrow right" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next slide">›</button>

      {/* Dots */}
      <div className="c-dots">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`c-dot${i === current ? ' on' : ''}`}
            style={{ width: i === current ? 28 : 8 }}
            onClick={(e) => { e.stopPropagation(); goTo(i); }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Play / Pause */}
      <button className="c-pp" onClick={(e) => { e.stopPropagation(); setPlaying(p => !p); }} title={playing ? 'Pause (Space)' : 'Play (Space)'} aria-label={playing ? 'Pause autoplay' : 'Resume autoplay'}>
        {playing && !paused ? <IconPause /> : <IconPlay />}
      </button>

      {/* Progress bar */}
      <div className="c-progress" style={{ width: `${progress}%` }} />

      {/* Scroll hint */}
      <div
        style={{ position: 'absolute', bottom: 28, left: '50%', animation: 'bounce-arrow 2s infinite', cursor: 'pointer', zIndex: 10 }}
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        aria-label="Scroll to About"
      >
        <div style={{ color: GOLD, fontSize: 26, filter: 'drop-shadow(0 0 8px rgba(212,175,55,0.8))' }}>↓</div>
      </div>
    </section>
  );
}
