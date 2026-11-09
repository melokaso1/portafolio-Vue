<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/HeroSection.vue'
import SolveSection from './components/SolveSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ContactSection from './components/ContactSection.vue'
import SiteFooter from './components/SiteFooter.vue'
import BackgroundCubes from './components/background/BackgroundCubes.vue'
import { useFinePointer } from './composables/useFinePointer'

/** El cursor se carga aparte y solo con puntero fino y sin reduced-motion. */
const CustomCursor = defineAsyncComponent(() => import('./components/cursor/CustomCursor.vue'))
const fine = useFinePointer()
</script>

<template>
  <a
    href="#main"
    class="sr-only z-[60] rounded-md bg-accent px-4 py-2 font-medium text-bg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
  >
    Saltar al contenido
  </a>
  <BackgroundCubes />
  <SiteHeader />
  <!-- Orden: hero > lo que resuelvo > proyectos > servicios > stack + sobre mí > contacto. -->
  <main id="main" tabindex="-1" class="relative">
    <HeroSection />
    <SolveSection />
    <ProjectsSection />
    <ServicesSection />
    <SkillsSection />
    <ContactSection />
  </main>
  <SiteFooter />
  <CustomCursor v-if="fine" />
</template>
