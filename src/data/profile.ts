import type { PersonalInfo } from '@/types'

/**
 * Datos personales. Por decisión del equipo no se publica correo ni teléfono
 * en texto plano: el contacto va por GitHub y LinkedIn.
 *
 * Los datos de cada sección viven en su propio archivo de `src/data/`
 * (services, about, stack, nav...) para poder editarlos por separado.
 */
export const personalInfo: PersonalInfo = {
  name: 'Jhon Alejandro Escobar Lozada',
  handle: 'melokaso1',
  headline: 'Backend .NET que lidera equipos y automatiza procesos',
  roles: ['Desarrollador backend', 'Ingeniero .NET', 'Clean Architecture', 'Frontend (Vue / React)'],
  bio: 'Desarrollador enfocado en backend, de Floridablanca, Santander. Construyo APIs, bases de datos y sistemas full-stack con C#/.NET, Clean Architecture, PostgreSQL y frontends modernos.',
  github: 'https://github.com/melokaso1',
  linkedin: 'https://www.linkedin.com/in/alejandro-escobar-9b7590365',
  location: 'Floridablanca, Santander, CO',
}
