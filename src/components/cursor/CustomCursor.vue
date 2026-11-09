<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { motion, useMotionValue, useSpring } from 'motion-v'
import { magnetOffsets } from '../vue-bits/magnetRegistry'

/**
 * Cursor propio (motion-v, sin Motion+). Estados: punto (por defecto), anillo en enlaces,
 * contorno que envuelve botones, círculo "Ver" sobre las tarjetas de proyecto, píldora
 * "Arrastrar" en el carrusel y caret en texto. Solo se monta con puntero fino y sin
 * prefers-reduced-motion (lo decide App.vue); si no, queda el cursor nativo.
 *
 * Rendimiento:
 * - La posición se escribe directo en `transform: translate3d` dentro del mismo evento: sin
 *   spring, sin estado reactivo y sin re-render de Vue por movimiento.
 * - El estado se calcula en pointerover (cuando cambia el elemento), no en cada movimiento. Ahí
 *   se mide una sola vez el botón (rect y border-radius); nada de getBoundingClientRect ni
 *   getComputedStyle por movimiento.
 * - En un botón con Magnet, el contorno sigue el desplazamiento publicado por el Magnet en
 *   magnetRegistry (un rAF solo mientras dura el bloqueo).
 * - Solo el tamaño del contorno usa springs (cambian al cambiar de estado, no al mover).
 */
type CursorState = 'default' | 'link' | 'button' | 'card' | 'drag' | 'text'

const root = ref<HTMLElement | null>(null)
const visible = ref(false)
const state = ref<CursorState>('default')
const pressed = ref(false)

const w = useMotionValue(12)
const h = useMotionValue(12)
const r = useMotionValue(999)
const size = { stiffness: 700, damping: 50, mass: 0.5 }
const sw = useSpring(w, size)
const sh = useSpring(h, size)
const sr = useSpring(r, size)

const TEXT = 'p, h1, h2, h3, h4, li, blockquote, dd, [data-cursor="text"]'
const BUTTON = '.btn, [data-cursor="button"]'
const LINK = 'a, button, [role="button"], summary, label, select'
/** Separación entre el botón y su contorno, en px. */
const PAD = 4

const place = (px: number, py: number) => {
  if (root.value) root.value.style.transform = `translate3d(${px}px, ${py}px, 0)`
}

// Bloqueo sobre un botón: centro base (sin el desplazamiento del Magnet) medido una vez.
let locked: HTMLElement | null = null
let magnet: Element | null = null
let baseX = 0
let baseY = 0
let lockRaf = 0

const offsetOf = () => (magnet && magnetOffsets.get(magnet)) || { x: 0, y: 0 }
const measureLock = () => {
  if (!locked) return
  const rect = locked.getBoundingClientRect()
  const o = offsetOf()
  baseX = rect.left + rect.width / 2 - o.x
  baseY = rect.top + rect.height / 2 - o.y
  w.set(rect.width + PAD * 2)
  h.set(rect.height + PAD * 2)
  r.set((parseFloat(getComputedStyle(locked).borderTopLeftRadius) || 8) + PAD)
}
const followLock = () => {
  if (!locked) return (lockRaf = 0)
  const o = offsetOf()
  place(baseX + o.x, baseY + o.y)
  lockRaf = requestAnimationFrame(followLock)
}
const lock = (el: HTMLElement | null) => {
  if (el === locked) return
  locked = el
  magnet = el?.closest('[data-magnet]') ?? null
  if (el) {
    measureLock()
    if (!lockRaf) lockRaf = requestAnimationFrame(followLock)
  }
}

const shape = (s: CursorState, width: number, height: number, radius: number) => {
  state.value = s
  w.set(width)
  h.set(height)
  r.set(radius)
}

const classify = (target: Element | null) => {
  const marked = target?.closest<HTMLElement>('[data-cursor]')
  const kind = marked?.dataset.cursor
  const button = target?.closest<HTMLElement>(BUTTON) ?? null

  if (kind === 'card') {
    lock(null)
    shape('card', 64, 64, 999)
  } else if (kind === 'drag' && !button) {
    lock(null)
    shape('drag', 132, 36, 999)
  } else if (button) {
    state.value = 'button'
    lock(button)
  } else if (target?.closest(LINK)) {
    lock(null)
    shape('link', 40, 40, 999)
  } else if (target?.closest(TEXT) && target.textContent?.trim()) {
    lock(null)
    const style = getComputedStyle(target)
    const lh = parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.3 || 20
    shape('text', 2, Math.min(lh, 72), 1)
  } else {
    lock(null)
    shape('default', 12, 12, 999)
  }
}

const onMove = (e: PointerEvent) => {
  if (e.pointerType !== 'mouse') return
  if (!visible.value) visible.value = true
  if (!locked) place(e.clientX, e.clientY)
}
const onOver = (e: PointerEvent) => {
  if (e.pointerType !== 'mouse') return
  classify(e.target instanceof Element ? e.target : null)
  if (!locked) place(e.clientX, e.clientY)
}
const onScroll = () => locked && measureLock()
const hide = () => {
  visible.value = false
  lock(null)
}
const down = () => (pressed.value = true)
const up = () => (pressed.value = false)

onMounted(() => {
  document.documentElement.classList.add('has-custom-cursor')
  window.addEventListener('pointermove', onMove, { passive: true })
  window.addEventListener('pointerover', onOver, { passive: true })
  window.addEventListener('pointerdown', down, { passive: true })
  window.addEventListener('pointerup', up, { passive: true })
  window.addEventListener('scroll', onScroll, { passive: true })
  document.documentElement.addEventListener('pointerleave', hide)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(lockRaf)
  window.removeEventListener('pointermove', onMove)
  window.removeEventListener('pointerover', onOver)
  window.removeEventListener('pointerdown', down)
  window.removeEventListener('pointerup', up)
  window.removeEventListener('scroll', onScroll)
  document.documentElement.removeEventListener('pointerleave', hide)
  document.documentElement.classList.remove('has-custom-cursor')
})

const label = computed(() => (state.value === 'card' ? 'Ver' : state.value === 'drag' ? '← Arrastrar →' : ''))
const look = computed(() => {
  switch (state.value) {
    case 'link':
      return 'border-2 border-accent bg-transparent'
    case 'button':
      return 'border border-ink bg-transparent'
    case 'card':
    case 'drag':
      return 'bg-ink text-bg'
    case 'text':
      return 'bg-accent'
    default:
      return 'bg-ink'
  }
})
</script>

<template>
  <div
    ref="root"
    aria-hidden="true"
    class="pointer-events-none fixed left-0 top-0 z-[9999] transition-opacity duration-150"
    :class="visible ? 'opacity-100' : 'opacity-0'"
    style="transform: translate3d(-100px, -100px, 0); will-change: transform"
  >
    <motion.div
      class="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden whitespace-nowrap font-mono text-[12px] font-medium transition-[background-color,border-color,scale] duration-150"
      :class="[look, pressed ? 'scale-90' : '']"
      :style="{ width: sw, height: sh, borderRadius: sr }"
    >
      <span v-if="label">{{ label }}</span>
    </motion.div>
  </div>
</template>
