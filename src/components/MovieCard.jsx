import { Link } from 'react-router-dom'

function MovieCard({
  filme,
  favorito,
  alternarFavorito,
}) {
  const ano = filme.release_date
    ? filme.release_date.substring(0, 4)
    : 'Sem data'

  const nota =
    typeof filme.vote_average === 'number'
      ? filme.vote_average.toFixed(1)
      : '0.0'

  return (
    <article className="card-filme">
      {filme.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
          alt={filme.title}
        />
      ) : (
        <div className="sem-poster">
          🎬
          <span>Sem imagem</span>
        </div>
      )}

      <div className="info-filme">
        <h2>{filme.title}</h2>
        <p>{ano}</p>

        <span className="nota">
          ⭐ {nota}
        </span>

        <div className="acoes-card">
          <button
            className={
              favorito
                ? 'botao-favorito favoritado'
                : 'botao-favorito'
            }
            onClick={() => alternarFavorito(filme)}
          >
            {favorito
              ? '❤️ Favoritado'
              : '🤍 Favoritar'}
          </button>

          <Link
            className="link-detalhes"
            to={`/filme/${filme.id}`}
          >
            Ver detalhes
          </Link>
        </div>
      </div>
    </article>
  )
}

export default MovieCard