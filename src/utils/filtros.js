export const FILTROS_INICIALES = {
  texto: '',
  categoria: 'todas',
  orden: 'ninguno',
  soloFavoritos: false,
}

//quita tildes y pasa a minusculas para que. Por ej "electrica" encuentre "Eléctrica"
function normalizar(texto) {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

//lista de categorias sin repetir, para llenar el selector
export function obtenerCategorias(productos) {
  return [...new Set(productos.map((producto) => producto.categoria))].sort()
}

// Aplica texto, categoria, favoritos y orden
export function filtrarProductos(productos, filtros, favoritos = []) {
  const busqueda = normalizar(filtros.texto)

  const resultado = productos.filter((producto) => {
    const coincideTexto =
      !busqueda ||
      normalizar(`${producto.nombre} ${producto.descripcion}`).includes(busqueda)
    const coincideCategoria =
      filtros.categoria === 'todas' || producto.categoria === filtros.categoria
    const coincideFavorito =
      !filtros.soloFavoritos || favoritos.includes(producto.id)

    return coincideTexto && coincideCategoria && coincideFavorito
  })

  if (filtros.orden === 'precio-asc') {
    resultado.sort((a, b) => a.precio - b.precio)
  } else if (filtros.orden === 'precio-desc') {
    resultado.sort((a, b) => b.precio - a.precio)
  } else if (filtros.orden === 'nombre') {
    resultado.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'))
  }

  return resultado
}