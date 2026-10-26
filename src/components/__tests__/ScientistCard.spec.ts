import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import type { Cientista } from '@/types/cientista.type'
import ScientistCard from '@/components/ScientistCard.vue'

const ada: Cientista = {
  id: 'ada-lovelace',
  nome: 'Ada Lovelace',
  area: 'matematica',
  pais: 'Reino Unido',
  periodo: { nascimento: 1815, falecimento: 1852 },
  localNascimento: { cidade: 'Londres, Inglaterra', lat: 51.51, lng: -0.14 },
  contribuicao: 'Primeiro algoritmo publicado destinado a uma máquina.',
  fontes: [{ titulo: 'Britannica', url: 'https://www.britannica.com/biography/Ada-Lovelace' }],
}

describe('ScientistCard', () => {
  it('mostra o nome como título', () => {
    const wrapper = mount(ScientistCard, { props: { cientista: ada } })
    expect(wrapper.find('article h3').text()).toBe('Ada Lovelace')
  })

  it('mostra a área com rótulo legível, o país e o período', () => {
    const wrapper = mount(ScientistCard, { props: { cientista: ada } })
    const texto = wrapper.text()
    expect(texto).toContain('Matemática')
    expect(texto).toContain('Reino Unido')
    expect(texto).toContain('1815–1852')
  })

  it('mostra "nascida em" quando não há ano de falecimento', () => {
    const viva: Cientista = { ...ada, periodo: { nascimento: 1955 } }
    const wrapper = mount(ScientistCard, { props: { cientista: viva } })
    expect(wrapper.text()).toContain('nascida em 1955')
  })

  it('o link "Saiba mais" leva à primeira fonte em nova aba, com segurança', () => {
    const wrapper = mount(ScientistCard, { props: { cientista: ada } })
    const link = wrapper.find('a')
    expect(link.attributes('href')).toBe('https://www.britannica.com/biography/Ada-Lovelace')
    expect(link.attributes('target')).toBe('_blank')
    expect(link.attributes('rel')).toBe('noopener noreferrer')
  })

  it('o link diz a quem se refere e avisa que abre em nova aba (regra 4)', () => {
    const wrapper = mount(ScientistCard, { props: { cientista: ada } })
    const textoDoLink = wrapper.find('a').text().replace(/\s+/g, ' ')
    expect(textoDoLink).toBe('Saiba mais sobre Ada Lovelace (abre em nova aba)')
    expect(wrapper.find('a .u-visually-hidden').exists()).toBe(true)
  })

  it('mostra a imagem com o texto alternativo dos dados só quando existe imagem', () => {
    expect(mount(ScientistCard, { props: { cientista: ada } }).find('img').exists()).toBe(false)

    const comImagem: Cientista = {
      ...ada,
      imagem: { src: '/ada.jpg', alt: 'Retrato de Ada Lovelace em vestido escuro' },
    }
    const img = mount(ScientistCard, { props: { cientista: comImagem } }).find('img')
    expect(img.attributes('alt')).toBe('Retrato de Ada Lovelace em vestido escuro')
  })
})
