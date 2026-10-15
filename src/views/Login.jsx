import Header from '../components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { itemsMenu } from '../data/itemsMenu';
import Seccion from '../components/Seccion';
import { Form } from 'react-bootstrap';
import Formulario from '../components/Formulario';
import Button from 'react-bootstrap/Button'

function Login(){
    return(
        <>
   <Header
        titulo="Fierros Duoc" 
        descripcion="Ferreteria de fierros duoc"
        itemsMenu={itemsMenu}
   /> 
<main id="contenido">
        <Seccion id="Login" titulo="Iniciar Sesión">
            <p>Aqui usted se logea</p>
            <Form>
                <Formulario className={'mb-3'} controllId={'formNombreDeUsuario'} type={'text'} label={'Nombre de Usuario'} placeHolder={'Ingrese su Usuario'}>
                </Formulario>
                <Formulario className={'mb-3'} controllId={'formContraseña'} type={'email'} label={'Contraseña'} placeHolder={'Ingrese su Contraseña'}>
                </Formulario>
                <Button variant='primary' type='submit'>Ingresar</Button>
            </Form>
        </Seccion>
</main>
       </>
    )

}
export default Login