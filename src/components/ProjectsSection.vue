<script setup lang="ts">
import SectionHeading from './SectionHeading.vue'
import ProjectCard from './ProjectCard.vue'
import MotionReveal from '@/components/motion/MotionReveal.vue'
import { otherWork, projects } from '@/data/projects'

const featured = projects.filter((p) => p.featured)
const more = projects.filter((p) => !p.featured)
</script>

<template>
  <section id="projects" class="section" aria-labelledby="projects-title">
    <SectionHeading
      id="projects"
      command="ls ./projects --featured"
      title="Proyectos"
      description="Casos reales: el problema, cómo lo resolví y el resultado."
    />

    <ul class="space-y-6">
      <li v-for="project in featured" :key="project.id">
        <MotionReveal>
          <ProjectCard :project="project" featured />
        </MotionReveal>
      </li>
    </ul>

    <div v-if="more.length" class="mt-14">
      <h3 v-reveal class="font-mono text-sm text-green">// más proyectos</h3>
      <ul class="mt-4 grid gap-5 md:grid-cols-2">
        <li v-for="(project, i) in more" :key="project.id" v-reveal="(i % 2) * 80">
          <ProjectCard :project="project" />
        </li>
      </ul>
    </div>

    <div class="mt-14">
      <h3 v-reveal class="font-mono text-sm text-green">// otros trabajos</h3>
      <ul class="mt-4 divide-y divide-border rounded-xl border border-border">
        <li
          v-for="item in otherWork"
          :key="item.id"
          v-reveal
          class="flex flex-col gap-2 p-5 md:flex-row md:items-start md:justify-between md:gap-6"
        >
          <div>
            <p class="font-medium text-text">{{ item.title }}</p>
            <p class="mt-1 text-sm text-muted">{{ item.summary }}</p>
            <p class="mt-2 font-mono text-xs text-muted">{{ item.tech.join(' · ') }}</p>
          </div>
          <div v-if="item.links.length" class="flex shrink-0 gap-4">
            <a
              v-for="link in item.links"
              :key="link.url"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="link-inline whitespace-nowrap"
            >
              {{ link.label }} <span aria-hidden="true">↗</span><span class="sr-only"> (se abre en una pestaña nueva)</span>
            </a>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
