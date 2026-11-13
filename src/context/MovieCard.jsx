
import { Link } from 'react-router-dom'
import { useFavorites } from './FavoritesContext'

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500'

export default function MovieCard({ movie }) {
  const { favorites, toggleFavorite } = useFavorites()

  const isFavorite = favorites.some(
    item => item.id === movie.id
  )

  return (
    <div className="movie-card">
      <div className="poster-wrapper">
        <Link to={`/movie/${movie.id}`}>
          {movie.poster_path ? (
            <img
              src={`${IMAGE_URL}${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
          ) : (
            <div className="no-poster">
              <i className="bi bi-film"></i>
              <p>No image available</p>
            </div>
          )}
        </Link>

        <button
          className="favorite-button"
          onClick={() => toggleFavorite(movie)}
          aria-label="Toggle favorite"
        >
          <i className={`bi ${isFavorite ? 'bi-heart-fill' : 'bi-heart'}`}></i>
        </button>

        <div className="rating">
          <i className="bi bi-star-fill"></i>
          {movie.vote_average?.toFixed(1) || 'N/A'}
        </div>
      </div>

      <div className="movie-info">
        <Link
          to={`/movie/${movie.id}`}
          className="movie-title"
        >
          {movie.title}
        </Link>

        <p className="movie-date">
          {movie.release_date?.slice(0, 4) || 'Unknown year'}
        </p>

        <Link
          to={`/movie/${movie.id}`}
          className="btn btn-danger w-100"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}
