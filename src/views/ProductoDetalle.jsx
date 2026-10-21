import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import Header from '../components/Header'
import Footer from '../components/organisms/Footer'
import Seccion from '../components/molecules/Seccion'

import { itemsMenu } from '../data/itemsMenu'
import { agregarAlCarrito } from '../utils/carrito'

function ProductoDetalle({ productos }) {
  const { id } = useParams()
  const producto = productos.find((p) => p.id === id)

  const [cantidadTexto, setCantidadTexto] = useState('1')
  const [mensaje, setMensaje] = useState('')

  const cantidad = Math.max(1, parseInt(cantidadTexto, 10) || 1)
  const total = producto ? producto.precio * cantidad : 0

  const manejarAgregar = () => {
    agregarAlCarrito(producto, cantidad)
    setMensaje(
      `✔ Agregaste ${cantidad} unidad(es) de "${producto.nombre}" al carrito — Total: $${total.toLocaleString('es-CL')}`
    )
  }

  return (
    <>
      <Header
        titulo="Ferretería Los Maestros"
        subtitulo="Materiales de construcción, herramientas y ferretería general"
        itemsMenu={itemsMenu}
      />

      <main id="contenido">
        <Seccion id="detalle-producto" titulo="Detalle de producto">
          <p>
            <Link to="/productos" className="btn-ver">
              ‹ Volver al catálogo
            </Link>
          </p>

          {!producto ? (
            <>
              <h3>Producto no encontrado</h3>
              <p>Vuelve al catálogo y selecciona un producto válido.</p>
            </>
          ) : (
            <article className="tarjeta tarjeta-detalle">
              <div className="espacio-imagen">
                <img src={producto.imagen} alt={producto.nombre} />
              </div>

              <h3>{producto.nombre}</h3>
              <p>{producto.detalle}</p>
              <p className="precio">${producto.precio.toLocaleString('es-CL')}</p>

              <div>
                <label htmlFor="cantidad">Cantidad: </label>
                <input
                  type="number"
                  id="cantidad"
                  min="1"
                  value={cantidadTexto}
                  onChange={(e) => setCantidadTexto(e.target.value)}
                  style={{ width: '70px' }}
                />

                <p>Total: ${total.toLocaleString('es-CL')}</p>

                <button
                  type="button"
                  className="btn-ver"
                  onClick={manejarAgregar}
                  style={{ border: 'none', cursor: 'pointer', fontSize: '16px' }}
                >
                  Agregar al carrito
                </button>

                {mensaje && (
                  <p style={{ marginTop: '10px', fontWeight: 'bold' }}>{mensaje}</p>
                )}
              </div>
            </article>
          )}
        </Seccion>
      </main>

      <Footer />
    </>
  )
}

export default ProductoDetalle