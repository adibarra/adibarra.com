import type { UserModule } from '~/types'
import type { RouteLocationNormalized } from 'vue-router'
import NProgress from 'nprogress'

export const install: UserModule = ({ router }) => {
  router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    if (to.path !== from.path)
      NProgress.start()
  })
  router.afterEach(() => {
    NProgress.done()
  })
}
