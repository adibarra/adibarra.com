<script setup lang="ts">
import type { ChipSelectExposed } from './common/ChipSelect.vue'
import type { Project } from '~/types'
import projectsData from '~/data/projects.json'

const projects: Project[] = projectsData
const selectedTags = ref<string[]>([])
const chipSelectRef = ref<ChipSelectExposed>()

const allTags = computed(() => {
  const tags = new Set<string>()
  projects.forEach((project) => {
    project.tags.forEach((tag) => {
      // exclude years
      if (!/^\d{4}$/.test(tag)) {
        tags.add(tag)
      }
    })
  })
  return Array.from(tags).sort()
})

const filteredProjects = computed(() => {
  if (selectedTags.value.length === 0) {
    return projects
  }
  return projects.filter(project =>
    selectedTags.value.some(tag => project.tags.includes(tag)),
  )
})

onMounted(() => {
  onStartTyping(() => chipSelectRef.value!.focus())
})
</script>

<template>
  <div>
    <ChipSelect
      ref="chipSelectRef"
      v-model="selectedTags"
      :options="allTags"
      :serializer="(tag: string) => tag"
      placeholder="Filter by tags"
      class="mb-2"
    />
    <div class="mx--3 py-2">
      <div class="grid grid-cols-1 gap-2 md:grid-cols-2">
        <Project
          v-for="(item, idx) in filteredProjects"
          :key="item.name || idx"
          :item="item"
        />
      </div>
    </div>
  </div>
</template>
