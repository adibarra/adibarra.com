<script setup lang="ts">
import type { Post, PostRoute } from '~/types'

const router = useRouter()
const posts: Post[] = router.getRoutes()
  .filter(i => i.path.startsWith('/posts/'))
  .filter(i => i.meta.frontmatter)
  .map(i => i as PostRoute)
  .sort((a, b) => +new Date(b.meta.frontmatter.date) - +new Date(a.meta.frontmatter.date))
  .map(i => ({
    path: i.path,
    title: i.meta.frontmatter.display || i.meta.frontmatter.title,
    date: i.meta.frontmatter.date,
    duration: i.meta.frontmatter.duration,
    upcoming: i.meta.frontmatter.upcoming,
  }))
</script>

<template>
  <ul>
    <template v-if="!posts.length">
      <div py2 op-50>
        { nothing here yet }
      </div>
    </template>

    <template v-for="route, idx in posts" :key="route.path">
      <div
        v-if="!isSameYear(route.date, posts[idx - 1]?.date)"
        pointer-events-none relative h-20
      >
        <span absolute left--3rem top--2rem text-8em font-600 op-4>{{ getYear(route.date) }}</span>
      </div>
      <router-link
        class="item"
        :to="route.upcoming ? '' : route.path"
        mb-6 mt-2 block font-normal underline-none
      >
        <li no-underline>
          <div text-lg leading-1.2em>
            <span
              v-if="route.upcoming"
              mr-2 border-1 border--c-accent rounded pb-0.2 pl-2 pr-1 align-middle text-xs text--c-accent md:ml--20.5
            >
              upcoming
            </span>
            <span align-middle>{{ route.title }}</span>
          </div>

          <div text-sm op-50>
            {{ formatDate(route.date) }}
            <span v-if="route.duration" op-80>
              · {{ route.duration }}
            </span>
          </div>
        </li>
      </router-link>
    </template>
  </ul>
</template>
