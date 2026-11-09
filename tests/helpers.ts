import { mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import App from '@/App.vue'
import { vReveal } from '@/directives/reveal'
import { primeVueOptions } from '@/plugins/primevue'

/** Monta la app con los mismos plugins que src/main.ts. */
export const mountApp = (attachTo?: HTMLElement) =>
  mount(App, {
    attachTo,
    global: {
      plugins: [[PrimeVue, primeVueOptions]],
      directives: { reveal: vReveal },
    },
  })
