---
name: qualidade-vue
description: Checklist de qualidade para componentes Vue 3 + TypeScript, stores Pinia e testes Vitest do Mapa Ciência Delas. Use ao criar, alterar ou revisar arquivos .vue, stores em src/stores ou testes em __tests__.
license: MIT
compatibility: opencode
---

# Qualidade Vue: Mapa Ciência Delas

## Quando usar

Ao criar, alterar ou revisar qualquer arquivo em `src/components`, `src/views`, `src/stores` ou seus testes.

## O que a máquina já checa, e o que depende de você

`npm run verificar` roda type-check, testes e lint. Se ele passa, estes itens estão garantidos e você **não** precisa revisá-los à mão: erro de tipo, import quebrado, variável não usada, regra de `eslint-plugin-vue` (como `v-for` sem `key`), teste quebrado.

Todo o resto desta skill **nenhuma ferramenta checa**. É responsabilidade de quem escreve e de quem revisa.

## Regras

### Vue e TypeScript
1. `<script setup lang="ts">` sempre.
2. Props com `defineProps<{ ... }>()` tipado, cada prop documentada com JSDoc. Nunca desestruture o retorno de `defineProps()`: use `props.x`, ou `toRef(props, 'x')` se precisar repassar reatividade.
3. Sem `any`. Se o tipo não existe, crie em `src/types/<nome>.type.ts`.
4. Imports com `@/`, nunca `../`.
5. Um componente, uma responsabilidade. Se o template passa de ~80 linhas, procure um subcomponente.

### HTML semântico e acessibilidade (WCAG 2.2 AA)
6. Um `<h1>` por página; títulos sem pular nível.
7. Listas em `<ul>`/`<li>`; card em `<article>`; regiões com `<main>`, `<nav>`, `<section aria-labelledby>`.
8. Todo campo de formulário com `<label for>` associado. Placeholder não é rótulo.
9. Todo link diz para onde leva, mesmo fora de contexto. Vários "Saiba mais" iguais na mesma página precisam de complemento para leitor de tela (`.u-visually-hidden`).
10. Link que abre em nova aba: `target="_blank" rel="noopener noreferrer"` e aviso para leitor de tela.
11. Nada de `div` clicável: ação é `<button>`, navegação é `<a>`/`RouterLink`.
12. Mudança de resultado sem recarregar a página (como filtros) é anunciada com uma região `aria-live="polite"`.
13. Detalhes de contraste, foco e teclado: leia `references/checklist-a11y.md`.

### Estado
14. Dados e filtros das cientistas ficam em `useCientistasStore`. Componente recebe dados por props ou lê da store; nunca guarda cópia local da lista.
15. Componentes de apresentação (card, popup, mapa) não importam a store; quem importa é a view ou o componente de filtro.

### CSS
16. `<style scoped>` e nomes BEM: `bloco__elemento--modificador`.
17. Cores e espaços vêm das variáveis de `src/assets/base.css`. Sem framework de CSS.

### Testes
18. Todo componente novo tem teste em `__tests__/` ao lado.
19. O teste verifica comportamento visível (texto, atributo, evento emitido), não detalhe interno.
20. Nenhum `.skip`. Teste que falha é informação, não obstáculo.

### Comentários
21. Comentário explica **por quê**, nunca **o quê**. Racional de decisão vai na mensagem de commit, não no código.

## Exemplo

Ruim:

```vue
<script setup lang="ts">
const { cientista } = defineProps<{ cientista: any }>()
</script>
<template>
  <div class="card" @click="abrir">
    <b>{{ cientista.nome }}</b>
    <a :href="cientista.fontes[0].url" target="_blank">Saiba mais</a>
  </div>
</template>
```

Bom:

```vue
<script setup lang="ts">
import type { Cientista } from '@/types/cientista.type'

const props = defineProps<{
  /** Cientista exibida no card. */
  cientista: Cientista
}>()
</script>
<template>
  <article class="scientist-card">
    <h3 class="scientist-card__title">{{ props.cientista.nome }}</h3>
    <a :href="props.cientista.fontes[0].url" target="_blank" rel="noopener noreferrer">
      Saiba mais<span class="u-visually-hidden"> sobre {{ props.cientista.nome }} (abre em nova aba)</span>
    </a>
  </article>
</template>
```

## Verificação

Rode `bash .opencode/skills/qualidade-vue/scripts/verificar.sh` (ou `npm run verificar`) e só conclua se passar.
