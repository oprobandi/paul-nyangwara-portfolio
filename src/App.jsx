/**
 * App.jsx — Paul Nyang'wara Portfolio Router
 *
 * Route map:
 *   /          → Landing (Home)
 *   /about     → About
 *   /services  → Services
 *   /projects  → Projects / Case Studies
 *   /blog      → Blog / Insights
 *   /skills    → Skills & Testimonials
 *   *          → 404 Not Found
 *
 * All routes share Navbar, Footer, and WhatsApp widget via Layout.
 * vercel.json in the project root handles SPA fallback for Vercel deploys.
 */

import { BrowserRouter, Routes, Route, useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

import Layout                 from "./components/Layout";
import PaulNyangwaraLanding   from "./pages/PaulNyangwaraLanding";
import AboutPage              from "./pages/AboutPage";
import ServicesPage           from "./pages/ServicesPage";
import ProjectsPage           from "./pages/ProjectsPage";
import BlogPage               from "./pages/BlogPage";
import SkillsTestimonialsPage from "./pages/SkillsTestimonialsPage";

/* ── Scroll to top on every route change ─────────────────────────── */
function ScrollReset() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

/* ── 404 Not Found Page ──────────────────────────────────────────── */
const NAVY = "#0A1F44";
const GOLD = "#D4AF37";
const GOLD_LIGHT = "#F0D060";

const nfStyles = `
  @keyframes float404 { 0%,100% { transform: translateY(0) rotate(-2deg); } 50% { transform: translateY(-20px) rotate(2deg); } }
  @keyframes fadeInUp { from { opacity:0; transform:translateY(40px); } to { opacity:1; transform:translateY(0); } }
  @keyframes pulse    { 0%,100% { opacity:1; } 50% { opacity:0.6; } }
  @keyframes gridScroll { from { background-position:0 0; } to { background-position:48px 48px; } }

  .nf-bg { position:fixed; inset:0; background-image: linear-gradient(rgba(212,175,55,0.04) 1px, transparent 1px), linear-gradient(90deg,rgba(212,175,55,0.04) 1px, transparent 1px); background-size:48px 48px; animation:gridScroll 4s linear infinite; }
  .nf-glow { position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); width:600px; height:600px; border-radius:50%; background:radial-gradient(circle,rgba(212,175,55,0.07) 0%,transparent 70%); pointer-events:none; }
  .nf-404  { font-family:'Playfair Display',serif; font-size:clamp(120px,20vw,220px); font-weight:900; color:transparent; -webkit-text-stroke:2px rgba(212,175,55,0.25); line-height:1; animation:float404 5s ease-in-out infinite; user-select:none; }
  .btn-gold-nf { background:${GOLD}; color:${NAVY}; border:none; padding:16px 40px; border-radius:8px; font-family:'Space Grotesk',sans-serif; font-weight:700; font-size:15px; cursor:pointer; transition:all 0.3s; text-decoration:none; display:inline-block; }
  .btn-gold-nf:hover { background:${GOLD_LIGHT}; transform:translateY(-3px); box-shadow:0 12px 30px rgba(212,175,55,0.4); }
  .btn-ghost { background:transparent; color:${GOLD}; border:2px solid ${GOLD}; padding:15px 40px; border-radius:8px; font-family:'Space Grotesk',sans-serif; font-weight:700; font-size:15px; cursor:pointer; transition:all 0.3s; text-decoration:none; display:inline-block; }
  .btn-ghost:hover { background:${GOLD}; color:${NAVY}; transform:translateY(-3px); }
  .nf-quick-link { color:rgba(255,255,255,0.5); text-decoration:none; font-size:14px; font-weight:500; transition:color 0.3s; padding:6px 0; font-family:'Space Grotesk',sans-serif; }
  .nf-quick-link:hover { color:${GOLD}; }
`;

function NotFoundPage() {
  const quickLinks = [
    { label: "Home",     to: "/"         },
    { label: "About",    to: "/about"    },
    { label: "Services", to: "/services" },
    { label: "Projects", to: "/projects" },
    { label: "Blog",     to: "/blog"     },
    { label: "Skills",   to: "/skills"   },
  ];

  return (
    <>
      <style>{nfStyles}</style>
      <div className="nf-bg" />
      <div className="nf-glow" />

      <div style={{ position:"relative", zIndex:1, minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", padding:"40px 24px", animation:"fadeInUp 0.8s ease both" }}>
        <Link to="/" style={{ textDecoration:"none", marginBottom:48, display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontSize:24 }}>⚡</span>
          <span style={{ fontFamily:"'Playfair Display',serif", color:"white", fontSize:22, fontWeight:700 }}>
            Paul <span style={{ color:GOLD }}>Nyang'wara</span>
          </span>
        </Link>

        <div className="nf-404">404</div>

        <div style={{ fontFamily:"'Space Grotesk',sans-serif", color:GOLD, fontSize:13, fontWeight:600, letterSpacing:4, textTransform:"uppercase", marginBottom:16, animation:"pulse 3s ease-in-out infinite" }}>
          Page Not Found
        </div>

        <h1 style={{ fontFamily:"'Playfair Display',serif", color:"white", fontSize:"clamp(24px,4vw,42px)", fontWeight:900, lineHeight:1.2, marginBottom:16, maxWidth:500 }}>
          This Page Doesn't<br /><span style={{ color:GOLD }}>Exist (Yet)</span>
        </h1>

        <p style={{ color:"rgba(255,255,255,0.6)", fontSize:16, lineHeight:1.7, maxWidth:420, marginBottom:40 }}>
          The page you're looking for has either moved or never existed. But great things are just one click away.
        </p>

        <div style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap", marginBottom:60 }}>
          <Link to="/" className="btn-gold-nf">← Back to Home</Link>
          <a href="/#contact" className="btn-ghost">Get in Touch</a>
        </div>

        <div style={{ borderTop:"1px solid rgba(212,175,55,0.15)", paddingTop:32, maxWidth:480, width:"100%" }}>
          <div style={{ fontFamily:"'Space Grotesk',sans-serif", color:"rgba(255,255,255,0.3)", fontSize:11, fontWeight:600, letterSpacing:2, marginBottom:16 }}>QUICK NAVIGATION</div>
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            {quickLinks.map(l => (
              <Link key={l.to} to={l.to} className="nf-quick-link">{l.label}</Link>
            ))}
          </div>
        </div>
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
        {/* All routes wrapped in shared Layout (Navbar + Footer + WhatsApp) */}
        <Route element={<Layout />}>
          <Route path="/"         element={<PaulNyangwaraLanding />}   />
          <Route path="/about"    element={<AboutPage />}               />
          <Route path="/services" element={<ServicesPage />}            />
          <Route path="/projects" element={<ProjectsPage />}            />
          <Route path="/blog"     element={<BlogPage />}                />
          <Route path="/skills"   element={<SkillsTestimonialsPage />}  />
        </Route>

        {/* 404 — outside Layout so it gets its own full-screen treatment */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
