export interface SolveItem {
  id: string
  title: string
  description: string
  /** Proyectos de este portafolio que lo respaldan. Solo proyectos reales. */
  proof: string[]
}

/** "Lo que resuelvo": problemas de negocio, respaldados por proyectos publicados. Sin métricas inventadas. */
export const solveItems: SolveItem[] = [
  {
    id: 'apis',
    title: 'APIs que escalan',
    description:
      'APIs REST en C# y ASP.NET Core con arquitectura limpia (hexagonal o Clean Architecture), EF Core, PostgreSQL y autenticación JWT con roles. Código ordenado que tu equipo puede mantener y crecer.',
    proof: ['Inventario inteligente', 'ToDo hexagonal'],
  },
  {
    id: 'integraciones',
    title: 'Integraciones entre sistemas',
    description:
      'Conecto tu backend con otros servicios y aplicaciones: chatbots que registran ventas y facturas en la API, bots de Telegram sobre Google Sheets y frontends en Vue o React.',
    proof: ['Inventario inteligente', 'AgendaBot'],
  },
  {
    id: 'automatizaciones',
    title: 'Automatizaciones',
    description:
      'Flujos en n8n y bots que se encargan del trabajo repetitivo: agendar, reprogramar y cancelar citas, registrar usuarios y mover datos entre herramientas.',
    proof: ['AgendaBot'],
  },
]
