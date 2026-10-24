import type { Plugin } from '@opencode-ai/plugin'

// Depois de cada edição de .vue/.ts, roda o lint só no arquivo editado e devolve o
// resultado para o agente na própria resposta da ferramenta. Instrução no prompt é
// sugestão; isto acontece sempre, com qualquer modelo.

const EXTENSOES = /\.(vue|ts)$/
const FERRAMENTAS_QUE_EDITAM = new Set(['edit', 'write', 'multiedit', 'patch', 'apply_patch'])
const falhasSeguidas = new Map<string, number>()

type ArgsDeEdicao = { filePath?: unknown; patchText?: unknown; patch?: unknown }

function arquivosEditados(args: ArgsDeEdicao): string[] {
  if (typeof args.filePath === 'string') return [args.filePath]
  const patch = String(args.patchText ?? args.patch ?? '')
  return [...patch.matchAll(/^\*\*\* (?:Add|Update) File: (.+)$/gm)].map((m) => (m[1] ?? '').trim())
}

export const VerificarEdicao: Plugin = async ({ $, directory }) => {
  const bin = (nome: string) => `${directory}/node_modules/.bin/${nome}`

  return {
    'tool.execute.after': async (input, output) => {
      if (!FERRAMENTAS_QUE_EDITAM.has(input.tool)) return

      const arquivos = arquivosEditados(input.args ?? {}).filter((f) => EXTENSOES.test(f))

      for (const arquivo of arquivos) {
        const oxlint = await $`${bin('oxlint')} ${arquivo}`.cwd(directory).quiet().nothrow()
        const eslint = await $`${bin('eslint')} ${arquivo}`.cwd(directory).quiet().nothrow()
        const chave = `${input.sessionID}:${arquivo}`

        if (oxlint.exitCode === 0 && eslint.exitCode === 0) {
          falhasSeguidas.delete(chave)
          continue
        }

        const vezes = (falhasSeguidas.get(chave) ?? 0) + 1
        falhasSeguidas.set(chave, vezes)

        const relatorio = [oxlint, eslint]
          .filter((r) => r.exitCode !== 0)
          .map((r) => `${r.stdout.toString()}${r.stderr.toString()}`.trim())
          .join('\n')

        output.output += `\n\n[verificar-edicao] O lint reprovou ${arquivo}. Corrija antes de seguir:\n${relatorio}`

        if (vezes >= 3) {
          output.output +=
            '\n[verificar-edicao] Terceira falha seguida neste arquivo. Pare de corrigir o sintoma: ' +
            'explique à humana o que tentou e por que cada tentativa falhou antes de editar de novo.'
        }
      }
    },
  }
}
