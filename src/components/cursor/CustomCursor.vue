<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { motion, useMotionValue, useSpring } from 'motion-v'

/**
 * Cursor propio hecho con motion-v (gratis; no usa el Cursor de Motion+).
 * Estados: punto (por defecto), anillo en enlaces, contorno que envuelve botones,
 * círculo "Ver" sobre las tarjetas de proyecto, píldora "Arrastrar" en el carrusel y caret en texto.
 * Solo se activa con puntero fino y hover, y sin prefers-reduced-motion; si no, queda el nativo.
 */
type CursorState = 'default' | 'link' | 'button' | 'card' | 'drag' | 'text'

const enabled = ref(false)
const visible = ref(false)
const state = ref<CursorState>('default')
const pressed = ref(false)

const x = useMotionValue(-100)
const y = useMotionValue(-100)
const w = useMotionValue(12)
const h = useMotionValue(12)
const r = useMotionValue(999)
const fast = { stiffness: 900, damping: 60, mass: 0.4 }
const soft = { stiffness: 420, damping: 38, mass: 0.6 }
const sx = useSpring(x, fast)
const sy = useSpring(y, fast)
const sw = useSpring(w, soft)
const sh = useSpring(h, soft)
const sr = useSpring(r, soft)

const TEXT = 'p, h1, h2, h3, h4, li, blockquote, dd, [data-cursor="text"]'
const BUTTON = '.btn, [data-cursor="button"]'
const LINK = 'a, button, [role="button"], summary, label, select'

let locked: HTMLElement | null = null

const update = (e: PointerEvent) => {
  if (e.pointerType !== 'mouse') return
  visible.value = true
  const target = e.target instanceof Element ? e.target : null
  const marked = target?.closest<HTMLElement>('[data-cursor]')
  const kind = marked?.dataset.cursor
  const button = target?.closest<HTMLElement>(BUTTON)
  locked = null

  if (kind === 'card') {
    state.value = 'card'
    w.set(64)
    h.set(64)
    r.set(999)
  } else if (kind === 'drag' && !button) {
    state.value = 'drag'
    w.set(132)
    h.set(36)
    r.set(999)
  } else if (button) {
    state.value = 'button'
    locked = button
    const rect = button.getBoundingClientRect()
    w.set(rect.width + 12)
    h.set(rect.height + 12)
    r.set(parseFloat(getComputedStyle(button).borderTopLeftRadius) + 6 || 12)
  } else if (target?.closest(LINK)) {
    state.value = 'link'
    w.set(40)
    h.set(40)
    r.set(999)
  } else if (target?.closest(TEXT) && target.textContent?.trim()) {
    state.value = 'text'
    const style = getComputedStyle(target)
    const lh = parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.3 || 20
    w.set(2)
    h.set(Math.min(lh, 72))
    r.set(1)
  } else {
    state.value = 'default'
    w.set(12)
    h.set(12)
    r.set(999)
  }

  if (locked) {
    // El contorno se centra en el botón y se mueve apenas con el puntero.
    const rect = locked.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set(cx + (e.clientX - cx) * 0.08)
    y.set(cy + (e.clientY - cy) * 0.08)
  } else {
    x.set(e.clientX)
    y.set(e.clientY)
  }
}

const hide = () => (visible.value = false)
const down = () => (pressed.value = true)
const up = () => (pressed.value = false)

let mqls: MediaQueryList[] = []
const evaluate = () => {
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  enabled.value = fine && !reduce
  document.documentElement.classList.toggle('has-custom-cursor', enabled.value)
}

onMounted(() => {
  if (typeof window.matchMedia !== 'function') return
  mqls = [window.matchMedia('(hover: hover) and (pointer: fine)'), window.matchMedia('(prefers-reduced-motion: reduce)')]
  mqls.forEach((m) => m.addEventListener?.('change', evaluate))
  evaluate()
  window.addEventListener('pointermove', update, { passive: true })
  window.addEventListener('pointerdown', down, { passive: true })
  window.addEventListener('pointerup', up, { passive: true })
  document.documentElement.addEventListener('pointerleave', hide)
})

onBeforeUnmount(() => {
  mqls.forEach((m) => m.removeEventListener?.('change', evaluate))
  window.removeEventListener('pointermove', update)
  window.removeEventListener('pointerdown', down)
  window.removeEventListener('pointerup', up)
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
      return 'bg-ink text-bg'
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
  <motion.div
    v-if="enabled"
    aria-hidden="true"
    class="pointer-events-none fixed left-0 top-0 z-[9999]"
    :style="{ x: sx, y: sy, opacity: visible ? 1 : 0 }"
  >
    <motion.div
      class="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden whitespace-nowrap font-mono text-[12px] font-medium transition-[background-color,border-color,opacity,scale] duration-150"
      :class="[look, pressed ? 'scale-90' : '']"
      :style="{ width: sw, height: sh, borderRadius: sr }"
    >
      <span v-if="label">{{ label }}</span>
    </motion.div>
  </motion.div>
</template>
