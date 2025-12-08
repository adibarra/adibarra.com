<script setup lang="ts">
import { siteConfig } from '~/config'
</script>

<template>
  <header z-40 text--c-text>
    <router-link
      to="/"
      focusable="false"
      absolute m-6 h-10 w-10 select-none outline-none lg:fixed
    >
      <img :src="`/favicon${isDark ? '-dark' : ''}.svg`" alt="favicon">
    </router-link>
    <nav flex flex-row items-center gap-5 p-8>
      <div grow />
      <router-link to="/" title="Home">
        <span lt-md:hidden>Home</span>
        <div i-carbon:home md:hidden />
      </router-link>
      <router-link to="/projects" title="Projects">
        <span lt-md:hidden>Projects</span>
        <div i-ri-code-s-slash-line md:hidden />
      </router-link>
      <!-- <router-link to="/posts" title="Blog">
        <span lt-md:hidden>Blog</span>
        <div i-ri-article-line md:hidden />
      </router-link> -->
      <router-link to="/resume" title="Resume">
        <span lt-md:hidden>Resume</span>
        <div i-uil-file-alt md:hidden />
      </router-link>
      <a :href="siteConfig.githubUrl" title="GitHub" target="_blank" rel="noopener">
        <div i-uil-github-alt />
      </a>
      <a :href="`mailto:${siteConfig.email}`" title="Email" target="_blank" rel="noopener">
        <div i-feather-mail />
      </a>
      <a
        title="Toggle Color Scheme"
        cursor-pointer
        @click="toggleTheme()"
      >
        <div i-ri-sun-line dark:i-ri-moon-line />
      </a>
    </nav>
  </header>
</template>

<style scoped>
nav a {
  transition: opacity 0.2s ease;
  opacity: 0.6;
}

nav a:hover {
  opacity: 1;
}
</style>
