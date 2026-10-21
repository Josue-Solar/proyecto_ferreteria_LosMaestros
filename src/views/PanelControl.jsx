import PlantillaPagina from '../components/templates/PlantillaPagina'
import Seccion from '../components/molecules/Seccion'
import FormularioProducto from '../components/organisms/FormularioProducto'
import TablaProductoAdmin from '../components/organisms/TablaProductoAdmin'
import BotonLink from '../components/atoms/BotonLink'

function PanelControl({ productos, onAgregar, onEliminar }) {
  return (
    <PlantillaPagina>
      <Seccion id="panel-nuevo" titulo="Panel de control">
        <p className="titulo">
          Agrega productos al catálogo. Los cambios se mantienen mientras la
          página esté abierta.
        </p>
        <FormularioProducto productos={productos} onAgregar={onAgregar} />
      </Seccion>

      <Seccion id="panel-inventario" titulo={`Inventario (${productos.length} productos)`}>
        <TablaProductoAdmin productos={productos} onEliminar={onEliminar} />
        <p className="titulo">
          <BotonLink to="/productos">Ver catálogo público</BotonLink>
        </p>
      </Seccion>
    </PlantillaPagina>
  )
}

export default PanelControl
