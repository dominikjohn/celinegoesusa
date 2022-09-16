import { wrapFunctional } from './utils'

export { default as Logo } from '../../components/Logo.vue'
export { default as TimeItem } from '../../components/TimeItem.vue'

export const LazyLogo = import('../../components/Logo.vue' /* webpackChunkName: "components/logo" */).then(c => wrapFunctional(c.default || c))
export const LazyTimeItem = import('../../components/TimeItem.vue' /* webpackChunkName: "components/time-item" */).then(c => wrapFunctional(c.default || c))
