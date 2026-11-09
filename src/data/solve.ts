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
    proof: ['NexusOdonto API', 'HealtLab'],
  },
  {
    id: 'integraciones',
    title: 'Integraciones entre sistemas',
    description:
      'Conecto tu backend con otros servicios y aplicaciones: un agente de WhatsApp que agenda citas contra una API .NET, chatbots que registran ventas y facturas, notificaciones en tiempo real con SignalR y frontends en Vue o React.',
    proof: ['NexusOdonto ChatBot AI', 'Inventario inteligente'],
  },
  {
    id: 'automatizaciones',
    title: 'Automatizaciones',
    description:
      'Bots y flujos que se encargan del trabajo repetitivo: agendar, reprogramar y cancelar citas, enviar recordatorios y registrar ventas sin intervención manual.',
    proof: ['NexusOdonto ChatBot AI', 'Inventario inteligente'],
  },
]
