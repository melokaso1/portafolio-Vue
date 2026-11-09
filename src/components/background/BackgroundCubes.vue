<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useFinePointer } from '@/composables/useFinePointer'
import { subscribePointer, type PointerState } from '@/composables/usePointer'

/**
 * Fondo de toda la página con el look de Cubes (Vue Bits, preset gap 0.3 y aristas punteadas
 * #2A2D32), dibujado en UN solo <canvas> en vez de cientos de cubos 3D en el DOM.
 *
 * - La retícula punteada es un fondo CSS estático (un tile SVG); el canvas queda transparente y
 *   solo pinta las celdas activas: el "cubo" que se inclina cerca del cursor y la onda ámbar al
 *   hacer clic en una zona sin enlaces.
 * - rAF solo mientras hay algo animándose; sin trabajo con la página quieta o la pestaña oculta.
 * - DPR limitado a 1.5. El puntero llega del seguimiento compartido (usePointer).
 * - Táctil o prefers-reduced-motion: solo la retícula estática (sin canvas ni JS).
 */
const fine = useFinePointer()
const canvasRef = ref<HTMLCanvasElement | null>(null)

const CELL = 64
const FACE = 49 // cara del cubo (gap 0.3 de la celda)
const INSET = (CELL - FACE) / 2
const RADIUS = 3 // celdas alcanzadas por el realce del cursor
const MAX_TILT = 10 // px de desplazamiento de la cara frontal (equivale a ~40°)
const RIPPLE_RINGS = 12
const RING_DELAY = 0.075 // s entre anillos
const RIPPLE_IN = 0.15
const RIPPLE_HOLD = 0.3
const RIPPLE_OUT = 0.15
const RIPPLE_RGB = '232, 163, 61'
const RIPPLE_ALPHA = 0.22
const LINE = '#2A2D32'
const BG = '#0E0F11'
const SIDE = '#1A1D21'
const EDGE = '#3A3E45'

let ctx: CanvasRenderingContext2D | null = null
let cols = 0
let rows = 0
let dpr = 1
let raf = 0
// Inclinación actual de cada celda (dirección x/y y fuerza), interpolada hacia el objetivo.
let tiltX = new Float32Array(0)
let tiltY = new Float32Array(0)
let aimX = new Float32Array(0)
let aimY = new Float32Array(0)
const active = new Set<number>()
const ripples: { col: number; row: number; t0: number }[] = []
let lastRipple = -Infinity
let offPointer: (() => void) | undefined

const resize = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  dpr = Math.min(window.devicePixelRatio || 1, 1.5)
  const w = window.innerWidth
  const h = window.innerHeight
  canvas.width = Math.round(w * dpr)
  canvas.height = Math.round(h * dpr)
  cols = Math.ceil(w / CELL)
  rows = Math.ceil(h / CELL)
  const n = cols * rows
  tiltX = new Float32Array(n)
  tiltY = new Float32Array(n)
  aimX = new Float32Array(n)
  aimY = new Float32Array(n)
  active.clear()
  ctx = canvas.getContext('2d')
  wake()
}

const aimAt = (p: Readonly<PointerState>) => {
  for (const i of active) {
    aimX[i] = 0
    aimY[i] = 0
  }
  if (p.inside) {
    const pc = p.x / CELL - 0.5
    const pr = p.y / CELL - 0.5
    const c0 = Math.max(0, Math.floor(pc - RADIUS))
    const c1 = Math.min(cols - 1, Math.ceil(pc + RADIUS))
    const r0 = Math.max(0, Math.floor(pr - RADIUS))
    const r1 = Math.min(rows - 1, Math.ceil(pr + RADIUS))
    for (let r = r0; r <= r1; r++) {
      for (let c = c0; c <= c1; c++) {
        const dx = c - pc
        const dy = r - pr
        const d = Math.hypot(dx, dy)
        if (d > RADIUS) continue
        const k = (1 - d / RADIUS) ** 1.5
        const len = d || 1
        const i = r * cols + c
        // La cara se aleja del cursor, como el cubo que se inclina.
        aimX[i] = (dx / len) * k * MAX_TILT
        aimY[i] = (dy / len) * k * MAX_TILT
        active.add(i)
      }
    }
  }
  wake()
}

const rippleLevel = (c: number, r: number, now: number) => {
  let level = 0
  for (const rp of ripples) {
    const ring = Math.round(Math.hypot(c - rp.col, r - rp.row))
    if (ring > RIPPLE_RINGS) continue
    const t = (now - rp.t0) / 1000 - ring * RING_DELAY
    if (t <= 0) continue
    let v = 0
    if (t < RIPPLE_IN) v = t / RIPPLE_IN
    else if (t < RIPPLE_IN + RIPPLE_HOLD) v = 1
    else if (t < RIPPLE_IN + RIPPLE_HOLD + RIPPLE_OUT) v = 1 - (t - RIPPLE_IN - RIPPLE_HOLD) / RIPPLE_OUT
    level = Math.max(level, v * (1 - (ring / (RIPPLE_RINGS + 1)) * 0.5))
  }
  return level
}

const drawCell = (c: number, r: number, tx: number, ty: number, glow: number) => {
  if (!ctx) return
  const x = c * CELL + INSET
  const y = r * CELL + INSET
  const fx = x + tx
  const fy = y + ty
  // Tapa la cara estática y dibuja los lados visibles (cubo inclinado) y la cara frontal.
  ctx.fillStyle = BG
  ctx.fillRect(x - 1.5, y - 1.5, FACE + 3, FACE + 3)
  if (tx || ty) {
    ctx.fillStyle = SIDE
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + FACE, y)
    ctx.lineTo(x + FACE, y + FACE)
    ctx.lineTo(x, y + FACE)
    ctx.closePath()
    ctx.fill()
    ctx.beginPath()
    for (const [ax, ay] of [
      [0, 0],
      [FACE, 0],
      [FACE, FACE],
      [0, FACE],
    ] as const) {
      ctx.moveTo(x + ax, y + ay)
      ctx.lineTo(fx + ax, fy + ay)
    }
    ctx.stroke()
    ctx.strokeRect(x + 0.5, y + 0.5, FACE - 1, FACE - 1)
  }
  ctx.fillStyle = BG
  ctx.fillRect(fx, fy, FACE, FACE)
  if (glow > 0) {
    ctx.fillStyle = `rgba(${RIPPLE_RGB}, ${(RIPPLE_ALPHA * glow).toFixed(3)})`
    ctx.fillRect(fx, fy, FACE, FACE)
  }
  if (tx || ty) ctx.strokeStyle = EDGE
  ctx.strokeRect(fx + 0.5, fy + 0.5, FACE - 1, FACE - 1)
  ctx.strokeStyle = LINE
}

const frame = (now: number) => {
  raf = 0
  if (!ctx) return
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, cols * CELL, rows * CELL)
  ctx.lineWidth = 1
  ctx.strokeStyle = LINE
  ctx.setLineDash([4, 3])

  let busy = false
  const cells = new Set(active)
  // Celdas alcanzadas por alguna onda.
  for (let k = ripples.length - 1; k >= 0; k--) {
    const rp = ripples[k]!
    const age = (now - rp.t0) / 1000
    if (age > RIPPLE_RINGS * RING_DELAY + RIPPLE_IN + RIPPLE_HOLD + RIPPLE_OUT) {
      ripples.splice(k, 1)
      continue
    }
    busy = true
    const r0 = Math.max(0, rp.row - RIPPLE_RINGS)
    const r1 = Math.min(rows - 1, rp.row + RIPPLE_RINGS)
    const c0 = Math.max(0, rp.col - RIPPLE_RINGS)
    const c1 = Math.min(cols - 1, rp.col + RIPPLE_RINGS)
    for (let r = r0; r <= r1; r++) for (let c = c0; c <= c1; c++) cells.add(r * cols + c)
  }

  for (const i of cells) {
    const c = i % cols
    const r = (i - c) / cols
    // Interpolación suave hacia la inclinación objetivo (como el tween de Cubes).
    tiltX[i]! += (aimX[i]! - tiltX[i]!) * 0.2
    tiltY[i]! += (aimY[i]! - tiltY[i]!) * 0.2
    const moving = Math.abs(aimX[i]! - tiltX[i]!) > 0.05 || Math.abs(aimY[i]! - tiltY[i]!) > 0.05
    if (!moving && !aimX[i] && !aimY[i]) {
      tiltX[i] = 0
      tiltY[i] = 0
      active.delete(i)
    } else if (moving) busy = true
    const glow = ripples.length ? rippleLevel(c, r, now) : 0
    if (tiltX[i] || tiltY[i] || glow > 0) drawCell(c, r, tiltX[i]!, tiltY[i]!, glow)
  }
  if (busy && !document.hidden) raf = requestAnimationFrame(frame)
}

const wake = () => {
  if (!raf && ctx && !document.hidden) raf = requestAnimationFrame(frame)
}

const onClick = (e: MouseEvent) => {
  if ((e.target as Element | null)?.closest?.('a, button, input, textarea, select, [role="button"], [data-cursor]')) return
  const now = performance.now()
  if (now - lastRipple < 180) return
  lastRipple = now
  if (ripples.length >= 3) ripples.shift()
  ripples.push({ col: Math.floor(e.clientX / CELL), row: Math.floor(e.clientY / CELL), t0: now })
  wake()
}
const onVisibility = () => {
  if (document.hidden) {
    cancelAnimationFrame(raf)
    raf = 0
  } else wake()
}
let resizeTimer: ReturnType<typeof setTimeout> | undefined
const onResize = () => {
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(resize, 150)
}

const start = () => {
  resize()
  offPointer = subscribePointer(aimAt)
  window.addEventListener('click', onClick, { passive: true })
  window.addEventListener('resize', onResize, { passive: true })
  document.addEventListener('visibilitychange', onVisibility)
}
const stop = () => {
  cancelAnimationFrame(raf)
  raf = 0
  clearTimeout(resizeTimer)
  offPointer?.()
  offPointer = undefined
  ctx = null
  window.removeEventListener('click', onClick)
  window.removeEventListener('resize', onResize)
  document.removeEventListener('visibilitychange', onVisibility)
}

watch(canvasRef, (el) => (el ? start() : stop()))
onMounted(() => canvasRef.value && !ctx && start())
onBeforeUnmount(stop)
</script>

<template>
  <div id="bg-cubes" class="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg" aria-hidden="true">
    <div class="static-grid absolute inset-0" />
    <canvas v-if="fine" ref="canvasRef" class="absolute inset-0 h-full w-full" />
    <!-- Velo: el texto (columna izquierda) queda sobre fondo casi liso; los cubos se ven a la derecha. -->
    <div class="veil absolute inset-0" />
  </div>
</template>

<style scoped>
.static-grid {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Crect x='7.5' y='7.5' width='49' height='49' fill='none' stroke='%232A2D32' stroke-dasharray='4 3'/%3E%3C/svg%3E");
  background-size: 64px 64px;
}
.veil {
  background: linear-gradient(
    to right,
    rgb(14 15 17 / 0.88) 0%,
    rgb(14 15 17 / 0.8) 50%,
    rgb(14 15 17 / 0.35) 72%,
    rgb(14 15 17 / 0.1) 100%
  );
}
@media (max-width: 1023px) {
  .veil {
    background: rgb(14 15 17 / 0.72);
  }
}
</style>
