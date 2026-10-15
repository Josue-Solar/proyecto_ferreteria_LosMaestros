import { useState } from 'react'
import { Link } from 'react-router-dom'

function TarjetaProducto({ id, imagen, nombre, descripcion, precio }) {
  const [guardado, setGuardado] = useState(false)

  const alternarGuardado = () => {
    setGuardado(!guardado)
  }

  return (
    <article className="tarjeta">
      <div className="espacio-imagen">
        <Link to={`/producto/${id}`}>
          <img src={imagen} alt={nombre} />
        </Link>
      </div>

      <h3>{nombre}</h3>
      <p className="descripcion">{descripcion}</p>
      <p className="precio">${precio.toLocaleString('es-CL')}</p>

      <Link to={`/producto/${id}`} className="btn-ver">
        Ver detalle
      </Link>

      <button
        onClick={alternarGuardado}
        style={{
          backgroundColor: guardado ? '#bb7915' : '#999b9c',
          color: guardado ? '#ffffff' : '#0c0c0c',
          fontWeight: 'bold',
          borderRadius: '4px',
          border: 'none',
          padding: '8px 12px',
          marginLeft: '8px',
        }}
      >
        {guardado ? 'Guardado' : 'Guardar'}
      </button>
    </article>
  )
}

export default TarjetaProducto