<script setup lang="ts">
import { comunidades } from '@/data/comunidades'
</script>

<template>
  <section class="communities" aria-labelledby="comunidades-titulo">
    <h1 id="comunidades-titulo" class="communities__titulo">Continue a história</h1>
    <p class="communities__texto">
      Ada, Grace, Bertha e Johanna abriram caminho. Estas comunidades ajudam quem quer seguir por
      ele.
    </p>

    <ul class="communities__lista">
      <li v-for="comunidade in comunidades" :key="comunidade.nome" class="communities__item">
        <h2 class="communities__nome">{{ comunidade.nome }}</h2>
        <p class="communities__foco">{{ comunidade.foco }}</p>
        <a
          v-if="comunidade.url"
          class="communities__link"
          :href="comunidade.url"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visitar o site<span class="u-visually-hidden">
            de {{ comunidade.nome }} (abre em nova aba)</span
          >
        </a>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.communities__titulo {
  margin-top: 0;
  color: var(--cor-primaria);
}

.communities__texto {
  max-width: 40rem;
  font-size: 1.125rem;
}

.communities__lista {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  gap: 1.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.communities__item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.25rem;
  background: var(--cor-superficie);
  border: 1px solid var(--cor-borda);
  border-radius: var(--raio);
}

.communities__nome {
  margin: 0;
  font-size: 1.25rem;
  color: var(--cor-primaria);
}

.communities__foco {
  flex: 1;
  margin: 0;
}

.communities__link {
  align-self: flex-start;
  font-weight: 600;
}
</style>
