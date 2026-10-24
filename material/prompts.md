# Prompts do curso, etapa por etapa

Todos os prompts seguem a mesma estrutura, que é o próprio método do curso:

- **Objetivo:** o que deve existir no fim.
- **Contexto:** os arquivos que o agente precisa ler.
- **Restrições:** o que não pode acontecer.
- **Pronto quando:** como saber que terminou.
- **Verifique:** o comando que prova.

Copie o prompt inteiro. Ao fim de cada etapa, faça um commit: `git add -A && git commit -m "etapa N: <resumo>"`.

Ficou para trás? `npm run etapa -- <número>` leva você ao ponto de controle daquela etapa sem perder o seu trabalho.

## Antes de começar: qual modelo você está usando?

Cada pessoa escolhe o próprio modelo. Dentro do OpenCode, digite `/models` para ver e trocar. O modelo precisa suportar *tool calling*; modelos muito pequenos ou locais costumam errar ao chamar ferramentas e em tarefas de várias etapas. Anote o modelo: no fim do curso vamos comparar resultados e custos da turma.

---

## Etapa 1: o primeiro componente (Módulo "Prática: observar o agente")

Agente: **build** (o padrão). Abra com `opencode` na raiz do projeto.

```text
Objetivo: criar o componente ScientistCard, que exibe uma cientista, e mostrá-lo na página inicial.

Contexto:
- O tipo Cientista está em src/types/cientista.type.ts e os dados em src/data/cientistas.ts.
- A regra 4 de docs/regras-de-negocio.md descreve o que o card mostra.
- Variáveis de cor e a classe .u-visually-hidden estão em src/assets/base.css.

Faça:
1. src/components/ScientistCard.vue com <script setup lang="ts"> e uma prop `cientista` do tipo Cientista, documentada com JSDoc. Não desestruture o retorno de defineProps.
2. HTML semântico: <article>; nome em <h3>; área com rótulo legível ("computacao" vira "Computação"); país; período ("1815–1852", ou "nascida em 1955" se não houver falecimento); contribuição; <img> só se a cientista tiver imagem, com o alt dos dados; link "Saiba mais" para a primeira fonte, abrindo em nova aba com rel="noopener noreferrer".
3. CSS scoped com nomes BEM (scientist-card__title etc.), usando as variáveis de base.css. Sem framework de CSS.
4. src/components/__tests__/ScientistCard.spec.ts com Vitest e @vue/test-utils.
5. Na src/views/HomeView.vue, mostre todas as cientistas com o card, dentro de uma <ul>.

Restrições: TypeScript estrito, sem any. Não instale dependências. Não altere src/types nem src/data.

Pronto quando: o teste verifica o nome no <h3>, a área com rótulo legível, o período e o href do link para a primeira fonte.

Verifique: rode npm run test:unit -- --run e npm run type-check e mostre as saídas.
Documentação: https://vuejs.org/guide/typescript/composition-api.html
```

Enquanto o agente trabalha, anote: o modelo (`/models`), cada ferramenta chamada, o uso de contexto subindo e se ele corrigiu sozinho algum erro de teste. Depois: `npm run dev` e veja o resultado no navegador.

Para provar o loop: `opencode session list` e `opencode export <id> --sanitize > sessao.json`. Cada parte `step-start` no JSON é uma nova chamada ao modelo; cada parte `tool` é uma chamada de ferramenta.

---

## Etapa 2: contexto que vale para toda tarefa (Módulo "AGENTS.md")

No OpenCode, rode `/init`. Leia o `AGENTS.md` gerado e depois peça:

```text
Objetivo: deixar o AGENTS.md curto e útil para qualquer tarefa neste projeto.

Contexto: AGENTS.md, docs/regras-de-negocio.md, package.json.

Faça: garanta que o AGENTS.md tenha, nesta ordem e em menos de 40 linhas:
1. Stack: Vue 3, TypeScript estrito, Pinia, Vue Router, Vitest. Sem bibliotecas de UI nem de CSS.
2. Regras de negócio: apontar docs/regras-de-negocio.md (sem copiar o conteúdo).
3. Convenções: componentes em inglês e PascalCase; domínio (tipos, dados, store) em português; tipos em src/types/<nome>.type.ts; dados e filtros em useCientistasStore; CSS scoped com BEM; imports com @/.
4. Antes de concluir qualquer tarefa: npm run verificar.
5. Testes: rode com npm run test:unit -- --run (sem --run o Vitest fica em modo watch).
6. Proibido: any; adicionar dependência sem perguntar; editar docs/regras-de-negocio.md.

Restrições: não repita o que já está nas regras de negócio. Remova o que não vale para toda tarefa.

Pronto quando: o arquivo tem as 6 seções e menos de 40 linhas.
```

Revise à mão o resultado. Regra de bolso: o que vale para toda tarefa fica no AGENTS.md; o que vale só para alguns tipos de tarefa vira skill.

---

## Etapa 3: conhecimento sob demanda (Módulo "Skills")

Instale a skill do projeto:

```bash
mkdir -p .opencode/skills
cp -r material/skills/qualidade-vue .opencode/skills/
```

Abra `.opencode/skills/qualidade-vue/SKILL.md`, leia e **acrescente uma regra sua** no fim da lista. Reinicie o OpenCode e, numa sessão nova:

```text
Revise o src/components/ScientistCard.vue e liste os problemas por severidade (Blocker, Warning, Note), com arquivo e linha. Não edite nada ainda.
```

Observe na tela o bloco da ferramenta `skill`: o agente carregou a skill sozinho, porque a descrição dela diz quando usar. Depois:

```text
Corrija só os itens Blocker da sua revisão, um por vez, e rode npm run verificar no fim.
```

Demonstração (instrutor): skills de terceiros, como `npx skills@latest add mattpocock/skills --skill=grill-me`. Leia sempre o SKILL.md de terceiros antes de usar: skills podem conter scripts.

---

## Etapa 4: você no controle (Módulo "Human-in-the-loop")

Ative as permissões do projeto e o plugin de verificação:

```bash
cp material/opencode.json .
mkdir -p .opencode/plugins
cp material/plugins/verificar-edicao.ts .opencode/plugins/
```

Reinicie o OpenCode. Agora toda edição pede aprovação, e o plugin roda o lint depois de cada edição e devolve o erro ao agente. Prompt é sugestão; permissão e plugin são garantia.

Aperte **Tab** até o agente **plan** e peça:

```text
Objetivo: planejar a store Pinia que vai guardar as cientistas e os filtros. Não implemente nada ainda.

Contexto: docs/regras-de-negocio.md (regras 3 e 5), src/types/cientista.type.ts, src/data/cientistas.ts, src/views/HomeView.vue.

O plano precisa cobrir:
1. src/stores/cientistas.ts com useCientistasStore no formato setup store: a lista; os filtros (busca, área, país); a lista filtrada; os países e as áreas disponíveis; ações para mudar e limpar cada filtro; e buscar uma cientista por id.
2. A busca por nome não diferencia maiúsculas, minúsculas nem acentos ("johanna dob" encontra "Johanna Döbereiner").
3. src/stores/__tests__/cientistas.spec.ts cobrindo cada filtro, a combinação deles e a busca sem acento.
4. A HomeView passa a ler as cientistas da store, não mais de src/data.

Pronto quando: o plano lista os arquivos, o que cada um faz e o teste que prova cada comportamento. Mostre o plano e espere o meu OK.
```

Leia o plano. Se concordar, aperte **Tab** até o **build** e peça:

```text
Implemente o plano aprovado acima, um arquivo por vez, começando pelo teste da store. Rode npm run test:unit -- --run depois de cada arquivo e npm run verificar no fim.
```

Aprove ou recuse cada edição quando ela aparecer. Recuse ao menos uma e veja como o agente reage.

---

## Etapa 5: o plano da listagem (Módulo "Multiagentes": Arquiteta)

Instale as agentes do time:

```bash
mkdir -p .opencode/agents
cp material/agents/arquiteta.md material/agents/coder.md material/agents/reviewer.md .opencode/agents/
```

Reinicie o OpenCode. Aperte **Tab** até a **arquiteta**:

```text
Quero que a página inicial vire a listagem do Mapa: um campo de busca por nome, um filtro por área, um filtro por país e a lista de cards. Quando nenhuma cientista combinar com os filtros, uma mensagem avisa. Quem usa leitor de tela precisa saber quantas cientistas estão sendo mostradas. Faça o plano.
```

Responda às perguntas dela, se houver. Antes de aprovar, use as quatro perguntas de `material/revisao-do-plano.md`. Edite o `docs/plano-de-acao.md` à mão se discordar de algo.

---

## Etapa 6: a execução (Módulo "Multiagentes": Coder)

Aperte **Tab** até a **coder** e execute um item por vez:

```text
Execute o item 1 do docs/plano-de-acao.md.
```

Leia o relatório dela, confira o diff (`git diff`) e só então peça o próximo item. Ao final, rode você mesma `npm run verificar`. Se der erro, cole a saída crua para a coder, sem explicar nada. Depois abra `npm run dev` e navegue pela listagem **só com o teclado**.

---

## Etapa 7: a revisão (Módulo "Multiagentes": Reviewer)

Ainda com a coder (ou no build), chame a revisora com contexto limpo:

```text
@reviewer Revise as mudanças ainda não commitadas da listagem contra o docs/plano-de-acao.md.
```

Leia `docs/revisao.md`. Se o veredito for REPROVADO, aperte **Tab** até a **coder**:

```text
Corrija os Blockers de docs/revisao.md, um por vez, e rode npm run verificar no fim.
```

Chame a reviewer de novo. Quando vier APROVADO, faça o commit.

---

## Etapa 8: orquestração automática (demonstração com medição)

```bash
cp material/agents/maestra.md .opencode/agents/
```

Antes, anote o custo até agora: `opencode stats`. Aperte **Tab** até a **maestra**:

```text
Quero uma página de detalhe da cientista em /cientistas/:id, aberta ao clicar no nome dela no card. A página mostra todos os dados, todas as fontes e um link para voltar à listagem. Se o id não existir, mostra uma mensagem de "cientista não encontrada".
```

Acompanhe as sessões filhas de cada subagente e os pontos em que ela para e pede aprovação. No fim, rode `opencode stats` de novo e compare com o custo de quando **você** orquestrou a listagem nas etapas 5 a 7.

---

## Etapa 9: ferramentas externas (Módulo "MCP")

Acrescente ao `opencode.json`, no mesmo nível de `"permission"`:

```json
"mcp": {
  "context7": { "type": "remote", "url": "https://mcp.context7.com/mcp", "enabled": true },
  "playwright": { "type": "local", "command": ["npx", "@playwright/mcp@latest"], "enabled": true }
}
```

Reinicie o OpenCode e confira com `opencode mcp list`.

```text
Usando o context7, confira na documentação atual do Pinia como tipar uma setup store e diga se src/stores/cientistas.ts segue essa recomendação. Não edite nada; só relate.
```

Demonstração (instrutor), com `npm run dev` rodando em outro terminal:

```text
Com o playwright, abra http://localhost:5173 e navegue pela página usando só a tecla Tab. Relate a ordem de foco, qualquer elemento que não receba foco e qualquer foco invisível. Não edite nada.
```

---

## Fechamento: quanto custou a noite?

```bash
opencode stats --models
```

Anote o modelo, os tokens e o custo, e se a reviewer aprovou a sua listagem. Vamos comparar a turma.
