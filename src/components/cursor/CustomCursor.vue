<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { usePointer } from '@/composables/usePointer'
import { magnetOffsets } from '../vue-bits/magnetRegistry'

/**
 * Cursor propio, sin librerías: `transform: translate3d` puro y transiciones CSS para el tamaño.
 * Estados: punto (por defecto), anillo en enlaces, contorno que envuelve botones, círculo "Ver"
 * sobre las tarjetas de proyecto, píldora "Arrastrar" en el carrusel y caret en texto. Solo se
 * monta con puntero fino y sin prefers-reduced-motion (lo decide App.vue).
 *
 * Rendimiento:
 * - La posición llega del seguimiento compartido (usePointer: un listener y un rAF para todos
 *   los efectos) y se escribe directo en el transform, sin estado reactivo ni re-render.
 * - El estado se calcula en pointerover (al cambiar de elemento), no en cada movimiento. El rect
 *   del botón se mide una vez y el alto de línea del texto se cachea por elemento: nada de
 *   getBoundingClientRect ni getComputedStyle por movimiento.
 * - En un botón con Magnet, el contorno sigue el desplazamiento publicado en magnetRegistry.
 */
type CursorState = 'default' | 'link' | 'button' | 'card' | 'drag' | 'text'

const root = ref<HTMLElement | null>(null)
const shapeEl = ref<HTMLElement | null>(null)
const visible = ref(false)
const state = ref<CursorState>('default')
const pressed = ref(false)

const TEXT = 'p, h1, h2, h3, h4, li, blockquote, dd, [data-cursor="text"]'
const BUTTON = '.btn, [data-cursor="button"]'
const LINK = 'a, button, [role="button"], summary, label, select'
/** Separación entre el botón y su contorno, en px. */
const PAD = 4

const place = (px: number, py: number) => {
  if (root.value) root.value.style.transform = `translate3d(${px}px, ${py}px, 0)`
}
const shape = (s: CursorState, w: number, h: number, r: number) => {
  state.value = s
  const el = shapeEl.value
  if (!el) return
  el.style.width = `${w}px`
  el.style.height = `${h}px`
  el.style.borderRadius = `${r}px`
}

// Bloqueo sobre un botón: centro base (sin el desplazamiento del Magnet) medido una vez.
let locked: HTMLElement | null = null
let magnet: Element | null = null
let baseX = 0
let baseY = 0
let lockRaf = 0
const radii = new WeakMap<Element, number>()
const lines = new WeakMap<Element, number>()

const offsetOf = () => (magnet && magnetOffsets.get(magnet)) || { x: 0, y: 0 }
const measureLock = () => {
  if (!locked) return
  const rect = locked.getBoundingClientRect()
  const o = offsetOf()
  baseX = rect.left + rect.width / 2 - o.x
  baseY = rect.top + rect.height / 2 - o.y
  if (!radii.has(locked)) radii.set(locked, parseFloat(getComputedStyle(locked).borderTopLeftRadius) || 8)
  shape('button', rect.width + PAD * 2, rect.height + PAD * 2, radii.get(locked)! + PAD)
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

const lineHeight = (el: Element) => {
  let lh = lines.get(el)
  if (lh === undefined) {
    const style = getComputedStyle(el)
    lh = Math.min(parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.3 || 20, 72)
    lines.set(el, lh)
  }
  return lh
}

const classify = (target: Element | null) => {
  const kind = target?.closest<HTMLElement>('[data-cursor]')?.dataset.cursor
  const button = target?.closest<HTMLElement>(BUTTON) ?? null
  if (kind === 'card') {
    lock(null)
    shape('card', 64, 64, 999)
  } else if (kind === 'drag' && !button) {
    lock(null)
    shape('drag', 132, 36, 999)
  } else if (button) {
    lock(button)
  } else if (target?.closest(LINK)) {
    lock(null)
    shape('link', 40, 40, 999)
  } else if (target && target.closest(TEXT) && target.textContent?.trim()) {
    lock(null)
    shape('text', 2, lineHeight(target), 1)
  } else {
    lock(null)
    shape('default', 12, 12, 999)
  }
}

usePointer((p) => {
  if (!p.inside) {
    visible.value = false
    lock(null)
    return
  }
  if (!visible.value) visible.value = true
  if (!locked) place(p.x, p.y)
})

const onOver = (e: PointerEvent) => {
  if (e.pointerType !== 'mouse') return
  classify(e.target instanceof Element ? e.target : null)
}
const onScroll = () => locked && measureLock()
const down = () => (pressed.value = true)
const up = () => (pressed.value = false)

onMounted(() => {
  document.documentElement.classList.add('has-custom-cursor')
  shape('default', 12, 12, 999)
  window.addEventListener('pointerover', onOver, { passive: true })
  window.addEventListener('pointerdown', down, { passive: true })
  window.addEventListener('pointerup', up, { passive: true })
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  cancelAnimationFrame(lockRaf)
  window.removeEventListener('pointerover', onOver)
  window.removeEventListener('pointerdown', down)
  window.removeEventListener('pointerup', up)
  window.removeEventListener('scroll', onScroll)
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
    <div
      ref="shapeEl"
      class="cursor-shape flex -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden whitespace-nowrap font-mono text-[12px] font-medium"
      :class="[look, pressed ? 'scale-90' : '']"
    >
      <span v-if="label">{{ label }}</span>
    </div>
  </div>
</template>

<style scoped>
.cursor-shape {
  transition:
    width 0.18s cubic-bezier(0.2, 0.8, 0.2, 1),
    height 0.18s cubic-bezier(0.2, 0.8, 0.2, 1),
    border-radius 0.18s cubic-bezier(0.2, 0.8, 0.2, 1),
    background-color 0.15s ease,
    border-color 0.15s ease,
    scale 0.15s ease;
}
</style>
