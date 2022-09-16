import { wrapFunctional } from './utils'

export { default as Logo } from '../../components/Logo.vue'
export { default as PriceCalculator } from '../../components/PriceCalculator.vue'

export const LazyLogo = import('../../components/Logo.vue' /* webpackChunkName: "components/logo" */).then(c => wrapFunctional(c.default || c))
export const LazyPriceCalculator = import('../../components/PriceCalculator.vue' /* webpackChunkName: "components/price-calculator" */).then(c => wrapFunctional(c.default || c))
