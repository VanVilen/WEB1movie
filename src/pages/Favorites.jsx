
import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import MovieCard from '../components/MovieCard'

export default function Favorites() {
  const { favorites } = useFavorites()

  return (
    <main className="container py-5">
      <h1 className="section-title">
        <i className="bi bi-heart-fill text-danger me-2"></i>
        My Watchlist
      </h1>

      <p className="text-secondary mb-5">
        All your favorite movies in one place.
      </p>

      {favorites.length === 0 ? (
        <div className="empty-state text-center py-5">
          <i className="bi bi-film display-1"></i>

          <h3 className="mt-3">Your watchlist is empty</h3>

          <p>
            Discover movies and save your favorites here.
          </p>

          <Link to="/" className="btn btn-danger mt-3">
            Discover Movies
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          {favorites.map(movie => (
            <div
              className="col-6 col-md-4 col-lg-3 col-xl-2"
              key={movie.id}
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
