# Paul Nyang'wara Portfolio — TODO & Improvement Backlog
**Version as of this file:** v6.5  
**Last updated:** March 2026

> ✅ = Completed. Items without ✅ are still open.
> Sources: UX Audit, SEO Audit, ADR Report (all March 2026). Security Audit (March 2026).

---

## 🔴 Do Before First Deploy

### 1. Set Hashnode publication host
**File:** `src/api/hashnode.js`  
Change `PUBLICATION_HOST` to your actual Hashnode publication host (found in Hashnode → Publication → Settings → Domain). Until set, BlogPage falls back silently to static posts — not broken but live posts won't load.

### 2. Generate a proper favicon set ✅ (partially)
`favicon.svg` is now the primary favicon in `index.html`. Still recommended: generate `.ico`, `favicon-32.png`, `favicon-16.png`, `apple-touch-icon.png` at [realfavicongenerator.net](https://realfavicongenerator.net) from `paul-headshot.jpg` and add to `public/`.

### 3. Update all canonical/sitemap/OG URLs once domain is purchased
**Files:** `index.html`, `public/robots.txt`, `public/sitemap.xml`, `src/hooks/useDocumentMeta.js`  
Find all `# TODO` and `BASE_URL` references. Replace `paul-nyangwara-portfolio.vercel.app` with the real domain everywhere. Also activate the Plausible script in `index.html` (ADR-024).

### SEC-01 · XSS via dangerouslySetInnerHTML — Blog HTML ✅ Done in v6.4
DOMPurify installed and applied in `BlogPostPage.jsx`. (ADR-034)

### SEC-02 · dangerouslySetInnerHTML on slide data ✅ Done in v6.4
`slide.sub` converted to structured array; rendered as JSX in `PaulNyangwaraLanding.jsx`. (ADR-035)

### SEC-03 · Formspree spam protection ✅ Done in v6.5
reCAPTCHA enabled on the Formspree dashboard for both `maqdryly` (contact) and `mnjglqvo` (newsletter). `_gotcha` honeypot field added to both forms in v6.5 as a frontend complement.

### SEC-04 · No Content Security Policy ✅ Done in v6.4
Security headers added to `vercel.json`. (ADR-036)

### BUG-01 · Newsletter does nothing ✅ Done in v6.4
Wired to Formspree `mnjglqvo`. (ADR-037)

### BUG-02 · Blog post deep links broken ✅ Done in v6.4
`BlogPostPage.jsx` added at `/blog/:slug`. (ADR-034)

### BUG-03 · setMeta creates incomplete elements ✅ Done in v6.4
Fixed in `useDocumentMeta.js`.

### BUG-04 · Mobile menu never closes on route change ✅ Done in v6.4
Fixed in `Navbar.jsx` — now closes on `pathname` change.

### BUG-05 · Contact scroll race condition ✅ Done in v6.4
Fixed in `Navbar.jsx` + `PaulNyangwaraLanding.jsx` — uses `location.state`.

### BUG-06 · Corrupted CSS in BlogPage ✅ Done in v6.4
Purged from the styles block in `BlogPage.jsx`.

### BUG-07 · SinglePost bypasses useDocumentMeta ✅ Done in v6.4
`BlogPostPage` calls `useDocumentMeta` with full per-post values.

### BUG-08 · Inline DOM mutation on image hover ✅ Done in v6.4
Replaced with CSS class in `index.css`.

### CQ-02 · Dead useDocumentTitle.js ✅ Done in v6.4
File deleted.

### CQ-03 · No frontend form validation ✅ Done in v6.4
`validate()` runs before fetch in `handleSubmit`.

---

## 🟡 Do This Month

### 4. useDocumentMeta — per-page descriptions and canonicals ✅ Done in v6.2

### 5. Cross-links: portfolio ↔ NeuroSpark ✅ Done in v6.3
- `/about` — "NeuroSpark Corporation" links to `https://neurosparkcorporation.ai` ✅
- `/services` — "Book via NeuroSpark ↗" CTA on each service card ✅
- `/projects` — HESABU and EACTIC already have "View Live" buttons. Add links for NeuroBot CRM, AutoLead AI, SmartDesk once their NeuroSpark URLs are confirmed.

### 6. WCAG focus-visible on form inputs ✅ Done in v6.2

### 7. Replace Unsplash project images with real screenshots or African context images
**File:** `src/data/projects.js` — `img` fields  
**Source:** Content Audit §8

### 8. Add quantified outcomes visible on project card face ✅ Done in v6.3
`metric` field added to all 9 projects. Gold pill badge renders on card image (grid) and category row (featured).

### 9. Add sitemap.xml blog slug entries ✅ Done in v6.3
6 static fallback slugs added. Replace with live Hashnode slugs + real domain when blog goes live.

### 10. Image width + height attributes ✅ Done in v6.2

---

## 🟢 This Quarter

### 11. Centralise design token imports ✅ (constants.js created in v6.2)
`src/constants.js` exists. Remaining: replace local `const NAVY`, `const GOLD` declarations in each page with `import { NAVY, GOLD } from '../constants'`. About 14 files. (ADR-029, target v7)

### 12. useCountUp + useInView ✅ Done in v6.2

### 13. React ErrorBoundary ✅ Done in v6.2

### 14. Plausible Analytics ✅ Done in v6.3 (commented pending domain)
Script tag in `index.html`. Uncomment + set domain to activate. (ADR-024)

### 15. Animation reveal fallback for slow JS ✅ Done in v6.2

### 16. aria-live + pause-on-focus on hero carousel ✅ Done in v6.2

### 17. Replace carousel slides 2–4 images with African context imagery ✅ Done in v6.3
Slides 2–4 in `src/data/landing.js` now use African tech professional, African entrepreneur, and business analytics desk contexts. Each `bg` field carries a `// TODO` for replacement with real NeuroSpark photoshoot images. (ADR-028)

### 18. Trust pill on hero slide 1 ✅ Done in v6.2

### 19. Secondary ghost CTA on hero slide 1 ✅ Done in v6.2

### 20. LinkedIn in Footer SOCIALS ✅ Done in v6.2

### 21. Blog static fallback images — branded or African context ✅ Done in v6.3
All 6 `STATIC_POSTS` images updated to African/tech-context Unsplash photos. Each carries a `// TODO` for branded navy+gold overlay replacement. (ADR-033)

### 22. Author avatar in blog posts ✅ Done in v6.2

### 23. Migrate inline styles to src/index.css ✅ (Shared styles done in v6.2)

### 24. Vite SSG migration ✅ Done in v6.5
`src/entry-server.jsx` + `scripts/prerender.mjs` implement full static pre-render for all 14 routes (8 pages + 6 blog posts). Per-page OG tags baked into HTML at build time. (ADR-021, ADR-039, ADR-040)

### 25. Extract data arrays to src/data/ ✅ Done in v6.2
`projects.js` and `landing.js` created. Remaining: `AboutPage` skills/achievements data, `SkillsTestimonialsPage` testimonials/ticker data.

---

## 📋 One-Time Operational Tasks

### 26. Generate favicon set
[realfavicongenerator.net](https://realfavicongenerator.net) → upload `paul-headshot.jpg` → drop package into `public/` → update `index.html`.

### 27. Purchase dedicated domain and update all TODOs
~20 lines across `index.html`, `robots.txt`, `sitemap.xml`, `useDocumentMeta.js`. Also uncomment the Plausible script (ADR-024).

### 28. Set up Google Business Profile for NeuroSpark Corporation
Category: Software Company (primary) + IT Services (secondary). Enable messaging (→ WhatsApp). Post weekly updates from blog. Request client reviews.  
**Source:** SEO Audit §9

### 29. Replace testimonial Unsplash avatars with real client photos
With written consent from Amara Osei, Fatima Hassan, David Kiprono (and the other testimonial clients). Real photos measurably improve trust and E-E-A-T. (ADR-027)

### 30. Submit sitemap to Google Search Console
After real domain is live: Search Console → add property → verify via DNS TXT → submit `sitemap.xml`.

---

## 📚 Reference Documents
- `UX Audit:` NeuroSpark Corporation — UX, Responsiveness & Cross-Project Audit (March 2026)
- `SEO Audit:` Content & SEO Audit — NeuroSpark Corporation + Paul Nyang'wara Portfolio (March 2026)
- `ADR Report:` Paul Nyang'wara Portfolio — Architecture Decision Records & Comprehensive Version Report (March 2026)
- `ADR.md` — this project's living ADR log (v0–v6.3)
- `CHANGELOG.md` — full version history

---

*End of TODO backlog — Paul Nyang'wara Portfolio v6.3*
