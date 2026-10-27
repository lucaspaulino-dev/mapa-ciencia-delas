import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import CommunitiesView from '@/views/CommunitiesView.vue'
import { communities } from '@/data/communities'

describe('CommunitiesView', () => {
  it('mostra uma entrada por comunidade, com nome e foco', () => {
    const items = mount(CommunitiesView).findAll('li')
    expect(items).toHaveLength(communities.length)
    expect(items[0]?.find('h2').text()).toBe('PrograMaria')
  })

  it('todo link abre em nova aba com rel seguro e diz de quem é o site', () => {
    const links = mount(CommunitiesView).findAll('a')
    expect(links).toHaveLength(communities.filter((c) => c.url).length)
    for (const link of links) {
      expect(link.attributes('href')).toMatch(/^https:\/\//)
      expect(link.attributes('target')).toBe('_blank')
      expect(link.attributes('rel')).toBe('noopener noreferrer')
      expect(link.text()).toMatch(/Visitar o site\s+de .+ \(abre em nova aba\)/)
    }
  })
})
