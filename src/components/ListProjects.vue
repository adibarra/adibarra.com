<script setup lang="ts">
defineProps<{
  projects: Record<string, any[]>
}>()
</script>

<template>
  <template v-for="category in Object.keys(projects)" :key="category">
    <h2 mt-10 font-bold>
      {{ category }}
    </h2>
    <div
      class="grid-cols-[repeat(auto-fit,minmax(250px,1fr))]"
      grid mx--3 gap-2 py-2
    >
      <div
        v-for="item, idx in projects[category]"
        :key="idx"
        :title="item.name"
        class="hover:bg-[#ffffff08]"
        flex items-center rounded-lg px-4 py-3 text-lg
      >
        <div pr-5>
          <div
            :class="item.icon || 'i-carbon:unknown'"
            text-3xl text--c-text opacity-60
          />
        </div>

        <div flex-auto>
          <div flex gap-2>
            <span text--c-accent font-600 v-html="item.name" />
            <div grow />
            <a
              v-if="item.link"
              :href="item.link"
              :title="item.name"
              target="_blank" rel="noopener"
              class="!border-none"
              custom-icon-btn
            >
              <div i-carbon:link />
            </a>
            <a
              v-if="item.repo"
              :href="item.repo"
              title="GitHub Repository"
              target="_blank" rel="noopener"
              class="!border-none"
              custom-icon-btn
            >
              <div i-carbon:logo-github />
            </a>
          </div>

          <div
            text-sm text--c-text font-normal opacity-60
            v-html="item.desc"
          />
        </div>
      </div>
    </div>
  </template>
</template>
