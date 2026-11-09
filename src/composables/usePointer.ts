import { onBeforeUnmount, onMounted } from 'vue'

/**
 * Seguimiento del mouse compartido: UN solo listener `pointermove` (pasivo) en window y UN solo
 * rAF por frame para todos los efectos (cursor, fondo, Magnet, Tech Text). Los consumidores no
 * escuchan el DOM por su cuenta ni miden en cada evento: reciben la última posición una vez por
 * frame. Solo puntero tipo mouse (el táctil no mueve efectos de hover).
 */
export interface PointerState {
  x: number
  y: number
  /** false antes del primer movimiento o cuando el puntero sale de la ventana. */
  inside: boolean
}

type Listener = (p: Readonly<PointerState>) => void

const state: PointerState = { x: -9999, y: -9999, inside: false }
const listeners = new Set<Listener>()
let raf = 0
let bound = false

const flush = () => {
  raf = 0
  for (const fn of listeners) fn(state)
}
const schedule = () => {
  if (!raf && listeners.size) raf = requestAnimationFrame(flush)
}
const onMove = (e: PointerEvent) => {
  if (e.pointerType !== 'mouse') return
  state.x = e.clientX
  state.y = e.clientY
  state.inside = true
  schedule()
}
const onLeave = () => {
  state.inside = false
  schedule()
}

const bind = () => {
  if (bound || typeof window === 'undefined') return
  bound = true
  window.addEventListener('pointermove', onMove, { passive: true })
  document.documentElement.addEventListener('pointerleave', onLeave)
}
const unbind = () => {
  if (!bound || listeners.size) return
  bound = false
  cancelAnimationFrame(raf)
  raf = 0
  window.removeEventListener('pointermove', onMove)
  document.documentElement.removeEventListener('pointerleave', onLeave)
}

/** Suscripción manual (para código fuera de setup). Devuelve la función para cancelarla. */
export function subscribePointer(fn: Listener): () => void {
  listeners.add(fn)
  bind()
  return () => {
    listeners.delete(fn)
    unbind()
  }
}

/** Última posición conocida (lectura sin suscribirse). */
export const pointer: Readonly<PointerState> = state

/** Suscribe `fn` mientras el componente está montado. */
export function usePointer(fn: Listener): void {
  let off: (() => void) | undefined
  onMounted(() => (off = subscribePointer(fn)))
  onBeforeUnmount(() => off?.())
}
