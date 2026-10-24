import { computed, reactive, ref } from 'vue'
import { defineStore } from 'pinia'

import type { AreaCiencia, Cientista } from '@/types/cientista.type'
import { cientistas as dados } from '@/data/cientistas'

export interface FiltrosCientistas {
  busca: string
  area: AreaCiencia | ''
  pais: string
}

function normalizar(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
}

function ordenar<T extends string>(valores: T[]): T[] {
  return [...new Set(valores)].sort((a, b) => a.localeCompare(b, 'pt-BR'))
}

export const useCientistasStore = defineStore('cientistas', () => {
  const cientistas = ref<Cientista[]>([...dados])
  const filtros = reactive<FiltrosCientistas>({ busca: '', area: '', pais: '' })

  const cientistasFiltradas = computed(() => {
    const busca = normalizar(filtros.busca)
    return cientistas.value.filter(
      (c) =>
        (busca === '' || normalizar(c.nome).includes(busca)) &&
        (filtros.area === '' || c.area === filtros.area) &&
        (filtros.pais === '' || c.pais === filtros.pais),
    )
  })

  const paises = computed(() => ordenar(cientistas.value.map((c) => c.pais)))
  const areas = computed(() => ordenar(cientistas.value.map((c) => c.area)))
  const temFiltroAtivo = computed(
    () => filtros.busca.trim() !== '' || filtros.area !== '' || filtros.pais !== '',
  )

  function definirBusca(busca: string) {
    filtros.busca = busca
  }

  function definirArea(area: AreaCiencia | '') {
    filtros.area = area
  }

  function definirPais(pais: string) {
    filtros.pais = pais
  }

  function limparFiltros() {
    filtros.busca = ''
    filtros.area = ''
    filtros.pais = ''
  }

  function buscarPorId(id: string): Cientista | undefined {
    return cientistas.value.find((c) => c.id === id)
  }

  return {
    cientistas,
    filtros,
    cientistasFiltradas,
    paises,
    areas,
    temFiltroAtivo,
    definirBusca,
    definirArea,
    definirPais,
    limparFiltros,
    buscarPorId,
  }
})
