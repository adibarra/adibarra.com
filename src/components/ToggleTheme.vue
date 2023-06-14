<script setup lang='ts'>
import { toggleDark } from '~/logic'
</script>

<template>
  <a
    title="Toggle Color Scheme"
    select-none
    @click="toggleDark"
  >
    <div i-ri-sun-line dark:i-ri-moon-line />
  </a>
</template>
