<script setup lang="ts">
defineProps<{
  repo: string
}>()
</script>

<template>
  <span text-nowrap text--c-text>
    <div i-carbon:logo-github relative top-0.8 flex-inline />
    <a
      :href="`https://github.com/${repo}`"
      target="_blank"
      rel="noopener"
      ml-1
    >
      {{ repo }}
    </a>
  </span>
</template>
