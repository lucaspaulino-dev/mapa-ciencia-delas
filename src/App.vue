<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <a class="app__pular" href="#conteudo">Pular para o conteúdo</a>

  <header class="app__cabecalho">
    <RouterLink class="app__marca" to="/">Mapa Ciência Delas</RouterLink>
    <nav aria-label="Principal">
      <ul class="app__menu">
        <li><RouterLink to="/">Início</RouterLink></li>
      </ul>
    </nav>
  </header>

  <main id="conteudo" class="app__conteudo" tabindex="-1">
    <RouterView />
  </main>

  <footer class="app__rodape">
    <p>Projeto do mini curso "Do Prompt ao Produto": SNCT 2026, IFSP Campus Birigui.</p>
  </footer>
</template>

<style scoped>
.app__pular {
  position: absolute;
  left: var(--espaco);
  top: -3rem;
  padding: 0.5rem 1rem;
  background: var(--cor-primaria);
  color: #fff;
  border-radius: var(--raio);
}

.app__pular:focus {
  top: var(--espaco);
}

.app__cabecalho {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--espaco);
  padding: var(--espaco) calc(var(--espaco) * 2);
  background: var(--cor-superficie);
  border-bottom: 1px solid var(--cor-borda);
}

.app__marca {
  font-weight: 700;
  font-size: 1.25rem;
  text-decoration: none;
}

.app__menu {
  display: flex;
  gap: var(--espaco);
  margin: 0;
  padding: 0;
  list-style: none;
}

.app__conteudo {
  max-width: 72rem;
  margin: 0 auto;
  padding: calc(var(--espaco) * 2);
}

.app__rodape {
  padding: var(--espaco) calc(var(--espaco) * 2);
  color: var(--cor-texto-suave);
  font-size: 0.875rem;
  text-align: center;
}
</style>
