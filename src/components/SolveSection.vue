<script setup lang="ts">
import SectionHeading from './SectionHeading.vue'
import SpotlightCard from '@/components/vue-bits/SpotlightCard.vue'
import MotionReveal from '@/components/motion/MotionReveal.vue'
import { solveItems } from '@/data/solve'

const icons: Record<string, string> = {
  apis: 'M4 6h16M4 12h16M4 18h10',
  integraciones: 'M8 7h8m-8 10h8M5 12h14M12 5v14',
  automatizaciones: 'M13 3L4 14h7l-1 7 9-11h-7l1-7z',
}
</script>

<template>
  <section id="resuelvo" class="section" aria-labelledby="resuelvo-title">
    <SectionHeading
      id="resuelvo"
      command="cat ./lo-que-resuelvo.md"
      title="Lo que resuelvo"
      description="Problemas concretos de backend que puedo quitarte de encima, como freelance o dentro de tu equipo."
    />

    <ul class="grid gap-5 md:grid-cols-3">
      <li v-for="(item, i) in solveItems" :key="item.id" class="h-full">
        <MotionReveal :delay="i * 0.1" class-name="h-full">
          <SpotlightCard class-name="card h-full !rounded-xl !p-6" spotlight-color="rgba(74, 222, 128, 0.18)">
            <div class="relative">
              <span class="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-green/30 bg-green/10 text-green" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path :d="icons[item.id]" />
                </svg>
              </span>
              <h3 class="mt-4 text-lg font-semibold text-text">{{ item.title }}</h3>
              <p class="mt-3 leading-relaxed text-text/85">{{ item.description }}</p>
              <p v-if="item.proof.length" class="mt-4 font-mono text-xs text-muted">
                Lo he hecho en: {{ item.proof.join(' · ') }}
              </p>
            </div>
          </SpotlightCard>
        </MotionReveal>
      </li>
    </ul>
  </section>
</template>
