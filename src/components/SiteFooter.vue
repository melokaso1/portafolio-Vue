<script setup lang="ts">
import { personalInfo } from '@/data/profile'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-[#1D1F23]">
    <div class="shell flex h-auto flex-col gap-2 py-5 text-xs text-muted sm:h-[72px] sm:flex-row sm:items-center sm:justify-between sm:py-0 sm:text-[13px]">
      <p>© {{ year }} {{ personalInfo.name }}</p>
      <a href="#hero" class="link !text-muted hover:!text-ink">Volver arriba <span aria-hidden="true">↑</span></a>
    </div>
  </footer>
</template>
