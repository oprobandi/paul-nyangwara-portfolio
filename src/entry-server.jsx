/**
 * entry-server.jsx — SSG server render entry
 * Paul Nyang'wara Portfolio v6.5
 *
 * Built by `vite build --ssr src/entry-server.jsx` into dist/entry-server.js.
 * Called by scripts/prerender.mjs once per route during the production build.
 *
 * Exports a single `render(url)` function that:
 *  1. Renders the full React tree to an HTML string via renderToString + StaticRouter.
 *  2. Returns the rendered HTML plus the per-route meta object used by the
 *     prerender script to replace <title>, OG, Twitter, and canonical tags
 *     in the dist/index.html template.
 *
 * Why a static meta map here rather than reading from useDocumentMeta?
 *   useDocumentMeta runs inside useEffect which does not execute during
 *   server rendering. The static map is the source of truth for the initial
 *   HTML that crawlers and social media bots receive. The hook still runs
 *   client-side for in-app navigation (SPA behaviour is preserved).
 *
 * TODO: Update BASE_URL once dedicated domain is purchased (same as
 *       useDocumentMeta.js and index.html).
 */

import { renderToString }   from 'react-dom/server';
import { StaticRouter }     from 'react-router-dom/server';
import React                from 'react';
import { AppRoutes }        from './App.jsx';
import { STATIC_POSTS }     from './data/posts.js';
import { BASE_URL, DEFAULT_IMG } from './config.js'; // ADR-043

/* ── Per-route meta map ───────────────────────────────────────────── */
const ROUTE_META = {
  '/': {
    title:       "Paul Nyang'wara | AI Developer & NeuroSpark CEO, Nairobi",
    description: "Founder & CEO of NeuroSpark Corporation. I build AI agents, automate workflows, and grow search rankings for businesses across East Africa.",
    image:       DEFAULT_IMG,
  },
  '/about': {
    title:       "About | Paul Nyang'wara",
    description: "Learn about Paul Nyang'wara — Founder & CEO of NeuroSpark Corporation, AI developer, and digital strategist based in Nairobi, Kenya.",
    image:       DEFAULT_IMG,
  },
  '/services': {
    title:       "Services | Paul Nyang'wara",
    description: "AI agents, workflow automation, web development, and SEO services for African businesses. Delivered by NeuroSpark Corporation.",
    image:       DEFAULT_IMG,
  },
  '/projects': {
    title:       "Projects & Case Studies | Paul Nyang'wara",
    description: "Real client results: AI agents, e-commerce platforms, SEO campaigns, and automation systems built for East African businesses.",
    image:       DEFAULT_IMG,
  },
  '/blog': {
    title:       "Blog — AI, Automation & Business in Kenya | Paul Nyang'wara",
    description: "Insights on AI automation, SEO, and running a business in Kenya from Paul Nyang'wara, Founder of NeuroSpark Corporation.",
    image:       DEFAULT_IMG,
  },
  '/skills': {
    title:       "Skills & Testimonials | Paul Nyang'wara",
    description: "Technical skills, certifications, and client testimonials for Paul Nyang'wara — AI developer and NeuroSpark Corporation CEO.",
    image:       DEFAULT_IMG,
  },
  '/privacy': {
    title:       "Privacy Policy | Paul Nyang'wara",
    description: "Privacy Policy for Paul Nyang'wara Portfolio and NeuroSpark Corporation. Kenya Data Protection Act 2019 compliant.",
    image:       DEFAULT_IMG,
  },
  '/terms': {
    title:       "Terms of Service | Paul Nyang'wara",
    description: "Terms of Service for Paul Nyang'wara Portfolio and NeuroSpark Corporation.",
    image:       DEFAULT_IMG,
  },
};

/* Add per-post meta from STATIC_POSTS so all six blog slugs
   in sitemap.xml resolve to real HTML files with correct OG tags. */
STATIC_POSTS.forEach(post => {
  ROUTE_META[`/blog/${post.slug}`] = {
    title:       `${post.title} | Paul Nyang'wara`,
    description: post.excerpt,
    image:       post.img,
  };
});

/* ── render() ─────────────────────────────────────────────────────── */
export function render(url) {
  const html = renderToString(
    <StaticRouter location={url}>
      <AppRoutes />
    </StaticRouter>
  );

  const meta = ROUTE_META[url] ?? {
    title:       "Paul Nyang'wara | AI Developer & NeuroSpark CEO",
    description: "Building AI agents and digital solutions for businesses across East Africa.",
    image:       DEFAULT_IMG,
  };

  return { html, meta };
}
