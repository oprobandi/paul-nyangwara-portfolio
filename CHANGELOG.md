# CHANGELOG — Paul Nyang'wara Portfolio
All notable changes to this project. Follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [6.7.0] — March 2026

### Changed
- **ADR-029 COMPLETE — full constants migration.** All local `const NAVY`, `const GOLD`, `const GOLD_LIGHT`, `const OFF_WHITE`, `const CHARCOAL` declarations removed from every remaining page and component file. All 12 files now import from `src/constants.js`. `DARK_BG` named export added to `constants.js` to cover `Footer.jsx` (was previously missing from the named exports).
- Files migrated: `AboutPage.jsx`, `ServicesPage.jsx`, `ProjectsPage.jsx`, `BlogPage.jsx`, `BlogPostPage.jsx`, `SkillsTestimonialsPage.jsx`, `PrivacyPage.jsx`, `TermsPage.jsx`, `Navbar.jsx`, `Footer.jsx`, `WhatsApp.jsx`, `ErrorBoundary.jsx`.
- `package.json` name updated to `Paul-portfolio-v6.7`, version bumped to `6.7.0`.

### Notes
- `SkillsTestimonialsPage` retains its own internal `SkillBar({ name, pct, tag })` — this is intentional. It renders a proficiency badge ("Expert" etc.) not present in the shared `src/components/SkillBar.jsx`. They are not duplicates.

---

## [6.6.0] — March 2026

### Added
- `src/config.js` — single source of truth for `BASE_URL` and `DEFAULT_IMG` (ADR-043). Domain update is now one edit in one file.
- `src/components/SkillBar.jsx` — shared skill progress bar extracted from `PaulNyangwaraLanding.jsx`. Imports colours from `src/constants.js` (ADR-029 partial).
- `src/pages/landing/HeroCarousel.jsx` — hero carousel + rAF autoplay engine extracted from landing page (ADR-042).
- `src/pages/landing/LandingAbout.jsx` — About section extracted from landing page (ADR-042).
- `src/pages/landing/LandingProjects.jsx` — Projects preview section extracted from landing page (ADR-042).
- `src/pages/landing/LandingSkills.jsx` — Tech-stack ticker section extracted from landing page (ADR-042).
- `src/pages/landing/LandingTestimonials.jsx` — Testimonial rotator extracted from landing page (ADR-042).
- `src/pages/landing/LandingContact.jsx` — Contact form with full Formspree submission logic extracted from landing page (ADR-042).

### Changed
- `src/pages/PaulNyangwaraLanding.jsx` — refactored from 867 lines to ~140-line composition shell. Imports section components from `src/pages/landing/`. Local `NAVY`/`GOLD` constants replaced with `src/constants.js` imports (ADR-029 partial, ADR-042).
- `src/App.jsx` — `ProjectsPage`, `SkillsTestimonialsPage`, `BlogPage`, `BlogPostPage` wrapped in `React.lazy()`. Single `<Suspense fallback={<PageSkeleton />}>` wraps the route tree. `NotFoundPage` local colour constants replaced with `src/constants.js` imports (ADR-041, ADR-029 partial).
- `src/entry-server.jsx` — `BASE_URL` / `DEFAULT_IMG` now imported from `src/config.js` (ADR-043).
- `src/hooks/useDocumentMeta.js` — `BASE_URL` / `DEFAULT_IMG` now imported from `src/config.js` (ADR-043).
- `scripts/prerender.mjs` — `BASE_URL` now imported from `src/config.js`; stale local redeclaration inside `injectMeta()` removed (ADR-043).

### Fixed
- **BUG — App.jsx duplicate block (v6.5 regression):** `App.jsx` was shipped in v6.5 with its entire content duplicated from line 162 onward. The duplicate contained a second `export default function App()` — the pre-v6.5 shape without the `AppRoutes` refactor. Vite resolves to the first default export, so the duplicate was inert at runtime, but it would fail strict ESM parsers and linters, and the stale code posed a future maintenance hazard. The duplicate has been removed. The fix is documented in the `App.jsx` file header for future reference.
- **ADR.md — four documentation bugs carried over from v6.5:**
  - Header `Versions covered` updated from `v0 – v6.3` to `v0 – v6.6`.
  - Duplicate ADR-021 full entry (the one still reading `PROPOSED | Target: v7`) replaced with the correct `IMPLEMENTED (v6.5)` entry.
  - ADR-006 stale note ("Full crawler-visible per-page OG still requires SSG, PROPOSED for v7") updated to reflect SSG was delivered in v6.5.
  - Proposed ADRs table updated: ADR-041 and ADR-042 removed from the table and added as `IMPLEMENTED (v6.6)` entries.

---

## [6.5.0] — March 2026

### Added
- `src/entry-server.jsx` — New SSG server render entry. Exports `render(url)` which calls `ReactDOM.renderToString` with `StaticRouter` and returns the rendered HTML plus a per-route meta object (title, description, OG image). Contains a static meta map for all 8 page routes and all 6 static blog post routes. (ADR-021)
- `scripts/prerender.mjs` — New post-build SSG script. Runs after both Vite builds and produces a `.html` file per route in `dist/`. For each route: calls `render(url)`, string-replaces `<title>`, `og:title`, `og:description`, `og:url`, `og:image`, `twitter:title`, `twitter:description`, `twitter:image`, and `<link rel="canonical">` with route-specific values, injects the rendered React HTML into `<div id="root">`, and writes to `dist/<route>.html`. Vercel serves these static files directly to crawlers; the SPA rewrite in `vercel.json` handles all other routes. (ADR-021)
- `src/App.jsx` — `AppRoutes` exported as a named export alongside the existing default `App`. `AppRoutes` contains the `<Routes>` tree without a router provider, allowing `entry-server.jsx` to wrap it in `StaticRouter`. The default `App` export wraps `AppRoutes` in `BrowserRouter` as before — `main.jsx` is unchanged. (ADR-021)

### Changed
- `src/main.jsx` — Imports both `hydrateRoot` and `createRoot` from `react-dom/client`. Checks whether the root div contains pre-rendered HTML; uses `hydrateRoot` if so (production SSG), `createRoot` if not (dev / non-pre-rendered routes). `hydrateRoot` attaches event handlers to existing DOM without re-rendering, eliminating the flash that `createRoot` would cause on SSG pages. (ADR-021)
- `vite.config.js` — `ssr.noExternal: ['dompurify']` added. Bundles dompurify into the server entry rather than externalising it, ensuring the gracefully-degraded (no-DOM) instance is used in Node rather than triggering a require() error. (ADR-021)
- `package.json` — Version bumped to `6.5.0`. `build` script updated to three sequential steps: `vite build` (client), `vite build --ssr src/entry-server.jsx` (server), `node scripts/prerender.mjs` (pre-render). `build:client` and `build:server` added as standalone scripts for debugging individual build steps.
- `src/pages/PaulNyangwaraLanding.jsx` — Formspree `_gotcha` honeypot field added to the contact form. Hidden from users (`display:none`, `tabIndex=-1`, `aria-hidden`), caught by Formspree bot-detection. Complements the reCAPTCHA enabled on the Formspree dashboard (SEC-03).
- `src/pages/BlogPage.jsx` — Same `_gotcha` honeypot added to the newsletter subscribe form (SEC-03).
- `ADR.md` — ADR-039 (SSG entry-server) and ADR-040 (prerender script) added; ADR-021 marked IMPLEMENTED.
- `TODO.md` — ADR-021 and SEC-03 marked complete.

### Not Changed (deferred)
- Constants migration (ADR-029) — deferred to v7.
- Lazy-loaded routes (ADR-040 proposed) — deferred to v7.
- Split PaulNyangwaraLanding into sub-components (ADR-039 proposed) — deferred to v7.
- All domain-URL TODOs (`paul-nyangwara-portfolio.vercel.app`) — unchanged pending domain purchase.

### Deploy note
Run `npm install` if pulling fresh (no new packages added in this patch; this note is for completeness). The production `npm run build` now takes three steps and produces pre-rendered `.html` files alongside the usual `dist/assets/`. No changes required to Vercel project settings.

---



## [6.4.0] — March 2026

### Security
- `src/pages/BlogPostPage.jsx` — All Hashnode API HTML is now sanitized with `DOMPurify.sanitize()` before `dangerouslySetInnerHTML` render. Eliminates stored XSS vector that existed when `post.content` was rendered raw (SEC-01 / ADR-034).
- `src/data/landing.js` + `src/pages/PaulNyangwaraLanding.jsx` — `slide.sub` changed from a raw HTML string (containing a `<b>` tag) to a structured array `[string, { accent: string }, string]`. The renderer maps this to JSX `<span>` elements. `dangerouslySetInnerHTML` removed from the carousel (SEC-02 / ADR-035).
- `vercel.json` — Security response headers added: `Content-Security-Policy`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin` (SEC-04 / ADR-036).
- `package.json` — `dompurify ^3.1.6` added to dependencies. Run `npm install` after pulling this version.

### Added
- `src/pages/BlogPostPage.jsx` — New dedicated single-post page at `/blog/:slug`. Fetches from Hashnode API with static `STATIC_POSTS` fallback. Sets full per-post `useDocumentMeta` (title, description, OG, Twitter, canonical). DOMPurify-sanitized content render (BUG-02, BUG-07 / ADR-034).
- `src/data/posts.js` — `STATIC_POSTS` array extracted from `BlogPage.jsx`. Shared by `BlogPage` (list) and `BlogPostPage` (single post) (ADR-038).

### Fixed
- `src/pages/BlogPage.jsx` — Newsletter `handleSubscribe` now POSTs to Formspree (`mnjglqvo`). Returns loading state, surfaces errors, only shows success on `res.ok`. Previously showed success with no network call (BUG-01).
- `src/pages/BlogPage.jsx` — `handlePostClick` now calls `navigate('/blog/' + post.slug)` instead of setting inline state. Blog post URLs are now deep-linkable and indexable (BUG-02).
- `src/pages/BlogPage.jsx` — Corrupted CSS fragments (orphaned property-value pairs with no selectors) purged from the `styles` template literal. Shared classes already in `index.css` removed from the block (BUG-06).
- `src/hooks/useDocumentMeta.js` — `setMeta()` now extracts the `property` or `name` attribute from the selector string and sets it on newly created elements. Previously created bare `<meta content="...">` tags with no identifying attribute (BUG-03).
- `src/components/Navbar.jsx` — `useEffect` now closes the mobile menu on `pathname` change (via `useLocation`), not just on mount. Previously the menu stayed open on programmatic navigation (BUG-04).
- `src/components/Navbar.jsx` — `goToContact` now passes `{ state: { scrollTo: "contact" } }` through `navigate` instead of a hard-coded `setTimeout`. `PaulNyangwaraLanding` reads `location.state` on mount and scrolls once the DOM is ready. Reliable on 3G (BUG-05).
- `src/pages/PaulNyangwaraLanding.jsx` — Project image `onMouseEnter`/`onMouseLeave` DOM mutation replaced with `.project-img` / `.project-card:hover .project-img` CSS rule in `index.css` (BUG-08).
- `src/pages/PaulNyangwaraLanding.jsx` — Contact form `handleSubmit` now runs `validate()` before the `fetch` call: checks name presence, email format (regex), service selection, and minimum message length of 20 characters (CQ-03).
- `src/App.jsx` — `/blog/:slug` route added, pointing to `BlogPostPage`. Route map comment updated (BUG-02 / ADR-034).

### Removed
- `src/hooks/useDocumentTitle.js` — Deleted. Superseded by `useDocumentMeta` since v6.2 (ADR-016). Was dead code with no imports (CQ-02).
- `src/pages/BlogPage.jsx` — `SinglePost` inline component removed. Functionality moved to `BlogPostPage.jsx` (ADR-034).
- `src/pages/BlogPage.jsx` — `STATIC_POSTS` array removed; now imported from `src/data/posts.js` (ADR-038).

### Not Changed (deferred)
- Constants migration (ADR-029) — local `NAVY`, `GOLD` declarations in 14 files — deferred to v7.
- `GOLD_LIGHT` rename to `goldHover`/`goldDark` — deferred to v7 with constants migration (ADR-029).
- Vite SSG migration (ADR-021) — deferred to v7.
- All domain-URL TODOs (`paul-nyangwara-portfolio.vercel.app`) — unchanged pending domain purchase.

---



---

## [6.3.0] — March 2026

### Added
- `index.html` — Plausible Analytics `<script>` tag added as a commented-out block (ADR-024). Activate by replacing `yourdomain.com` and uncommenting once dedicated domain is purchased. Zero impact until uncommented.
- `src/data/projects.js` — `metric: { val, label }` field added to all 9 project entries. Surfaces the single strongest outcome on each card face without opening the case study panel (ADR-031, TODO #8).
- `src/pages/ProjectsPage.jsx` — metric badge rendered as a gold pill on the image thumbnail (grid cards) and as a highlighted pill in the category tag row (featured cards). Uses `project.metric` guard so older data without the field degrades gracefully.
- `src/pages/ServicesPage.jsx` — "Book via NeuroSpark ↗" third CTA button added to each service card, linking to `https://neurosparkcorporation.ai` (ADR-032, TODO #5).
- `public/sitemap.xml` — 6 blog post slug entries added matching the `STATIC_POSTS` slugs in `BlogPage.jsx`. Marked with `<!-- TODO -->` for replacement with live Hashnode slugs and real domain (TODO #9).

### Changed
- `src/data/landing.js` — Carousel slides 2–4 `bg` fields updated from generic Western stock photography to African/Nairobi-context Unsplash images (ADR-028, TODO #17):
  - Slide 2 (AI): African tech professional at laptop (`photo-1573164713988-8665fc963095`)
  - Slide 3 (Web): African entrepreneur / modern workspace (`photo-1600880292203-757bb62b4baf`)
  - Slide 4 (SEO): Business analytics desk context (`photo-1454165804606-c3d57bc86b40`)
  - Each `bg` field carries an inline `// TODO` comment for replacement with real NeuroSpark photoshoot images.
- `src/pages/BlogPage.jsx` — All 6 `STATIC_POSTS` image URLs updated to African business / tech-context Unsplash photos aligned to each post topic (ADR-033, TODO #21). Each carries an inline comment noting subject and a TODO for branded navy+gold overlay replacement.
- `src/pages/AboutPage.jsx` — "NeuroSpark Corporation" in the bio paragraph now links to `https://neurosparkcorporation.ai` with `target="_blank" rel="noopener noreferrer"` (ADR-032, TODO #5).
- `package.json` — version bumped to `6.3.0`.
- `ADR.md` — ADR-024 marked IMPLEMENTED, ADR-027 PROPOSED status confirmed, ADRs 028–033 added.
- `TODO.md` — items #5, #8, #9, #14, #17, #21 marked complete.

### Not Changed (deferred)
- `PaulNyangwaraLanding.jsx` (822 lines) — untouched this patch.
- `SkillsTestimonialsPage.jsx` (594 lines) — untouched this patch.
- All domain-URL TODOs (`paul-nyangwara-portfolio.vercel.app`) — unchanged pending domain purchase.
- ADR-021 (SSG), ADR-027 (real testimonial photos), ADR-029 (constants migration), ADR-030 (city pages) — v7.

---

## [6.2.0] — March 2026

### Added
- `src/constants.js` — centralised design tokens (`C`, `FONTS`, named exports). Single source of truth for `NAVY`, `GOLD`, `GOLD_LIGHT`, `OFF_WHITE`, `CHARCOAL`. Eliminates duplication across 14+ files (ADR-020).
- `src/index.css` — shared stylesheet extracted from per-page `<style>` blocks. Includes: button classes, section labels, gold divider, tag pills, filter buttons, skeleton loading, ticker, scrollbar styling, all keyframes, animation reveal fallback, WCAG focus-visible outlines for all interactive elements, `prefers-reduced-motion` media query (ADR-004 tech debt resolution).
- `src/hooks/useInView.js` — shared IntersectionObserver hook. Replaces 8 local copies (one per page). Single import, consistent 0.1 threshold.
- `src/hooks/useCountUp.js` — count-up animation hook ported from NeuroSpark v3.0. Animates numbers from 0 to target only when element enters viewport. Respects `prefers-reduced-motion`. (TODO #12, ADR-023)
- `src/hooks/useDocumentMeta.js` — full per-page SEO meta hook. Sets `<title>`, `<meta name="description">`, Open Graph tags, Twitter/X card tags, and `<link rel="canonical">` on every route change. Supersedes `useDocumentTitle.js`. (ADR-016, TODO #4)
- `src/components/AnimSection.jsx` — shared scroll-triggered fade-in wrapper. Replaces local definitions in all 8 pages.
- `src/components/ErrorBoundary.jsx` — React class ErrorBoundary wrapping the full app in `main.jsx`. Renders a recovery UI (Refresh + WhatsApp CTA) instead of blank white screen on uncaught errors. (TODO #13, ADR-022)
- `src/data/projects.js` — PROJECTS array and CATEGORIES extracted from `ProjectsPage.jsx`. (TODO #25)
- `src/data/landing.js` — SLIDES, PROJECTS, SKILLS, SKILLS_BARS, TESTIMONIALS extracted from `PaulNyangwaraLanding.jsx`. (TODO #25)
- `CHANGELOG.md` — this file.
- LinkedIn social link added to `Footer.jsx` SOCIALS array (first position). `IconLinkedIn` inline SVG component added. (TODO #20)
- Hero slide 1 — trust pill badge: "✓ Trusted by 150+ East African businesses" above CTAs. (TODO #18)
- Hero slide 1 — secondary ghost CTA "See My Work →" linking to `/projects`. (TODO #19)
- Carousel `aria-label`, `aria-live="polite"` region, and `onFocus`/`onBlur` pause-on-focus for WCAG 2.1 AA compliance. (ADR-009 known gap, TODO #16)
- `width` and `height` attributes on all major `<img>` tags (footer logo, blog card images, blog hero, About headshot, Navbar logo) to eliminate CLS. (TODO #10)

### Changed
- `main.jsx` — imports `./index.css` and wraps `<App />` in `<ErrorBoundary>`.
- `useDocumentMeta` wired into all 8 pages with distinct, accurate per-page title, description, and canonical path.
- `SkillBar` in `AboutPage.jsx`, `SkillsTestimonialsPage.jsx`, and `PaulNyangwaraLanding.jsx` — count-up on scroll via `useCountUp`.
- `ProjectsPage.jsx` and `PaulNyangwaraLanding.jsx` — import data from `src/data/`.
- `hashnode.js` `normaliseHashnodePost` — `author.avatar` hardcoded to `/paul-headshot.jpg` for E-E-A-T.
- `Footer.jsx` SOCIALS reordered: LinkedIn → GitHub → X → Instagram → Facebook.
- CSS deduplication: 4,653 chars of duplicate class definitions stripped from 5 page files.

### Fixed
- Hero carousel structural regression from v6.1 data extraction — fully restored.
- Gold colour `#D4AF37` → `#C9A84C` confirmed zero instances remaining.

---

## [6.1.0] — March 2026

### Added
- `src/hooks/useDocumentTitle.js` — per-page browser tab title hook. Wired into all 8 pages.
- `src/api/hashnode.js` — Hashnode GraphQL API client. Replaces static blog posts.
- Full OG + Twitter/X card + Person + WebSite JSON-LD schema in `index.html`.
- `public/robots.txt` and `public/sitemap.xml`.
- 3 new project cards: HESABU, EACTIC, HESABU PostgreSQL Schema. "AI Platform" filter category.
- 3 new skills: Multi-Agent System Design, Regulatory-Aware AI Systems, Audit-Grade System Design.
- `BlogPage.jsx` fully rebuilt: Hashnode integration, skeleton loading, Retry button, sidebar.
- `ADR.md` — founding ADR log (ADRs 001–018 + PROPOSED 019–024).
- `TODO.md` — 30-item improvement backlog.

### Changed
- Gold colour standardised: `#D4AF37` → `#C9A84C`, `#F0D060` → `#b8943e` across all files (ADR-014).
- Google Fonts: `@import` removed from all 8 pages; single preconnect in `index.html` (ADR-015).
- `package.json` version: 1.0.0 → 6.1.0.

---

## [6.0.0] – [0.1.0]
*(See v6.2 CHANGELOG for full prior history)*

---

*Maintained by Paul Nyang'wara · NeuroSpark Corporation · Nairobi, Kenya*
