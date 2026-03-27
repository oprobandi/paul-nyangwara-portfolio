import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// NOTE (v6.7.2): We do NOT rely on emptyOutDir:false here because Vite 5.1.x
// does not reliably expose `ssrBuild` in the config function. The build script
// in package.json instead saves dist/index.html before the SSR build and
// restores it after, which is shell-level and version-independent.
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
