<script setup lang='ts'>
import { isDark } from '~/logics'

function toggleDark() {
  isDark.value = !isDark.value
}
</script>

<template>
  <a class="select-none" title="Toggle Color Scheme" @click="toggleDark">
    <div v-if="isDark" i-ri-moon-line />
    <div v-else i-ri-sun-line />
  </a>
</template>
