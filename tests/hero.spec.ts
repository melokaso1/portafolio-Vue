import { describe, expect, it } from 'vitest'
import { mountApp } from './helpers'

describe('Hero', () => {
  it('muestra el nombre y el mensaje principal', () => {
    const hero = mountApp().find('#hero')
    expect(hero.find('h1').text()).toContain('Backend .NET que lidera equipos y automatiza procesos')
    expect(hero.text()).toContain('Jhon Alejandro Escobar Lozada')
  })

  it('muestra los llamados a la acción del hero', () => {
    const hero = mountApp().find('#hero')
    expect(hero.find('a[href="#services"]').text()).toContain('Trabaja conmigo')
    expect(hero.find('a[href*="linkedin.com"]').text()).toContain('LinkedIn')
  })
})
