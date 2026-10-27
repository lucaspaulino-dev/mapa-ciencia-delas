# Requisitos: Mapa Ciência Delas

Este arquivo é seu, não do agente: ele não consegue ler. Cada prompt traz o requisito da etapa, e a auditoria da etapa 10 confere todos. As regras que valem sempre estão em `docs/regras-de-negocio.md` (RN-01 a RN-04).

O Mapa Ciência Delas mostra, num mapa-múndi, mulheres que mudaram a ciência e a tecnologia, com informação correta, fonte para cada fato e interface acessível.

## RF-01 Card da cientista · etapa 1

O card mostra nome (como título), área, país, período e contribuição; o link "Saiba mais" leva à primeira fonte e diz a quem se refere.

- O nome aparece como título do card.
- A área aparece com rótulo legível ("computing" vira "Computação").
- O período aparece como "1815–1852", ou "nascida em 1955" quando não há falecimento.
- O link "Saiba mais" leva à primeira fonte, abre em nova aba com `rel="noopener noreferrer"` e diz, para leitor de tela, de quem é a fonte.

## RF-02 Busca e filtros · etapas 4 a 6

A página inicial permite buscar por nome e filtrar por área e por país; a busca não diferencia maiúsculas, minúsculas nem acentos.

- "johanna dob" encontra "Johanna Döbereiner".
- Os filtros de área e de país listam só valores que existem nos dados.
- Busca e filtros funcionam combinados.
- Um botão "Limpar filtros" aparece só com filtro ativo e volta ao conjunto completo.

## RF-03 Resultado anunciado · etapas 5 e 6

Quem usa leitor de tela sabe quantas cientistas estão sendo mostradas, e um aviso aparece quando nenhuma combina com a busca e os filtros.

- Uma região `aria-live="polite"` anuncia "1 cientista encontrada" ou "N cientistas encontradas".
- Sem resultado, aparece "Nenhuma cientista encontrada com esses filtros."

## RF-04 Mapa-múndi · etapa 8

O mapa-múndi mostra um marcador para cada cientista que passa pela busca e pelos filtros, no local de nascimento dela, e abre o card num popup.

- Cada marcador é um botão com o nome da cientista, no local de nascimento.
- Ativar o marcador abre um popup com papel de diálogo e o card da cientista; o foco vai para dentro do popup.
- Esc ou o botão "Fechar" fecham o popup, e o foco volta ao marcador.
- Os marcadores ficam numa lista (`<ul>`), para o leitor de tela anunciar quantas cientistas estão no mapa.
- O desenho é `src/assets/world-map.svg`, em projeção equirretangular (1000 × 500): a posição é `left = (lng + 180) / 360` e `top = (90 - lat) / 180`, em porcentagem da imagem, sem biblioteca de mapas.

## RF-05 Continue a história · etapa 0

Uma página "Continue a história", no menu ao lado de Início, lista programas de incentivo para mulheres na tecnologia.

- O menu tem os links "Início" e "Continue a história".
- Cada programa mostra nome, foco e link para o site, que abre em nova aba e diz de quem é o site.

## Decisão técnica (não é requisito)

Os dados, a busca e os filtros ficam numa store Pinia, porque vários componentes usam os mesmos dados; nenhum componente guarda cópia da lista. Quem usa o Mapa não percebe essa escolha: ela é do time, não do produto.

## Fora do escopo

Página de detalhe, linha do tempo e modo escuro ficam para depois do curso.
