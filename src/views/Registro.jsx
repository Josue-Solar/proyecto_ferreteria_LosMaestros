import Header from '../components/organisms/Header'
import Footer from '../components/organisms/Footer'
import Seccion from '../components/molecules/Seccion'
import FormularioRegistro from '../components/organisms/FormularioRegistro'
import PlantillaPagina from '../components/templates/PlantillaPagina'

import { itemsMenu } from '../data/itemsMenu'

function Registro() {
  return (
    <>
      <PlantillaPagina>

      <main id="contenido">
        <Seccion id="registro" titulo="Registro de usuario">
          <p className="titulo">Completa tus datos para crear tu cuenta.</p>
          <FormularioRegistro />
        </Seccion>
      </main>

      </PlantillaPagina>
    </>
  )
}

export default Registro