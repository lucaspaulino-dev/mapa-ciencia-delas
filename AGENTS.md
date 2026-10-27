# AGENTS.md: Mapa Ciência Delas

Aplicação Vue que mostra mulheres cientistas com fonte para cada fato e interface acessível.

## Stack
Vue 3 + TypeScript estrito + Pinia + Vue Router + Vitest. Sem bibliotecas de UI nem frameworks de CSS.

## Regras de negócio
Siga `docs/regras-de-negocio.md` (RN-01 a RN-04) antes de mudar comportamento. Não copie as regras para cá.

## Convenções
- Código em inglês: componentes em PascalCase (`ScientistCard.vue`), tipos, dados e store (`Scientist`). Textos visíveis em português.
- Tipos em `src/types/<nome>.type.ts`; dados em `src/data/`.
- Dados compartilhados entre componentes numa store Pinia em `src/stores/`.
- `<script setup lang="ts">`, props tipadas com JSDoc, sem desestruturar `defineProps()`.
- CSS `scoped` com BEM; cores e espaços das variáveis de `src/assets/base.css`.
- Imports com `@/`, nunca `../`.
- Todo componente novo tem teste em `__tests__/` ao lado.

## Antes de concluir qualquer tarefa
Rode `npm run verificar` (type-check, testes e lint) e mostre o resultado.

## Testes
Rode com `npm run test:unit -- --run`. Sem `--run`, o Vitest fica em modo watch e não termina.

## Proibido
- `any`.
- Adicionar dependência sem perguntar.
- Editar `docs/regras-de-negocio.md`, `eslint.config.ts` ou `.oxlintrc.json`.
- Alterar um teste só para ele passar.
