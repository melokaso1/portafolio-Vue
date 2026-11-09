<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import BranchedMenu, { type BranchedMenuItem } from './vue-bits/BranchedMenu.vue'
import { navGroups, navLinks } from '@/data/nav'
import { hero } from '@/data/hero'
import { useActiveSection } from '@/composables/useActiveSection'
import { prefersReducedMotion } from '@/composables/useReducedMotion'

const isOpen = ref(false)
const menuButton = ref<HTMLButtonElement | null>(null)
const sheet = ref<HTMLElement | null>(null)
const active = useActiveSection(['hero', ...navLinks.map((l) => l.id)])

const items = computed<BranchedMenuItem[]>(() =>
  navGroups.map((group) => ({
    label: group.label,
    children: group.ids.map((id) => ({ value: id, label: navLinks.find((l) => l.id === id)?.label ?? id })),
  })),
)
const current = computed(() => (active.value === 'hero' ? '' : active.value))

const closeMenu = async (returnFocus = true) => {
  if (!isOpen.value) return
  isOpen.value = false
  if (returnFocus) {
    await nextTick()
    menuButton.value?.focus()
  }
}
const toggleMenu = () => {
  if (isOpen.value) void closeMenu()
  else isOpen.value = true
}

const go = (id: string) => {
  const el = document.getElementById(id)
  if (!el) return
  void closeMenu(false)
  el.scrollIntoView?.({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
  history.replaceState?.(null, '', `#${id}`)
}

const onKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape') void closeMenu()
}

watch(isOpen, async (open) => {
  document.documentElement.classList.toggle('overflow-hidden', open)
  if (open) {
    await nextTick()
    sheet.value?.querySelector<HTMLElement>('button')?.focus()
  }
})

onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  document.documentElement.classList.remove('overflow-hidden')
})
</script>

<template>
  <header>
    <!-- Desktop (≥1280): rail fijo con Branched Menu, línea troncal y CTA arriba a la derecha. -->
    <div class="pointer-events-none fixed inset-y-0 left-16 z-0 hidden w-px bg-line xl:block" aria-hidden="true" />
    <div class="fixed left-10 top-7 z-40 hidden w-[200px] xl:block">
      <a href="#hero" class="flex items-center gap-2.5 rounded-lg font-display text-base font-semibold text-ink">
        <span class="flex h-8 w-8 items-center justify-center rounded-lg border border-ink bg-bg text-[13px]" aria-hidden="true">AE</span>
        Alejandro Escobar
      </a>
      <BranchedMenu
        class="mt-10 bg-bg/80"
        aria-label="Secciones"
        :items="items"
        :default-open="[0, 1]"
        :default-active="current"
        color="#ECEAE6"
        accent-color="#E8A33D"
        line-color="#2A2D32"
        :width="200"
        :font-size="14"
        @select="go"
      />
    </div>
    <a href="#contact" class="btn btn-primary fixed right-20 top-7 z-40 hidden !px-[18px] !py-2.5 !text-sm xl:inline-flex">
      {{ hero.primaryCta.label }}
    </a>

    <!-- Móvil y tablet: barra superior y hoja con el mismo Branched Menu. -->
    <div class="fixed inset-x-0 top-0 z-50 flex h-[60px] items-center justify-between border-b border-line/60 bg-bg/90 px-5 backdrop-blur-md xl:hidden">
      <a href="#hero" class="flex items-center gap-2.5 rounded-lg font-display font-semibold text-ink" aria-label="Alejandro Escobar, ir al inicio">
        <span class="flex h-8 w-8 items-center justify-center rounded-lg border border-ink text-[13px]" aria-hidden="true">AE</span>
      </a>
      <button
        ref="menuButton"
        type="button"
        class="rounded-full border border-line px-3.5 py-2 font-mono text-[13px] text-ink"
        :aria-expanded="isOpen"
        aria-controls="mobile-menu"
        @click="toggleMenu"
      >
        {{ isOpen ? 'Cerrar' : 'Menú' }}
      </button>
    </div>
    <div
      v-show="isOpen"
      id="mobile-menu"
      ref="sheet"
      class="fixed inset-x-0 bottom-0 top-[60px] z-50 flex flex-col justify-between bg-bg px-4 pb-6 pt-6 xl:hidden"
    >
      <BranchedMenu
        aria-label="Secciones"
        :items="items"
        :default-open="[0, 1]"
        :default-active="current"
        color="#ECEAE6"
        accent-color="#E8A33D"
        line-color="#2A2D32"
        :width="320"
        :font-size="17"
        :row-height="44"
        @select="go"
      />
      <a href="#contact" class="btn btn-primary w-full justify-center" @click="closeMenu(false)">{{ hero.primaryCta.label }}</a>
    </div>
  </header>
</template>
