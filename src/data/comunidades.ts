import type { Comunidade } from '@/types/comunidade.type'

// Programas de incentivo citados no curso. A Women Who Code encerrou as atividades
// em abril de 2024 e por isso não está aqui.
export const comunidades: Comunidade[] = [
  {
    nome: 'PrograMaria',
    foco: 'Formação e comunidade para mulheres na tecnologia',
    url: 'https://www.programaria.org',
  },
  {
    nome: 'Laboratoria',
    foco: 'Bootcamps para mulheres na América Latina',
    url: 'https://laboratoria.la/pt/',
  },
  {
    nome: 'PretaLab (Olabi)',
    foco: 'Mulheres negras e indígenas na tecnologia',
    url: 'https://olabi.org.br',
  },
  {
    nome: 'WoMakersCode',
    foco: 'Bootcamps gratuitos em dados, IA, cloud e segurança',
    url: 'https://womakerscode.org',
  },
  {
    nome: '{reprograma}',
    foco: 'Formação gratuita para mulheres cis e trans',
    url: 'https://reprograma.com.br',
  },
  {
    nome: 'Minas Programam',
    foco: 'Introdução à programação feita por mulheres para mulheres',
  },
]
