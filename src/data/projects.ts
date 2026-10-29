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
    title: 'Smart Inventory (El Plonsazo)',
    context: 'Academic project',
    problem: 'Manage inventory, sales and invoicing in one system, and let customers buy through a chat.',
    summary:
      'Inventory, sales and invoicing system: a hexagonal REST API in .NET 10, a React admin panel and a FastAPI + LangGraph chat microservice. The chat guides the customer through a purchase flow that records the sale and the invoice in the API.',
    highlights: [
      'Hexagonal architecture (Domain / Application / Infrastructure / Api) with EF Core migrations and automatic seeding.',
      'Chatbot purchase in a single transaction: validates stock, creates the sale, updates inventory, logs the movement and issues the invoice.',
      'Rule engine with a LangGraph state machine (OpenAI optional) and 21 pytest test files.',
    ],
    tech: ['C#', '.NET 10', 'EF Core', 'PostgreSQL', 'JWT', 'Python', 'FastAPI', 'LangGraph', 'pytest', 'React 19', 'TypeScript', 'Tailwind CSS'],
    links: [],
  },
  {
    id: 'todo-hexagonal',
    title: 'ToDo - Hexagonal Architecture',
    problem: 'Show hexagonal architecture in practice with a small, complete task API.',
    summary:
      'Task API in C# built as a hands-on guide to hexagonal architecture, with one use case per operation and a Vue 3 + TypeScript frontend.',
    highlights: [
      'Full CRUD with status filter and proper HTTP status codes.',
      'One use case per operation: create, update, delete, list and get by id.',
    ],
    tech: ['C#', '.NET 10', 'Minimal APIs', 'EF Core', 'PostgreSQL', 'Vue 3', 'TypeScript', 'Vite'],
    links: [],
  },
  {
    id: 'agendabot',
    title: 'AgendaBot',
    context: 'Pair project',
    problem: 'Book and manage appointments from a Telegram chat, using Google Sheets as the database.',
    summary:
      'Telegram bot built with n8n to book, check, reschedule, cancel and complete appointments from a chat, using Google Sheets as its database.',
    highlights: [
      'Automatic user registration and per-Telegram-ID sessions to keep conversation context.',
      'Full appointment lifecycle: book, check, reschedule, cancel and mark as completed.',
    ],
    tech: ['n8n', 'Telegram Bot API', 'Google Sheets API'],
    links: [{ label: 'Repository', url: 'https://github.com/melokaso1/Proyecto_IA_Nivel1_EscobarAlejandro_Medina_Tomas' }],
  },
  {
    id: 'liga-betplay',
    title: 'Liga BetPlay',
    context: 'C# version co-authored',
    problem: 'Simulate a Colombian Liga BetPlay season: schedule, matchdays and standings.',
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
  },
  {
    id: 'abc-lms',
    title: 'ABC-LMS (ABC Educate)',
    problem: 'Manage teachers, staff, courses, modules and lessons from a single web app.',
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
  },
  {
    id: 'dataset-editor',
    title: 'TrendGear Analytics (datasetEditorApp)',
    problem: 'Explore and edit order data with KPIs and charts.',
    summary:
      'Order analytics dashboard with CRUD against a REST API (MockAPI), KPIs, sales-by-category and payment-method charts, and record search.',
    highlights: ['CRUD with fetch (GET / POST / PUT / DELETE) and hand-made charts, no frameworks.'],
    tech: ['JavaScript', 'HTML', 'CSS', 'MockAPI'],
    links: [{ label: 'Repository', url: 'https://github.com/melokaso1/datasetEditorApp' }],
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
  },
]

/** Otros trabajos conservados del portafolio anterior, en formato compacto. */
export const otherWork: OtherWork[] = [
  {
    id: 'nexus-odonto',
    title: 'Nexus Odonto (contributor)',
    summary:
      'Dental clinic platform (team project): appointments, patients, RBAC roles, Oracle persistence, Docker deploy and an AI chatbot. Code is private; public docs.',
    tech: ['C#', '.NET', 'Oracle', 'React', 'Docker'],
    links: [{ label: 'Docs', url: 'https://github.com/NexusOdonto/NexusOdonto_documentation' }],
  },
  {
    id: 'gestion-mecanica',
    title: 'Automotive Workshop Management',
    summary:
      'Workshop management platform: clients, vehicles, service orders and billing. ASP.NET API + Blazor WASM + WPF desktop host with JWT roles.',
    tech: ['C#', '.NET', 'EF Core', 'PostgreSQL', 'Blazor', 'WPF'],
    links: [],
  },
  {
    id: 'transporte-migrations',
    title: 'Transport - DB Migrations',
    summary: 'Transport domain modeled with EF Core migrations and structured persistence in C#.',
    tech: ['C#', 'EF Core'],
    links: [],
  },
  {
    id: 'luxtime',
    title: 'LuxTime - Luxury Watches',
    summary: 'Luxury watch e-commerce landing with polished UI and responsive layout.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Tailwind'],
    links: [],
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
