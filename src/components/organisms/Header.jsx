import { Link } from 'react-router-dom'
import logo from '../../assets/img/fierro.png'
import videoBanner from '../../assets/video/videoFondo.mp4'

import BotonTema from '../atoms/BotonTema'
import { useTema } from '../../context/TemaContext'
import { contarUnidadesCarrito } from '../../utils/carrito'

function Header({ titulo, subtitulo, itemsMenu }) {
  const { tema, alternarTema } = useTema()

  return (
    <header id="encabezado">
      <video
        className="video-fondo"
        src={videoBanner}
        autoPlay
        muted
        loop
        playsInline
      ></video>

      <div className="titulo">
        <h1>
          {titulo} <img src={logo} alt="logo" width="50" height="50" />
        </h1>
        <p>{subtitulo}</p>
      </div>

      <nav id="menu-principal">
        <ul>
          {itemsMenu.map((item) => (
            <li key={item.href}>
              <Link to={item.href}>
                {item.label}
                {item.href === '/carrito' && ` (${contarUnidadesCarrito()})`}
              </Link>
            </li>
          ))}
          <li>
            <BotonTema oscuro={tema === 'dark'} onClick={alternarTema} />
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header