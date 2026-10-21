import { CATEGORIAS, UNIDADES_VENTA } from '../data/opcionesProducto'

// Recibe los valores del formulario (todo texto) y devuelve un objeto de errores.
// Si el objeto sale vacío, el producto es válido.
// "productosExistentes" sirve para comprobar que el código SKU no se repita.
export function validarProducto(valores, productosExistentes = []) {
  const errores = {}

  const nombre = valores.nombre.trim()
  if (!nombre) {
    errores.nombre = 'El nombre es obligatorio'
  } else if (nombre.length < 3 || nombre.length > 80) {
    errores.nombre = 'El nombre debe tener entre 3 y 80 caracteres'
  }

  // Código interno de bodega, formato LM-0001
  const sku = valores.sku.trim().toUpperCase()
  if (!sku) {
    errores.sku = 'El código SKU es obligatorio'
  } else if (!/^LM-\d{4}$/.test(sku)) {
    errores.sku = 'Formato inválido. Ejemplo: LM-0001'
  } else if (productosExistentes.some((p) => p.sku === sku)) {
    errores.sku = 'Ya existe un producto con ese código SKU'
  }

  if (!CATEGORIAS.includes(valores.categoria)) {
    errores.categoria = 'Selecciona una categoría'
  }

  const marca = valores.marca.trim()
  if (!marca) {
    errores.marca = 'La marca es obligatoria'
  } else if (marca.length < 2 || marca.length > 40) {
    errores.marca = 'La marca debe tener entre 2 y 40 caracteres'
  }

  if (!UNIDADES_VENTA.includes(valores.unidad)) {
    errores.unidad = 'Selecciona la unidad de venta'
  }

  const precio = String(valores.precio).trim()
  if (!precio) {
    errores.precio = 'El precio es obligatorio'
  } else if (!/^\d+$/.test(precio) || Number(precio) <= 0) {
    errores.precio = 'Ingresa un precio entero mayor a 0 (CLP)'
  }

  const stock = String(valores.stock).trim()
  if (!stock) {
    errores.stock = 'El stock es obligatorio'
  } else if (!/^\d+$/.test(stock) || Number(stock) > 100000) {
    errores.stock = 'El stock debe ser un número entero entre 0 y 100000'
  }

  const descripcion = valores.descripcion.trim()
  if (!descripcion) {
    errores.descripcion = 'La descripción es obligatoria'
  } else if (descripcion.length < 10 || descripcion.length > 120) {
    errores.descripcion = 'La descripción debe tener entre 10 y 120 caracteres'
  }

  return errores
}
