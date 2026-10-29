<script setup lang="ts">
import SectionHeading from './SectionHeading.vue'
import { skillGroups } from '@/data/profile'
</script>

<template>
  <section id="skills" class="section" aria-labelledby="skills-title">
    <SectionHeading
      id="skills"
      command="ls ./tech_stack"
      title="Skills"
      description="Tools and concepts I use in real projects."
    />

    <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <li v-for="(group, i) in skillGroups" :key="group.category" v-reveal="i * 60" class="card card-hover p-5">
        <h3 class="font-mono text-sm text-green">{{ group.category }}</h3>
        <ul class="mt-3 flex flex-wrap gap-2" :aria-label="`${group.category} skills`">
          <li v-for="skill in group.skills" :key="skill" class="chip text-text/90">{{ skill }}</li>
        </ul>
      </li>
    </ul>
  </section>
</template>
