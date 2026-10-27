import { computed, reactive, ref } from 'vue'
import { defineStore } from 'pinia'

import type { ScienceArea, Scientist } from '@/types/scientist.type'
import { scientists as data } from '@/data/scientists'

export interface Filters {
  search: string
  area: ScienceArea | ''
  country: string
}

function normalizeText(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
}

function sortUnique<T extends string>(values: T[]): T[] {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b, 'pt-BR'))
}

export const useScientistsStore = defineStore('scientists', () => {
  const scientists = ref<Scientist[]>([...data])
  const filters = reactive<Filters>({ search: '', area: '', country: '' })

  const filteredScientists = computed(() => {
    const search = normalizeText(filters.search)
    return scientists.value.filter(
      (c) =>
        (search === '' || normalizeText(c.name).includes(search)) &&
        (filters.area === '' || c.area === filters.area) &&
        (filters.country === '' || c.country === filters.country),
    )
  })

  const countries = computed(() => sortUnique(scientists.value.map((c) => c.country)))
  const areas = computed(() => sortUnique(scientists.value.map((c) => c.area)))
  const hasActiveFilter = computed(
    () => filters.search.trim() !== '' || filters.area !== '' || filters.country !== '',
  )

  function setSearch(search: string) {
    filters.search = search
  }

  function setArea(area: ScienceArea | '') {
    filters.area = area
  }

  function setCountry(country: string) {
    filters.country = country
  }

  function clearFilters() {
    filters.search = ''
    filters.area = ''
    filters.country = ''
  }

  function findById(id: string): Scientist | undefined {
    return scientists.value.find((c) => c.id === id)
  }

  return {
    scientists,
    filters,
    filteredScientists,
    countries,
    areas,
    hasActiveFilter,
    setSearch,
    setArea,
    setCountry,
    clearFilters,
    findById,
  }
})
