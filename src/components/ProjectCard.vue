<script setup lang="ts">
import Tag from 'primevue/tag'
import type { Project } from '@/types'

withDefaults(defineProps<{ project: Project; featured?: boolean }>(), { featured: false })
</script>

<template>
  <article class="card card-hover flex h-full flex-col p-6" :class="featured ? 'md:p-8' : ''" :aria-labelledby="`project-${project.id}`">
    <div class="flex flex-wrap items-center gap-2">
      <h3 :id="`project-${project.id}`" class="font-semibold text-text" :class="featured ? 'text-xl md:text-2xl' : 'text-lg'">
        {{ project.title }}
      </h3>
      <Tag v-if="project.context" :value="project.context" rounded class="!border !border-cyan/40 !bg-cyan/10 !font-mono !text-[11px] !font-normal !text-cyan" />
    </div>

    <dl class="mt-5 grid gap-5" :class="featured ? 'md:grid-cols-3' : ''">
      <div>
        <dt class="font-mono text-xs uppercase tracking-wide text-green">Problema</dt>
        <dd class="mt-1 leading-relaxed text-text/85">{{ project.problem }}</dd>
      </div>

      <div>
        <dt class="font-mono text-xs uppercase tracking-wide text-green">Solución</dt>
        <dd class="mt-1">
          <p class="leading-relaxed text-text/85">{{ project.summary }}</p>
          <ul v-if="featured && project.highlights.length" class="mt-3 space-y-1.5 text-sm text-muted">
            <li v-for="h in project.highlights" :key="h" class="flex gap-2">
              <span class="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-green" aria-hidden="true" />
              <span>{{ h }}</span>
            </li>
          </ul>
        </dd>
      </div>

      <div v-if="project.result || featured">
        <dt class="font-mono text-xs uppercase tracking-wide text-green">Resultado</dt>
        <dd v-if="project.result" class="mt-1 leading-relaxed text-text/85">{{ project.result }}</dd>
        <!-- TODO: Alejandro debe confirmar un resultado real (sin métricas inventadas) en src/data/projects.ts. -->
        <dd v-else class="mt-1 rounded-md border border-dashed border-border px-3 py-2 text-sm text-muted">
          TODO: resultado por confirmar.
        </dd>
      </div>
    </dl>

    <div class="mt-5">
      <p class="sr-only">Stack</p>
      <ul class="flex flex-wrap gap-1.5" aria-label="Tecnologías">
        <li v-for="t in project.tech" :key="t" class="chip">{{ t }}</li>
      </ul>
    </div>

    <div v-if="project.links.length" class="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-5">
      <a
        v-for="link in project.links"
        :key="link.url"
        :href="link.url"
        target="_blank"
        rel="noopener noreferrer"
        class="link-inline"
      >
        {{ link.label }} <span aria-hidden="true">↗</span><span class="sr-only"> (se abre en una pestaña nueva)</span>
      </a>
    </div>
  </article>
</template>
