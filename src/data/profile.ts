import type { LearningItem, NavLink, PersonalInfo, Service, SkillGroup } from '@/types'

/**
 * Datos personales. Por decisión del equipo no se publica correo ni teléfono
 * en texto plano: el contacto va por GitHub y LinkedIn.
 */
export const personalInfo: PersonalInfo = {
  name: 'Jhon Alejandro Escobar Lozada',
  handle: 'melokaso1',
  headline: 'Backend .NET que lidera equipos y automatiza procesos',
  roles: ['Backend Developer', '.NET Engineer', 'Clean Architecture', 'Frontend (Vue / React)'],
  bio: 'Backend-focused developer from Floridablanca, Santander. Building APIs, databases and full-stack systems with C#/.NET, Clean Architecture, PostgreSQL and modern frontends.',
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
    examples: ['Smart Inventory', 'ToDo hexagonal'],
  },
  {
    id: 'automatizacion',
    title: 'Automatización con n8n y bots',
    description: 'Flujos en n8n y bots conversacionales (Telegram, FastAPI + LangGraph) conectados a tus datos.',
    examples: ['AgendaBot', 'Smart Inventory'],
  },
  {
    id: 'inventario-agenda',
    title: 'Sistemas de inventario y agenda',
    description: 'Gestión de inventario, ventas y facturación, y agendamiento de citas.',
    examples: ['Smart Inventory', 'AgendaBot'],
  },
]

export const aboutParagraphs: string[] = [
  'I work across APIs, databases and full-stack delivery - Clean Architecture in .NET, web frontends, and integrations like SignalR or AI chatbots when the product needs them.',
  'Comfortable in team repos (contributor and owner): documenting, shipping, and keeping systems easy to run locally with Docker.',
]

export const profileFacts: { key: string; value: string }[] = [
  { key: 'name', value: 'Alejandro' },
  { key: 'location', value: 'Floridablanca, CO' },
  { key: 'focus', value: 'Backend / .NET / Frontend' },
  { key: 'stack', value: 'C#, PostgreSQL, Oracle, TS' },
  { key: 'english', value: 'B2' },
  { key: 'status', value: 'AVAILABLE' },
]

export const skillGroups: SkillGroup[] = [
  { category: 'Backend', skills: ['C#', '.NET', 'Python', 'Node.js', 'FastAPI'] },
  { category: 'Databases', skills: ['PostgreSQL', 'Oracle', 'MySQL', 'EF Core', 'JSON Storage'] },
  { category: 'Architecture', skills: ['Clean Architecture', 'Hexagonal', 'REST', 'JWT', 'RBAC', 'SignalR'] },
  { category: 'Frontend', skills: ['Vue', 'React', 'TypeScript', 'JavaScript', 'Blazor', 'Tailwind CSS', 'Vite'] },
  { category: 'Tools', skills: ['Git', 'GitHub', 'Docker', 'pnpm', 'VS Code', 'Cursor', 'n8n'] },
  { category: 'Languages', skills: ['Spanish (Native)', 'English B2'] },
]

export const learningItems: LearningItem[] = [
  { id: 'dotnet', title: 'C# & .NET', subtitle: 'Clean & hexagonal APIs', status: 'completed' },
  { id: 'efcore', title: 'EF Core & PostgreSQL', subtitle: 'Migrations & persistence', status: 'completed' },
  { id: 'react-ts', title: 'React & TypeScript', subtitle: 'SPA, ERP & clinical apps', status: 'completed' },
  { id: 'fastapi-langgraph', title: 'FastAPI & LangGraph', subtitle: 'AI chatbot flows', status: 'completed' },
  { id: 'nodejs', title: 'Node.js & Express', subtitle: 'REST APIs', status: 'in-progress' },
  { id: 'devops', title: 'Docker & DevOps', subtitle: 'Deployment pipelines', status: 'in-progress' },
]

export const navLinks: NavLink[] = [
  { label: 'Home', id: 'hero' },
  { label: 'About', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Learning', id: 'learning' },
  { label: 'Contact', id: 'contact' },
]
