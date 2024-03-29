# [Strong-fetch demo](https://strong-fetch-ia.vercel.app/)

`strong-fetch` is a wrapper around the `fetch` API. It provides `axios`' basic features and has built-in (and optional) automatic `AbortController` handling. You only need to provide an unique `signalKey` for each request. Say no more to creating new `AbortController` instances everywhere, `strong-fetch` will do everything for you.

## `strong-fetch` features:

- Automatic (and optional) `AbortController` handling.
- Automatic JSON response data handling.
- Automatically throws on non 2xx responses.
- A `FetchError` object that extends the `Error` object and includes the status of the error response for better exceptions handling.
- Responses have the shape of `StrongFetchResponse`.
- Utilities for manually aborting requests if needed.

`strong-fetch` is TypeScript friendly.

## Response schema:

The response for a request contains the following information:

```typescript
data: {
} // Object containing the response provided by the server.

status: number // HTTP status from the server response.

statusText: string // HTTP status message from the server response.

headers: {
} // HTTP headers the server responded with.
```

## Usage examples:

```typescript
import fetch, { type StrongFetchResponse } from 'strong-fetch'
import type { ProductResponse } from './types'

const searchProducts = (
  query: string
): Promise<StrongFetchResponse<ProductResponse>> => {
  return fetch(`https://dummyjson.com/products/search?q=${query}`, {
    signalKey: 'searchProducts'
  })
}

const results = await searchProducts('something')
/* 
  {
    data: ProductResponse
    status: number
    statusText: string
    headers: Record<string, string>
  }
*/
```

```typescript
import fetch from 'strong-fetch'
import type { ProductResponse } from './types'

const searchProducts = (query: string) => {
  return fetch<ProductResponse>(
    `https://dummyjson.com/products/search?q=${query}`,
    {
      signalKey: 'searchProducts'
    }
  )
}

const results = await searchProducts('something')
/* 
    {
      data: ProductResponse
      status: number
      statusText: string
      headers: Record<string, string>
    }
*/
```

## Run locally:

```
// Clone the repository
git clone https://github.com/ivanatias/strong-fetch.git

// Install the dependencies
npm install

// Start a development server
npm run dev
```
