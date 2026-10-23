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
import Carrito from './views/Carrito'
import RutaProtegida from './routes/RutaProtegida'

import { productos as productosIniciales } from './data/productos'
import { reemplazarProducto } from './utils/listaProductos'
import {
  guardarProductos,
  obtenerProductos,
  borrarProductosGuardados,
} from './utils/almacenProductos'
import imgGenerica from './assets/img/generica.jpg'
import './styles/paginas.css'

function App() {
  // El estado de los productos vive aquí para que el panel y el catálogo
  // vean la misma lista (se pasa hacia abajo por props).
  // Al abrir la página se lee lo guardado en localStorage (si hay algo).
  const [productos, setProductos] = useState(() =>
    obtenerProductos(productosIniciales, imgGenerica),
  )

  // Cambia la lista en pantalla Y la guarda en localStorage
  const guardarLista = (nuevaLista) => {
    setProductos(nuevaLista)
    guardarProductos(nuevaLista)
  }

  const agregarProducto = (nuevo) => {
    guardarLista([...productos, nuevo])
  }

  const eliminarProducto = (id) => {
    guardarLista(productos.filter((p) => p.id !== id))
  }

  const actualizarProducto = (id, cambios) => {
    guardarLista(reemplazarProducto(productos, id, cambios))
  }

  // Vuelve a los productos originales y borra lo guardado
  const restablecerProductos = () => {
    borrarProductosGuardados()
    setProductos(productosIniciales)
  }

  return (
    <Routes>
      <Route path="/" element={<Home productos={productos} />} />
      <Route path="/productos" element={<Productos productos={productos} />} />
      <Route path="/producto/:id" element={<ProductoDetalle productos={productos} />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/carrito" element={<Carrito />} />
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
          <RutaProtegida rol="Administrador">
            <PanelControl
              productos={productos}
              onAgregar={agregarProducto}
              onEliminar={eliminarProducto}
              onActualizar={actualizarProducto}
              onRestablecer={restablecerProductos}
            />
          </RutaProtegida>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App