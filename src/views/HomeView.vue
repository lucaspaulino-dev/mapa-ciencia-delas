<script setup lang="ts">
import { computed } from 'vue'

import ScientistFilters from '@/components/ScientistFilters.vue'
import ScientistList from '@/components/ScientistList.vue'
import { useCientistasStore } from '@/stores/cientistas'

const store = useCientistasStore()

const contagem = computed(() => {
  const total = store.cientistasFiltradas.length
  return total === 1 ? '1 cientista encontrada' : `${total} cientistas encontradas`
})
</script>

<template>
  <section class="home" aria-labelledby="home-titulo">
    <h1 id="home-titulo" class="home__titulo">Mapa Ciência Delas</h1>
    <p class="home__texto">
      Mulheres que mudaram a ciência e a tecnologia, com informação correta e fonte para cada fato.
    </p>

    <ScientistFilters />
    <p class="home__contagem" aria-live="polite">{{ contagem }}</p>
    <ScientistList :cientistas="store.cientistasFiltradas" />
  </section>
</template>

<style scoped>
.home__titulo {
  margin-top: 0;
  color: var(--cor-primaria);
}

.home__texto {
  max-width: 40rem;
  font-size: 1.125rem;
}

.home__contagem {
  margin: 0 0 1rem;
  color: var(--cor-texto-suave);
}
</style>
