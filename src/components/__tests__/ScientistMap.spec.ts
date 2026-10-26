import { afterEach, describe, it, expect } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'

import ScientistMap from '@/components/ScientistMap.vue'
import { cientistas } from '@/data/cientistas'

let wrapper: VueWrapper | undefined

// attachTo coloca o mapa no documento, para que o foco possa ser verificado.
function montar(lista = cientistas) {
  wrapper = mount(ScientistMap, { props: { cientistas: lista }, attachTo: document.body })
  return wrapper
}

afterEach(() => {
  wrapper?.unmount()
})

describe('ScientistMap', () => {
  it('mostra um marcador por cientista, como botão com o nome e a cidade', () => {
    const marcadores = montar().findAll('.scientist-map__button')
    expect(marcadores).toHaveLength(cientistas.length)
    expect(marcadores[0]?.element.tagName).toBe('BUTTON')
    expect(marcadores[0]?.text()).toContain('Ada Lovelace')
    expect(marcadores[0]?.text()).toContain('nascida em Londres, Inglaterra')
  })

  it('posiciona o marcador pelo local de nascimento', () => {
    const sp = montar().find('#marcador-bertha-lutz').element.parentElement
    expect(sp?.getAttribute('style')).toContain('left: 37.05%')
    expect(sp?.getAttribute('style')).toContain('top: 63.08%')
  })

  it('só marca as cientistas recebidas', () => {
    const lista = cientistas.filter((c) => c.pais === 'Brasil')
    expect(montar(lista).findAll('.scientist-map__button')).toHaveLength(lista.length)
  })

  it('sem cientistas, avisa em texto e não mostra marcadores', () => {
    const mapa = montar([])
    expect(mapa.findAll('.scientist-map__button')).toHaveLength(0)
    expect(mapa.text()).toContain('Nenhuma cientista encontrada com esses filtros.')
  })

  it('o clique abre o popup com o card e põe o foco no botão Fechar', async () => {
    const mapa = montar()
    await mapa.find('#marcador-grace-hopper').trigger('click')

    const dialogo = mapa.find('[role="dialog"]')
    expect(dialogo.attributes('aria-modal')).toBe('true')
    expect(dialogo.find('article h3').text()).toBe('Grace Hopper')
    expect(document.activeElement?.textContent?.trim()).toBe('Fechar')
  })

  it('Esc fecha o popup e devolve o foco ao marcador', async () => {
    const mapa = montar()
    await mapa.find('#marcador-ada-lovelace').trigger('click')
    await mapa.find('[role="dialog"]').trigger('keydown', { key: 'Escape' })
    await new Promise((resolve) => setTimeout(resolve))

    expect(mapa.find('[role="dialog"]').exists()).toBe(false)
    expect(document.activeElement?.id).toBe('marcador-ada-lovelace')
  })

  it('o botão Fechar fecha o popup e devolve o foco ao marcador', async () => {
    const mapa = montar()
    await mapa.find('#marcador-johanna-dobereiner').trigger('click')
    await mapa.find('.scientist-popup__close').trigger('click')
    await new Promise((resolve) => setTimeout(resolve))

    expect(mapa.find('[role="dialog"]').exists()).toBe(false)
    expect(document.activeElement?.id).toBe('marcador-johanna-dobereiner')
  })
})
