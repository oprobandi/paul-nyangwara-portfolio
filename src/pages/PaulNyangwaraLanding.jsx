/**
 * PaulNyangwaraLanding.jsx — Landing page composition shell
 * Paul Nyang'wara Portfolio v6.6
 *
 * v6.6 (ADR-042): Refactored from a monolithic 867-line file into a
 * composition shell. Section logic now lives in src/pages/landing/:
 *   HeroCarousel.jsx, LandingAbout.jsx, LandingProjects.jsx,
 *   LandingSkills.jsx, LandingTestimonials.jsx, LandingContact.jsx
 *
 * This file owns the global <style> block for page-specific CSS classes
 * (.carousel-wrap, .glass-card, .project-card, etc.) that sub-components
 * rely on. Keeping styles here injects them once at the page root.
 *
 * v6.6 (ADR-029 partial): Local NAVY/GOLD constants replaced with
 * imports from src/constants.js.
 */

import { useEffect }             from 'react';
import { useLocation }           from 'react-router-dom';
import { useDocumentMeta }       from '../hooks/useDocumentMeta';
import { C }                     from '../constants';

import HeroCarousel        from './landing/HeroCarousel';
import LandingAbout        from './landing/LandingAbout';
import LandingProjects     from './landing/LandingProjects';
import LandingSkills       from './landing/LandingSkills';
import LandingTestimonials from './landing/LandingTestimonials';
import LandingContact      from './landing/LandingContact';

const { navy: NAVY, gold: GOLD, goldLight: GOLD_LIGHT, offWhite: OFF_WHITE, charcoal: CHARCOAL } = C;

const styles = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'DM Sans', sans-serif; background: ${OFF_WHITE}; color: ${CHARCOAL}; overflow-x: hidden; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: ${NAVY}; }
  ::-webkit-scrollbar-thumb { background: ${GOLD}; border-radius: 3px; }

  @keyframes bounce-arrow { 0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(-10px)} }
  @keyframes float { 0%,100%{transform:translateY(0px) rotate(0deg)}33%{transform:translateY(-20px) rotate(1deg)}66%{transform:translateY(-10px) rotate(-1deg)} }
  @keyframes ticker { 0%{transform:translateX(0)}100%{transform:translateX(-50%)} }
  @keyframes fadeInUp { from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn { from{opacity:0}to{opacity:1} }
  @keyframes starGlow { 0%,100%{text-shadow:0 0 4px ${GOLD}}50%{text-shadow:0 0 12px ${GOLD_LIGHT}} }
  @keyframes slideUp { from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)} }

  .carousel-wrap { position:relative; height:100vh; min-height:700px; overflow:hidden; }
  .carousel-slide { position:absolute; inset:0; transition:opacity 0.85s ease; pointer-events:none; }
  .carousel-slide.active { pointer-events:auto; }
  .carousel-bg { position:absolute; inset:0; background-size:cover; background-position:center; transition:transform 8s ease-out; transform:scale(1.04); }
  .carousel-bg.zoomed { transform:scale(1.1); }
  .carousel-overlay { position:absolute; inset:0; background:linear-gradient(135deg,rgba(10,31,68,0.78) 0%,rgba(10,31,68,0.48) 55%,rgba(0,0,0,0.38) 100%); }
  .carousel-body { position:relative; z-index:2; height:100%; display:flex; align-items:center; justify-content:center; padding:0 80px; }

  .c-arrow { position:absolute; top:50%; transform:translateY(-50%); z-index:20; width:50px; height:50px; border-radius:50%; background:rgba(10,31,68,0.55); border:1.5px solid rgba(212,175,55,0.5); color:${GOLD}; font-size:22px; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.3s; backdrop-filter:blur(8px); line-height:1; }
  .c-arrow:hover { background:rgba(212,175,55,0.18); border-color:${GOLD}; transform:translateY(-50%) scale(1.1); }
  .c-arrow.left  { left:24px; }
  .c-arrow.right { right:24px; }

  .c-dots { position:absolute; bottom:76px; left:50%; transform:translateX(-50%); z-index:20; display:flex; align-items:center; gap:8px; }
  .c-dot  { height:8px; border-radius:4px; border:none; cursor:pointer; transition:all 0.35s cubic-bezier(0.4,0,0.2,1); background:rgba(255,255,255,0.35); padding:0; }
  .c-dot.on { background:${GOLD}; }

  .c-pp { position:absolute; bottom:72px; right:28px; z-index:20; width:34px; height:34px; border-radius:50%; background:rgba(10,31,68,0.55); border:1px solid rgba(212,175,55,0.45); color:${GOLD}; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.3s; backdrop-filter:blur(8px); }
  .c-pp:hover { background:rgba(212,175,55,0.18); border-color:${GOLD}; }

  .c-progress { position:absolute; bottom:0; left:0; height:3px; background:${GOLD}; z-index:20; transition:width 0.1s linear; box-shadow:0 0 8px rgba(212,175,55,0.6); }

  .glass-card { background:rgba(10,31,68,0.68); backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px); border:1px solid rgba(212,175,55,0.3); border-radius:20px; padding:52px 48px; max-width:800px; width:100%; animation:slideUp 0.75s cubic-bezier(0.16,1,0.3,1) both; }

  .btn-gold    { background:${GOLD}; color:${NAVY}; border:none; padding:14px 32px; border-radius:8px; font-family:'Space Grotesk',sans-serif; font-weight:700; font-size:15px; cursor:pointer; transition:all 0.3s; letter-spacing:0.5px; text-decoration:none; display:inline-block; }
  .btn-gold:hover { background:${GOLD_LIGHT}; transform:translateY(-3px); box-shadow:0 12px 30px rgba(212,175,55,0.4); }
  .btn-outline { background:transparent; color:white; border:2px solid ${GOLD}; padding:13px 32px; border-radius:8px; font-family:'Space Grotesk',sans-serif; font-weight:700; font-size:15px; cursor:pointer; transition:all 0.3s; letter-spacing:0.5px; text-decoration:none; display:inline-block; }
  .btn-outline:hover { background:${GOLD}; color:${NAVY}; transform:translateY(-3px); box-shadow:0 12px 30px rgba(212,175,55,0.4); }

  .project-card { background:white; border-radius:16px; overflow:hidden; border:1px solid rgba(10,31,68,0.08); transition:all 0.4s cubic-bezier(0.25,0.8,0.25,1); }
  .project-card:hover { transform:translateY(-10px); box-shadow:0 20px 50px rgba(212,175,55,0.2),0 6px 15px rgba(10,31,68,0.12); border-color:${GOLD}; }
  .project-card:hover .project-overlay { opacity:1; }
  .project-overlay { position:absolute; inset:0; background:rgba(10,31,68,0.75); display:flex; align-items:center; justify-content:center; gap:12px; opacity:0; transition:opacity 0.3s; }

  .skill-icon-wrap { display:flex; flex-direction:column; align-items:center; gap:8px; padding:20px 16px; border-radius:12px; transition:all 0.3s; cursor:default; min-width:80px; }
  .skill-icon-wrap:hover { background:rgba(212,175,55,0.15); transform:translateY(-6px); }

  .testimonial-card { background:white; border-radius:16px; padding:36px; border:1px solid rgba(10,31,68,0.08); box-shadow:0 4px 20px rgba(10,31,68,0.06); transition:all 0.4s; }
  .testimonial-card:hover { box-shadow:0 12px 40px rgba(212,175,55,0.15); border-color:${GOLD}; transform:translateY(-4px); }

  .input-field { width:100%; padding:14px 18px; border:1.5px solid rgba(10,31,68,0.15); border-radius:10px; font-family:'DM Sans',sans-serif; font-size:15px; background:white; color:${CHARCOAL}; outline:none; transition:border-color 0.3s,box-shadow 0.3s; }
  .input-field:focus { border-color:${GOLD}; box-shadow:0 0 0 3px rgba(212,175,55,0.15); }

  .soc-btn { display:flex; align-items:center; justify-content:center; width:40px; height:40px; border-radius:9px; border:1px solid rgba(212,175,55,0.4); color:rgba(212,175,55,0.7); background:transparent; text-decoration:none; transition:all 0.3s; }
  .soc-btn:hover { border-color:${GOLD}; color:${GOLD}; background:rgba(212,175,55,0.08); transform:translateY(-2px); }

  .ci-box { width:46px; height:46px; background:rgba(212,175,55,0.1); border:1px solid rgba(212,175,55,0.3); border-radius:10px; display:flex; align-items:center; justify-content:center; color:${GOLD}; flex-shrink:0; transition:all 0.3s; }
  .ci-box:hover { background:rgba(212,175,55,0.18); border-color:${GOLD}; }

  .section-label { font-family:'Space Grotesk',sans-serif; color:${GOLD}; font-size:13px; font-weight:600; letter-spacing:3px; text-transform:uppercase; margin-bottom:12px; }
  .section-heading { font-family:'Playfair Display',serif; font-size:clamp(32px,4vw,52px); font-weight:900; color:${NAVY}; line-height:1.15; }
  .section-heading-light { font-family:'Playfair Display',serif; font-size:clamp(32px,4vw,52px); font-weight:900; color:white; line-height:1.15; }
  .gold-divider { width:60px; height:3px; background:linear-gradient(90deg,${GOLD},${GOLD_LIGHT}); border-radius:2px; margin:16px 0 24px; }

  .stat-card { text-align:center; padding:24px 20px; border:1px solid rgba(212,175,55,0.3); border-radius:12px; background:rgba(212,175,55,0.05); transition:all 0.3s; }
  .stat-card:hover { background:rgba(212,175,55,0.12); border-color:${GOLD}; transform:translateY(-4px); }

  @media (max-width:768px) {
    .glass-card    { padding:32px 20px; }
    .carousel-body { padding:0 20px; }
    .c-arrow       { width:38px; height:38px; font-size:18px; }
    .c-arrow.left  { left:10px; }
    .c-arrow.right { right:10px; }
    .grid-3    { grid-template-columns:1fr !important; }
    .grid-2    { grid-template-columns:1fr !important; }
    .about-grid { grid-template-columns:1fr !important; }
    .stats-row  { flex-direction:column; }
  }
`;

export default function PaulNyangwaraLanding() {
  useDocumentMeta({
    title:       'AI Developer & NeuroSpark CEO — Nairobi, Kenya',
    description: 'Founder & CEO of NeuroSpark Corporation. I build AI agents, automate workflows, and grow search rankings for businesses across East Africa.',
    canonical:   '/',
  });

  const location = useLocation();

  /* BUG-05: Scroll intent from Navbar goToContact */
  useEffect(() => {
    if (location.state?.scrollTo === 'contact') {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.state]);

  return (
    <>
      <style>{styles}</style>
      <HeroCarousel />
      <LandingAbout />
      <LandingProjects />
      <LandingSkills />
      <LandingTestimonials />
      <LandingContact />
    </>
  );
}
