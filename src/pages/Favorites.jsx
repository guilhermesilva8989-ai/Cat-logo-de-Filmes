import MovieCard from '../components/MovieCard'

function Favorites({
  favoritos,
  alternarFavorito,
}) {
  return (
    <main className="pagina">
      <header className="cabecalho">
        <h1>❤️ Meus Favoritos</h1>

        <p>
          Seus filmes favoritos ficam salvos neste navegador.
        </p>
      </header>

      {favoritos.length === 0 ? (
        <div className="mensagem">
          <h2>Nenhum filme favorito ainda.</h2>

          <p>
            Volte ao catálogo e escolha seus filmes favoritos.
          </p>
        </div>
      ) : (
        <div className="grid-filmes">
          {favoritos.map((filme) => (
            <MovieCard
              key={filme.id}
              filme={filme}
              favorito={true}
              alternarFavorito={alternarFavorito}
            />
          ))}
        </div>
      )}
    </main>
  )
}

export default Favorites