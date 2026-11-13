
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'
import Favorites from './pages/Favorites'

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="*" element={<Home />} />
      </Routes>

      <footer className="footer text-center py-4">
        <h5 className="fw-bold">
          <i className="bi bi-film text-danger me-2"></i>
          MovieHub
        </h5>

        <p className="mb-1">Discover your next favorite movie.</p>
        <small>© 2026 MovieHub. Made for movie lovers.</small>

        <p className="mt-2 small">
          Movie data provided by TMDB.
        </p>
      </footer>
    </>
  )
}
