import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '@/App.vue'
import { vReveal } from '@/directives/reveal'
import * as projectData from '@/data/projects'
import { leadership, otherWork, projects } from '@/data/projects'

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

const mountApp = (attachTo?: HTMLElement) =>
  mount(App, { attachTo, global: { directives: { reveal: vReveal } } })

describe('datos de proyectos', () => {
  it('mantiene el orden acordado', () => {
    expect(projects.map((p) => p.id)).toEqual([
      'inteligent-inventory',
      'todo-hexagonal',
      'agendabot',
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
      expect(p.problem.length).toBeGreaterThan(0)
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

  it('Nodux no tiene enlaces', () => {
    expect(JSON.stringify(leadership)).not.toMatch(/https?:\/\//)
  })
})

describe('App', () => {
  it('renderiza las secciones principales', () => {
    const wrapper = mountApp()
    for (const id of ['hero', 'about', 'services', 'skills', 'projects', 'learning', 'contact']) {
      expect(wrapper.find(`#${id}`).exists()).toBe(true)
    }
    expect(wrapper.find('h1').text()).toContain('Backend .NET que lidera equipos y automatiza procesos')
    expect(wrapper.find('#hero').text()).toContain('Jhon Alejandro Escobar Lozada')
  })

  it('muestra los llamados a la acción del hero', () => {
    const hero = mountApp().find('#hero')
    expect(hero.find('a[href="#services"]').text()).toContain('Trabaja conmigo')
    expect(hero.find('a[href*="linkedin.com"]').text()).toContain('LinkedIn')
  })

  it('no publica correo ni teléfono en texto plano', () => {
    const html = mountApp().html()
    expect(html).not.toMatch(/[\w.+-]+@[\w-]+\.[\w.]+/)
    expect(html).not.toMatch(/mailto:|tel:/)
  })

  it('no renderiza notas internas ni proyectos ocultos', () => {
    const html = mountApp().html()
    expect(html).not.toContain('PENDIENTE')
    expect(html).not.toContain('HealtLab')
  })

  it('todos los enlaces externos usan rel="noopener noreferrer"', () => {
    const anchors = mountApp().findAll('a[target="_blank"]')
    expect(anchors.length).toBeGreaterThan(0)
    for (const a of anchors) expect(a.attributes('rel')).toBe('noopener noreferrer')
  })

  it('el sitio está en español y sin rastros de HealtLab', () => {
    const html = mountApp().html()
    for (const en of ['Skip to content', 'Open menu', 'What I did', 'opens in a new tab', 'Learning', 'Skills']) {
      expect(html).not.toContain(en)
    }
    expect(html).toContain('Saltar al contenido')
    expect(html).toContain('Qué hice')
    expect(html).not.toMatch(/SignalR|clinical/i)
  })

  it('menú móvil: aria-controls apunta a un elemento existente y el foco vuelve al botón', async () => {
    const host = document.createElement('div')
    document.body.appendChild(host)
    const wrapper = mountApp(host)
    const button = wrapper.find('button[aria-controls]')
    const controlled = button.attributes('aria-controls')
    expect(wrapper.find(`#${controlled}`).exists()).toBe(true)

    await button.trigger('click')
    expect(button.attributes('aria-expanded')).toBe('true')
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await new Promise((r) => setTimeout(r, 0))
    expect(button.attributes('aria-expanded')).toBe('false')
    expect(document.activeElement).toBe(button.element)
    wrapper.unmount()
    host.remove()
  })
})
