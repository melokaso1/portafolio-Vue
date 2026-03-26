import type { Project, SkillGroup, LearningItem, PersonalInfo } from '../types'

export const personalInfo: PersonalInfo = {
  name: 'Jhon Alejandro Escobar Lozada',
  handle: 'melokaso1',
  roles: ['BACKEND_DEVELOPER', 'PYTHON_DEV', 'C#_ENGINEER', 'DATABASE_ARCHITECT'],
  bio: '18-year-old backend developer from Bogotá, based in Floridablanca, Santander. Focused on building robust systems, APIs, databases and scalable server-side logic.',
  email: 'jhonalejoescobar@gmail.com',
  github: 'https://github.com/melokaso1',
  linkedin: 'https://www.linkedin.com/in/alejandro-escobar-9b7590365',
  location: 'Floridablanca, Santander, CO',
}

export const backendProjects: Project[] = [
  {
    id: 'ligabetplay',
    title: 'ligaBetplay_C#',
    description: 'Liga Betplay management system built in C# with OOP architecture',
    tech: ['C#', 'OOP', '.NET'],
    githubUrl: 'https://github.com/melokaso1/ligaBetplay_C-',
    category: 'backend',
  },
  {
    id: 'csharp-exercises',
    title: 'taller-CSharp-32-ejercicios',
    description: '32 C# exercises covering core language concepts and OOP',
    tech: ['C#'],
    githubUrl: 'https://github.com/melokaso1/taller-CSharp-32-ejercicios',
    category: 'backend',
  },
  {
    id: 'inmobiliaria',
    title: 'mysql2-proyecto-inmobiliaria',
    description: 'Real estate database project with advanced MySQL queries',
    tech: ['MySQL', 'SQL', 'Stored Procedures'],
    githubUrl: 'https://github.com/melokaso1/mysql2-proyecto-inmobiliaria',
    category: 'backend',
  },
  {
    id: 'clinica-db',
    title: 'mysql_clinica_database',
    description: 'Clinical database system exam with complex queries and relations',
    tech: ['MySQL', 'SQL'],
    githubUrl: 'https://github.com/melokaso1/mysql_clinica_database',
    category: 'backend',
  },
  {
    id: 'examen-backend',
    title: 'examen_intro_backend',
    description: 'Backend intro exam with server-side logic implementation',
    tech: ['Python', 'Backend'],
    githubUrl: 'https://github.com/melokaso1/examen_intro_backend_Escobar_Alejandro',
    category: 'backend',
  },
  {
    id: 'agendabot',
    title: 'AgendaBot IA',
    description: 'Telegram bot for task and appointment management using n8n + Google Sheets',
    tech: ['Python', 'n8n', 'Telegram API', 'Google Sheets'],
    githubUrl: 'https://github.com/melokaso1/Proyecto_IA_Nivel1_EscobarAlejandro_Medina_Tomas',
    category: 'backend',
  },
  {
    id: 'coworking',
    title: 'Gestor de Coworking',
    description: 'Coworking space reservation and scheduling system',
    tech: ['Python'],
    githubUrl: 'https://github.com/melokaso1/Gestor-de-Reservas-de-Salas-de-Coworking-Python-Edition-',
    category: 'backend',
  },
]

export const frontendProjects: Project[] = [
  {
    id: 'dataset-editor',
    title: 'datasetEditorApp',
    description: 'Dataset editor with dynamic API connection',
    tech: ['JavaScript', 'APIs'],
    githubUrl: 'https://github.com/melokaso1/datasetEditorApp',
    category: 'frontend',
  },
  {
    id: 'abc-lms',
    title: 'ABC-LMS',
    description: 'LMS web platform for learning management',
    tech: ['JavaScript', 'HTML5', 'CSS3'],
    githubUrl: 'https://github.com/melokaso1/ABC-LMS',
    category: 'frontend',
  },
  {
    id: 'liga-betplay-js',
    title: 'ligaBetplay JS',
    description: 'Web about Colombian football league FPC teams',
    tech: ['JavaScript', 'HTML5', 'CSS3'],
    githubUrl: 'https://github.com/melokaso1/ligaBetplay',
    category: 'frontend',
  },
  {
    id: 'luxtime',
    title: 'LuxTime - Luxury Watches',
    description: 'E-commerce luxury watch site',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind'],
    githubUrl: 'https://github.com/melokaso1/proyecto_luxTime',
    liveUrl: 'https://luxtime-luxury.netlify.app/',
    category: 'frontend',
  },
]

export const skillGroups: SkillGroup[] = [
  {
    category: 'BACKEND',
    skills: ['Python', 'C#', 'Node.js'],
    color: 'green',
  },
  {
    category: 'DATABASES',
    skills: ['MySQL', 'JSON Storage'],
    color: 'green',
  },
  {
    category: 'CONCEPTS',
    skills: ['OOP', 'SOLID', 'REST', 'File I/O', 'Data Modeling', 'Git Flow'],
    color: 'green',
  },
  {
    category: 'FRONTEND',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Tailwind CSS'],
    color: 'cyan',
  },
  {
    category: 'TOOLS',
    skills: ['Git', 'GitHub', 'VS Code', 'Cursor', 'Netlify', 'Warp Terminal'],
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
    id: 'nodejs',
    title: 'Node.js & Express',
    subtitle: 'REST_APIS',
    status: 'in-progress',
  },
  {
    id: 'csharp-net',
    title: 'C# & .NET',
    subtitle: 'OOP_SYSTEMS',
    status: 'in-progress',
  },
  {
    id: 'mysql-adv',
    title: 'MySQL Advanced',
    subtitle: 'PROCEDURES_TRIGGERS',
    status: 'in-progress',
  },
  {
    id: 'react-ts',
    title: 'React & TypeScript',
    subtitle: 'FRONTEND_LAYER',
    status: 'in-progress',
  },
  {
    id: 'gitflow',
    title: 'Git Flow & DevOps',
    subtitle: 'DEPLOYMENT',
    status: 'in-progress',
  },
  {
    id: 'tailwind',
    title: 'Tailwind CSS v4',
    subtitle: 'MODERN_STYLING',
    status: 'in-progress',
  },
]
