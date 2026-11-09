import type { Service } from '@/types'

/**
 * Servicios freelance. Cada uno se apoya en proyectos publicados del portafolio.
 * No incluir facturación DIAN ni pasarelas de pago hasta que Alejandro lo confirme.
 */
export const services: Service[] = [
  {
    id: 'apis-rest',
    title: 'APIs REST a la medida',
    description:
      'Diseño y construyo la API que tu producto necesita en C# y ASP.NET Core: modelo de datos, endpoints, autenticación JWT con roles y documentación para que tu frontend o tus clientes la consuman.',
    examples: ['Inventario inteligente', 'ToDo hexagonal'],
  },
  {
    id: 'backend-agencias',
    title: 'Backend para agencias',
    description:
      'Si tu agencia hace el diseño y el frontend, yo me encargo del backend: APIs, bases de datos e integraciones, trabajando en tu repositorio con pull requests y documentación.',
    examples: ['Inventario inteligente', 'AgendaBot'],
  },
  {
    id: 'mantenimiento-dotnet',
    title: 'Mantenimiento de sistemas .NET',
    description:
      'Corrijo errores, agrego funcionalidades y ordeno sistemas existentes en .NET: migraciones con EF Core, PostgreSQL u Oracle y entornos fáciles de levantar con Docker.',
    examples: ['Gestión de taller mecánico', 'Nexus Odonto'],
  },
]
