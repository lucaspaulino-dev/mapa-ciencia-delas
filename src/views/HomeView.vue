<script setup lang="ts">
import ScientistCard from '@/components/ScientistCard.vue'
import { useScientistsStore } from '@/stores/scientists'

const store = useScientistsStore()
</script>

<template>
  <section class="home" aria-labelledby="home-title">
    <h1 id="home-title" class="home__title">Mapa Ciência Delas</h1>
    <p class="home__text">
      Mulheres que mudaram a ciência e a tecnologia, com informação correta e fonte para cada fato.
    </p>

    <ul class="home__list">
      <li v-for="scientist in store.scientists" :key="scientist.id">
        <ScientistCard :scientist="scientist" />
      </li>
    </ul>
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

.home__list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  gap: 1.5rem;
  margin: 2rem 0 0;
  padding: 0;
  list-style: none;
}
</style>
