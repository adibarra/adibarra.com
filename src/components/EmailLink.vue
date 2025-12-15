<script setup lang="ts">
import { siteConfig } from '~/config'

const props = withDefaults(defineProps<{
  to?: string
}>(), {
  to: siteConfig.email,
})
</script>

<template>
  <span class="text-nowrap text--c-text">
    <div class="i-carbon:email relative top-1 flex-inline" aria-hidden="true" />
    <a
      :href="`mailto:${props.to}`"
      class="ml-1"
    >
      {{ props.to }}
    </a>
  </span>
</template>
