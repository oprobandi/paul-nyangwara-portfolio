/**
 * useDocumentTitle.js — Per-page document title hook
 * Paul Nyang'wara Portfolio v6.1
 *
 * Sets the browser tab title on mount and restores the base title on unmount.
 * Usage: useDocumentTitle('Projects & Case Studies')
 * Result: "Projects & Case Studies | Paul Nyang'wara"
 */

import { useEffect } from 'react';

const BASE_TITLE = "Paul Nyang'wara";

export function useDocumentTitle(title) {
  useEffect(() => {
    const prev = document.title;
    document.title = title ? `${title} | ${BASE_TITLE}` : BASE_TITLE;
    return () => { document.title = prev; };
  }, [title]);
}
