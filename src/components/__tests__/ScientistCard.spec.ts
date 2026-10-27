import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import type { Scientist } from '@/types/scientist.type'
import ScientistCard from '@/components/ScientistCard.vue'

const ada: Scientist = {
  id: 'ada-lovelace',
  name: 'Ada Lovelace',
  area: 'mathematics',
  country: 'Reino Unido',
  period: { birth: 1815, death: 1852 },
  birthplace: { city: 'Londres, Inglaterra', lat: 51.51, lng: -0.14 },
  contribution: 'Primeiro algoritmo publicado destinado a uma máquina.',
  sources: [{ title: 'Britannica', url: 'https://www.britannica.com/biography/Ada-Lovelace' }],
}

describe('ScientistCard', () => {
  it('mostra o nome como título', () => {
    const wrapper = mount(ScientistCard, { props: { scientist: ada } })
    expect(wrapper.find('article h3').text()).toBe('Ada Lovelace')
  })

  it('mostra a área com rótulo legível, o país e o período', () => {
    const wrapper = mount(ScientistCard, { props: { scientist: ada } })
    const text = wrapper.text()
    expect(text).toContain('Matemática')
    expect(text).toContain('Reino Unido')
    expect(text).toContain('1815–1852')
  })

  it('mostra "nascida em" quando não há ano de falecimento', () => {
    const alive: Scientist = { ...ada, period: { birth: 1955 } }
    const wrapper = mount(ScientistCard, { props: { scientist: alive } })
    expect(wrapper.text()).toContain('nascida em 1955')
  })

  it('o link "Saiba mais" leva à primeira fonte em nova aba, com segurança', () => {
    const wrapper = mount(ScientistCard, { props: { scientist: ada } })
    const link = wrapper.find('a')
    expect(link.attributes('href')).toBe('https://www.britannica.com/biography/Ada-Lovelace')
    expect(link.attributes('target')).toBe('_blank')
    expect(link.attributes('rel')).toBe('noopener noreferrer')
  })

  it('mostra a imagem com o texto alternativo dos dados só quando existe imagem', () => {
    expect(mount(ScientistCard, { props: { scientist: ada } }).find('img').exists()).toBe(false)

    const withImage: Scientist = {
      ...ada,
      image: { src: '/ada.jpg', alt: 'Retrato de Ada Lovelace em vestido escuro' },
    }
    const img = mount(ScientistCard, { props: { scientist: withImage } }).find('img')
    expect(img.attributes('alt')).toBe('Retrato de Ada Lovelace em vestido escuro')
  })
})
