import type { PostFrontmatter } from './types'
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    frontmatter: PostFrontmatter
  }
}

interface ImportMetaEnv {
  readonly COMMIT_HASH: string
}

declare interface Window {
  // extend the window
}

// with unplugin-vue-markdown, markdown files can be treated as Vue components
declare module '*.vue' {
  import type { ComponentOptions } from 'vue'

  const Component: ComponentOptions
  export default Component
}

declare module '*.md' {
  import type { ComponentOptions } from 'vue'

  const Component: ComponentOptions
  export default Component
}
