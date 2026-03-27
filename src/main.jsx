/**
 * main.jsx — Client entry point
 * Paul Nyang'wara Portfolio v6.5
 *
 * v6.5: Uses hydrateRoot when the root div contains pre-rendered HTML
 * from the SSG build (production). Falls back to createRoot in dev
 * where the root div is always empty.
 *
 * hydrateRoot attaches React event handlers to the existing DOM without
 * re-rendering, eliminating the white flash that createRoot would cause
 * when replacing pre-rendered content.
 */
import React from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'

const rootEl = document.getElementById('root')

const app = (
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
)

// SSG pre-rendered pages have content in the root div; hydrate them.
// Dev mode and non-pre-rendered routes fall through to createRoot.
if (rootEl.innerHTML.trim()) {
  hydrateRoot(rootEl, app)
} else {
  createRoot(rootEl).render(app)
}
