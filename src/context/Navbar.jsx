
import { Link, NavLink } from 'react-router-dom'
import { useFavorites } from './FavoritesContext'

export default function Navbar() {
  const { favorites } = useFavorites()

  return (
    <nav className="navbar navbar-expand-lg navbar-dark movie-navbar">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-3" to="/">
          <i className="bi bi-film me-2 text-danger"></i>
          MovieHub
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navigation">
          <div className="navbar-nav ms-auto gap-3">
            <NavLink className="nav-link" to="/">
              Discover
            </NavLink>

            <NavLink className="nav-link" to="/favorites">
              <i className="bi bi-heart-fill me-1"></i>
              My Watchlist ({favorites.length})
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}
