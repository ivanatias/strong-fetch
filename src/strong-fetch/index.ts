import { fetch, abortRequest, abortAndGetNewSignal } from "./fetch-wrapper"
import { FetchError } from "./fetch-error"
import { StrongFetchConfig, StrongFetchResponse } from "./types"

export { abortRequest, abortAndGetNewSignal, FetchError }

export type { StrongFetchResponse, StrongFetchConfig }

export default fetch
