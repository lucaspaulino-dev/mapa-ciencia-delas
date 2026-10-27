# Prompts do curso, etapa por etapa

## Roteiro

1. **`README.md`**: faça a seção "Antes da aula" (Node 24, Git, OpenCode 2, `npm install`). Só siga quando `npm run verificar` passar.
2. **`docs/regras-de-negocio.md` e `docs/requisitos.md`**: as regras (RN-01 a RN-04) valem sempre, e o agente também as segue. Os requisitos (RF-01 a RF-05) são seus: o agente não lê esse arquivo, cada prompt traz o requisito da etapa, e na etapa 10 você valida o produto contra todos eles.
3. **Este arquivo**: siga as etapas de 1 a 9, na ordem, com um commit no fim de cada uma.
4. **`material/revisao-do-plano.md`**: responda às quatro perguntas antes de aprovar o plano da arquiteta, nas etapas 5 e 8.

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
- O tipo Scientist está em src/types/scientist.type.ts e os dados em src/data/scientists.ts.
- Requisito RF-01: o card mostra nome (como título), área, país, período e contribuição; o link "Saiba mais" leva à primeira fonte e diz a quem se refere.
- Regras de negócio que valem sempre: docs/regras-de-negocio.md.
- Variáveis de cor e a classe .u-visually-hidden estão em src/assets/base.css.

Faça:
1. src/components/ScientistCard.vue com <script setup lang="ts"> e uma prop `scientist` do tipo Scientist, documentada com JSDoc. Não desestruture o retorno de defineProps.
2. HTML semântico: <article>; nome em <h3>; área com rótulo legível ("computing" vira "Computação"); país; período ("1815–1852", ou "nascida em 1955" se não houver falecimento); contribuição; <img> só se a cientista tiver imagem, com o alt dos dados; link "Saiba mais" para a primeira fonte, abrindo em nova aba com rel="noopener noreferrer".
3. CSS scoped com nomes BEM (scientist-card__title etc.), usando as variáveis de base.css. Sem framework de CSS.
4. src/components/__tests__/ScientistCard.spec.ts com Vitest e @vue/test-utils.
5. Na src/views/HomeView.vue, mostre todas as cientistas com o card, dentro de uma <ul>.

Restrições: TypeScript estrito, sem any. Não instale dependências. Não altere src/types nem src/data.

Pronto quando: o teste verifica o nome no <h3>, a área com rótulo legível, o período e o href do link para a primeira fonte.

Verifique: rode npm run test:unit -- --run e npm run type-check e mostre as saídas.
Documentação: https://vuejs.org/guide/typescript/composition-api.html
```

Enquanto o agente trabalha, anote: o modelo (`/models`), cada ferramenta chamada, o uso de contexto subindo e se ele corrigiu sozinho algum erro de teste. Depois: `npm run dev` e veja o resultado no navegador.

Para provar o loop: `opencode session list` e `opencode session export <id> --sanitize > sessao.json`. Em `messages`, cada item com `"type": "assistant"` é uma nova chamada ao modelo, e cada item de `content` com `"type": "tool"` é uma chamada de ferramenta. O loop continua enquanto `finish` é `"tool-calls"` e termina no `"stop"`.

---

## Etapa 2: contexto que vale para toda tarefa (Módulo "AGENTS.md")

No OpenCode, rode `/init`. Leia o `AGENTS.md` gerado e depois peça:

```text
Objetivo: deixar o AGENTS.md curto e útil para qualquer tarefa neste projeto.

Contexto: AGENTS.md, docs/regras-de-negocio.md, package.json.

Faça: garanta que o AGENTS.md tenha, nesta ordem e em menos de 40 linhas:
1. Stack: Vue 3, TypeScript estrito, Pinia, Vue Router, Vitest. Sem bibliotecas de UI nem de CSS.
2. Regras de negócio: apontar docs/regras-de-negocio.md (sem copiar o conteúdo).
3. Convenções: código em inglês (componentes em PascalCase, tipos, dados e store); textos visíveis em português; tipos em src/types/<nome>.type.ts; dados compartilhados numa store Pinia; CSS scoped com BEM; imports com @/.
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
Revise o src/components/ScientistCard.vue e liste os problemas por severidade (Blocker, Warning, Note), com arquivo e linha. Revise só o que o card precisa fazer hoje, sem sugerir mudanças para funcionalidades que ainda não existem. Não edite nada ainda.
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

Contexto: src/types/scientist.type.ts, src/data/scientists.ts, src/views/HomeView.vue.

Requisito RF-02: a página inicial permite buscar por nome e filtrar por área e por país; a busca não diferencia maiúsculas, minúsculas nem acentos.

Decisão técnica: os dados, a busca e os filtros ficam numa store Pinia, porque vários componentes usam os mesmos dados; nenhum componente guarda cópia da lista.

O plano precisa cobrir:
1. src/stores/scientists.ts com useScientistsStore no formato setup store: a lista; os filtros (busca, área, país); a lista filtrada; os países e as áreas disponíveis; ações para mudar e limpar cada filtro; e buscar uma cientista por id.
2. A busca por nome não diferencia maiúsculas, minúsculas nem acentos ("johanna dob" encontra "Johanna Döbereiner").
3. src/stores/__tests__/scientists.spec.ts cobrindo cada filtro, a combinação deles e a busca sem acento.
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
Quero que a página inicial vire a listagem do Mapa (requisitos RF-02 e RF-03): um campo de busca por nome, um filtro por área, um filtro por país e a lista de cards. Os filtros listam só valores que existem nos dados, e um botão "Limpar filtros" aparece só com filtro ativo. Uma região aria-live="polite" anuncia "1 cientista encontrada" ou "N cientistas encontradas". Sem resultado, aparece "Nenhuma cientista encontrada com esses filtros.". Faça o plano e liste em "Requisitos atendidos" os IDs que ele cobre.
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

## Etapa 8: o mapa-múndi (Módulo "Multiagentes": segunda volta do time)

O mesmo fluxo das etapas 5 a 7, agora numa feature maior. Faça o commit da listagem antes de começar.

Aperte **Tab** até a **arquiteta**:

```text
Quero que um mapa-múndi substitua a lista de cards na página inicial (requisito RF-04): um marcador para cada cientista que passa pelos filtros, no local de nascimento dela. Ao clicar no marcador, abre um popup com o card da cientista. Cada marcador é um botão com o nome da cientista. O popup é um diálogo: o foco entra nele, Esc ou o botão "Fechar" o fecham, e o foco volta ao marcador. Os marcadores ficam numa lista (<ul>), para o leitor de tela anunciar quantas cientistas estão no mapa. Sem resultado nos filtros, o mapa mostra "Nenhuma cientista encontrada com esses filtros.". O desenho está em src/assets/world-map.svg, em projeção equirretangular: a posição do marcador é left = (lng + 180) / 360 e top = (90 - lat) / 180, em porcentagem da imagem, sem biblioteca de mapas. Faça o plano e liste em "Requisitos atendidos" os IDs que ele cobre.
```

Ela deve guardar o plano da listagem em `docs/planos/` antes de escrever o novo. Revise com as quatro perguntas de `material/revisao-do-plano.md` e aprove. Depois, **Tab** até a **coder**, um item por vez:

```text
Execute o item 1 do docs/plano-de-acao.md.
```

No fim, chame a revisora com contexto limpo (digite `@` e escolha **reviewer** na lista):

```text
@reviewer Revise as mudanças ainda não commitadas do mapa contra o docs/plano-de-acao.md.
```

Se vier REPROVADO, **Tab** até a **coder** e peça para corrigir os Blockers de `docs/revisao.md`, como na etapa 7. Depois teste você mesma, com `npm run dev`, só com o teclado: o Tab chega aos marcadores? Enter abre o popup? Esc fecha e o foco volta ao marcador?

**E a Maestra?** O arquivo `material/agents/maestra.md` mostra como seria uma agente que automatiza essas passagens. Ela fica como exemplo para discutir multiagentes; não vamos rodá-la. Pelo critério do módulo, ela não passa: só automatizaria o que você faz com três menções, e é dela que viria o custo extra.

---

## Etapa 9: ferramentas externas (Módulo "MCP")

Acrescente ao `opencode.json`, no mesmo nível de `"permissions"`:

```json
"mcp": {
  "servers": {
    "context7": { "type": "remote", "url": "https://mcp.context7.com/mcp" },
    "playwright": { "type": "local", "command": ["npx", "@playwright/mcp@latest"] }
  }
}
```

Reinicie o OpenCode e confira com `opencode mcp list`.

```text
Usando o context7, confira na documentação atual do Pinia como tipar uma setup store e diga se src/stores/scientists.ts segue essa recomendação. Não edite nada; só relate.
```

Demonstração (instrutor), com `npm run dev` rodando em outro terminal:

```text
Com o playwright, abra http://localhost:5173 e navegue pela página só com o teclado: Tab até um marcador do mapa, Enter para abrir o popup, Esc para fechar. Relate a ordem de foco, qualquer elemento que não receba foco, qualquer foco invisível e se o foco volta ao marcador depois de fechar o popup. Não edite nada.
```

---

## Etapa 10: a auditoria (Módulo "Validação")

Os testes verificam se o código faz o que o teste diz. Só você valida se o produto faz o que os requisitos pedem. Instale a auditora, a única agente que lê `docs/requisitos.md`:

```bash
cp material/agents/auditora.md .opencode/agents/
```

Digite `@` e escolha **auditora** na lista:

```text
@auditora Audite o projeto contra docs/requisitos.md e docs/regras-de-negocio.md e grave a matriz em docs/auditoria.md.
```

Leia `docs/auditoria.md` linha por linha. Para cada requisito, abra o arquivo e o teste citados e confirme você mesma. A auditora aponta; quem decide se o produto está pronto é você.

---

## Etapa 10: a auditoria (Módulo "Validação")

Os testes verificam se o código faz o que o teste diz. Só você valida se o produto faz o que os requisitos pedem. Instale a auditora, a única agente que lê `docs/requisitos.md`:

```bash
cp material/agents/auditora.md .opencode/agents/
```

Digite `@` e escolha **auditora** na lista:

```text
@auditora Audite o projeto contra docs/requisitos.md e docs/regras-de-negocio.md e grave a matriz em docs/auditoria.md.
```

Leia `docs/auditoria.md` linha por linha. Para cada requisito, abra o arquivo e o teste citados e confirme você mesma. A auditora aponta; quem decide se o produto está pronto é você.

---

## Fechamento: quanto custou a noite?

```bash
opencode stats --models
```

Anote o modelo, os tokens, o custo, se a reviewer aprovou a sua listagem e o seu mapa, e quantos critérios a auditoria marcou como "Atende". Vamos comparar a turma.
