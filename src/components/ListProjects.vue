<script setup lang="ts">
import projects from '~/data/projects.json'
</script>

<template>
  <div mx--3 py-2>
    <div grid grid-cols-1 gap-2 md:grid-cols-2>
      <Project
        v-for="(item, idx) in projects"
        :key="item.name || idx"
        :item="item"
      />
    </div>
  </div>
</template>
