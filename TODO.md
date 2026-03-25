# Paul Nyang'wara Portfolio — TODO & Improvement Backlog
**Version as of this file:** v6.1  
**Last updated:** March 2026  
**Sources:** UX & Responsiveness Audit, Content & SEO Audit, ADR Report (all March 2026)

> Items are ranked within each tier. Each item references the source document section
> where the full rationale and recommended implementation code can be found.

---

## 🔴 Do Before First Deploy

These items are either broken, incorrect, or block basic site functionality on production.

### 1. Set Hashnode publication host
**File:** `src/api/hashnode.js`  
**Change:** Replace `PUBLICATION_HOST = 'blog.neurosparkcorporation.ai'` with your actual Hashnode publication host.  
**If wrong:** BlogPage will silently fall back to static posts — not broken, but live posts won't appear.  
**Source:** ADR-017

### 2. Generate a proper favicon set
**Files:** `public/` + `index.html`  
**Change:** Go to [realfavicongenerator.net](https://realfavicongenerator.net), upload `paul-headshot.jpg`, download the package. Replace current `favicon.jpg` with `.ico`, `favicon-32.png`, `favicon-16.png`, `favicon-192.png`, `apple-touch-icon.png`. Update `index.html` links accordingly.  
**Why:** JPEG is not a valid favicon format for Safari and some mobile browsers. They will show the browser's generic icon.  
**Source:** SEO Audit §7.5

### 3. Update all canonical/sitemap/OG URLs once domain is purchased
**Files:** `index.html`, `public/robots.txt`, `public/sitemap.xml`  
**Change:** Find all `# TODO` comments and replace `paul-nyangwara-portfolio.vercel.app` with the real domain.  
**Why:** Canonical tags pointing to the Vercel slug are better than nothing but will create a canonical mismatch once the real domain is live.  
**Source:** SEO Audit §7.1, ADR-013

---

## 🟡 Do This Month (High Value, Compound Benefit)

### 4. Implement useDocumentMeta — per-page descriptions and canonicals
**New file:** `src/hooks/useDocumentMeta.js`  
**Change:** Replace `useDocumentTitle` (title only) with a full hook that also sets `<meta name="description">`, `<meta property="og:description">`, `<meta property="og:url">`, and `<link rel="canonical">` on every route change.  
**Why:** Right now every page shares the homepage description when shared on WhatsApp or LinkedIn. Each page has its own raison d'être and should have its own preview.  
**Implementation:** Full spec with code in `content-seo-audit.md` §2.2 — `useDocumentMeta.js` is a 40-line drop-in. Titles and descriptions per route are already documented in SEO Audit §7.2.  
**Note:** This is client-side only — crawlers still won't see per-page descriptions unless you also implement ADR-021 (Vite SSG). But it fixes the majority of real-world sharing scenarios.  
**Source:** SEO Audit §7.2, ADR-016

### 5. Add cross-links between portfolio and NeuroSpark
**Files:** `AboutPage.jsx`, `ProjectsPage.jsx`, `ServicesPage.jsx`  
**Changes:**
- `/about` → link "NeuroSpark Corporation" in bio to `https://neurosparkcorporation.ai`
- `/projects` → the HESABU and EACTIC cards already have "View Live on NeuroSpark" buttons. Add equivalent links for the three original projects that were built under NeuroSpark (NeuroBot CRM, AutoLead AI, SmartDesk) once their NeuroSpark URLs are confirmed.
- `/services` → add "Book via NeuroSpark" link below each service CTA pointing to `https://neurosparkcorporation.ai/contact`  
**Why:** Cross-links between two related domains (same owner) pass topical authority in both directions. Google recognises the `sameAs` relationship in the schema — the links reinforce it.  
**Source:** SEO Audit §9 (Cross-Site Authority & Linking Strategy)

### 6. Add WCAG focus-visible styles to all form inputs
**Files:** All pages with forms (primarily `PaulNyangwaraLanding.jsx` contact section)  
**Change:** Add to the page `<style>` block:
```css
input:focus-visible, textarea:focus-visible, select:focus-visible {
  outline: 2px solid #C9A84C;
  outline-offset: 2px;
}
```
**Why:** WCAG 2.1 AA failure — keyboard users cannot see which field is active. This is the highest-priority accessibility fix remaining.  
**Source:** UX Audit §2.7

### 7. Replace Unsplash project images with real client screenshots or locally relevant images
**Files:** `ProjectsPage.jsx`  
**Change:** The three original projects (NeuroBot CRM, SwiftSEO, AfriCart) use generic Unsplash tech photos. Replace with actual screenshots, mockups, or at minimum African business context images.  
**Why:** Generic Western stock imagery undercuts the local authenticity that is a core brand asset. Compare with the corridor.jpg use on the hero — that specificity is deliberate.  
**Source:** Content Audit §8 (Homepage Carousel), UX Audit §3 (hero image)

### 8. Add quantified outcomes to all project cards
**File:** `ProjectsPage.jsx`  
**Change:** Every project card currently describes what was built, not what it achieved. The `results` array already exists — ensure every card has at least one metric visible on the card face itself (not just inside the CaseStudyPanel). E.g.: "74% reduction in customer service queries" as a visible badge.  
**Why:** B2B clients scanning project cards buy outcomes, not deliverables. NeuroSpark's testimonials already quote specific metrics — the portfolio project cards should surface the same.  
**Source:** Content Audit §8 (Projects page)

### 9. Add sitemap.xml blog slug entries once Hashnode posts are live
**File:** `public/sitemap.xml`  
**Change:** For each live Hashnode post, add:
```xml
<url>
  <loc>https://yourdomain.com/blog/<slug></loc>
  <priority>0.7</priority>
  <changefreq>monthly</changefreq>
</url>
```
**Source:** SEO Audit §2.3

### 10. Add image width + height attributes to all img tags
**Files:** All pages  
**Why:** Missing `width` and `height` causes Cumulative Layout Shift (CLS) — a Core Web Vitals ranking signal. The browser doesn't know how much space to reserve before images load.  
**Implementation:** For each `<img>`, add `width` and `height` matching the rendered size. For aspect-ratio-constrained images, use the intrinsic dimensions of the source image.  
**Source:** SEO Audit §2.5

---

## 🟢 This Quarter (Architecture, Polish, Growth)

### 11. Centralise design tokens: src/constants.js
**New file:** `src/constants.js`  
**Change:** Extract `NAVY`, `GOLD`, `GOLD_LIGHT`, `OFF_WHITE`, `CHARCOAL` from all 14 component/page files into a single exported object mirroring NeuroSpark's `constants.js`:
```js
export const C = { navy: '#0A1F44', gold: '#C9A84C', goldLight: '#b8943e', offWhite: '#F9F8F4', charcoal: '#1A1A2E' };
export const FONTS = { heading: "'Playfair Display', serif", body: "'DM Sans', sans-serif", ui: "'Space Grotesk', sans-serif" };
```
**Why:** Tokens are duplicated 14 times. Any brand colour change currently requires editing every file individually. With a constants file, it's one edit.  
**Source:** UX Audit §6.3 (What to Borrow — NeuroSpark → Portfolio), ADR-020

### 12. Port useCountUp + useInView hooks from NeuroSpark v3.0
**New files:** `src/hooks/useCountUp.js`, `src/hooks/useInView.js`  
**Files to update:** `AboutPage.jsx` (skill bars), `PaulNyangwaraLanding.jsx` (stats strip, skill bars)  
**Change:** Skill bars and stat counters currently animate on component mount regardless of whether the user has scrolled to them. The NeuroSpark hooks trigger count-up animations only when the element enters the viewport.  
**Why:** The current pattern wastes the animation on users who don't scroll that far, and desensitises users who do scroll to it (they've already seen it animate in peripheral vision).  
**Source:** UX Audit §6.2

### 13. Add React ErrorBoundary wrapper
**New file:** `src/components/ErrorBoundary.jsx`  
**Files to update:** `src/main.jsx` (wrap `<App />`)  
**Why:** Any uncaught React error — especially likely from `BlogPage.jsx` if Hashnode returns malformed data — renders a blank white screen with no recovery path. An ErrorBoundary catches the error and renders a fallback UI.  
**Source:** UX Audit §6.5, ADR-022

### 14. Add Plausible Analytics
**File:** `index.html`  
**Change:** Add Plausible script tag inside `<head>`. Use the same domain/account as NeuroSpark.
```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```
**Why:** No analytics currently means no baseline for measuring SEO improvements from v6.1 changes. Plausible is privacy-first (matches NeuroSpark's approach) and GDPR-compliant without a cookie banner.  
**Source:** SEO Audit §1 (Portfolio scorecard), ADR-024

### 15. Add animation reveal fallback for slow JS
**Files:** All pages (add to shared `<style>` block, or migrate to `index.css`)  
**Change:**
```css
@keyframes revealFallback { to { opacity: 1; transform: none; } }
.hidden-anim { animation: revealFallback 0s 2s forwards; }
```
**Why:** `hidden-anim` sets `opacity: 0` on elements before IntersectionObserver fires. On slow 3G connections (common in East Africa), entire page sections are invisible until JS loads. The 2-second fallback ensures content is always visible.  
**Source:** UX Audit §3 (Animation System)

### 16. Add aria-live regions and pause-on-focus to hero carousel
**File:** `PaulNyangwaraLanding.jsx`  
**Change:** Wrap slide content in `<div role="region" aria-live="polite" aria-label="Service highlights">`. Pause auto-advance when any carousel element receives keyboard focus.  
**Why:** WCAG 2.1 AA — screen readers do not announce carousel changes without `aria-live`. Auto-advancing carousels must pause on focus for keyboard users.  
**Source:** ADR-009 (Known gap), UX Audit §3

### 17. Replace generic hero slide images with African context imagery
**File:** `PaulNyangwaraLanding.jsx` — SLIDES array  
**Change:** Slides 2, 3, 4 (AI, Web, SEO) currently use generic Western-context Unsplash tech photos. Replace with images featuring African entrepreneurs, Nairobi offices, or Kenyan business contexts.  
**Why:** Slide 1 uses `corridor.jpg` — a deliberate, premium, specific image. Slides 2–4 undo that credibility with generic stock. A Kenyan founder seeing generic Western tech photos on a "Kenya's premier AI studio" slide questions the authenticity of the whole brand claim.  
**Source:** Content Audit §8, UX Audit §3

### 18. Carousel trust signal: add "150+ East African businesses" to hero slide 1
**File:** `PaulNyangwaraLanding.jsx` — Slide 1 sub-copy  
**Change:** The hero currently lacks the "150+ businesses" proof point above the fold. Add as a pill badge:
```jsx
<span style={{ background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 999, padding: '4px 14px', fontSize: '0.82rem', color: GOLD }}>
  ✓ Trusted by 150+ East African businesses
</span>
```
Place this above the main CTA on the founder slide.  
**Source:** UX Audit §3 (Hero Section), Content Audit §8

### 19. Hero: add secondary "See My Work" ghost button on slide 1
**File:** `PaulNyangwaraLanding.jsx`  
**Change:** Alongside the primary "Let's Work Together" CTA, add an outline/ghost button linking to `/projects`.  
**Why:** Users who aren't ready to contact still need a conversion path. Without a secondary CTA, the only options are scroll or leave.  
**Source:** UX Audit §3 (Hero Section)

### 20. Add LinkedIn to social links
**Files:** `Footer.jsx`, `PaulNyangwaraLanding.jsx`, `AboutPage.jsx`  
**Change:** LinkedIn handle `linkedin.com/in/oprobandi` is referenced in `index.html` JSON-LD schema and in the SEO audit but does not appear in the Footer SOCIALS array or any page social links. Add alongside GitHub, Facebook, X, Instagram.  
**Why:** LinkedIn is the primary professional network for B2B client discovery. Paul's portfolio is a B2B tool — LinkedIn should be the most prominent social link, not absent.  
**Source:** SEO Audit §7.1 (sameAs schema), Content Audit §9

### 21. Customise blog static fallback images
**File:** `BlogPage.jsx` — STATIC_POSTS array  
**Change:** Static fallback posts use generic Unsplash tech photos. Replace with African business / Nairobi-specific images — or use a consistent branded template (dark navy + gold text overlay) to signal "this is a portfolio blog post" distinct from NeuroSpark's blog.  
**Source:** SEO Audit §3.5 (author avatar, same rationale applies to post images)

### 22. Author avatar in blog posts: use paul-headshot.jpg
**File:** `BlogPage.jsx` and Hashnode blog data  
**Change:** Blog post author avatar currently uses a generic Unsplash male portrait. Replace with `paul-headshot.jpg` (already in `public/`).  
**Why:** Google values E-E-A-T (Experience, Expertise, Authority, Trust) signals, especially for content covering tax, compliance, and finance. A consistent author photo across posts builds author credibility. Bonus: it reinforces the portfolio → NeuroSpark brand link.  
**Source:** SEO Audit §3.5

### 23. Migrate inline styles to src/index.css
**New file:** `src/index.css`  
**Why:** Every page currently injects multi-hundred-line `<style>` blocks via template literals. This means: CSS parsed and injected at runtime (slow); shared classes like `.btn-gold`, `.section-label` defined multiple times across files; no style caching between page navigations; makes future SSR adoption impossible.  
**Approach:** Create `src/index.css`. Move shared classes (`.btn-gold`, `.btn-outline-gold`, `.section-label`, `.gold-divider`, `.filter-btn`, `@keyframes` definitions, scrollbar styles) there first. Leave page-specific overrides in component `<style>` blocks. This is the biggest tech debt item in the codebase.  
**Source:** UX Audit §7.1, ADR-004

### 24. Vite SSG migration (evaluate for v7)
**Why:** `vite-plugin-ssg` pre-renders all routes as static HTML, solving the crawler OG tag problem (ADR-016) without requiring Next.js. Each page's `useDocumentMeta` call would be read by crawlers at the correct route, not just the homepage.  
**Trade-off:** Additional build complexity; requires testing all 8 routes. Recommended only if portfolio SEO becomes a primary growth lever rather than a secondary one.  
**Source:** ADR-001, ADR-021

### 25. Consider extracting data arrays to src/data/ files
**Files:** `PaulNyangwaraLanding.jsx` (600+ lines), `ProjectsPage.jsx` (710+ lines)  
**Change:** Move `SLIDES`, `PROJECTS`, `SKILLS`, `TESTIMONIALS` arrays out of component files into `src/data/landing.js`, `src/data/projects.js` etc.  
**Why:** `PaulNyangwaraLanding.jsx` is 900 lines with most of it being data arrays. The carousel data, project data, and skill data have nothing to do with rendering logic. Separation of data and presentation makes each file maintainable and testable independently.  
**Source:** ADR-009 (Consequences), ADR-018

---

## 📋 One-Time Operational Tasks (Not Code)

### 26. Generate favicon set
Go to [realfavicongenerator.net](https://realfavicongenerator.net) → upload `paul-headshot.jpg` → download package → drop into `public/` → update `index.html` links.

### 27. Purchase dedicated domain and update all TODOs
Estimated 20 lines to update across `index.html`, `robots.txt`, `sitemap.xml`.

### 28. Set up Google Business Profile for NeuroSpark Corporation
- Primary category: Software Company
- Secondary: IT Services & Computer Repair  
- Description must include: "AI agents", "automation Nairobi", "web development", "SEO Kenya"
- Enable messaging (routes to WhatsApp)
- Post weekly updates repurposed from NeuroSpark blog posts
- Request reviews from satisfied clients

A fully optimised GBP can outrank the website itself for branded searches and appears in the Google map pack for local searches.  
**Source:** SEO Audit §9 (Google Business Profile)

### 29. Prompt actual clients to provide real testimonial photos
Replace the three Unsplash avatar photos (Amara Osei, Fatima Hassan, David Kiprono) with real photos of real clients, with written consent. Real photos perform measurably better for testimonial trust.  
**Source:** ADR-008 (Future recommendation)

### 30. Submit sitemap to Google Search Console
Once deployed on a real domain: Go to Google Search Console → add property → verify via DNS TXT → submit `https://yourdomain.com/sitemap.xml`. This is what actually triggers Google to crawl the new SEO infrastructure.

---

## 🔗 Reference Documents

All recommendations in this file are traceable to:
- `UX Audit:` NeuroSpark Corporation — UX, Responsiveness & Cross-Project Audit (March 2026)
- `SEO Audit:` Content & SEO Audit — NeuroSpark Corporation + Paul Nyang'wara Portfolio (March 2026)
- `ADR Report:` Paul Nyang'wara Portfolio — Architecture Decision Records & Comprehensive Version Report (March 2026)

---

*End of TODO backlog — Paul Nyang'wara Portfolio v6.1*
