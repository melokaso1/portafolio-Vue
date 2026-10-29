export interface ProjectLink {
  label: string
  url: string
}

export interface Project {
  id: string
  title: string
  /** Etiqueta corta de contexto (p. ej. proyecto académico o en pareja). Solo datos confirmados. */
  context?: string
  summary: string
  highlights: string[]
  tech: string[]
  /** Solo enlaces públicos y revisados. Vacío = no se enlaza todavía. */
  links: ProjectLink[]
  /** false = no se muestra en el sitio hasta que Alejandro lo confirme. */
  publicar: boolean
  /** Nota interna para el equipo. No se renderiza. */
  notaInterna?: string
}

export interface LeadershipItem {
  id: string
  title: string
  role: string
  summary: string
  publicar: boolean
  notaInterna?: string
}

export interface OtherWork {
  id: string
  title: string
  summary: string
  tech: string[]
  links: ProjectLink[]
  notaInterna?: string
}

export interface SkillGroup {
  category: string
  skills: string[]
}

export interface LearningItem {
  id: string
  title: string
  subtitle: string
  status: 'in-progress' | 'completed'
}

export interface PersonalInfo {
  name: string
  handle: string
  roles: string[]
  bio: string
  github: string
  linkedin: string
  location: string
}

export interface NavLink {
  label: string
  id: string
}
