import { Route, Routes, Navigate } from 'react-router-dom'

import Home from './views/Home'
import Productos from './views/Productos'
import ProductoDetalle from './views/ProductoDetalle'
import Registro from './views/Registro'
import Login from './views/Login'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/producto/:id" element={<ProductoDetalle />} />
      <Route path="/registro" element={<Registro />} />
      <Route path='/Login' element={<Login />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App