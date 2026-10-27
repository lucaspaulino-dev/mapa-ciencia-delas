import { Plugin } from '@opencode/plugin'
import { execFile } from 'node:child_process'

// Depois de cada edição de .vue/.ts, roda o lint só no arquivo editado e devolve o
// resultado para o agente na própria resposta da ferramenta. Instrução no prompt é
// sugestão; isto acontece sempre, com qualquer modelo.

const EXTENSOES = /\.(vue|ts)$/
const FERRAMENTAS_QUE_EDITAM = new Set(['edit', 'write', 'patch'])
const falhasSeguidas = new Map<string, number>()

type EntradaDeEdicao = { path?: unknown; patchText?: unknown }
type Execucao = { codigo: number; saida: string }
type Conteudo = string | ReadonlyArray<{ type: 'text'; text: string } | { type: 'file'; uri: string; mime: string }>

function arquivosEditados(entrada: EntradaDeEdicao): string[] {
  if (typeof entrada.path === 'string') return [entrada.path]
  const patch = String(entrada.patchText ?? '')
  return [...patch.matchAll(/^\*\*\* (?:Add|Update) File: (.+)$/gm)].map((m) => (m[1] ?? '').trim())
}

function rodar(comando: string, arquivo: string, cwd: string): Promise<Execucao> {
  return new Promise((resolve) => {
    execFile(comando, [arquivo], { cwd }, (erro, stdout, stderr) => {
      resolve({ codigo: erro ? 1 : 0, saida: `${stdout}${stderr}`.trim() })
    })
  })
}

function comAviso(conteudo: Conteudo | undefined, aviso: string): Conteudo {
  if (conteudo === undefined) return aviso
  if (typeof conteudo === 'string') return conteudo + aviso
  return [...conteudo, { type: 'text', text: aviso }]
}

export default Plugin.define({
  id: 'verificar-edicao',
  async setup(ctx) {
    const directory = ctx.location.directory
    const bin = (nome: string) => `${directory}/node_modules/.bin/${nome}`

    await ctx.tool.hook('execute.after', async (event) => {
      if (event.status !== 'completed' || !FERRAMENTAS_QUE_EDITAM.has(event.tool)) return

      const arquivos = arquivosEditados((event.input ?? {}) as EntradaDeEdicao).filter((f) => EXTENSOES.test(f))
      let aviso = ''

      for (const arquivo of arquivos) {
        const oxlint = await rodar(bin('oxlint'), arquivo, directory)
        const eslint = await rodar(bin('eslint'), arquivo, directory)
        const chave = `${event.sessionID}:${arquivo}`

        if (oxlint.codigo === 0 && eslint.codigo === 0) {
          falhasSeguidas.delete(chave)
          continue
        }

        const vezes = (falhasSeguidas.get(chave) ?? 0) + 1
        falhasSeguidas.set(chave, vezes)

        const relatorio = [oxlint, eslint]
          .filter((r) => r.codigo !== 0)
          .map((r) => r.saida)
          .join('\n')

        aviso += `\n\n[verificar-edicao] O lint reprovou ${arquivo}. Corrija antes de seguir:\n${relatorio}`

        if (vezes >= 3) {
          aviso +=
            '\n[verificar-edicao] Terceira falha seguida neste arquivo. Pare de corrigir o sintoma: ' +
            'explique à humana o que tentou e por que cada tentativa falhou antes de editar de novo.'
        }
      }

      if (aviso) event.result = { ...event.result, content: comAviso(event.result.content, aviso) }
    })
  },
})
