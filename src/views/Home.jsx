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

function Home() {
    const itemsMenu = [
        {href: '#inicio', label: 'Inicio'},
        {href: '#Productos', label: 'Productos'},
        {href: '#nosotros', label: 'Nosotros'},
        {href: '#sugerencias', label: 'Sugerencias'},
        {href: '#reclamos', label: 'Reclamos'},
        {href: 'www.goggle.cl', label: 'Intranet'},

    ];
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
    <Header 
        titulo="Fierros Duoc" 
        descripcion="Ferreteria de fierros duoc"
        itemsMenu={itemsMenu}
    />

    <main id="contenido">
        <Seccion id="inicio" titulo="Bienvenido A los Carpinteros XD">
                <p className="titulo">Negocio familiar de La Serena con más de 22 años de trayectoria, especializado en materiales de construcción, herramientas eléctricas y manuales, gasfitería y electricidad.</p>
                
        </Seccion>

        <Seccion id="producto" titulo="Nuestros productos">
            <p>Elige de nuestra seleccion de productos</p>
            <GaleriaProductos productos={productos} />
        </Seccion>

        <Seccion id="contacto" titulo="Contactanos">
            <p>Realiza tus consultas</p>
            <Form>
                <Formulario className={'mb-3'} controllId={'formNombre'} type={'text'} label={'Nombre'} placeHolder={'Ingrese su nombre'}>
                </Formulario>
                <Formulario className={'mb-3'} controllId={'formEmail'} type={'email'} label={'Email'} placeHolder={'Ingrese su email'}>
                </Formulario>
                <Formulario className={'mb-3'} controllId={'formMensaje'} asType={'textarea'} label={'Mensaje'} placeHolder={'Ingrese mensaje'}>
                </Formulario>
                <Button variant='primary' type='submit'>Enviar mensaje</Button>
            </Form>
        </Seccion>
    </main>
    </>
  )
}

export default Home