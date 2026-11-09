<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { PC_VIEWBOX, entryOffset, pcParts, powerButton, type PcPart, type PcStage } from './pcGeometry'
import { prefersReducedMotion } from '@/composables/useReducedMotion'

/**
 * PC isométrico en SVG por capas. Muestra el estado de una sección (`stage`) y, en desktop
 * sin prefers-reduced-motion, anima con GSAP ScrollTrigger (scrub suave) solo las piezas
 * que entran en esa etapa. En móvil y con reduced-motion queda el estado final estático.
 */
const props = withDefaults(
  defineProps<{
    stage: PcStage
    /** Elemento que dispara el scroll (por defecto, la sección que contiene el PC). */
    trigger?: string
    animate?: boolean
  }>(),
  { trigger: undefined, animate: true },
)

const root = ref<SVGSVGElement | null>(null)

const visible = (part: PcPart): boolean => {
  if (part.id === 'case-wire') return props.stage === 0
  if (part.id === 'side-open') return props.stage < 5
  return props.stage >= part.stage
}

const parts = computed(() => pcParts.filter(visible))
const ledOn = computed(() => props.stage >= 5)

let cleanup: (() => void) | undefined

onMounted(async () => {
  if (!props.animate || prefersReducedMotion() || typeof window.matchMedia !== 'function') return
  if (!window.matchMedia('(min-width: 1024px)').matches || !root.value) return
  const { gsap } = await import('@/lib/gsap')
  const svg = root.value
  const section = (props.trigger ? document.querySelector(props.trigger) : svg.closest('section')) ?? svg
  const fresh = pcParts.filter((p) => p.stage === props.stage && visible(p)).map((p) => p.id)

  const ctx = gsap.context(() => {
    if (props.stage === 0) {
      gsap.from(svg.querySelector('[data-part="case-wire"]'), { opacity: 0, scale: 0.96, transformOrigin: '50% 60%', duration: 1.2, ease: 'power2.out' })
      return
    }
    const tl = gsap.timeline({
      scrollTrigger: { trigger: section, start: 'top 80%', end: 'center 55%', scrub: 0.8 },
    })
    fresh.forEach((id, i) => {
      const el = svg.querySelector(`[data-part="${id}"]`)
      if (!el) return
      const off = entryOffset[id] ?? { x: 0, y: 0 }
      tl.from(el, { x: off.x, y: off.y, opacity: 0, ease: 'power2.out', duration: 1 }, i * 0.25)
    })
    if (props.stage === 5) {
      tl.from(svg.querySelector('[data-led]'), { opacity: 0, duration: 0.4 }, '>-0.1')
    }
  }, svg)
  cleanup = () => ctx.revert()
})

onBeforeUnmount(() => cleanup?.())

const strokeDash = (dash?: string) => dash ?? undefined
const CASE = new Set(['case-wire', 'case-walls', 'case-panels', 'side-open', 'glass'])
/** Las piezas que entran en esta sección se resaltan con trazo blanco (como en el storyboard). */
const isNew = (part: PcPart) => part.stage === props.stage && !CASE.has(part.id)
const strokeOf = (part: PcPart, stroke: string) => (isNew(part) && stroke === '#9C9A94' ? '#ECEAE6' : stroke)
</script>

<template>
  <svg
    ref="root"
    :viewBox="PC_VIEWBOX"
    class="pointer-events-none block h-auto w-full select-none"
    aria-hidden="true"
    focusable="false"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g v-for="part in parts" :key="part.id" :data-part="part.id">
      <template v-for="(s, i) in part.shapes" :key="i">
        <polygon
          v-if="s.type === 'polygon'"
          :points="s.points"
          :fill="s.fill"
          :stroke="strokeOf(part, s.stroke)"
          :stroke-width="isNew(part) ? 1.4 : s.strokeWidth"
          :stroke-dasharray="strokeDash(s.dash)"
          :opacity="s.opacity"
          stroke-linejoin="round"
        />
        <line v-else-if="s.type === 'line'" :x1="s.x1" :y1="s.y1" :x2="s.x2" :y2="s.y2" :stroke="s.stroke" :stroke-width="s.strokeWidth" />
        <path v-else-if="s.type === 'path'" :d="s.d" :fill="s.fill" :stroke="strokeOf(part, s.stroke)" :stroke-width="s.strokeWidth" />
      </template>
      <ellipse
        v-if="part.id === 'case-panels'"
        :cx="powerButton.cx"
        :cy="powerButton.cy"
        rx="6"
        ry="4"
        fill="none"
        stroke="#3A3E45"
        stroke-width="1.2"
      />
    </g>
    <ellipse v-if="ledOn" data-led :cx="powerButton.cx" :cy="powerButton.cy" rx="6" ry="4" fill="#E8A33D" stroke="#E8A33D" stroke-width="1.2" />
  </svg>
</template>
