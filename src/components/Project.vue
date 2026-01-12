<script setup lang="ts">
import type { Project } from '~/types'

const props = defineProps<{ item: Project }>()
const flashing = ref(false)

onMounted(() => {
  if (window.location.hash === `#${props.item.id}`) {
    flashing.value = true
    setTimeout(() => {
      flashing.value = false
    }, 1000)
  }
})
</script>

<template>
  <div
    :id="item.id"
    :title="item.name"
    class="flex scroll-mt-8 items-start rounded-lg px-4 py-3 text-lg transition-all duration-400 ease-in-out hover:bg-[#ffffff08]"
    :class="{ 'bg-[#ffffff10]': flashing }"
  >
    <div class="my-auto flex-none pb-5 pr-5">
      <div
        :class="item.icon || 'i-carbon:unknown'"
        class="text-3xl text--c-text opacity-60"
        aria-hidden="true"
      />
    </div>

    <div class="flex flex-auto flex-col justify-between">
      <div class="flex items-start gap-2">
        <span class="text--c-accent font-600">
          {{ item.name }}
        </span>
        <div class="grow" />
        <a
          v-if="item.link"
          :href="item.link"
          :title="item.name"
          target="_blank"
          rel="noopener"
          class="custom-icon-btn !border-none"
        >
          <div class="i-carbon:link" aria-hidden="true" />
        </a>
        <a
          v-if="item.repo"
          :href="item.repo"
          title="GitHub Repository"
          target="_blank"
          rel="noopener"
          class="custom-icon-btn !border-none"
        >
          <div class="i-carbon:logo-github" aria-hidden="true" />
        </a>
      </div>

      <div>
        <div class="text-sm text--c-text font-normal opacity-60">
          {{ item.desc }}
        </div>

        <div
          v-if="item.tags && item.tags.length"
          class="mt-2 flex flex-wrap items-center gap-2"
        >
          <span
            v-for="(t, i) in item.tags"
            :key="i"
            class="rounded-full bg--c-secondary px-2 py-1 text-xxs text--c-text opacity-80"
          >
            {{ t }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
