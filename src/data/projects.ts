import type { LeadershipItem, OtherWork, Project } from '@/types'

/**
 * Proyectos del portafolio. Único archivo a editar para cambiar textos.
 *
 * Reglas:
 * - Solo datos confirmados en el README o en el código de cada repo. Nada inventado.
 * - Solo enlaces a repos públicos y revisados. Sin credenciales ni valores de .env.
 * - `publicar: false` oculta el proyecto hasta que Alejandro lo confirme.
 * - El orden del arreglo es el orden en pantalla.
 */
export const projects: Project[] = [
  {
    id: 'inteligent-inventory',
    title: 'Smart Inventory (El Plonsazo)',
    context: 'Academic project',
    summary:
      'Inventory, sales and invoicing system: a hexagonal REST API in .NET 10, a React admin panel and a FastAPI + LangGraph chat microservice. The chat guides the customer through a purchase flow that records the sale and the invoice in the API.',
    highlights: [
      'Hexagonal architecture (Domain / Application / Infrastructure / Api) with EF Core migrations and automatic seeding.',
      'Chatbot purchase in a single transaction: validates stock, creates the sale, updates inventory, logs the movement and issues the invoice.',
      'Rule engine with a LangGraph state machine (OpenAI optional) and 21 pytest test files.',
    ],
    tech: ['C#', '.NET 10', 'EF Core', 'PostgreSQL', 'JWT', 'Python', 'FastAPI', 'LangGraph', 'pytest', 'React 19', 'TypeScript', 'Tailwind CSS'],
    // Sin enlaces: los tres repos (Backend, Frontend y LLMChatBot) tienen un .env versionado.
    links: [],
    publicar: true,
    notaInterna:
      'PENDIENTE ALEJANDRO: InteligentInventoryBackend, InteligentInventoryFrontend e InteligentInventoryLLMChatBot tienen .env en el repo público. Enlazar solo tras limpiarlos. Revisar también cómo se presentan las categorías del catálogo ficticio.',
  },
  {
    id: 'healtlab',
    title: 'HealtLab',
    context: 'Team project',
    summary:
      'Clinical management backend in C#/.NET: users, appointment scheduling, clinical records and role-based permissions (RBAC), plus a React SPA that consumes the API with JWT and real-time SignalR notifications.',
    highlights: [
      'Clean Architecture in four layers with explicit dependency rules.',
      'RBAC with three roles (Administrator, Receptionist, Professional), token refresh and password recovery.',
      'Appointment rules (30-minute limit, reschedule, cancel, no-show) and reports by status and by doctor.',
    ],
    tech: ['C#', '.NET 10', 'EF Core', 'PostgreSQL (Supabase)', 'JWT', 'SignalR', 'Swagger', 'React 19', 'TypeScript', 'Vite'],
    links: [],
    publicar: false,
    notaInterna:
      'OCULTO hasta que Alejandro confirme su rol: el README reparte capas entre otros integrantes y no dice qué hizo él. HEALTLAB_FRONTEND dice "uso privado" aunque es público: no enlazar. Los READMEs publican credenciales de prueba.',
  },
  {
    id: 'todo-hexagonal',
    title: 'ToDo - Hexagonal Architecture',
    summary:
      'Task API in C# built as a hands-on guide to hexagonal architecture, with one use case per operation and a Vue 3 + TypeScript frontend.',
    highlights: [
      'Full CRUD with status filter and proper HTTP status codes.',
      'One use case per operation: create, update, delete, list and get by id.',
    ],
    tech: ['C#', '.NET 10', 'Minimal APIs', 'EF Core', 'PostgreSQL', 'Vue 3', 'TypeScript', 'Vite'],
    links: [],
    publicar: true,
    notaInterna:
      'PENDIENTE ALEJANDRO: Api/appsettings.json del repo ToDo contiene una contraseña en la cadena de conexión. Enlazar https://github.com/melokaso1/ToDo tras revisarla. El repo no tiene README.',
  },
  {
    id: 'agendabot',
    title: 'AgendaBot',
    context: 'Pair project',
    summary:
      'Telegram bot built with n8n to book, check, reschedule, cancel and complete appointments from a chat, using Google Sheets as its database.',
    highlights: [
      'Automatic user registration and per-Telegram-ID sessions to keep conversation context.',
      'Full appointment lifecycle: book, check, reschedule, cancel and mark as completed.',
    ],
    tech: ['n8n', 'Telegram Bot API', 'Google Sheets API'],
    links: [{ label: 'Repository', url: 'https://github.com/melokaso1/Proyecto_IA_Nivel1_EscobarAlejandro_Medina_Tomas' }],
    publicar: true,
  },
  {
    id: 'liga-betplay',
    title: 'Liga BetPlay',
    summary:
      'Colombian Liga BetPlay simulator in a C# console app: registers teams, builds a round-robin schedule, simulates matchdays and computes the standings. A web version manages teams and their crests.',
    highlights: [
      'Round-robin schedule and standings table (P, W, D, L, GF, GA, GD).',
      'Layered architecture (Core / Modules) in the C# version.',
      'Web version with local persistence in localStorage.',
    ],
    tech: ['C#', '.NET', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS', 'Vite'],
    links: [
      { label: 'C# repo', url: 'https://github.com/melokaso1/ligaBetplay_C-' },
      { label: 'Web repo', url: 'https://github.com/melokaso1/ligaBetplay' },
      { label: 'Live demo', url: 'https://ligabetplaydimayor.netlify.app/' },
    ],
    publicar: true,
    notaInterna: 'La versión C# es en coautoría con Tomás Medina.',
  },
  {
    id: 'abc-lms',
    title: 'ABC-LMS (ABC Educate)',
    summary:
      'Web app to manage teachers, administrative staff, courses, modules and lessons, with login, protected routes and a statistics dashboard, styled like a terminal.',
    highlights: [
      'Hierarchical CRUD (course > module > lesson) with video, reading or quiz lessons.',
      'Custom router with dynamic routes and token-based route protection.',
    ],
    tech: ['JavaScript', 'Web Components', 'HTML', 'CSS', 'localStorage'],
    links: [
      { label: 'Repository', url: 'https://github.com/melokaso1/ABC-LMS' },
      { label: 'Live demo', url: 'https://abc-curses.netlify.app/' },
    ],
    publicar: true,
    notaInterna:
      'Frontend sin backend real (datos en localStorage). El README publica credenciales de prueba de la demo: no copiarlas aquí; Alejandro decide si las quita del README.',
  },
  {
    id: 'dataset-editor',
    title: 'TrendGear Analytics (datasetEditorApp)',
    summary:
      'Order analytics dashboard with CRUD against a REST API (MockAPI), KPIs, sales-by-category and payment-method charts, and record search.',
    highlights: ['CRUD with fetch (GET / POST / PUT / DELETE) and hand-made charts, no frameworks.'],
    tech: ['JavaScript', 'HTML', 'CSS', 'MockAPI'],
    links: [{ label: 'Repository', url: 'https://github.com/melokaso1/datasetEditorApp' }],
    publicar: true,
    notaInterna: 'El repo no tiene README ni demo; la descripción sale del código.',
  },
]

/** Liderazgo. Sin enlaces ni datos internos (el proyecto es privado). */
export const leadership: LeadershipItem[] = [
  {
    id: 'nodux',
    title: 'Nodux',
    role: 'Team lead',
    summary:
      'Leading the development team of a private product: planning tasks, reviewing pull requests and coordinating frontend, backend, QA and DevOps work.',
    publicar: true,
    notaInterna: 'PENDIENTE ALEJANDRO: confirmar el texto. No enlazar repos ni dar datos internos.',
  },
]

/** Otros trabajos conservados del portafolio anterior, en formato compacto. */
export const otherWork: OtherWork[] = [
  {
    id: 'nexus-odonto',
    title: 'Nexus Odonto (contributor)',
    summary:
      'Dental clinic platform (team project): appointments, patients, RBAC roles, Oracle persistence, Docker deploy and an AI chatbot. Code is private; public docs and live demo.',
    tech: ['C#', '.NET', 'Oracle', 'React', 'Docker'],
    links: [
      { label: 'Docs', url: 'https://github.com/NexusOdonto/NexusOdonto_documentation' },
      { label: 'Live demo', url: 'https://nexusodonto.chatcampuslands.com/' },
    ],
  },
  {
    id: 'gestion-mecanica',
    title: 'Automotive Workshop Management',
    summary:
      'Workshop management platform: clients, vehicles, service orders and billing. ASP.NET API + Blazor WASM + WPF desktop host with JWT roles.',
    tech: ['C#', '.NET', 'EF Core', 'PostgreSQL', 'Blazor', 'WPF'],
    links: [],
    notaInterna: 'PENDIENTE: Api/appsettings.json del repo tiene contraseña/clave. Enlazar tras revisarlo.',
  },
  {
    id: 'transporte-migrations',
    title: 'Transport - DB Migrations',
    summary: 'Transport domain modeled with EF Core migrations and structured persistence in C#.',
    tech: ['C#', 'EF Core'],
    links: [],
    notaInterna: 'PENDIENTE: appsettings.json del repo tiene contraseña. Enlazar tras revisarlo.',
  },
  {
    id: 'luxtime',
    title: 'LuxTime - Luxury Watches',
    summary: 'Luxury watch e-commerce landing with polished UI and responsive layout.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Tailwind'],
    links: [{ label: 'Live demo', url: 'https://luxtime-luxury.netlify.app/' }],
    notaInterna: 'El repo proyecto_luxTime ahora es privado: solo se enlaza la demo.',
  },
  {
    id: 'coworking',
    title: 'Coworking Room Manager',
    summary: 'Coworking room reservation and scheduling system built in Python.',
    tech: ['Python'],
    links: [{ label: 'Repository', url: 'https://github.com/melokaso1/Gestor-de-Reservas-de-Salas-de-Coworking-Python-Edition-' }],
  },
  {
    id: 'cuentas-bancarias',
    title: 'Bank Account Manager',
    summary: 'Bank account management system with JSON as persistence layer.',
    tech: ['Python', 'JSON'],
    links: [{ label: 'Repository', url: 'https://github.com/melokaso1/gestion_cuentas_bancarias_json' }],
  },
]

export const publishedProjects = (): Project[] => projects.filter((p) => p.publicar)
export const publishedLeadership = (): LeadershipItem[] => leadership.filter((l) => l.publicar)
