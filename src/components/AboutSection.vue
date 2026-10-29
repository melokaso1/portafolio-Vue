<script setup lang="ts">
import SectionHeading from './SectionHeading.vue'
import { aboutParagraphs, profileFacts } from '@/data/profile'
</script>

<template>
  <section id="about" class="section" aria-labelledby="about-title">
    <SectionHeading id="about" command="cat ./about/profile.md" title="Sobre mí" />

    <div class="grid gap-8 md:grid-cols-[1.4fr_1fr]">
      <div v-reveal class="space-y-4 leading-relaxed text-text/90">
        <p v-for="(p, i) in aboutParagraphs" :key="i">{{ p }}</p>
      </div>

      <div v-reveal="120" class="card p-5 font-mono text-sm">
        <p class="mb-3 text-xs text-muted">profile.json</p>
        <dl class="space-y-1.5">
          <div v-for="fact in profileFacts" :key="fact.key" class="flex flex-wrap gap-x-2">
            <dt class="text-cyan">"{{ fact.key }}":</dt>
            <dd :class="fact.key === 'status' ? 'text-green' : 'text-text'">"{{ fact.value }}"</dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>
