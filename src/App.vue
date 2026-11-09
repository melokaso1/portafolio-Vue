<script setup lang="ts">
import { MotionConfig } from 'motion-v'
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/HeroSection.vue'
import SolveSection from './components/SolveSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ContactSection from './components/ContactSection.vue'
import SiteFooter from './components/SiteFooter.vue'
import CustomCursor from './components/cursor/CustomCursor.vue'
</script>

<template>
  <!-- reduced-motion="user": motion-v respeta prefers-reduced-motion del sistema. -->
  <MotionConfig reduced-motion="user">
    <a
      href="#main"
      class="sr-only z-[60] rounded-md bg-accent px-4 py-2 font-medium text-bg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
    >
      Saltar al contenido
    </a>
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
    <CustomCursor />
  </MotionConfig>
</template>
