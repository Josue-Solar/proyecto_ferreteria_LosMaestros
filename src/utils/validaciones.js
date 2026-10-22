export const TIPOS_CLIENTE = ['Particular', 'Maestro o contratista', 'Empresa constructora']

// Calculo de edad en anios a partir de fecha
export function calcularEdad(fechaTexto, hoy = new Date()) {
  const [anio, mes, dia] = fechaTexto.split('-').map(Number)

  let edad = hoy.getFullYear() - anio
  const mesActual = hoy.getMonth() + 1

  if (mesActual < mes || (mesActual === mes && hoy.getDate() < dia)) {
    edad--
  }

  return edad
}

// agarra los val del formulario y devuelve un obj con los errore
export function validarRegistro(valores, hoy = new Date()) {
  const errores = {}

  // Nombre solo letras y espacios
  const nombre = valores.nombre.trim()
  if (!nombre) {
    errores.nombre = 'El nombre es obligatorio'
  } else if (!/^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ\s]+$/.test(nombre)) {
    errores.nombre = 'El nombre solo debe contener letras'
  }

  // Edad numero entero, mayor de 18
  const edad = Number(valores.edad)
  if (!valores.edad) {
    errores.edad = 'La edad es obligatoria'
  } else if (!Number.isInteger(edad) || edad > 120) {
    errores.edad = 'Ingresa una edad válida'
  } else if (edad < 18) {
    errores.edad = 'Debes ser mayor de 18 años para registrarte'
  }

  // Telefono con el formato chile del +56 y 9 digitos
  if (!valores.telefono) {
    errores.telefono = 'El teléfono es obligatorio'
  } else if (!/^\+56\d{9}$/.test(valores.telefono)) {
    errores.telefono = 'Debe llevar el prefijo +56 y 9 dígitos. Ejemplo: +56912345678'
  }

  // Correo solo gmail, outlook o duocuc
  const correo = valores.correo.trim()
  if (!correo) {
    errores.correo = 'El correo es obligatorio'
  } else if (!/^[^\s@]+@(gmail\.com|outlook\.com|duocuc\.cl)$/i.test(correo)) {
    errores.correo = 'El correo debe ser @gmail.com, @outlook.com o @duocuc.cl'
  }

  // Fecha de nacimiento debe ser mayor de 18 años
  if (!valores.fechaNacimiento) {
    errores.fechaNacimiento = 'La fecha de nacimiento es obligatoria'
  } else if (calcularEdad(valores.fechaNacimiento, hoy) < 18) {
    errores.fechaNacimiento = 'Debes ser mayor de 18 años para registrarte'
  }

  // Campos propios de la ferretería: tipo de cliente (lista cerrada) y comuna
  if (!valores.tipoCliente) {
    errores.tipoCliente = 'Selecciona el tipo de cliente'
  } else if (!TIPOS_CLIENTE.includes(valores.tipoCliente)) {
    errores.tipoCliente = 'Selecciona una opción válida'
  }

  const comuna = valores.comuna.trim()
  if (!comuna) {
    errores.comuna = 'La comuna es obligatoria'
  } else if (comuna.length < 3 || comuna.length > 40) {
    errores.comuna = 'La comuna debe tener entre 3 y 40 caracteres'
  } else if (!/^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ\s]+$/.test(comuna)) {
    errores.comuna = 'La comuna solo debe contener letras'
  }

  return errores
}