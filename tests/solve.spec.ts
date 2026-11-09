import { describe, expect, it } from 'vitest'
import { mountApp } from './helpers'
import { projects } from '@/data/projects'
import { solveItems } from '@/data/solve'

describe('Lo que resuelvo', () => {
  it('muestra los 3 bloques acordados', () => {
    const titles = mountApp()
      .find('#resuelvo')
      .findAll('h3')
      .map((h) => h.text())
    expect(titles).toEqual(['APIs que escalan', 'Integraciones entre sistemas', 'Automatizaciones'])
  })

  it('solo cita proyectos que existen en el portafolio', () => {
    const known = projects.map((p) => p.title.toLowerCase())
    for (const proof of solveItems.flatMap((s) => s.proof)) {
      expect(known.some((t) => t.startsWith(proof.toLowerCase()))).toBe(true)
    }
  })

  it('no usa cifras ni porcentajes inventados', () => {
    const text = mountApp().find('#resuelvo').text()
    expect(text).not.toMatch(/\d+\s*%|\d+x\b/)
  })
})

describe('Servicios', () => {
  it('solo cita proyectos que existen en el portafolio', async () => {
    const { services } = await import('@/data/services')
    const known = projects.map((p) => p.title.toLowerCase())
    for (const ex of services.flatMap((s) => s.examples)) {
      expect(known.some((t) => t.startsWith(ex.toLowerCase())), ex).toBe(true)
    }
  })
})
