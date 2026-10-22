import { Link } from 'react-router-dom'

import Header from '../components/Header'
import Footer from '../components/organisms/Footer'
import Seccion from '../components/molecules/Seccion'
import GaleriaProductos from '../components/organisms/GaleriaProductos'

import { itemsMenu } from '../data/itemsMenu'
// Ids de los productos que se muestran como "destacados" en el inicio.
// Los datos viven en un solo lugar (data/productos.js); aquí solo elegimos cuáles mostrar.
const IDS_DESTACADOS = [
  'sierra-circular-1400w',
  'set-cinceles',
  'serrucho-tradicional',
]

function Home({ productos }) {
  const destacados = productos.filter((p) => IDS_DESTACADOS.includes(p.id))

  return (
    <>
      <Header
        titulo="Ferretería Los Maestros"
        subtitulo="Materiales de construcción, herramientas y ferretería general"
        itemsMenu={itemsMenu}
      />

      <main id="contenido">
        <Seccion id="inicio" titulo="Bienvenido">
          <p className="titulo">
            Negocio familiar de La Serena con más de 22 años de trayectoria,
            especializado en materiales de construcción, herramientas eléctricas
            y manuales, gasfitería y electricidad.
          </p>
        </Seccion>

        <Seccion id="productos-destacados" titulo="Productos destacados">
          <GaleriaProductos productos={destacados} />

          <p className="titulo" style={{ marginTop: '20px' }}>
            <Link to="/productos" className="btn-ver">
              Ver más productos
            </Link>
          </p>
        </Seccion>
      </main>

      <Footer />
    </>
  )
}

export default Home