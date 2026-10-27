import type { Community } from '@/types/community.type'

// Programas de incentivo citados no curso. A Women Who Code encerrou as atividades
// em abril de 2024 e por isso não está aqui.
export const communities: Community[] = [
  {
    name: 'PrograMaria',
    focus: 'Formação e comunidade para mulheres na tecnologia',
    url: 'https://www.programaria.org',
  },
  {
    name: 'Laboratoria',
    focus: 'Bootcamps para mulheres na América Latina',
    url: 'https://laboratoria.la/pt/',
  },
  {
    name: 'PretaLab (Olabi)',
    focus: 'Mulheres negras e indígenas na tecnologia',
    url: 'https://olabi.org.br',
  },
  {
    name: 'WoMakersCode',
    focus: 'Bootcamps gratuitos em dados, IA, cloud e segurança',
    url: 'https://womakerscode.org',
  },
  {
    name: '{reprograma}',
    focus: 'Formação gratuita para mulheres cis e trans',
    url: 'https://reprograma.com.br',
  },
  {
    name: 'Minas Programam',
    focus: 'Introdução à programação feita por mulheres para mulheres',
  },
]
