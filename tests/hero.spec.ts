import { describe, expect, it } from 'vitest'
import { mountApp } from './helpers'

describe('Hero', () => {
  it('muestra el nombre y el mensaje principal', () => {
    const hero = mountApp().find('#hero')
    expect(hero.find('#hero-title').text()).toContain(
      'Desarrollador backend .NET que construye APIs sólidas para tu negocio',
    )
    expect(hero.text()).toContain('C# y ASP.NET Core, integraciones y bases de datos.')
    expect(hero.text()).toContain('Jhon Alejandro Escobar Lozada')
  })

  it('el llamado principal lleva a contacto', () => {
    const hero = mountApp().find('#hero')
    expect(hero.find('a[href="#contact"]').text()).toContain('Cuéntame tu proyecto')
  })

  it('muestra "Descargar CV" (pendiente mientras no haya PDF)', () => {
    const hero = mountApp().find('#hero')
    expect(hero.text()).toContain('Descargar CV')
  })

  it('enlaza LinkedIn y GitHub reales', () => {
    const hero = mountApp().find('#hero')
    expect(hero.find('a[href*="linkedin.com"]').exists()).toBe(true)
    expect(hero.find('a[href*="github.com/melokaso1"]').exists()).toBe(true)
  })
})
