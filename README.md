# ⚡ Paul Nyang'wara — Portfolio Website

> Personal portfolio for **Paul Nyang'wara**, Founder & CEO of [NeuroSpark Corporation](https://neurospark.co.ke).  
> Built with **React 18 + Vite + React Router**.

---

## 🗂 Project Structure

```
paul-nyangwara-portfolio/
├── public/
│   ├── favicon.svg
│   └── _redirects          ← Netlify SPA fallback
├── src/
│   ├── pages/
│   │   ├── PaulNyangwaraLanding.jsx   → /
│   │   ├── AboutPage.jsx              → /about
│   │   ├── ServicesPage.jsx           → /services
│   │   ├── ProjectsPage.jsx           → /projects
│   │   ├── BlogPage.jsx               → /blog
│   │   └── SkillsTestimonialsPage.jsx → /skills
│   ├── App.jsx             ← Router + 404 page
│   ├── main.jsx            ← React entry point
│   └── index.css           ← Global reset
├── index.html
├── vite.config.js
├── vercel.json             ← Vercel SPA routing
├── package.json
└── .gitignore
```

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start dev server (opens at http://localhost:5173)
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview
```

---

## 🌍 Deployment

### Vercel (Recommended)
The `vercel.json` file handles SPA routing automatically. Just connect your GitHub repo to Vercel.

### Netlify
The `public/_redirects` file handles SPA routing. Connect your GitHub repo to Netlify, set build command to `npm run build` and publish directory to `dist`.

---

## 📞 Contact

- 📧 hello@neurospark.co.ke  
- 📞 +254 799 644 100  
- 📍 Nairobi, Kenya 🇰🇪  
- 💬 [WhatsApp](https://wa.me/254799644100)

---

© 2025 NeuroSpark Corporation. All Rights Reserved.
