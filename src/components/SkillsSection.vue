<script setup lang="ts">
import Tag from 'primevue/tag'
import SectionHeading from './SectionHeading.vue'
import MotionReveal from '@/components/motion/MotionReveal.vue'
import { coreStack, learningNow, skillGroups } from '@/data/stack'
</script>

<template>
  <section id="skills" class="section" aria-labelledby="skills-title">
    <SectionHeading id="skills" command="ls ./stack" title="Stack" description="Las herramientas con las que construyo y mantengo backends." />

    <ul class="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <li v-for="(item, i) in coreStack" :key="item.name">
        <MotionReveal :delay="i * 0.08" :distance="20" class-name="h-full">
          <div class="card card-hover h-full p-5">
            <p class="text-lg font-semibold text-green">{{ item.name }}</p>
            <p class="mt-1 text-sm text-muted">{{ item.detail }}</p>
          </div>
        </MotionReveal>
      </li>
    </ul>

    <div v-reveal class="mt-6 flex flex-wrap items-center gap-2">
      <span class="font-mono text-sm text-muted">Aprendiendo:</span>
      <Tag
        v-for="lang in learningNow"
        :key="lang"
        :value="lang"
        rounded
        class="!border !border-cyan/40 !bg-cyan/10 !font-mono !text-xs !font-normal !text-cyan"
      />
    </div>

    <div class="mt-10">
      <h3 v-reveal class="font-mono text-sm text-green">// también he trabajado con</h3>
      <ul class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="(group, i) in skillGroups" :key="group.category" v-reveal="i * 60" class="card p-5">
          <p class="font-mono text-xs text-muted">{{ group.category }}</p>
          <ul class="mt-3 flex flex-wrap gap-2" :aria-label="`Herramientas de ${group.category}`">
            <li v-for="skill in group.skills" :key="skill" class="chip text-text/90">{{ skill }}</li>
          </ul>
        </li>
      </ul>
    </div>
  </section>
</template>
