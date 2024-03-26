<script setup lang="ts">
defineProps<{
  repo: string
  name?: string
}>()
</script>

<template>
  <span flex-inline items-center>
    <carbon-logo-github inline-block opacity-70 />
    <a
      :href="`https://github.com/${repo}`"
      target="_blank"
      ml-1 opacity-50
    >
      {{ name || (repo.startsWith('adibarra/') ? repo.slice(6) : repo) }}
    </a>
  </span>
</template>
