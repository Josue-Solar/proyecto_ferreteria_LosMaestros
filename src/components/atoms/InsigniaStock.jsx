import Badge from 'react-bootstrap/Badge'

const STOCK_BAJO = 5

// Muestra el stock con color: rojo sin stock, amarillo bajo, verde normal.
// Los productos originales no tienen stock definido, ahí muestra un guion.
function InsigniaStock({ stock, unidad }) {
  if (stock === undefined) {
    return <Badge bg="secondary">Sin dato</Badge>
  }

  let color = 'success'
  if (stock === 0) color = 'danger'
  else if (stock <= STOCK_BAJO) color = 'warning'

  return (
    <Badge bg={color} text={color === 'warning' ? 'dark' : undefined}>
      {stock} {unidad ? unidad.toLowerCase() : ''}
    </Badge>
  )
}

export default InsigniaStock
