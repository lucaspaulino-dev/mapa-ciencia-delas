// Pula para o ponto de controle de uma etapa do curso sem perder o seu trabalho.
// Os pontos de controle são os ramos etapa-0 ... etapa-9 do repositório original.
// Uso: npm run etapa            (lista as etapas)
//      npm run etapa -- 5       (vai para a etapa 5)
import { execFileSync } from 'node:child_process'

// Argumentos em lista, sem shell: no Windows o cmd.exe trataria o ^ de ^{commit} como escape.
const git = (...args) =>
  execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim()

const tentar = (...args) => {
  try {
    return { ok: true, saida: git(...args) }
  } catch (erro) {
    return { ok: false, saida: String(erro.stderr || erro.message).trim() }
  }
}

const existe = (ref) => tentar('rev-parse', '-q', '--verify', `${ref}^{commit}`).ok

const localizar = (ramo) =>
  [`refs/remotes/origin/${ramo}`, `refs/heads/${ramo}`].find((ref) => existe(ref))

const DESCRICOES = [
  'projeto inicial: tipos, dados e regras de negócio como teste',
  'card de cientista com teste, na página inicial',
  'AGENTS.md do projeto',
  'skill qualidade-vue e card corrigido pela revisão',
  'store Pinia com busca e filtros; permissões e plugin ativos',
  'agentes do time e plano da listagem',
  'listagem implementada pela coder, item por item',
  'revisão da listagem e correção dos Blockers',
  'mapa-múndi com popup (arquiteta, coder e reviewer)',
  'MCP do Context7 e do Playwright',
]

const listar = () => {
  if (!existe('refs/remotes/origin/etapa-0')) tentar('fetch', 'origin')
  console.log('Etapas disponíveis:\n')
  DESCRICOES.forEach((descricao, n) => {
    const marca = localizar(`etapa-${n}`) ? ' ' : '?'
    console.log(`${marca} ${String(n).padStart(2)}  ${descricao}`)
  })
  console.log('\nPara ir a uma etapa: npm run etapa -- <número>')
}

const numero = process.argv[2]

if (numero === undefined) {
  listar()
  process.exit(0)
}

if (!/^\d+$/.test(numero)) {
  console.error(`"${numero}" não é um número de etapa. Exemplo: npm run etapa -- 5`)
  process.exit(1)
}

const etapa = `etapa-${numero}`
let ref = localizar(etapa)

if (!ref) {
  console.log(`Buscando a ${etapa} no GitHub...`)
  tentar('fetch', 'origin')
  ref = localizar(etapa)
  if (!ref) {
    console.error(`A etapa ${numero} não existe. Veja a lista com: npm run etapa`)
    process.exit(1)
  }
}

const ramoAtual = tentar('branch', '--show-current').saida || 'HEAD'
const alterado = tentar('status', '--porcelain').saida !== ''
let guardadoNoStash = false

if (alterado) {
  tentar('add', '-A')
  const commit = tentar('commit', '-m', `wip: meu trabalho antes de pular para a ${etapa}`)
  if (!commit.ok) {
    const stash = tentar('stash', 'push', '-u', '-m', `antes de pular para a ${etapa}`)
    if (!stash.ok) {
      console.error('Não consegui guardar o seu trabalho. Nada foi alterado.\n' + stash.saida)
      process.exit(1)
    }
    guardadoNoStash = true
  }
}

const hora = new Date().toTimeString().slice(0, 5).replace(':', '')
const novoRamo = `minha-${etapa}-${hora}`
const troca = tentar('switch', '-c', novoRamo, ref)

if (!troca.ok) {
  console.error(`Não consegui ir para a ${etapa}:\n${troca.saida}`)
  process.exit(1)
}

console.log(`Pronto: você está na ${etapa}, no ramo ${novoRamo}.`)
if (guardadoNoStash) {
  console.log('Seu trabalho anterior foi guardado no stash. Para recuperar: git stash list e git stash pop')
} else if (alterado) {
  console.log(`Seu trabalho anterior foi salvo num commit no ramo ${ramoAtual}.`)
}
console.log('Se o package.json mudou, rode npm install antes de continuar.')
