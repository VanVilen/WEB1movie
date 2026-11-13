
import { useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard'

const API = 'https://api.themoviedb.org/3'
const KEY = import.meta.env.VITE_TMDB_API_KEY

export default function Home() {
  const [movies, setMovies] = useState([])
  const [genres, setGenres] = useState([])
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function getGenres() {
      try {
        const response = await fetch(
          `${API}/genre/movie/list?api_key=${KEY}&language=en-US`
        )

        if (!response.ok) throw new Error()

        const data = await response.json()
        setGenres(data.genres || [])
      } catch {
        setError('Could not load movie genres.')
      }
    }

    getGenres()
  }, [])

  useEffect(() => {
    const timer = setTimeout(async () => {
      setLoading(true)
      setError('')

      try {
        let url

        if (search.trim()) {
          url = `${API}/search/movie?api_key=${KEY}&query=${encodeURIComponent(search)}`
        } else if (genre) {
          url = `${API}/discover/movie?api_key=${KEY}&with_genres=${genre}&sort_by=popularity.desc`
        } else {
          url = `${API}/movie/popular?api_key=${KEY}&language=en-US`
        }

        const response = await fetch(url)

        if (!response.ok) throw new Error()

        const data = await response.json()
        setMovies(data.results || [])
      } catch {
        setError('Could not load movies. Check your API key.')
        setMovies([])
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [search, genre])

  return (
    <>
      <section className="hero">
        <div className="container text-center">
          <span className="hero-label">
            YOUR NEXT MOVIE NIGHT STARTS HERE
          </span>

          <h1>
            Discover Your Next
            <br />
            <span>Favorite Movie.</span>
          </h1>

          <p>
            Explore movies, discover new stories and create your
            personal watchlist.
          </p>

          <div className="search-box">
            <i className="bi bi-search"></i>

            <input
              type="text"
              placeholder="Search for a movie..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setGenre('')
              }}
            />
          </div>
        </div>
      </section>

      <main className="container py-5">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
          <div>
            <h2 className="section-title">
              {search ? 'Search Results' : 'Popular Movies'}
            </h2>
            <p className="text-secondary">
              Discover movies worth watching.
            </p>
          </div>

          <select
            className="form-select genre-select"
            value={genre}
            onChange={(e) => {
              setGenre(e.target.value)
              setSearch('')
            }}
          >
            <option value="">All Genres</option>

            {genres.map(item => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-danger"></div>
            <p className="mt-3">Loading movies...</p>
          </div>
        )}

        {error && (
          <div className="alert alert-danger">{error}</div>
        )}

        {!loading && !error && movies.length === 0 && (
          <div className="text-center py-5">
            <i className="bi bi-film display-1"></i>
            <h4 className="mt-3">No movies found</h4>
            <p>Try searching for something else.</p>
          </div>
        )}

        <div className="row g-4">
          {movies.map(movie => (
            <div
              className="col-6 col-md-4 col-lg-3 col-xl-2"
              key={movie.id}
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
