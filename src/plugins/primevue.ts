import type { App } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import { definePreset } from '@primeuix/themes'

/**
 * Tema de PrimeVue alineado con la paleta del portafolio (verde / cian sobre fondo oscuro).
 * Los componentes se importan uno a uno donde se usan (p. ej. `import Tag from 'primevue/tag'`)
 * para que solo entre al bundle lo necesario.
 */
export const PortfolioPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{green.50}',
      100: '{green.100}',
      200: '{green.200}',
      300: '{green.300}',
      400: '{green.400}',
      500: '{green.500}',
      600: '{green.600}',
      700: '{green.700}',
      800: '{green.800}',
      900: '{green.900}',
      950: '{green.950}',
    },
  },
})

export const primeVueOptions = {
  theme: {
    preset: PortfolioPreset,
    // El sitio es siempre oscuro: el modo oscuro de PrimeVue queda activo en :root.
    options: { darkModeSelector: ':root', cssLayer: false },
  },
}

export function installPrimeVue(app: App): void {
  app.use(PrimeVue, primeVueOptions)
}
