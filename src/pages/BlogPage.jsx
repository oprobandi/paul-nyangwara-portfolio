/**
 * BlogPage.jsx — Blog list view
 * Paul Nyang'wara Portfolio v6.4
 *
 * v6.4 changes:
 *  - SinglePost removed; single-post view now lives at /blog/:slug
 *    (BlogPostPage.jsx) so posts are deep-linkable (BUG-02 / ADR-034).
 *  - handlePostClick now navigates to /blog/:slug instead of using
 *    inline selectedPost state.
 *  - Newsletter subscribe form wired to Formspree (BUG-01).
 *  - Corrupted CSS fragments purged from the styles block (BUG-06).
 *    Shared classes (btn-gold, filter-btn, tag-pill, etc.) are already
 *    in index.css; this block contains only page-specific overrides.
 *  - STATIC_POSTS extracted to src/data/posts.js (ADR-038).
 */

import { useState, useEffect } from 'react';
import { useNavigate }         from 'react-router-dom';
import { useDocumentMeta }     from '../hooks/useDocumentMeta';
import { fetchPosts, normaliseHashnodePost } from '../api/hashnode';
import { STATIC_POSTS }        from '../data/posts';
import AnimSection             from '../components/AnimSection';

import { NAVY, GOLD, GOLD_LIGHT, OFF_WHITE, CHARCOAL } from '../constants'; // ADR-029

/* Formspree newsletter form — distinct from the contact form (maqdryly) */
const NEWSLETTER_FORM_ID = 'mnjglqvo';

const CATEGORIES = ['All', 'AI & Automation', 'Web Development', 'SEO', 'Founder Story'];

/* ── Page-specific styles (shared classes live in index.css) ─────── */
const styles = `
  .blog-card { background: white; border-radius: 20px; overflow: hidden; border: 1px solid rgba(10,31,68,0.07); transition: all 0.4s cubic-bezier(0.25,0.8,0.25,1); cursor: pointer; }
  .blog-card:hover { transform: translateY(-10px); box-shadow: 0 24px 56px rgba(201,168,76,0.18); border-color: ${GOLD}; }
  .blog-card:hover .blog-img { transform: scale(1.06); }
  .blog-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }

  .featured-card { background: white; border-radius: 24px; overflow: hidden; border: 1px solid rgba(10,31,68,0.07); transition: all 0.4s; cursor: pointer; }
  .featured-card:hover { box-shadow: 0 30px 70px rgba(201,168,76,0.2); border-color: ${GOLD}; }
  .featured-card:hover .blog-img { transform: scale(1.04); }

  .search-input { width: 100%; padding: 14px 20px 14px 48px; border: 2px solid rgba(10,31,68,0.12); border-radius: 50px; font-family: 'DM Sans', sans-serif; font-size: 15px; background: white; color: ${CHARCOAL}; outline: none; transition: all 0.3s; }
  .search-input:focus { border-color: ${GOLD}; box-shadow: 0 0 0 3px rgba(201,168,76,0.12); }

  @media (max-width: 768px) {
    .featured-grid  { grid-template-columns: 1fr !important; }
    .blog-grid      { grid-template-columns: 1fr !important; }
    .sidebar-layout { grid-template-columns: 1fr !important; }
  }
`;

/* ── Skeleton Cards ──────────────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="blog-card" style={{ pointerEvents: 'none' }}>
      <div className="skeleton" style={{ height: 200, width: '100%' }} />
      <div style={{ padding: '24px 22px 28px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div className="skeleton" style={{ height: 14, width: '40%' }} />
        <div className="skeleton" style={{ height: 18, width: '90%' }} />
        <div className="skeleton" style={{ height: 18, width: '70%' }} />
        <div className="skeleton" style={{ height: 13, width: '55%' }} />
      </div>
    </div>
  );
}

/* ── Blog Cards ──────────────────────────────────────────────────── */
function BlogCard({ post, size = 'normal', onClick }) {
  if (size === 'featured') {
    return (
      <div className="featured-card" onClick={onClick}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr' }} className="featured-grid">
          <div style={{ height: 380, overflow: 'hidden' }}>
            <img src={post.img} alt={post.title} className="blog-img"
              width={800} height={450} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ padding: '44px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
              <span className="tag-pill" style={{ color: GOLD, borderColor: GOLD }}>{post.category}</span>
              <span className="tag-pill">{post.readTime}</span>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: NAVY, fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 900, lineHeight: 1.25, marginBottom: 16 }}>{post.title}</h2>
            <p style={{ color: '#666', fontSize: 14, lineHeight: 1.8, marginBottom: 24 }}>{post.excerpt}</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
              {post.tags?.map(t => <span key={t} className="tag-pill">{t}</span>)}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#999', fontSize: 12, fontWeight: 600 }}>{post.date}</span>
              <button className="btn-gold" style={{ padding: '10px 22px', fontSize: 13 }}>Read Article →</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-card" onClick={onClick}>
      <div style={{ height: 200, overflow: 'hidden' }}>
        <img src={post.img} alt={post.title} className="blog-img" width={800} height={450} />
      </div>
      <div style={{ padding: '24px 22px 28px' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
          <span className="tag-pill" style={{ color: GOLD, borderColor: GOLD }}>{post.category}</span>
          <span className="tag-pill">{post.readTime}</span>
        </div>
        <h3 style={{ fontFamily: "'Playfair Display', serif", color: NAVY, fontSize: 18, fontWeight: 700, lineHeight: 1.3, marginBottom: 10 }}>{post.title}</h3>
        <p style={{ color: '#777', fontSize: 13, lineHeight: 1.75, marginBottom: 16 }}>{post.excerpt?.slice(0, 110)}…</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#aaa', fontSize: 11, fontWeight: 600 }}>{post.date}</span>
          <span style={{ color: GOLD, fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 700 }}>Read →</span>
        </div>
      </div>
    </div>
  );
}

/* ── Main BlogPage ───────────────────────────────────────────────── */
export default function BlogPage() {
  useDocumentMeta({
    title:       'Blog — AI, Automation & Business in Kenya',
    description: "Insights on AI automation, SEO, and running a business in Kenya from Paul Nyang'wara, Founder of NeuroSpark Corporation.",
    canonical:   '/blog',
  });

  const navigate = useNavigate();

  const [posts, setPosts]                   = useState([]);
  const [loading, setLoading]               = useState(true);
  const [error, setError]                   = useState(null);
  const [filter, setFilter]                 = useState('All');
  const [search, setSearch]                 = useState('');
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [subscribed, setSubscribed]         = useState(false);
  const [subscribing, setSubscribing]       = useState(false);
  const [subscribeError, setSubscribeError] = useState('');

  const loadPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const raw        = await fetchPosts({ first: 20 });
      const normalised = raw.map(normaliseHashnodePost);
      if (normalised.length > 0) normalised[0].featured = true;
      if (normalised.length > 1) normalised[1].featured = true;
      setPosts(normalised.length > 0 ? normalised : STATIC_POSTS);
    } catch (err) {
      console.warn('Hashnode fetch failed, using static posts:', err.message);
      setPosts(STATIC_POSTS);
      setError('Could not load live posts. Showing cached articles.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadPosts(); }, []);

  /* Navigate to /blog/:slug — fixes broken deep links (BUG-02) */
  const handlePostClick = (post) => navigate(`/blog/${post.slug}`);

  /* Newsletter subscribe — wired to Formspree (BUG-01) */
  const handleSubscribe = async (e) => {
    e.preventDefault();
    setSubscribing(true);
    setSubscribeError('');
    try {
      const res = await fetch(`https://formspree.io/f/${NEWSLETTER_FORM_ID}`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body:    JSON.stringify({ email: subscribeEmail }),
      });
      if (res.ok) {
        setSubscribed(true);
        setSubscribeEmail('');
      } else {
        setSubscribeError('Something went wrong. Please try again.');
      }
    } catch {
      setSubscribeError('Network error. Please check your connection.');
    } finally {
      setSubscribing(false);
    }
  };

  const featured    = posts.filter(p => p.featured);
  const filtered    = posts.filter(p => {
    const matchesCat    = filter === 'All' || p.category === filter;
    const matchesSearch = !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.tags?.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCat && matchesSearch;
  });
  const nonFeatured = filter === 'All' && !search ? filtered.filter(p => !p.featured) : filtered;

  return (
    <>
      <style>{styles}</style>

      {/* ─── HERO ─── */}
      <section style={{ background: NAVY, paddingTop: 140, paddingBottom: 80, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.08) 0%, transparent 60%)' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 700, margin: '0 auto', padding: '0 40px', animation: 'fadeInUp 0.8s ease both' }}>
          <div className="section-label" style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>// Insights & Ideas</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px,5vw,64px)', fontWeight: 900, color: 'white', lineHeight: 1.1, marginBottom: 20 }}>
            Thoughts on AI,<br /><span style={{ color: GOLD }}>Web &amp; Growth</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 17, lineHeight: 1.8, maxWidth: 520, margin: '0 auto 40px' }}>
            Practical insights from building AI agents, websites, and SEO strategies for African businesses. No fluff — just actionable knowledge.
          </p>
          <div style={{ position: 'relative', maxWidth: 480, margin: '0 auto' }}>
            <span style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)', fontSize: 18, pointerEvents: 'none' }}>🔍</span>
            <input className="search-input" type="text" placeholder="Search articles, topics, tools…"
              value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
      </section>

      {/* ─── FILTER BAR ─── */}
      <div style={{ position: 'sticky', top: 72, zIndex: 90, background: 'rgba(249,248,244,0.97)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(10,31,68,0.08)', padding: '14px 40px', display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
        {CATEGORIES.map(cat => (
          <button key={cat} className={`filter-btn${filter === cat ? ' active' : ''}`} onClick={() => setFilter(cat)}>{cat}</button>
        ))}
        <div style={{ marginLeft: 'auto', fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: '#888' }}>
          {loading ? 'Loading…' : `${filtered.length} article${filtered.length !== 1 ? 's' : ''}`}
        </div>
      </div>

      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '60px 40px' }}>
        <div className="sidebar-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 60, alignItems: 'start' }}>

          {/* MAIN CONTENT */}
          <div>
            {error && (
              <div style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 12, padding: '14px 20px', marginBottom: 32, display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: '#555' }}>⚠️ {error}</span>
                <button onClick={loadPosts} style={{ background: GOLD, color: NAVY, border: 'none', padding: '6px 16px', borderRadius: 6, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>Retry</button>
              </div>
            )}

            {loading && (
              <div className="blog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 28 }}>
                {Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            )}

            {!loading && filter === 'All' && !search && featured.length > 0 && (
              <div style={{ marginBottom: 64 }}>
                <AnimSection style={{ marginBottom: 32 }}>
                  <div className="section-label">// Featured Articles</div>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", color: NAVY, fontSize: 28, fontWeight: 900 }}>
                    Start <span style={{ color: GOLD }}>Here</span>
                  </h2>
                  <div className="gold-divider" />
                </AnimSection>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                  {featured.map((post, i) => (
                    <AnimSection key={post.id} delay={i * 0.1}>
                      <BlogCard post={post} size="featured" onClick={() => handlePostClick(post)} />
                    </AnimSection>
                  ))}
                </div>
              </div>
            )}

            {!loading && (
              <div>
                {filter === 'All' && !search && (
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
                    <div style={{ textAlign: 'center', padding: '60px 0', color: '#888' }}>
                      <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
                      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16 }}>No articles found{search ? ` for "${search}"` : ''}.</p>
                      <button onClick={() => { setSearch(''); setFilter('All'); }} className="btn-gold" style={{ marginTop: 20, padding: '10px 24px', fontSize: 13 }}>Clear Filters</button>
                    </div>
                  </AnimSection>
                ) : (
                  <div className="blog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 28 }}>
                    {nonFeatured.map((post, i) => (
                      <AnimSection key={post.id} delay={i * 0.08}>
                        <BlogCard post={post} onClick={() => handlePostClick(post)} />
                      </AnimSection>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* SIDEBAR */}
          <aside style={{ position: 'sticky', top: 130 }}>
            <AnimSection>
              {/* Newsletter */}
              <div style={{ background: NAVY, borderRadius: 20, padding: '32px 28px', marginBottom: 28, border: '1px solid rgba(201,168,76,0.2)' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>✉️</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", color: 'white', fontSize: 20, fontWeight: 700, marginBottom: 10 }}>
                  Get the <span style={{ color: GOLD }}>Newsletter</span>
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13, lineHeight: 1.7, marginBottom: 20 }}>
                  Monthly insights on AI, web trends, and SEO strategy for African businesses. No spam, ever.
                </p>
                {subscribed ? (
                  <div style={{ textAlign: 'center', padding: '12px', animation: 'fadeIn 0.4s ease' }}>
                    <div style={{ fontSize: 32, marginBottom: 8 }}>✅</div>
                    <p style={{ color: GOLD, fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600 }}>You're in! Welcome aboard.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {/* SEC-03: Honeypot — hidden from real users, discarded by Formspree when filled */}
                    <input
                      type="text"
                      name="_gotcha"
                      style={{ display: 'none' }}
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                    />
                    <input
                      type="email" placeholder="your@email.com" required
                      value={subscribeEmail} onChange={e => setSubscribeEmail(e.target.value)}
                      style={{ padding: '12px 16px', borderRadius: 8, border: '1px solid rgba(201,168,76,0.25)', background: 'rgba(255,255,255,0.07)', color: 'white', fontFamily: "'DM Sans', sans-serif", fontSize: 14, outline: 'none' }}
                    />
                    {subscribeError && (
                      <p style={{ color: '#ff6b6b', fontSize: 12, fontFamily: "'Space Grotesk', sans-serif", margin: 0 }}>{subscribeError}</p>
                    )}
                    <button type="submit" className="btn-gold" style={{ width: '100%', padding: '12px', opacity: subscribing ? 0.7 : 1, cursor: subscribing ? 'not-allowed' : 'pointer' }} disabled={subscribing}>
                      {subscribing ? 'Subscribing…' : 'Subscribe →'}
                    </button>
                  </form>
                )}
              </div>

              {/* Categories */}
              <div style={{ background: 'white', borderRadius: 20, padding: '28px 24px', marginBottom: 28, border: '1px solid rgba(10,31,68,0.08)' }}>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", color: NAVY, fontSize: 14, fontWeight: 700, letterSpacing: 2, marginBottom: 16 }}>CATEGORIES</h3>
                {CATEGORIES.filter(c => c !== 'All').map(cat => (
                  <button key={cat} onClick={() => setFilter(cat)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', background: 'none', border: 'none', padding: '10px 0', cursor: 'pointer', borderBottom: '1px solid rgba(10,31,68,0.06)', textAlign: 'left' }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: filter === cat ? GOLD : '#555', fontWeight: filter === cat ? 600 : 400 }}>{cat}</span>
                    <span style={{ background: filter === cat ? 'rgba(201,168,76,0.15)' : 'rgba(10,31,68,0.06)', color: filter === cat ? GOLD : '#888', borderRadius: 20, padding: '2px 10px', fontSize: 11, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>
                      {posts.filter(p => p.category === cat).length}
                    </span>
                  </button>
                ))}
              </div>

              {/* NeuroSpark Blog CTA */}
              <div style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`, borderRadius: 20, padding: '28px 24px' }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", color: NAVY, fontSize: 18, fontWeight: 900, marginBottom: 10 }}>More on NeuroSpark</h3>
                <p style={{ color: 'rgba(10,31,68,0.7)', fontSize: 13, lineHeight: 1.7, marginBottom: 16 }}>Read the full archive — tax, compliance, M-Pesa, EAC trade, and AI automation guides.</p>
                <a href="https://neurosparkcorporation.ai/blog" target="_blank" rel="noopener noreferrer">
                  <button className="btn-gold" style={{ width: '100%', padding: '12px', background: NAVY, color: GOLD }}>Visit NeuroSpark Blog →</button>
                </a>
              </div>
            </AnimSection>
          </aside>

        </div>
      </div>
    </>
  );
}
