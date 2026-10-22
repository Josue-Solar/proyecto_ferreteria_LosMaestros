const PRODUCTOS_KEY = 'productosFerreteria'

// La lista se guarda SIN la imagen: las imágenes importadas tienen rutas que
// cambian al compilar el proyecto, así que se vuelven a asignar al leer.
export function guardarProductos(productos) {
  const sinImagen = productos.map(({ imagen: _imagen, ...resto }) => resto)
  localStorage.setItem(PRODUCTOS_KEY, JSON.stringify(sinImagen))
}

// Devuelve la lista guardada o, si no hay nada guardado, la lista inicial.
export function obtenerProductos(productosIniciales, imagenGenerica) {
  try {
    const datos = localStorage.getItem(PRODUCTOS_KEY)
    if (!datos) return productosIniciales

    return JSON.parse(datos).map((producto) => {
      // Los productos originales recuperan su imagen; los creados en el panel
      // usan la imagen genérica.
      const original = productosIniciales.find((p) => p.id === producto.id)
      return { ...producto, imagen: original ? original.imagen : imagenGenerica }
    })
  } catch {
    return productosIniciales
  }
}

export function borrarProductosGuardados() {
  localStorage.removeItem(PRODUCTOS_KEY)
}