
import { createContext, useContext, useState } from 'react'

const FavoritesContext = createContext()

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('movieFavorites')) || []
    } catch {
      return []
    }
  })

  const toggleFavorite = (movie) => {
    const exists = favorites.some(
      item => item.id === movie.id
    )

    const updated = exists
      ? favorites.filter(item => item.id !== movie.id)
      : [...favorites, movie]

    setFavorites(updated)
    localStorage.setItem('movieFavorites', JSON.stringify(updated))
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  return useContext(FavoritesContext)
}
