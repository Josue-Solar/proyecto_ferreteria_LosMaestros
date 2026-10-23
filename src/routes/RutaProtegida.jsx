import { Navigate, useLocation } from 'react-router-dom'
import { obtenerUsuarioActivo } from '../utils/sesion'

function RutaProtegida({ children, rol }) {
  const location = useLocation()
  const usuario = obtenerUsuarioActivo()

  if (!usuario) {
    return <Navigate to="/login" replace state={{ desde: location.pathname }} />
  }

  if (rol && usuario.rol !== rol) {
    return <Navigate to="/perfil" replace />
  }

  return children
}

export default RutaProtegida