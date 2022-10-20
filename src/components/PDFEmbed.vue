<script setup lang="ts">
import VuePdfEmbed from 'vue-pdf-embed'

defineProps<{
  path: string
}>()

defineComponent({
  components: {
    VuePdfEmbed,
  },
})
</script>

<template>
  <VuePdfEmbed :source="path" />
</template>
