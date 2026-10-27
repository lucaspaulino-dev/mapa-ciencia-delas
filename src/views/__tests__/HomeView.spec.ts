import { beforeEach, describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'

import HomeView from '@/views/HomeView.vue'
import { scientists } from '@/data/scientists'

describe('HomeView', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('mostra um marcador por cientista no mapa e anuncia a contagem', () => {
    const wrapper = mount(HomeView)
    expect(wrapper.findAll('.scientist-map__button')).toHaveLength(scientists.length)
    expect(wrapper.find('[aria-live="polite"]').text()).toBe(
      `${scientists.length} cientistas encontradas`,
    )
  })

  it('não mostra mais a lista de cards: o card fica no popup', () => {
    expect(mount(HomeView).findAll('article')).toHaveLength(0)
  })

  it('a busca sem acento reduz os marcadores e a contagem acompanha', async () => {
    const wrapper = mount(HomeView)
    await wrapper.find('#filter-search').setValue('johanna dob')

    const markers = wrapper.findAll('.scientist-map__button')
    expect(markers).toHaveLength(1)
    expect(markers[0]?.text()).toContain('Johanna Döbereiner')
    expect(wrapper.find('[aria-live="polite"]').text()).toBe('1 cientista encontrada')
  })

  it('sem resultado, avisa em texto', async () => {
    const wrapper = mount(HomeView)
    await wrapper.find('#filter-search').setValue('ninguém com esse nome')

    expect(wrapper.findAll('.scientist-map__button')).toHaveLength(0)
    expect(wrapper.text()).toContain('Nenhuma cientista encontrada com esses filtros.')
    expect(wrapper.find('[aria-live="polite"]').text()).toBe('0 cientistas encontradas')
  })
})
