# Checklist de acessibilidade (WCAG 2.2 AA)

Consulte quando estiver criando ou revisando interface. Cada item diz como verificar.

## Perceptível
- [ ] **Texto alternativo:** toda `<img>` tem `alt` vindo dos dados e descritivo; imagem decorativa usa `alt=""`. Verifica: inspecionar o atributo no teste do componente.
- [ ] **Contraste:** texto normal com contraste mínimo de 4,5:1; texto grande (24px, ou 18,66px em negrito) com 3:1; bordas de campo e ícones com 3:1. Verifica: DevTools > Accessibility > Contrast, ou o painel de contraste do navegador.
- [ ] **Informação não depende só de cor:** estado ativo, erro ou destaque também tem texto ou ícone.

## Operável
- [ ] **Teclado:** tudo que é clicável é alcançável com Tab e acionável com Enter ou Espaço, na ordem visual. Verifica: navegar a página inteira sem mouse.
- [ ] **Foco visível:** todo elemento interativo mostra o foco (o projeto define `:focus-visible` em `base.css`). Nunca `outline: none` sem substituto.
- [ ] **Tamanho do alvo:** botões e links com pelo menos 24 × 24 px (critério 2.5.8).
- [ ] **Pular para o conteúdo:** o link "Pular para o conteúdo" do `App.vue` continua funcionando.

## Compreensível
- [ ] **Rótulos:** todo campo com `<label for>`; o rótulo descreve o que digitar ou escolher.
- [ ] **Links com propósito claro:** o texto do link (somado ao conteúdo de `.u-visually-hidden`) diz o destino.
- [ ] **Idioma:** `index.html` com `lang="pt-BR"`.

## Robusto
- [ ] **Semântica antes de ARIA:** use o elemento certo (`<button>`, `<nav>`, `<ul>`) antes de recorrer a `role`.
- [ ] **Mudanças dinâmicas anunciadas:** resultado que muda sem recarregar a página em região `aria-live="polite"`.
- [ ] **Estado vazio:** quando nenhum resultado aparece, uma mensagem diz isso em texto.
