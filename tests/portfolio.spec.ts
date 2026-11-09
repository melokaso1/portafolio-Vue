import { describe, expect, it } from 'vitest'
import { mountApp } from './helpers'

describe('App', () => {
  it('renderiza las secciones en el orden de venta', () => {
    const wrapper = mountApp()
    const ids = wrapper.findAll('main > section').map((s) => s.attributes('id'))
    const expected = ['hero', 'resuelvo', 'projects', 'services', 'skills', 'contact']
    expect(ids.filter((id) => expected.includes(id ?? ''))).toEqual(expected)
  })

  it('"Sobre mí" vive dentro de la sección de stack (rediseño v2)', () => {
    expect(mountApp().find('#skills #about').exists()).toBe(true)
  })

  it('no muestra TODO ni marcadores pendientes en pantalla', () => {
    const text = mountApp().text()
    expect(text).not.toMatch(/\bTODO\b|PENDIENTE|Pendiente|[Pp]laceholder/)
  })

  it('no muestra ubicación mientras las fuentes se contradigan', () => {
    const text = mountApp().text()
    expect(text).not.toMatch(/Floridablanca|Bucaramanga|Bogotá|Santander/)
  })

  it('cada enlace del menú apunta a una sección que existe', () => {
    const wrapper = mountApp()
    for (const id of ['resuelvo', 'projects', 'services', 'skills', 'about', 'contact']) {
      expect(wrapper.find(`#${id}`).exists(), id).toBe(true)
    }
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

describe('Fondo de cubos', () => {
  it('hay una sola capa de fondo, decorativa y sin ilustración del PC', () => {
    const wrapper = mountApp()
    const bg = wrapper.findAll('#bg-cubes')
    expect(bg).toHaveLength(1)
    expect(bg[0]!.attributes('aria-hidden')).toBe('true')
    expect(wrapper.find('[data-part]').exists()).toBe(false)
    expect(wrapper.html()).not.toContain('placa base')
  })
})

describe('Tarjetas de proyecto', () => {
  it('son limpias: sin arte de foil ni canvas WebGL', () => {
    const projects = mountApp().find('#projects')
    expect(projects.findAll('.project-card').length).toBeGreaterThan(0)
    expect(projects.find('canvas').exists()).toBe(false)
    expect(projects.find('img[src^="data:image/svg"]').exists()).toBe(false)
  })
})

describe('Contacto: CTA con Magnet', () => {
  it('el enlace de GitHub queda separado y por encima del botón con Magnet', () => {
    const contact = mountApp().find('#contact')
    expect(contact.find('[data-magnet] .btn-primary').exists()).toBe(true)
    const github = contact.find('a.link[href*="github.com"]')
    expect(github.classes()).toEqual(expect.arrayContaining(['relative', 'z-10', 'sm:ml-7']))
  })
})

describe('Menú: Stack · Sobre mí', () => {
  it('un solo ítem para la sección 04 y apunta a #skills', async () => {
    const { navLinks, navGroups } = await import('@/data/nav')
    expect(navLinks.filter((l) => l.id === 'skills')).toHaveLength(1)
    expect(navLinks.find((l) => l.id === 'skills')?.label).toBe('Stack · Sobre mí')
    expect(navLinks.some((l) => l.id === 'about')).toBe(false)
    expect(navGroups.find((g) => g.label === 'Perfil')?.ids).toEqual(['skills', 'contact'])
    const header = mountApp().find('header')
    const labels = header.findAll('button, a').map((b) => b.text().trim())
    expect(labels.filter((t) => t === 'Sobre mí')).toHaveLength(0)
    expect(labels.filter((t) => t.includes('Stack · Sobre mí')).length).toBeGreaterThan(0)
  })
})
