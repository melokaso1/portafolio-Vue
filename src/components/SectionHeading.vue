<script setup lang="ts">
defineProps<{
  id: string
  command: string
  title: string
  description?: string
}>()
</script>

<template>
  <header v-reveal class="mb-10">
    <p class="font-mono text-sm text-muted" aria-hidden="true">
      <span class="text-green">melokaso1</span>:<span class="text-cyan">~</span>$ {{ command }}
    </p>
    <h2 :id="`${id}-title`" class="mt-2 text-3xl font-semibold tracking-tight text-text md:text-4xl">
      {{ title }}
    </h2>
    <p v-if="description" class="mt-3 max-w-2xl text-muted">{{ description }}</p>
  </header>
</template>
