<script setup lang="ts">
import Magnet from './vue-bits/Magnet.vue'
import { contact } from '@/data/contact'
import { personalInfo } from '@/data/profile'
import { useFinePointer } from '@/composables/useFinePointer'

/** Cierre: Magnet en el CTA, sobre el fondo de cubos de la página. Solo LinkedIn y GitHub. */
const fine = useFinePointer()
const [before, after] = contact.closing.split('Hablemos')
</script>

<template>
  <section id="contact" class="section" aria-labelledby="contact-title">
    <div class="shell">
      <div class="relative overflow-hidden rounded-2xl border border-line lg:rounded-[20px]">
        <div class="relative px-[22px] py-7 lg:px-14 lg:py-16">
          <div class="max-w-[620px]">
            <p class="idx" aria-hidden="true">05</p>
            <h2 id="contact-title" class="mt-2.5 font-display text-[30px] font-semibold leading-[1.05] tracking-[-0.025em] text-ink lg:text-[52px]">
              {{ before }}<span class="text-accent">Hablemos</span>{{ after }}
            </h2>
            <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center lg:mt-8">
              <Magnet :padding="60" :magnet-strength="4" :disabled="!fine" wrapper-class-name="pointer-events-auto">
                <a :href="contact.primary.url" target="_blank" rel="noopener noreferrer" class="btn btn-primary w-full justify-center sm:w-auto">
                  {{ contact.primary.label }} <span aria-hidden="true">↗</span>
                </a>
              </Magnet>
              <a :href="personalInfo.github" target="_blank" rel="noopener noreferrer" class="link self-center sm:ml-3">
                GitHub <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
