<script setup lang="ts">
import { computed } from 'vue'

import type { ScienceArea } from '@/types/scientist.type'
import { areaLabel } from '@/data/areas'
import { useScientistsStore } from '@/stores/scientists'

const store = useScientistsStore()

const search = computed({
  get: () => store.filters.search,
  set: (value: string) => store.setSearch(value),
})

const area = computed({
  get: () => store.filters.area,
  set: (value: ScienceArea | '') => store.setArea(value),
})

const country = computed({
  get: () => store.filters.country,
  set: (value: string) => store.setCountry(value),
})
</script>

<template>
  <form class="scientist-filters" role="search" @submit.prevent>
    <div class="scientist-filters__field">
      <label class="scientist-filters__label" for="filter-search">Buscar por nome</label>
      <input
        id="filter-search"
        v-model="search"
        class="scientist-filters__control"
        type="search"
        autocomplete="off"
      />
    </div>

    <div class="scientist-filters__field">
      <label class="scientist-filters__label">Área</label>
      <select id="filter-area" v-model="area" class="scientist-filters__control">
        <option value="">Todas as áreas</option>
        <option v-for="option in store.areas" :key="option" :value="option">
          {{ areaLabel[option] }}
        </option>
      </select>
    </div>

    <div class="scientist-filters__field">
      <label class="scientist-filters__label">País</label>
      <select id="filter-country" v-model="country" class="scientist-filters__control">
        <option value="">Todos os países</option>
        <option v-for="option in store.countries" :key="option" :value="option">{{ option }}</option>
      </select>
    </div>

    <button
      v-if="store.hasActiveFilter"
      class="scientist-filters__clear"
      type="button"
      @click="store.clearFilters()"
    >
      Limpar filtros
    </button>
  </form>
</template>

<style scoped>
.scientist-filters {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 1rem;
  margin-bottom: 1rem;
}

.scientist-filters__field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.scientist-filters__label {
  font-weight: 600;
}

.scientist-filters__control {
  min-height: 2.5rem;
  padding: 0.5rem 0.75rem;
  font: inherit;
  color: var(--cor-texto);
  background: var(--cor-superficie);
  border: 1px solid var(--cor-texto-suave);
  border-radius: calc(var(--raio) / 2);
}

.scientist-filters__clear {
  min-height: 2.5rem;
  padding: 0.5rem 1rem;
  font: inherit;
  font-weight: 600;
  color: var(--cor-primaria);
  background: transparent;
  border: 2px solid var(--cor-primaria);
  border-radius: calc(var(--raio) / 2);
  cursor: pointer;
}
</style>
