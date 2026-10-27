<script setup lang="ts">
import type { Scientist } from '@/types/scientist.type'
import ScientistCard from '@/components/ScientistCard.vue'

const props = defineProps<{
  /** Cientistas a exibir, já filtradas. */
  scientists: Scientist[]
}>()
</script>

<template>
  <ul v-if="props.scientists.length > 0" class="scientist-list">
    <li v-for="scientist in props.scientists" :key="scientist.id" class="scientist-list__item">
      <ScientistCard :scientist="scientist" />
    </li>
  </ul>
  <p v-else class="scientist-list__empty">Nenhuma cientista encontrada com esses filtros.</p>
</template>

<style scoped>
.scientist-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  gap: 1.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.scientist-list__empty {
  padding: 2rem;
  text-align: center;
  color: var(--cor-texto-suave);
  background: var(--cor-superficie);
  border: 1px dashed var(--cor-borda);
  border-radius: var(--raio);
}
</style>
