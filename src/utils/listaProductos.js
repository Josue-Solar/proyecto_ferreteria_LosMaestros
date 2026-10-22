// Devuelve una lista NUEVA donde el producto con ese id queda con los cambios
// aplicados. No modifica la lista original (React necesita un array nuevo
// para detectar que el estado cambió).
export function reemplazarProducto(lista, id, cambios) {
  return lista.map((producto) =>
    producto.id === id ? { ...producto, ...cambios } : producto,
  )
}