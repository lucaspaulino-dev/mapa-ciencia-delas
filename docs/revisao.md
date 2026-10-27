# Revisão: listagem com busca e filtros

Veredito: REPROVADO
Escopo: `git diff etapa-5` (ScientistList, ScientistFilters, HomeView e testes)
Portão: `npm run verificar` → passou

## Aceite
- [x] Busca filtra os cards sem diferenciar acentos — entregue em `src/stores/scientists.ts:13` e provado em `src/views/__tests__/HomeView.spec.ts:24`
- [x] Filtros de área e país com valores existentes e rótulo legível — entregue em `src/components/ScientistFilters.vue:42` e `:52`
- [ ] Todo campo de filtro tem `<label>` associado — **entregue diferente do prometido**: os rótulos de área e de país existem, mas não estão associados aos campos
- [x] "Limpar filtros" só com filtro ativo — entregue em `src/components/ScientistFilters.vue:57`
- [x] Região `aria-live` com a contagem — entregue em `src/views/HomeView.vue:24`
- [x] Mensagem sem resultado — entregue em `src/components/ScientistList.vue:17`
- [ ] Tudo funciona só com teclado — não verificável por esta revisão; depende do teste manual da humana

## Achados

### src/components/ScientistFilters.vue
- **Blocker** `ScientistFilters.vue:40` — `<label>Área</label>` sem `for="filter-area"`. Clicar no rótulo não foca o campo e o leitor de tela anuncia o select sem nome. Viola a regra 6 (rótulo em todo campo) e a linha de aceite 3. Correção sugerida: associar o rótulo ao `id` do select.
- **Blocker** `ScientistFilters.vue:50` — mesmo problema no rótulo "País" (`filter-country`).
- **Note** — nenhum `any`, nenhum `v-html`, nenhum `target="_blank"` novo. A busca usa `<form role="search">` com `@submit.prevent`, correto.

### src/components/__tests__/ScientistFilters.spec.ts
- **Warning** `ScientistFilters.spec.ts:31` — o teste "cada campo tem rótulo" confere só o texto dos rótulos, não a associação com o campo. Por isso o Blocker acima passou no portão. Correção sugerida: verificar que o `for` de cada rótulo aponta para o `id` de um campo existente.

### src/components/ScientistList.vue
- **Note** — lista em `<ul>`/`<li>`, card em `<article>`, estado vazio em texto. Componente de apresentação não importa a store, como pede a skill `qualidade-vue`.

### src/views/HomeView.vue
- **Note** — um único `<h1>`; contagem no singular e no plural correta; lista lida de `filteredScientists`, sem cópia local (regra 5).

---

# Revisão 2: após a correção

Veredito: APROVADO
Escopo: `git diff` da correção dos Blockers
Portão: `npm run verificar` → passou

- Os dois Blockers foram corrigidos: `for="filter-area"` e `for="filter-country"` em `ScientistFilters.vue`.
- O Warning foi resolvido: o teste agora verifica que o `for` de cada rótulo aponta para um campo existente.
- Nenhum achado novo.
