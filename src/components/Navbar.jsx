import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";

const NAVY  = "#0A1F44";
const GOLD  = "#D4AF37";
const GOLD_LIGHT = "#F0D060";

const navStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'DM Sans', sans-serif; overflow-x: hidden; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: ${NAVY}; }
  ::-webkit-scrollbar-thumb { background: ${GOLD}; border-radius: 3px; }

  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  .nav-link {
    color: rgba(255,255,255,0.85); text-decoration: none;
    font-family: 'Space Grotesk', sans-serif; font-size: 14px; font-weight: 500;
    letter-spacing: 0.5px; position: relative; padding-bottom: 4px; transition: color 0.3s;
  }
  .nav-link::after {
    content: ''; position: absolute; left: 0; bottom: 0;
    width: 0; height: 2px; background: ${GOLD}; transition: width 0.3s;
  }
  .nav-link:hover { color: ${GOLD}; }
  .nav-link:hover::after { width: 100%; }
  .nav-link.active { color: ${GOLD}; }
  .nav-link.active::after { width: 100%; }

  .btn-gold {
    background: ${GOLD}; color: ${NAVY}; border: none; padding: 14px 32px;
    border-radius: 8px; font-family: 'Space Grotesk', sans-serif; font-weight: 700;
    font-size: 15px; cursor: pointer; transition: all 0.3s; letter-spacing: 0.5px;
    text-decoration: none; display: inline-block;
  }
  .btn-gold:hover { background: ${GOLD_LIGHT}; transform: translateY(-3px); box-shadow: 0 12px 30px rgba(212,175,55,0.4); }

  .mobile-menu {
    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
    background: ${NAVY}; z-index: 998;
    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 32px;
    animation: fadeIn 0.3s ease;
  }
  .mobile-menu-nav-link {
    color: white; text-decoration: none;
    font-family: 'Space Grotesk', sans-serif; font-size: 22px; font-weight: 500;
    transition: color 0.2s;
  }
  .mobile-menu-nav-link:hover,
  .mobile-menu-nav-link.active { color: ${GOLD}; }

  @media (max-width: 768px) {
    .desktop-nav { display: none !important; }
    .mobile-menu-btn { display: flex !important; }
  }
  @media (min-width: 769px) {
    .mobile-menu-btn { display: none !important; }
  }
`;

/* Nav items that map to actual routes */
const NAV_ITEMS = [
  { label: "About",    path: "/about"    },
  { label: "Services", path: "/services" },
  { label: "Projects", path: "/projects" },
  { label: "Blog",     path: "/blog"     },
  { label: "Skills",   path: "/skills"   },
];

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Close mobile menu on route change */
  useEffect(() => { setMobileOpen(false); }, []);

  const goToContact = (e) => {
    e.preventDefault();
    /* If already on home, smooth-scroll; otherwise navigate then scroll */
    if (window.location.pathname === "/") {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      }, 350);
    }
  };

  return (
    <>
      <style>{navStyles}</style>

      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 40px", height: 72,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(10,31,68,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(212,175,55,0.2)" : "none",
        transition: "all 0.4s",
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <img src="/paul-headshot.jpg" alt="Paul Nyang'wara" style={{ width: 38, height: 38, borderRadius: "50%", objectFit: "cover", objectPosition: "top" }} />
          <span style={{ fontFamily: "'Playfair Display', serif", color: "white", fontSize: 20, fontWeight: 700 }}>
            Paul <span style={{ color: GOLD }}>Nyang'wara</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 36 }}>
          {NAV_ITEMS.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
            >
              {label}
            </NavLink>
          ))}
          {/* Contact scrolls to /#contact section */}
          <a href="/#contact" onClick={goToContact} className="nav-link">Contact</a>
          <a href="/#contact" onClick={goToContact}>
            <button className="btn-gold" style={{ padding: "10px 24px", fontSize: 13 }}>Let's Talk</button>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(true)}
          style={{ background: "none", border: "none", cursor: "pointer", color: GOLD, fontSize: 26, display: "none" }}
        >☰</button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="mobile-menu">
          <button
            onClick={() => setMobileOpen(false)}
            style={{ position: "absolute", top: 24, right: 32, background: "none", border: "none", color: GOLD, fontSize: 32, cursor: "pointer" }}
          >✕</button>

          <div style={{ fontFamily: "'Playfair Display', serif", color: GOLD, fontSize: 28, marginBottom: 8, display: "flex", alignItems: "center", gap: 10 }}>
            <img src="/paul-headshot.jpg" alt="Paul Nyang'wara" style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover", objectPosition: "top" }} />
            Paul Nyang'wara
          </div>

          {NAV_ITEMS.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) => `mobile-menu-nav-link${isActive ? " active" : ""}`}
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </NavLink>
          ))}

          <a
            href="/#contact"
            className="mobile-menu-nav-link"
            onClick={(e) => { setMobileOpen(false); goToContact(e); }}
          >
            Contact
          </a>

          <a href="/#contact" onClick={(e) => { setMobileOpen(false); goToContact(e); }}>
            <button className="btn-gold">Let's Talk</button>
          </a>
        </div>
      )}
    </>
  );
}
