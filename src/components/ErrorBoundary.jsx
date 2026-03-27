/**
 * ErrorBoundary.jsx
 * Paul Nyang'wara Portfolio v6.2
 *
 * Catches uncaught React errors (e.g. malformed Hashnode API response,
 * broken component state) and renders a recovery UI instead of a blank
 * white screen.
 */
import { Component } from 'react';

import { NAVY, GOLD } from '../constants'; // ADR-029

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Log to console in dev; swap for a real error reporter (Sentry etc.) later
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: NAVY,
        color: 'white',
        textAlign: 'center',
        padding: '40px 24px',
        fontFamily: "'DM Sans', sans-serif",
      }}>
        <div style={{ fontSize: 64, marginBottom: 24 }}>⚡</div>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(24px, 4vw, 40px)',
          fontWeight: 900,
          color: GOLD,
          marginBottom: 16,
        }}>
          Something went wrong
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, maxWidth: 480, lineHeight: 1.8, marginBottom: 32 }}>
          An unexpected error occurred. Refreshing the page usually fixes it.
          If the problem persists, reach out via WhatsApp.
        </p>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: GOLD, color: NAVY, border: 'none',
              padding: '14px 32px', borderRadius: 8,
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700, fontSize: 15, cursor: 'pointer',
            }}
          >
            Refresh page
          </button>
          <a
            href="https://wa.me/254799644100"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: 'transparent', color: GOLD,
              border: `2px solid ${GOLD}`,
              padding: '13px 32px', borderRadius: 8,
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700, fontSize: 15,
              textDecoration: 'none', display: 'inline-block',
            }}
          >
            WhatsApp Paul →
          </a>
        </div>
      </div>
    );
  }
}
