import { describe, it, expect } from 'vitest'

import { scientists } from '@/data/scientists'

// Cada teste aqui é uma regra de docs/regras-de-negocio.md (RN-01, RN-02 e RN-04).
// Se uma cientista nova quebrar uma regra, o nome do teste diz qual cientista e qual regra.

describe.each(scientists)('$id', (scientist) => {
  it('RN-01: tem nome, país e contribuição preenchidos', () => {
    expect(scientist.name.trim()).not.toBe('')
    expect(scientist.country.trim()).not.toBe('')
    expect(scientist.contribution.trim()).not.toBe('')
  })

  it('RN-01: tem local de nascimento com cidade e coordenadas válidas', () => {
    const { city, lat, lng } = scientist.birthplace
    expect(city.trim()).not.toBe('')
    expect(lat).toBeGreaterThanOrEqual(-90)
    expect(lat).toBeLessThanOrEqual(90)
    expect(lng).toBeGreaterThanOrEqual(-180)
    expect(lng).toBeLessThanOrEqual(180)
  })

  it('RN-01: a contribuição tem até 280 caracteres', () => {
    expect(scientist.contribution.length).toBeLessThanOrEqual(280)
  })

  it('RN-01 e RN-04: tem ao menos uma fonte, todas com título e URL https', () => {
    expect(scientist.sources.length).toBeGreaterThan(0)
    expect(scientist.sources.every((f) => f.title.trim() !== '')).toBe(true)
    expect(scientist.sources.every((f) => f.url.startsWith('https://'))).toBe(true)
  })

  it('RN-02: se tem imagem, o texto alternativo é descritivo', () => {
    const alt = scientist.image?.alt.trim().toLowerCase() ?? 'sem imagem: regra não se aplica'
    expect(alt.length).toBeGreaterThan(10)
    expect(['foto', 'image', 'image', 'photo']).not.toContain(alt)
  })

  it('o período é coerente', () => {
    const { birth, death } = scientist.period
    expect(death ?? birth + 1).toBeGreaterThan(birth)
  })

  it('o id está em formato de URL', () => {
    expect(scientist.id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
  })
})

describe('lista de cientistas', () => {
  it('não tem ids repetidos', () => {
    const ids = scientists.map((c) => c.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
