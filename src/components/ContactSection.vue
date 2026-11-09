<script setup lang="ts">
import Button from 'primevue/button'
import SectionHeading from './SectionHeading.vue'
import Magnet from '@/components/vue-bits/Magnet.vue'
import SpotlightCard from '@/components/vue-bits/SpotlightCard.vue'
import MotionReveal from '@/components/motion/MotionReveal.vue'
import { contact } from '@/data/contact'
import { useReducedMotion } from '@/composables/useReducedMotion'

const reduced = useReducedMotion()
const display = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '')
</script>

<template>
  <section id="contact" class="section" aria-labelledby="contact-title">
    <SectionHeading id="contact" command="./connect.sh" title="Contacto" />

    <MotionReveal>
      <SpotlightCard class-name="card !rounded-2xl !p-8 md:!p-12" spotlight-color="rgba(74, 222, 128, 0.15)">
        <div class="relative">
          <p class="max-w-3xl text-2xl font-bold leading-tight tracking-tight text-text sm:text-3xl md:text-4xl">
            {{ contact.closing }}
          </p>
          <p class="mt-4 max-w-2xl text-muted">{{ contact.intro }}</p>

          <div class="mt-8">
            <Magnet :disabled="reduced" :padding="60" :magnet-strength="6" wrapper-class-name="w-full sm:w-auto" inner-class-name="w-full">
              <Button
                as="a"
                :href="contact.primary.url"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-primary w-full justify-center sm:w-auto"
              >
                {{ contact.primary.label }} <span aria-hidden="true">↗</span><span class="sr-only"> (se abre en una pestaña nueva)</span>
              </Button>
            </Magnet>
          </div>
        </div>
      </SpotlightCard>
    </MotionReveal>

    <ul class="mt-6 grid gap-4 sm:grid-cols-3">
      <li v-for="(c, i) in contact.channels" :key="c.label" v-reveal="i * 80">
        <a
          :href="c.url"
          target="_blank"
          rel="noopener noreferrer"
          class="card card-hover group flex h-full items-center justify-between gap-4 p-5"
        >
          <span>
            <span class="block font-medium text-text group-hover:text-green">{{ c.label }}</span>
            <span class="mt-1 block break-all font-mono text-xs text-muted">{{ display(c.url) }}</span>
            <span class="mt-1 block text-xs text-muted">{{ c.hint }}</span>
          </span>
          <span class="text-muted transition-transform duration-200 group-hover:translate-x-1 group-hover:text-green" aria-hidden="true">↗</span>
          <span class="sr-only"> (se abre en una pestaña nueva)</span>
        </a>
      </li>
      <li v-if="contact.directChannelUrl" v-reveal="160">
        <a :href="contact.directChannelUrl" target="_blank" rel="noopener noreferrer" class="card card-hover flex h-full items-center p-5">
          Agenda una llamada <span class="sr-only"> (se abre en una pestaña nueva)</span>
        </a>
      </li>
      <!-- TODO: canal directo (formulario o agenda) pendiente de Alejandro. Ver src/data/contact.ts. -->
      <li v-else v-reveal="160" class="flex h-full items-center rounded-xl border border-dashed border-border p-5 text-sm text-muted">
        TODO: canal directo (formulario o agenda) pendiente.
      </li>
    </ul>
  </section>
</template>
