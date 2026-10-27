import { afterEach, describe, it, expect } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'

import ScientistPopup from '@/components/ScientistPopup.vue'
import { scientists } from '@/data/scientists'

const [ada] = scientists
let wrapper: VueWrapper | undefined

afterEach(() => {
  wrapper?.unmount()
})

describe('ScientistPopup', () => {
  it('é um diálogo modal com nome acessível e o card da cientista', () => {
    wrapper = mount(ScientistPopup, { props: { scientist: ada! } })
    const dialog = wrapper.find('[role="dialog"]')
    expect(dialog.attributes('aria-modal')).toBe('true')
    expect(dialog.attributes('aria-label')).toBe('Sobre Ada Lovelace')
    expect(dialog.find('article h3').text()).toBe('Ada Lovelace')
  })

  it('pede para fechar com Esc, com o botão e com clique fora', async () => {
    wrapper = mount(ScientistPopup, { props: { scientist: ada! } })
    await wrapper.find('[role="dialog"]').trigger('keydown', { key: 'Escape' })
    await wrapper.find('.scientist-popup__close').trigger('click')
    await wrapper.find('.scientist-popup').trigger('click')
    expect(wrapper.emitted('close')).toHaveLength(3)
  })

  it('o Tab no último elemento volta ao primeiro, sem sair do popup', async () => {
    wrapper = mount(ScientistPopup, { props: { scientist: ada! }, attachTo: document.body })
    const link = wrapper.find('.scientist-card__link').element as HTMLElement
    link.focus()
    await wrapper.find('[role="dialog"]').trigger('keydown', { key: 'Tab' })
    expect(document.activeElement?.textContent?.trim()).toBe('Fechar')
  })
})
