import type { LocalNascimento } from '@/types/cientista.type'

/** Posição de um ponto sobre o mapa-múndi equirretangular, em porcentagem da imagem. */
// type, e não interface, para ser aceito direto no :style do Vue.
export type PosicaoNoMapa = {
  left: string
  top: string
}

/**
 * Converte latitude e longitude na posição do marcador, com a conta da seção
 * "Mapa-múndi" de docs/regras-de-negocio.md.
 */
export function projetar({ lat, lng }: Pick<LocalNascimento, 'lat' | 'lng'>): PosicaoNoMapa {
  const x = ((lng + 180) / 360) * 100
  const y = ((90 - lat) / 180) * 100
  return { left: `${Number(x.toFixed(2))}%`, top: `${Number(y.toFixed(2))}%` }
}
