<script setup lang="ts">
defineProps<{
  projects: Record<string, any[]>
}>()
</script>

<template>
  <template v-for="key in Object.keys(projects)" :key="key">
    <h4 mt-10 font-bold>
      {{ key }}
    </h4>
    <div class="project-grid" mx--3 gap-2 py-2>
      <a
        v-for="item, idx in projects[key]"
        :key="idx"
        :href="item.link"
        :class="!item.link ? 'opacity-0 pointer-events-none h-0 -mt-8 -mb-4' : ''"
        :title="item.name"
        target="_blank"
        class="item"
        relative flex items-center
      >
        <div v-if="item.icon" pr-5 pt-2>
          <!-- Custom icons used on this page go here -->
          <div text-3xl opacity-50 :class="item.icon || 'i-carbon-unknown'" />
        </div>
        <div flex-auto>
          <div text-normal>{{ item.name }}</div>
          <div
            class="desc"
            text-sm font-normal opacity-50
            v-html="item.desc"
          />
        </div>
      </a>
    </div>
  </template>
</template>

<style scoped>
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.project-grid a.item {
  padding: 0.8em 1em;
  background: transparent;
  font-size: 1.1rem;
}

.project-grid a.item:hover {
  background: #88888808;
}
</style>
