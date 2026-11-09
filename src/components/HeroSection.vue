<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { hero } from '@/data/hero'
import { personalInfo } from '@/data/profile'
import { useFinePointer } from '@/composables/useFinePointer'

const TechText = defineAsyncComponent(() => import('./vue-bits/TechText.vue'))
const fine = useFinePointer()

const [titleStart, titleEnd] = hero.title.split('.NET')
const wordmark = ['Alejandro', 'Escobar']
</script>

<template>
  <section id="hero" class="relative pb-16 pt-[92px] lg:min-h-[600px] lg:pb-12 lg:pt-[120px]" aria-labelledby="hero-title">
    <div class="shell relative">
      <div class="relative z-10 max-w-[760px]">
        <p class="inline-flex items-center gap-2 rounded-full border border-line bg-bg px-3 py-1.5 text-[13px] text-muted">
          <span class="h-1.5 w-1.5 rounded-full bg-ink" aria-hidden="true" />
          {{ hero.badge }}
        </p>

        <p class="sr-only">{{ personalInfo.name }}</p>
        <div class="mt-5 lg:mt-6" aria-hidden="true">
          <template v-if="fine">
            <div v-for="word in wordmark" :key="word" class="h-[90px] lg:h-[116px]">
              <TechText
                :text="word"
                font-family="Inter Tight, Inter, sans-serif"
                :font-weight="600"
                :font-size="104"
                :letter-spacing="-0.03"
                color="#ECEAE6"
                accent-color="#E8A33D"
                :reach="160"
                :specks="0"
                :selection="false"
                :labels="false"
                :draggable="false"
                :sweep="false"
                reveal="area"
                align="left"
              />
            </div>
          </template>
          <p v-else class="font-display text-[clamp(56px,17vw,104px)] font-semibold leading-[1.02] tracking-[-0.03em] text-ink">
            <span v-for="word in wordmark" :key="word" class="block">{{ word }}</span>
          </p>
        </div>

        <h1 id="hero-title" class="mt-3 max-w-[760px] font-display text-[22px] font-medium leading-[1.15] tracking-[-0.015em] text-ink lg:mt-3.5 lg:text-[30px]">
          {{ titleStart }}<span class="text-accent">.NET</span>{{ titleEnd }}
        </h1>
        <p class="mt-3.5 text-[17px] text-muted">{{ hero.subtitle }}</p>

        <div class="mt-6 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-3 lg:mt-8">
          <a :href="hero.primaryCta.href" class="btn btn-primary justify-center">{{ hero.primaryCta.label }}</a>
          <a :href="personalInfo.linkedin" target="_blank" rel="noopener noreferrer" class="btn btn-ghost justify-center">
            {{ hero.linkedinCta.label }} <span aria-hidden="true">↗</span>
          </a>
          <a :href="personalInfo.github" target="_blank" rel="noopener noreferrer" class="link self-center px-2 text-sm sm:self-auto">
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
