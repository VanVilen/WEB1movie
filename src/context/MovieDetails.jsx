
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useFavorites } from './FavoritesContext'

const API = 'https://api.themoviedb.org/3'
const KEY = import.meta.env.VITE_TMDB_API_KEY
const IMAGE_URL = 'https://image.tmdb.org/t/p/w780'

export default function MovieDetails() {
  const { id } = useParams()

  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const { favorites, toggleFavorite } = useFavorites()

  useEffect(() => {
    async function getMovie() {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(
          `${API}/movie/${id}?api_key=${KEY}&language=en-US`
        )

        if (!response.ok) throw new Error()

        const data = await response.json()
        setMovie(data)
      } catch {
        setError('Could not find this movie.')
      } finally {
        setLoading(false)
      }
    }

    getMovie()
  }, [id])

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-danger"></div>
        <p>Loading movie details...</p>
      </div>
    )
  }

  if (error || !movie) {
    return (
      <main className="container py-5">
        <h2>{error}</h2>
        <Link to="/" className="btn btn-danger mt-3">
          Back to movies
        </Link>
      </main>
    )
  }

  const isFavorite = favorites.some(
    item => item.id === movie.id
  )

  return (
    <main className="container py-5">
      <Link to="/" className="back-link">
        <i className="bi bi-arrow-left me-2"></i>
        Back to movies
      </Link>

      <div className="row g-5 mt-3">
        <div className="col-lg-5">
          {movie.poster_path ? (
            <img
              src={`${IMAGE_URL}${movie.poster_path}`}
              alt={movie.title}
              className="detail-poster"
            />
          ) : (
            <div className="no-poster detail-poster">
              No poster available
            </div>
          )}
        </div>

        <div className="col-lg-7">
          <div className="movie-genres mb-3">
            {movie.genres?.map(item => (
              <span key={item.id}>{item.name}</span>
            ))}
          </div>

          <h1 className="display-4 fw-bold">
            {movie.title}
          </h1>

          {movie.tagline && (
            <p className="text-secondary fst-italic">
              "{movie.tagline}"
            </p>
          )}

          <div className="movie-meta my-4">
            <span>
              <i className="bi bi-star-fill text-warning"></i>
              {movie.vote_average?.toFixed(1)}/10
            </span>

            <span>
              <i className="bi bi-calendar3"></i>
              {movie.release_date || 'Unknown'}
            </span>

            <span>
              <i className="bi bi-clock"></i>
              {movie.runtime ? `${movie.runtime} min` : 'Unknown'}
            </span>
          </div>

          <h3>Overview</h3>

          <p className="overview">
            {movie.overview || 'No description available.'}
          </p>

          <button
            className="btn btn-danger mt-3"
            onClick={() => toggleFavorite(movie)}
          >
            <i className={`bi ${isFavorite ? 'bi-heart-fill' : 'bi-heart'} me-2`}></i>
            {isFavorite ? 'Remove from Watchlist' : 'Add to Watchlist'}
          </button>

          {movie.homepage && (
            <div>
              <a
                href={movie.homepage}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-light mt-3 ms-2"
              >
                Official Website
              </a>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
