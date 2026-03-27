# Changelog — Paul Nyang'wara Portfolio

All notable changes to this project are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [6.7.2] — 2026-03-27 — Build fix: shell-level index.html guard

### Problem
`npm run build` succeeded through both Vite client and SSR compile steps,
but the prerender script (`scripts/prerender.mjs`) crashed with:

```
Error: ENOENT: no such file or directory, open '.../dist/index.html'
```

### Root cause
`vite build --ssr` defaults `emptyOutDir: true`, which **wipes the entire
`dist/` folder** before writing the SSR bundle. This deletes the
`dist/index.html` that the preceding client build (`vite build`) produced.
The prerender script then can't find the template it needs to inject HTML into.

### Fix attempted in v6.7.1 (did not work)
Added `emptyOutDir: !ssrBuild` inside `defineConfig(({ ssrBuild }) => ...)`.
Vite 5.1.x does not reliably expose the `ssrBuild` flag inside the config
function, so the option was silently ignored and the wipe still happened.

### Fix in v6.7.2 (confirmed approach)
Moved the guard to the shell build script in `package.json` — no Vite
config dependency:

```
vite build
  && cp dist/index.html dist/_index.html   ← save before SSR wipes dist/
  && vite build --ssr src/entry-server.jsx ← SSR bundle, wipes dist/
  && mv dist/_index.html dist/index.html   ← restore the template
  && node scripts/prerender.mjs            ← prerender can now find it
```

### Files changed
- `package.json` — bumped to 6.7.2, updated `build` script
- `vite.config.js` — reverted `emptyOutDir` attempt; added explanatory comment

---

## [6.7.1] — 2026-03-27 — Build fix attempt: type:module + emptyOutDir

### Problem
Same ENOENT on `dist/index.html` as described in 6.7.2 above.
Additionally, earlier attempts saw:

```
Error [ERR_MODULE_NOT_FOUND]: Cannot find module '.../dist/entry-server.mjs'
```

### Root cause (module extension mismatch)
Vite 5.4.x SSR defaults to outputting `entry-server.mjs` when `package.json`
has no `"type"` field. `scripts/prerender.mjs` imports `dist/entry-server.js`
(`.js` extension). Adding `"type": "module"` to `package.json` causes Node
to treat `.js` as ESM and Vite outputs `entry-server.js` — matching the import.

### Fix applied
- `package.json`: added `"type": "module"` ✅ (kept in 6.7.2)
- `vite.config.js`: added `emptyOutDir: !ssrBuild` ❌ (did not work — see 6.7.2)

---

## [6.7.0] — 2026-03-27 — v6.7 feature release (base)

### Added
- `scripts/prerender.mjs` — SSG pre-render for 14 static routes
- `src/entry-server.jsx` — server-side render entry point
- `src/config.js` — single source of truth for BASE_URL (ADR-043)
- `src/constants.js` — shared route/label constants
- `src/data/landing.js`, `posts.js`, `projects.js` — extracted data files
- `src/hooks/useCountUp.js`, `useDocumentMeta.js`, `useInView.js`
- `src/components/AnimSection.jsx`, `ErrorBoundary.jsx`, `SkillBar.jsx`
- `src/pages/landing/` — split landing page into focused sub-components:
  `HeroCarousel`, `LandingAbout`, `LandingContact`, `LandingProjects`,
  `LandingSkills`, `LandingTestimonials`
- `CHANGELOG.md`, `ADR.md`, `TODO.md`

### Fixed
- Removed duplicate `AnimSection` definition that caused build error

---

## Build error history (for future reference)

| Attempt | Error | Cause | Outcome |
|---------|-------|-------|---------|
| Initial push | `ERR_MODULE_NOT_FOUND: entry-server.mjs` | prerender.mjs imported `.js`, Vite output `.mjs` | Added `"type":"module"` → fixed extension |
| After type:module | `ERR_MODULE_NOT_FOUND: entry-server.js` | sed command changed import to `.mjs` while output flipped to `.js` | Reverted sed |
| After revert | `ENOENT: dist/index.html` | SSR build wipes dist/ before prerender runs | Attempted emptyOutDir config fix |
| v6.7.1 | `ENOENT: dist/index.html` | emptyOutDir fix silently ignored by Vite 5.1.x | Shell cp/mv workaround → v6.7.2 |
| v6.7.2 | ✅ Expected to pass | Shell-level save/restore is version-independent | — |

---

## [6.2.0] — 2026-03-25 — Refactor: constants, hooks, data files, ErrorBoundary
## [6.1.0] — 2026-03-25 — First structured versioned release
## [6.0.0] — 2026-03-25 — Footer update, final Mar 3 snapshot
## [5.0.0] — 2026-03-25 — Terms & Privacy pages added
## [4.0.0] — 2026-03-25 — Footer & Navbar polish, new folder structure
## [3.0.0] — 2026-03-01 — Favicon update, sync latest v3 changes
