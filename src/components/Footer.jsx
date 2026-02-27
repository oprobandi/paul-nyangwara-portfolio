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

          <div
            className="footer-grid"
            style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", gap: 48, marginBottom: 48 }}
          >
            <div>
              <Link to="/" style={{ textDecoration: "none" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", color: "white", fontSize: 24, fontWeight: 700, marginBottom: 8 }}>
                  ⚡ Paul <span style={{ color: GOLD }}>Nyang'wara</span>
                </div>
              </Link>
              <div style={{ color: GOLD, fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 2, marginBottom: 12 }}>
                NEUROSPARK CORPORATION
              </div>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, lineHeight: 1.7, maxWidth: 260 }}>
                Sparking Africa's AI Revolution, One Business at a Time.
              </p>
              <div style={{ display: "flex", gap: 10, marginTop: 20, flexWrap: "wrap" }}>
                {["LinkedIn", "Twitter", "GitHub"].map(s => (
                  <div key={s} style={{
                    padding: "6px 14px", border: "1px solid rgba(212,175,55,0.4)", borderRadius: 6,
                    color: "rgba(212,175,55,0.7)", fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 600,
                    cursor: "pointer", transition: "all 0.3s",
                  }}
                    onMouseEnter={e => { e.target.style.borderColor = GOLD; e.target.style.color = GOLD; }}
                    onMouseLeave={e => { e.target.style.borderColor = "rgba(212,175,55,0.4)"; e.target.style.color = "rgba(212,175,55,0.7)"; }}>
                    {s}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ color: GOLD, fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: 2, marginBottom: 20 }}>
                QUICK LINKS
              </div>
              {NAV_ITEMS.map(({ label, path }) => (
                <Link key={path} to={path} className="footer-quick-link">{label}</Link>
              ))}
              <a href="/#contact" className="footer-quick-link">Contact</a>
            </div>

            <div>
              <div style={{ color: GOLD, fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: 2, marginBottom: 20 }}>
                CONTACT
              </div>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 2.2 }}>
                hello@neurospark.co.ke<br />
                +254 799 644 100<br />
                Nairobi, Kenya 🇰🇪
              </p>
            </div>
          </div>

          <div className="footer-bottom" style={{ borderTop: "1px solid rgba(212,175,55,0.15)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>
              © {year} NeuroSpark Corporation. All Rights Reserved. | Designed with ⚡ in Nairobi, Kenya
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
