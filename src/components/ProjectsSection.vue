<script setup lang="ts">
import { computed, ref } from 'vue'
import CircularCarousel from './react-bits/CircularCarousel.vue'
import ProjectCard from './projects/ProjectCard.vue'
import { captionLine, monograms, shortTitle } from './projects/projectArt'
import { projects } from '@/data/projects'
import { personalInfo } from '@/data/profile'
import { useFinePointer, useMinWidth } from '@/composables/useFinePointer'

/**
 * Proyectos: Circular Carousel (preset orbit, portado de React Bits) con tarjetas limpias, en
 * todos los dispositivos. En desktop se ve el anillo completo; en móvil la carta activa queda
 * centrada a casi todo el ancho, las vecinas asoman por los lados, el tilt y la perspectiva son
 * más suaves y se navega con swipe, puntos o los botones anterior/siguiente.
 * Con prefers-reduced-motion el carrusel no tiene tilt y cambia de carta al instante.
 */
const finePointer = useFinePointer()
const wide = useMinWidth(768)
const cards = projects.map((p) => ({
  id: p.id,
  title: shortTitle(p.title),
  monogram: monograms[p.id] ?? p.title.slice(0, 2).toUpperCase(),
  tech: p.tech.slice(0, 3),
  caption: captionLine(p.problem, p.summary),
  links: p.links,
}))

/** Geometría por tamaño: desktop = anillo completo; móvil = carta activa grande y vecinas asomando. */
const geometry = computed(() =>
  wide.value
    ? { cardWidth: 240, gap: 25, tilt: -16, perspective: 1500, spread: undefined, fit: 'ring' as const }
    : { cardWidth: 230, gap: 20, tilt: -6, perspective: 1200, spread: 1.07, fit: 'card' as const },
)

const active = ref(0)
const current = computed(() => cards[active.value] ?? cards[0]!)
const carousel = ref<{ focusIndex: (i: number) => void; stepBy: (d: number) => void } | null>(null)
const goTo = (i: number) => carousel.value?.focusIndex(i)
const step = (d: number) => carousel.value?.stepBy(d)
</script>

<template>
  <section id="projects" class="section" aria-labelledby="projects-title">
    <div class="shell">
      <div class="mb-6 flex items-end justify-between gap-4 lg:mb-10">
        <div>
          <p class="idx" aria-hidden="true">02</p>
          <h2 id="projects-title" class="h2 mt-2.5">Proyectos</h2>
        </div>
        <div class="flex items-end gap-4">
          <p class="pb-2 font-mono text-xs text-muted" aria-hidden="true">{{ finePointer ? '← arrastra para explorar →' : '← desliza para explorar →' }}</p>
        </div>
      </div>

      <div class="relative -mx-5 h-[380px] sm:mx-auto md:h-[440px] md:w-full md:max-w-[1080px]">
        <CircularCarousel
          ref="carousel"
          :items="cards"
          preset="orbit"
          :card-width="geometry.cardWidth"
          :aspect-ratio="0.75"
          :tilt="geometry.tilt"
          :perspective="geometry.perspective"
          :gap="geometry.gap"
          :spread="geometry.spread"
          :fit="geometry.fit"
          autoplay="off"
          :depth-fade="0.6"
          fade-color="#0E0F11"
          label="Proyectos"
          @change="active = $event"
        >
          <template #item="{ item, index, active: isActive }">
            <ProjectCard :monogram="cards[index]!.monogram" :title="item.title" :tech="cards[index]!.tech" :active="isActive" />
          </template>
        </CircularCarousel>
      </div>

      <div class="mx-auto mt-2 max-w-[640px] text-center">
        <h3 class="font-display text-[22px] font-semibold text-ink md:text-[26px]">{{ current.title }}</h3>
        <p class="mt-1.5 text-[15px] text-muted">{{ current.caption }}</p>
        <div class="mt-3.5 flex flex-wrap justify-center gap-1.5">
          <span v-for="t in current.tech" :key="t" class="chip">{{ t }}</span>
        </div>
        <div v-if="current.links.length" class="mt-3 flex flex-wrap justify-center gap-4">
          <a v-for="l in current.links" :key="l.url" :href="l.url" target="_blank" rel="noopener noreferrer" class="link text-sm">
            {{ l.label }} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <div class="mt-[18px] flex items-center justify-center gap-3">
        <button type="button" class="cc-nav" aria-label="Proyecto anterior" @click="step(-1)">
          <span aria-hidden="true">←</span>
        </button>
        <div class="flex justify-center gap-0.5" role="group" aria-label="Elegir proyecto">
          <button
            v-for="(card, i) in cards"
            :key="card.id"
            type="button"
            class="flex h-11 items-center px-1"
            :aria-label="`Ver ${card.title}`"
            :aria-current="i === active ? 'true' : undefined"
            @click="goTo(i)"
          >
            <span class="block h-1.5 rounded-full transition-all duration-300 motion-reduce:transition-none" :class="i === active ? 'w-5 bg-ink' : 'w-1.5 bg-line'" />
          </button>
        </div>
        <button type="button" class="cc-nav" aria-label="Proyecto siguiente" @click="step(1)">
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <p class="mt-6 text-center">
        <a :href="personalInfo.github" target="_blank" rel="noopener noreferrer" class="link">Más en GitHub <span aria-hidden="true">↗</span></a>
      </p>
    </div>
  </section>
</template>

<style scoped>
.cc-nav {
  display: inline-flex;
  height: 2.75rem;
  width: 2.75rem;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  border: 1px solid rgb(var(--line));
  color: rgb(var(--ink));
  transition: border-color 0.2s ease;
}
.cc-nav:hover,
.cc-nav:focus-visible {
  border-color: rgb(var(--accent) / 0.6);
}
</style>
