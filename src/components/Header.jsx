import { Link } from 'react-router-dom'
import logo from '../assets/img/fierro.png'

import BotonTema from './atoms/BotonTema'
import { useTema } from '../context/TemaContext'

function Header({ titulo, subtitulo, itemsMenu }) {
  const { tema, alternarTema } = useTema()

  return (
    <header id="encabezado">
      <video
        className="video-fondo"
        src="/video/videoFondo.mp4"
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
              <Link to={item.href}>{item.label}</Link>
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