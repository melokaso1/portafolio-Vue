import { describe, expect, it } from 'vitest'
import { mountApp } from './helpers'
import * as projectData from '@/data/projects'
import { otherWork, projects } from '@/data/projects'

const BLOCKED_REPOS = [
  'InteligentInventoryBackend',
  'InteligentInventoryFrontend',
  'InteligentInventoryLLMChatBot',
  'HEALTLAB_FRONTEND',
  'HEALTLABS_BACKEND',
  'sonet-automatizacion-demo',
  'proyecto_luxTime',
  'Nodux',
]

const BROKEN_DEMOS = ['nexusodonto.chatcampuslands.com', 'luxtime-luxury.netlify.app']

describe('datos de proyectos', () => {
  it('mantiene el orden acordado', () => {
    expect(projects.map((p) => p.id)).toEqual([
      'nodux',
      'inteligent-inventory',
      'agendabot',
      'todo-hexagonal',
      'liga-betplay',
      'abc-lms',
      'dataset-editor',
    ])
  })

  it('no incluye notas internas ni proyectos ocultos en el archivo público', () => {
    const data = JSON.stringify(projectData)
    expect(data).not.toMatch(/notaInterna|publicar|PENDIENTE/)
    expect(data).not.toMatch(/healtlab/i)
  })

  it('no incluye sonet-automatizacion-demo', () => {
    expect(projects.some((p) => p.id.includes('sonet'))).toBe(false)
  })

  it('cada proyecto es un caso de estudio y no inventa resultados vacíos', () => {
    for (const p of projects) {
      // `problem` es opcional: si no está confirmado se omite (no se muestra un TODO).
      if (p.problem !== undefined) expect(p.problem.trim().length).toBeGreaterThan(0)
      expect(p.summary.length).toBeGreaterThan(0)
      expect(p.tech.length).toBeGreaterThan(0)
      if (p.result !== undefined) expect(p.result.trim().length).toBeGreaterThan(0)
    }
  })

  it('usa solo enlaces https, sin repos bloqueados ni demos rotas', () => {
    const links = [...projects, ...otherWork].flatMap((p) => p.links)
    for (const link of links) {
      expect(link.url.startsWith('https://')).toBe(true)
      for (const blocked of [...BLOCKED_REPOS, ...BROKEN_DEMOS]) expect(link.url).not.toContain(blocked)
    }
  })

  it('Nodux va primero y no tiene enlaces (proyecto privado)', () => {
    const nodux = projects[0]
    expect(nodux?.id).toBe('nodux')
    expect(nodux?.links).toEqual([])
  })

  it('hay entre 2 y 3 casos destacados', () => {
    const featured = projects.filter((p) => p.featured)
    expect(featured.length).toBeGreaterThanOrEqual(2)
    expect(featured.length).toBeLessThanOrEqual(3)
  })
})

describe('sección de proyectos', () => {
  it('muestra todos los proyectos en el orden acordado', () => {
    const text = mountApp().find('#projects').text()
    let last = -1
    for (const p of projects) {
      const title = p.title.replace(/\s*\(.*\)\s*$/, '')
      const at = text.indexOf(title)
      expect(at, title).toBeGreaterThan(last)
      last = at
    }
  })

  it('no muestra marcadores pendientes', () => {
    const text = mountApp().find('#projects').text()
    expect(text).not.toMatch(/TODO|PENDIENTE|Pendiente/)
  })

  it('enlaza a GitHub para ver más', () => {
    expect(mountApp().find('#projects a[href="https://github.com/melokaso1"]').exists()).toBe(true)
  })
})

describe('carrusel de proyectos', () => {
  it('se usa también en táctil: sin fila con scroll-snap, con swipe y pan-y', () => {
    const section = mountApp().find('#projects')
    const region = section.find('[aria-roledescription="carrusel"]')
    expect(region.exists()).toBe(true)
    expect(region.classes()).toContain('touch-pan-y')
    expect(section.find('.snap-x').exists()).toBe(false)
    expect(section.findAll('[aria-roledescription="diapositiva"]')).toHaveLength(projects.length)
  })

  it('tiene botones anterior/siguiente y puntos accesibles', async () => {
    const section = mountApp().find('#projects')
    expect(section.find('button[aria-label="Proyecto anterior"]').exists()).toBe(true)
    expect(section.find('button[aria-label="Proyecto siguiente"]').exists()).toBe(true)
    const dots = section.findAll('[aria-label="Elegir proyecto"] button')
    expect(dots).toHaveLength(projects.length)
    expect(dots[0]!.attributes('aria-current')).toBe('true')
  })
})
