<script setup lang="ts">
import AnimatedContent from '@/components/vue-bits/AnimatedContent.vue'
import { useReducedMotion } from '@/composables/useReducedMotion'

/**
 * Aparición al hacer scroll con GSAP (Vue Bits AnimatedContent).
 * Con prefers-reduced-motion renderiza el contenido tal cual, sin animación.
 */
withDefaults(defineProps<{ delay?: number; distance?: number; className?: string }>(), {
  delay: 0,
  distance: 32,
  className: '',
})

const reduced = useReducedMotion()
</script>

<template>
  <div v-if="reduced" :class="className"><slot /></div>
  <AnimatedContent v-else :delay="delay" :distance="distance" :duration="0.7" :class-name="className">
    <slot />
  </AnimatedContent>
</template>
