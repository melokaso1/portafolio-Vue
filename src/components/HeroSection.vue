<script setup lang="ts">
import { defineAsyncComponent, onBeforeUnmount, onMounted, ref } from 'vue'
import { hero } from '@/data/hero'
import { personalInfo } from '@/data/profile'
import { useFinePointer } from '@/composables/useFinePointer'

const TechText = defineAsyncComponent(() => import('./vue-bits/TechText.vue'))
const fine = useFinePointer()

const [titleStart, titleEnd] = hero.title.split('.NET')
const wordmark = ['Alejandro', 'Escobar']

/**
 * Un solo tamaño para las dos líneas: se calcula con el ancho de la columna y la palabra más
 * larga ("Alejandro" mide ~4.1 veces el tamaño de letra en Inter Tight 600).
 */
const wordmarkRef = ref<HTMLElement | null>(null)
const wordSize = ref(104)
let ro: ResizeObserver | null = null
onMounted(() => {
  const update = () => {
    const w = wordmarkRef.value?.clientWidth ?? 0
    if (w) wordSize.value = Math.min(104, Math.floor((w * 0.97) / 4.1))
  }
  update()
  if (typeof ResizeObserver !== 'undefined' && wordmarkRef.value) {
    ro = new ResizeObserver(update)
    ro.observe(wordmarkRef.value)
  }
})
onBeforeUnmount(() => ro?.disconnect())
</script>

<template>
  <section id="hero" class="relative pb-16 pt-[92px] lg:min-h-[600px] lg:pb-12 lg:pt-[120px]" aria-labelledby="hero-title">
    <div class="shell relative">
      <div class="relative z-10 max-w-[760px]">
        <!-- Eyebrow de estado: texto mono gris con un punto ámbar (pulso suave, sin pulso con reduced-motion). -->
        <p class="status-eyebrow flex items-center gap-2.5 font-mono text-[11px] tracking-[0.02em] text-muted sm:text-xs sm:tracking-[0.04em] lg:text-[13px]">
          <span class="status-dot relative inline-flex h-1.5 w-1.5 shrink-0" aria-hidden="true">
            <span class="absolute inset-0 rounded-full bg-accent" />
          </span>
          {{ hero.badge }}
        </p>

        <p class="sr-only">{{ personalInfo.name }}</p>
        <div ref="wordmarkRef" class="mt-5 lg:mt-6" aria-hidden="true">
          <template v-if="fine">
            <div v-for="word in wordmark" :key="word" :style="{ height: `${Math.round(wordSize * 1.12)}px` }">
              <TechText
                :text="word"
                font-family="Inter Tight, Inter, sans-serif"
                :font-weight="600"
                :font-size="wordSize"
                :letter-spacing="-0.03"
                color="#ECEAE6"
                accent-color="#E8A33D"
                :reach="160"
                :specks="0"
                :selection="false"
                :labels="false"
                :draggable="false"
                :sweep="false"
                reveal="area"
                align="left"
                fixed-size
              />
            </div>
          </template>
          <p v-else class="font-display text-[clamp(56px,17vw,104px)] font-semibold leading-[1.02] tracking-[-0.03em] text-ink">
            <span v-for="word in wordmark" :key="word" class="block">{{ word }}</span>
          </p>
        </div>

        <h1 id="hero-title" class="mt-3 max-w-[760px] font-display text-[22px] font-medium leading-[1.15] tracking-[-0.015em] text-ink lg:mt-3.5 lg:text-[30px]">
          {{ titleStart }}<span class="text-accent">.NET</span>{{ titleEnd }}
        </h1>
        <p class="mt-3.5 text-[17px] text-muted">{{ hero.subtitle }}</p>

        <div class="mt-6 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-3 lg:mt-8">
          <a :href="hero.primaryCta.href" class="btn btn-primary justify-center">{{ hero.primaryCta.label }}</a>
          <a :href="personalInfo.linkedin" target="_blank" rel="noopener noreferrer" class="btn btn-ghost justify-center">
            {{ hero.linkedinCta.label }} <span aria-hidden="true">↗</span>
          </a>
          <a :href="personalInfo.github" target="_blank" rel="noopener noreferrer" class="link self-center px-2 text-sm sm:self-auto">
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.status-dot::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  background: rgb(var(--accent));
  opacity: 0;
  animation: status-pulse 2.4s ease-out infinite;
}
@keyframes status-pulse {
  0% {
    transform: scale(1);
    opacity: 0.45;
  }
  70%,
  100% {
    transform: scale(2.8);
    opacity: 0;
  }
}
@media (prefers-reduced-motion: reduce) {
  .status-dot::after {
    animation: none;
  }
}
</style>
