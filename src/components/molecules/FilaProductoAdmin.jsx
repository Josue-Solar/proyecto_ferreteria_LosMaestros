import Button from 'react-bootstrap/Button'

import InsigniaStock from '../atoms/InsigniaStock'

function FilaProductoAdmin({ producto, onEliminar }) {
  return (
    <tr>
      <td>
        <img
          src={producto.imagen}
          alt={producto.nombre}
          width="48"
          height="48"
          style={{ objectFit: 'contain' }}
        />
      </td>
      <td>{producto.nombre}</td>
      <td>{producto.categoria ?? '—'}</td>
      <td>{producto.marca ?? '—'}</td>
      <td>{producto.sku ?? '—'}</td>
      <td>${producto.precio.toLocaleString('es-CL')}</td>
      <td>
        <InsigniaStock stock={producto.stock} unidad={producto.unidad} />
      </td>
      <td>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => onEliminar(producto.id)}
        >
          Eliminar
        </Button>
      </td>
    </tr>
  )
}

export default FilaProductoAdmin
