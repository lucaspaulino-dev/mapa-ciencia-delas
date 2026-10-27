<script setup lang="ts">
import { communities } from '@/data/communities'
</script>

<template>
  <section class="communities" aria-labelledby="communities-title">
    <h1 id="communities-title" class="communities__title">Continue a história</h1>
    <p class="communities__text">
      Ada, Grace, Bertha e Johanna abriram caminho. Estas comunidades ajudam quem quer seguir por
      ele.
    </p>

    <ul class="communities__list">
      <li v-for="community in communities" :key="community.name" class="communities__item">
        <h2 class="communities__name">{{ community.name }}</h2>
        <p class="communities__focus">{{ community.focus }}</p>
        <a
          v-if="community.url"
          class="communities__link"
          :href="community.url"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visitar o site<span class="u-visually-hidden">
            de {{ community.name }} (abre em nova aba)</span
          >
        </a>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.communities__title {
  margin-top: 0;
  color: var(--cor-primaria);
}

.communities__text {
  max-width: 40rem;
  font-size: 1.125rem;
}

.communities__list {
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

.communities__name {
  margin: 0;
  font-size: 1.25rem;
  color: var(--cor-primaria);
}

.communities__focus {
  flex: 1;
  margin: 0;
}

.communities__link {
  align-self: flex-start;
  font-weight: 600;
}
</style>
