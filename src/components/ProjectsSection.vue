<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue'
import PcIllustration from './pc/PcIllustration.vue'
import { captionLine, holoArt, monograms, shortTitle } from './projects/projectArt'
import { projects } from '@/data/projects'
import { personalInfo } from '@/data/profile'
import { useFinePointer, useMinWidth } from '@/composables/useFinePointer'

/**
 * Proyectos: Circular Carousel (preset orbit) con Holo Cards, ambos portados de React Bits.
 * Con puntero fino y sin reduced-motion se monta el carrusel (carga diferida); en táctil o con
 * reduced-motion queda una fila con scroll-snap, sin tilt ni foil.
 */
const CircularCarousel = defineAsyncComponent(() => import('./react-bits/CircularCarousel.vue'))
const HoloCard = defineAsyncComponent(() => import('./react-bits/HoloCard.vue'))

const finePointer = useFinePointer()
const wide = useMinWidth(768)
/** El carrusel 3D necesita mouse y ancho; si no, fila con scroll-snap. */
const fine = computed(() => finePointer.value && wide.value)
const cards = projects.map((p, i) => ({
  id: p.id,
  title: shortTitle(p.title),
  monogram: monograms[p.id] ?? p.title.slice(0, 2).toUpperCase(),
  tech: p.tech.slice(0, 3),
  caption: captionLine(p.problem, p.summary),
  links: p.links,
  art: holoArt(i + 3),
}))

const active = ref(0)
const current = computed(() => cards[active.value] ?? cards[0]!)
const carousel = ref<{ focusIndex: (i: number) => void } | null>(null)
const goTo = (i: number) => carousel.value?.focusIndex(i)
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
          <p v-if="fine" class="hidden pb-2 font-mono text-xs text-muted md:block" aria-hidden="true">← arrastra para explorar →</p>
          <div v-reveal class="w-[120px] lg:w-[220px]">
            <PcIllustration :stage="2" />
            <p class="pcl hidden text-right lg:block" aria-hidden="true">02 · GPU + monitor</p>
          </div>
        </div>
      </div>

      <template v-if="fine">
        <div class="relative mx-auto h-[440px] w-full max-w-[1080px]">
          <CircularCarousel
            ref="carousel"
            :items="cards"
            preset="orbit"
            :card-width="240"
            :aspect-ratio="0.75"
            :tilt="-16"
            :perspective="1500"
            :gap="25"
            autoplay="off"
            :depth-fade="0.6"
            fade-color="#0E0F11"
            label="Proyectos"
            @change="active = $event"
          >
            <template #item="{ item, index, active: isActive }">
              <HoloCard :image="cards[index]!.art" :active="isActive" class="h-full w-full">
                <div class="pointer-events-none absolute inset-0 flex flex-col">
                  <div class="flex h-[62%] items-center justify-center pt-3">
                    <span class="font-display text-[56px] font-semibold tracking-[-0.03em] text-ink/90">{{ cards[index]!.monogram }}</span>
                  </div>
                  <div class="mt-auto px-5 pb-5">
                    <p class="font-display text-[19px] font-semibold leading-tight text-ink">{{ item.title }}</p>
                    <p class="mt-1 font-mono text-[11px] text-muted">{{ cards[index]!.tech.join(' · ') }}</p>
                  </div>
                </div>
              </HoloCard>
            </template>
          </CircularCarousel>
        </div>

        <div class="mx-auto mt-2 max-w-[640px] text-center">
          <h3 class="font-display text-[26px] font-semibold text-ink">{{ current.title }}</h3>
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
        <div class="mt-[18px] flex justify-center gap-1" role="group" aria-label="Elegir proyecto">
          <button
            v-for="(card, i) in cards"
            :key="card.id"
            type="button"
            class="flex h-6 items-center px-1"
            :aria-label="`Ver ${card.title}`"
            :aria-current="i === active ? 'true' : undefined"
            @click="goTo(i)"
          >
            <span class="block h-1.5 rounded-full transition-all duration-300" :class="i === active ? 'w-5 bg-ink' : 'w-1.5 bg-line'" />
          </button>
        </div>
      </template>

      <!-- Táctil / reduced-motion: fila con scroll-snap. -->
      <ul v-else class="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:mx-0 sm:px-0" aria-label="Proyectos">
        <li v-for="card in cards" :key="card.id" class="w-[240px] shrink-0 snap-center">
          <div class="relative h-[320px] overflow-hidden rounded-2xl">
            <img :src="card.art" alt="" class="absolute inset-0 h-full w-full" />
            <div class="absolute inset-0 flex h-[62%] items-center justify-center pt-3" aria-hidden="true">
              <span class="font-display text-[56px] font-semibold tracking-[-0.03em] text-ink/90">{{ card.monogram }}</span>
            </div>
            <div class="absolute inset-x-5 bottom-5">
              <h3 class="font-display text-[19px] font-semibold leading-tight text-ink">{{ card.title }}</h3>
              <p class="mt-1 font-mono text-[11px] text-muted">{{ card.tech.join(' · ') }}</p>
            </div>
          </div>
          <p class="mt-3 text-sm text-muted">{{ card.caption }}</p>
          <div v-if="card.links.length" class="mt-2 flex flex-wrap gap-3">
            <a v-for="l in card.links" :key="l.url" :href="l.url" target="_blank" rel="noopener noreferrer" class="link text-sm">
              {{ l.label }} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </li>
      </ul>

      <p class="mt-6 text-center">
        <a :href="personalInfo.github" target="_blank" rel="noopener noreferrer" class="link">Más en GitHub <span aria-hidden="true">↗</span></a>
      </p>
    </div>
  </section>
</template>
