<script setup lang="ts">
import { ref } from 'vue'
import Accordion from 'primevue/accordion'
import AccordionPanel from 'primevue/accordionpanel'
import AccordionHeader from 'primevue/accordionheader'
import AccordionContent from 'primevue/accordioncontent'
import { services } from '@/data/services'
import { hero } from '@/data/hero'

/** Servicios: Accordion de PrimeVue 4 sin estilos propios (unstyled + Tailwind), uno abierto a la vez. */
const open = ref<string | null>(services[0]?.id ?? null)
</script>

<template>
  <section id="services" class="section" aria-labelledby="services-title">
    <div class="shell">
      <div>
        <div class="mb-3 flex items-end justify-between gap-4 lg:mb-10">
          <div>
            <p class="idx" aria-hidden="true">03</p>
            <h2 id="services-title" class="h2 mt-2.5">Servicios freelance</h2>
          </div>
        </div>

        <Accordion v-model:value="open" unstyled class="border-b border-line">
          <AccordionPanel v-for="(service, i) in services" :key="service.id" :value="service.id" unstyled class="border-t border-line">
            <h3 class="m-0">
              <AccordionHeader
                unstyled
                class="svc-row grid w-full grid-cols-[40px_1fr_32px] items-center py-4 text-left lg:grid-cols-[60px_1fr_360px_40px] lg:py-6"
                :data-n="String(i + 1).padStart(2, '0')"
              >
                <span class="svc-title font-display text-[19px] font-semibold tracking-[-0.01em] text-ink lg:text-[28px]">{{ service.title }}</span>
                <span class="hidden text-sm text-muted lg:block"><span class="sr-only">. Ejemplos: </span>{{ service.examples.join(' · ') }}</span>
                <!-- Número e ícono +/− van por CSS (decorativos, fuera del nombre accesible). -->
                <template #toggleicon><span class="hidden" /></template>
              </AccordionHeader>
            </h3>
            <AccordionContent unstyled class="svc-panel" :pt="{ transition: { name: 'svc' } }">
              <div class="svc-body pb-6 pl-10 pr-4 lg:pl-[60px]">
                <p class="max-w-[640px] text-base leading-relaxed text-muted">{{ service.description }}</p>
                <a :href="hero.primaryCta.href" class="link mt-3 inline-block text-sm">{{ hero.primaryCta.label }} <span aria-hidden="true">→</span></a>
              </div>
            </AccordionContent>
          </AccordionPanel>
        </Accordion>
      </div>
    </div>
  </section>
</template>

<style scoped>
.svc-row {
  transition: color 0.2s ease;
}
.svc-row .svc-title {
  transition: color 0.2s ease;
}
.svc-row:hover .svc-title,
.svc-row:focus-visible .svc-title {
  color: rgb(var(--accent));
}
.svc-row::before {
  content: attr(data-n);
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 12px;
  color: rgb(var(--muted));
  grid-column: 1;
  grid-row: 1;
  transition: color 0.2s ease;
}
.svc-row:hover::before {
  color: rgb(var(--accent));
}
/* Ícono +/−: gira media vuelta al abrir/cerrar. */
.svc-row::after {
  content: '+';
  grid-column: 3;
  grid-row: 1;
  justify-self: end;
  display: inline-block;
  width: 1em;
  text-align: center;
  font-size: 20px;
  line-height: 1;
  color: rgb(var(--muted));
  transition:
    transform 0.3s ease-out,
    color 0.2s ease;
}
@media (min-width: 1024px) {
  .svc-row::after {
    grid-column: 4;
  }
}
.svc-row:hover::after {
  color: rgb(var(--accent));
}
.svc-row[aria-expanded='true']::after {
  content: '−';
  color: rgb(var(--ink));
  transform: rotate(180deg);
}
.svc-row[aria-expanded='true']:hover::after {
  color: rgb(var(--accent));
}

/* Panel: altura con grid-template-rows 0fr → 1fr (sin medir en JS) + fundido y leve desplazamiento. */
.svc-panel {
  display: grid;
  grid-template-rows: 1fr;
}
.svc-panel > :deep(div) {
  min-height: 0;
  overflow: hidden;
}
.svc-body {
  transition:
    transform 0.3s ease-out,
    opacity 0.3s ease-out;
}
.svc-enter-active,
.svc-leave-active {
  transition:
    grid-template-rows 0.3s ease-out,
    opacity 0.3s ease-out;
}
.svc-enter-from,
.svc-leave-to {
  grid-template-rows: 0fr;
  opacity: 0;
}
.svc-enter-from .svc-body,
.svc-leave-to .svc-body {
  transform: translateY(-6px);
}
@media (prefers-reduced-motion: reduce) {
  .svc-row::after,
  .svc-body,
  .svc-enter-active,
  .svc-leave-active {
    transition: none;
  }
}
</style>
