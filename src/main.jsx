import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.jsx'
import FavoritosProvider from './context/FavoritosProvider'
import TemaProvider from './context/TemaProvider'
import './App.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <TemaProvider>
        <FavoritosProvider>
          <App />
        </FavoritosProvider>
      </TemaProvider>
    </BrowserRouter>
  </StrictMode>,
)