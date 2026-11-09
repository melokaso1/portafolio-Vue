import type { OtherWork, Project } from '@/types'

/**
 * Proyectos del portafolio en formato caso de estudio. Único archivo a editar para cambiar textos.
 *
 * Reglas:
 * - Este archivo es público y termina en el bundle: solo va lo que se publica.
 *   Nada de notas internas ni proyectos ocultos.
 * - Solo datos confirmados en el README o en el código de cada repo. Nada inventado.
 * - Solo enlaces a repos públicos y revisados. Sin credenciales ni valores de .env.
 * - `problem` y `result` se dejan sin definir hasta que Alejandro los confirme:
 *   el bloque se omite en pantalla (no se muestran TODO).
 * - El orden del arreglo es el orden en pantalla. Los `featured` van primero (Nodux primero).
 */
export const projects: Project[] = [
  {
    id: 'nodux',
    title: 'Nodux',
    context: 'Producto privado · Líder de equipo',
    featured: true,
    // Pendiente (Alejandro): el problema de negocio que resuelve Nodux, sin datos internos.
    // Mientras no esté confirmado se omite el campo y el bloque no se muestra.
    summary:
      'Lidero el equipo de desarrollo de un producto privado: planifico tareas, reviso pull requests y coordino el trabajo de frontend, backend, QA y DevOps.',
    highlights: [],
    // Pendiente: confirmar el stack público de Nodux (el equipo trabaja el backend en .NET / C#).
    tech: ['C#', '.NET'],
    // Sin enlaces: el proyecto es privado.
    links: [],
  },
  {
    id: 'nexus-odonto-api',
    featured: true,
    title: 'NexusOdonto API',
    context: 'Proyecto de equipo',
    problem: 'Administrar una clínica odontológica completa: pacientes, agenda, historia clínica y odontograma.',
    summary:
      'API REST del sistema odontológico NexusOdonto en .NET 10 con Clean Architecture: pacientes e historia clínica, agenda con disponibilidad por profesional, odontograma, chatbot con escalamiento a tickets, notificaciones internas y por WhatsApp, y auditoría.',
    highlights: [
      'Clean Architecture en cuatro proyectos (Domain / Application / Infrastructure / Api): el acceso a datos pasa por repositorios y UnitOfWork.',
      'JWT con refresh tokens y permisos granulares por módulo y acción.',
      'Odontograma con notación FDI (52 piezas), estados por diente y hallazgos por superficie.',
      'Se levanta con Docker Compose junto a Oracle: aplica migraciones y carga los catálogos.',
    ],
    tech: ['C#', '.NET 10', 'EF Core 10', 'Oracle', 'JWT', 'Docker'],
    links: [{ label: 'Repositorio', url: 'https://github.com/NexusOdonto/NexusOdontoBackend_Api' }],
  },
  {
    id: 'nexus-odonto-chatbot',
    featured: true,
    title: 'NexusOdonto ChatBot AI',
    context: 'Proyecto de equipo',
    problem: 'Atender pacientes por WhatsApp a cualquier hora y conectarlos con la agenda real de la clínica.',
    summary:
      'Agente conversacional para WhatsApp que consulta servicios y tarifas, y agenda, reprograma o cancela citas en tiempo real contra la API .NET de NexusOdonto. Entiende texto y notas de voz.',
    highlights: [
      'Grafo de LangGraph con herramientas atómicas de agenda y catálogo, y memoria de conversación en PostgreSQL.',
      'RAG de conocimiento clínico con Qdrant y re-ranking.',
      'Triage de emergencias odontológicas, transcripción de notas de voz con Whisper y recordatorios de citas.',
    ],
    tech: ['Python', 'FastAPI', 'LangGraph', 'Qdrant', 'PostgreSQL', 'WhatsApp (Evolution API)', 'Docker'],
    links: [{ label: 'Repositorio', url: 'https://github.com/NexusOdonto/NexusOdonto_ChatBot_AI' }],
  },
  {
    id: 'healtlab',
    title: 'HealtLab',
    context: 'Proyecto de equipo',
    problem: 'Gestionar citas médicas, pacientes, personal y expedientes con permisos por rol.',
    summary:
      'Sistema de gestión de citas médicas: una API en .NET 10 con Clean Architecture y una SPA en React 19 con portales para administración, recepción y profesionales.',
    highlights: [
      'Notificaciones en tiempo real con SignalR, de la API al frontend.',
      'Autenticación JWT con permisos por rol (Administrador, Recepcionista, Profesional) y documentación en Swagger.',
      'EF Core Code-First sobre PostgreSQL (Supabase): migraciones y seed automáticos al arrancar.',
    ],
    tech: ['C#', '.NET 10', 'EF Core', 'PostgreSQL', 'SignalR', 'JWT', 'React 19', 'TypeScript'],
    links: [
      { label: 'Repo API', url: 'https://github.com/melokaso1/HEALTLABS_BACKEND' },
      { label: 'Repo web', url: 'https://github.com/melokaso1/HEALTLAB_FRONTEND' },
    ],
  },
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
      'Motor de reglas con máquina de estados en LangGraph (OpenAI opcional) y pruebas en pytest.',
    ],
    tech: ['C#', '.NET 10', 'EF Core', 'PostgreSQL', 'JWT', 'Python', 'FastAPI', 'LangGraph', 'pytest', 'React 19', 'TypeScript', 'Tailwind CSS'],
    links: [
      { label: 'Repo API', url: 'https://github.com/melokaso1/InteligentInventoryBackend' },
      { label: 'Repo chatbot', url: 'https://github.com/melokaso1/InteligentInventoryLLMChatBot' },
      { label: 'Repo web', url: 'https://github.com/melokaso1/InteligentInventoryFrontend' },
    ],
  },
  {
    id: 'gestion-mecanica',
    title: 'Gestión de taller mecánico',
    problem: 'Llevar clientes, vehículos, órdenes de servicio, repuestos y facturación de un taller automotriz.',
    summary:
      'Sistema de gestión para taller automotriz: API en ASP.NET Core, frontend en Blazor WebAssembly y un host de escritorio WPF (WebView2) que se distribuye como .exe y levanta la API en segundo plano.',
    highlights: [
      'Roles Admin, Mecánico, Recepcionista y Cliente con JWT, CORS, Swagger y rate limiting.',
      'Aplicación de escritorio "todo en uno": la UI y la API arrancan con un doble clic.',
    ],
    tech: ['C#', '.NET 10', 'ASP.NET Core', 'EF Core', 'PostgreSQL', 'Blazor WebAssembly', 'WPF'],
    links: [{ label: 'Repositorio', url: 'https://github.com/melokaso1/Proyecto-EFCORE-gestion-mecanica' }],
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

/** Otros trabajos conservados del portafolio anterior, en formato compacto. */
export const otherWork: OtherWork[] = [



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
