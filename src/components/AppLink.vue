<script setup lang="ts">
const props = defineProps<{
  to: string
}>()

const isExternalLink = computed(() => props.to.startsWith('http'))
</script>

<template>
  <a
    v-if="isExternalLink"
    v-bind="$attrs"
    :href="to"
    target="_blank"
    rel="noopener"
  >
    <slot />
  </a>
  <router-link
    v-else
    v-bind="$props"
  >
    <slot />
  </router-link>
</template>
