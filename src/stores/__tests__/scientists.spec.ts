import { beforeEach, describe, it, expect } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

import { useScientistsStore } from '@/stores/scientists'

const names = (store: ReturnType<typeof useScientistsStore>) =>
  store.filteredScientists.map((c) => c.name)

describe('useScientistsStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('sem filtros, mostra todas as cientistas', () => {
    const store = useScientistsStore()
    expect(store.filteredScientists).toHaveLength(store.scientists.length)
    expect(store.hasActiveFilter).toBe(false)
  })

  it('busca por nome sem diferenciar maiúsculas, minúsculas nem acentos', () => {
    const store = useScientistsStore()
    store.setSearch('johanna dob')
    expect(names(store)).toEqual(['Johanna Döbereiner'])

    store.setSearch('  ADA ')
    expect(names(store)).toEqual(['Ada Lovelace'])
  })

  it('filtra por área', () => {
    const store = useScientistsStore()
    store.setArea('biology')
    expect(names(store)).toEqual(['Bertha Lutz', 'Johanna Döbereiner'])
  })

  it('filtra por país', () => {
    const store = useScientistsStore()
    store.setCountry('Estados Unidos')
    expect(names(store)).toEqual(['Grace Hopper'])
  })

  it('combina busca, área e país', () => {
    const store = useScientistsStore()
    store.setArea('biology')
    store.setCountry('Brasil')
    store.setSearch('bertha')
    expect(names(store)).toEqual(['Bertha Lutz'])

    store.setSearch('ada')
    expect(store.filteredScientists).toEqual([])
  })

  it('limpa todos os filtros', () => {
    const store = useScientistsStore()
    store.setSearch('ada')
    store.setArea('mathematics')
    store.setCountry('Reino Unido')
    expect(store.hasActiveFilter).toBe(true)

    store.clearFilters()
    expect(store.hasActiveFilter).toBe(false)
    expect(store.filteredScientists).toHaveLength(store.scientists.length)
  })

  it('lista países e áreas disponíveis, sem repetição e em ordem alfabética', () => {
    const store = useScientistsStore()
    expect(store.countries).toEqual(['Brasil', 'Estados Unidos', 'Reino Unido'])
    expect(store.areas).toEqual(['biology', 'computing', 'mathematics'])
  })

  it('busca uma cientista por id', () => {
    const store = useScientistsStore()
    expect(store.findById('grace-hopper')?.name).toBe('Grace Hopper')
    expect(store.findById('nao-existe')).toBeUndefined()
  })
})
