# Revisão: mapa-múndi no lugar da lista de cards

Veredito: APROVADO
Escopo: `git diff etapa-7` (toMapPosition, ScientistPopup, ScientistMap, HomeView, remoção de ScientistList e testes)
Portão: `npm run verificar` → passou

## Aceite
- [x] Conta da seção "Mapa-múndi" — entregue em `src/utils/map-position.ts:15` e provado em `src/utils/__tests__/map-position.spec.ts:6`
- [x] Um marcador por cientista recebida — entregue em `src/components/ScientistMap.vue:38` e provado em `ScientistMap.spec.ts:20` e `:34`
- [x] Marcador é `<button>` com nome e cidade — entregue em `src/components/ScientistMap.vue:44`
- [x] Popup como diálogo modal com foco no "Fechar" — entregue em `src/components/ScientistPopup.vue:45` e `:21`, provado em `ScientistMap.spec.ts:45`
- [x] Esc e "Fechar" devolvem o foco ao marcador — entregue em `src/components/ScientistMap.vue:25`, provado em `ScientistMap.spec.ts:55` e `:65`
- [x] Tab preso no popup — entregue em `src/components/ScientistPopup.vue:25`, provado em `ScientistPopup.spec.ts:31`
- [x] Filtros valem para o mapa e mensagem sem resultado — entregue em `src/views/HomeView.vue:25` e `src/components/ScientistMap.vue:34`, provado em `HomeView.spec.ts:25` e `:35`
- [x] Sem lista de cards na página inicial — provado em `HomeView.spec.ts:21`; `ScientistList` removido sem deixar import
- [ ] Nome no foco e fluxo só com teclado — não verificável por esta revisão; depende do teste manual da humana

## Achados

### src/components/ScientistMap.vue
- **Warning** `ScientistMap.vue:132` — o nome do marcador fica escondido com `clip-path` até o foco ou o mouse. Para leitor de tela está certo (o texto continua no botão), mas em tela de toque não há hover. Correção sugerida, fora deste plano: mostrar o nome também em `:active` ou uma legenda abaixo do mapa.
- **Note** `ScientistMap.vue:33` — a imagem do mapa tem `alt=""` porque é decorativa: a informação está nos botões. Correto pela regra 2.
- **Note** — nenhum `any`, nenhum `v-html`, nenhuma dependência nova. As cientistas vêm por prop, sem cópia local (regra 5).

### src/components/ScientistPopup.vue
- **Note** `ScientistPopup.vue:25` — o Tab preso considera só `button` e `a[href]`. Basta para o conteúdo atual do card; se o card ganhar outro elemento focável, a lista precisa crescer.

### Testes
- **Note** — os testes de foco usam `attachTo: document.body` e desmontam o componente no `afterEach`, o que evita vazamento entre testes.
