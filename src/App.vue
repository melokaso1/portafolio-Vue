<script setup lang="ts">
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import LearningSection from './components/LearningSection.vue'
import ContactSection from './components/ContactSection.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <a
    href="#main"
    class="sr-only z-[60] rounded-md bg-green px-4 py-2 font-medium text-bg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
  >
    Skip to content
  </a>
  <SiteHeader />
  <main id="main" tabindex="-1">
    <HeroSection />
    <AboutSection />
    <SkillsSection />
    <ProjectsSection />
    <LearningSection />
    <ContactSection />
  </main>
  <SiteFooter />
</template>
