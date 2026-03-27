/**
 * BlogPostPage.jsx — Individual blog post route (/blog/:slug)
 * Paul Nyang'wara Portfolio v6.4
 *
 * Introduced in v6.4 to fix broken blog deep-links (BUG-02 / ADR-034).
 * Supersedes the inline SinglePost component that lived inside BlogPage.
 *
 * Security: all API-sourced HTML is sanitized with DOMPurify before
 * render, eliminating the XSS vector that existed in v6.3 (SEC-01).
 *
 * SEO: uses useDocumentMeta to set per-post <title>, description,
 * OG tags, and canonical — fixing the omission in SinglePost (BUG-07).
 *
 * Fallback: if the Hashnode API is unreachable, the post is looked up
 * in STATIC_POSTS so the six static slugs always resolve correctly.
 *
 * NOTE: Run `npm install` after pulling v6.4 to install dompurify.
 */

import { useState, useEffect }           from 'react';
import { useParams, useNavigate }        from 'react-router-dom';
import DOMPurify                         from 'dompurify';
import { fetchPost, normaliseHashnodePost } from '../api/hashnode';
import { useDocumentMeta }               from '../hooks/useDocumentMeta';
import { STATIC_POSTS }                  from '../data/posts';

import { NAVY, GOLD } from '../constants'; // ADR-029

export default function BlogPostPage() {
  const { slug }   = useParams();
  const navigate   = useNavigate();
  const [post, setPost]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  /* Per-post meta — hook called unconditionally; updates when post loads */
  useDocumentMeta({
    title:       post?.title,
    description: post?.excerpt,
    canonical:   post ? `/blog/${post.slug}` : '/blog',
    image:       post?.img,
  });

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);

      /* Optimistic static lookup — renders instantly on cache hit */
      const staticMatch = STATIC_POSTS.find(p => p.slug === slug);

      try {
        const raw = await fetchPost(slug);
        if (raw) {
          setPost({ ...normaliseHashnodePost(raw), content: raw.content?.html || null });
        } else if (staticMatch) {
          setPost(staticMatch);
        } else {
          setError('Post not found.');
        }
      } catch {
        if (staticMatch) {
          setPost(staticMatch);
        } else {
          setError('Could not load this post. It may have moved or been removed.');
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  /* ── Loading state ─────────────────────────────────────────────── */
  if (loading) {
    return (
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '120px 24px', textAlign: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'stretch' }}>
          <div className="skeleton" style={{ height: 360, borderRadius: 16 }} />
          <div className="skeleton" style={{ height: 18, width: '30%', alignSelf: 'flex-start' }} />
          <div className="skeleton" style={{ height: 36, width: '85%' }} />
          <div className="skeleton" style={{ height: 36, width: '60%' }} />
          <div className="skeleton" style={{ height: 16, width: '100%' }} />
          <div className="skeleton" style={{ height: 16, width: '100%' }} />
          <div className="skeleton" style={{ height: 16, width: '70%' }} />
        </div>
      </div>
    );
  }

  /* ── Error / not-found state ───────────────────────────────────── */
  if (error || !post) {
    return (
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '120px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 64, marginBottom: 20 }}>📄</div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", color: NAVY, fontSize: 'clamp(22px,3vw,32px)', fontWeight: 900, marginBottom: 12 }}>
          Post Not Found
        </h1>
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#888', fontSize: 15, marginBottom: 32, lineHeight: 1.7 }}>
          {error || "This post doesn't exist or may have moved."}
        </p>
        <button
          onClick={() => navigate('/blog')}
          className="btn-gold"
          style={{ padding: '13px 32px', fontSize: 14 }}
        >
          ← Back to Blog
        </button>
      </div>
    );
  }

  /* ── Post view ─────────────────────────────────────────────────── */
  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '80px 24px 100px' }}>

      {/* Back link */}
      <button
        onClick={() => navigate('/blog')}
        style={{ background: 'none', border: 'none', color: GOLD, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 14, cursor: 'pointer', marginBottom: 32, display: 'flex', alignItems: 'center', gap: 8, padding: 0 }}
      >
        ← Back to all posts
      </button>

      {/* Cover image */}
      <img
        src={post.img} alt={post.title} width={760} height={360}
        style={{ width: '100%', height: 360, objectFit: 'cover', borderRadius: 16, marginBottom: 36 }}
      />

      {/* Meta pills */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        <span className="tag-pill" style={{ color: GOLD, borderColor: GOLD }}>{post.category}</span>
        <span className="tag-pill">{post.readTime}</span>
        <span className="tag-pill">{post.date}</span>
      </div>

      {/* Title */}
      <h1 style={{ fontFamily: "'Playfair Display', serif", color: NAVY, fontSize: 'clamp(26px,4vw,40px)', fontWeight: 900, lineHeight: 1.2, marginBottom: 24 }}>
        {post.title}
      </h1>

      {/* Content — DOMPurify sanitizes all API HTML before render (SEC-01) */}
      {post.content ? (
        <div
          style={{ color: '#444', lineHeight: 1.9, fontSize: 16 }}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
        />
      ) : (
        <p style={{ color: '#555', fontSize: 16, lineHeight: 1.9 }}>{post.excerpt}</p>
      )}

      {/* NeuroSpark CTA */}
      <div style={{ marginTop: 56, padding: '32px', background: NAVY, borderRadius: 16, border: '1px solid rgba(201,168,76,0.25)', textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15, marginBottom: 20 }}>
          Read the full article and more on NeuroSpark's blog.
        </p>
        <a href={`https://neurosparkcorporation.ai/blog/${post.slug}`} target="_blank" rel="noopener noreferrer">
          <button className="btn-gold">Read on NeuroSpark →</button>
        </a>
      </div>

    </div>
  );
}
