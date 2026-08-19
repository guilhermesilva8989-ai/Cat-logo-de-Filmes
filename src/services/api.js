const TOKEN = import.meta.env.VITE_TMDB_TOKEN

const BASE_URL = 'https://api.themoviedb.org/3'

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TOKEN}`,
  },
}

export async function buscarFilmesPopulares() {
  const resposta = await fetch(
    `${BASE_URL}/movie/popular?language=pt-BR&page=1`,
    options
  )

  if (!resposta.ok) {
    throw new Error('Erro ao buscar filmes populares')
  }

  const dados = await resposta.json()

  return dados.results
}

export async function buscarFilmesPorNome(nome) {
  const resposta = await fetch(
    `${BASE_URL}/search/movie?query=${encodeURIComponent(
      nome
    )}&language=pt-BR&page=1`,
    options
  )

  if (!resposta.ok) {
    throw new Error('Erro ao buscar filmes')
  }

  const dados = await resposta.json()

  return dados.results
}

export async function buscarDetalhesFilme(id) {
  const resposta = await fetch(
    `${BASE_URL}/movie/${id}?language=pt-BR`,
    options
  )

  if (!resposta.ok) {
    throw new Error('Erro ao buscar detalhes do filme')
  }

  const dados = await resposta.json()

  return dados
}