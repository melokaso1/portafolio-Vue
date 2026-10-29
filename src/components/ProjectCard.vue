<script setup lang="ts">
import type { Project } from '@/types'

defineProps<{ project: Project }>()
</script>

<template>
  <article class="card card-hover flex h-full flex-col p-6" :aria-labelledby="`project-${project.id}`">
    <div class="flex flex-wrap items-center gap-2">
      <h3 :id="`project-${project.id}`" class="text-lg font-semibold text-text">{{ project.title }}</h3>
      <span v-if="project.context" class="rounded-full border border-cyan/40 px-2 py-0.5 font-mono text-[11px] text-cyan">
        {{ project.context }}
      </span>
    </div>

    <dl class="mt-4 space-y-4">
      <div>
        <dt class="font-mono text-xs uppercase tracking-wide text-green">Problem</dt>
        <dd class="mt-1 leading-relaxed text-text/85">{{ project.problem }}</dd>
      </div>

      <div>
        <dt class="font-mono text-xs uppercase tracking-wide text-green">What I did</dt>
        <dd class="mt-1">
          <p class="leading-relaxed text-text/85">{{ project.summary }}</p>
          <ul v-if="project.highlights.length" class="mt-3 space-y-1.5 text-sm text-muted">
            <li v-for="h in project.highlights" :key="h" class="flex gap-2">
              <span class="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-green" aria-hidden="true" />
              <span>{{ h }}</span>
            </li>
          </ul>
        </dd>
      </div>

      <div>
        <dt class="font-mono text-xs uppercase tracking-wide text-green">Stack</dt>
        <dd class="mt-2">
          <ul class="flex flex-wrap gap-1.5" aria-label="Technologies">
            <li v-for="t in project.tech" :key="t" class="chip">{{ t }}</li>
          </ul>
        </dd>
      </div>

      <div v-if="project.result">
        <dt class="font-mono text-xs uppercase tracking-wide text-green">Result</dt>
        <dd class="mt-1 leading-relaxed text-text/85">{{ project.result }}</dd>
      </div>
    </dl>

    <div v-if="project.links.length" class="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-5">
      <a
        v-for="link in project.links"
        :key="link.url"
        :href="link.url"
        target="_blank"
        rel="noopener noreferrer"
        class="link-inline"
      >
        {{ link.label }} <span aria-hidden="true">↗</span><span class="sr-only"> (opens in a new tab)</span>
      </a>
    </div>
  </article>
</template>
