<script setup lang="ts">
/**
 * Tarjeta de proyecto limpia: superficie #16181B, borde #2A2D32, monograma y textos.
 * Sin foil, estrellas ni WebGL. Único efecto: al pasar el mouse (o en la tarjeta activa del
 * carrusel) el borde toma un ámbar tenue y sube 2 px; sin movimiento con reduced-motion.
 */
defineProps<{
  monogram: string
  title: string
  tech: string[]
  active?: boolean
  headingTag?: 'h3' | 'p'
}>()
</script>

<template>
  <div data-cursor="card" class="project-card flex h-full w-full flex-col rounded-2xl border bg-surface p-3" :class="active ? 'border-accent/40' : 'border-line'">
    <div class="flex h-[58%] items-center justify-center rounded-[10px] border border-line" aria-hidden="true">
      <span class="font-display text-[56px] font-semibold tracking-[-0.03em] text-ink/90">{{ monogram }}</span>
    </div>
    <div class="mt-auto px-2 pb-2">
      <component :is="headingTag ?? 'p'" class="font-display text-[19px] font-semibold leading-tight text-ink">{{ title }}</component>
      <p class="mt-1 font-mono text-[11px] text-muted">{{ tech.join(' · ') }}</p>
    </div>
  </div>
</template>

<style scoped>
.project-card {
  transition:
    border-color 0.25s ease,
    transform 0.25s ease;
}
@media (hover: hover) {
  .project-card:hover {
    border-color: rgb(var(--accent) / 0.45);
    transform: translateY(-2px);
  }
}
@media (prefers-reduced-motion: reduce) {
  .project-card,
  .project-card:hover {
    transform: none;
    transition: border-color 0.25s ease;
  }
}
</style>
