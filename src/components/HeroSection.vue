<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { personalInfo } from '@/data/profile'
import { useReducedMotion } from '@/composables/useReducedMotion'

const reduced = useReducedMotion()
const roleText = ref(personalInfo.roles[0] ?? '')
const mounted = ref(false)

let timer: number | undefined
let roleIndex = 0
let deleting = false

const tick = () => {
  const word = personalInfo.roles[roleIndex] ?? ''
  if (!deleting && roleText.value === word) {
    deleting = true
    timer = window.setTimeout(tick, 1800)
    return
  }
  if (deleting && roleText.value === '') {
    deleting = false
    roleIndex = (roleIndex + 1) % personalInfo.roles.length
  }
  const next = personalInfo.roles[roleIndex] ?? ''
  roleText.value = deleting ? next.slice(0, roleText.value.length - 1) : next.slice(0, roleText.value.length + 1)
  timer = window.setTimeout(tick, deleting ? 35 : 75)
}

const start = () => {
  window.clearTimeout(timer)
  if (reduced.value) {
    roleText.value = personalInfo.roles[0] ?? ''
    return
  }
  timer = window.setTimeout(tick, 0)
}

onMounted(() => {
  mounted.value = true
  start()
})
watch(reduced, start)
onBeforeUnmount(() => window.clearTimeout(timer))
</script>

<template>
  <section id="hero" class="relative flex min-h-[min(92svh,52rem)] items-center overflow-hidden" aria-labelledby="hero-title">
    <div class="hero-glow pointer-events-none absolute inset-0" aria-hidden="true" />

    <div
      class="section relative w-full transition-all duration-700 ease-out"
      :class="mounted ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'"
    >
      <p class="font-mono text-sm text-muted">
        <span class="text-green">~$</span> whoami
      </p>
      <h1 id="hero-title" class="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-text sm:text-5xl md:text-6xl">
        {{ personalInfo.name }}
      </h1>

      <p class="mt-5 font-mono text-lg text-cyan md:text-xl" aria-hidden="true">
        &gt; <span class="text-green">{{ roleText }}</span><span v-if="!reduced" class="caret text-green">▍</span>
      </p>
      <p class="sr-only">{{ personalInfo.roles.join(', ') }}</p>

      <p class="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
        {{ personalInfo.bio }}
      </p>

      <div class="mt-9 flex flex-col gap-3 sm:flex-row">
        <a href="#projects" class="btn btn-primary justify-center">View projects</a>
        <a href="#contact" class="btn btn-ghost justify-center">Contact</a>
      </div>

      <p class="mt-14 flex items-center gap-2 font-mono text-xs text-muted">
        <span class="inline-block h-1.5 w-1.5 rounded-full bg-green" aria-hidden="true" />
        {{ personalInfo.location }}
      </p>
    </div>
  </section>
</template>
