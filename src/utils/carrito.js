const CARRITO_KEY = 'carritoFerreteria'

export function obtenerCarrito() {
  try {
    const datos = localStorage.getItem(CARRITO_KEY)
    return datos ? JSON.parse(datos) : []
  } catch {
    return []
  }
}

export function guardarCarrito(carrito) {
  localStorage.setItem(CARRITO_KEY, JSON.stringify(carrito))
}

export function agregarAlCarrito(producto, cantidad) {
  const carrito = obtenerCarrito()
  const existente = carrito.find((item) => item.id === producto.id)

  if (existente) {
    existente.cantidad += cantidad
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad: cantidad,
    })
  }

  guardarCarrito(carrito)
}

export function contarUnidadesCarrito() {
  return obtenerCarrito().reduce((total, item) => total + item.cantidad, 0)
}