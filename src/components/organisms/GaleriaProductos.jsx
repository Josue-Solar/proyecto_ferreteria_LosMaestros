import TarjetaProducto from '../TarjetaProducto'

function GaleriaProductos({ productos }) {
  return (
    <div className="galeria">
      {productos.map((producto) => (
        <TarjetaProducto
          key={producto.id}
          id={producto.id}
          imagen={producto.imagen}
          nombre={producto.nombre}
          descripcion={producto.descripcion}
          precio={producto.precio}
        />
      ))}
    </div>
  )
}

export default GaleriaProductos