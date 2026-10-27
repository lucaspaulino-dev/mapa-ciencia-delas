import type { Birthplace } from '@/types/scientist.type'

/** Posição de um ponto sobre o mapa-múndi equirretangular, em porcentagem da imagem. */
// type, e não interface, para ser aceito direto no :style do Vue.
export type MapPosition = {
  left: string
  top: string
}

/**
 * Converte latitude e longitude na posição do marcador, com a conta do requisito RF-04
 * (projeção equirretangular).
 */
export function toMapPosition({ lat, lng }: Pick<Birthplace, 'lat' | 'lng'>): MapPosition {
  const x = ((lng + 180) / 360) * 100
  const y = ((90 - lat) / 180) * 100
  return { left: `${Number(x.toFixed(2))}%`, top: `${Number(y.toFixed(2))}%` }
}
