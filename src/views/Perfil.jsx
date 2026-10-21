import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import PlantillaPagina from '../components/templates/PlantillaPagina'
import Seccion from '../components/molecules/Seccion'
import TarjetaPerfil from '../components/organisms/TarjetaPerfil'
import { obtenerSesion, cerrarSesion } from '../utils/sesion'

function Perfil() {
  const navigate = useNavigate()
  // Sin paréntesis: React ejecuta la función una sola vez (inicialización perezosa)
  const [usuario] = useState(obtenerSesion)

  const salir = () => {
    cerrarSesion()
    navigate('/login')
  }

  return (
    <PlantillaPagina>
      <Seccion id="perfil" titulo="Mi perfil">
        <TarjetaPerfil usuario={usuario} onCerrarSesion={salir} />
      </Seccion>
    </PlantillaPagina>
  )
}

export default Perfil
