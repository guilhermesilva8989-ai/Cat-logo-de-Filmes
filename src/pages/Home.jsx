import { useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard'

import {
  buscarFilmesPopulares,
  buscarFilmesPorNome,
} from '../services/api'

function Home({
  favoritos,
  alternarFavorito,
}) {
  const [busca, setBusca] = useState('')
  const [filmes, setFilmes] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    carregarFilmes()
  }, [])

  async function carregarFilmes() {
    try {
      setCarregando(true)
      setErro('')

      const dados = await buscarFilmesPopulares()

      setFilmes(dados)
    } catch (error) {
      console.error(error)
      setErro('Não foi possível carregar os filmes.')
    } finally {
      setCarregando(false)
    }
  }

  async function pesquisarFilmes() {
    if (busca.trim() === '') {
      carregarFilmes()
      return
    }

    try {
      setCarregando(true)
      setErro('')

      const dados = await buscarFilmesPorNome(busca)

      setFilmes(dados)
    } catch (error) {
      console.error(error)
      setErro('Não foi possível pesquisar os filmes.')
    } finally {
      setCarregando(false)
    }
  }

  function pesquisarComEnter(event) {
    if (event.key === 'Enter') {
      pesquisarFilmes()
    }
  }

  function limparBusca() {
    setBusca('')
    carregarFilmes()
  }

  return (
    <main className="pagina">
      <header className="cabecalho">
        <h1>🎬 Catálogo de Filmes</h1>
        <p>Encontre seus filmes favoritos</p>
      </header>

      <div className="busca">
        <input
          type="text"
          placeholder="Buscar filme..."
          value={busca}
          onChange={(event) => setBusca(event.target.value)}
          onKeyDown={pesquisarComEnter}
        />

        <button onClick={pesquisarFilmes}>
          Buscar
        </button>

        {busca && (
          <button
            className="botao-limpar"
            onClick={limparBusca}
          >
            Limpar
          </button>
        )}
      </div>

      {carregando && (
        <div className="loading-area">
          <div className="spinner"></div>
          <p>Carregando filmes...</p>
        </div>
      )}

      {erro && (
        <div className="mensagem erro">
          <p>{erro}</p>

          <button onClick={carregarFilmes}>
            Tentar novamente
          </button>
        </div>
      )}

      {!carregando &&
        !erro &&
        filmes.length === 0 && (
          <p className="mensagem">
            Nenhum filme encontrado.
          </p>
        )}

      {!carregando && !erro && (
        <div className="grid-filmes">
          {filmes.map((filme) => (
            <MovieCard
              key={filme.id}
              filme={filme}
              favorito={favoritos.some(
                (favorito) => favorito.id === filme.id
              )}
              alternarFavorito={alternarFavorito}
            />
          ))}
        </div>
      )}
    </main>
  )
}

export default Home