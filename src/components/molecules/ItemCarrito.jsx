function ItemCarrito({ id, imagen, nombre, cantidad, precio, onQuitar }) {
  return (
    <article className="tarjeta">
      <div className="espacio-imagen">
        {imagen ? (
          <img
            src={imagen}
            alt={nombre}
            style={{
              height: '120px',
              width: '100%',
              objectFit: 'contain',
              backgroundColor: 'white',
              borderRadius: '5px',
            }}
          />
        ) : (
          <p className="titulo">Sin imagen</p>
        )}
      </div>

      <h3>{nombre}</h3>
      <p>Cantidad: {cantidad}</p>
      <p className="precio">${(precio * cantidad).toLocaleString('es-CL')}</p>

      <button
        type="button"
        className="btn-ver btn-quitar"
        onClick={() => onQuitar(id)}
        style={{ border: 'none', cursor: 'pointer' }}
      >
        Quitar
      </button>
    </article>
  )
}

export default ItemCarrito
