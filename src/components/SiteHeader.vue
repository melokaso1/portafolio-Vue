<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { navLinks, personalInfo } from '@/data/profile'
import { useActiveSection } from '@/composables/useActiveSection'

const isOpen = ref(false)
const scrolled = ref(false)
const menuButton = ref<HTMLButtonElement | null>(null)
const active = useActiveSection(navLinks.map((l) => l.id))

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

const onScroll = () => {
  scrolled.value = window.scrollY > 8
}
const onKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape') void closeMenu()
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKey)
})
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300"
    :class="scrolled ? 'border-border bg-bg/85 backdrop-blur-md' : 'border-transparent bg-transparent'"
  >
    <nav class="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3" aria-label="Main">
      <a href="#hero" class="font-mono text-sm text-green">
        &gt; {{ personalInfo.handle }}<span class="caret text-green" aria-hidden="true">_</span>
      </a>

      <ul class="hidden gap-1 md:flex">
        <li v-for="link in navLinks" :key="link.id">
          <a
            :href="`#${link.id}`"
            class="rounded-md px-3 py-1.5 text-sm transition-colors duration-200"
            :class="active === link.id ? 'bg-green/10 text-green' : 'text-muted hover:text-text'"
            :aria-current="active === link.id ? 'location' : undefined"
          >
            {{ link.label }}
          </a>
        </li>
      </ul>

      <button
        ref="menuButton"
        type="button"
        class="rounded-md p-2 text-text md:hidden"
        :aria-expanded="isOpen"
        aria-controls="mobile-menu"
        @click="toggleMenu"
      >
        <span class="sr-only">{{ isOpen ? 'Close menu' : 'Open menu' }}</span>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path v-if="!isOpen" stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16" />
          <path v-else stroke-linecap="round" d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </nav>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-show="isOpen" id="mobile-menu" class="border-t border-border bg-bg/95 backdrop-blur-md md:hidden">
        <ul class="mx-auto flex max-w-5xl flex-col px-5 py-3">
          <li v-for="link in navLinks" :key="link.id">
            <a
              :href="`#${link.id}`"
              class="block rounded-md px-3 py-2.5"
              :class="active === link.id ? 'text-green' : 'text-muted hover:text-text'"
              :aria-current="active === link.id ? 'location' : undefined"
              @click="closeMenu(false)"
            >
              {{ link.label }}
            </a>
          </li>
        </ul>
      </div>
    </Transition>
  </header>
</template>
