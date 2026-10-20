import Header from '../Header'
import Footer from '../organisms/Footer'
import { itemsMenu } from '../../data/itemsMenu'

function PlantillaPagina({ children }) {
  return (
    <>
      <Header titulo="Ferretería Los Maestros" subtitulo="..." itemsMenu={itemsMenu} />
      <main id="contenido">{children}</main>
      <Footer />
    </>
  )
}
export default PlantillaPagina