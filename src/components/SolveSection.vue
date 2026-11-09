<script setup lang="ts">
import TechHeading from './TechHeading.vue'
import { solveItems } from '@/data/solve'

/** Íconos de trazo fino (los mismos del Figma v2). */
const icons: Record<string, string[]> = {
  apis: [
    'M16 8 Q10 8 10 14 L10 19 Q10 22 6 22 Q10 22 10 25 L10 30 Q10 36 16 36',
    'M28 8 Q34 8 34 14 L34 19 Q34 22 38 22 Q34 22 34 25 L34 30 Q34 36 28 36',
  ],
  integraciones: ['M4 9 a3 3 0 0 1 3 -3 h8 a3 3 0 0 1 3 3 v8 a3 3 0 0 1 -3 3 h-8 a3 3 0 0 1 -3 -3 z', 'M26 27 a3 3 0 0 1 3 -3 h8 a3 3 0 0 1 3 3 v8 a3 3 0 0 1 -3 3 h-8 a3 3 0 0 1 -3 -3 z', 'M18 13 L26 13 Q33 13 33 20 L33 24'],
  automatizaciones: ['M34 16 A13 13 0 0 0 10 18', 'M10 28 A13 13 0 0 0 34 26', 'M34 9 L34 16 L27 16', 'M10 35 L10 28 L17 28'],
}
</script>

<template>
  <section id="resuelvo" class="section" aria-labelledby="resuelvo-title">
    <div class="shell">
      <div>
        <div class="mb-3 flex items-end justify-between gap-4 lg:mb-10">
          <div class="min-w-0 flex-1">
            <p class="idx" aria-hidden="true">01</p>
            <TechHeading id="resuelvo-title" class="mt-2.5" text="Lo que resuelvo" />
          </div>
        </div>
        <ul class="lg:grid lg:grid-cols-3 lg:border-t lg:border-line">
          <li
            v-for="(item, i) in solveItems"
            :key="item.id"
            v-reveal="i * 90"
            class="flex items-center gap-5 border-t border-line py-4 last:border-b lg:block lg:border-y-0 lg:py-7 lg:last:border-b-0 lg:pr-7 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:border-line lg:[&:not(:first-child)]:pl-7"
          >
            <svg class="hidden h-11 w-11 shrink-0 text-muted sm:block lg:mb-5" viewBox="0 0 44 44" fill="none" aria-hidden="true">
              <path
                v-for="(d, k) in icons[item.id]"
                :key="k"
                :d="d"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                :stroke-dasharray="item.id === 'integraciones' && k === 2 ? '3 3' : undefined"
              />
            </svg>
            <div>
              <h3 class="font-display text-[19px] font-semibold tracking-[-0.01em] text-ink lg:text-2xl">{{ item.title }}</h3>
              <p class="mt-1.5 text-sm text-muted lg:mt-2">{{ item.proof.join(' · ') }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
