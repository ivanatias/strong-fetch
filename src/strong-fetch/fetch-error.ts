class FetchError extends Error {
  status: number

  constructor(message = "Fetch Error", status = 500) {
    super(message)

    Object.setPrototypeOf(this, new.target.prototype)

    this.name = FetchError.name
    this.status = status

    Error.captureStackTrace(this, FetchError)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchError)
    }
  }
}

export { FetchError }
