import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Details from './pages/Details'
import Favorites from './pages/Favorites'

import './App.css'

function App() {
  const [favoritos, setFavoritos] = useState(() => {
    const favoritosSalvos = localStorage.getItem('filmesFavoritos')

    if (favoritosSalvos) {
      return JSON.parse(favoritosSalvos)
    }

    return []
  })

  useEffect(() => {
    localStorage.setItem(
      'filmesFavoritos',
      JSON.stringify(favoritos)
    )
  }, [favoritos])

  function alternarFavorito(filme) {
    const jaExiste = favoritos.some(
      (favorito) => favorito.id === filme.id
    )

    if (jaExiste) {
      const novosFavoritos = favoritos.filter(
        (favorito) => favorito.id !== filme.id
      )

      setFavoritos(novosFavoritos)
      return
    }

    setFavoritos([...favoritos, filme])
  }

  function estaFavoritado(id) {
    return favoritos.some(
      (favorito) => favorito.id === Number(id)
    )
  }

  return (
    <BrowserRouter>
      <Navbar quantidadeFavoritos={favoritos.length} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              favoritos={favoritos}
              alternarFavorito={alternarFavorito}
            />
          }
        />

        <Route
          path="/filme/:id"
          element={
            <Details
              estaFavoritado={estaFavoritado}
              alternarFavorito={alternarFavorito}
            />
          }
        />

        <Route
          path="/favoritos"
          element={
            <Favorites
              favoritos={favoritos}
              alternarFavorito={alternarFavorito}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App