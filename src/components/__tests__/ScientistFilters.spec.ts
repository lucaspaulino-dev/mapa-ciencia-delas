import { beforeEach, describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'

import ScientistFilters from '@/components/ScientistFilters.vue'
import { useCientistasStore } from '@/stores/cientistas'

describe('ScientistFilters', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('digitar na busca atualiza a store', async () => {
    const wrapper = mount(ScientistFilters)
    await wrapper.find('#filtro-busca').setValue('grace')
    expect(useCientistasStore().filtros.busca).toBe('grace')
  })

  it('os selects mostram só valores existentes, com rótulo legível, e filtram', async () => {
    const wrapper = mount(ScientistFilters)
    const opcoesArea = wrapper.findAll('#filtro-area option').map((o) => o.text())
    expect(opcoesArea).toEqual(['Todas as áreas', 'Biologia', 'Computação', 'Matemática'])

    await wrapper.find('#filtro-area').setValue('biologia')
    await wrapper.find('#filtro-pais').setValue('Brasil')
    const store = useCientistasStore()
    expect(store.filtros.area).toBe('biologia')
    expect(store.filtros.pais).toBe('Brasil')
  })

  it('cada campo tem rótulo', () => {
    const wrapper = mount(ScientistFilters)
    const rotulos = wrapper.findAll('label').map((l) => l.text())
    expect(rotulos).toEqual(['Buscar por nome', 'Área', 'País'])
  })

  it('o botão "Limpar filtros" aparece só com filtro ativo e limpa tudo', async () => {
    const wrapper = mount(ScientistFilters)
    expect(wrapper.find('button').exists()).toBe(false)

    await wrapper.find('#filtro-busca').setValue('ada')
    const botao = wrapper.find('button')
    expect(botao.text()).toBe('Limpar filtros')

    await botao.trigger('click')
    expect(useCientistasStore().temFiltroAtivo).toBe(false)
    expect(wrapper.find('button').exists()).toBe(false)
  })
})
