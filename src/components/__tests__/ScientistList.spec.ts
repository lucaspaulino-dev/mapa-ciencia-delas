import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import ScientistList from '@/components/ScientistList.vue'
import { cientistas } from '@/data/cientistas'

describe('ScientistList', () => {
  it('mostra um item de lista com card por cientista', () => {
    const wrapper = mount(ScientistList, { props: { cientistas } })
    expect(wrapper.findAll('ul > li')).toHaveLength(cientistas.length)
    expect(wrapper.findAll('article')).toHaveLength(cientistas.length)
  })

  it('com a lista vazia, mostra a mensagem de nenhum resultado', () => {
    const wrapper = mount(ScientistList, { props: { cientistas: [] } })
    expect(wrapper.find('ul').exists()).toBe(false)
    expect(wrapper.text()).toBe('Nenhuma cientista encontrada com esses filtros.')
  })
})
