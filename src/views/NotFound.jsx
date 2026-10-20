import { useLocation } from 'react-router-dom'
import PlantillaPagina from '../components/templates/PlantillaPagina'
import Seccion from '../components/molecules/Seccion'
import BotonLink from '../components/atoms/BotonLink'

function NotFound() {
  const { pathname } = useLocation()

  return (
    <PlantillaPagina>
      <Seccion id="error-404" titulo="UPS!">
        <p className="titulo codigo-404"> Error 404</p>
        <p className="titulo">Herramienta no encontrada...<code>{pathname}</code>.</p>
        <p className="titulo"><BotonLink to="/">Ir al inicio</BotonLink></p>
      </Seccion>
    </PlantillaPagina>
  )
}
export default NotFound