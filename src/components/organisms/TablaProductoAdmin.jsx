import Table from 'react-bootstrap/Table'

import FilaProductoAdmin from '../molecules/FilaProductoAdmin'

function TablaProductoAdmin({ productos, idEditando, onEditar, onEliminar }) {
  if (productos.length === 0) {
    return <p className="titulo">No hay productos en el catálogo.</p>
  }

  return (
    // "responsive" agrega scroll horizontal en pantallas pequeñas
    <Table responsive striped hover align="middle">
      <thead>
        <tr>
          <th>Imagen</th>
          <th>Producto</th>
          <th>Categoría</th>
          <th>Marca</th>
          <th>SKU</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((producto) => (
          <FilaProductoAdmin
            key={producto.id}
            producto={producto}
            editando={producto.id === idEditando}
            onEditar={onEditar}
            onEliminar={onEliminar}
          />
        ))}
      </tbody>
    </Table>
  )
}

export default TablaProductoAdmin