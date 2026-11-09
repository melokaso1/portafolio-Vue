import { describe, expect, it } from 'vitest'
import { mountApp } from './helpers'
import { aboutParagraphs } from '@/data/about'

describe('Stack', () => {
  it('muestra el stack principal y lo que está aprendiendo', () => {
    const text = mountApp().find('#skills').text()
    for (const item of ['.NET / C#', 'SQL', 'Docker', 'Git']) expect(text).toContain(item)
    expect(text).toContain('Aprendiendo')
    expect(text).toContain('Go')
    expect(text).toContain('Java')
  })
})

describe('Sobre mí', () => {
  it('muestra la experiencia y omite la ubicación (profile.ts y about.ts se contradicen)', () => {
    expect(aboutParagraphs).toHaveLength(3)
    const text = mountApp().find('#about').text()
    expect(text).toContain('1.5 años')
    expect(text).toContain('Nodux')
    expect(text).not.toMatch(/Bogotá|Bucaramanga|Floridablanca/)
  })
})
