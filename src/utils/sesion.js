const SESION_KEY = 'sesionFerreteria'

// Credenciales estáticas (la evaluación pide validar contra datos fijos)
export const CREDENCIALES = { usuario: 'admin', password: 'admin123' }

export function iniciarSesion(usuario, password) {
  const valido =
    usuario.trim() === CREDENCIALES.usuario && password === CREDENCIALES.password

  if (valido) {
    localStorage.setItem(SESION_KEY, JSON.stringify({ usuario: CREDENCIALES.usuario }))
  }
  return valido
}

export function cerrarSesion() {
  localStorage.removeItem(SESION_KEY)
}

export function obtenerSesion() {
  try {
    const datos = localStorage.getItem(SESION_KEY)
    return datos ? JSON.parse(datos) : null
  } catch {
    return null
  }
}

export function haySesion() {
  return obtenerSesion() !== null
}
