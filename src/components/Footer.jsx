import { Link } from "react-router-dom";

const NAVY      = "#0A1F44";
const GOLD      = "#D4AF37";
const GOLD_LIGHT = "#F0D060";

const NAV_ITEMS = [
  { label: "Home",     path: "/"         },
  { label: "About",    path: "/about"    },
  { label: "Services", path: "/services" },
  { label: "Projects", path: "/projects" },
  { label: "Blog",     path: "/blog"     },
  { label: "Skills",   path: "/skills"   },
];

const footerStyles = `
  .footer-link {
    color: rgba(255,255,255,0.55);
    text-decoration: none;
    font-size: 13px;
    transition: color 0.3s;
    font-family: 'Space Grotesk', sans-serif;
  }
  .footer-link:hover { color: ${GOLD}; }

  .footer-quick-link {
    display: block;
    color: rgba(255,255,255,0.6);
    text-decoration: none;
    font-size: 14px;
    margin-bottom: 10px;
    transition: color 0.3s;
    font-family: 'DM Sans', sans-serif;
  }
  .footer-quick-link:hover { color: ${GOLD}; }

  @media (max-width: 768px) {
    .footer-grid { grid-template-columns: 1fr !important; }
    .footer-bottom { flex-direction: column; text-align: center; gap: 16px !important; }
    .footer-links-row { flex-wrap: wrap; justify-content: center; }
  }
`;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <style>{footerStyles}</style>
      <footer style={{ background: "#06132A", borderTop: "1px solid rgba(212,175,55,0.25)", padding: "60px 40px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* Top grid */}
          <div
            className="footer-grid"
            style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", gap: 48, marginBottom: 48 }}
          >
            {/* Brand */}
            <div>
              <Link to="/" style={{ textDecoration: "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                  <img src="/neurospark-logo.jpg" alt="NeuroSpark Logo" style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
                  <div style={{ fontFamily: "'Playfair Display', serif", color: "white", fontSize: 24, fontWeight: 700 }}>
                    Paul <span style={{ color: GOLD }}>Nyang'wara</span>
                  </div>
                </div>
              </Link>
              <div style={{ color: GOLD, fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 2, marginBottom: 12 }}>
                NEUROSPARK CORPORATION
              </div>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, lineHeight: 1.7, maxWidth: 260 }}>
                Sparking Africa's AI Revolution, One Business at a Time.
              </p>

              {/* Social icons */}
              <div style={{ display: "flex", gap: 12, marginTop: 20, flexWrap: "wrap" }}>
                {/* GitHub */}
                <a href="https://github.com/oprobandi" target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 38, height: 38, borderRadius: 8, border: "1px solid rgba(212,175,55,0.4)", color: "rgba(212,175,55,0.7)", transition: "all 0.3s", textDecoration: "none" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.color = GOLD; e.currentTarget.style.background = "rgba(212,175,55,0.08)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(212,175,55,0.4)"; e.currentTarget.style.color = "rgba(212,175,55,0.7)"; e.currentTarget.style.background = "transparent"; }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </a>
                {/* Facebook */}
                <a href="https://www.facebook.com/oprobandi" target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 38, height: 38, borderRadius: 8, border: "1px solid rgba(212,175,55,0.4)", color: "rgba(212,175,55,0.7)", transition: "all 0.3s", textDecoration: "none" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.color = GOLD; e.currentTarget.style.background = "rgba(212,175,55,0.08)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(212,175,55,0.4)"; e.currentTarget.style.color = "rgba(212,175,55,0.7)"; e.currentTarget.style.background = "transparent"; }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
                  </svg>
                </a>
                {/* X (formerly Twitter) */}
                <a href="https://x.com/o_probandi" target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 38, height: 38, borderRadius: 8, border: "1px solid rgba(212,175,55,0.4)", color: "rgba(212,175,55,0.7)", transition: "all 0.3s", textDecoration: "none" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.color = GOLD; e.currentTarget.style.background = "rgba(212,175,55,0.08)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(212,175,55,0.4)"; e.currentTarget.style.color = "rgba(212,175,55,0.7)"; e.currentTarget.style.background = "transparent"; }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <div style={{ color: GOLD, fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: 2, marginBottom: 20 }}>
                QUICK LINKS
              </div>
              {NAV_ITEMS.map(({ label, path }) => (
                <Link key={path} to={path} className="footer-quick-link">{label}</Link>
              ))}
              <a href="/#contact" className="footer-quick-link">Contact</a>
            </div>

            {/* Contact */}
            <div>
              <div style={{ color: GOLD, fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: 2, marginBottom: 20 }}>
                CONTACT
              </div>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 2.2 }}>
                pnyangwara@gmail.com<br />
                +254 799 644 100<br />
                Nairobi, Kenya 🇰🇪
              </p>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="footer-bottom" style={{ borderTop: "1px solid rgba(212,175,55,0.15)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>
              © {year} NeuroSpark Corporation. All Rights Reserved. | Designed with 🌍 in Nairobi, Kenya
            </p>
            <div className="footer-links-row" style={{ display: "flex", gap: 24 }}>
              {NAV_ITEMS.map(({ label, path }) => (
                <Link key={path} to={path} className="footer-link">{label}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
