export type ScienceArea =
  | 'computing'
  | 'mathematics'
  | 'physics'
  | 'chemistry'
  | 'biology'
  | 'medicine'
  | 'engineering'
  | 'other'

export interface Source {
  title: string
  url: string
}

/** Cidade onde a cientista nasceu, com coordenadas para o mapa-múndi. */
export interface Birthplace {
  /** Cidade e país como aparecem para quem visita, por exemplo "Londres, Inglaterra". */
  city: string
  /** Latitude em graus decimais, de -90 (sul) a 90 (norte). */
  lat: number
  /** Longitude em graus decimais, de -180 (oeste) a 180 (leste). */
  lng: number
}

export interface Period {
  birth: number
  death?: number
}

export interface Scientist {
  id: string
  name: string
  area: ScienceArea
  /** País onde fez a contribuição; pode ser diferente do país de nascimento. */
  country: string
  period: Period
  birthplace: Birthplace
  contribution: string
  image?: { src: string; alt: string }
  sources: [Source, ...Source[]]
  tags?: string[]
}
