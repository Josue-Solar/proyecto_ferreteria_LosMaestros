export const TIPOS_CLIENTE = ['Particular', 'Maestro o contratista', 'Empresa constructora']
import { LISTA_COMUNAS } from "./comunasPorRegion"

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

  // Nombre y apellido solo letras y espacios
  const nombre = valores.nombre.trim()
  const apellido = valores.apellido.trim()
  if (!nombre) {
    errores.nombre = 'El nombre es obligatorio'
  } else if (!/^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ\s]+$/.test(nombre)) {
    errores.nombre = 'El nombre solo debe contener letras'
  }
  
  if (!apellido) {
    errores.apellido = 'El apellido es obligatorio'
  } else if (!/^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ\s]+$/.test(apellido)) {
    errores.apellido = 'El apellido solo debe contener letras'
  }

  // Contraseña: mínimo 8 caracteres, con mayúscula, minúscula y número
  const contrasenia = valores.contrasenia
  if (!contrasenia) {
    errores.contrasenia = 'La contraseña es obligatoria'
  } else if (
    contrasenia.length < 8 ||
    !/[A-Z]/.test(contrasenia) ||
    !/[a-z]/.test(contrasenia) ||
    !/\d/.test(contrasenia)
  ) {
    errores.contrasenia = 'Mínimo 8 caracteres, con mayúscula, minúscula y número'
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

  const region = valores.idRegion.trim()
  if(!region){
    errores.region = 'La región es obligatoria'
  }
  
  const comuna = valores.comuna.trim()
  if (!comuna) {
    errores.comuna = 'La comuna es obligatoria'
  } 

  return errores
}

// Validación del formulario "Editar perfil" (nombre, apellido y teléfono opcional)
export function validarPerfil(valores) {
  const errores = {}
  const soloLetras = /^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ\s]+$/

  const nombre = valores.nombre.trim()
  if (!nombre) {
    errores.nombre = 'El nombre es obligatorio'
  } else if (!soloLetras.test(nombre)) {
    errores.nombre = 'El nombre solo debe contener letras'
  }

  const apellido = valores.apellido.trim()
  if (!apellido) {
    errores.apellido = 'El apellido es obligatorio'
  } else if (!soloLetras.test(apellido)) {
    errores.apellido = 'El apellido solo debe contener letras'
  }

  // El teléfono puede quedar vacío, pero si se escribe debe tener el formato chileno
  if (valores.telefono && !/^\+56\d{9}$/.test(valores.telefono)) {
    errores.telefono = 'Debe llevar el prefijo +56 y 9 dígitos. Ejemplo: +56912345678'
  }

  return errores
}