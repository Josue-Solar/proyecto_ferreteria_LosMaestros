import { Link } from 'react-router-dom'

import BotonFavorito from './atoms/BotonFavorito'
import { useFavoritos } from '../context/FavoritosContext'

function TarjetaProducto({ id, imagen, nombre, descripcion, precio }) {
  const { esFavorito, alternarFavorito } = useFavoritos()

  return (
    <article className="tarjeta">
      <div className="espacio-imagen">
        <Link to={`/producto/${id}`}>
          <img src={imagen} alt={nombre} />
          {nombre}
        </Link>
      </div>

      <p className="descripcion">{descripcion}</p>
      <p className="precio">${precio.toLocaleString('es-CL')}</p>

      <Link to={`/producto/${id}`} className="btn-ver">
        Ver detalle
      </Link>

      <BotonFavorito
        activo={esFavorito(id)}
        onClick={() => alternarFavorito(id)}
        nombreProducto={nombre}
      />
    </article>
  )
}

export default TarjetaProducto