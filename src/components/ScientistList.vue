<script setup lang="ts">
import type { Cientista } from '@/types/cientista.type'
import ScientistCard from '@/components/ScientistCard.vue'

const props = defineProps<{
  /** Cientistas a exibir, já filtradas. */
  cientistas: Cientista[]
}>()
</script>

<template>
  <ul v-if="props.cientistas.length > 0" class="scientist-list">
    <li v-for="cientista in props.cientistas" :key="cientista.id" class="scientist-list__item">
      <ScientistCard :cientista="cientista" />
    </li>
  </ul>
  <p v-else class="scientist-list__vazia">Nenhuma cientista encontrada com esses filtros.</p>
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

.scientist-list__vazia {
  padding: 2rem;
  text-align: center;
  color: var(--cor-texto-suave);
  background: var(--cor-superficie);
  border: 1px dashed var(--cor-borda);
  border-radius: var(--raio);
}
</style>
