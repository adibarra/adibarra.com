<script setup lang="ts">
import { useRouter } from 'vue-router'
import { formatDate } from '~/logic'
import type { Post } from '~/types'

const props = defineProps<{
  type?: string
  posts?: Post[]
}>()

const router = useRouter()
const routes: Post[] = router.getRoutes()
  .filter(i => i.path.startsWith('/posts') && !i.path.endsWith('.html'))
  .filter(i => i.meta.frontmatter && i.meta.frontmatter.date && i.meta.frontmatter.type === props.type)
  .sort((a, b) => +new Date(b.meta.frontmatter.date) - +new Date(a.meta.frontmatter.date))
  .map(i => ({
    path: i.path,
    title: i.meta.frontmatter.title,
    date: i.meta.frontmatter.date,
    duration: i.meta.frontmatter.duration,
    upcoming: i.meta.frontmatter.upcoming,
  }))
const posts = computed(() => (props.posts || routes))

const getYear = (a: Date | string | number) => new Date(a).getFullYear()
const isSameYear = (a: Date | string | number, b: Date | string | number) => a && b && getYear(a) === getYear(b)
</script>

<template>
  <ul>
    <template v-if="!posts.length">
      <div py2 op50>
        { nothing here yet }
      </div>
    </template>

    <template v-for="route, idx in posts" :key="route.path">
      <div v-if="!isSameYear(route.date, posts[idx - 1]?.date)" relative h20 pointer-events-none>
        <span text-8em op-10 absolute left--3rem top--2rem font-bold>{{ getYear(route.date) }}</span>
      </div>
      <app-link
        class="item"
        :to="route.upcoming ? '' : route.path"
        block font-normal mb-6 mt-2 no-underline
      >
        <li class="no-underline">
          <div class="title text-lg leading-1.2em">
            <span
              v-if="route.upcoming"
              class="text-xs border rounded px-1 pb-0.2 md:ml--18.5 mr2 bg-lime/10 border-lime text-lime"
              align-middle
            >upcoming</span>
            <span align-middle>{{ route.title }}</span>
          </div>

          <div class="time op-50 text-sm">
            {{ formatDate(route.date) }}
            <span v-if="route.duration" op-80>· {{ route.duration }}</span>
          </div>
        </li>
      </app-link>
    </template>
  </ul>
</template>
