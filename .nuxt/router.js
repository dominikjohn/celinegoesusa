import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _b641e582 = () => interopDefault(import('../pages/gindlalm/index.vue' /* webpackChunkName: "pages/gindlalm/index" */))
const _61080bd0 = () => interopDefault(import('../pages/hirschberg/index.vue' /* webpackChunkName: "pages/hirschberg/index" */))
const _bd195eae = () => interopDefault(import('../pages/neureuth/index.vue' /* webpackChunkName: "pages/neureuth/index" */))
const _632f8db1 = () => interopDefault(import('../pages/risserkogerl/index.vue' /* webpackChunkName: "pages/risserkogerl/index" */))
const _291d73de = () => interopDefault(import('../pages/rossstein/index.vue' /* webpackChunkName: "pages/rossstein/index" */))
const _41a17384 = () => interopDefault(import('../pages/silberkopf/index.vue' /* webpackChunkName: "pages/silberkopf/index" */))
const _0c95bef3 = () => interopDefault(import('../pages/wallberg/index.vue' /* webpackChunkName: "pages/wallberg/index" */))
const _4d8af9d4 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/gindlalm",
    component: _b641e582,
    name: "gindlalm"
  }, {
    path: "/hirschberg",
    component: _61080bd0,
    name: "hirschberg"
  }, {
    path: "/neureuth",
    component: _bd195eae,
    name: "neureuth"
  }, {
    path: "/risserkogerl",
    component: _632f8db1,
    name: "risserkogerl"
  }, {
    path: "/rossstein",
    component: _291d73de,
    name: "rossstein"
  }, {
    path: "/silberkopf",
    component: _41a17384,
    name: "silberkopf"
  }, {
    path: "/wallberg",
    component: _0c95bef3,
    name: "wallberg"
  }, {
    path: "/",
    component: _4d8af9d4,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
