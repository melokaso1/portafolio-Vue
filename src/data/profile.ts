import type { LearningItem, NavLink, PersonalInfo, Service, SkillGroup } from '@/types'

/**
 * Datos personales. Por decisión del equipo no se publica correo ni teléfono
 * en texto plano: el contacto va por GitHub y LinkedIn.
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

/** Servicios de "Trabaja conmigo". Cada uno se apoya en proyectos publicados. */
export const services: Service[] = [
  {
    id: 'apis-dotnet',
    title: 'APIs .NET',
    description: 'APIs REST en C#/.NET con arquitectura hexagonal o Clean Architecture, EF Core, PostgreSQL y JWT.',
    examples: ['Inventario inteligente', 'ToDo hexagonal'],
  },
  {
    id: 'automatizacion',
    title: 'Automatización con n8n y bots',
    description: 'Flujos en n8n y bots conversacionales (Telegram, FastAPI + LangGraph) conectados a tus datos.',
    examples: ['AgendaBot', 'Inventario inteligente'],
  },
  {
    id: 'inventario-agenda',
    title: 'Sistemas de inventario y agenda',
    description: 'Gestión de inventario, ventas y facturación, y agendamiento de citas.',
    examples: ['Inventario inteligente', 'AgendaBot'],
  },
]

export const aboutParagraphs: string[] = [
  'Trabajo con APIs, bases de datos y entregas full-stack: Clean Architecture en .NET, frontends web e integraciones como chatbots con IA cuando el producto lo necesita.',
  'Me siento cómodo en repos de equipo (como colaborador y como dueño): documento, entrego y mantengo los sistemas fáciles de correr en local con Docker.',
]

export const profileFacts: { key: string; value: string }[] = [
  { key: 'nombre', value: 'Alejandro' },
  { key: 'ubicación', value: 'Floridablanca, CO' },
  { key: 'enfoque', value: 'Backend / .NET / Frontend' },
  { key: 'stack', value: 'C#, PostgreSQL, Oracle, TS' },
  { key: 'inglés', value: 'B2' },
  { key: 'estado', value: 'DISPONIBLE' },
]

export const skillGroups: SkillGroup[] = [
  { category: 'Backend', skills: ['C#', '.NET', 'Python', 'Node.js', 'FastAPI'] },
  { category: 'Bases de datos', skills: ['PostgreSQL', 'Oracle', 'MySQL', 'EF Core', 'Almacenamiento JSON'] },
  { category: 'Arquitectura', skills: ['Clean Architecture', 'Hexagonal', 'REST', 'JWT', 'RBAC'] },
  { category: 'Frontend', skills: ['Vue', 'React', 'TypeScript', 'JavaScript', 'Blazor', 'Tailwind CSS', 'Vite'] },
  { category: 'Herramientas', skills: ['Git', 'GitHub', 'Docker', 'pnpm', 'VS Code', 'Cursor', 'n8n'] },
  { category: 'Idiomas', skills: ['Español (nativo)', 'Inglés B2'] },
]

export const learningItems: LearningItem[] = [
  { id: 'dotnet', title: 'C# y .NET', subtitle: 'APIs limpias y hexagonales', status: 'completed' },
  { id: 'efcore', title: 'EF Core y PostgreSQL', subtitle: 'Migraciones y persistencia', status: 'completed' },
  { id: 'react-ts', title: 'React y TypeScript', subtitle: 'SPA y paneles de administración', status: 'completed' },
  { id: 'fastapi-langgraph', title: 'FastAPI y LangGraph', subtitle: 'Flujos de chatbot con IA', status: 'completed' },
  { id: 'nodejs', title: 'Node.js y Express', subtitle: 'REST APIs', status: 'in-progress' },
  { id: 'devops', title: 'Docker y DevOps', subtitle: 'Pipelines de despliegue', status: 'in-progress' },
]

export const navLinks: NavLink[] = [
  { label: 'Inicio', id: 'hero' },
  { label: 'Sobre mí', id: 'about' },
  { label: 'Servicios', id: 'services' },
  { label: 'Habilidades', id: 'skills' },
  { label: 'Proyectos', id: 'projects' },
  { label: 'Aprendizaje', id: 'learning' },
  { label: 'Contacto', id: 'contact' },
]
