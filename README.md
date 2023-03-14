# Strong-fetch demo

`strong-fetch` is an `axios` like wrapper around the `fetch` API with built-in (and optional) `AbortController` handling. You only need to provide an unique `signalKey` for each request. Say no more to creating new `AbortController` instances everywhere, `strong-fetch` will do everything for you.

## `strong-fetch` provides:

- Automatic (and optional) `AbortController` handling.
- A `FetchError` object that extends the `Error` object and includes the status of the error response for better error handling.
- A generic `StrongFetchResponse` type for nicely typing responses.
- Utilities for manually aborting requests if needed.

`strong-fetch` is TypeScript friendly.

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
