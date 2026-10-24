<script setup lang="ts">
import { computed } from 'vue'

import type { AreaCiencia } from '@/types/cientista.type'
import { rotuloArea } from '@/data/areas'
import { useCientistasStore } from '@/stores/cientistas'

const store = useCientistasStore()

const busca = computed({
  get: () => store.filtros.busca,
  set: (valor: string) => store.definirBusca(valor),
})

const area = computed({
  get: () => store.filtros.area,
  set: (valor: AreaCiencia | '') => store.definirArea(valor),
})

const pais = computed({
  get: () => store.filtros.pais,
  set: (valor: string) => store.definirPais(valor),
})
</script>

<template>
  <form class="scientist-filters" role="search" @submit.prevent>
    <div class="scientist-filters__campo">
      <label class="scientist-filters__rotulo" for="filtro-busca">Buscar por nome</label>
      <input
        id="filtro-busca"
        v-model="busca"
        class="scientist-filters__controle"
        type="search"
        autocomplete="off"
      />
    </div>

    <div class="scientist-filters__campo">
      <label class="scientist-filters__rotulo" for="filtro-area">Área</label>
      <select id="filtro-area" v-model="area" class="scientist-filters__controle">
        <option value="">Todas as áreas</option>
        <option v-for="opcao in store.areas" :key="opcao" :value="opcao">
          {{ rotuloArea[opcao] }}
        </option>
      </select>
    </div>

    <div class="scientist-filters__campo">
      <label class="scientist-filters__rotulo" for="filtro-pais">País</label>
      <select id="filtro-pais" v-model="pais" class="scientist-filters__controle">
        <option value="">Todos os países</option>
        <option v-for="opcao in store.paises" :key="opcao" :value="opcao">{{ opcao }}</option>
      </select>
    </div>

    <button
      v-if="store.temFiltroAtivo"
      class="scientist-filters__limpar"
      type="button"
      @click="store.limparFiltros()"
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

.scientist-filters__campo {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.scientist-filters__rotulo {
  font-weight: 600;
}

.scientist-filters__controle {
  min-height: 2.5rem;
  padding: 0.5rem 0.75rem;
  font: inherit;
  color: var(--cor-texto);
  background: var(--cor-superficie);
  border: 1px solid var(--cor-texto-suave);
  border-radius: calc(var(--raio) / 2);
}

.scientist-filters__limpar {
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
