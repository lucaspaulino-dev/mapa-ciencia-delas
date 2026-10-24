import { beforeEach, describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'

import HomeView from '@/views/HomeView.vue'
import { cientistas } from '@/data/cientistas'

describe('HomeView', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('mostra todas as cientistas e anuncia a contagem', () => {
    const wrapper = mount(HomeView)
    expect(wrapper.findAll('article')).toHaveLength(cientistas.length)
    expect(wrapper.find('[aria-live="polite"]').text()).toBe(
      `${cientistas.length} cientistas encontradas`,
    )
  })

  it('a busca sem acento reduz os cards e a contagem acompanha', async () => {
    const wrapper = mount(HomeView)
    await wrapper.find('#filtro-busca').setValue('johanna dob')

    expect(wrapper.findAll('article')).toHaveLength(1)
    expect(wrapper.find('article h3').text()).toBe('Johanna Döbereiner')
    expect(wrapper.find('[aria-live="polite"]').text()).toBe('1 cientista encontrada')
  })

  it('sem resultado, avisa em texto', async () => {
    const wrapper = mount(HomeView)
    await wrapper.find('#filtro-busca').setValue('ninguém com esse nome')

    expect(wrapper.findAll('article')).toHaveLength(0)
    expect(wrapper.text()).toContain('Nenhuma cientista encontrada com esses filtros.')
    expect(wrapper.find('[aria-live="polite"]').text()).toBe('0 cientistas encontradas')
  })
})
