import type { Scientist } from '@/types/scientist.type'

export const scientists: Scientist[] = [
  {
    id: 'ada-lovelace',
    name: 'Ada Lovelace',
    area: 'mathematics',
    country: 'Reino Unido',
    period: { birth: 1815, death: 1852 },
    birthplace: { city: 'Londres, Inglaterra', lat: 51.51, lng: -0.14 },
    contribution:
      'Autora, em 1843, do primeiro algoritmo publicado destinado a uma máquina, nas notas sobre a Máquina Analítica de Charles Babbage.',
    sources: [
      { title: 'Britannica: Ada Lovelace', url: 'https://www.britannica.com/biography/Ada-Lovelace' },
    ],
  },
  {
    id: 'grace-hopper',
    name: 'Grace Hopper',
    area: 'computing',
    country: 'Estados Unidos',
    period: { birth: 1906, death: 1992 },
    birthplace: { city: 'Nova York, Estados Unidos', lat: 40.71, lng: -74.01 },
    contribution:
      'Programou o Harvard Mark I, liderou a equipe do A-0, considerado o primeiro compilador, e o FLOW-MATIC, base do COBOL.',
    sources: [
      { title: 'Britannica: Grace Hopper', url: 'https://www.britannica.com/biography/Grace-Hopper' },
    ],
  },
  {
    id: 'bertha-lutz',
    name: 'Bertha Lutz',
    area: 'biology',
    country: 'Brasil',
    period: { birth: 1894, death: 1976 },
    birthplace: { city: 'São Paulo, Brasil', lat: -23.55, lng: -46.63 },
    contribution:
      'Zoóloga do Museu Nacional, especialista em anfíbios. Descreveu espécies de rãs brasileiras e tem quatro espécies de rãs com o seu nome.',
    sources: [{ title: 'Wikipedia: Bertha Lutz', url: 'https://en.wikipedia.org/wiki/Bertha_Lutz' }],
  },
  {
    id: 'johanna-dobereiner',
    name: 'Johanna Döbereiner',
    area: 'biology',
    country: 'Brasil',
    period: { birth: 1924, death: 2000 },
    birthplace: { city: 'Ústí nad Labem, Tchecoslováquia', lat: 50.66, lng: 14.03 },
    contribution:
      'Pioneira da fixação biológica de nitrogênio na Embrapa. Sua pesquisa permitiu que a soja brasileira dispensasse adubo nitrogenado.',
    sources: [
      {
        title: 'Revista Pesquisa FAPESP: Mudança na produção',
        url: 'https://revistapesquisa.fapesp.br/mudanca-na-producao/',
      },
      {
        title: 'Wikipedia: Johanna Döbereiner',
        url: 'https://en.wikipedia.org/wiki/Johanna_D%C3%B6bereiner',
      },
    ],
  },
]
