# Regras de negócio: Mapa Ciência Delas

O Mapa Ciência Delas mostra cientistas num mapa-múndi, com informação correta, fontes verificáveis e interface acessível. Estas regras valem para todas as pessoas e todos os agentes que trabalham no projeto. As regras 1, 2 e 7 são verificadas automaticamente em `src/data/__tests__/cientistas.spec.ts`.

1. Toda cientista tem nome, área, país, período, local de nascimento (cidade, latitude e longitude), contribuição (até 280 caracteres) e ao menos uma fonte com URL `https`.
2. Toda imagem tem texto alternativo descritivo (nunca apenas "foto").
3. A página inicial permite buscar por nome e filtrar por área e por país; a busca não diferencia maiúsculas, minúsculas nem acentos.
4. O card mostra nome (como título), área, país, período e contribuição; o link "Saiba mais" leva à primeira fonte e diz a quem se refere.
5. Os dados e os filtros ficam na store Pinia `useCientistasStore`, porque vários componentes usam os mesmos dados; nenhum componente guarda cópia da lista.
6. A interface segue a WCAG 2.2 nível AA: contraste mínimo, foco visível, navegação completa por teclado e rótulo em todo campo.
7. Nenhuma informação biográfica sem fonte.
8. O mapa-múndi mostra um marcador para cada cientista que passa pelos filtros, no local de nascimento dela. Cada marcador é um botão com o nome da cientista. Ao ativá-lo, abre um popup com o card dela, como diálogo: o foco vai para dentro do popup, Esc ou o botão "Fechar" o fecham, e o foco volta ao marcador. Os marcadores ficam numa lista (`<ul>`), para que o leitor de tela anuncie quantas cientistas estão no mapa. Sem resultado nos filtros, o mapa mostra a mensagem "Nenhuma cientista encontrada com esses filtros."

## Modelo de dados

O tipo `Cientista` está em `src/types/cientista.type.ts` e os dados em `src/data/cientistas.ts`.

## Mapa-múndi

O desenho do mapa já está em `src/assets/mapa-mundi.svg`, em projeção equirretangular (1000 × 500). Nessa projeção, a posição de um ponto é uma conta simples, em porcentagem da largura e da altura da imagem:

- horizontal: `(lng + 180) / 360`
- vertical: `(90 - lat) / 180`

Não é preciso biblioteca de mapas.

## Fora do escopo do MVP

Página de detalhe, linha do tempo e modo escuro são extras para depois do curso.
