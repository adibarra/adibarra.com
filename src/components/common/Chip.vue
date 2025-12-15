<script setup lang="ts">
defineProps<{
  /** text label of the chip */
  label: string
}>()

defineEmits<{
  /** emitted when the remove button is clicked */
  (event: 'remove'): void
}>()
</script>

<template>
  <div
    :aria-label="label"
    class="w-fit flex gap-0.5 custom-outline border--c-inverse-2 rd-4 pl-3 pr-1"
  >
    <span class="my-auto text-base">{{ label }}</span>
    <button
      type="button"
      :aria-label="`Remove ${label}`"
      class="i-carbon:close my-auto custom-icon-btn"
      @click="$emit('remove')"
    />
  </div>
</template>
