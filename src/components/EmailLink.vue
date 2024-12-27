<script setup lang="ts">
defineProps<{
  to: string
}>()
</script>

<template>
  <span text-nowrap text--c-text>
    <div i-carbon:email relative top-1 flex-inline />
    <a
      :href="`mailto:${to}`"
      ml-1
    >
      {{ to }}
    </a>
  </span>
</template>
