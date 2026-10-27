<script setup lang="ts">
import { computed } from 'vue'

import ScientistFilters from '@/components/ScientistFilters.vue'
import ScientistMap from '@/components/ScientistMap.vue'
import { useScientistsStore } from '@/stores/scientists'

const store = useScientistsStore()

const countLabel = computed(() => {
  const total = store.filteredScientists.length
  return total === 1 ? '1 cientista encontrada' : `${total} cientistas encontradas`
})
</script>

<template>
  <section class="home" aria-labelledby="home-title">
    <h1 id="home-title" class="home__title">Mapa Ciência Delas</h1>
    <p class="home__text">
      Mulheres que mudaram a ciência e a tecnologia, com informação correta e fonte para cada fato.
    </p>

    <ScientistFilters />
    <p class="home__count" aria-live="polite">{{ countLabel }}</p>
    <ScientistMap :scientists="store.filteredScientists" />
  </section>
</template>

<style scoped>
.home__title {
  margin-top: 0;
  color: var(--cor-primaria);
}

.home__text {
  max-width: 40rem;
  font-size: 1.125rem;
}

.home__count {
  margin: 0 0 1rem;
  color: var(--cor-texto-suave);
}
</style>
