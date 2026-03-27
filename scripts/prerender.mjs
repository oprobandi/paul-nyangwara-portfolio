/**
 * scripts/prerender.mjs — SSG pre-render script
 * Paul Nyang'wara Portfolio v6.5
 *
 * Runs as the final step of `npm run build`:
 *   vite build                               ← client bundle  → dist/
 *   vite build --ssr src/entry-server.mjsx    ← server bundle  → dist/entry-server.mjs
 *   node scripts/prerender.mjs               ← this script
 *
 * For each route in ROUTES:
 *   1. Calls render(url) from the compiled server bundle.
 *   2. String-replaces <title>, meta description, Open Graph, Twitter
 *      Card, and canonical tags in the dist/index.html template with
 *      route-specific values from entry-server's meta map.
 *   3. Injects the React-rendered HTML into <div id="root">.
 *   4. Writes the result to dist/<route>.html (or dist/index.html for /).
 *
 * Vercel serves static files before applying the SPA rewrite in
 * vercel.json. So dist/about.html is served directly for /about,
 * giving crawlers fully-baked <head> meta. Routes not in this list
 * (e.g. dynamic blog posts not in STATIC_POSTS) fall back to the SPA.
 *
 * TODO (domain): Update BASE_URL in src/config.js — that is now the only file to change.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname }  from 'path';
import { fileURLToPath }     from 'url';
import { BASE_URL }          from '../src/config.js'; // ADR-043 — update domain in one place

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
const root       = resolve(__dirname, '..');
const toAbs      = (...parts) => resolve(root, ...parts);

/* ── Import the SSR bundle built by `vite build --ssr` ───────────── */
const { render } = await import(toAbs('dist', 'entry-server.mjs'));

/* ── Read the client-side HTML template ──────────────────────────── */
const template = readFileSync(toAbs('dist', 'index.html'), 'utf-8');

/* ── Routes to pre-render ────────────────────────────────────────── */
// Matches all routes in App.jsx + all six static blog slugs from sitemap.xml.
// Add live Hashnode slugs here once the blog is active.
const ROUTES = [
  '/',
  '/about',
  '/services',
  '/projects',
  '/blog',
  '/skills',
  '/privacy',
  '/terms',
  '/blog/ai-agents-african-smes-2025',
  '/blog/mpesa-daraja-integration-guide',
  '/blog/nairobi-seo-playbook-2025',
  '/blog/langchain-whatsapp-chatbot',
  '/blog/nextjs-kenya-3g-performance',
  '/blog/ai-automation-roi-sme',
];

/* ── HTML escape for injected attribute values ───────────────────── */
const escAttr = (str) =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

/* ── Replace meta tags in the template with route-specific values ── */
function injectMeta(html, url, meta) {
  const canonical = `${BASE_URL}${url === '/' ? '' : url}`;
  const image     = meta.image || `${BASE_URL}/paul-headshot.jpg`;
  const title     = escAttr(meta.title);
  const desc      = escAttr(meta.description);

  return html
    // <title>
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    // <meta name="description">
    .replace(
      /(<meta\s+name="description"\s+content=")[^"]*(")/,
      `$1${desc}$2`
    )
    // Open Graph
    .replace(/(<meta\s+property="og:title"\s+content=")[^"]*(")/,       `$1${title}$2`)
    .replace(/(<meta\s+property="og:description"\s+content=")[^"]*(")/,  `$1${desc}$2`)
    .replace(/(<meta\s+property="og:url"\s+content=")[^"]*(")/,          `$1${canonical}$2`)
    .replace(/(<meta\s+property="og:image"\s+content=")[^"]*(")/,        `$1${escAttr(image)}$2`)
    // Twitter / X card
    .replace(/(<meta\s+name="twitter:title"\s+content=")[^"]*(")/,       `$1${title}$2`)
    .replace(/(<meta\s+name="twitter:description"\s+content=")[^"]*(")/,  `$1${desc}$2`)
    .replace(/(<meta\s+name="twitter:image"\s+content=")[^"]*(")/,        `$1${escAttr(image)}$2`)
    // Canonical
    .replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/,               `$1${canonical}$2`);
}

/* ── Write a route's HTML file to dist/ ─────────────────────────── */
function routeToOutPath(route) {
  // '/'      → dist/index.html
  // '/about' → dist/about.html
  // '/blog/slug' → dist/blog/slug.html
  if (route === '/') return toAbs('dist', 'index.html');
  return toAbs('dist', `${route.slice(1)}.html`);
}

/* ── Main ────────────────────────────────────────────────────────── */
console.log('\n🔨 SSG pre-render starting…\n');

let ok = 0;
let failed = 0;

for (const route of ROUTES) {
  try {
    const { html: appHtml, meta } = render(route);

    let pageHtml = injectMeta(template, route, meta);
    // Inject rendered app HTML into the root div
    pageHtml = pageHtml.replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`
    );

    const outPath = routeToOutPath(route);
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, pageHtml, 'utf-8');

    console.log(`  ✓  ${route}`);
    ok++;
  } catch (err) {
    console.error(`  ✗  ${route} — ${err.message}`);
    failed++;
  }
}

console.log(`\n${ok} route${ok !== 1 ? 's' : ''} pre-rendered${failed ? `, ${failed} failed` : ''}.`);

if (failed > 0) {
  process.exit(1); // Fail the build if any route errors
}

console.log('✅ SSG complete.\n');
