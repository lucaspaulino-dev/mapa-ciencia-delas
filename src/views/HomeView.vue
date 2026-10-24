<script setup lang="ts">
import ScientistCard from '@/components/ScientistCard.vue'
import { cientistas } from '@/data/cientistas'
</script>

<template>
  <section class="home" aria-labelledby="home-titulo">
    <h1 id="home-titulo" class="home__titulo">Mapa Ciência Delas</h1>
    <p class="home__texto">
      Mulheres que mudaram a ciência e a tecnologia, com informação correta e fonte para cada fato.
    </p>

    <ul class="home__lista">
      <li v-for="cientista in cientistas" :key="cientista.id">
        <ScientistCard :cientista="cientista" />
      </li>
    </ul>
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

.home__lista {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  gap: 1.5rem;
  margin: 2rem 0 0;
  padding: 0;
  list-style: none;
}
</style>
