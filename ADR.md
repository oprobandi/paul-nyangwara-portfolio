# Paul Nyang'wara Portfolio — Architecture Decision Records
**Project:** paul-nyangwara-portfolio  
**Maintained by:** Paul Nyang'wara, NeuroSpark Corporation  
**Last updated:** March 2026  
**Versions covered:** v0 – v6.7

---

## ADR Status Key
- `ACCEPTED` — in effect, not superseded
- `SUPERSEDED` — replaced by a later ADR (referenced inline)
- `DEPRECATED` — feature removed
- `PROPOSED` — agreed in principle, not yet implemented
- `IMPLEMENTED` — was PROPOSED, now done

---

## ADR-021 — Vite SSG (Static Site Generation)
**Status:** IMPLEMENTED (v6.5) ✓ — see ADR-039 and ADR-040 for implementation detail.
**Status:** ACCEPTED | **Version:** v0

React 18 + Vite 5 + React Router v6. No SSR. Rationale: fastest dev iteration, Paul's primary stack, ~150KB gzipped bundle acceptable for Kenyan 3G. Consequences: SEO limited to static meta tags — per-page OG requires SSG (see ADR-021). Alternatives rejected: Next.js (SSR overhead), CRA (deprecated), Astro.

---

## ADR-002 — Layout wrapper via React Router Outlet
**Status:** ACCEPTED | **Version:** v1-FINAL

`Layout.jsx` wraps all page routes via `<Outlet />`. Single update point for Navbar + Footer changes. Full-bleed pages require a parallel route tree outside Layout.

---

## ADR-003 — Vercel + SPA rewrite rule
**Status:** ACCEPTED | **Version:** v0

`vercel.json`: `{ "source": "/(.*)", "destination": "/index.html" }`. Stable and unchanged across all versions. Netlify `_redirects` present in v0 only.

---

## ADR-004 — Inline CSS-in-JS over Tailwind or CSS modules
**Status:** ACCEPTED (partially resolved in v6.2) | **Version:** v0

**Original:** Inline style objects + template-literal `<style>` blocks per component. No CSS framework.

**v6.2 resolution:** Shared classes (buttons, labels, keyframes, scrollbar, WCAG focus-visible, reduced-motion) extracted to `src/index.css`. Per-component style blocks retained for page-specific overrides only. Token duplication resolved by `src/constants.js` (ADR-020, now IMPLEMENTED).

**Remaining tech debt:** 14 page/component files still declare local `NAVY`, `GOLD` etc. constants that shadow `constants.js`. Full migration to import from `constants.js` is TODO for v7.

---

## ADR-005 — Legal pages as first-class routes
**Status:** ACCEPTED | **Version:** v5

`/privacy` and `/terms` as standalone routes. Kenya Data Protection Act 2019 compliance. Formspree requires a privacy policy.

---

## ADR-006 — Static meta tags in index.html
**Status:** SUPERSEDED by ADR-013 + ADR-016 | **Version:** v0–v6

Original: single static `<title>` and OG tags. Superseded: v6.1 added full OG + JSON-LD (ADR-013); v6.2 added `useDocumentMeta` for client-side per-page meta (ADR-016). Full crawler-visible per-page OG delivered via SSG in v6.5 (ADR-021, ADR-039, ADR-040).

---

## ADR-007 — WhatsApp floating widget
**Status:** ACCEPTED | **Version:** v1-FINAL

`WhatsApp.jsx` always-visible on all pages via Layout. `wa.me/254799644100` with pre-filled message. Shared number with Portfolio AI Assistant — see ADR-A002 for escalation architecture.

---

## ADR-008 — Testimonial avatar African representation requirement
**Status:** ACCEPTED | **Version:** v2

All testimonial avatars must depict Black African-presenting individuals. Unsplash photos replaced in v2. Recommended future action: replace Unsplash with real client photos (with consent).

---

## ADR-009 — Hero carousel replacing static hero
**Status:** ACCEPTED | **Version:** v3.5

4-slide auto-advancing carousel. `corridor.jpg` on slide 1. Keyboard nav + play/pause.

**v6.2 additions:** `aria-live="polite"` region, `aria-label` on `<section>`, `onFocus`/`onBlur` pause-on-focus. WCAG 2.1 AA gap now resolved.

**v6.3 resolution (ADR-028):** Slides 2–4 updated to African/Nairobi-context Unsplash photos. Inline comments mark each `bg` field for replacement with real NeuroSpark photoshoot images.

---

## ADR-010 — Social icons as inline SVG in Footer
**Status:** ACCEPTED | **Version:** v4

Inline SVG components: `IconGitHub`, `IconFacebook`, `IconX`, `IconInstagram`. Zero library overhead.

**v6.2 addition:** `IconLinkedIn` added. SOCIALS reordered: LinkedIn → GitHub → X → Instagram → Facebook.

---

## ADR-011 — Footer Quick Links nav row: added v5, removed v6
**Status:** DEPRECATED | **Version:** v5 (added), v6 (removed)

Quick Links footer nav removed in v6. Footer role: brand closure, legal compliance, social discovery — not navigation.

---

## ADR-012 — Contact email: hello@neurospark.co.ke → pnyangwara@gmail.com
**Status:** ACCEPTED | **Version:** v2

Personal portfolio routes to personal email. `hello@neurospark.co.ke` removed from NeuroSpark site before v2 was built.

---

## ADR-013 — v6.1 SEO foundation
**Status:** ACCEPTED | **Version:** v6.1

Full OG + Twitter/X card + Person + WebSite JSON-LD in `index.html`. `robots.txt` + `sitemap.xml` in `public/`. All canonical URLs reference Vercel deployment slug pending dedicated domain. `# TODO` comments mark all lines requiring domain update.

---

## ADR-014 — Gold colour standardised to NeuroSpark brand
**Status:** ACCEPTED | **Version:** v6.1

`#D4AF37` → `#C9A84C`, `#F0D060` → `#b8943e`. Zero instances of old values in any file.

---

## ADR-015 — Google Fonts: @import → index.html preconnect
**Status:** ACCEPTED | **Version:** v6.1

`@import` removed from all page `<style>` blocks. Single `<link rel="preconnect">` + `<link rel="stylesheet">` in `index.html`. Eliminates render-blocking font fetch on every route navigation.

---

## ADR-016 — Per-page useDocumentMeta hook
**Status:** ACCEPTED (client-side) / PROPOSED (crawler-visible, requires ADR-021) | **Version:** v6.1 (partial), v6.2 (full)

**v6.1:** `useDocumentTitle` — browser tab title only.  
**v6.2:** Replaced with `useDocumentMeta` — sets `<title>`, `<meta name="description">`, OG tags, Twitter cards, and `<link rel="canonical">` on every route change. All 8 pages wired with distinct title, description, and canonical path.

**Limitation:** Client-side DOM injection only. WhatsApp/LinkedIn crawlers read the server `<head>` before JS executes — they still see the base `index.html` OG tags. Full fix requires Vite SSG (ADR-021).

---

## ADR-017 — Hashnode blog integration
**Status:** ACCEPTED | **Version:** v6.1

`BlogPage.jsx` fetches from Hashnode GraphQL API via `src/api/hashnode.js`. NeuroSpark is canonical; portfolio renders previews linking back. Graceful fallback to 6 static posts on API failure. Skeleton loading prevents layout shift.

**Configuration required:** `PUBLICATION_HOST` in `src/api/hashnode.js` must be set before first deploy.

---

## ADR-018 — AI Platform project category
**Status:** ACCEPTED | **Version:** v6.1

"AI Platform" fifth filter category. Three cards: HESABU, EACTIC, HESABU PostgreSQL Schema. "View Live on NeuroSpark →" button on cards with non-null `link` field.

---

## ADR-019 — useDocumentMeta full implementation
**Status:** IMPLEMENTED (v6.2) ✓

Was PROPOSED in v6.1. Implemented as `src/hooks/useDocumentMeta.js` in v6.2. See ADR-016.

---

## ADR-020 — Centralised design tokens: src/constants.js
**Status:** IMPLEMENTED (v6.2) ✓

Was PROPOSED in v6.1. `src/constants.js` created with `C`, `FONTS`, and named exports. Pages still declare local constants — full import migration is v7 work.

---

## ADR-021 — Vite SSG migration
**Status:** IMPLEMENTED (v6.5) ✓ — see ADR-039 and ADR-040 for implementation detail.

`vite-plugin-ssg` approach was rejected in favour of a bespoke `entry-server.jsx` + `prerender.mjs` pipeline (lighter, no additional dependency). Pre-renders all routes as static HTML at build time. Solves crawler-visible per-page OG tags without Next.js.

---

## ADR-022 — React ErrorBoundary
**Status:** IMPLEMENTED (v6.2) ✓

Was PROPOSED in v6.1. `src/components/ErrorBoundary.jsx` wraps `<App />` in `main.jsx`. Recovery UI: Refresh button + WhatsApp CTA.

---

## ADR-023 — useCountUp + useInView from NeuroSpark
**Status:** IMPLEMENTED (v6.2) ✓

Was PROPOSED in v6.1. `src/hooks/useCountUp.js` and `src/hooks/useInView.js` created. SkillBar components in AboutPage, SkillsTestimonialsPage, and PaulNyangwaraLanding all count up on scroll. `prefers-reduced-motion` respected.

---

## ADR-024 — Analytics: Plausible
**Status:** IMPLEMENTED (v6.3) — commented pending domain ✓

Plausible `<script>` tag added to `index.html` as a commented-out block. Activate by replacing `yourdomain.com` and uncommenting once dedicated domain is purchased. Paul is evaluating Plausible (€9/month, privacy-first, no cookie banner, same tool as NeuroSpark).

---

## ADR-025 — Shared CSS in src/index.css
**Status:** IMPLEMENTED (v6.2) ✓

**Decision:** Extract all shared CSS classes, keyframes, scrollbar styles, and WCAG rules from per-page `<style>` template-literal blocks into `src/index.css`. Loaded once via `main.jsx`.

**What moved to index.css:** `.btn-gold`, `.btn-outline-gold`, `.section-label`, `.gold-divider`, `.tag-pill`, `.filter-btn`, `.skeleton`, scrollbar, all `@keyframes`, animation reveal fallback (`.hidden-anim`), WCAG `focus-visible` outlines for inputs/buttons/links, `prefers-reduced-motion` block.

**Result:** 4,653 chars removed from 5 page files. Page `<style>` blocks now contain only genuine page-specific rules.

**Remaining:** `PaulNyangwaraLanding.jsx` retains a large `<style>` block for carousel-specific CSS (`.carousel-wrap`, `.glass-card`, `.c-arrow`, etc.) — this is page-specific and correctly stays in the component.

---

## ADR-026 — Data arrays extracted to src/data/
**Status:** IMPLEMENTED (v6.2) ✓

**Decision:** `PROJECTS` + `CATEGORIES` extracted to `src/data/projects.js`; `SLIDES`, `PROJECTS`, `SKILLS`, `SKILLS_BARS`, `TESTIMONIALS` extracted to `src/data/landing.js`.

---

## ADR-027 — Real client testimonial photos
**Status:** PROPOSED | **Target:** v7

Replace Unsplash testimonial avatars in `src/data/landing.js` and `SkillsTestimonialsPage.jsx` with real photos of Amara Osei, Fatima Hassan, David Kiprono (and others) under written consent. Real photos measurably improve E-E-A-T.

---

## ADR-028 — African context imagery for carousel slides 2–4
**Status:** IMPLEMENTED (v6.3) ✓

Was PROPOSED in v6.2. Carousel slides 2–4 in `src/data/landing.js` updated from generic Western stock photography to African tech professional, African entrepreneur/workspace, and business analytics desk contexts. All three `bg` fields carry inline `// TODO` comments for replacement with real NeuroSpark photoshoot images.

---

## ADR-029 — Full import of constants from src/constants.js
**Status:** IMPLEMENTED (v6.7) ✓

All local `const NAVY`, `const GOLD`, `const GOLD_LIGHT`, `const OFF_WHITE`, `const CHARCOAL`, and `const DARK_BG` declarations removed from every page and component file. All 12 affected files now import from `src/constants.js`. A `DARK_BG` named export was added to `constants.js` in v6.7 to cover `Footer.jsx`.

**Files migrated in v6.6 (partial):** `PaulNyangwaraLanding.jsx`, `App.jsx` (NotFoundPage), `src/components/SkillBar.jsx`, `src/pages/landing/*.jsx`.

**Files migrated in v6.7 (completion):** `AboutPage.jsx`, `ServicesPage.jsx`, `ProjectsPage.jsx`, `BlogPage.jsx`, `BlogPostPage.jsx`, `SkillsTestimonialsPage.jsx`, `PrivacyPage.jsx`, `TermsPage.jsx`, `Navbar.jsx`, `Footer.jsx`, `WhatsApp.jsx`, `ErrorBoundary.jsx`.

**Note:** `SkillsTestimonialsPage` retains its own local `SkillBar` component — this is intentional. It takes `{ name, pct, tag }` and renders a proficiency badge ("Expert" etc.) alongside the bar, which is distinct from the shared `src/components/SkillBar.jsx` that takes `{ label, pct }`. They are not duplicates; they serve different UI requirements.

---

## ADR-030 — City landing pages (Nairobi, Kampala, Dar es Salaam)
**Status:** PROPOSED | **Target:** v7+

Thin city-specific landing pages for local SEO targeting across East Africa. Initially static, can be dynamic post-SSG migration (ADR-021).

---

## ADR-031 — Project card metric badge
**Status:** IMPLEMENTED (v6.3) ✓

**Decision:** Add a `metric: { val, label }` field to every entry in `src/data/projects.js`. Render as a gold pill badge on the card image (grid cards) and as a highlighted pill in the category row (featured cards). Surfaces the single strongest outcome without requiring the user to open the case study panel.

**Rationale:** TODO #8 from the Content Audit. Quantified outcomes on card faces improve conversion to the full case study. One metric per card is sufficient — the full `results` array remains available inside the panel.

---

## ADR-032 — NeuroSpark cross-links from portfolio pages
**Status:** IMPLEMENTED (v6.3) ✓

**Decision:** `AboutPage.jsx` — "NeuroSpark Corporation" in the bio paragraph is now a hyperlink to `https://neurosparkcorporation.ai`. `ServicesPage.jsx` — "Book via NeuroSpark ↗" third CTA button added to each service card, linking to `https://neurosparkcorporation.ai`. Both use `target="_blank" rel="noopener noreferrer"`.

**Rationale:** TODO #5. Portfolio and NeuroSpark are sibling properties; bidirectional links improve E-E-A-T and give prospects a natural path to the commercial site.

---

## ADR-033 — Blog static fallback image refresh
**Status:** IMPLEMENTED (v6.3) ✓

**Decision:** All 6 `STATIC_POSTS` image URLs in `BlogPage.jsx` replaced with African business / tech-context Unsplash photos aligned to each post's topic. Each `img` field carries an inline comment marking the intended Unsplash subject and a TODO for replacement with branded NeuroSpark navy+gold overlay images.

---

## ADR-034 — Dedicated BlogPostPage at /blog/:slug
**Status:** IMPLEMENTED (v6.4) ✓

**Decision:** Replace the inline `SinglePost` component inside `BlogPage` with a dedicated `BlogPostPage.jsx` route at `/blog/:slug`. This fixes broken blog deep-links (BUG-02), enables correct per-post `useDocumentMeta` (BUG-07), and makes all six static post slugs listed in `sitemap.xml` actually resolve. `STATIC_POSTS` extracted to `src/data/posts.js` and shared between both pages.

**Consequences:** `handlePostClick` in `BlogPage` now calls `navigate('/blog/' + post.slug)`. The `fetchPost` call that was previously lazy-loaded in `SinglePost` is now the primary load mechanism in `BlogPostPage`, with `STATIC_POSTS` as fallback.

---

## ADR-035 — Remove dangerouslySetInnerHTML from hero carousel
**Status:** IMPLEMENTED (v6.4) ✓

**Decision:** `slide.sub` in `landing.js` changed from a raw HTML string (containing `<b>` tags) to a structured array of strings and `{ accent: string }` objects. `PaulNyangwaraLanding` maps this to JSX. Eliminates the XSS vector (SEC-02) and removes the precedent of raw HTML in slide data.

**Consequences:** Any future slide sub-text with inline styling must use the `{ accent }` object format rather than raw HTML tags.

---

## ADR-036 — Security response headers via vercel.json
**Status:** IMPLEMENTED (v6.4) ✓

**Decision:** Add `Content-Security-Policy`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and `Referrer-Policy` to all responses via `vercel.json` headers. Defense-in-depth, especially important given the `dangerouslySetInnerHTML` usage (SEC-04).

**Consequences:** The CSP `connect-src` directive must be kept in sync if new external API endpoints are added (e.g. an analytics provider, a new form service).

---

## ADR-037 — Newsletter form wired to Formspree
**Status:** IMPLEMENTED (v6.4) ✓

**Decision:** Newsletter subscribe in `BlogPage` wired to Formspree form `mnjglqvo` (dedicated newsletter form, separate from the contact form `maqdryly`). Fixes the silent fake-success bug (BUG-01) where users saw "You're in!" without any data being collected.

---

## ADR-038 — Extract STATIC_POSTS to src/data/posts.js
**Status:** IMPLEMENTED (v6.4) ✓

**Decision:** `STATIC_POSTS` array moved from `BlogPage.jsx` to `src/data/posts.js` to allow import by both `BlogPage` (list) and `BlogPostPage` (single). Follows the same pattern as `projects.js` and `landing.js` (ADR-018 / TODO #25).

---

## Proposed ADRs (Not Yet Implemented)

| # | Decision | Target |
|---|---|---|
| ADR-027 | Real client testimonial photos (with consent) | v7 |
| ADR-030 | City landing pages (Nairobi, Kampala, Dar es Salaam) | v7+ |

---

## ADR-039 — SSG server render entry (entry-server.jsx)
**Status:** IMPLEMENTED (v6.5) ✓

**Decision:** Create `src/entry-server.jsx` as the Vite SSR build entry. Exports `render(url)` which wraps `AppRoutes` in `StaticRouter` from `react-router-dom/server` and calls `renderToString`. Also owns the static per-route meta map (title, description, OG image) for all 8 page routes and 6 static blog post routes derived from `STATIC_POSTS`. Returns `{ html, meta }` to the prerender script.

**Why a static meta map rather than extracting from the React render?** `useDocumentMeta` lives inside `useEffect` which does not execute during server rendering. The static map is the ground truth for crawler-visible head content; the hook handles client-side navigation as before.

**Consequences:** When a new page route is added, its meta must be added to `ROUTE_META` in `entry-server.jsx` and its path added to `ROUTES` in `prerender.mjs`. When live Hashnode blog posts go live, their slugs and meta should be added to `ROUTES` so Vercel serves pre-rendered HTML for them.

---

## ADR-040 — SSG prerender script (scripts/prerender.mjs)
**Status:** IMPLEMENTED (v6.5) ✓

**Decision:** Create `scripts/prerender.mjs` as the final step of the production build. Imports the compiled `dist/entry-server.js` bundle, reads `dist/index.html` as a template, and for each route: calls `render(url)`, string-replaces all meta tag content with route-specific values via regex, injects the rendered HTML into `<div id="root">`, and writes to `dist/<route>.html`. Outputs `dist/about.html`, `dist/services.html`, `dist/blog/ai-agents-african-smes-2025.html`, etc. Vercel's static file serving takes priority over the SPA rewrite in `vercel.json`, so crawlers receive fully-baked HTML; real users get the SPA which hydrates via `hydrateRoot`.

**Consequences:** Build time increases (two extra Vite passes + Node pre-render). Three-step build script: `vite build && vite build --ssr src/entry-server.jsx && node scripts/prerender.mjs`. Any new routes must be added to the `ROUTES` array in the prerender script. The BASE_URL string in both `entry-server.jsx` and `prerender.mjs` must be updated when the dedicated domain is purchased (same TODO as `useDocumentMeta.js`).

---

---

## ADR-041 — Lazy-load heavy routes with React.lazy + Suspense
**Status:** IMPLEMENTED (v6.6) ✓

**Decision:** Wrap `ProjectsPage`, `SkillsTestimonialsPage`, `BlogPage`, and `BlogPostPage` in `React.lazy()` in `App.jsx`. A single `<Suspense>` boundary wraps the full route tree with a `PageSkeleton` fallback (navy background + gold spinner).

**Rationale:** These four pages are the heaviest in the bundle. Lazy-loading them reduces the initial JS parsed on first load — meaningful for 3G users in Paul's target market. The homepage (`PaulNyangwaraLanding`), About, Services, Privacy, and Terms stay eagerly loaded because their JS overhead is negligible or they are frequent first-load targets.

**SSG interaction:** With SSG active (ADR-039/040), Vercel serves pre-rendered HTML before any JS runs. `React.lazy` only affects JS bundle size; the visible HTML is already in the DOM. The `PageSkeleton` fallback is shown briefly if the lazy chunk hasn't loaded by the time React hydrates — which on 3G is a real scenario. A shape-matched skeleton was used rather than a plain spinner to avoid a flash of unstyled fallback.

---

## ADR-042 — Split PaulNyangwaraLanding.jsx into sub-components
**Status:** IMPLEMENTED (v6.6) ✓

**Decision:** Refactor `PaulNyangwaraLanding.jsx` from a monolithic 867-line file into a composition shell (~140 lines) that imports six section components from `src/pages/landing/`:

| File | Responsibility |
|---|---|
| `HeroCarousel.jsx` | Carousel + rAF autoplay engine + keyboard nav (230 lines) |
| `LandingAbout.jsx` | About section + skill bars |
| `LandingProjects.jsx` | Featured projects grid |
| `LandingSkills.jsx` | Tech-stack ticker (forward + reverse rows) |
| `LandingTestimonials.jsx` | Testimonial rotator with dot/arrow nav |
| `LandingContact.jsx` | Contact form state + Formspree + SOCIALS/CONTACT_INFO data |

The global `<style>` block for shared carousel/card/form CSS classes stays in `PaulNyangwaraLanding.jsx` (injected once at the page root). Sub-components reference these classes via `className`.

**Byproduct:** `SkillBar` extracted to `src/components/SkillBar.jsx` and now imports from `src/constants.js`, eliminating one instance of local colour constant shadowing (ADR-029 partial).

---

## ADR-043 — Centralise BASE_URL in src/config.js
**Status:** IMPLEMENTED (v6.6) ✓

**Decision:** Create `src/config.js` exporting `BASE_URL` and `DEFAULT_IMG`. Remove the three independent `const BASE_URL = '...'` declarations that previously lived in `src/entry-server.jsx`, `scripts/prerender.mjs`, and `src/hooks/useDocumentMeta.js`.

**Rationale:** When the dedicated domain is purchased, updating `BASE_URL` previously required three edits in three files, with no compile-time check that all three stayed in sync. Now it is one edit in one file.

**Consequences:** `prerender.mjs` imports from `../src/config.js` using an ESM static import, which works because the prerender script runs in Node after the build. If the config module is ever made conditional on environment variables (e.g. `VITE_BASE_URL`), the import strategy for the Node script will need revisiting.

---

*End of ADR log — Paul Nyang'wara Portfolio v6.7*
