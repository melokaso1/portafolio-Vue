import type { SkillGroup } from '@/types'

/** Stack principal (lo que se vende primero). */
export const coreStack: { name: string; detail: string }[] = [
  { name: '.NET / C#', detail: 'ASP.NET Core, Minimal APIs, EF Core' },
  { name: 'SQL', detail: 'PostgreSQL, Oracle, MySQL' },
  { name: 'Docker', detail: 'Entornos locales y despliegue' },
  { name: 'Git', detail: 'GitHub, pull requests y revisión de código' },
]

/** Lo que estoy aprendiendo ahora. */
export const learningNow: string[] = ['Go', 'Java']

/** Otras herramientas con las que he trabajado en proyectos del portafolio. */
export const skillGroups: SkillGroup[] = [
  { category: 'Arquitectura', skills: ['Clean Architecture', 'Hexagonal', 'REST', 'JWT', 'RBAC'] },
  { category: 'Backend', skills: ['Python', 'FastAPI', 'Node.js'] },
  { category: 'Frontend', skills: ['Vue', 'React', 'TypeScript', 'Blazor', 'Tailwind CSS'] },
  { category: 'Automatización', skills: ['n8n', 'Bots de Telegram', 'LangGraph'] },
  { category: 'Idiomas', skills: ['Español (nativo)', 'Inglés B2'] },
]
