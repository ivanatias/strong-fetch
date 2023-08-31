import fetch, { type StrongFetchResponse } from './strong-fetch'
import type { ProductResponse } from './types'

const searchProducts = (
  query: string
): Promise<StrongFetchResponse<ProductResponse>> => {
  return fetch(`https://dummyjson.com/products/search?q=${query}`, {
    signalKey: 'searchProducts'
  })
}

export { searchProducts }
