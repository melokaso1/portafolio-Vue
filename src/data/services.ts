import type { Service } from '@/types'

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
