import { useState, useEffect, useRef } from "react";

const NAVY = "#0A1F44";
const GOLD = "#D4AF37";
const GOLD_LIGHT = "#F0D060";
const OFF_WHITE = "#F9F8F4";
const CHARCOAL = "#1A1A2E";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600&family=Space+Grotesk:wght@400;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'DM Sans', sans-serif; background: ${OFF_WHITE}; color: ${CHARCOAL}; overflow-x: hidden; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: ${NAVY}; }
  ::-webkit-scrollbar-thumb { background: ${GOLD}; border-radius: 3px; }

  @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes pulse-gold { 0%,100% { box-shadow: 0 0 0 0 rgba(212,175,55,0.7); } 50% { box-shadow: 0 0 0 14px rgba(212,175,55,0); } }
  @keyframes wa-pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.08); } }
  @keyframes shimmer { 0% { background-position: -600px 0; } 100% { background-position: 600px 0; } }

  .nav-link { color: rgba(255,255,255,0.85); text-decoration: none; font-family: 'Space Grotesk', sans-serif; font-size: 14px; font-weight: 500; letter-spacing: 0.5px; position: relative; padding-bottom: 4px; transition: color 0.3s; }
  .nav-link::after { content: ''; position: absolute; left:0; bottom:0; width:0; height:2px; background:${GOLD}; transition: width 0.3s; }
  .nav-link:hover { color: ${GOLD}; }
  .nav-link:hover::after, .nav-link.active::after { width: 100%; }
  .nav-link.active { color: ${GOLD}; }

  .btn-gold { background: ${GOLD}; color: ${NAVY}; border: none; padding: 14px 32px; border-radius: 8px; font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 15px; cursor: pointer; transition: all 0.3s; letter-spacing: 0.5px; }
  .btn-gold:hover { background: ${GOLD_LIGHT}; transform: translateY(-3px); box-shadow: 0 12px 30px rgba(212,175,55,0.4); }
  .btn-outline-gold { background: transparent; color: ${GOLD}; border: 2px solid ${GOLD}; padding: 13px 32px; border-radius: 8px; font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 15px; cursor: pointer; transition: all 0.3s; }
  .btn-outline-gold:hover { background: ${GOLD}; color: ${NAVY}; transform: translateY(-3px); }

  .section-label { font-family: 'Space Grotesk', sans-serif; color: ${GOLD}; font-size: 13px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 12px; }
  .gold-divider { width: 60px; height: 3px; background: linear-gradient(90deg,${GOLD},${GOLD_LIGHT}); border-radius: 2px; margin: 16px 0 24px; }

  .filter-btn { padding: 9px 22px; border-radius: 30px; border: 2px solid rgba(10,31,68,0.15); background: white; font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 13px; cursor: pointer; transition: all 0.3s; color: ${CHARCOAL}; }
  .filter-btn.active { background: ${NAVY}; color: ${GOLD}; border-color: ${NAVY}; }
  .filter-btn:hover:not(.active) { border-color: ${GOLD}; color: ${GOLD}; }

  .blog-card { background: white; border-radius: 20px; overflow: hidden; border: 1px solid rgba(10,31,68,0.07); transition: all 0.4s cubic-bezier(0.25,0.8,0.25,1); cursor: pointer; }
  .blog-card:hover { transform: translateY(-10px); box-shadow: 0 24px 56px rgba(212,175,55,0.18); border-color: ${GOLD}; }
  .blog-card:hover .blog-img { transform: scale(1.06); }

  .blog-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }

  .featured-card { background: white; border-radius: 24px; overflow: hidden; border: 1px solid rgba(10,31,68,0.07); transition: all 0.4s; cursor: pointer; }
  .featured-card:hover { box-shadow: 0 30px 70px rgba(212,175,55,0.2); border-color: ${GOLD}; }
  .featured-card:hover .blog-img { transform: scale(1.04); }

  .tag-pill { display: inline-flex; align-items: center; background: rgba(212,175,55,0.1); color: ${NAVY}; border: 1px solid rgba(212,175,55,0.3); padding: 4px 12px; border-radius: 20px; font-family: 'Space Grotesk', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.5px; }

  .search-input { width: 100%; padding: 14px 20px 14px 48px; border: 2px solid rgba(10,31,68,0.12); border-radius: 50px; font-family: 'DM Sans', sans-serif; font-size: 15px; background: white; color: ${CHARCOAL}; outline: none; transition: all 0.3s; }
  .search-input:focus { border-color: ${GOLD}; box-shadow: 0 0 0 3px rgba(212,175,55,0.12); }

  .mobile-menu { position: fixed; top:0; left:0; right:0; bottom:0; background: ${NAVY}; z-index: 998; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 32px; animation: fadeIn 0.3s ease; }
  .wa-widget { position: fixed; bottom: 32px; right: 32px; z-index: 9999; display: flex; flex-direction: column; align-items: flex-end; gap: 10px; }
  .wa-btn { width: 60px; height: 60px; border-radius: 50%; background: #25D366; display: flex; align-items: center; justify-content: center; cursor: pointer; animation: pulse-gold 2.5s infinite, wa-pulse 3s ease-in-out infinite; box-shadow: 0 6px 24px rgba(37,211,102,0.5); text-decoration: none; }
  .wa-btn:hover { transform: scale(1.15) !important; }
  .wa-tooltip { background: ${NAVY}; color: white; padding: 10px 16px; border-radius: 8px; font-family: 'Space Grotesk', sans-serif; font-size: 13px; font-weight: 500; white-space: nowrap; border: 1px solid ${GOLD}; animation: fadeIn 0.3s ease; }

  @media (max-width: 768px) {
    .desktop-nav { display: none !important; }
    .mobile-menu-btn { display: flex !important; }
    .featured-grid { grid-template-columns: 1fr !important; }
    .blog-grid { grid-template-columns: 1fr !important; }
    .sidebar-layout { grid-template-columns: 1fr !important; }
  }
  @media (min-width: 769px) { .mobile-menu-btn { display: none !important; } }
`;


const POSTS = [
  {
    id: 1,
    slug: "ai-agents-african-smes-2024",
    title: "Why Every African SME Needs an AI Agent in 2025",
    excerpt: "The competitive gap between large corporations and SMEs has never been smaller — because AI has democratised access to intelligent automation. Here's how to close the gap completely.",
    category: "AI & Automation",
    readTime: "8 min read",
    date: "Jan 15, 2025",
    featured: true,
    img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1000&q=80",
    tags: ["AI Agents", "SME", "Kenya", "Automation"],
  },
  {
    id: 2,
    slug: "mpesa-integration-ecommerce-guide",
    title: "The Complete Developer Guide to M-Pesa Daraja API Integration",
    excerpt: "M-Pesa processes over $300 billion annually. If your e-commerce site doesn't support it natively, you're leaving money on the table. This is the only guide you'll need.",
    category: "Web Development",
    readTime: "12 min read",
    date: "Jan 8, 2025",
    featured: true,
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1000&q=80",
    tags: ["M-Pesa", "API", "E-Commerce", "Kenya"],
  },
  {
    id: 3,
    slug: "nairobi-seo-strategy-2025",
    title: "How to Rank #1 on Google in Nairobi: A 2025 Playbook",
    excerpt: "Local SEO in Kenya has its own rules. This playbook covers everything from Google Business Profile optimisation to Swahili keyword research and local link building.",
    category: "SEO",
    readTime: "10 min read",
    date: "Dec 22, 2024",
    featured: false,
    img: "https://images.unsplash.com/photo-1562577309-2592ab84b1bc?w=800&q=80",
    tags: ["Local SEO", "Nairobi", "Google", "Rankings"],
  },
  {
    id: 4,
    slug: "langchain-whatsapp-chatbot-tutorial",
    title: "Build a WhatsApp AI Chatbot in Under 2 Hours with LangChain",
    excerpt: "WhatsApp is Africa's primary communication channel. This step-by-step tutorial shows you how to build, test, and deploy a production-ready AI chatbot for your business today.",
    category: "AI & Automation",
    readTime: "15 min read",
    date: "Dec 10, 2024",
    featured: false,
    img: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80",
    tags: ["LangChain", "WhatsApp", "Tutorial", "Python"],
  },
  {
    id: 5,
    slug: "nextjs-kenya-performance-guide",
    title: "Building Fast Next.js Sites for Kenya's 3G Reality",
    excerpt: "Designing for Nairobi means designing for 3G. These optimisation techniques will make your Next.js site blazing fast on any connection — without sacrificing design quality.",
    category: "Web Development",
    readTime: "9 min read",
    date: "Nov 28, 2024",
    featured: false,
    img: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
    tags: ["Next.js", "Performance", "Mobile", "Kenya"],
  },
  {
    id: 6,
    slug: "ai-automation-roi-calculator",
    title: "How to Calculate the ROI of AI Automation for Your SME",
    excerpt: "Before investing in AI automation, you need a clear picture of expected returns. This framework will help you build an honest business case — with real numbers from real projects.",
    category: "AI & Automation",
    readTime: "7 min read",
    date: "Nov 15, 2024",
    featured: false,
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    tags: ["ROI", "AI", "Business Strategy", "SME"],
  },
  {
    id: 7,
    slug: "technical-seo-audit-checklist",
    title: "The 50-Point Technical SEO Audit Checklist for 2025",
    excerpt: "Technical SEO mistakes silently kill your rankings. This 50-point checklist — built from auditing 30+ Kenyan websites — will uncover every issue standing between you and page one.",
    category: "SEO",
    readTime: "11 min read",
    date: "Nov 3, 2024",
    featured: false,
    img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80",
    tags: ["Technical SEO", "Audit", "Checklist", "Google"],
  },
  {
    id: 8,
    slug: "founding-neurospark-story",
    title: "Why I Left a Stable Tech Job to Start NeuroSpark Corporation",
    excerpt: "In 2022, I had a good salary, a comfortable role, and a clear career path. I walked away from all of it. This is the story of why — and what happened next.",
    category: "Founder Story",
    readTime: "6 min read",
    date: "Oct 20, 2024",
    featured: false,
    img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80",
    tags: ["Entrepreneurship", "Kenya", "Startup", "NeuroSpark"],
  },
];

const CATEGORIES = ["All", "AI & Automation", "Web Development", "SEO", "Founder Story"];

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function AnimSection({ children, style = {}, delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(36px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`, ...style }}>
      {children}
    </div>
  );
}

function BlogCard({ post, size = "normal" }) {
  if (size === "featured") {
    return (
      <div className="featured-card">
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr" }} className="featured-grid">
          <div style={{ height: 380, overflow: "hidden" }}>
            <img src={post.img} alt={post.title} className="blog-img" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ padding: "44px 40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
              <span className="tag-pill" style={{ background: `rgba(10,31,68,0.08)`, color: GOLD, borderColor: GOLD }}>{post.category}</span>
              <span className="tag-pill">{post.readTime}</span>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: NAVY, fontSize: "clamp(20px,2.5vw,28px)", fontWeight: 900, lineHeight: 1.25, marginBottom: 16 }}>{post.title}</h2>
            <p style={{ color: "#666", fontSize: 14, lineHeight: 1.8, marginBottom: 24 }}>{post.excerpt}</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
              {post.tags.map(t => <span key={t} className="tag-pill">{t}</span>)}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#999", fontSize: 12, fontWeight: 600 }}>{post.date}</span>
              <button className="btn-gold" style={{ padding: "10px 22px", fontSize: 13 }}>Read Article →</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-card">
      <div style={{ height: 200, overflow: "hidden" }}>
        <img src={post.img} alt={post.title} className="blog-img" />
      </div>
      <div style={{ padding: "24px 22px 28px" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
          <span className="tag-pill" style={{ color: GOLD, borderColor: GOLD, background: "rgba(212,175,55,0.08)" }}>{post.category}</span>
          <span className="tag-pill">{post.readTime}</span>
        </div>
        <h3 style={{ fontFamily: "'Playfair Display', serif", color: NAVY, fontSize: 18, fontWeight: 700, lineHeight: 1.3, marginBottom: 10 }}>{post.title}</h3>
        <p style={{ color: "#777", fontSize: 13, lineHeight: 1.75, marginBottom: 16 }}>{post.excerpt.slice(0, 110)}…</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#aaa", fontSize: 11, fontWeight: 600 }}>{post.date}</span>
          <span style={{ color: GOLD, fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 700 }}>Read →</span>
        </div>
      </div>
    </div>
  );
}

export default function BlogPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const featured = POSTS.filter(p => p.featured);
  const filtered = POSTS.filter(p => {
    const matchesCat = filter === "All" || p.category === filter;
    const matchesSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCat && matchesSearch;
  });
  const nonFeatured = filter === "All" && !search ? filtered.filter(p => !p.featured) : filtered;

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribed(true);
    setSubscribeEmail("");
  };

  return (
    <>
      <style>{styles}</style>



      {/* ─── HERO ─── */}
      <section style={{ background: NAVY, paddingTop: 140, paddingBottom: 80, textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(212,175,55,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.03) 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.08) 0%, transparent 60%)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 700, margin: "0 auto", padding: "0 40px", animation: "fadeInUp 0.8s ease both" }}>
          <div className="section-label" style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>// Insights & Ideas</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px,5vw,64px)", fontWeight: 900, color: "white", lineHeight: 1.1, marginBottom: 20 }}>
            Thoughts on AI,<br /><span style={{ color: GOLD }}>Web & Growth</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 17, lineHeight: 1.8, maxWidth: 520, margin: "0 auto 40px" }}>
            Practical insights from building AI agents, websites, and SEO strategies for African businesses. No fluff — just actionable knowledge.
          </p>

          {/* Search */}
          <div style={{ position: "relative", maxWidth: 480, margin: "0 auto" }}>
            <span style={{ position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)", fontSize: 18, pointerEvents: "none" }}>🔍</span>
            <input className="search-input" type="text" placeholder="Search articles, topics, tools…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
      </section>

      {/* ─── FILTER BAR ─── */}
      <div style={{ position: "sticky", top: 72, zIndex: 90, background: "rgba(249,248,244,0.97)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(10,31,68,0.08)", padding: "14px 40px", display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
        {CATEGORIES.map(cat => (
          <button key={cat} className={`filter-btn${filter === cat ? " active" : ""}`} onClick={() => setFilter(cat)}>{cat}</button>
        ))}
        <div style={{ marginLeft: "auto", fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: "#888" }}>
          {filtered.length} article{filtered.length !== 1 ? "s" : ""}
        </div>
      </div>

      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "60px 40px" }}>
        <div className="sidebar-layout" style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 60, alignItems: "start" }}>

          {/* MAIN CONTENT */}
          <div>
            {/* Featured posts */}
            {filter === "All" && !search && (
              <div style={{ marginBottom: 64 }}>
                <AnimSection style={{ marginBottom: 32 }}>
                  <div className="section-label">// Featured Articles</div>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", color: NAVY, fontSize: 28, fontWeight: 900 }}>
                    Start <span style={{ color: GOLD }}>Here</span>
                  </h2>
                  <div className="gold-divider" />
                </AnimSection>
                <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                  {featured.map((post, i) => (
                    <AnimSection key={post.id} delay={i * 0.1}>
                      <BlogCard post={post} size="featured" />
                    </AnimSection>
                  ))}
                </div>
              </div>
            )}

            {/* All / filtered posts */}
            <div>
              {filter === "All" && !search && (
                <AnimSection style={{ marginBottom: 32 }}>
                  <div className="section-label">// All Articles</div>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", color: NAVY, fontSize: 28, fontWeight: 900 }}>
                    Latest <span style={{ color: GOLD }}>Insights</span>
                  </h2>
                  <div className="gold-divider" />
                </AnimSection>
              )}

              {nonFeatured.length === 0 ? (
                <AnimSection>
                  <div style={{ textAlign: "center", padding: "60px 0", color: "#888" }}>
                    <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
                    <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16 }}>No articles found for "{search}"</p>
                    <button onClick={() => { setSearch(""); setFilter("All"); }} className="btn-gold" style={{ marginTop: 20, padding: "10px 24px", fontSize: 13 }}>Clear Filters</button>
                  </div>
                </AnimSection>
              ) : (
                <div className="blog-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 28 }}>
                  {nonFeatured.map((post, i) => (
                    <AnimSection key={post.id} delay={i * 0.08}>
                      <BlogCard post={post} />
                    </AnimSection>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* SIDEBAR */}
          <aside style={{ position: "sticky", top: 130 }}>
            <AnimSection>
              {/* Newsletter */}
              <div style={{ background: NAVY, borderRadius: 20, padding: "32px 28px", marginBottom: 28, border: "1px solid rgba(212,175,55,0.2)" }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>✉️</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", color: "white", fontSize: 20, fontWeight: 700, marginBottom: 10 }}>
                  Get the <span style={{ color: GOLD }}>Newsletter</span>
                </h3>
                <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, lineHeight: 1.7, marginBottom: 20 }}>
                  Monthly insights on AI, web trends, and SEO strategy for African businesses. No spam, ever.
                </p>
                {subscribed ? (
                  <div style={{ textAlign: "center", padding: "12px", animation: "fadeIn 0.4s ease" }}>
                    <div style={{ fontSize: 32, marginBottom: 8 }}>✅</div>
                    <p style={{ color: GOLD, fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600 }}>You're in! Welcome aboard.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <input type="email" placeholder="your@email.com" required value={subscribeEmail} onChange={e => setSubscribeEmail(e.target.value)}
                      style={{ padding: "12px 16px", borderRadius: 8, border: "1px solid rgba(212,175,55,0.25)", background: "rgba(255,255,255,0.07)", color: "white", fontFamily: "'DM Sans', sans-serif", fontSize: 14, outline: "none" }} />
                    <button type="submit" className="btn-gold" style={{ width: "100%", padding: "12px" }}>Subscribe →</button>
                  </form>
                )}
              </div>

              {/* Categories */}
              <div style={{ background: "white", borderRadius: 20, padding: "28px 24px", marginBottom: 28, border: "1px solid rgba(10,31,68,0.08)" }}>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", color: NAVY, fontSize: 14, fontWeight: 700, letterSpacing: 2, marginBottom: 16 }}>CATEGORIES</h3>
                {CATEGORIES.filter(c => c !== "All").map(cat => (
                  <button key={cat} onClick={() => setFilter(cat)} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%",
                    background: "none", border: "none", padding: "10px 0", cursor: "pointer",
                    borderBottom: "1px solid rgba(10,31,68,0.06)", textAlign: "left",
                  }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: filter === cat ? GOLD : "#555", fontWeight: filter === cat ? 600 : 400 }}>{cat}</span>
                    <span style={{ background: filter === cat ? `rgba(212,175,55,0.15)` : "rgba(10,31,68,0.06)", color: filter === cat ? GOLD : "#888", borderRadius: 20, padding: "2px 10px", fontSize: 11, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>
                      {POSTS.filter(p => p.category === cat).length}
                    </span>
                  </button>
                ))}
              </div>

              {/* Popular tags */}
              <div style={{ background: "white", borderRadius: 20, padding: "28px 24px", marginBottom: 28, border: "1px solid rgba(10,31,68,0.08)" }}>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", color: NAVY, fontSize: 14, fontWeight: 700, letterSpacing: 2, marginBottom: 16 }}>POPULAR TAGS</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["AI Agents", "Kenya", "M-Pesa", "LangChain", "Next.js", "SEO", "Automation", "Tutorial", "SME", "Python"].map(tag => (
                    <button key={tag} onClick={() => setSearch(tag)} className="tag-pill" style={{ cursor: "pointer", transition: "all 0.2s", border: "1px solid rgba(212,175,55,0.3)" }}
                      onMouseEnter={e => { e.currentTarget.style.background = `rgba(212,175,55,0.2)`; }}
                      onMouseLeave={e => { e.currentTarget.style.background = `rgba(212,175,55,0.1)`; }}>
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`, borderRadius: 20, padding: "28px 24px" }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", color: NAVY, fontSize: 18, fontWeight: 900, marginBottom: 10 }}>Ready to Apply This?</h3>
                <p style={{ color: "rgba(10,31,68,0.7)", fontSize: 13, lineHeight: 1.7, marginBottom: 16 }}>Let's implement these strategies in your business.</p>
                <a href="/#contact"><button className="btn-gold" style={{ width: "100%", padding: "12px", background: NAVY, color: GOLD }}>Book a Call →</button></a>
              </div>
            </AnimSection>
          </aside>
        </div>
      </div>


    </>
  );
}
