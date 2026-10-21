const SESION_KEY = 'sesionFerreteria'

// Credenciales estáticas: el enunciado pide validar contra datos fijos
const ADMIN = {
  usuario: 'admin',
  clave: 'maestros2026',
  nombre: 'Administrador Los Maestros',
  correo: 'losmaestrosferreteria@gmail.com',
  rol: 'Administrador',
  cargo: 'Encargado de inventario',
  sucursal: 'La Serena',
}

export function iniciarSesion(usuario, clave) {
  if (usuario.trim() !== ADMIN.usuario || clave !== ADMIN.clave) {
    return false
  }

  // Se guardan solo los datos públicos: la clave NUNCA va en la sesión
  const sesion = {
    usuario: ADMIN.usuario,
    nombre: ADMIN.nombre,
    correo: ADMIN.correo,
    rol: ADMIN.rol,
    cargo: ADMIN.cargo,
    sucursal: ADMIN.sucursal,
  }
  localStorage.setItem(SESION_KEY, JSON.stringify(sesion))
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

export function cerrarSesion() {
  localStorage.removeItem(SESION_KEY)
}
