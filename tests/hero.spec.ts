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

  it('el botón secundario lleva al LinkedIn real en una pestaña nueva', () => {
    const link = mountApp().find('#hero a.btn[href="https://www.linkedin.com/in/alejandro-escobar-9b7590365"]')
    expect(link.exists()).toBe(true)
    expect(link.text()).toContain('Ver perfil en LinkedIn')
    expect(link.attributes('target')).toBe('_blank')
    expect(link.attributes('rel')).toBe('noopener noreferrer')
  })

  it('ya no ofrece descargar un CV', () => {
    const hero = mountApp().find('#hero')
    expect(hero.text()).not.toContain('Descargar CV')
    expect(hero.find('a[download]').exists()).toBe(false)
  })

  it('enlaza LinkedIn y GitHub reales', () => {
    const hero = mountApp().find('#hero')
    expect(hero.find('a[href*="linkedin.com"]').exists()).toBe(true)
    expect(hero.find('a[href*="github.com/melokaso1"]').exists()).toBe(true)
  })
})
