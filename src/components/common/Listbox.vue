<script setup lang="ts">
const props = defineProps<{
  /** whether the dropdown is visible */
  show: boolean
  /** array of items to display */
  items: string[]
  /** index of the currently active/highlighted item */
  activeIndex?: number
}>()

defineEmits<{
  /** emitted when an item is selected */
  (event: 'update', selected: string): void
}>()

const listboxRef = ref<HTMLElement>()

watch(() => [props.activeIndex, props.show], () => {
  if (props.show && props.activeIndex !== undefined && listboxRef.value) {
    nextTick(() => {
      const activeElement = listboxRef.value?.children[props.activeIndex!] as HTMLElement
      if (activeElement) {
        activeElement.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth',
        })
      }
    })
  }
})
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-300"
    leave-active-class="transition-all duration-200"
    enter-from-class="opacity-0 translate-y--2"
    leave-to-class="opacity-0 translate-y--2"
  >
    <div
      v-show="show"
      id="listbox"
      ref="listboxRef"
      role="listbox"
      aria-label="Available options"
      class="absolute left-0 right-0 top-full z-10 max-h-60 flex flex-col overflow-y-auto custom-outline b-t-0 border--c-inverse-2 rd-t-0 bg--c-primary"
    >
      <div
        v-if="items.length === 0"
        class="flex grow gap-2 rd-b-2 pl-2 op-70 outline-none"
      >
        <div class="i-carbon:warning-hex my-auto" aria-hidden="true" />
        <span>No matches</span>
      </div>
      <div
        v-for="(i, index) in items"
        v-else
        :id="`option-${index}`"
        :key="i"
        :aria-label="`Select ${i}`"
        :aria-selected="activeIndex === index"
        :class="[
          activeIndex === index ? 'text--c-accent bg--c-secondary' : 'hover:text--c-accent',
        ]"
        role="option"
        tabindex="0"
        class="grow cursor-pointer custom-outline-hover pl-2 outline-none last:rd-b-2"
        @click="$emit('update', i)"
        @keydown.enter.prevent="$emit('update', i)"
        @keydown.space.prevent="$emit('update', i)"
      >
        {{ i }}
      </div>
    </div>
  </Transition>
</template>
