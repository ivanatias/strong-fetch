# [Strong-fetch demo](https://strong-fetch-ia.vercel.app/)

`strong-fetch` is an `axios` like wrapper around the `fetch` API with built-in (and optional) `AbortController` handling. You only need to provide an unique `signalKey` for each request. Say no more to creating new `AbortController` instances everywhere, `strong-fetch` will do everything for you.

## `strong-fetch` provides:

- Automatic (and optional) `AbortController` handling.
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
import fetch from "strong-fetch"
import type { ProductResponse } from "./types"
import type { StrongFetchResponse } from "strong-fetch"

const searchProducts = (
  query: string
): Promise<StrongFetchResponse<ProductResponse>> => {
  return fetch(`https://dummyjson.com/products/search?q=${query}`, {
    signalKey: "searchProducts",
  })
}
```

```typescript
import fetch from "strong-fetch"
import type { ProductResponse } from "./types"

const searchProducts = (query: string) => {
  return fetch<ProductResponse>(
    `https://dummyjson.com/products/search?q=${query}`,
    {
      signalKey: "searchProducts",
    }
  )
}
```

## Playground:

You can play around with the code on this [Codesandbox](https://codesandbox.io/p/sandbox/elastic-frog-9m2p7g)!

## Run locally:

```
// Clone the repository
git clone https://github.com/ivanatias/strong-fetch.git

// Install the dependencies
npm install

// Start a development server
npm run dev
```
