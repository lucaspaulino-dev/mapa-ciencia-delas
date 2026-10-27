# Regras de negócio: Mapa Ciência Delas

Regras que valem em qualquer etapa, para todas as pessoas e todos os agentes do projeto. RN-01, RN-02 e RN-04 são verificadas automaticamente em `src/data/__tests__/scientists.spec.ts`. O que cada funcionalidade deve fazer chega em cada pedido da humana.

- **RN-01** Toda cientista tem nome, área, país, período, local de nascimento (cidade, latitude e longitude), contribuição (até 280 caracteres) e ao menos uma fonte com URL `https`.
- **RN-02** Toda imagem tem texto alternativo descritivo (nunca apenas "foto").
- **RN-03** A interface segue a WCAG 2.2 nível AA: contraste mínimo, foco visível, navegação completa por teclado e rótulo em todo campo.
- **RN-04** Nenhuma informação biográfica sem fonte.

## Modelo de dados

O tipo `Scientist` está em `src/types/scientist.type.ts` e os dados em `src/data/scientists.ts`.
