# Mapa Ciência Delas

Projeto do mini curso **Do Prompt ao Produto: desenvolvendo com agentes de IA** (SNCT 2026, IFSP Campus Birigui).

O Mapa Ciência Delas lista mulheres que mudaram a ciência e a tecnologia, com informação correta, fonte para cada fato e interface acessível. Durante o curso, você constrói o Mapa com agentes de IA no [OpenCode](https://opencode.ai/docs), uma etapa por vez, sem abrir mão das decisões: a IA acelera o código; a arquitetura, a regra de negócio e a revisão continuam sendo suas.

## Antes da aula (obrigatório, cerca de 20 minutos)

1. **Node.js 24 LTS** (24.15 ou superior), em [nodejs.org](https://nodejs.org/en/download). Confira com `node -v`. Evite o Node 22: o npm 10 que vem com ele falhou ao instalar as dependências deste projeto.
2. **Git**: `git --version`.
3. **OpenCode v1**. No Windows, use o WSL.
   ```bash
   npm install -g opencode-ai@1
   opencode --version   # deve mostrar 1.x
   opencode auth login  # conecte o provedor do modelo que você vai usar
   ```
   Não rode `opencode upgrade --major`: ele troca o v1 pelo OpenCode 2, que ainda está em beta e usa outro formato de configuração.
4. **Escolha um modelo** com suporte a *tool calling*. Cada pessoa usa o seu; no fim vamos comparar resultados e custos.
5. **Clone e instale o projeto:**
   ```bash
   git clone https://github.com/lucaspaulino-dev/mapa-ciencia-delas.git
   cd mapa-ciencia-delas
   npm install
   npm run verificar   # type-check, testes e lint: tudo precisa passar
   npm run dev         # abre em http://localhost:5173
   ```

Use `git clone`: ele traz os pontos de controle de todas as etapas. Se preferir uma cópia na sua conta, use "Use this template" marcando **Include all branches** e clone a sua cópia.

## Etapas do curso

Cada etapa tem um ponto de controle (o ramo `etapa-N`) com a solução de referência. O ramo `solucao` é o projeto completo.

| Etapa | O que você constrói | Como |
|---|---|---|
| 0 | Projeto inicial: tipos, dados e regras de negócio como teste | já pronto neste repositório |
| 1 | O card de cientista e o teste dele | um prompt para o agente build |
| 2 | `AGENTS.md`: contexto que vale para toda tarefa | `/init` e revisão humana |
| 3 | Skill `qualidade-vue` revisando o card | skill carregada sob demanda |
| 4 | Store Pinia com busca e filtros | agente plan planeja, você aprova, build executa |
| 5 | Plano da listagem com aceite verificável | agente arquiteta |
| 6 | A listagem funcionando | agente coder, um item por vez |
| 7 | Revisão com contexto limpo | subagente reviewer |
| 8 | Mapa-múndi no lugar da lista: um marcador por cientista e popup com o card | o mesmo time: arquiteta, coder e reviewer |
| 9 | Documentação atual e teste de teclado | MCP: Context7 e Playwright |

Os prompts de cada etapa estão em [`material/prompts.md`](material/prompts.md).

## Ficou para trás?

```bash
npm run etapa          # lista as etapas
npm run etapa -- 5     # vai para o ponto de controle da etapa 5
```

O comando guarda o seu trabalho num commit no ramo em que você estava e cria um ramo novo (`minha-etapa-N-hhmm`) a partir do ponto de controle. Nada se perde.

Sem Git? Cada etapa também pode ser baixada em ZIP: `https://github.com/lucaspaulino-dev/mapa-ciencia-delas/archive/refs/heads/etapa-N.zip` (troque o N).

## Material de apoio

| Arquivo | Para quê |
|---|---|
| [`material/prompts.md`](material/prompts.md) | Os prompts de todas as etapas |
| [`material/agents/`](material/agents) | Arquiteta, Coder e Reviewer; a Maestra fica como exemplo de orquestração automática |
| [`material/skills/qualidade-vue/`](material/skills/qualidade-vue) | A skill de qualidade do projeto |
| [`material/plugins/verificar-edicao.ts`](material/plugins/verificar-edicao.ts) | Plugin que roda o lint depois de cada edição do agente |
| [`material/opencode.json`](material/opencode.json) | Permissões do projeto (Módulo Human-in-the-loop) |
| [`material/revisao-do-plano.md`](material/revisao-do-plano.md) | As 4 perguntas antes de aprovar um plano |
| [`docs/regras-de-negocio.md`](docs/regras-de-negocio.md) | As regras que todo o time segue |

## Comandos

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run verificar` | Type-check, testes e lint, sem corrigir nada sozinho |
| `npm run test:unit -- --run` | Só os testes, uma vez (sem `--run`, fica em modo watch) |
| `npm run lint` | Lint com correção automática |
| `npm run build` | Build de produção |
| `npm run etapa -- N` | Vai para o ponto de controle da etapa N |

## Como este projeto foi criado

```bash
npm create vue@latest mapa-ciencia-delas -- --ts --router --pinia --vitest --eslint-with-prettier --bare
```

Depois foram acrescentados `src/types`, `src/data`, `docs/regras-de-negocio.md`, os testes das regras e a pasta `material/`.
