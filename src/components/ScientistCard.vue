<script setup lang="ts">
import { computed } from 'vue'

import type { Cientista } from '@/types/cientista.type'
import { rotuloArea } from '@/data/areas'

const props = defineProps<{
  /** Cientista exibida no card. */
  cientista: Cientista
}>()

const area = computed(() => rotuloArea[props.cientista.area])

const periodo = computed(() => {
  const { nascimento, falecimento } = props.cientista.periodo
  return falecimento === undefined ? `nascida em ${nascimento}` : `${nascimento}–${falecimento}`
})
</script>

<template>
  <article class="scientist-card">
    <img
      v-if="props.cientista.imagem"
      class="scientist-card__image"
      :src="props.cientista.imagem.src"
      :alt="props.cientista.imagem.alt"
    />
    <h3 class="scientist-card__title">{{ props.cientista.nome }}</h3>
    <p class="scientist-card__meta">
      <span class="scientist-card__area">{{ area }}</span>
      · {{ props.cientista.pais }} · {{ periodo }}
    </p>
    <p class="scientist-card__contribution">{{ props.cientista.contribuicao }}</p>
    <a
      class="scientist-card__link"
      :href="props.cientista.fontes[0].url"
      target="_blank"
      rel="noopener noreferrer"
    >
      Saiba mais<span class="u-visually-hidden">
        sobre {{ props.cientista.nome }} (abre em nova aba)</span
      >
    </a>
  </article>
</template>

<style scoped>
.scientist-card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;
  padding: 1.25rem;
  background: var(--cor-superficie);
  border: 1px solid var(--cor-borda);
  border-radius: var(--raio);
}

.scientist-card__image {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: calc(var(--raio) / 2);
}

.scientist-card__title {
  margin: 0;
  font-size: 1.25rem;
  color: var(--cor-primaria);
}

.scientist-card__meta {
  margin: 0;
  font-size: 0.875rem;
  color: var(--cor-texto-suave);
}

.scientist-card__area {
  font-weight: 600;
  color: var(--cor-destaque);
}

.scientist-card__contribution {
  flex: 1;
  margin: 0;
}

.scientist-card__link {
  align-self: flex-start;
  font-weight: 600;
}
</style>
