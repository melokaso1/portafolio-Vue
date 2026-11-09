import type { LearningItem, SkillGroup } from '@/types'

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
