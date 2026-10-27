import { afterEach, describe, it, expect } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'

import ScientistMap from '@/components/ScientistMap.vue'
import { scientists } from '@/data/scientists'

let wrapper: VueWrapper | undefined

// attachTo coloca o mapa no documento, para que o foco possa ser verificado.
function mountMap(list = scientists) {
  wrapper = mount(ScientistMap, { props: { scientists: list }, attachTo: document.body })
  return wrapper
}

afterEach(() => {
  wrapper?.unmount()
})

describe('ScientistMap', () => {
  it('mostra um marcador por cientista, como botão com o nome e a cidade', () => {
    const markers = mountMap().findAll('.scientist-map__button')
    expect(markers).toHaveLength(scientists.length)
    expect(markers[0]?.element.tagName).toBe('BUTTON')
    expect(markers[0]?.text()).toContain('Ada Lovelace')
    expect(markers[0]?.text()).toContain('nascida em Londres, Inglaterra')
  })

  it('posiciona o marcador pelo local de nascimento', () => {
    const saoPaulo = mountMap().find('#marker-bertha-lutz').element.parentElement
    expect(saoPaulo?.getAttribute('style')).toContain('left: 37.05%')
    expect(saoPaulo?.getAttribute('style')).toContain('top: 63.08%')
  })

  it('só marca as cientistas recebidas', () => {
    const list = scientists.filter((c) => c.country === 'Brasil')
    expect(mountMap(list).findAll('.scientist-map__button')).toHaveLength(list.length)
  })

  it('sem cientistas, avisa em texto e não mostra marcadores', () => {
    const mapEl = mountMap([])
    expect(mapEl.findAll('.scientist-map__button')).toHaveLength(0)
    expect(mapEl.text()).toContain('Nenhuma cientista encontrada com esses filtros.')
  })

  it('o clique abre o popup com o card e põe o foco no botão Fechar', async () => {
    const mapEl = mountMap()
    await mapEl.find('#marker-grace-hopper').trigger('click')

    const dialog = mapEl.find('[role="dialog"]')
    expect(dialog.attributes('aria-modal')).toBe('true')
    expect(dialog.find('article h3').text()).toBe('Grace Hopper')
    expect(document.activeElement?.textContent?.trim()).toBe('Fechar')
  })

  it('Esc fecha o popup e devolve o foco ao marcador', async () => {
    const mapEl = mountMap()
    await mapEl.find('#marker-ada-lovelace').trigger('click')
    await mapEl.find('[role="dialog"]').trigger('keydown', { key: 'Escape' })
    await new Promise((resolve) => setTimeout(resolve))

    expect(mapEl.find('[role="dialog"]').exists()).toBe(false)
    expect(document.activeElement?.id).toBe('marker-ada-lovelace')
  })

  it('o botão Fechar fecha o popup e devolve o foco ao marcador', async () => {
    const mapEl = mountMap()
    await mapEl.find('#marker-johanna-dobereiner').trigger('click')
    await mapEl.find('.scientist-popup__close').trigger('click')
    await new Promise((resolve) => setTimeout(resolve))

    expect(mapEl.find('[role="dialog"]').exists()).toBe(false)
    expect(document.activeElement?.id).toBe('marker-johanna-dobereiner')
  })
})
