import type { LeadershipItem, OtherWork, Project } from '@/types'

/**
 * Proyectos del portafolio en formato caso de estudio. Único archivo a editar para cambiar textos.
 *
 * Reglas:
 * - Este archivo es público y termina en el bundle: solo va lo que se publica.
 *   Nada de notas internas ni proyectos ocultos.
 * - Solo datos confirmados en el README o en el código de cada repo. Nada inventado.
 * - Solo enlaces a repos públicos y revisados. Sin credenciales ni valores de .env.
 * - `result` se deja sin definir hasta que Alejandro confirme un resultado real.
 * - El orden del arreglo es el orden en pantalla.
 */
export const projects: Project[] = [
  {
    id: 'inteligent-inventory',
    title: 'Inventario inteligente (El Plonsazo)',
    context: 'Proyecto académico',
    problem: 'Gestionar inventario, ventas y facturación en un solo sistema, y permitir que los clientes compren por chat.',
    summary:
      'Sistema de inventario, ventas y facturación: una API REST hexagonal en .NET 10, un panel de administración en React y un microservicio de chat en FastAPI + LangGraph. El chat guía al cliente por un flujo de compra que registra la venta y la factura en la API.',
    highlights: [
      'Arquitectura hexagonal (Domain / Application / Infrastructure / Api) con migraciones de EF Core y seed automático.',
      'Compra desde el chatbot en una sola transacción: valida el stock, crea la venta, descuenta el inventario, registra el movimiento y genera la factura.',
      'Motor de reglas con máquina de estados en LangGraph (OpenAI opcional) y 21 archivos de prueba en pytest.',
    ],
    tech: ['C#', '.NET 10', 'EF Core', 'PostgreSQL', 'JWT', 'Python', 'FastAPI', 'LangGraph', 'pytest', 'React 19', 'TypeScript', 'Tailwind CSS'],
    links: [],
  },
  {
    id: 'todo-hexagonal',
    title: 'ToDo - Arquitectura hexagonal',
    problem: 'Mostrar la arquitectura hexagonal en la práctica con una API de tareas pequeña y completa.',
    summary:
      'API de tareas en C# hecha como guía práctica de arquitectura hexagonal, con un caso de uso por operación y un frontend en Vue 3 + TypeScript.',
    highlights: [
      'CRUD completo con filtro por estado y códigos HTTP correctos.',
      'Un caso de uso por operación: crear, actualizar, eliminar, listar y obtener por id.',
    ],
    tech: ['C#', '.NET 10', 'Minimal APIs', 'EF Core', 'PostgreSQL', 'Vue 3', 'TypeScript', 'Vite'],
    links: [],
  },
  {
    id: 'agendabot',
    title: 'AgendaBot',
    context: 'Proyecto en pareja',
    problem: 'Agendar y gestionar citas desde un chat de Telegram, usando Google Sheets como base de datos.',
    summary:
      'Bot de Telegram hecho con n8n para agendar, consultar, reprogramar, cancelar y completar citas desde un chat, con Google Sheets como base de datos.',
    highlights: [
      'Registro automático de usuarios y sesiones por ID de Telegram para mantener el contexto de la conversación.',
      'Ciclo completo de citas: agendar, consultar, reprogramar, cancelar y marcar como completada.',
    ],
    tech: ['n8n', 'Telegram Bot API', 'Google Sheets API'],
    links: [{ label: 'Repositorio', url: 'https://github.com/melokaso1/Proyecto_IA_Nivel1_EscobarAlejandro_Medina_Tomas' }],
  },
  {
    id: 'liga-betplay',
    title: 'Liga BetPlay',
    context: 'Versión C# en coautoría',
    problem: 'Simular una temporada de la Liga BetPlay colombiana: calendario, jornadas y tabla de posiciones.',
    summary:
      'Simulador de la Liga BetPlay colombiana en una app de consola en C#: registra equipos, genera un calendario todos contra todos, simula jornadas y calcula la tabla de posiciones. Una versión web gestiona los equipos y sus escudos.',
    highlights: [
      'Calendario todos contra todos y tabla de posiciones (PJ, PG, PE, PP, GF, GC, DG).',
      'Arquitectura en capas (Core / Modules) en la versión C#.',
      'Versión web con persistencia local en localStorage.',
    ],
    tech: ['C#', '.NET', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS', 'Vite'],
    links: [
      { label: 'Repo C#', url: 'https://github.com/melokaso1/ligaBetplay_C-' },
      { label: 'Repo web', url: 'https://github.com/melokaso1/ligaBetplay' },
      { label: 'Demo en vivo', url: 'https://ligabetplaydimayor.netlify.app/' },
    ],
  },
  {
    id: 'abc-lms',
    title: 'ABC-LMS (ABC Educate)',
    problem: 'Gestionar docentes, administrativos, cursos, módulos y lecciones desde una sola app web.',
    summary:
      'App web para gestionar docentes, administrativos, cursos, módulos y lecciones, con login, rutas protegidas y un dashboard de estadísticas, con estética de terminal.',
    highlights: [
      'CRUD jerárquico (curso > módulo > lección) con lecciones de video, lectura o quiz.',
      'Enrutador propio con rutas dinámicas y protección de rutas por token.',
    ],
    tech: ['JavaScript', 'Web Components', 'HTML', 'CSS', 'localStorage'],
    links: [
      { label: 'Repositorio', url: 'https://github.com/melokaso1/ABC-LMS' },
      { label: 'Demo en vivo', url: 'https://abc-curses.netlify.app/' },
    ],
  },
  {
    id: 'dataset-editor',
    title: 'TrendGear Analytics (datasetEditorApp)',
    problem: 'Explorar y editar datos de pedidos con KPIs y gráficos.',
    summary:
      'Dashboard de analítica de pedidos con CRUD contra una API REST (MockAPI), KPIs, gráficos de ventas por categoría y por método de pago, y búsqueda de registros.',
    highlights: ['CRUD con fetch (GET / POST / PUT / DELETE) y gráficos hechos a mano, sin frameworks.'],
    tech: ['JavaScript', 'HTML', 'CSS', 'MockAPI'],
    links: [{ label: 'Repositorio', url: 'https://github.com/melokaso1/datasetEditorApp' }],
  },
]

/** Liderazgo. Sin enlaces ni datos internos (el proyecto es privado). */
export const leadership: LeadershipItem[] = [
  {
    id: 'nodux',
    title: 'Nodux',
    role: 'Líder de equipo',
    summary:
      'Lidero el equipo de desarrollo de un producto privado: planifico tareas, reviso pull requests y coordino el trabajo de frontend, backend, QA y DevOps.',
  },
]

/** Otros trabajos conservados del portafolio anterior, en formato compacto. */
export const otherWork: OtherWork[] = [
  {
    id: 'nexus-odonto',
    title: 'Nexus Odonto (colaborador)',
    summary:
      'Plataforma para clínicas odontológicas (proyecto de equipo): citas, pacientes, roles RBAC, persistencia en Oracle, despliegue con Docker y un chatbot con IA. El código es privado; la documentación es pública.',
    tech: ['C#', '.NET', 'Oracle', 'React', 'Docker'],
    links: [{ label: 'Documentación', url: 'https://github.com/NexusOdonto/NexusOdonto_documentation' }],
  },
  {
    id: 'gestion-mecanica',
    title: 'Gestión de taller mecánico',
    summary:
      'Plataforma de gestión de taller: clientes, vehículos, órdenes de servicio y facturación. API en ASP.NET + Blazor WASM + host de escritorio WPF con roles JWT.',
    tech: ['C#', '.NET', 'EF Core', 'PostgreSQL', 'Blazor', 'WPF'],
    links: [],
  },
  {
    id: 'transporte-migrations',
    title: 'Transporte - Migraciones de BD',
    summary: 'Dominio de transporte modelado con migraciones de EF Core y persistencia estructurada en C#.',
    tech: ['C#', 'EF Core'],
    links: [],
  },
  {
    id: 'luxtime',
    title: 'LuxTime - Relojes de lujo',
    summary: 'Landing de e-commerce de relojes de lujo con interfaz cuidada y diseño responsive.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Tailwind'],
    links: [],
  },
  {
    id: 'coworking',
    title: 'Gestor de salas de coworking',
    summary: 'Sistema de reservas y agenda de salas de coworking hecho en Python.',
    tech: ['Python'],
    links: [{ label: 'Repositorio', url: 'https://github.com/melokaso1/Gestor-de-Reservas-de-Salas-de-Coworking-Python-Edition-' }],
  },
  {
    id: 'cuentas-bancarias',
    title: 'Gestor de cuentas bancarias',
    summary: 'Sistema de gestión de cuentas bancarias con JSON como capa de persistencia.',
    tech: ['Python', 'JSON'],
    links: [{ label: 'Repositorio', url: 'https://github.com/melokaso1/gestion_cuentas_bancarias_json' }],
  },
]
