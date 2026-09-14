import type { Project, SkillGroup, LearningItem, PersonalInfo } from '../types'

export const personalInfo: PersonalInfo = {
  name: 'Jhon Alejandro Escobar Lozada',
  handle: 'melokaso1',
  roles: ['BACKEND_DEVELOPER', '.NET_ENGINEER', 'CLEAN_ARCHITECTURE', 'REACT_DEV'],
  bio: 'Backend-focused developer from Floridablanca, Santander. Building APIs, databases and full-stack systems with C#/.NET, Clean Architecture, PostgreSQL and React.',
  email: 'jhonalejoescobar@gmail.com',
  github: 'https://github.com/melokaso1',
  linkedin: 'https://www.linkedin.com/in/alejandro-escobar-9b7590365',
  location: 'Floridablanca, Santander, CO',
}

export const backendProjects: Project[] = [
  {
    id: 'nexus-odonto',
    title: 'Nexus Odonto',
    description:
      'Dental clinic platform (team project — contributor): appointments, patients, RBAC roles, Oracle persistence, Docker deploy and an AI chatbot. Code lives under the NexusOdonto org (private); public docs + live demo available.',
    tech: ['C#', '.NET', 'Oracle', 'React', 'Docker', 'AI Chatbot', 'JWT'],
    githubUrl: 'https://github.com/NexusOdonto/NexusOdonto_documentation',
    liveUrl: 'https://nexusodonto.chatcampuslands.com/',
    extraLinks: [
      { label: 'ORG', url: 'https://github.com/NexusOdonto' },
    ],
    featured: true,
    contributor: true,
    category: 'backend',
  },
  {
    id: 'healtlab-backend',
    title: 'HealtLab — API',
    description:
      'Medical appointment system with Clean Architecture: patients, clinical records, RBAC, JWT auth and real-time SignalR notifications. Team project on PostgreSQL/Supabase.',
    tech: ['C#', '.NET', 'EF Core', 'PostgreSQL', 'JWT', 'SignalR', 'Clean Architecture'],
    githubUrl: 'https://github.com/melokaso1/HEALTLABS_BACKEND',
    extraLinks: [
      { label: 'FRONTEND', url: 'https://github.com/melokaso1/HEALTLAB_FRONTEND' },
    ],
    featured: true,
    category: 'backend',
  },
  {
    id: 'el-plonsazo-backend',
    title: 'Smart Inventory — API',
    description:
      'Hexagonal .NET API for inventory, sales, dispatch and invoicing. JWT roles, EF Core + PostgreSQL, and a proxy to an AI chatbot microservice.',
    tech: ['C#', '.NET', 'EF Core', 'PostgreSQL', 'Docker', 'Hexagonal', 'JWT'],
    githubUrl: 'https://github.com/melokaso1/InteligentInventoryBackend',
    extraLinks: [
      { label: 'FRONTEND', url: 'https://github.com/melokaso1/InteligentInventoryFrontend' },
      { label: 'CHATBOT', url: 'https://github.com/melokaso1/InteligentInventoryLLMChatBot' },
    ],
    featured: true,
    category: 'backend',
  },
  {
    id: 'el-plonsazo-chatbot',
    title: 'Smart Inventory — AI Chatbot',
    description:
      'Conversational inventory assistant with FastAPI + LangGraph: stock queries, product search and guided purchase flow wired to the .NET API.',
    tech: ['Python', 'FastAPI', 'LangGraph', 'LangChain', 'httpx', 'pytest'],
    githubUrl: 'https://github.com/melokaso1/InteligentInventoryLLMChatBot',
    featured: true,
    category: 'backend',
  },
  {
    id: 'gestion-mecanica',
    title: 'Gestión de Taller Automotriz',
    description:
      'Workshop management platform: clients, vehicles, service orders and billing. ASP.NET API + Blazor WASM + WPF desktop host with JWT roles.',
    tech: ['C#', '.NET', 'EF Core', 'PostgreSQL', 'Blazor', 'WPF', 'JWT'],
    githubUrl: 'https://github.com/melokaso1/Proyecto-EFCORE-gestion-mecanica',
    featured: true,
    category: 'backend',
  },
  {
    id: 'agendabot',
    title: 'AgendaBot IA',
    description:
      'Telegram bot for appointments, habits and reminders using n8n + Google Sheets — no paid AI services required.',
    tech: ['Python', 'n8n', 'Telegram API', 'Google Sheets'],
    githubUrl: 'https://github.com/melokaso1/Proyecto_IA_Nivel1_EscobarAlejandro_Medina_Tomas',
    category: 'backend',
  },
  {
    id: 'transporte-migrations',
    title: 'Transporte — DB Migrations',
    description:
      'Transport domain modeled with EF Core migrations and structured persistence in C#.',
    tech: ['C#', 'EF Core', 'Migrations'],
    githubUrl: 'https://github.com/melokaso1/Transporte_db_migrations',
    category: 'backend',
  },
  {
    id: 'coworking',
    title: 'Gestor de Coworking',
    description:
      'Coworking room reservation and scheduling system built in Python.',
    tech: ['Python'],
    githubUrl: 'https://github.com/melokaso1/Gestor-de-Reservas-de-Salas-de-Coworking-Python-Edition-',
    category: 'backend',
  },
  {
    id: 'cuentas-bancarias',
    title: 'Gestión de Cuentas Bancarias',
    description:
      'Bank account management system with JSON as persistence layer.',
    tech: ['Python', 'JSON Storage', 'OOP'],
    githubUrl: 'https://github.com/melokaso1/gestion_cuentas_bancarias_json',
    category: 'backend',
  },
]

export const frontendProjects: Project[] = [
  {
    id: 'healtlab-frontend',
    title: 'HealtLab — Frontend',
    description:
      'Clinical SPA for appointments, patients, staff and reports. Role-based portals with JWT and live SignalR notifications.',
    tech: ['React 19', 'TypeScript', 'Vite', 'React Router', 'SignalR'],
    githubUrl: 'https://github.com/melokaso1/HEALTLAB_FRONTEND',
    extraLinks: [
      { label: 'BACKEND', url: 'https://github.com/melokaso1/HEALTLABS_BACKEND' },
    ],
    featured: true,
    category: 'frontend',
  },
  {
    id: 'el-plonsazo-frontend',
    title: 'Smart Inventory — ERP Frontend',
    description:
      'Admin ERP panel: dashboard, catalog, inventory, sales, invoices and AI chatbot. Real JWT auth with Admin/Client roles.',
    tech: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'React Router'],
    githubUrl: 'https://github.com/melokaso1/InteligentInventoryFrontend',
    extraLinks: [
      { label: 'BACKEND', url: 'https://github.com/melokaso1/InteligentInventoryBackend' },
    ],
    featured: true,
    category: 'frontend',
  },
  {
    id: 'luxtime',
    title: 'LuxTime — Luxury Watches',
    description:
      'Luxury watch e-commerce landing with polished UI and responsive layout.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind'],
    githubUrl: 'https://github.com/melokaso1/proyecto_luxTime',
    liveUrl: 'https://luxtime-luxury.netlify.app/',
    category: 'frontend',
  },
  {
    id: 'abc-lms',
    title: 'ABC-LMS',
    description:
      'Learning management web platform for courses and student workflows.',
    tech: ['JavaScript', 'HTML5', 'CSS3'],
    githubUrl: 'https://github.com/melokaso1/ABC-LMS',
    category: 'frontend',
  },
  {
    id: 'dataset-editor',
    title: 'Dataset Editor',
    description:
      'Dataset editor with dynamic API connection for browsing and editing records.',
    tech: ['JavaScript', 'APIs'],
    githubUrl: 'https://github.com/melokaso1/datasetEditorApp',
    category: 'frontend',
  },
  {
    id: 'liga-betplay-js',
    title: 'Liga Betplay — Equipos FPC',
    description:
      'Web showcase of Colombian FPC / Liga Betplay teams.',
    tech: ['JavaScript', 'HTML5', 'CSS3'],
    githubUrl: 'https://github.com/melokaso1/ligaBetplay',
    category: 'frontend',
  },
]

export const skillGroups: SkillGroup[] = [
  {
    category: 'BACKEND',
    skills: ['C#', '.NET', 'Python', 'Node.js', 'FastAPI'],
    color: 'green',
  },
  {
    category: 'DATABASES',
    skills: ['PostgreSQL', 'Oracle', 'MySQL', 'EF Core', 'JSON Storage'],
    color: 'green',
  },
  {
    category: 'ARCHITECTURE',
    skills: ['Clean Architecture', 'Hexagonal', 'REST', 'JWT', 'RBAC', 'SignalR'],
    color: 'green',
  },
  {
    category: 'FRONTEND',
    skills: ['React', 'TypeScript', 'JavaScript', 'Blazor', 'Tailwind CSS', 'Vite'],
    color: 'cyan',
  },
  {
    category: 'TOOLS',
    skills: ['Git', 'GitHub', 'Docker', 'pnpm', 'VS Code', 'Cursor', 'n8n'],
    color: 'cyan',
  },
  {
    category: 'LANGUAGES',
    skills: ['Spanish (Native)', 'English B2'],
    color: 'cyan',
  },
]

export const learningItems: LearningItem[] = [
  {
    id: 'dotnet',
    title: 'C# & .NET',
    subtitle: 'CLEAN_HEXAGONAL_APIS',
    status: 'completed',
  },
  {
    id: 'efcore',
    title: 'EF Core & PostgreSQL',
    subtitle: 'MIGRATIONS_PERSISTENCE',
    status: 'completed',
  },
  {
    id: 'react-ts',
    title: 'React & TypeScript',
    subtitle: 'SPA_ERP_CLINICAL',
    status: 'completed',
  },
  {
    id: 'fastapi-langgraph',
    title: 'FastAPI & LangGraph',
    subtitle: 'AI_CHATBOT_FLOWS',
    status: 'completed',
  },
  {
    id: 'nodejs',
    title: 'Node.js & Express',
    subtitle: 'REST_APIS',
    status: 'in-progress',
  },
  {
    id: 'devops',
    title: 'Docker & DevOps',
    subtitle: 'DEPLOYMENT_PIPELINES',
    status: 'in-progress',
  },
]
