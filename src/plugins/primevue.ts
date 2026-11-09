import type { App } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import { definePreset } from '@primeuix/themes'

/**
 * Tema de PrimeVue alineado con la paleta del portafolio ("Grafito y ámbar": acento ámbar sobre fondo grafito).
 * Los componentes se importan uno a uno donde se usan (p. ej. `import Tag from 'primevue/tag'`)
 * para que solo entre al bundle lo necesario.
 */
export const PortfolioPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{amber.50}',
      100: '{amber.100}',
      200: '{amber.200}',
      300: '{amber.300}',
      400: '{amber.400}',
      500: '{amber.500}',
      600: '{amber.600}',
      700: '{amber.700}',
      800: '{amber.800}',
      900: '{amber.900}',
      950: '{amber.950}',
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
