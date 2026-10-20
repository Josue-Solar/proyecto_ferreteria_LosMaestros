import { Navigate } from 'react-router-dom'
import { obtenerSesion } from '../utils/sesion'

function RutaProtegida({ children }) {
  if (!obtenerSesion()) return <Navigate to="/login" replace />
  return children
}
export default RutaProtegida