import Header from '../components/organisms/Header'
import Footer from '../components/organisms/Footer'
import Seccion from '../components/molecules/Seccion'
import FormularioRegistro from '../components/organisms/FormularioRegistro'

import { itemsMenu } from '../data/itemsMenu'

function Registro() {
  return (
    <>
      <Header
        titulo="Ferretería Los Maestros"
        subtitulo="Materiales de construcción, herramientas y ferretería general"
        itemsMenu={itemsMenu}
      />

      <main id="contenido">
        <Seccion id="registro" titulo="Registro de usuario">
          <p className="titulo">Completa tus datos para crear tu cuenta.</p>
          <FormularioRegistro />
        </Seccion>
      </main>

      <Footer />
    </>
  )
}

export default Registro