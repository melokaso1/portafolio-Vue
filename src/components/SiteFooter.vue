<script setup lang="ts">
import { personalInfo } from '@/data/profile'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-border">
    <div class="mx-auto flex max-w-5xl flex-col gap-2 px-5 py-8 font-mono text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
      <p><span class="text-green">{{ personalInfo.handle }}@portfolio</span>:<span class="text-cyan">~</span>$ exit</p>
      <p>© {{ year }} {{ personalInfo.name }}</p>
    </div>
  </footer>
</template>
