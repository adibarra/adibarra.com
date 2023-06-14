<script setup lang="ts">
import { isDark } from '~/logic'
</script>

<template>
  <header z-40>
    <router-link
      to="/"
      focusable="false"
      w-10 h-10 absolute lg:fixed m-6 select-none outline-none
    >
      <img v-if="isDark" src="/logo-dark.svg?url" alt="logo">
      <img v-else src="/logo.svg?url" alt="logo">
    </router-link>
    <nav class="nav">
      <div class="spacer" />
      <div class="right">
        <router-link to="/" title="Home">
          <span lt-md:hidden>Home</span>
          <div i-carbon-home md:hidden />
        </router-link>
        <router-link to="/projects" title="Projects">
          <span lt-md:hidden>Projects</span>
          <div i-ri-code-s-slash-line md:hidden />
        </router-link>
        <router-link to="/posts" title="Blog">
          <span lt-md:hidden>Blog</span>
          <div i-ri-article-line md:hidden />
        </router-link>
        <router-link to="/resume" title="Resume">
          <span lt-md:hidden>Resume</span>
          <div i-uil-file-alt md:hidden />
        </router-link>
        <a href="https://github.com/adibarra" title="GitHub" target="_blank" rel="noopener">
          <div i-uil-github-alt />
        </a>
        <a href="mailto://hello@adibarra.com" title="Email" target="_blank" rel="noopener">
          <div i-feather-mail />
        </a>
        <toggle-theme />
      </div>
    </nav>
  </header>
</template>

<style scoped>
.logo {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
}

.nav {
  padding: 2rem;
  width: 100%;
  display: grid;
  grid-template-columns: auto max-content;
  box-sizing: border-box;
}

.nav > * {
  margin: auto;
}

.nav img {
  margin-bottom: 0;
}

.nav a {
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  transition: opacity 0.2s ease;
  opacity: 0.6;
  outline: none;
}

.nav a:hover {
  opacity: 1;
  text-decoration-color: inherit;
}

.nav .right {
  display: grid;
  grid-gap: 1.2rem;
  grid-auto-flow: column;
}

.nav .right > * {
  margin: auto;
}
</style>
