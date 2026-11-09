<script setup lang="ts">
import TechHeading from './TechHeading.vue'
import { coreStack, learningNow, skillGroups } from '@/data/stack'
import { aboutShown } from '@/data/about'

/** Stack + Sobre mí en una sola sección (#skills contiene #about). Sin ubicación en pantalla. */
const languages = skillGroups.find((g) => g.category === 'Idiomas')?.skills ?? []

const spot = (e: PointerEvent) => {
  const el = e.currentTarget as HTMLElement
  const rect = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
  el.style.setProperty('--my', `${e.clientY - rect.top}px`)
}
</script>

<template>
  <section id="skills" class="section" aria-labelledby="skills-title">
    <div class="shell">
      <div>
        <div class="mb-4 flex items-end justify-between gap-4 lg:mb-10">
          <div class="min-w-0 flex-1">
            <p class="idx" aria-hidden="true">04</p>
            <TechHeading id="skills-title" class="mt-2.5" text="Stack · Sobre mí" />
          </div>
        </div>

        <div class="lg:grid lg:grid-cols-[440px_minmax(0,1fr)] lg:items-start lg:gap-14">
          <div id="about" class="scroll-mt-24" aria-label="Sobre mí" role="group">
            <p
              v-for="(line, i) in aboutShown"
              :key="line"
              v-reveal="i * 80"
              class="font-display leading-[1.4]"
              :class="i === 0 ? 'text-[19px] text-ink lg:text-[21px]' : 'mt-3 text-base text-muted lg:text-[17px]'"
            >
              {{ line }}
            </p>
          </div>

          <div>
            <ul class="mt-6 grid grid-cols-2 lg:mt-0 gap-px overflow-hidden rounded-[14px] border border-line bg-line">
              <li
                v-for="item in coreStack"
                :key="item.name"
                class="tile relative bg-surface p-4 lg:p-6"
                @pointermove="spot"
              >
                <p class="font-display text-[19px] font-semibold text-ink lg:text-[22px]">{{ item.name }}</p>
                <p class="mt-1.5 hidden text-[13.5px] text-muted sm:block">{{ item.detail }}</p>
              </li>
            </ul>

            <p class="mt-7 text-sm leading-[1.8] text-muted">
              <span class="font-medium text-ink">Aprendiendo</span> · {{ learningNow.join(' · ') }}
              <template v-if="languages.length">
                <span class="mx-2" aria-hidden="true" />
                <span class="font-medium text-ink">Idiomas</span> · {{ languages.join(' · ') }}
              </template>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tile::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
  opacity: 0;
  transition: opacity 0.25s ease;
  background: radial-gradient(220px circle at var(--mx, 50%) var(--my, 50%), rgb(236 234 230 / 0.06), transparent 70%);
  box-shadow: inset 0 0 0 1px rgb(236 234 230 / 0.08);
}
.tile:hover::after {
  opacity: 1;
}
</style>
