import { describe, expect, it } from 'vitest'
import { mountApp } from './helpers'

describe('Servicios', () => {
  it('muestra los 3 servicios freelance acordados', () => {
    const titles = mountApp()
      .find('#services')
      .findAll('h3 .svc-title')
      .map((h) => h.text())
    expect(titles).toEqual(['APIs REST a la medida', 'Backend para agencias', 'Mantenimiento de sistemas .NET'])
  })

  it('no ofrece DIAN ni pasarelas de pago', () => {
    const text = mountApp().find('#services').text()
    expect(text).not.toMatch(/DIAN|pasarela/i)
  })

  it('tiene un llamado a contacto', () => {
    expect(mountApp().find('#services a[href="#contact"]').exists()).toBe(true)
  })

  it('los paneles del acordeón usan el contenedor animado (grid 0fr → 1fr)', () => {
    const panels = mountApp().findAll('#services .svc-panel')
    expect(panels).toHaveLength(3)
    expect(panels.every((p) => p.find('.svc-body').exists())).toBe(true)
  })
})
