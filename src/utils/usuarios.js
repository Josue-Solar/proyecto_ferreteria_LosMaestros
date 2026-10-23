const USUARIOS_KEY = 'usuariosFerreteria'

// El administrador viene "de fábrica" (credenciales estáticas que pide el enunciado)
export const ADMIN = {
  usuario: 'admin',
  clave: 'maestros2026',
  nombre: 'Administrador',
  apellido: 'Los Maestros',
  correo: 'losmaestrosferreteria@gmail.com',
  telefono: '+56954323442',
  rol: 'Administrador',
  cargo: 'Encargado de inventario',
  sucursal: 'La Serena',
  foto: '',
}

function leerGuardados() {
  try {
    const datos = localStorage.getItem(USUARIOS_KEY)
    const lista = datos ? JSON.parse(datos) : []
    return Array.isArray(lista) ? lista : []
  } catch {
    return []
  }
}

// Devuelve false si el navegador no tiene espacio (ej: foto muy pesada)
function guardarUsuarios(lista) {
  try {
    localStorage.setItem(USUARIOS_KEY, JSON.stringify(lista))
    return true
  } catch {
    return false
  }
}

// Si el admin aún no se ha guardado, se agrega al inicio de la lista
export function obtenerUsuarios() {
  const guardados = leerGuardados()
  const hayAdmin = guardados.some((u) => u.rol === ADMIN.rol)
  return hayAdmin ? guardados : [ADMIN, ...guardados]
}

// Busca por "usuario" (admin) o por correo (clientes), sin importar mayúsculas
export function buscarUsuario(identificador) {
  const id = String(identificador ?? '').trim().toLowerCase()
  if (!id) return null
  return (
    obtenerUsuarios().find(
      (u) => u.usuario.toLowerCase() === id || u.correo.toLowerCase() === id,
    ) ?? null
  )
}

// Devuelve { ok: true, usuario } o { ok: false, error }
export function registrarUsuario(datos) {
  const correo = datos.correo.trim().toLowerCase()

  if (buscarUsuario(correo)) {
    return { ok: false, error: 'Ya existe una cuenta con ese correo' }
  }

  const nuevo = {
    usuario: correo, // los clientes inician sesión con su correo
    clave: datos.contrasenia,
    nombre: datos.nombre.trim(),
    apellido: datos.apellido.trim(),
    telefono: datos.telefono,
    correo,
    fechaNacimiento: datos.fechaNacimiento,
    tipoCliente: datos.tipoCliente,
    region: datos.region,
    comuna: datos.comuna,
    rol: 'Cliente',
    foto: '',
  }

  if (!guardarUsuarios([...obtenerUsuarios(), nuevo])) {
    return { ok: false, error: 'No se pudo guardar: el almacenamiento del navegador está lleno' }
  }
  return { ok: true, usuario: nuevo }
}

// Cambia solo los campos indicados (nombre, apellido, telefono, foto...)
export function actualizarUsuario(usuario, cambios) {
  const lista = obtenerUsuarios()
  const actual = lista.find((u) => u.usuario === usuario)
  if (!actual) return { ok: false, error: 'No se encontró el usuario' }

  const actualizado = { ...actual, ...cambios }
  const nuevaLista = lista.map((u) => (u.usuario === usuario ? actualizado : u))

  if (!guardarUsuarios(nuevaLista)) {
    return { ok: false, error: 'No se pudo guardar: la foto es demasiado pesada para el navegador' }
  }
  return { ok: true, usuario: actualizado }
}