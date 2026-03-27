/**
 * constants.js — Centralised design tokens
 * Paul Nyang'wara Portfolio v6.2
 *
 * Single source of truth for all brand colours and font stacks.
 * Mirrors NeuroSpark Corporation's constants.js structure for brand consistency.
 *
 * Gold standardised to NeuroSpark canonical value (#C9A84C) per ADR-014.
 */

export const C = {
  navy:      '#0A1F44',
  gold:      '#C9A84C',
  goldLight: '#b8943e',
  offWhite:  '#F9F8F4',
  charcoal:  '#1A1A2E',
  darkBg:    '#06132A',
  muted:     'rgba(255,255,255,0.65)',
  border:    'rgba(201,168,76,0.25)',
};

export const FONTS = {
  heading: "'Playfair Display', serif",
  body:    "'DM Sans', sans-serif",
  ui:      "'Space Grotesk', sans-serif",
};

/* Convenience aliases kept for backwards compatibility with any direct destructuring */
export const NAVY       = C.navy;
export const GOLD       = C.gold;
export const GOLD_LIGHT = C.goldLight;
export const OFF_WHITE  = C.offWhite;
export const CHARCOAL   = C.charcoal;
export const DARK_BG    = C.darkBg;
