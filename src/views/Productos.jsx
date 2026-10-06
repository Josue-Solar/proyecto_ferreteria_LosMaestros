import Header from '../components/Header'
import Footer from '../components/Footer';
import Body from '../components/body';
import Seccion from '../components/Seccion';
import GaleriaProductos from '../components/GaleriaProductos';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'

import imgSierra from '../assets/img/Sierra_carpinteria.jpg';
import Formulario from '../components/Formulario';

function Productos() {
    const productos = [
        {
            id:1,
            imagen: imgSierra,
            nombre: 'Serrucho de Carpintero Tradicional',
            descripcion: 'Herramienta manual clásica, ideal para cortes rectos.',
            precio: '9.990'
        }

    ];
  return (
    <>
    
    <Seccion id="producto" titulo="Nuestros productos">
    <p>Elige de nuestra seleccion de productos</p>
    <GaleriaProductos productos={productos} />
    </Seccion>
        </>
  )
}

export default Productos