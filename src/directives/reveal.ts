import type { Directive } from 'vue'
import { prefersReducedMotion } from '@/composables/useReducedMotion'

/**
 * v-reveal: aparición sutil al entrar en pantalla.
 * Con prefers-reduced-motion o sin IntersectionObserver, el contenido se muestra directo.
 * Acepta un retardo opcional en ms: v-reveal="120".
 */
const observers = new WeakMap<HTMLElement, IntersectionObserver>()

export const vReveal: Directive<HTMLElement, number | undefined> = {
  mounted(el, binding) {
    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible')
      return
    }
    el.classList.add('reveal')
    if (binding.value) el.style.transitionDelay = `${binding.value}ms`
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.classList.add('is-visible')
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    observer.observe(el)
    observers.set(el, observer)
  },
  beforeUnmount(el) {
    observers.get(el)?.disconnect()
    observers.delete(el)
  },
}
