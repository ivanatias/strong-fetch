class FetchError extends Error {
  status: number

  constructor(message = 'Fetch Error', status = 500) {
    super(message)

    Object.setPrototypeOf(this, new.target.prototype)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchError)
    }

    this.name = FetchError.name
    this.status = status
  }
}

export { FetchError }
