<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import PcIllustration from './pc/PcIllustration.vue'
import { hero } from '@/data/hero'
import { personalInfo } from '@/data/profile'
import { useFinePointer } from '@/composables/useFinePointer'

const Cubes = defineAsyncComponent(() => import('./vue-bits/Cubes.vue'))
const TechText = defineAsyncComponent(() => import('./vue-bits/TechText.vue'))
const fine = useFinePointer()

const [titleStart, titleEnd] = hero.title.split('.NET')
const wordmark = ['Alejandro', 'Escobar']
</script>

<template>
  <section id="hero" class="relative overflow-hidden pb-16 pt-[92px] lg:min-h-[640px] lg:pb-12 lg:pt-[120px]" aria-labelledby="hero-title">
    <!-- Fondo: Cubes (Vue Bits) con puntero fino; si no, una retícula estática punteada. -->
    <div class="hero-fade pointer-events-auto absolute inset-0 -z-0" aria-hidden="true">
      <div v-if="fine" class="absolute inset-x-0 top-0">
        <Cubes
          :grid-size="20"
          :max-angle="40"
          :radius="3"
          :cell-gap="14"
          border-style="1px dashed #2A2D32"
          face-color="#0E0F11"
          :auto-animate="false"
          :ripple-on-click="false"
        />
      </div>
      <div v-else class="cube-grid absolute inset-0" />
    </div>

    <div class="shell relative grid items-start gap-10 lg:grid-cols-[minmax(0,580px)_minmax(0,460px)]">
      <div class="pointer-events-none relative z-10 [&_a]:pointer-events-auto">
        <!-- Eyebrow de estado: texto mono gris con un punto ámbar (pulso suave, sin pulso con reduced-motion). -->
        <p class="status-eyebrow flex items-center gap-2.5 font-mono text-[11px] tracking-[0.02em] text-muted sm:text-xs sm:tracking-[0.04em] lg:text-[13px]">
          <span class="status-dot relative inline-flex h-1.5 w-1.5 shrink-0" aria-hidden="true">
            <span class="absolute inset-0 rounded-full bg-accent" />
          </span>
          {{ hero.badge }}
        </p>

        <p class="sr-only">{{ personalInfo.name }}</p>
        <div class="pointer-events-auto mt-5 lg:mt-6" aria-hidden="true">
          <template v-if="fine">
            <div v-for="word in wordmark" :key="word" class="h-[90px] lg:h-[116px]">
              <TechText
                :text="word"
                font-family="Inter Tight, Inter, sans-serif"
                :font-weight="600"
                :font-size="104"
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

      <div v-reveal class="pointer-events-none relative z-10 mx-auto w-full max-w-[300px] lg:mt-[-20px] lg:max-w-none">
        <PcIllustration :stage="0" />
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

.hero-fade {
  -webkit-mask-image: linear-gradient(to bottom, #000 35%, transparent 100%);
  mask-image: linear-gradient(to bottom, #000 35%, transparent 100%);
}
.cube-grid {
  background-image:
    linear-gradient(to right, rgb(var(--line)) 1px, transparent 1px),
    linear-gradient(to bottom, rgb(var(--line)) 1px, transparent 1px);
  background-size: 57px 57px;
  opacity: 0.55;
}
</style>
