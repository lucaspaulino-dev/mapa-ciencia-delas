import { beforeEach, describe, it, expect } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

import { useCientistasStore } from '@/stores/cientistas'

const nomes = (store: ReturnType<typeof useCientistasStore>) =>
  store.cientistasFiltradas.map((c) => c.nome)

describe('useCientistasStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('sem filtros, mostra todas as cientistas', () => {
    const store = useCientistasStore()
    expect(store.cientistasFiltradas).toHaveLength(store.cientistas.length)
    expect(store.temFiltroAtivo).toBe(false)
  })

  it('busca por nome sem diferenciar maiúsculas, minúsculas nem acentos', () => {
    const store = useCientistasStore()
    store.definirBusca('johanna dob')
    expect(nomes(store)).toEqual(['Johanna Döbereiner'])

    store.definirBusca('  ADA ')
    expect(nomes(store)).toEqual(['Ada Lovelace'])
  })

  it('filtra por área', () => {
    const store = useCientistasStore()
    store.definirArea('biologia')
    expect(nomes(store)).toEqual(['Bertha Lutz', 'Johanna Döbereiner'])
  })

  it('filtra por país', () => {
    const store = useCientistasStore()
    store.definirPais('Estados Unidos')
    expect(nomes(store)).toEqual(['Grace Hopper'])
  })

  it('combina busca, área e país', () => {
    const store = useCientistasStore()
    store.definirArea('biologia')
    store.definirPais('Brasil')
    store.definirBusca('bertha')
    expect(nomes(store)).toEqual(['Bertha Lutz'])

    store.definirBusca('ada')
    expect(store.cientistasFiltradas).toEqual([])
  })

  it('limpa todos os filtros', () => {
    const store = useCientistasStore()
    store.definirBusca('ada')
    store.definirArea('matematica')
    store.definirPais('Reino Unido')
    expect(store.temFiltroAtivo).toBe(true)

    store.limparFiltros()
    expect(store.temFiltroAtivo).toBe(false)
    expect(store.cientistasFiltradas).toHaveLength(store.cientistas.length)
  })

  it('lista países e áreas disponíveis, sem repetição e em ordem alfabética', () => {
    const store = useCientistasStore()
    expect(store.paises).toEqual(['Brasil', 'Estados Unidos', 'Reino Unido'])
    expect(store.areas).toEqual(['biologia', 'computacao', 'matematica'])
  })

  it('busca uma cientista por id', () => {
    const store = useCientistasStore()
    expect(store.buscarPorId('grace-hopper')?.nome).toBe('Grace Hopper')
    expect(store.buscarPorId('nao-existe')).toBeUndefined()
  })
})
