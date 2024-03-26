<script setup lang="ts">
useHead({
  meta: [
    { property: 'og:title', content: 'Alec Ibarra' },
    { property: 'og:image', content: 'https://adibarra.com/og-icon.png' },
    { name: 'description', content: 'Alec Ibarra\'s personal website.' },
    { name: 'twitter:card', content: 'summary' },
  ],
})
</script>

<template>
  <RouterView />
</template>
