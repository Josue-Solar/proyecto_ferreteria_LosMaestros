const SESION_KEY = 'sesionFerreteria'

const ADMIN = {                      // credenciales estáticas
  usuario: 'admin', clave: 'maestros2026',
  nombre: 'Administrador Los Maestros',
  correo: 'losmaestrosferreteria@gmail.com', rol: 'Administrador',
}

export function iniciarSesion(usuario, clave) {
  if (usuario !== ADMIN.usuario || clave !== ADMIN.clave) return false

  const sesion = { usuario: ADMIN.usuario, nombre: ADMIN.nombre,
                   correo: ADMIN.correo, rol: ADMIN.rol }   // sin la clave
  localStorage.setItem(SESION_KEY, JSON.stringify(sesion))
  return true
}

export function obtenerSesion() {
  try {
    const datos = localStorage.getItem(SESION_KEY)
    return datos ? JSON.parse(datos) : null
  } catch { return null }
}

export function cerrarSesion() { localStorage.removeItem(SESION_KEY) }