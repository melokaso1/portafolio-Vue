export interface ProjectLink {
  label: string
  url: string
}

/** Proyecto en formato caso de estudio. Solo datos confirmados en el README o en el código. */
export interface Project {
  id: string
  title: string
  /** Etiqueta corta de contexto (p. ej. proyecto académico o en pareja). Solo datos confirmados. */
  context?: string
  /** Problema que resuelve el proyecto. */
  problem: string
  /** Qué se construyó. */
  summary: string
  highlights: string[]
  tech: string[]
  /** Resultado real. Se omite si no está confirmado. */
  result?: string
  /** Solo enlaces públicos y revisados. Vacío = no se enlaza todavía. */
  links: ProjectLink[]
}

export interface LeadershipItem {
  id: string
  title: string
  role: string
  summary: string
}

export interface OtherWork {
  id: string
  title: string
  summary: string
  tech: string[]
  links: ProjectLink[]
}

export interface Service {
  id: string
  title: string
  description: string
  /** Proyectos del portafolio que lo respaldan. */
  examples: string[]
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
  headline: string
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
