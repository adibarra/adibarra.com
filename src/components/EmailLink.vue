<script setup lang="ts">
import { siteConfig } from '~/config'

const props = withDefaults(defineProps<{
  to?: string
}>(), {
  to: siteConfig.email,
})
</script>

<template>
  <span text-nowrap text--c-text>
    <div i-carbon:email relative top-1 flex-inline />
    <a
      :href="`mailto:${props.to}`"
      ml-1
    >
      {{ props.to }}
    </a>
  </span>
</template>
