import {
  type StrongFetchConfig,
  type StrongFetchResponse,
  FetchError
} from './'

const ABORT_REQUEST_CONTROLLERS = new Map<string, AbortController>()

const fetch = async <T = any>(
  input: URL | RequestInfo,
  config: StrongFetchConfig | undefined = {}
): Promise<StrongFetchResponse<T>> => {
  const { signalKey, ...restOfConfig } = config

  const res = await globalThis
    .fetch(input, {
      ...(signalKey !== undefined && {
        signal: abortAndGetNewSignal(signalKey)
      }),
      ...restOfConfig
    })
    .catch((err: Error) => {
      if (err.name === 'AbortError') {
        return new Response('Client Closed Request', {
          status: 499,
          statusText: 'Client Closed Request'
        })
      }

      return new Response('Network Connect Timeout Error', {
        status: 599,
        statusText: 'Network Connect Timeout Error'
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
    statusText: res.statusText || 'OK',
    headers
  }
}

function abortAndGetNewSignal(key: string) {
  abortRequest(key)
  const newController = new AbortController()
  ABORT_REQUEST_CONTROLLERS.set(key, newController)
  return newController.signal
}

function abortRequest(key: string, reason = 'CANCELLED REQUEST') {
  ABORT_REQUEST_CONTROLLERS.get(key)?.abort(reason)
}

export default fetch

export { abortAndGetNewSignal, abortRequest }
