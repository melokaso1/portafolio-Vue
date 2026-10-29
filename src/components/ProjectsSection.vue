<script setup lang="ts">
import SectionHeading from './SectionHeading.vue'
import ProjectCard from './ProjectCard.vue'
import { leadership, otherWork, projects } from '@/data/projects'
</script>

<template>
  <section id="projects" class="section" aria-labelledby="projects-title">
    <SectionHeading
      id="projects"
      command="ls ./projects --featured"
      title="Projects"
      description="Selected systems I built or contributed to, as case studies."
    />

    <ul class="grid gap-5 md:grid-cols-2">
      <li v-for="(project, i) in projects" :key="project.id" v-reveal="(i % 2) * 80">
        <ProjectCard :project="project" />
      </li>
    </ul>

    <div v-if="leadership.length" class="mt-14">
      <h3 v-reveal class="font-mono text-sm text-green">// leadership</h3>
      <ul class="mt-4 grid gap-5 md:grid-cols-2">
        <li v-for="item in leadership" :key="item.id" v-reveal class="card p-6">
          <p class="text-lg font-semibold text-text">
            {{ item.title }}
            <span class="ml-2 rounded-full border border-green/40 px-2 py-0.5 align-middle font-mono text-[11px] text-green">
              {{ item.role }}
            </span>
          </p>
          <p class="mt-3 leading-relaxed text-text/85">{{ item.summary }}</p>
        </li>
      </ul>
    </div>

    <div class="mt-14">
      <h3 v-reveal class="font-mono text-sm text-green">// more work</h3>
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
              {{ link.label }} <span aria-hidden="true">↗</span><span class="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
