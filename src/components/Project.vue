<script setup lang="ts">
import type { Project } from '~/types'

defineProps<{ item: Project }>()
</script>

<template>
  <div
    :title="item.name"
    hover="bg-[#ffffff08]"
    class="flex items-start rounded-lg px-4 py-3 text-lg"
  >
    <div class="my-auto flex-none pb-5 pr-5">
      <div
        :class="item.icon || 'i-carbon:unknown'"
        class="text-3xl text--c-text opacity-60"
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
          <div i-carbon:link />
        </a>
        <a
          v-if="item.repo"
          :href="item.repo"
          title="GitHub Repository"
          target="_blank"
          rel="noopener"
          class="custom-icon-btn !border-none"
        >
          <div i-carbon:logo-github />
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
