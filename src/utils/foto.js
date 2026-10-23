const TIPOS_PERMITIDOS = ['image/jpeg', 'image/png', 'image/webp']
const TAMANO_MAXIMO = 1024 * 1024

// Devuelve un texto de error, o '' si el archivo sirve
export function validarFoto(archivo) {
  if (!TIPOS_PERMITIDOS.includes(archivo.type)) {
    return 'La foto debe ser JPG, PNG o WEBP'
  }
  if (archivo.size > TAMANO_MAXIMO) {
    return 'La foto no puede pesar más de 1 MB'
  }
  return ''
}

export function leerFoto(archivo) {
  return new Promise((resolve, reject) => {
    const lector = new FileReader()
    lector.onload = () => resolve(lector.result)
    lector.onerror = () => reject(new Error('No se pudo leer la foto'))
    lector.readAsDataURL(archivo)
  })
}