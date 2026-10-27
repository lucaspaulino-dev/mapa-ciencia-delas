<script setup lang="ts">
import { onMounted, ref } from 'vue'

import type { Scientist } from '@/types/scientist.type'
import ScientistCard from '@/components/ScientistCard.vue'

const props = defineProps<{
  /** Cientista mostrada no popup. */
  scientist: Scientist
}>()

const emit = defineEmits<{
  /** Pedido para fechar o popup (botão Fechar, Esc ou clique fora). */
  close: []
}>()

const dialog = ref<HTMLElement | null>(null)
const closeButton = ref<HTMLButtonElement | null>(null)

onMounted(() => {
  closeButton.value?.focus()
})

// Mantém o Tab dentro do popup enquanto ele está aberto (RF-04).
function trapFocus(event: KeyboardEvent) {
  const focusable = dialog.value?.querySelectorAll<HTMLElement>('button, a[href]')
  if (!focusable || focusable.length === 0) return
  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last?.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first?.focus()
  }
}
</script>

<template>
  <div class="scientist-popup" @click.self="emit('close')">
    <div
      ref="dialog"
      class="scientist-popup__dialog"
      role="dialog"
      aria-modal="true"
      :aria-label="`Sobre ${props.scientist.name}`"
      @keydown.esc="emit('close')"
      @keydown.tab="trapFocus"
    >
      <button
        ref="closeButton"
        type="button"
        class="scientist-popup__close"
        @click="emit('close')"
      >
        Fechar
      </button>
      <ScientistCard :scientist="props.scientist" />
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
