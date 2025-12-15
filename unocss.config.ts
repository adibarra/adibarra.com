import type { Project } from './src/types'
import fs from 'node:fs'
import path from 'node:path'
import {
  defineConfig,
  presetIcons,
  presetTypography,
  presetWebFonts,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

const projectsPath = path.resolve(__dirname, 'src/data/projects.json')
const projectsData = fs.readFileSync(projectsPath, 'utf-8')
const projects: Project[] = JSON.parse(projectsData)
const icons = projects.map(p => p.icon).filter(Boolean) as string[]
const uniqueIcons = [...new Set(icons)]

export default defineConfig({
  shortcuts: [
    [/^([^.\s]+)--c-([^)\]>\s]+)$/, ([, prefix, color]) => `${prefix}-[var(--c-${color})]`], // bg--c-bg -> bg-[var(--c-bg)], etc.
    ['custom-link', 'text--c-accent outline-none underline-1 hover:underline focus:underline'],
    ['custom-outline', 'border--c-inverse outline-none rd-1 b-1'],
    ['custom-outline-hover', 'hover:bg--c-secondary focus:bg--c-secondary focus:border--c-accent focus-within:border--c-accent'],
    ['custom-icon-btn', 'outline-none inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text--c-accent focus:opacity-100 focus:text--c-accent'],
  ],
  presets: [
    presetWind3(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'Inter:400,600,800',
        mono: 'DM Mono:400,600,800',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  safelist: ['prose', 'mx-auto', 'text-left', 'i-carbon:unknown', ...uniqueIcons],
})
