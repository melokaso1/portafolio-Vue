<script setup lang="ts">
import SectionHeading from './SectionHeading.vue'
import SpotlightCard from '@/components/vue-bits/SpotlightCard.vue'
import MotionReveal from '@/components/motion/MotionReveal.vue'
import { services } from '@/data/services'
</script>

<template>
  <section id="services" class="section" aria-labelledby="services-title">
    <SectionHeading
      id="services"
      command="cat ./servicios.txt"
      title="Servicios freelance"
      description="Para empresas, startups y agencias que necesitan un backend .NET confiable, por proyecto o por horas."
    />

    <ul class="grid gap-5 md:grid-cols-3">
      <li v-for="(s, i) in services" :key="s.id" class="h-full">
        <MotionReveal :delay="i * 0.1" class-name="h-full">
          <SpotlightCard class-name="card card-hover flex h-full flex-col !rounded-xl !p-6" spotlight-color="rgba(34, 211, 238, 0.16)">
            <div class="relative flex h-full flex-col">
              <p class="font-mono text-xs text-cyan">0{{ i + 1 }}</p>
              <h3 class="mt-2 text-lg font-semibold text-text">{{ s.title }}</h3>
              <p class="mt-3 leading-relaxed text-text/85">{{ s.description }}</p>
              <p v-if="s.examples.length" class="mt-auto pt-4 font-mono text-xs text-muted">Ej.: {{ s.examples.join(' · ') }}</p>
            </div>
          </SpotlightCard>
        </MotionReveal>
      </li>
    </ul>

    <div v-reveal class="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
      <a href="#contact" class="btn btn-primary">Cuéntame tu proyecto</a>
      <p class="text-sm text-muted">Te respondo con una propuesta y los siguientes pasos.</p>
    </div>
  </section>
</template>
