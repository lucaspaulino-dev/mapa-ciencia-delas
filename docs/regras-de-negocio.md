# Regras de negócio: Mapa Ciência Delas

O Mapa Ciência Delas lista cientistas com informação correta, fontes verificáveis e interface acessível. Estas regras valem para todas as pessoas e todos os agentes que trabalham no projeto. As regras 1, 2 e 7 são verificadas automaticamente em `src/data/__tests__/cientistas.spec.ts`.

1. Toda cientista tem nome, área, país, período, contribuição (até 280 caracteres) e ao menos uma fonte com URL `https`.
2. Toda imagem tem texto alternativo descritivo (nunca apenas "foto").
3. A listagem permite filtrar por área e por país e buscar por nome, sem diferenciar maiúsculas, minúsculas ou acentos.
4. O card mostra nome (como título), área, país, período e contribuição; o link "Saiba mais" leva à primeira fonte e diz a quem se refere.
5. Os dados e os filtros ficam na store Pinia `useCientistasStore`, porque são compartilhados entre a listagem e a página de detalhe; componentes não guardam cópia da lista.
6. A interface segue a WCAG 2.2 nível AA: contraste mínimo, foco visível, navegação completa por teclado e rótulo em todo campo.
7. Nenhuma informação biográfica sem fonte.

## Modelo de dados

O tipo `Cientista` está em `src/types/cientista.type.ts` e os dados em `src/data/cientistas.ts`.

## Fora do escopo do MVP

Mapa por país, linha do tempo e modo escuro são extras para depois do curso.
