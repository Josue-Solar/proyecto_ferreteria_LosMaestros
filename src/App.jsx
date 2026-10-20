import { Route, Routes, Navigate } from 'react-router-dom'

import Home from './views/Home'
import Productos from './views/Productos'
import ProductoDetalle from './views/ProductoDetalle'
import Registro from './views/Registro'
import Login from './views/Login'
import NotFound from './views/NotFound'
import PanelControl from './views/PanelControl'
import Perfil from './views/Perfil'
import RutaProtegida from './routes/RutaProtegida'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/producto/:id" element={<ProductoDetalle />} />
      <Route path="/registro" element={<Registro />} />
      <Route path='/login' element={<Login />} />
      <Route path="/panel" element={<RutaProtegida><PanelControl /></RutaProtegida>} />
      <Route path='/perfil' element={<RutaProtegida>
            <Perfil></Perfil>
          </RutaProtegida>} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App