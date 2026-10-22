import { Navigate, useLocation } from 'react-router-dom'
import { obtenerSesion } from '../utils/sesion'

function RutaProtegida({ children }) {
  const location = useLocation()

  // Guardamos la ruta pedida en "state" para que Login pueda devolvernos ahí
  if (!obtenerSesion()) {
    return <Navigate to="/login" replace state={{ desde: location.pathname }} />
  }
  return children
}

export default RutaProtegida
