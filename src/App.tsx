import { useState } from "react"
import { FetchError } from "./strong-fetch"
import { searchProducts } from "./search-products"
import type { Product } from "./types"
import "./App.css"

const App = () => {
  const [products, setProducts] = useState<Product[]>([])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    searchProducts(value)
      .then((results) => {
        const { data } = results
        const { products } = data
        setProducts(products)
      })
      .catch((err) => {
        if (err instanceof FetchError) {
          console.error({
            errorName: err.name,
            errorMessage: err.message,
            errorStatus: err.status,
            errorStack: err.stack,
          })
        }
      })
  }

  console.log("App re-render!")

  return (
    <section>
      <h1>
        Strong fetch demo -{" "}
        <a
          href="https://ivanatias.codes"
          target="_blank"
          rel="noreferrer noopener"
        >
          Ivan Atias
        </a>
      </h1>
      <p>
        Open the devtools, try typing like crazy on the input and check the{" "}
        <span>Console</span> and <span>Network</span> tabs!
      </p>
      <p>
        You only need to provide an unique <code>signalKey</code> and{" "}
        <code>strong-fetch</code> will do the rest :). No more creating{" "}
        <code>AbortController</code>s everywhere in your code.
      </p>
      <p>
        It provides automatic JSON data handling in response and also, a{" "}
        <code>FetchError</code> that extends the <code>Error</code> object which
        provides the status of the error response for better error handling.
        TypeScript friendly :)
      </p>
      <p>
        Check the <code>strong-fetch</code> folder to check out the code!
      </p>
      <form role="search" onSubmit={(e) => e.preventDefault()}>
        <input
          placeholder="Try looking for products!"
          type="search"
          onChange={handleSearch}
        />
      </form>
      {products.length > 0 && <pre>{JSON.stringify(products, null, 2)}</pre>}
    </section>
  )
}

export default App
