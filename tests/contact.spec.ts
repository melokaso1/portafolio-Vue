import { describe, expect, it } from 'vitest'
import { mountApp } from './helpers'

describe('Contacto', () => {
  it('cierra con el llamado acordado', () => {
    const text = mountApp().find('#contact').text()
    expect(text).toContain('¿Tienes un proyecto o una vacante? Hablemos esta semana.')
  })

  it('usa los canales reales (LinkedIn y GitHub) con rel seguro', () => {
    const contact = mountApp().find('#contact')
    const linkedin = contact.findAll('a[href*="linkedin.com"]')
    expect(linkedin.length).toBeGreaterThan(0)
    expect(contact.find('a[href*="github.com/melokaso1"]').exists()).toBe(true)
    for (const a of contact.findAll('a[target="_blank"]')) expect(a.attributes('rel')).toBe('noopener noreferrer')
  })

  it('no publica correo ni teléfono', () => {
    const html = mountApp().find('#contact').html()
    expect(html).not.toMatch(/mailto:|tel:|[\w.+-]+@[\w-]+\.[\w.]+/)
  })
})
