<script setup lang="ts">
defineProps<{
  repo: string
}>()
</script>

<template>
  <span relative text-wrap>
    <div i-carbon:logo-github absolute top-0.5 text--c-text />
    <a
      :href="`https://github.com/${repo}`"
      target="_blank"
      rel="noopener"
      ml-5.5
    >
      {{ repo }}
    </a>
  </span>
</template>
