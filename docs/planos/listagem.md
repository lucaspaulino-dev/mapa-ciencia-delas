# Plano: listagem com busca e filtros na página inicial

> Substituído pelo plano do mapa-múndi (etapa 8): `ScientistList` e o teste dele foram removidos, e a mensagem sem resultado passou para o `ScientistMap`.

## O que muda para quem usa
Na página inicial, quem visita busca uma cientista pelo nome, filtra por área e por país e sabe na hora quantas cientistas combinam com a busca.

## Requisitos atendidos
- RF-02, RF-03, RN-03

## Aceite
- [x] Digitar no campo de busca filtra os cards pelo nome, sem diferenciar acentos — verifica: `npm run test:unit -- --run` (HomeView.spec)
- [x] Os filtros de área e de país listam só valores que existem nos dados, com rótulo legível, e filtram os cards — verifica: `npm run test:unit -- --run` (ScientistFilters.spec)
- [x] Todo campo de filtro tem `<label>` associado ao campo — verifica: `npm run test:unit -- --run` (ScientistFilters.spec)
- [x] O botão "Limpar filtros" aparece só quando há filtro ativo e volta à lista completa — verifica: `npm run test:unit -- --run` (ScientistFilters.spec)
- [x] Uma região `aria-live="polite"` anuncia quantas cientistas estão sendo mostradas — verifica: `npm run test:unit -- --run` (HomeView.spec)
- [x] Sem resultado, aparece "Nenhuma cientista encontrada com esses filtros." — verifica: `npm run test:unit -- --run` (ScientistList.spec)
- [ ] Tudo funciona só com teclado — verifica: manual, `npm run dev` e navegar a página com Tab, Shift+Tab, setas e Enter

## Fora de escopo
- Mapa-múndi (etapa 8).
- Guardar os filtros na URL.
- Paginação.

## Decisões para aprovação humana
- `ScientistFilters` escreve direto na store; `ScientistList` só recebe a lista por prop. Alternativa descartada: filtros emitindo eventos para a view, que daria mais código sem ganho numa página só.
- A busca filtra a cada tecla, sem botão "Buscar". Alternativa descartada: botão, desnecessário com poucas cientistas.

## Tarefas
1. **src/components/ScientistList.vue**: recebe `scientists: Scientist[]` e mostra um `ScientistCard` por cientista dentro de `<ul>`; com a lista vazia, mostra "Nenhuma cientista encontrada com esses filtros.". Teste que prova: `src/components/__tests__/ScientistList.spec.ts` verifica um `<li>` por cientista e a mensagem com lista vazia. Verifica: `npm run test:unit -- --run`
2. **src/components/ScientistFilters.vue**: campo de busca, select de área (com `areaLabel`) e select de país, ligados às ações de `useScientistsStore`; botão "Limpar filtros" só com filtro ativo. Teste que prova: `src/components/__tests__/ScientistFilters.spec.ts` verifica que digitar e selecionar atualizam a store, que cada campo tem `<label>` associado e que o botão aparece e limpa. Verifica: `npm run test:unit -- --run`
3. **src/views/HomeView.vue**: usa `ScientistFilters` e `ScientistList` com `filteredScientists`; mostra a contagem numa região `aria-live="polite"` ("1 cientista encontrada", "N cientistas encontradas"). Teste que prova: `src/views/__tests__/HomeView.spec.ts` verifica que a busca reduz os cards e que a contagem acompanha. Verifica: `npm run verificar`
