<script setup lang="ts">
import SectionHeading from './SectionHeading.vue'
import { services } from '@/data/profile'
</script>

<template>
  <section id="services" class="section" aria-labelledby="services-title">
    <SectionHeading
      id="services"
      command="cat ./servicios.txt"
      title="Trabaja conmigo"
      description="Servicios en los que puedo ayudarte, respaldados por proyectos de este portafolio."
    />

    <ul class="grid gap-5 md:grid-cols-3">
      <li v-for="(s, i) in services" :key="s.id" v-reveal="i * 80" class="card card-hover p-6">
        <h3 class="text-lg font-semibold text-text">{{ s.title }}</h3>
        <p class="mt-3 leading-relaxed text-text/85">{{ s.description }}</p>
        <p v-if="s.examples.length" class="mt-4 font-mono text-xs text-muted">Ej.: {{ s.examples.join(' · ') }}</p>
      </li>
    </ul>
  </section>
</template>
