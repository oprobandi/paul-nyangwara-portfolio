/**
 * useDocumentMeta.js — Per-page SEO meta hook
 * Paul Nyang'wara Portfolio v6.2
 *
 * Sets <title>, <meta name="description">, Open Graph tags,
 * Twitter card tags, and <link rel="canonical"> on every route change.
 *
 * Supersedes useDocumentTitle.js (ADR-016).
 *
 * Note: This is client-side DOM injection only. Social media crawlers
 * (WhatsApp, LinkedIn) read the server response before JS executes, so
 * they will still see the base OG tags from index.html. Full per-page
 * crawler support requires Vite SSG (ADR-021, proposed for v7).
 *
 * Usage:
 *   useDocumentMeta({
 *     title:       'Projects & Case Studies',
 *     description: 'Real client results: AI agents, e-commerce, SEO campaigns.',
 *     canonical:   '/projects',
 *   });
 */
import { useEffect } from 'react';
import { BASE_URL, DEFAULT_IMG } from '../config.js'; // ADR-043 — update domain in one place

const BASE_TITLE  = "Paul Nyang'wara";

function setMeta(selector, attr, content) {
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    /* When creating a new element, also set the identifying attribute
       (property="og:title" or name="description") so crawlers can read it.
       Without this, newly created tags had only a content attribute — invisible
       to Open Graph and Twitter parsers (BUG-03). */
    const propMatch = selector.match(/\[property="([^"]+)"\]/);
    const nameMatch = selector.match(/\[name="([^"]+)"\]/);
    if (propMatch) el.setAttribute('property', propMatch[1]);
    if (nameMatch) el.setAttribute('name',     nameMatch[1]);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, content);
}

function setLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

export function useDocumentMeta({ title, description, image, canonical } = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${BASE_TITLE}` : BASE_TITLE;
    const fullUrl   = canonical ? `${BASE_URL}${canonical}` : BASE_URL;
    const img       = image || DEFAULT_IMG;

    // <title>
    document.title = fullTitle;

    // Standard meta
    if (description) {
      setMeta('meta[name="description"]', 'content', description);
    }

    // Open Graph
    setMeta('meta[property="og:title"]',       'content', fullTitle);
    setMeta('meta[property="og:url"]',         'content', fullUrl);
    if (description) {
      setMeta('meta[property="og:description"]', 'content', description);
    }
    setMeta('meta[property="og:image"]',       'content', img);

    // Twitter / X
    setMeta('meta[name="twitter:title"]',       'content', fullTitle);
    setMeta('meta[name="twitter:description"]', 'content', description || '');
    setMeta('meta[name="twitter:image"]',       'content', img);

    // Canonical
    setLink('canonical', fullUrl);

    return () => {
      document.title = BASE_TITLE;
    };
  }, [title, description, image, canonical]);
}
