export type AreaCiencia =
  | 'computacao'
  | 'matematica'
  | 'fisica'
  | 'quimica'
  | 'biologia'
  | 'medicina'
  | 'engenharia'
  | 'outras'

export interface Fonte {
  titulo: string
  url: string
}

export interface Periodo {
  nascimento: number
  falecimento?: number
}

export interface Cientista {
  id: string
  nome: string
  area: AreaCiencia
  pais: string
  periodo: Periodo
  contribuicao: string
  imagem?: { src: string; alt: string }
  fontes: [Fonte, ...Fonte[]]
  tags?: string[]
}
