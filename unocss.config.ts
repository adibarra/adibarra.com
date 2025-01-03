import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    [/^([^.\s]+)--c-([^)\]>\s]+)$/, ([, prefix, color]) => `${prefix}-[var(--c-${color})]`], // bg--c-bg -> bg-[var(--c-bg)], etc.
    ['custom-link', 'text--c-accent outline-none underline-1 hover:underline focus:underline'],
    ['custom-outline', 'border--c-inverse outline-none rd-1 b-1'],
    ['custom-outline-hover', 'hover:bg--c-secondary focus:bg--c-secondary focus:border--c-accent focus-within:border--c-accent'],
    ['custom-icon-btn', 'outline-none inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text--c-accent focus:opacity-100 focus:text--c-accent'],
    ['text-xs', 'text-[0.75rem] line-height-[1rem]'],
    ['text-xxs', 'text-[0.70rem] line-height-[0.75rem]'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'Inter:400,600,800',
        mono: 'DM Mono:400,600',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  safelist: 'prose mx-auto text-left'.split(' '),
})
