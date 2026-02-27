/**
 * App.jsx — Paul Nyang'wara Portfolio Router
 *
 * Install dependency:
 *   npm install react-router-dom
 *
 * File structure expected:
 *   src/
 *     App.jsx                       ← this file
 *     pages/
 *       PaulNyangwaraLanding.jsx    ← home
 *       AboutPage.jsx
 *       ServicesPage.jsx
 *       ProjectsPage.jsx
 *       BlogPage.jsx
 *       SkillsTestimonialsPage.jsx
 *
 * Route map:
 *   /                 → Landing (Home)
 *   /about            → About
 *   /services         → Services
 *   /projects         → Projects / Case Studies
 *   /blog             → Blog / Insights
 *   /skills           → Skills & Testimonials (anchors to #skills or #testimonials)
 *   *                 → 404 Not Found
 */

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import PaulNyangwaraLanding     from "./pages/PaulNyangwaraLanding";
import AboutPage                from "./pages/AboutPage";
import ServicesPage             from "./pages/ServicesPage";
import ProjectsPage             from "./pages/ProjectsPage";
import BlogPage                 from "./pages/BlogPage";
import SkillsTestimonialsPage   from "./pages/SkillsTestimonialsPage";

/* ── Scroll to top on every route change ─────────────────────────── */
function ScrollReset() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

/* ── 404 Not Found Page ──────────────────────────────────────────── */
const NAVY  = "#0A1F44";
const GOLD  = "#D4AF37";
const GOLD_LIGHT = "#F0D060";

const nfStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Space+Grotesk:wght@400;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Space Grotesk', sans-serif; background: ${NAVY}; overflow: hidden; }

  @keyframes float404 {
    0%,100% { transform: translateY(0) rotate(-2deg); }
    50%      { transform: translateY(-20px) rotate(2deg); }
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(40px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse {
    0%,100% { opacity: 1; }
    50%      { opacity: 0.6; }
  }
  @keyframes gridScroll {
    from { background-position: 0 0; }
    to   { background-position: 48px 48px; }
  }

  .nf-bg {
    position: fixed; inset: 0;
    background-image:
      linear-gradient(rgba(212,175,55,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(212,175,55,0.04) 1px, transparent 1px);
    background-size: 48px 48px;
    animation: gridScroll 4s linear infinite;
  }
  .nf-glow {
    position: fixed; top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 600px; height: 600px; border-radius: 50%;
    background: radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%);
    pointer-events: none;
  }
  .nf-404 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(120px, 20vw, 220px);
    font-weight: 900;
    color: transparent;
    -webkit-text-stroke: 2px rgba(212,175,55,0.25);
    line-height: 1;
    animation: float404 5s ease-in-out infinite;
    user-select: none;
  }
  .btn-gold-nf {
    background: ${GOLD}; color: ${NAVY}; border: none; padding: 16px 40px;
    border-radius: 8px; font-family: 'Space Grotesk', sans-serif; font-weight: 700;
    font-size: 15px; cursor: pointer; transition: all 0.3s; text-decoration: none;
    display: inline-block;
  }
  .btn-gold-nf:hover { background: ${GOLD_LIGHT}; transform: translateY(-3px); box-shadow: 0 12px 30px rgba(212,175,55,0.4); }
  .btn-ghost {
    background: transparent; color: ${GOLD}; border: 2px solid ${GOLD}; padding: 15px 40px;
    border-radius: 8px; font-family: 'Space Grotesk', sans-serif; font-weight: 700;
    font-size: 15px; cursor: pointer; transition: all 0.3s; text-decoration: none;
    display: inline-block;
  }
  .btn-ghost:hover { background: ${GOLD}; color: ${NAVY}; transform: translateY(-3px); }

  .quick-link {
    color: rgba(255,255,255,0.5); text-decoration: none; font-size: 14px; font-weight: 500;
    transition: color 0.3s; padding: 6px 0;
  }
  .quick-link:hover { color: ${GOLD}; }
`;

function NotFoundPage() {
  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "Blog", href: "/blog" },
    { label: "Skills & Testimonials", href: "/skills" },
  ];

  return (
    <>
      <style>{nfStyles}</style>
      <div className="nf-bg" />
      <div className="nf-glow" />

      <div style={{
        position: "relative", zIndex: 1, minHeight: "100vh",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "40px 24px",
        animation: "fadeInUp 0.8s ease both",
      }}>
        {/* Logo */}
        <a href="/" style={{ textDecoration: "none", marginBottom: 48, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 24 }}>⚡</span>
          <span style={{ fontFamily: "'Playfair Display', serif", color: "white", fontSize: 22, fontWeight: 700 }}>
            Paul <span style={{ color: GOLD }}>Nyang'wara</span>
          </span>
        </a>

        <div className="nf-404">404</div>

        <div style={{ fontFamily: "'Space Grotesk', sans-serif", color: GOLD, fontSize: 13, fontWeight: 600, letterSpacing: 4, textTransform: "uppercase", marginBottom: 16, animation: "pulse 3s ease-in-out infinite" }}>
          Page Not Found
        </div>

        <h1 style={{ fontFamily: "'Playfair Display', serif", color: "white", fontSize: "clamp(24px,4vw,42px)", fontWeight: 900, lineHeight: 1.2, marginBottom: 16, maxWidth: 500 }}>
          This Page Doesn't<br /><span style={{ color: GOLD }}>Exist (Yet)</span>
        </h1>

        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 16, lineHeight: 1.7, maxWidth: 420, marginBottom: 40 }}>
          The page you're looking for has either moved or never existed. But great things are just one click away.
        </p>

        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 60 }}>
          <a href="/" className="btn-gold-nf">← Back to Home</a>
          <a href="/#contact" className="btn-ghost">Get in Touch</a>
        </div>

        {/* Quick nav */}
        <div style={{ borderTop: "1px solid rgba(212,175,55,0.15)", paddingTop: 32, maxWidth: 480, width: "100%" }}>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", color: "rgba(255,255,255,0.3)", fontSize: 11, fontWeight: 600, letterSpacing: 2, marginBottom: 16 }}>QUICK NAVIGATION</div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
            {quickLinks.map(l => (
              <a key={l.href} href={l.href} className="quick-link">{l.label}</a>
            ))}
          </div>
        </div>

        {/* WhatsApp widget */}
        <a href="https://wa.me/254799644100" target="_blank" rel="noopener noreferrer"
          style={{ position: "fixed", bottom: 32, right: 32, width: 60, height: 60, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 24px rgba(37,211,102,0.5)", zIndex: 9999, textDecoration: "none" }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
        </a>
      </div>
    </>
  );
}

/* ── Root App ─────────────────────────────────────────────────────── */
export default function App() {
  return (
    <BrowserRouter>
      <ScrollReset />
      <Routes>
        <Route path="/"            element={<PaulNyangwaraLanding />} />
        <Route path="/about"       element={<AboutPage />} />
        <Route path="/services"    element={<ServicesPage />} />
        <Route path="/projects"    element={<ProjectsPage />} />
        <Route path="/blog"        element={<BlogPage />} />
        <Route path="/skills"      element={<SkillsTestimonialsPage />} />
        {/* Alias routes — landing page hash sections still work */}
        <Route path="*"            element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

/*
 * ── main.jsx (entry point) ────────────────────────────────────────
 *
 * import React from 'react'
 * import ReactDOM from 'react-dom/client'
 * import App from './App'
 * import './index.css'   ← optional global reset
 *
 * ReactDOM.createRoot(document.getElementById('root')).render(
 *   <React.StrictMode>
 *     <App />
 *   </React.StrictMode>
 * )
 *
 * ── index.css (minimal global reset) ─────────────────────────────
 *
 * * { box-sizing: border-box; }
 * body { margin: 0; -webkit-font-smoothing: antialiased; }
 * a { text-decoration: none; }
 *
 * ── vite.config.js (if using Vite) ───────────────────────────────
 *
 * import { defineConfig } from 'vite'
 * import react from '@vitejs/plugin-react'
 *
 * export default defineConfig({
 *   plugins: [react()],
 * })
 *
 * ── Vercel / Netlify deploy note ──────────────────────────────────
 * Add a redirect rule so all routes fall back to index.html:
 *
 * Netlify (_redirects file):
 *   /*  /index.html  200
 *
 * Vercel (vercel.json):
 *   { "rewrites": [{ "source": "/(.*)", "destination": "/" }] }
 */
