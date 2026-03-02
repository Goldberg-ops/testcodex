import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

export default function App() {
  const [books, setBooks] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  async function fetchBooks() {
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE}/api/books`)
      const data = await response.json()
      setBooks(data)
      setError('')
    } catch {
      setError('Could not connect to backend API.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    try {
      const response = await fetch(`${API_BASE}/api/books`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author }),
      })

      if (!response.ok) {
        const body = await response.json()
        throw new Error(body.error || 'Failed to add book.')
      }

      setTitle('')
      setAuthor('')
      await fetchBooks()
    } catch (submitError) {
      setError(submitError.message)
    }
  }

  return (
    <main className="container">
      <h1>Books Web App</h1>

      <form onSubmit={handleSubmit} className="book-form">
        <input
          type="text"
          placeholder="Book title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
        />
        <button type="submit">Add Book</button>
      </form>

      {error && <p className="error">{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="book-list">
          {books.map((book) => (
            <li key={book.id}>
              <strong>{book.title}</strong>
              <span>{book.author}</span>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
