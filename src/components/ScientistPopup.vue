<script setup lang="ts">
import { onMounted, ref } from 'vue'

import type { Cientista } from '@/types/cientista.type'
import ScientistCard from '@/components/ScientistCard.vue'

const props = defineProps<{
  /** Cientista mostrada no popup. */
  cientista: Cientista
}>()

const emit = defineEmits<{
  /** Pedido para fechar o popup (botão Fechar, Esc ou clique fora). */
  fechar: []
}>()

const dialogo = ref<HTMLElement | null>(null)
const botaoFechar = ref<HTMLButtonElement | null>(null)

onMounted(() => {
  botaoFechar.value?.focus()
})

// Mantém o Tab dentro do popup enquanto ele está aberto (regra 8).
function prenderFoco(evento: KeyboardEvent) {
  const focaveis = dialogo.value?.querySelectorAll<HTMLElement>('button, a[href]')
  if (!focaveis || focaveis.length === 0) return
  const primeiro = focaveis[0]
  const ultimo = focaveis[focaveis.length - 1]
  if (evento.shiftKey && document.activeElement === primeiro) {
    evento.preventDefault()
    ultimo?.focus()
  } else if (!evento.shiftKey && document.activeElement === ultimo) {
    evento.preventDefault()
    primeiro?.focus()
  }
}
</script>

<template>
  <div class="scientist-popup" @click.self="emit('fechar')">
    <div
      ref="dialogo"
      class="scientist-popup__dialog"
      role="dialog"
      aria-modal="true"
      :aria-label="`Sobre ${props.cientista.nome}`"
      @keydown.esc="emit('fechar')"
      @keydown.tab="prenderFoco"
    >
      <button
        ref="botaoFechar"
        type="button"
        class="scientist-popup__close"
        @click="emit('fechar')"
      >
        Fechar
      </button>
      <ScientistCard :cientista="props.cientista" />
    </div>
  </div>
</template>

<style scoped>
.scientist-popup {
  position: fixed;
  inset: 0;
  z-index: 10;
  display: grid;
  place-items: center;
  padding: var(--espaco);
  background: rgb(31 22 48 / 55%);
}

.scientist-popup__dialog {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: min(26rem, 100%);
}

.scientist-popup__close {
  align-self: flex-end;
  padding: 0.375rem 0.875rem;
  font: inherit;
  font-weight: 600;
  color: var(--cor-primaria);
  background: var(--cor-superficie);
  border: 1px solid var(--cor-borda);
  border-radius: var(--raio);
  cursor: pointer;
}
</style>
