<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import Magnet from './vue-bits/Magnet.vue'
import PcIllustration from './pc/PcIllustration.vue'
import { contact } from '@/data/contact'
import { personalInfo } from '@/data/profile'
import { useFinePointer } from '@/composables/useFinePointer'

/** Cierre: Cubes de fondo (ripple ámbar al hacer clic) y Magnet en el CTA. Solo LinkedIn y GitHub. */
const Cubes = defineAsyncComponent(() => import('./vue-bits/Cubes.vue'))
const fine = useFinePointer()
const [before, after] = contact.closing.split('Hablemos')
</script>

<template>
  <section id="contact" class="section" aria-labelledby="contact-title">
    <div class="shell">
      <div class="relative overflow-hidden rounded-2xl border border-line bg-bg lg:min-h-[400px] lg:rounded-[20px]">
        <div v-if="fine" class="absolute inset-0" aria-hidden="true">
          <div class="absolute -top-[30%] left-0 w-full opacity-90">
            <Cubes
              :grid-size="16"
              :max-angle="35"
              :radius="3"
              :cell-gap="12"
              border-style="1px dashed #2A2D32"
              face-color="#0E0F11"
              :auto-animate="false"
              :ripple-on-click="true"
              ripple-color="#E8A33D"
            />
          </div>
        </div>

        <div class="pointer-events-none relative grid items-center gap-6 px-[22px] py-7 lg:grid-cols-[minmax(0,620px)_1fr] lg:px-14 lg:py-16 [&_a]:pointer-events-auto">
          <div>
            <p class="idx" aria-hidden="true">05</p>
            <h2 id="contact-title" class="mt-2.5 font-display text-[30px] font-semibold leading-[1.05] tracking-[-0.025em] text-ink lg:text-[52px]">
              {{ before }}<span class="text-accent">Hablemos</span>{{ after }}
            </h2>
            <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center lg:mt-8">
              <Magnet :padding="40" :magnet-strength="6" :max-offset="6" :disabled="!fine" wrapper-class-name="pointer-events-auto">
                <a :href="contact.primary.url" target="_blank" rel="noopener noreferrer" class="btn btn-primary w-full justify-center sm:w-auto">
                  {{ contact.primary.label }} <span aria-hidden="true">↗</span>
                </a>
              </Magnet>
              <a :href="personalInfo.github" target="_blank" rel="noopener noreferrer" class="link relative z-10 self-center sm:ml-7">
                GitHub <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <div class="hidden lg:block">
            <div class="ml-auto w-full max-w-[380px] lg:-my-10">
              <PcIllustration :stage="5" trigger="#contact" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
