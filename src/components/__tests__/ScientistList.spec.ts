import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import ScientistList from '@/components/ScientistList.vue'
import { scientists } from '@/data/scientists'

describe('ScientistList', () => {
  it('mostra um item de lista com card por cientista', () => {
    const wrapper = mount(ScientistList, { props: { scientists } })
    expect(wrapper.findAll('ul > li')).toHaveLength(scientists.length)
    expect(wrapper.findAll('article')).toHaveLength(scientists.length)
  })

  it('com a lista vazia, mostra a mensagem de nenhum resultado', () => {
    const wrapper = mount(ScientistList, { props: { scientists: [] } })
    expect(wrapper.find('ul').exists()).toBe(false)
    expect(wrapper.text()).toBe('Nenhuma cientista encontrada com esses filtros.')
  })
})
