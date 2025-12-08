<script setup lang="ts">
import type { Project } from '~/types'

defineProps<{ item: Project }>()
</script>

<template>
  <div
    :title="item.name"
    hover="bg-[#ffffff08]"
    flex items-start rounded-lg px-4 py-3 text-lg
  >
    <div my-auto flex-none pb-5 pr-5>
      <div :class="item.icon || 'i-carbon:unknown'" text-3xl text--c-text opacity-60 />
    </div>

    <div flex flex-auto flex-col justify-between>
      <div flex items-start gap-2>
        <span text--c-accent font-600 v-html="item.name" />
        <div grow />
        <a
          v-if="item.link"
          :href="item.link"
          :title="item.name"
          target="_blank"
          rel="noopener"
          class="!border-none"
          custom-icon-btn
        >
          <div i-carbon:link />
        </a>
        <a
          v-if="item.repo"
          :href="item.repo"
          title="GitHub Repository"
          target="_blank"
          rel="noopener"
          class="!border-none"
          custom-icon-btn
        >
          <div i-carbon:logo-github />
        </a>
      </div>

      <div>
        <div text-sm text--c-text font-normal opacity-60 v-html="item.desc" />

        <div v-if="item.tags && item.tags.length" mt-2 flex flex-wrap items-center gap-2>
          <span v-for="(t, i) in item.tags" :key="i" rounded-full bg--c-secondary px-2 py-1 text-xxs text--c-text opacity-80>{{ t }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
