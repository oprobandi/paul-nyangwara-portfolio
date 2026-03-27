import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  ssr: {
    // Bundle dompurify into the server bundle rather than externalising it.
    // dompurify v3 degrades gracefully when no DOM is present (returns input
    // unchanged). BlogPostPage always renders the loading skeleton during
    // pre-render (useEffect doesn't run on the server), so sanitize() is
    // never actually called — but bundling avoids a Node require() error.
    noExternal: ['dompurify'],
  },
})
