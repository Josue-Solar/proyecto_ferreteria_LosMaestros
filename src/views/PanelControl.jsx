import { useState } from 'react'
import Alert from 'react-bootstrap/Alert'

import PlantillaPagina from '../components/templates/PlantillaPagina'
import Seccion from '../components/molecules/Seccion'
import FormularioProducto from '../components/organisms/FormularioProducto'
import TablaProductoAdmin from '../components/organisms/TablaProductoAdmin'
import BotonLink from '../components/atoms/BotonLink'

function PanelControl({ productos, onAgregar, onActualizar, onEliminar }) {
  // Producto que se está editando (null = el formulario crea uno nuevo)
  const [productoEditando, setProductoEditando] = useState(null)
  const [mensaje, setMensaje] = useState('')

  const manejarAgregar = (producto) => {
    onAgregar(producto)
    setMensaje(`Producto "${producto.nombre}" agregado al catálogo`)
  }

  const manejarActualizar = (id, cambios) => {
    onActualizar(id, cambios)
    setProductoEditando(null) // vuelve el formulario al modo "crear"
    setMensaje(`Producto "${cambios.nombre}" actualizado`)
  }

  const manejarEditar = (producto) => {
    setProductoEditando(producto)
    setMensaje('')
    window.scrollTo({ top: 0, behavior: 'smooth' }) // el formulario está arriba
  }

  const manejarEliminar = (id) => {
    onEliminar(id)
    // Si justo se estaba editando ese producto, se cancela la edición
    if (productoEditando?.id === id) {
      setProductoEditando(null)
    }
  }

  return (
    <PlantillaPagina>
      <Seccion
        id="panel-nuevo"
        titulo={productoEditando ? 'Editar producto' : 'Panel de control'}
      >
        <p className="titulo">
          {productoEditando
            ? `Estás editando: ${productoEditando.nombre}`
            : 'Agrega productos al catálogo. Los cambios se mantienen mientras la página esté abierta.'}
        </p>

        {mensaje && (
          <Alert variant="success" dismissible onClose={() => setMensaje('')}>
            {mensaje}
          </Alert>
        )}

        {/* key distinta = React crea un formulario nuevo con los valores del producto */}
        <FormularioProducto
          key={productoEditando ? productoEditando.id : 'nuevo'}
          productos={productos}
          productoEditando={productoEditando}
          onAgregar={manejarAgregar}
          onActualizar={manejarActualizar}
          onCancelar={() => setProductoEditando(null)}
        />
      </Seccion>

      <Seccion id="panel-inventario" titulo={`Inventario (${productos.length} productos)`}>
        <TablaProductoAdmin
          productos={productos}
          idEditando={productoEditando?.id}
          onEditar={manejarEditar}
          onEliminar={manejarEliminar}
        />
        <p className="titulo">
          <BotonLink to="/productos">Ver catálogo público</BotonLink>
        </p>
      </Seccion>
    </PlantillaPagina>
  )
}

export default PanelControl