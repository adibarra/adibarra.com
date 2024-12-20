<script setup lang="ts">
defineProps<{
  to: string
}>()
</script>

<template>
  <span relative>
    <div i-carbon:email absolute top-0.5 text--c-text />
    <a
      :href="`mailto:${to}`"
      ml-5.5
    >
      {{ to }}
    </a>
  </span>
</template>
