import type { App } from 'vue'
import PrimeVue from 'primevue/config'

/**
 * PrimeVue en modo unstyled: el único componente que se usa (Accordion en Servicios) ya va sin
 * estilos y con Tailwind, así que no se carga el tema Aura (≈135 kB de JS que no se usaba).
 * Los componentes se importan uno a uno donde se usan (p. ej. `import Accordion from 'primevue/accordion'`).
 */
export const primeVueOptions = { unstyled: true }

export function installPrimeVue(app: App): void {
  app.use(PrimeVue, primeVueOptions)
}
