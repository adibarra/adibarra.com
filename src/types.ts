import type { App } from 'vue'
import type { Router, RouteRecordNormalized } from 'vue-router'

export type UserModule = (ctx: { app: App, router: Router }) => void

export interface PostFrontmatter {
  title: string
  display: string
  date: string
  lang?: string
  duration?: string
  subtitle?: string
  upcoming?: boolean
}

export type PostRoute = RouteRecordNormalized & {
  meta: {
    frontmatter: PostFrontmatter
  }
}

export interface Post {
  path: string
  title: string
  date: string
  lang?: string
  desc?: string
  platform?: string
  duration?: string
  upcoming?: boolean
}

export interface Project {
  id: string
  name: string
  desc: string
  icon?: string
  tags: string[]
  repo?: string
  link?: string
}
