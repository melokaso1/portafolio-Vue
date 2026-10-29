<script setup lang="ts">
import SectionHeading from './SectionHeading.vue'
import { personalInfo } from '@/data/profile'

const githubHandle = personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')
const linkedinHandle = personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\//, '')

const channels = [
  { label: 'LinkedIn', detail: `linkedin.com/${linkedinHandle}`, url: personalInfo.linkedin, hint: 'Best way to reach me' },
  { label: 'GitHub', detail: `github.com/${githubHandle}`, url: personalInfo.github, hint: 'Code and repositories' },
]
</script>

<template>
  <section id="contact" class="section" aria-labelledby="contact-title">
    <SectionHeading
      id="contact"
      command="./connect.sh"
      title="Contact"
      description="Open to opportunities and collaborations. Send me a message on LinkedIn."
    />

    <ul class="grid gap-4 sm:grid-cols-2">
      <li v-for="(c, i) in channels" :key="c.label" v-reveal="i * 80">
        <a
          :href="c.url"
          target="_blank"
          rel="noopener noreferrer"
          class="card card-hover group flex items-center justify-between gap-4 p-5"
        >
          <span>
            <span class="block font-medium text-text group-hover:text-green">{{ c.label }}</span>
            <span class="mt-1 block font-mono text-xs text-muted">{{ c.detail }}</span>
            <span class="mt-1 block text-xs text-muted">{{ c.hint }}</span>
          </span>
          <span class="text-muted transition-transform duration-200 group-hover:translate-x-1 group-hover:text-green" aria-hidden="true">↗</span>
          <span class="sr-only"> (opens in a new tab)</span>
        </a>
      </li>
    </ul>
  </section>
</template>
