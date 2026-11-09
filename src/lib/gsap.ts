import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '@/composables/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

/**
 * Con prefers-reduced-motion las animaciones de GSAP terminan al instante.
 * Los componentes deben además evitar montar animaciones cuando `useReducedMotion()` es true.
 */
if (prefersReducedMotion()) gsap.globalTimeline.timeScale(1000)

export { gsap, ScrollTrigger }
