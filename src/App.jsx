import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './views/home'
import Productos from './views/Productos'

function App() {
   return(
    <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/productos' element={<Productos />}/>
    </Routes>
   )

}

export default App