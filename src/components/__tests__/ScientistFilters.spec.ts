import { beforeEach, describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'

import ScientistFilters from '@/components/ScientistFilters.vue'
import { useScientistsStore } from '@/stores/scientists'

describe('ScientistFilters', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('digitar na busca atualiza a store', async () => {
    const wrapper = mount(ScientistFilters)
    await wrapper.find('#filter-search').setValue('grace')
    expect(useScientistsStore().filters.search).toBe('grace')
  })

  it('os selects mostram só valores existentes, com rótulo legível, e filtram', async () => {
    const wrapper = mount(ScientistFilters)
    const areaOptions = wrapper.findAll('#filter-area option').map((o) => o.text())
    expect(areaOptions).toEqual(['Todas as áreas', 'Biologia', 'Computação', 'Matemática'])

    await wrapper.find('#filter-area').setValue('biology')
    await wrapper.find('#filter-country').setValue('Brasil')
    const store = useScientistsStore()
    expect(store.filters.area).toBe('biology')
    expect(store.filters.country).toBe('Brasil')
  })

  it('cada campo tem rótulo associado pelo for/id', () => {
    const wrapper = mount(ScientistFilters)
    const labels = wrapper.findAll('label')
    expect(labels.map((l) => l.text())).toEqual(['Buscar por nome', 'Área', 'País'])

    for (const label of labels) {
      const target = label.attributes('for')
      expect(target).toBeTruthy()
      expect(wrapper.find(`#${target}`).exists()).toBe(true)
    }
  })

  it('o botão "Limpar filtros" aparece só com filtro ativo e limpa tudo', async () => {
    const wrapper = mount(ScientistFilters)
    expect(wrapper.find('button').exists()).toBe(false)

    await wrapper.find('#filter-search').setValue('ada')
    const button = wrapper.find('button')
    expect(button.text()).toBe('Limpar filtros')

    await button.trigger('click')
    expect(useScientistsStore().hasActiveFilter).toBe(false)
    expect(wrapper.find('button').exists()).toBe(false)
  })
})
