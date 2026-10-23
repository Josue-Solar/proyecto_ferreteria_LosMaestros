import { buscarUsuario } from './usuarios'

const SESION_KEY = 'sesionFerreteria'

// En la sesión solo se guarda QUIÉN es y su rol.
// La clave NUNCA va en la sesión y los datos del perfil se leen desde usuarios.js
export function iniciarSesion(identificador, clave) {
  const usuario = buscarUsuario(identificador)

  if (!usuario || usuario.clave !== clave) {
    return false
  }

  localStorage.setItem(
    SESION_KEY,
    JSON.stringify({ usuario: usuario.usuario, rol: usuario.rol }),
  )
  return true
}

export function obtenerSesion() {
  try {
    const datos = localStorage.getItem(SESION_KEY)
    return datos ? JSON.parse(datos) : null
  } catch {
    return null
  }
}

// Datos completos del usuario con sesión iniciada (o null)
export function obtenerUsuarioActivo() {
  const sesion = obtenerSesion()
  return sesion ? buscarUsuario(sesion.usuario) : null
}

export function cerrarSesion() {
  localStorage.removeItem(SESION_KEY)
}