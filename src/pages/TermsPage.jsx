const NAVY = "#0A1F44";
const GOLD = "#D4AF37";

export default function TermsPage() {
  return (
    <div style={{ background: "#f9f7f2", minHeight: "100vh", padding: "80px 24px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{
          fontFamily: "'Space Grotesk', sans-serif",
          color: GOLD,
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: 3,
          textTransform: "uppercase",
          marginBottom: 12,
        }}>
          Legal
        </div>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          color: NAVY,
          fontSize: "clamp(32px, 5vw, 52px)",
          fontWeight: 900,
          lineHeight: 1.15,
          marginBottom: 16,
        }}>
          Terms of Service
        </h1>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          color: "rgba(10,31,68,0.5)",
          fontSize: 14,
          marginBottom: 48,
        }}>
          Last updated: {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div style={{
          background: "white",
          borderRadius: 16,
          padding: "48px",
          boxShadow: "0 4px 24px rgba(10,31,68,0.06)",
          fontFamily: "'DM Sans', sans-serif",
          color: "rgba(10,31,68,0.75)",
          fontSize: 16,
          lineHeight: 1.8,
        }}>
          <p style={{ color: NAVY, fontWeight: 500 }}>
            Content coming soon. Please check back later.
          </p>
        </div>
      </div>
    </div>
  );
}
