# Paul Nyang'wara Portfolio — Architecture Decision Records
**Project:** paul-nyangwara-portfolio  
**Maintained by:** Paul Nyang'wara, NeuroSpark Corporation  
**Last updated:** March 2026  
**Versions covered:** v0 – v6.1

> This document is the canonical ADR log for the portfolio website. ADRs 001–012 were
> reconstructed from source-code diff analysis across all prior zip archives (documented in
> the March 2026 ADR & Version Report). ADRs 013 onwards are recorded in real time.
>
> **ADR Status key:**
> - `ACCEPTED` — decision in effect, not superseded
> - `SUPERSEDED` — replaced by a later ADR (referenced inline)
> - `DEPRECATED` — feature removed
> - `PROPOSED` — agreed in principle, not yet implemented

---

## Version History (Quick Reference)

| Version | Key Change | ADR(s) |
|---|---|---|
| v0 | React + Vite scaffolding, 6 pages, Vercel deploy | ADR-001, ADR-003 |
| v1-FINAL | Layout wrapper + WhatsApp widget + headshot asset | ADR-002, ADR-007 |
| v2 | Testimonial avatar representation fix; email → pnyangwara@gmail.com | ADR-008, ADR-012 |
| v3 | Re-export of v2; no source changes | — |
| v3-updated | favicon.jpg added to public/ | — |
| v3.5 (UPDATED-LANDING) | Hero carousel replacing static hero; corridor.jpg | ADR-009 |
| v4 | Footer social icons (inline SVG); Navbar Home link | ADR-010 |
| v5 | Privacy + Terms pages; footer legal links + Quick Links nav | ADR-005, ADR-011 |
| v6 | Quick Links nav row removed from Footer; footer simplified | ADR-011 (superseded) |
| v6.1 | SEO package; Hashnode blog; 3 new project cards; useDocumentTitle; gold standardisation | ADR-013 – ADR-018 |

---

## ADR-001 — React + Vite as the core framework
**Status:** ACCEPTED  
**Version:** v0

**Decision:** React 18 + Vite 5 + React Router v6. No SSR framework (no Next.js).

**Rationale:** Vite HMR is 10–20× faster than CRA. React Router v6 nested routes map cleanly to the Layout + Pages architecture. Paul's primary stack is React + Vite — zero ramp-up. Bundle size (~150KB gzipped) is acceptable for Kenyan 3G users.

**Consequences:** SEO limited to static meta tags in index.html. Per-page OG tags require either a custom hook (ADR-006, ADR-013) or migration to Next.js / Vite SSG. All routes share one JS bundle.

**Alternatives rejected:** Next.js 14 (SSR overhead not needed for static portfolio), Create React App (deprecated), Astro (React proficiency advantage outweighed flexibility).

**Future consideration:** Vite SSG (`vite-plugin-ssg`) would solve per-page OG tags with minimal architecture change. Recommended for v7 if SEO becomes a primary driver.

---

## ADR-002 — Layout wrapper via React Router Outlet pattern
**Status:** ACCEPTED  
**Version:** v1-FINAL

**Decision:** `Layout.jsx` wraps all page routes using React Router's `<Outlet />` pattern. A single `<Route element={<Layout />}>` parent in `App.jsx` propagates Navbar and Footer to all pages.

**Rationale:** Single update point for shared UI — touched once, all pages updated. Eliminates version drift between page-level Navbar/Footer imports (which caused the v1 inconsistency that prompted this change).

**Consequences:** Full-bleed pages (if needed in future) require a parallel route tree outside the Layout wrapper. Privacy and Terms (v5) reused Layout with zero wiring.

---

## ADR-003 — Vercel deployment with SPA rewrite rule
**Status:** ACCEPTED  
**Version:** v0

**Decision:** Deploy to Vercel. `vercel.json` contains a universal SPA rewrite: `{ "source": "/(.*)", "destination": "/index.html" }`. Netlify `_redirects` present in v0 as a fallback — removed from v1 onwards.

**Rationale:** Vercel is Paul's primary deployment platform. The rewrite rule handles all SPA routing edge cases in three lines. `_redirects` removed once Vercel confirmed as sole target.

**Consequences:** All routes resolve server-side to `index.html`; React Router handles client-side matching. `vercel.json` has been unchanged across all versions.

---

## ADR-004 — Inline CSS-in-JS styling over Tailwind or CSS modules
**Status:** ACCEPTED (with known tech debt — see ADR-013 note)  
**Version:** v0

**Decision:** Inline style objects + template-literal CSS strings injected via `<style>` tags per component. Design tokens as component-top constants: `const NAVY`, `const GOLD`, etc. No CSS framework, no CSS modules.

**Rationale:** Zero PostCSS/Tailwind configuration overhead. Token consistency enforced at the JS level. Rapid visual iteration without class-name lookups. Style co-location reduces cognitive overhead.

**Known tech debt (from March 2026 UX Audit):** Tokens are duplicated across 14+ files. Template-literal `<style>` blocks are injected per render (SSR-unsafe, but SSR is not used). Google Fonts `@import` inside `<style>` blocks blocks rendering (fixed in v6.1 — see ADR-015).

**Recommended for v7:** Extract shared tokens to `src/constants.js` mirroring NeuroSpark's `C`, `DARK`, and `FONTS` export structure. Replace per-page `@import` with the centralised `index.html` font loading introduced in v6.1.

---

## ADR-005 — Legal pages as first-class routes
**Status:** ACCEPTED  
**Version:** v5

**Decision:** `PrivacyPage.jsx` and `TermsPage.jsx` registered at `/privacy` and `/terms`. Linked from Footer legal section.

**Rationale:** Kenya Data Protection Act 2019 requires disclosure of data processing purposes. Formspree's terms require a privacy policy. WhatsApp integration routes contact data to a personal number — must be disclosed. First-class routes are directly linkable and indexable; modals are not.

---

## ADR-006 — Static meta tags in index.html — no per-page dynamic meta
**Status:** SUPERSEDED by ADR-013 (partial)  
**Version:** v0–v6

**Decision (original):** Single static `index.html` with one `<title>` and one set of OG tags. No `react-helmet`, no `useDocumentTitle` hook.

**Rationale (original):** Homepage OG preview is the dominant sharing scenario. Per-page OG tags require SSR or prerendering.

**Superseded by ADR-013:** `useDocumentTitle` hook introduced in v6.1 provides per-page browser tab titles. Full per-page OG/canonical requires further work (see `PROPOSED` ADR-016).

---

## ADR-007 — WhatsApp widget as primary real-time contact channel
**Status:** ACCEPTED  
**Version:** v1-FINAL

**Decision:** Floating `WhatsApp.jsx` widget on all pages via Layout. Links to `wa.me/254799644100` with pre-filled message.

**Rationale:** WhatsApp penetration in Kenya exceeds 90% among smartphone users. Floating widget is always-visible without interrupting content flow. `wa.me` deep link opens WhatsApp directly on mobile without saving a contact.

**Note:** The WhatsApp number is shared between the portfolio widget and the Portfolio AI Assistant. Both route to +254 799 644 100. This is intentional — see Portfolio AI Assistant ADR-A002 for the two-part escalation architecture that prevents a feedback loop.

---

## ADR-008 — Testimonial avatars: African representation requirement
**Status:** ACCEPTED  
**Version:** v2

**Decision:** All testimonial avatar photos must depict Black African-presenting individuals, consistent with the named Kenyan clients (Amara Osei, Fatima Hassan, David Kiprono).

**Rationale:** Brand alignment with Paul's 'Africa First' principle. Representation consistency — a Kenyan business owner seeing a testimonial attributed to 'David Kiprono' with a non-African avatar loses credibility. Unsplash photos replaced in v2 with African-presenting portraits.

**Future recommendation:** Replace Unsplash avatars with photos of Paul's actual clients (with written consent). Real photos perform significantly better for testimonial credibility and support Google's E-E-A-T (Experience, Expertise, Authority, Trust) signals.

---

## ADR-009 — Hero carousel replacing static single-image hero
**Status:** ACCEPTED  
**Version:** v3.5 (UPDATED-LANDING)

**Decision:** 4-slide auto-advancing carousel in `PaulNyangwaraLanding.jsx`. Slides: (1) Paul / Founder intro with `corridor.jpg`, (2) AI & Automation, (3) Web Development, (4) SEO. Keyboard navigation + play/pause control.

**Rationale:** Three distinct services (AI, Web, SEO) cannot share a single hero without one dominating. Four slides allow each service its own headline, accent, copy, and CTA. `corridor.jpg` establishes a premium visual register distinct from generic stock.

**Known gap (from March 2026 UX Audit):** Slides lack `aria-live="polite"` regions and pause-on-focus behaviour required for WCAG 2.1 AA compliance. Carousel images on slides 2–4 use generic Western stock photos — inconsistent with the African-first brand positioning of slide 1. Recommend replacing with African context imagery.

---

## ADR-010 — Social media links with inline SVG icons in Footer
**Status:** ACCEPTED  
**Version:** v4

**Decision:** Footer social links use self-contained inline SVG components (`IconGitHub`, `IconFacebook`, `IconX`, `IconInstagram`). No external icon library.

**Rationale:** Inline SVG adds zero bundle overhead, zero network requests, and scales perfectly at all DPR values. Four stable icons do not justify a library import.

**Note:** `lucide-react` is already used in NeuroSpark v2.9. If portfolio dependencies are ever aligned with NeuroSpark, replacing inline SVGs with lucide-react imports would simplify maintenance.

---

## ADR-011 — Footer Quick Links nav row: added in v5, removed in v6
**Status:** DEPRECATED  
**Version:** Added v5, removed v6

**Decision (v6):** Footer contains brand logo/name, social icons, tagline, and legal links only. No duplicate site navigation.

**Rationale:** Navbar already provides full site navigation at the top of every page. Duplicating it in the footer adds visual noise without navigation value. Removal simplified `Footer.jsx` from ~200 to ~100 lines with no functional regression.

---

## ADR-012 — Contact email: hello@neurospark.co.ke → pnyangwara@gmail.com
**Status:** ACCEPTED  
**Version:** v2

**Decision:** `pnyangwara@gmail.com` is the portfolio contact email from v2 onwards.

**Rationale:** Personal portfolio should route to a personal email. `hello@neurospark.co.ke` implies corporate engagement terms and had also been removed from the live NeuroSpark site by the time v2 was built.

---

## ADR-013 — v6.1 SEO foundation package
**Status:** ACCEPTED  
**Version:** v6.1

**Decision:** Added full SEO infrastructure to `index.html`: Open Graph tags, Twitter/X card tags, Person + WebSite JSON-LD schema, `robots.txt`, `sitemap.xml`, and `<link rel="canonical">`. All base URLs reference the current Vercel deployment slug pending dedicated domain purchase.

**Rationale:** The portfolio `index.html` previously had only a `<meta name="description">` and `<title>`. No OG tags meant WhatsApp and LinkedIn link previews showed no image or description — a critical deficit for a portfolio being shared via those channels in the Kenyan market. Person schema establishes E-E-A-T signals linking Paul's identity across both the portfolio and `neurosparkcorporation.ai`.

**Consequences:** All canonical URLs and `sameAs` schema entries must be updated when a dedicated domain is purchased. A `# TODO` comment marks every affected line in `index.html`, `robots.txt`, and `sitemap.xml`.

**What remains (PROPOSED ADR-016):** Per-page OG description and canonical tags still not implemented. Requires `useDocumentMeta` hook (see ADR-016).

---

## ADR-014 — Gold colour standardised to NeuroSpark brand (#C9A84C)
**Status:** ACCEPTED  
**Version:** v6.1

**Decision:** `#D4AF37` (portfolio gold) replaced with `#C9A84C` (NeuroSpark canonical gold) and `#F0D060` (portfolio gold-light) replaced with `#b8943e` across all JSX and JS files. Zero instances of old values remain.

**Rationale (from March 2026 Cross-Project Harmonisation Audit):** NeuroSpark is the primary brand identity — its gold should govern. The difference between `#D4AF37` and `#C9A84C` is visually noticeable side-by-side. A visitor who views both sites experiences a slightly different brand. `#F0D060` was too yellow/washed relative to the NeuroSpark palette.

---

## ADR-015 — Google Fonts loading strategy: @import → index.html preconnect
**Status:** ACCEPTED  
**Version:** v6.1

**Decision:** Removed all `@import url('https://fonts.googleapis.com/...')` lines from every page component's `<style>` block. Fonts now load via a single `<link rel="preconnect">` + `<link rel="stylesheet">` in `index.html`, loaded once at application start.

**Rationale (from March 2026 SEO Audit):** `@import` inside a `<style>` block is render-blocking — the browser must download and parse the CSS before it can render the page, significantly increasing First Contentful Paint (FCP) on 3G/4G connections in Kenya (the primary market). The previous approach also loaded the same fonts on every route navigation, compounding the issue. Moving fonts to `index.html` with `preconnect` hints allows the browser to initiate the font connection in parallel with other page resources.

---

## ADR-016 — Per-page useDocumentTitle hook (PROPOSED: useDocumentMeta)
**Status:** ACCEPTED (partial) / PROPOSED (full implementation)  
**Version:** v6.1

**Decision (implemented):** `src/hooks/useDocumentTitle.js` sets the browser `<title>` tag per route. All 8 pages wired with distinct, keyword-rich titles.

**Decision (proposed — not yet implemented):** Replace `useDocumentTitle` with a full `useDocumentMeta` hook that also sets per-page `<meta name="description">`, `<meta property="og:description">`, `<meta property="og:url">`, and `<link rel="canonical">` on every route change.

**Why partial is insufficient:** Social media crawlers (WhatsApp, LinkedIn, Twitter/X) read the `<head>` from the server response before JavaScript executes. `useDocumentTitle` updates the DOM client-side — crawlers never see it. Every route therefore still shares the homepage OG description in link previews. Full fix requires either the `useDocumentMeta` hook (client-side only — improves tab titles but not crawler previews) or migration to Vite SSG / Next.js (solves both).

**Recommended implementation:** See `useDocumentMeta` spec in `content-seo-audit.md` §2.2. All required metadata already exists as constants in each page file.

---

## ADR-017 — Hashnode blog integration
**Status:** ACCEPTED  
**Version:** v6.1

**Decision:** `BlogPage.jsx` rebuilt to fetch posts from Hashnode GraphQL API via `src/api/hashnode.js`. NeuroSpark's Hashnode publication is the canonical source. Portfolio renders previews; full articles link back to `neurosparkcorporation.ai/blog/<slug>` as the canonical URL.

**Rationale:** Paul maintains a single blog on NeuroSpark. Duplicating content on the portfolio would create duplicate content issues. The portfolio blog serves as a discovery surface — readers are routed to NeuroSpark for full reading, reinforcing the cross-site authority relationship documented in `content-seo-audit.md` §9.

**Graceful degradation:** `fetchPosts()` failure falls back silently to 6 static posts. An error banner with a Retry button appears. Skeleton loading cards prevent layout shift during fetch.

**Configuration required:** `PUBLICATION_HOST` constant in `src/api/hashnode.js` must be set to the active Hashnode publication host before deployment.

---

## ADR-018 — New project category: AI Platform
**Status:** ACCEPTED  
**Version:** v6.1

**Decision:** Added "AI Platform" as a fifth filter category in `ProjectsPage.jsx`. Three new project cards added: HESABU Multi-Agent Compliance Platform (featured), EACTIC Trade Intelligence Core, and HESABU PostgreSQL Schema.

**Rationale:** The existing categories (AI & Automation, Web Development, SEO) did not accurately represent platform-level systems design work — multi-agent orchestration, compliance infrastructure, and audit-grade database architecture. The injection doc (March 2026) identified these three projects as ready to publish with full case study content.

**CaseStudyPanel change:** A "View Live on NeuroSpark →" outline button now appears above the existing "Start a Similar Project →" CTA for any project with a non-null `link` field. Cards without a link field (e.g. PostgreSQL Schema) show only the existing CTA.

---

## Proposed ADRs (Not Yet Implemented)

### ADR-019 — useDocumentMeta full implementation (PROPOSED)
Full per-page meta description, OG, and canonical injection. Unblocks per-page WhatsApp/LinkedIn link previews. See ADR-016 for spec.

### ADR-020 — Centralised design tokens: src/constants.js (PROPOSED)
Extract `NAVY`, `GOLD`, `GOLD_LIGHT`, `OFF_WHITE`, `CHARCOAL` from 14 individual page files into a single `src/constants.js` export, mirroring NeuroSpark's `constants.js` structure. Eliminates the largest piece of remaining tech debt in the codebase.

### ADR-021 — Vite SSG migration (PROPOSED)
Migrate from pure SPA to `vite-plugin-ssg` to pre-render all 8 routes as static HTML. This solves the crawler OG tag problem (ADR-016) without requiring Next.js. Recommended for v7 if the portfolio is to be treated as a primary SEO asset rather than just a shared link.

### ADR-022 — React ErrorBoundary wrapper (PROPOSED)
Wrap `App.jsx` in an `ErrorBoundary` component. Without it, any uncaught React error in the portfolio renders a blank white screen — especially risky if the Hashnode API returns malformed data.

### ADR-023 — useCountUp + useInView from NeuroSpark (PROPOSED)
Port `useCountUp` and `useInView` hooks from NeuroSpark v3.0 into portfolio. Skill bars and stats currently animate on mount rather than on scroll. NeuroSpark's count-up-on-scroll pattern is significantly more engaging.

### ADR-024 — Analytics: Plausible (PROPOSED)
Add Plausible Analytics script to `index.html`. Matches NeuroSpark's privacy-first approach (already on Plausible). Required before meaningful SEO measurement is possible.

---

*End of ADR log — Paul Nyang'wara Portfolio v6.1*
