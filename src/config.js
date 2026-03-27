/**
 * config.js — Site-wide configuration
 * Paul Nyang'wara Portfolio v6.6
 *
 * Single source of truth for the deployment URL.
 * Imported by: entry-server.jsx, useDocumentMeta.js, scripts/prerender.mjs
 *
 * TODO (ADR-043): When the dedicated domain is purchased, update BASE_URL
 * here — this is the only file that needs changing.
 */

export const BASE_URL    = 'https://paul-nyangwara-portfolio.vercel.app';
export const DEFAULT_IMG = `${BASE_URL}/paul-headshot.jpg`;
