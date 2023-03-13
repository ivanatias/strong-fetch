import { FetchError } from "./fetch-error"
import type { StrongFetchConfig, StrongFetchResponse } from "./types"

const ABORT_REQUEST_CONTROLLERS = new Map<string, AbortController>()

const fetch = async <T = any>(
  url: URL | RequestInfo,
  { signalKey, ...restOfConfig }: StrongFetchConfig = {}
): Promise<StrongFetchResponse<T>> => {
  const res = await globalThis
    .fetch(url, {
      ...(signalKey !== undefined && {
        signal: abortAndGetNewSignal(signalKey),
      }),
      ...restOfConfig,
    })
    .catch((err) => {
      if (err.name === "AbortError") {
        return new Response("Client Closed Request", {
          status: 499,
          statusText: "Client Closed Request",
        })
      }

      return new Response("Network Connect Timeout Error", {
        status: 599,
        statusText: "Network Connect Timeout Error",
      })
    })

  if (!res.ok) {
    throw new FetchError(res.statusText || (await res.text()), res.status)
  }

  const headers: Record<string, string> = {}

  res.headers.forEach((value, key) => {
    headers[key] = value
  })

  const data = await res.json()

  return {
    data,
    status: res.status,
    statusText: res.statusText || "OK",
    headers,
  }
}

function abortAndGetNewSignal(key: string) {
  abortRequest(key)
  const newController = new AbortController()
  ABORT_REQUEST_CONTROLLERS.set(key, newController)
  return newController.signal
}

function abortRequest(key: string, reason = "CANCELLED REQUEST") {
  ABORT_REQUEST_CONTROLLERS.get(key)?.abort(reason)
}

export { fetch, abortAndGetNewSignal, abortRequest }
