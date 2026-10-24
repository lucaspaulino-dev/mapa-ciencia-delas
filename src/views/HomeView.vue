<script setup lang="ts">
import { cientistas } from '@/data/cientistas'
</script>

<template>
  <section class="home" aria-labelledby="home-titulo">
    <h1 id="home-titulo" class="home__titulo">Mapa Ciência Delas</h1>
    <p class="home__texto">
      Mulheres que mudaram a ciência e a tecnologia, com informação correta e fonte para cada fato.
    </p>
    <p class="home__contagem">{{ cientistas.length }} cientistas cadastradas até agora.</p>
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
  color: var(--cor-texto-suave);
}
</style>
