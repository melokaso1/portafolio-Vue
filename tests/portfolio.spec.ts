import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '@/App.vue'
import { vReveal } from '@/directives/reveal'
import { leadership, otherWork, projects, publishedProjects } from '@/data/projects'

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

const mountApp = () => mount(App, { global: { directives: { reveal: vReveal } } })

describe('datos de proyectos', () => {
  it('mantiene el orden acordado', () => {
    expect(projects.map((p) => p.id)).toEqual([
      'inteligent-inventory',
      'healtlab',
      'todo-hexagonal',
      'agendabot',
      'liga-betplay',
      'abc-lms',
      'dataset-editor',
    ])
  })

  it('oculta HealtLab hasta que se confirme', () => {
    expect(publishedProjects().some((p) => p.id === 'healtlab')).toBe(false)
  })

  it('no incluye sonet-automatizacion-demo', () => {
    expect(projects.some((p) => p.id.includes('sonet'))).toBe(false)
  })

  it('usa solo enlaces https y ningún repo bloqueado', () => {
    const links = [...projects, ...otherWork].flatMap((p) => p.links)
    for (const link of links) {
      expect(link.url.startsWith('https://')).toBe(true)
      for (const blocked of BLOCKED_REPOS) expect(link.url).not.toContain(blocked)
    }
  })

  it('Nodux no tiene enlaces', () => {
    expect(JSON.stringify(leadership)).not.toMatch(/https?:\/\//)
  })
})

describe('App', () => {
  it('renderiza las secciones principales', () => {
    const wrapper = mountApp()
    for (const id of ['hero', 'about', 'skills', 'projects', 'learning', 'contact']) {
      expect(wrapper.find(`#${id}`).exists()).toBe(true)
    }
    expect(wrapper.find('h1').text()).toContain('Jhon Alejandro Escobar Lozada')
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
})
