<script setup lang="ts">
import projectsData from '~/data/projects.json'

const projects = projectsData.reduce((acc, project) => {
  const cat = project.category
  if (!acc[cat]) acc[cat] = []
  acc[cat].push(project)
  return acc
}, {} as Record<string, any[]>)

const categoryOrder = ['webapps', 'websites', 'machine-learning', 'tools', 'games', 'other', 'more']
const sortedCategories = categoryOrder.filter(cat => projects[cat])
</script>

<template>
  <template v-for="category in sortedCategories" :key="category">
    <h2 mt-10 font-bold>
      {{ category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') }}
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
