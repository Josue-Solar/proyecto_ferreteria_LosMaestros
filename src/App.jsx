import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from './views/Home'
import Productos from './views/Productos'
import ProductoDetalle from './views/ProductoDetalle'
import Registro from './views/Registro'
import Login from './views/Login'
import NotFound from './views/NotFound'
import PanelControl from './views/PanelControl'
import Perfil from './views/Perfil'
import RutaProtegida from './routes/RutaProtegida'

import { productos as productosIniciales } from './data/productos'
import { reemplazarProducto } from './utils/listaProductos'
import './styles/paginas.css'

function App() {
  // El estado de los productos vive aquí para que el panel y el catálogo
  // vean la misma lista (se pasa hacia abajo por props).
  const [productos, setProductos] = useState(productosIniciales)

  const agregarProducto = (nuevo) => {
    setProductos((anteriores) => [...anteriores, nuevo])
  }

  const eliminarProducto = (id) => {
    setProductos((anteriores) => anteriores.filter((p) => p.id !== id))
  }

  const actualizarProducto = (id, cambios) => {
    setProductos((anteriores) => reemplazarProducto(anteriores, id, cambios))
  }

  return (
    <Routes>
      <Route path="/" element={<Home productos={productos} />} />
      <Route path="/productos" element={<Productos productos={productos} />} />
      <Route path="/producto/:id" element={<ProductoDetalle productos={productos} />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/perfil"
        element={
          <RutaProtegida>
            <Perfil />
          </RutaProtegida>
        }
      />
      <Route
        path="/panel"
        element={
          <RutaProtegida>
            <PanelControl
              productos={productos}
              onAgregar={agregarProducto}
              onEliminar={eliminarProducto}
              onActualizar={actualizarProducto}
            />
          </RutaProtegida>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App