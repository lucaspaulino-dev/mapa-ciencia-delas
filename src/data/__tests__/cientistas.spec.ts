import { describe, it, expect } from 'vitest'

import { cientistas } from '@/data/cientistas'

// Cada teste aqui é uma regra de docs/regras-de-negocio.md.
// Se uma cientista nova quebrar uma regra, o nome do teste diz qual cientista e qual regra.

describe.each(cientistas)('$id', (cientista) => {
  it('regra 1: tem nome, país e contribuição preenchidos', () => {
    expect(cientista.nome.trim()).not.toBe('')
    expect(cientista.pais.trim()).not.toBe('')
    expect(cientista.contribuicao.trim()).not.toBe('')
  })

  it('regra 1: tem local de nascimento com cidade e coordenadas válidas', () => {
    const { cidade, lat, lng } = cientista.localNascimento
    expect(cidade.trim()).not.toBe('')
    expect(lat).toBeGreaterThanOrEqual(-90)
    expect(lat).toBeLessThanOrEqual(90)
    expect(lng).toBeGreaterThanOrEqual(-180)
    expect(lng).toBeLessThanOrEqual(180)
  })

  it('regra 1: a contribuição tem até 280 caracteres', () => {
    expect(cientista.contribuicao.length).toBeLessThanOrEqual(280)
  })

  it('regras 1 e 7: tem ao menos uma fonte, todas com título e URL https', () => {
    expect(cientista.fontes.length).toBeGreaterThan(0)
    expect(cientista.fontes.every((f) => f.titulo.trim() !== '')).toBe(true)
    expect(cientista.fontes.every((f) => f.url.startsWith('https://'))).toBe(true)
  })

  it('regra 2: se tem imagem, o texto alternativo é descritivo', () => {
    const alt = cientista.imagem?.alt.trim().toLowerCase() ?? 'sem imagem: regra não se aplica'
    expect(alt.length).toBeGreaterThan(10)
    expect(['foto', 'imagem', 'image', 'photo']).not.toContain(alt)
  })

  it('o período é coerente', () => {
    const { nascimento, falecimento } = cientista.periodo
    expect(falecimento ?? nascimento + 1).toBeGreaterThan(nascimento)
  })

  it('o id está em formato de URL', () => {
    expect(cientista.id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
  })
})

describe('lista de cientistas', () => {
  it('não tem ids repetidos', () => {
    const ids = cientistas.map((c) => c.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
