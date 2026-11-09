import type { NavLink } from '@/types'

/** Navegación principal, en el orden de las secciones en pantalla. El logo lleva a #hero. */
export const navLinks: NavLink[] = [
  { label: 'Lo que resuelvo', id: 'resuelvo' },
  { label: 'Proyectos', id: 'projects' },
  { label: 'Servicios', id: 'services' },
  // Stack y Sobre mí comparten la sección 04 (#skills contiene #about): un solo ítem.
  { label: 'Stack · Sobre mí', id: 'skills' },
  { label: 'Contacto', id: 'contact' },
]

/** Grupos del Branched Menu (rediseño v2). */
export const navGroups: { label: string; ids: string[] }[] = [
  { label: 'Trabajo', ids: ['resuelvo', 'projects', 'services'] },
  { label: 'Perfil', ids: ['skills', 'contact'] },
]
