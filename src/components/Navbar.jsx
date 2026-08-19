import { NavLink } from 'react-router-dom'

function Navbar({ quantidadeFavoritos }) {
  return (
    <nav className="navbar">
      <div className="navbar-conteudo">
        <NavLink className="logo" to="/">
          🎬 MovieApp
        </NavLink>

        <div className="menu">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'menu-link ativo' : 'menu-link'
            }
          >
            Início
          </NavLink>

          <NavLink
            to="/favoritos"
            className={({ isActive }) =>
              isActive ? 'menu-link ativo' : 'menu-link'
            }
          >
            ❤️ Favoritos ({quantidadeFavoritos})
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar