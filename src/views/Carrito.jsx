import { useState } from 'react'
import { Link } from 'react-router-dom'

import PlantillaPagina from '../components/templates/PlantillaPagina'
import Seccion from '../components/molecules/Seccion'
import ItemCarrito from '../components/molecules/ItemCarrito'

import {
  obtenerCarrito,
  eliminarDelCarrito,
  vaciarCarrito,
  calcularTotalCarrito,
} from '../utils/carrito'

function Carrito() {
  const [carrito, setCarrito] = useState(obtenerCarrito)
  const [mensajePago, setMensajePago] = useState('')

  const total = calcularTotalCarrito()

  const manejarQuitar = (id) => {
    eliminarDelCarrito(id)
    setCarrito(obtenerCarrito())
  }

  const manejarPagar = () => {
    setMensajePago(
      `✔ Pago simulado por $${total.toLocaleString('es-CL')}. ¡Gracias por tu compra! (Simulación: no se procesó ningún pago real)`
    )
    vaciarCarrito()
    setCarrito([])
  }

  return (
    <PlantillaPagina>
      <Seccion id="seccion-carrito" titulo="Tu Carrito">
        {carrito.length === 0 ? (
          <p className="titulo">
            Tu carrito está vacío. <Link to="/productos">Ver productos</Link>
          </p>
        ) : (
          <>
            <div className="galeria">
              {carrito.map((item) => (
                <ItemCarrito
                  key={item.id}
                  id={item.id}
                  imagen={item.imagen}
                  nombre={item.nombre}
                  cantidad={item.cantidad}
                  precio={item.precio}
                  onQuitar={manejarQuitar}
                />
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <p className="precio">Total: ${total.toLocaleString('es-CL')}</p>
              <button
                type="button"
                className="btn-ver"
                onClick={manejarPagar}
                style={{ border: 'none', cursor: 'pointer', fontSize: '16px' }}
              >
                Simular pago
              </button>
            </div>
          </>
        )}

        {mensajePago && (
          <p style={{ textAlign: 'center', marginTop: '15px', fontWeight: 'bold' }}>
            {mensajePago}
          </p>
        )}
      </Seccion>
    </PlantillaPagina>
  )
}

export default Carrito
