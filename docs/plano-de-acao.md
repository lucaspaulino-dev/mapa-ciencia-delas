# Plano: mapa-múndi no lugar da lista de cards

## O que muda para quem usa
Na página inicial, a lista de cards dá lugar ao mapa-múndi: quem visita vê onde cada cientista nasceu e, ao clicar num marcador, lê o card dela num popup, sem sair da página.

## Aceite
- [x] A conta da seção "Mapa-múndi" das regras converte latitude e longitude em posição no mapa — verifica: `npm run test:unit -- --run` (projetar.spec)
- [x] O mapa mostra um marcador por cientista recebida, no local de nascimento — verifica: `npm run test:unit -- --run` (ScientistMap.spec)
- [x] Cada marcador é um `<button>` com o nome da cientista e a cidade de nascimento — verifica: `npm run test:unit -- --run` (ScientistMap.spec)
- [x] Ativar o marcador abre um popup com `role="dialog"`, `aria-modal="true"` e o card da cientista, com o foco no botão "Fechar" — verifica: `npm run test:unit -- --run` (ScientistMap.spec)
- [x] Esc e o botão "Fechar" fecham o popup e devolvem o foco ao marcador — verifica: `npm run test:unit -- --run` (ScientistMap.spec)
- [x] Com o popup aberto, o Tab não sai dele — verifica: `npm run test:unit -- --run` (ScientistPopup.spec)
- [x] Os filtros valem para o mapa e, sem resultado, o mapa mostra "Nenhuma cientista encontrada com esses filtros." — verifica: `npm run test:unit -- --run` (HomeView.spec)
- [x] A página inicial não mostra mais a lista de cards — verifica: `npm run test:unit -- --run` (HomeView.spec)
- [ ] O nome aparece ao focar o marcador e o fluxo inteiro funciona só com teclado — verifica: manual, `npm run dev`, Tab até um marcador, Enter, Tab dentro do popup, Esc

## Fora de escopo
- Agrupar marcadores muito próximos.
- Zoom e arrastar o mapa.
- Página de detalhe.

## Decisões para aprovação humana
- Marcadores como `<button>` HTML posicionados em porcentagem sobre a imagem `src/assets/mapa-mundi.svg`. Alternativa descartada: biblioteca de mapas (Leaflet), que exige dependência nova e internet para as imagens do mapa.
- O popup é um componente próprio com `role="dialog"`, e não o `<dialog>` nativo. Alternativa descartada: `<dialog>` com `showModal()`, que o jsdom dos testes não implementa.
- `ScientistMap` recebe a lista por prop; a HomeView passa `cientistasFiltradas`. Alternativa descartada: o mapa ler a store sozinho, o que esconderia de onde vem a lista.
- `ScientistList` e o teste dele saem, porque nada mais os usa. O `ScientistCard` continua, agora dentro do popup.

## Tarefas
1. **src/utils/projetar.ts**: função `projetar({ lat, lng })` que devolve `{ left, top }` em porcentagem, com a conta das regras. Teste que prova: `src/utils/__tests__/projetar.spec.ts` verifica o centro, os cantos e São Paulo. Verifica: `npm run test:unit -- --run`
2. **src/components/ScientistPopup.vue**: diálogo modal com o `ScientistCard`, botão "Fechar" com foco ao abrir, Esc e clique fora emitindo `fechar`, e Tab preso dentro do popup. Teste que prova: `src/components/__tests__/ScientistPopup.spec.ts` verifica os atributos do diálogo, os três jeitos de fechar e o Tab. Verifica: `npm run test:unit -- --run`
3. **src/components/ScientistMap.vue**: imagem do mapa e um `<button>` por cientista, posicionado com `projetar`; o clique abre o `ScientistPopup` e, ao fechar, o foco volta ao marcador; sem cientistas, mostra a mensagem de nenhum resultado. Teste que prova: `src/components/__tests__/ScientistMap.spec.ts` verifica os marcadores, a posição, a mensagem, a abertura e a volta do foco. Verifica: `npm run test:unit -- --run`
4. **src/views/HomeView.vue** e remoção de **src/components/ScientistList.vue** (com o teste): a HomeView troca a lista pelo `ScientistMap` com `cientistasFiltradas`. Teste que prova: `src/views/__tests__/HomeView.spec.ts` verifica que não há cards na página, que a busca reduz os marcadores e a mensagem sem resultado. Verifica: `npm run verificar`
