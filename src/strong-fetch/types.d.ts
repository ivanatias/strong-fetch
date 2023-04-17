interface StrongFetchConfig extends Omit<RequestInit, 'signal'> {
  signalKey?: string
}

interface StrongFetchResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: Record<string, string>
}

export { StrongFetchConfig, StrongFetchResponse }
