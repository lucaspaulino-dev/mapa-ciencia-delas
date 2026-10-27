<script setup lang="ts">
import { nextTick, ref } from 'vue'

import type { Scientist } from '@/types/scientist.type'
import ScientistPopup from '@/components/ScientistPopup.vue'
import worldMap from '@/assets/world-map.svg'
import { toMapPosition } from '@/utils/map-position'

const props = defineProps<{
  /** Cientistas a marcar no mapa, já filtradas. */
  scientists: Scientist[]
}>()

const selected = ref<Scientist | null>(null)

function open(scientist: Scientist) {
  selected.value = scientist
}

// Ao fechar, o foco volta ao marcador que abriu o popup (regra 8).
async function close() {
  const id = selected.value?.id
  selected.value = null
  await nextTick()
  if (id) document.getElementById(`marker-${id}`)?.focus()
}
</script>

<template>
  <section class="scientist-map" aria-labelledby="map-title">
    <h2 id="map-title" class="scientist-map__title">Onde elas nasceram</h2>
    <div class="scientist-map__canvas">
      <img class="scientist-map__image" :src="worldMap" alt="" />
      <p v-if="props.scientists.length === 0" class="scientist-map__empty">
        Nenhuma cientista encontrada com esses filtros.
      </p>
      <ul v-else class="scientist-map__markers">
        <li
          v-for="scientist in props.scientists"
          :key="scientist.id"
          class="scientist-map__marker"
          :style="toMapPosition(scientist.birthplace)"
        >
          <button
            :id="`marker-${scientist.id}`"
            type="button"
            class="scientist-map__button"
            @click="open(scientist)"
          >
            <span class="scientist-map__label">
              {{ scientist.name }}
              <span class="u-visually-hidden">, nascida em {{ scientist.birthplace.city }}</span>
            </span>
          </button>
        </li>
      </ul>
    </div>
    <ScientistPopup v-if="selected" :scientist="selected" @close="close" />
  </section>
</template>

<style scoped>
.scientist-map__title {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  color: var(--cor-primaria);
}

.scientist-map__canvas {
  position: relative;
  background: var(--cor-superficie);
  border: 1px solid var(--cor-borda);
  border-radius: var(--raio);
  overflow: hidden;
}

.scientist-map__image {
  display: block;
  width: 100%;
  height: auto;
}

.scientist-map__empty {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: 0;
  padding: 1rem 1.5rem;
  text-align: center;
  color: var(--cor-texto-suave);
  background: var(--cor-superficie);
  border: 1px dashed var(--cor-borda);
  border-radius: var(--raio);
  transform: translate(-50%, -50%);
}

.scientist-map__markers {
  margin: 0;
  padding: 0;
  list-style: none;
}

.scientist-map__marker {
  position: absolute;
  transform: translate(-50%, -50%);
}

.scientist-map__button {
  position: relative;
  display: block;
  width: 1.25rem;
  height: 1.25rem;
  padding: 0;
  background: var(--cor-destaque);
  border: 2px solid var(--cor-superficie);
  border-radius: 50%;
  cursor: pointer;
}

/* O nome fica escondido até o marcador receber o mouse ou o foco. */
.scientist-map__label {
  position: absolute;
  bottom: calc(100% + 0.25rem);
  left: 50%;
  padding: 0.125rem 0.5rem;
  font-size: 0.875rem;
  white-space: nowrap;
  color: var(--cor-superficie);
  background: var(--cor-texto);
  border-radius: calc(var(--raio) / 2);
  transform: translateX(-50%);
  clip-path: inset(50%);
}

.scientist-map__button:hover .scientist-map__label,
.scientist-map__button:focus-visible .scientist-map__label {
  clip-path: none;
}
</style>
