import Header from '../components/Header'
import Footer from '../components/organisms/Footer'
import Seccion from '../components/molecules/Seccion'
import GaleriaProductos from '../components/organisms/GaleriaProductos'

import { itemsMenu } from '../data/itemsMenu'
import { productos } from '../data/productos'

function Productos() {
  return (
    <>
      <Header
        titulo="Ferretería Los Maestros"
        subtitulo="Materiales de construcción, herramientas y ferretería general"
        itemsMenu={itemsMenu}
      />

      <main id="contenido">
        <Seccion id="catalogo" titulo="Nuestros productos">
          <p className="titulo">
            Encuentra herramientas eléctricas y manuales, materiales de
            carpintería y artículos de ferretería general para tu próximo
            proyecto.
          </p>

          <GaleriaProductos productos={productos} />
        </Seccion>
      </main>

      <Footer />
    </>
  )
}

export default Productos