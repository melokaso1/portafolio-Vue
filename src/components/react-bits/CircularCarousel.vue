<!--
  Circular Carousel: port a Vue 3 + TypeScript del componente de React Bits.
  Original: https://www.reactbits.dev/components/circular-carousel (CircularCarousel-TS-TW)
  Autor del original: David Haz y colaboradores de React Bits. Licencia MIT + Commons Clause
  (https://github.com/DavidHaz/react-bits/blob/main/LICENSE.md): se puede usar en proyectos,
  pero no revender el componente como tal.
  Cambios del port:
  - Las tarjetas se pintan con un slot (#item) en lugar de imágenes, para poner las tarjetas de proyecto.
  - Solo cartas planas (curve = 0, sin caras traseras): suficiente para los presets orbit y wheel.
  - Sin intros animadas ni swap de imágenes. Con prefers-reduced-motion no hay autoplay ni parallax.
  - Se conservan: geometría de los presets, ajuste al contenedor, arrastre con momentum, snap con
    resorte, rueda horizontal, teclado (flechas / Home / End), depthFade y pausa fuera de pantalla.
-->
<script setup lang="ts" generic="T extends { id: string; title: string }">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

type Preset = 'cylinder' | 'orbit' | 'wheel'
type Vec3 = [number, number, number]

interface Layout {
  axis: 'x' | 'y'
  tilt: number
  perspective: number
  spread: number
  billboard: boolean
  window: number
}

const PRESETS: Record<Preset, Layout> = {
  cylinder: { axis: 'y', tilt: -5, perspective: 2500, spread: 1, billboard: false, window: 0 },
  orbit: { axis: 'y', tilt: -16, perspective: 1500, spread: 1.45, billboard: true, window: 0 },
  wheel: { axis: 'x', tilt: 0, perspective: 1800, spread: 1, billboard: false, window: 1.7 },
}

const DRAG_THRESHOLD = 5
const SPRING = 118
const SETTLE_SPEED = 9
const TO_RAD = Math.PI / 180

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))
const wrap = (deg: number) => ((((deg + 180) % 360) + 360) % 360) - 180
const rotateX = (p: Vec3, d: number): Vec3 => {
  const r = d * TO_RAD
  return [p[0], p[1] * Math.cos(r) - p[2] * Math.sin(r), p[1] * Math.sin(r) + p[2] * Math.cos(r)]
}
const rotateY = (p: Vec3, d: number): Vec3 => {
  const r = d * TO_RAD
  return [p[0] * Math.cos(r) + p[2] * Math.sin(r), p[1], -p[0] * Math.sin(r) + p[2] * Math.cos(r)]
}

const props = withDefaults(
  defineProps<{
    items: T[]
    preset?: Preset
    cardWidth?: number
    aspectRatio?: number
    gap?: number
    tilt?: number
    perspective?: number
    autoplay?: 'drift' | 'off'
    speed?: number
    draggable?: boolean
    momentum?: number
    snap?: boolean
    pauseOnHover?: boolean
    focusOnClick?: boolean
    parallax?: number
    stretch?: number
    depthFade?: number
    fadeColor?: string
    cornerRadius?: number
    label?: string
  }>(),
  {
    preset: 'orbit',
    cardWidth: 220,
    aspectRatio: 0.75,
    gap: 25,
    tilt: undefined,
    perspective: undefined,
    autoplay: 'off',
    speed: 14,
    draggable: true,
    momentum: 0.6,
    snap: true,
    pauseOnHover: true,
    focusOnClick: true,
    parallax: 0.3,
    stretch: 0.5,
    depthFade: 0.55,
    fadeColor: '#0E0F11',
    cornerRadius: 16,
    label: 'Carrusel',
  },
)

const emit = defineEmits<{ change: [index: number]; itemClick: [item: T, index: number] }>()

defineSlots<{ item(props: { item: T; index: number; active: boolean }): unknown }>()

const reduced = ref(false)
const layout = computed(() => PRESETS[props.preset] ?? PRESETS.orbit)
const count = computed(() => props.items.length)
const step = computed(() => 360 / Math.max(count.value, 1))
const cardW = computed(() => Math.max(40, props.cardWidth))
const cardH = computed(() => cardW.value / clamp(props.aspectRatio, 0.2, 5))
const along = computed(() => (layout.value.axis === 'x' ? cardH.value : cardW.value))
const radius = computed(() => {
  const n = Math.max(count.value, 3)
  const pitch = (along.value + props.gap) * layout.value.spread
  return Math.max(pitch / (2 * Math.sin(Math.PI / n)), along.value * 0.6)
})
const tiltValue = computed(() => props.tilt ?? layout.value.tilt)
const perspectiveValue = computed(() => props.perspective ?? layout.value.perspective)

const rootRef = ref<HTMLDivElement | null>(null)
const stageRef = ref<HTMLDivElement | null>(null)
const cameraRef = ref<HTMLDivElement | null>(null)
const ringRef = ref<HTMLDivElement | null>(null)
const cardRefs: (HTMLDivElement | null)[] = []
const active = ref(0)
const dragging = ref(false)
const ready = ref(false)

interface Press {
  id: number
  x: number
  y: number
  angle: number
  moved: boolean
  origin: number
  samples: { time: number; angle: number }[]
}

const state = {
  angle: 0,
  velocity: 0,
  target: null as number | null,
  dir: -1,
  press: null as Press | null,
  drag: false,
  hover: false,
  pointer: { inside: false, x: 0, y: 0 },
  yaw: 0,
  pitch: 0,
  holdUntil: 0,
  suppressClick: false,
  wheelTimer: undefined as ReturnType<typeof setTimeout> | undefined,
  fit: 1,
  last: 0,
}

let raf = 0
let visible = true
let wake = () => {}
let measure = () => {}

const nearest = (angle: number) => Math.round(angle / step.value) * step.value

const advance = (dt: number, now: number) => {
  const paused = (props.pauseOnHover && state.hover) || state.drag || now < state.holdUntil
  const auto = !reduced.value && props.autoplay === 'drift'
  const cruise = auto && !paused ? props.speed * state.dir : 0
  let busy = state.drag
  if (state.drag) {
    // la velocidad la fija el arrastre
  } else if (state.target !== null) {
    let remaining = dt
    const damping = 2 * Math.sqrt(SPRING)
    while (remaining > 0) {
      const h = Math.min(remaining, 1 / 240)
      const accel = SPRING * (state.target - state.angle) - damping * state.velocity
      state.velocity += accel * h
      state.angle += state.velocity * h
      remaining -= h
    }
    if (Math.abs(state.target - state.angle) < 0.004 && Math.abs(state.velocity) < 0.03) {
      state.angle = state.target
      state.velocity = 0
      state.target = null
    }
    busy = true
  } else {
    const tau = 0.18 + clamp(props.momentum, 0, 1) * 1.5
    state.velocity += (cruise - state.velocity) * (1 - Math.exp(-dt / tau))
    state.angle += state.velocity * dt
    if (cruise === 0 && props.snap && Math.abs(state.velocity) < SETTLE_SPEED) state.target = nearest(state.angle)
    busy = busy || cruise !== 0 || Math.abs(state.velocity) > 0.01 || state.target !== null
  }
  if (now < state.holdUntil) busy = true
  const parallax = reduced.value ? 0 : clamp(props.parallax, 0, 1)
  const ease = 1 - Math.exp(-dt / 0.35)
  const aimYaw = state.pointer.inside ? state.pointer.x * parallax * 9 : 0
  const aimPitch = state.pointer.inside ? -state.pointer.y * parallax * 6 : 0
  state.yaw += (aimYaw - state.yaw) * ease
  state.pitch += (aimPitch - state.pitch) * ease
  if (Math.abs(aimYaw - state.yaw) > 0.01 || Math.abs(aimPitch - state.pitch) > 0.01) busy = true
  return busy
}

const render = () => {
  const camera = cameraRef.value
  const ring = ringRef.value
  if (!camera || !ring) return
  const stretch = reduced.value ? 0 : clamp(props.stretch, 0, 1)
  const swell = 1 + stretch * 0.12 * Math.min(1, Math.abs(state.velocity) / 420)
  const R = radius.value * swell
  const angle = state.angle
  const l = layout.value
  if (l.axis === 'x') {
    camera.style.transform = `translate3d(0, 0, ${-R}px) rotateY(${tiltValue.value + state.yaw}deg) rotateX(${state.pitch}deg)`
    ring.style.transform = `rotateX(${-angle}deg)`
  } else {
    camera.style.transform = `translate3d(0, 0, ${-R}px) rotateX(${tiltValue.value + state.pitch}deg) rotateY(${state.yaw}deg)`
    ring.style.transform = `rotateY(${angle}deg)`
  }
  for (let i = 0; i < count.value; i++) {
    const card = cardRefs[i]
    if (!card) continue
    const base = i * step.value
    let t = l.axis === 'x' ? `rotateX(${-base}deg) translateZ(${R}px)` : `rotateY(${base}deg) translateZ(${R}px)`
    if (l.billboard) t += ` rotateY(${-(base + angle)}deg)`
    card.style.transform = t
    const world = wrap(base + angle)
    const facing = Math.cos(world * TO_RAD)
    const fade = clamp(props.depthFade, 0, 1) * Math.pow((1 - facing) / 2, 1.25)
    card.style.setProperty('--cc-depth', fade.toFixed(3))
    card.style.zIndex = String(Math.round(facing * 100) + 100)
  }
  const index = ((Math.round(-state.angle / step.value) % count.value) + count.value) % count.value || 0
  if (index !== active.value) {
    active.value = index
    emit('change', index)
  }
}

const frame = (now: number) => {
  raf = 0
  const dt = state.last ? Math.min((now - state.last) / 1000, 0.05) : 1 / 60
  state.last = now
  const busy = advance(dt, now)
  render()
  if (busy && visible && !document.hidden) raf = requestAnimationFrame(frame)
  else state.last = 0
}

const focusIndex = (index: number) => {
  let target = -index * step.value
  target += 360 * Math.round((state.angle - target) / 360)
  state.target = target
  state.holdUntil = performance.now() + 2800
  wake()
}

const stepBy = (delta: number) => {
  const base = state.target ?? nearest(state.angle)
  state.target = base - delta * step.value
  state.holdUntil = performance.now() + 2800
  wake()
}

defineExpose({ focusIndex, stepBy })

const updatePointer = (e: PointerEvent) => {
  const root = rootRef.value
  if (!root) return
  const rect = root.getBoundingClientRect()
  state.pointer.x = clamp(((e.clientX - rect.left) / rect.width) * 2 - 1, -1, 1)
  state.pointer.y = clamp(((e.clientY - rect.top) / rect.height) * 2 - 1, -1, 1)
}

const onPointerDown = (e: PointerEvent) => {
  state.suppressClick = false
  if (!props.draggable || e.button !== 0) return
  state.press = { id: e.pointerId, x: e.clientX, y: e.clientY, angle: state.angle, moved: false, origin: 0, samples: [{ time: performance.now(), angle: state.angle }] }
}

const onPointerMove = (e: PointerEvent) => {
  if (e.pointerType === 'mouse') {
    state.pointer.inside = true
    updatePointer(e)
  }
  const press = state.press
  if (!press || press.id !== e.pointerId) {
    wake()
    return
  }
  const axisX = layout.value.axis === 'x'
  const delta = axisX ? e.clientY - press.y : e.clientX - press.x
  const cross = axisX ? e.clientX - press.x : e.clientY - press.y
  if (!press.moved) {
    if (Math.abs(delta) < DRAG_THRESHOLD) return
    if (Math.abs(cross) > Math.abs(delta) * 1.2 && e.pointerType !== 'mouse') {
      state.press = null
      return
    }
    press.moved = true
    press.origin = delta
    state.drag = true
    state.target = null
    state.velocity = 0
    dragging.value = true
    try {
      rootRef.value?.setPointerCapture(e.pointerId)
    } catch {
      /* sin captura disponible */
    }
  }
  const perPixel = 180 / (Math.PI * radius.value * state.fit)
  state.angle = press.angle + (delta - press.origin) * perPixel
  const now = performance.now()
  press.samples.push({ time: now, angle: state.angle })
  while (press.samples.length > 2 && now - press.samples[0]!.time > 110) press.samples.shift()
  wake()
}

const release = (e: PointerEvent) => {
  const press = state.press
  if (!press || press.id !== e.pointerId) return
  state.press = null
  if (!press.moved) return
  state.drag = false
  dragging.value = false
  state.suppressClick = true
  const first = press.samples[0]!
  const last = press.samples[press.samples.length - 1]!
  const span = (last.time - first.time) / 1000
  const velocity = span > 0.008 ? clamp((last.angle - first.angle) / span, -1400, 1400) : 0
  state.velocity = velocity
  if (Math.abs(velocity) > 60) state.dir = Math.sign(velocity)
  if (props.snap) {
    const tau = 0.18 + clamp(props.momentum, 0, 1) * 1.5
    state.target = Math.round((state.angle + velocity * tau * 0.55) / step.value) * step.value
  }
  wake()
}

const onPointerEnter = (e: PointerEvent) => {
  if (e.pointerType !== 'mouse') return
  state.hover = true
  wake()
}

const onPointerLeave = (e: PointerEvent) => {
  if (e.pointerType === 'mouse') {
    state.hover = false
    state.pointer.inside = false
  }
  wake()
}

const onClick = (e: MouseEvent) => {
  if (state.suppressClick) {
    state.suppressClick = false
    return
  }
  const card = (e.target as HTMLElement).closest?.('[data-cc-index]')
  if (!card) return
  const index = Number(card.getAttribute('data-cc-index'))
  if (props.focusOnClick) focusIndex(index)
  const item = props.items[index]
  if (item) emit('itemClick', item, index)
}

const onKeyDown = (e: KeyboardEvent) => {
  const forward = layout.value.axis === 'x' ? 'ArrowDown' : 'ArrowRight'
  const backward = layout.value.axis === 'x' ? 'ArrowUp' : 'ArrowLeft'
  if (e.key === forward) stepBy(1)
  else if (e.key === backward) stepBy(-1)
  else if (e.key === 'Home') focusIndex(0)
  else if (e.key === 'End') focusIndex(count.value - 1)
  else return
  e.preventDefault()
}

let cleanup: (() => void) | undefined

onMounted(() => {
  const root = rootRef.value
  const stage = stageRef.value
  if (!root || !stage) return
  reduced.value = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

  measure = () => {
    const rect = root.getBoundingClientRect()
    if (!rect.width || !rect.height) return
    const width = rect.width * 0.94
    const height = rect.height * 0.92
    const P = perspectiveValue.value
    let minX = Infinity
    let maxX = -Infinity
    let minY = Infinity
    let maxY = -Infinity
    const corners: [number, number][] = [
      [-cardW.value / 2, -cardH.value / 2],
      [cardW.value / 2, -cardH.value / 2],
      [-cardW.value / 2, cardH.value / 2],
      [cardW.value / 2, cardH.value / 2],
    ]
    const l = layout.value
    const limit = l.window ? l.window * step.value : 180
    for (let a = -limit; a <= limit; a += limit / 24) {
      for (const [cx, cy] of corners) {
        let p: Vec3
        if (l.axis === 'x') p = rotateY(rotateX([cx, cy, radius.value], -a), tiltValue.value)
        else if (l.billboard) {
          const c = rotateY([0, 0, radius.value], a)
          p = rotateX([c[0] + cx, cy, c[2]], tiltValue.value)
        } else p = rotateX(rotateY([cx, cy, radius.value], a), tiltValue.value)
        p = [p[0], p[1], p[2] - radius.value]
        if (p[2] >= P * 0.95) continue
        const k = P / (P - p[2])
        minX = Math.min(minX, p[0] * k)
        maxX = Math.max(maxX, p[0] * k)
        minY = Math.min(minY, p[1] * k)
        maxY = Math.max(maxY, p[1] * k)
      }
    }
    const fit = Math.min(1, width / Math.max(maxX - minX, 1), height / Math.max(maxY - minY, 1))
    state.fit = fit
    const shift = -((minY + maxY) / 2) * fit
    stage.style.perspective = `${P}px`
    stage.style.transform = `translate3d(0, ${shift}px, 0) scale(${fit})`
  }

  wake = () => {
    if (!raf && visible && !document.hidden) raf = requestAnimationFrame(frame)
  }

  const onVisibility = () => {
    if (document.hidden) {
      cancelAnimationFrame(raf)
      raf = 0
      state.last = 0
    } else wake()
  }

  const onWheel = (e: WheelEvent) => {
    if (!props.draggable) return
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : 0
    if (!delta) return
    e.preventDefault()
    const perPixel = 180 / (Math.PI * radius.value * state.fit)
    state.target = null
    state.angle -= delta * perPixel
    state.velocity = -delta * perPixel * 30
    state.holdUntil = performance.now() + 1600
    clearTimeout(state.wheelTimer)
    state.wheelTimer = setTimeout(() => {
      if (props.snap) state.target = nearest(state.angle + state.velocity * 0.12)
      wake()
    }, 140)
    wake()
  }

  const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => (measure(), wake())) : null
  ro?.observe(root)
  const io =
    typeof IntersectionObserver !== 'undefined'
      ? new IntersectionObserver(([entry]) => {
          visible = Boolean(entry?.isIntersecting)
          if (visible) wake()
          else {
            cancelAnimationFrame(raf)
            raf = 0
            state.last = 0
          }
        })
      : null
  io?.observe(root)
  root.addEventListener('wheel', onWheel, { passive: false })
  document.addEventListener('visibilitychange', onVisibility)

  measure()
  render()
  ready.value = true
  wake()

  cleanup = () => {
    cancelAnimationFrame(raf)
    ro?.disconnect()
    io?.disconnect()
    clearTimeout(state.wheelTimer)
    root.removeEventListener('wheel', onWheel)
    document.removeEventListener('visibilitychange', onVisibility)
  }
})

onBeforeUnmount(() => cleanup?.())

watch([radius, cardW, cardH, tiltValue, perspectiveValue, count], () => {
  measure()
  wake()
})

const current = computed(() => props.items[active.value])
</script>

<template>
  <div
    ref="rootRef"
    class="group/cc relative h-full w-full touch-pan-y select-none overflow-hidden outline-none focus-visible:shadow-[inset_0_0_0_2px_rgb(var(--accent))]"
    :class="[draggable ? 'cursor-grab' : '', dragging ? 'cursor-grabbing' : '']"
    :style="{ '--cc-fade': fadeColor, '--cc-radius': `${Math.max(0, cornerRadius)}px` }"
    role="region"
    aria-roledescription="carrusel"
    :aria-label="label"
    tabindex="0"
    data-cursor="drag"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="release"
    @pointercancel="release"
    @pointerenter="onPointerEnter"
    @pointerleave="onPointerLeave"
    @click="onClick"
    @keydown="onKeyDown"
  >
    <div
      ref="stageRef"
      class="absolute inset-0 flex items-center justify-center transition-opacity duration-500 motion-reduce:transition-none"
      :class="ready ? 'opacity-100' : 'opacity-0'"
    >
      <div ref="cameraRef" class="relative h-0 w-0 [transform-style:preserve-3d]">
        <div ref="ringRef" class="absolute left-0 top-0 h-0 w-0 [transform-style:preserve-3d]">
          <div
            v-for="(item, index) in items"
            :key="item.id"
            :ref="(el) => (cardRefs[index] = el as HTMLDivElement | null)"
            class="absolute left-0 top-0 h-0 w-0 [transform-style:preserve-3d]"
            :data-cc-index="index"
            role="group"
            aria-roledescription="diapositiva"
            :aria-label="`${item.title}, ${index + 1} de ${count}`"
          >
            <div
              class="absolute overflow-hidden [backface-visibility:hidden]"
              :style="{ left: `${-cardW / 2}px`, top: `${-cardH / 2}px`, width: `${cardW}px`, height: `${cardH}px`, borderRadius: 'var(--cc-radius)' }"
            >
              <slot name="item" :item="item" :index="index" :active="index === active" />
              <div class="pointer-events-none absolute inset-0 bg-[var(--cc-fade)] opacity-[var(--cc-depth,0)]" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="sr-only" aria-live="polite" aria-atomic="true">
      {{ current ? `${current.title}, ${active + 1} de ${count}` : '' }}
    </div>
  </div>
</template>
