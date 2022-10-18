<script setup lang="ts">
useHead({
  meta: [
    { property: 'og:title', content: 'Alec Ibarra' },
    { property: 'og:image', content: 'https://adibarra.com/og-icon.png' },
    { name: 'description', content: 'Alec Ibarra\'s personal website, blog, and portfolio.' },
    { name: 'twitter:card', content: 'summary' },
  ],
})
</script>

<template>
  <NavBar />
  <main class="px-7 py-10">
    <router-view />
    <Footer />
  </main>
</template>
