<script setup lang="ts">
import SectionHeading from './SectionHeading.vue'
import { learningItems } from '@/data/profile'
</script>

<template>
  <section id="learning" class="section" aria-labelledby="learning-title">
    <SectionHeading
      id="learning"
      command="ps aux | grep learning"
      title="Learning"
      description="Completed and still in progress."
    />

    <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <li v-for="(item, i) in learningItems" :key="item.id" v-reveal="i * 60" class="card p-5">
        <div class="flex items-start justify-between gap-3">
          <div>
            <h3 class="font-medium text-text">{{ item.title }}</h3>
            <p class="mt-1 text-sm text-muted">{{ item.subtitle }}</p>
          </div>
          <span
            class="shrink-0 rounded-full border px-2 py-0.5 font-mono text-[11px]"
            :class="item.status === 'completed' ? 'border-green/40 text-green' : 'border-cyan/40 text-cyan'"
          >
            {{ item.status === 'completed' ? 'Completed' : 'In progress' }}
          </span>
        </div>
        <div class="mt-4 h-1 overflow-hidden rounded-full bg-border" aria-hidden="true">
          <div v-if="item.status === 'completed'" class="h-full w-full rounded-full bg-green/80" />
          <div v-else class="progress-run h-full w-2/5 rounded-full bg-cyan/80" />
        </div>
      </li>
    </ul>
  </section>
</template>
