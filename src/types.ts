import type { App } from 'vue'
import type { Router } from 'vue-router'

export type UserModule = (ctx: { app: App, router: Router }) => void

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
  name: string
  desc: string
  icon?: string
  tags: string[]
  repo?: string
  link?: string
}
