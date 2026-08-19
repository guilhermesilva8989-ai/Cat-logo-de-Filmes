import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import {
  buscarDetalhesFilme,
} from '../services/api'

function Details({
  estaFavoritado,
  alternarFavorito,
}) {
  const { id } = useParams()

  const [filme, setFilme] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    carregarFilme()
  }, [id])

  async function carregarFilme() {
    try {
      setCarregando(true)
      setErro('')

      const dados = await buscarDetalhesFilme(id)

      setFilme(dados)
    } catch (error) {
      console.error(error)

      setErro(
        'Não foi possível carregar os detalhes do filme.'
      )
    } finally {
      setCarregando(false)
    }
  }

  if (carregando) {
    return (
      <div className="loading-area detalhes-loading">
        <div className="spinner"></div>
        <p>Carregando filme...</p>
      </div>
    )
  }

  if (erro) {
    return (
      <main className="detalhes">
        <Link className="voltar" to="/">
          ← Voltar
        </Link>

        <div className="mensagem erro">
          {erro}
        </div>
      </main>
    )
  }

  if (!filme) {
    return null
  }

  const favorito = estaFavoritado(filme.id)

  const ano = filme.release_date
    ? filme.release_date.substring(0, 4)
    : 'Sem data'

  const nota =
    typeof filme.vote_average === 'number'
      ? filme.vote_average.toFixed(1)
      : '0.0'

  const generos =
    filme.genres?.length > 0
      ? filme.genres
          .map((genero) => genero.name)
          .join(', ')
      : 'Não informado'

  const horas = filme.runtime
    ? Math.floor(filme.runtime / 60)
    : 0

  const minutos = filme.runtime
    ? filme.runtime % 60
    : 0

  return (
    <main className="detalhes">
      <Link className="voltar" to="/">
        ← Voltar para o catálogo
      </Link>

      <div className="detalhes-conteudo">
        <div>
          {filme.poster_path ? (
            <img
              className="poster-detalhes"
              src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
              alt={filme.title}
            />
          ) : (
            <div className="sem-poster poster-detalhes">
              🎬
              <span>Sem imagem</span>
            </div>
          )}
        </div>

        <div className="detalhes-info">
          <h1>{filme.title}</h1>

          {filme.tagline && (
            <p className="tagline">
              {filme.tagline}
            </p>
          )}

          <div className="informacoes">
            <span>📅 {ano}</span>
            <span>⭐ {nota}</span>

            {filme.runtime > 0 && (
              <span>
                ⏱️ {horas}h {minutos}min
              </span>
            )}
          </div>

          <button
            className={
              favorito
                ? 'favorito-detalhes favoritado'
                : 'favorito-detalhes'
            }
            onClick={() => alternarFavorito(filme)}
          >
            {favorito
              ? '❤️ Remover dos favoritos'
              : '🤍 Adicionar aos favoritos'}
          </button>

          <h3>Gêneros</h3>
          <p>{generos}</p>

          <h3>Sinopse</h3>

          <p className="sinopse">
            {filme.overview ||
              'Sinopse não disponível em português.'}
          </p>

          <p>
            <strong>Título original:</strong>{' '}
            {filme.original_title}
          </p>

          <p>
            <strong>Data de lançamento:</strong>{' '}
            {filme.release_date || 'Não informada'}
          </p>
        </div>
      </div>
    </main>
  )
}

export default Details