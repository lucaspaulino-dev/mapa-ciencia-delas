// Pula para o ponto de controle de uma etapa do curso sem perder o seu trabalho.
// Uso: npm run etapa            (lista as etapas)
//      npm run etapa -- 5       (vai para a etapa 5)
import { execSync } from 'node:child_process'

const git = (args, opts = {}) =>
  execSync(`git ${args}`, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], ...opts }).trim()

const tentar = (args) => {
  try {
    return { ok: true, saida: git(args) }
  } catch (erro) {
    return { ok: false, saida: String(erro.stderr || erro.message).trim() }
  }
}

const listar = () => {
  const etapas = tentar('tag -l "etapa-*" -n1 --sort=version:refname')
  if (!etapas.ok || !etapas.saida) {
    console.log('Nenhuma etapa encontrada. Rode: git fetch --tags origin')
    return
  }
  console.log('Etapas disponíveis:\n')
  console.log(etapas.saida)
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

const tag = `etapa-${numero}`

if (!tentar(`rev-parse -q --verify refs/tags/${tag}`).ok) {
  console.log(`Buscando ${tag} no GitHub...`)
  tentar('fetch --tags origin')
  if (!tentar(`rev-parse -q --verify refs/tags/${tag}`).ok) {
    console.error(`A etapa ${numero} não existe. Veja a lista com: npm run etapa`)
    process.exit(1)
  }
}

const ramoAtual = tentar('branch --show-current').saida || 'HEAD'
const alterado = tentar('status --porcelain').saida !== ''
let guardadoNoStash = false

if (alterado) {
  tentar('add -A')
  const commit = tentar(`commit -m "wip: meu trabalho antes de pular para a ${tag}"`)
  if (!commit.ok) {
    const stash = tentar(`stash push -u -m "antes de pular para a ${tag}"`)
    if (!stash.ok) {
      console.error('Não consegui guardar o seu trabalho. Nada foi alterado.\n' + stash.saida)
      process.exit(1)
    }
    guardadoNoStash = true
  }
}

const hora = new Date().toTimeString().slice(0, 5).replace(':', '')
const novoRamo = `${tag}-${hora}`
const troca = tentar(`switch -c ${novoRamo} ${tag}`)

if (!troca.ok) {
  console.error(`Não consegui ir para a ${tag}:\n${troca.saida}`)
  process.exit(1)
}

console.log(`Pronto: você está na ${tag}, no ramo ${novoRamo}.`)
if (guardadoNoStash) {
  console.log('Seu trabalho anterior foi guardado no stash. Para recuperar: git stash list e git stash pop')
} else if (alterado) {
  console.log(`Seu trabalho anterior foi salvo num commit no ramo ${ramoAtual}.`)
}
console.log('Se o package.json mudou, rode npm install antes de continuar.')
