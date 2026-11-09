/**
 * jsdom no implementa matchMedia, y GSAP (ScrollTrigger) lo usa al registrarse.
 * Stub mínimo: ninguna media query coincide (sin prefers-reduced-motion).
 */
if (typeof window !== 'undefined' && typeof window.matchMedia !== 'function') {
  window.matchMedia = (query: string): MediaQueryList => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })
}

/** jsdom no trae ResizeObserver (lo usan Branched Menu y el carrusel). */
if (typeof window !== 'undefined' && typeof window.ResizeObserver === 'undefined') {
  window.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver
}
