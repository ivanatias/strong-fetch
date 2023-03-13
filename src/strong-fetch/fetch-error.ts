class FetchError extends Error {
  status: number

  constructor(message: string = "Fetch Error", status: number = 500) {
    super(message)

    Object.setPrototypeOf(this, new.target.prototype)

    this.name = this.constructor.name
    this.status = status

    // This works but how do I fix the typings????
    Error.captureStackTrace(this, this.constructor)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

export { FetchError }
