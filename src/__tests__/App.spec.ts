import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'

import App from '@/App.vue'
import HomeView from '@/views/HomeView.vue'

describe('App', () => {
  it('mostra o nome do projeto e a página inicial', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [{ path: '/', component: HomeView }],
    })
    router.push('/')
    await router.isReady()

    const wrapper = mount(App, { global: { plugins: [router] } })

    expect(wrapper.find('header').text()).toContain('Mapa Ciência Delas')
    expect(wrapper.find('main h1').text()).toBe('Mapa Ciência Delas')
  })
})
