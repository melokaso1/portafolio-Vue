<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Button from 'primevue/button'
import SplitText from '@/components/vue-bits/SplitText.vue'
import ShinyText from '@/components/vue-bits/ShinyText.vue'
import Magnet from '@/components/vue-bits/Magnet.vue'
import { hero } from '@/data/hero'
import { personalInfo } from '@/data/profile'
import { useReducedMotion } from '@/composables/useReducedMotion'

const reduced = useReducedMotion()
const mounted = ref(false)
onMounted(() => {
  mounted.value = true
})
</script>

<template>
  <section id="hero" class="relative flex min-h-[min(92svh,52rem)] items-center overflow-hidden" aria-labelledby="hero-title">
    <div class="hero-glow pointer-events-none absolute inset-0" aria-hidden="true" />

    <div
      class="section relative w-full transition-all duration-700 ease-out"
      :class="mounted ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'"
    >
      <p class="inline-flex items-center gap-2 rounded-full border border-green/30 bg-green/5 px-3 py-1 text-xs font-medium sm:text-sm">
        <span class="inline-block h-1.5 w-1.5 rounded-full bg-green" aria-hidden="true" />
        <ShinyText :text="hero.badge" :disabled="reduced" :speed="3" color="#86efac" shine-color="#ecfdf5" />
      </p>

      <p class="mt-6 text-base font-medium text-text/80 md:text-lg">{{ personalInfo.name }}</p>

      <h1
        v-if="reduced"
        id="hero-title"
        class="mt-2 max-w-4xl text-3xl font-bold leading-tight tracking-tight text-text sm:text-5xl md:text-6xl"
      >
        {{ hero.title }}
      </h1>
      <SplitText
        v-else
        id="hero-title"
        tag="h1"
        :text="hero.title"
        split-type="words"
        text-align="left"
        :delay="40"
        :duration="0.8"
        :threshold="0"
        root-margin="0px"
        :from="{ opacity: 0, y: 24 }"
        class-name="mt-2 block max-w-4xl text-3xl font-bold leading-tight tracking-tight text-text sm:text-5xl md:text-6xl"
      />

      <p class="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
        {{ hero.subtitle }}
      </p>

      <div class="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Magnet :disabled="reduced" :padding="60" :magnet-strength="6" wrapper-class-name="w-full sm:w-auto" inner-class-name="w-full">
          <Button as="a" :href="hero.primaryCta.href" :label="hero.primaryCta.label" class="btn btn-primary w-full justify-center" />
        </Magnet>

        <a v-if="hero.cvUrl" :href="hero.cvUrl" download class="btn btn-ghost justify-center">
          {{ hero.cvCta.label }} <span aria-hidden="true">↓</span>
        </a>
        <!-- TODO: falta el CV en PDF (ver src/data/hero.ts). -->
        <span
          v-else
          class="btn btn-ghost cursor-not-allowed justify-center opacity-60"
          aria-disabled="true"
          title="CV pendiente de publicar"
        >
          {{ hero.cvCta.label }} <span class="text-xs text-muted">(TODO: CV pendiente)</span>
        </span>
      </div>

      <p class="mt-8 text-sm text-muted">
        ¿Prefieres revisar mi perfil primero?
        <a :href="personalInfo.linkedin" target="_blank" rel="noopener noreferrer" class="link-inline">
          LinkedIn <span aria-hidden="true">↗</span><span class="sr-only"> (se abre en una pestaña nueva)</span>
        </a>
        ·
        <a :href="personalInfo.github" target="_blank" rel="noopener noreferrer" class="link-inline">
          GitHub <span aria-hidden="true">↗</span><span class="sr-only"> (se abre en una pestaña nueva)</span>
        </a>
      </p>
    </div>
  </section>
</template>
