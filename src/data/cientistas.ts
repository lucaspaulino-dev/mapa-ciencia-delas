import type { Cientista } from '@/types/cientista.type'

export const cientistas: Cientista[] = [
  {
    id: 'ada-lovelace',
    nome: 'Ada Lovelace',
    area: 'matematica',
    pais: 'Reino Unido',
    periodo: { nascimento: 1815, falecimento: 1852 },
    localNascimento: { cidade: 'Londres, Inglaterra', lat: 51.51, lng: -0.14 },
    contribuicao:
      'Autora, em 1843, do primeiro algoritmo publicado destinado a uma máquina, nas notas sobre a Máquina Analítica de Charles Babbage.',
    fontes: [
      { titulo: 'Britannica: Ada Lovelace', url: 'https://www.britannica.com/biography/Ada-Lovelace' },
    ],
  },
  {
    id: 'grace-hopper',
    nome: 'Grace Hopper',
    area: 'computacao',
    pais: 'Estados Unidos',
    periodo: { nascimento: 1906, falecimento: 1992 },
    localNascimento: { cidade: 'Nova York, Estados Unidos', lat: 40.71, lng: -74.01 },
    contribuicao:
      'Programou o Harvard Mark I, liderou a equipe do A-0, considerado o primeiro compilador, e o FLOW-MATIC, base do COBOL.',
    fontes: [
      { titulo: 'Britannica: Grace Hopper', url: 'https://www.britannica.com/biography/Grace-Hopper' },
    ],
  },
  {
    id: 'bertha-lutz',
    nome: 'Bertha Lutz',
    area: 'biologia',
    pais: 'Brasil',
    periodo: { nascimento: 1894, falecimento: 1976 },
    localNascimento: { cidade: 'São Paulo, Brasil', lat: -23.55, lng: -46.63 },
    contribuicao:
      'Zoóloga do Museu Nacional, especialista em anfíbios. Descreveu espécies de rãs brasileiras e tem quatro espécies de rãs com o seu nome.',
    fontes: [{ titulo: 'Wikipedia: Bertha Lutz', url: 'https://en.wikipedia.org/wiki/Bertha_Lutz' }],
  },
  {
    id: 'johanna-dobereiner',
    nome: 'Johanna Döbereiner',
    area: 'biologia',
    pais: 'Brasil',
    periodo: { nascimento: 1924, falecimento: 2000 },
    localNascimento: { cidade: 'Ústí nad Labem, Tchecoslováquia', lat: 50.66, lng: 14.03 },
    contribuicao:
      'Pioneira da fixação biológica de nitrogênio na Embrapa. Sua pesquisa permitiu que a soja brasileira dispensasse adubo nitrogenado.',
    fontes: [
      {
        titulo: 'Revista Pesquisa FAPESP: Mudança na produção',
        url: 'https://revistapesquisa.fapesp.br/mudanca-na-producao/',
      },
      {
        titulo: 'Wikipedia: Johanna Döbereiner',
        url: 'https://en.wikipedia.org/wiki/Johanna_D%C3%B6bereiner',
      },
    ],
  },
]
