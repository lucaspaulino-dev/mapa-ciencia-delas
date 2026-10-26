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

/** Cidade onde a cientista nasceu, com coordenadas para o mapa-múndi. */
export interface LocalNascimento {
  /** Cidade e país como aparecem para quem visita, por exemplo "Londres, Inglaterra". */
  cidade: string
  /** Latitude em graus decimais, de -90 (sul) a 90 (norte). */
  lat: number
  /** Longitude em graus decimais, de -180 (oeste) a 180 (leste). */
  lng: number
}

export interface Periodo {
  nascimento: number
  falecimento?: number
}

export interface Cientista {
  id: string
  nome: string
  area: AreaCiencia
  /** País onde fez a contribuição; pode ser diferente do país de nascimento. */
  pais: string
  periodo: Periodo
  localNascimento: LocalNascimento
  contribuicao: string
  imagem?: { src: string; alt: string }
  fontes: [Fonte, ...Fonte[]]
  tags?: string[]
}
