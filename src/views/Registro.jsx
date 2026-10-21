import Header from '../components/Header'
import Footer from '../components/Footer'
import Seccion from '../components/Seccion'
import FormularioRegistro from '../components/FormularioRegistro'

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