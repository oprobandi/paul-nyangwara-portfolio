import { Link } from "react-router-dom";

const GOLD    = "#D4AF37";
const DARK_BG = "#06132A";

const NAV_ITEMS = [
  { label: "Home",     path: "/"         },
  { label: "About",    path: "/about"    },
  { label: "Services", path: "/services" },
  { label: "Projects", path: "/projects" },
  { label: "Blog",     path: "/blog"     },
  { label: "Skills",   path: "/skills"   },
  { label: "Contact",  path: "/#contact" },
];

const LEGAL_ITEMS = [
  { label: "Privacy Policy",   path: "/privacy" },
  { label: "Terms of Service", path: "/terms"   },
];

const IconGitHub = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);
const IconFacebook = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
  </svg>
);
const IconX = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
const IconInstagram = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const SOCIALS = [
  { label: "GitHub",    href: "https://github.com/oprobandi",       Icon: IconGitHub    },
  { label: "Facebook",  href: "https://www.facebook.com/oprobandi", Icon: IconFacebook  },
  { label: "X",         href: "https://x.com/o_probandi",           Icon: IconX         },
  { label: "Instagram", href: "https://instagram.com/oprobandi",    Icon: IconInstagram },
];

const footerStyles = `
  .footer-ql {
    color: rgba(255,255,255,0.6);
    text-decoration: none;
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    transition: color 0.25s;
    white-space: nowrap;
  }
  .footer-ql:hover { color: ${GOLD}; }
  .footer-ql-sep { color: rgba(212,175,55,0.25); font-size: 13px; user-select: none; }
  .footer-legal-link {
    color: rgba(255,255,255,0.35);
    text-decoration: none;
    font-size: 12px;
    font-family: 'Space Grotesk', sans-serif;
    transition: color 0.25s;
  }
  .footer-legal-link:hover { color: ${GOLD}; }
  .footer-soc {
    display: flex; align-items: center; justify-content: center;
    width: 38px; height: 38px; border-radius: 8px;
    border: 1px solid rgba(212,175,55,0.4);
    color: rgba(212,175,55,0.7);
    background: transparent;
    text-decoration: none;
    transition: all 0.25s;
  }
  .footer-soc:hover {
    border-color: ${GOLD}; color: ${GOLD};
    background: rgba(212,175,55,0.08); transform: translateY(-2px);
  }
  @media (max-width: 768px) {
    .footer-nav-row { flex-wrap: wrap !important; row-gap: 10px !important; justify-content: center !important; }
    .footer-nav-row .footer-ql-sep { display: none; }
    .footer-bottom-row { flex-direction: column !important; align-items: center !important; gap: 10px !important; text-align: center; }
  }
`;

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <>
      <style>{footerStyles}</style>
      <footer style={{ background: DARK_BG, borderTop: "1px solid rgba(212,175,55,0.25)", padding: "64px 40px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* Brand */}
          <div style={{ marginBottom: 40 }}>
            <Link to="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
              <img src="/neurospark-logo.jpg" alt="NeuroSpark Logo" style={{ width: 50, height: 50, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
              <div>
                <div style={{ fontFamily: "'Playfair Display', serif", color: "white", fontSize: 22, fontWeight: 700, lineHeight: 1.2 }}>
                  NeuroSpark <span style={{ color: GOLD }}>Corporation</span>
                </div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", color: "rgba(255,255,255,0.4)", fontSize: 11, fontWeight: 500, letterSpacing: 0.8, marginTop: 3 }}>
                  Founded by Paul Nyang'wara
                </div>
              </div>
            </Link>
            <p style={{ color: "rgba(255,255,255,0.52)", fontSize: 14, lineHeight: 1.75, maxWidth: 340, margin: "0 0 22px" }}>
              Sparking Africa's AI Revolution,<br />One Business at a Time.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {SOCIALS.map(({ label, href, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="footer-soc" aria-label={label} title={label}>
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links label */}
          <div style={{ color: GOLD, fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 14 }}>
            Quick Links
          </div>

          {/* Horizontal nav row */}
          <div className="footer-nav-row" style={{ display: "flex", alignItems: "center", flexWrap: "nowrap", marginBottom: 40 }}>
            {NAV_ITEMS.map(({ label, path }, i) => (
              <span key={path} style={{ display: "flex", alignItems: "center" }}>
                {path.startsWith("/#") ? (
                  <a href={path} className="footer-ql">{label}</a>
                ) : (
                  <Link to={path} className="footer-ql">{label}</Link>
                )}
                {i < NAV_ITEMS.length - 1 && (
                  <span className="footer-ql-sep" style={{ margin: "0 12px" }}>|</span>
                )}
              </span>
            ))}
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: "1px solid rgba(212,175,55,0.15)", paddingTop: 24 }}>
            <div className="footer-bottom-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
              <p style={{ color: "rgba(255,255,255,0.32)", fontSize: 13, fontFamily: "'Space Grotesk', sans-serif", margin: 0 }}>
                © {year} NeuroSpark Corporation. All Rights Reserved.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {LEGAL_ITEMS.map(({ label, path }, i) => (
                  <span key={path} style={{ display: "flex", alignItems: "center" }}>
                    <Link to={path} className="footer-legal-link">{label}</Link>
                    {i < LEGAL_ITEMS.length - 1 && (
                      <span style={{ color: "rgba(212,175,55,0.2)", margin: "0 8px", fontSize: 12 }}>·</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}
