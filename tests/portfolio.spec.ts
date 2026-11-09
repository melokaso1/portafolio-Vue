import { describe, expect, it } from 'vitest'
import { mountApp } from './helpers'

describe('App', () => {
  it('renderiza las secciones en el orden de venta', () => {
    const wrapper = mountApp()
    const ids = wrapper.findAll('main > section').map((s) => s.attributes('id'))
    const expected = ['hero', 'resuelvo', 'projects', 'services', 'skills', 'about', 'contact']
    expect(ids.filter((id) => expected.includes(id ?? ''))).toEqual(expected)
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
