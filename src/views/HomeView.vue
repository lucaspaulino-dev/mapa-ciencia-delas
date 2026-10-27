<script setup lang="ts">
import { scientists } from '@/data/scientists'
</script>

<template>
  <section class="home" aria-labelledby="home-title">
    <h1 id="home-title" class="home__title">Mapa Ciência Delas</h1>
    <p class="home__text">
      Mulheres que mudaram a ciência e a tecnologia, com informação correta e fonte para cada fato.
    </p>
    <p class="home__count">{{ scientists.length }} cientistas cadastradas até agora.</p>
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
  color: var(--cor-texto-suave);
}
</style>
