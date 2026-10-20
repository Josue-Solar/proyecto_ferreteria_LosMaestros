import { useState } from 'react'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Seccion from '../components/Seccion'
import GaleriaProductos from '../components/GaleriaProductos'
import BarraFiltros from '../components/molecules/BarraFiltros'

import { itemsMenu } from '../data/itemsMenu'
import { productos } from '../data/productos'
import { useFavoritos } from '../context/FavoritosContext'
import {
  FILTROS_INICIALES,
  filtrarProductos,
  obtenerCategorias,
} from '../utils/filtros'

function Productos() {
  const [filtros, setFiltros] = useState(FILTROS_INICIALES)
  const { favoritos } = useFavoritos()

  const categorias = obtenerCategorias(productos)
  const visibles = filtrarProductos(productos, filtros, favoritos)

  const cambiarFiltro = (campo, valor) => {
    setFiltros({ ...filtros, [campo]: valor })
  }

  const limpiarFiltros = () => {
    setFiltros(FILTROS_INICIALES)
  }

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

          <BarraFiltros
            filtros={filtros}
            categorias={categorias}
            totalFavoritos={favoritos.length}
            onCambio={cambiarFiltro}
            onLimpiar={limpiarFiltros}
          />

          <p aria-live="polite">
            Mostrando {visibles.length} de {productos.length} productos
          </p>

          {visibles.length > 0 ? (
            <GaleriaProductos productos={visibles} />
          ) : (
            <p className="titulo">No se encontraron productos con esos filtros.</p>
          )}
        </Seccion>
      </main>

      <Footer />
    </>
  )
}

export default Productos