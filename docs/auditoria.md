# Auditoria: Mapa Ciência Delas

Portão: `npm run verificar` → passou (67 testes)

| ID | Critério | Onde | Teste | Situação |
|---|---|---|---|---|
| RF-01 | O nome aparece como título do card | `src/components/ScientistCard.vue:28` | `src/components/__tests__/ScientistCard.spec.ts:19` | Atende |
| RF-01 | A área aparece com rótulo legível | `src/components/ScientistCard.vue:12` | `src/components/__tests__/ScientistCard.spec.ts:24` | Atende |
| RF-01 | O período aparece como "1815–1852" ou "nascida em 1955" | `src/components/ScientistCard.vue:14` | `src/components/__tests__/ScientistCard.spec.ts:24`, `:32` | Atende |
| RF-01 | "Saiba mais" leva à primeira fonte, em nova aba, com rel seguro, e diz de quem é a fonte | `src/components/ScientistCard.vue:36` | `src/components/__tests__/ScientistCard.spec.ts:38`, `:46` | Atende |
| RF-02 | "johanna dob" encontra "Johanna Döbereiner" | `src/stores/scientists.ts:13` | `src/stores/__tests__/scientists.spec.ts:20` | Atende |
| RF-02 | Os filtros listam só valores que existem nos dados | `src/stores/scientists.ts:39` | `src/components/__tests__/ScientistFilters.spec.ts:19` | Atende |
| RF-02 | Busca e filtros funcionam combinados | `src/stores/scientists.ts:29` | `src/stores/__tests__/scientists.spec.ts:41` | Atende |
| RF-02 | "Limpar filtros" aparece só com filtro ativo e volta ao conjunto completo | `src/components/ScientistFilters.vue:57` | `src/components/__tests__/ScientistFilters.spec.ts:43` | Atende |
| RF-03 | Região `aria-live="polite"` anuncia "1 cientista encontrada" ou "N cientistas encontradas" | `src/views/HomeView.vue:24` | `src/views/__tests__/HomeView.spec.ts:13`, `:25` | Atende |
| RF-03 | Sem resultado, aparece "Nenhuma cientista encontrada com esses filtros." | `src/components/ScientistMap.vue:34` | `src/views/__tests__/HomeView.spec.ts:35` | Atende |
| RF-04 | Cada marcador é um botão com o nome, no local de nascimento | `src/components/ScientistMap.vue:44` | `src/components/__tests__/ScientistMap.spec.ts:20`, `:28` | Atende |
| RF-04 | O marcador abre um popup com papel de diálogo e o foco vai para dentro dele | `src/components/ScientistPopup.vue:45` | `src/components/__tests__/ScientistMap.spec.ts:45` | Atende |
| RF-04 | Esc ou "Fechar" fecham o popup e o foco volta ao marcador | `src/components/ScientistMap.vue:21` | `src/components/__tests__/ScientistMap.spec.ts:55`, `:65` | Atende |
| RF-04 | Os marcadores ficam numa lista (`<ul>`) | `src/components/ScientistMap.vue:37` | — | Atende sem teste |
| RF-04 | Posição pela projeção equirretangular, sem biblioteca de mapas | `src/utils/map-position.ts:14` | `src/utils/__tests__/map-position.spec.ts:6` | Atende |
| RF-05 | O menu tem "Início" e "Continue a história" | `src/App.vue:12` | — | Atende sem teste |
| RF-05 | Cada programa mostra nome, foco e link que abre em nova aba e diz de quem é o site | `src/views/CommunitiesView.vue:14` | `src/views/__tests__/CommunitiesView.spec.ts:8`, `:14` | Atende |
| RN-01 | Toda cientista tem todos os campos e ao menos uma fonte `https` | `src/data/scientists.ts` | `src/data/__tests__/scientists.spec.ts:9`, `:15`, `:24`, `:28` | Atende |
| RN-02 | Toda imagem tem texto alternativo descritivo | `src/components/ScientistCard.vue:26` | `src/data/__tests__/scientists.spec.ts:34`, `src/components/__tests__/ScientistCard.spec.ts:53` | Atende |
| RN-03 | Rótulo em todo campo | `src/components/ScientistFilters.vue:29` | `src/components/__tests__/ScientistFilters.spec.ts:31` | Atende |
| RN-03 | Navegação completa por teclado | `src/components/ScientistPopup.vue:25` | `src/components/__tests__/ScientistPopup.spec.ts:31`, `src/components/__tests__/ScientistMap.spec.ts:55` | Atende |
| RN-03 | Foco visível | `src/assets/base.css:33` | — | Atende sem teste |
| RN-03 | Contraste mínimo | `src/assets/base.css:2` | — | Atende sem teste |
| RN-04 | Nenhuma informação biográfica sem fonte | `src/data/scientists.ts` | `src/data/__tests__/scientists.spec.ts:28` | Parcial |

## Resumo

- Atende: 19 · Atende sem teste: 4 · Parcial: 1 · Não atende: 0
- RN-04 é Parcial: o teste prova que toda cientista tem fonte, mas não que cada fato do card está na fonte. Só uma pessoa, lendo a fonte, valida isso.
- Contraste e foco visível: as cores de `base.css` passam de 4,5:1 (a menor é 6,35:1) e há contorno de foco, mas nenhum teste garante que continue assim.
- A lista `<ul>` dos marcadores e o menu existem no código, mas um teste não reclamaria se sumissem.
