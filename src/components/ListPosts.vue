<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Post } from '~/types'

const router = useRouter()
const posts: Post[] = router.getRoutes()
  .filter(i => i.path.startsWith('/posts/'))
  .filter(i => i.meta.frontmatter && i.meta.frontmatter.date)
  .sort((a, b) => +new Date(b.meta.frontmatter.date) - +new Date(a.meta.frontmatter.date))
  .map(i => ({
    path: i.path,
    title: i.meta.frontmatter.title,
    date: i.meta.frontmatter.date,
    duration: i.meta.frontmatter.duration,
    upcoming: i.meta.frontmatter.upcoming,
  }))

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
      <div v-if="!isSameYear(route.date, posts[idx - 1]?.date)" pointer-events-none relative h20>
        <span absolute left--3rem top--2rem text-8em font-bold op-10>{{ getYear(route.date) }}</span>
      </div>
      <app-link
        class="item"
        :to="route.upcoming ? '' : route.path"
        mb-6 mt-2 block font-normal no-underline
      >
        <li no-underline>
          <div class="title" text-lg leading-1.2em>
            <span
              v-if="route.upcoming"
              class="border bg-lime/10"
              mr2 border-lime rounded px-1 pb-0.2 align-middle text-xs text-lime md:ml--18.5
            >
              upcoming
            </span>
            <span align-middle>
              {{ route.title }}
            </span>
          </div>

          <div class="time" text-sm op-50>
            {{ formatDate(route.date) }}
            <span v-if="route.duration" op-80>
              · {{ route.duration }}
            </span>
          </div>
        </li>
      </app-link>
    </template>
  </ul>
</template>
