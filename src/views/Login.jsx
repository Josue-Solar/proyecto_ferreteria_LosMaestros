import Header from '../components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { itemsMenu } from '../data/itemsMenu';
import Seccion from '../components/molecules/Seccion';
import { Form } from 'react-bootstrap';
import Formulario from '../components/molecules/Formulario';
import Button from 'react-bootstrap/Button'

function Login(){
    return(
        <>
        <Header
            titulo="Fierros Duoc" 
            subtitulo="SUBTITULO"
            itemsMenu={itemsMenu}
        /> 
        <main id="contenido">
            <Seccion id="Login" titulo="Iniciar Sesión">
                <p>Aqui usted se logea</p>
                <Form>
                    <Formulario className={'mb-3'} controlld={'formNombreDeUsuario'} type={'text'} label={'Nombre de Usuario'} placeHolder={'Ingrese su Usuario'}>
                    </Formulario>
                    <Formulario className={'mb-3'} controlld={'formContraseña'} type={'password'} label={'Contraseña'} placeHolder={'Ingrese su Contraseña'}>
                    </Formulario>
                    <Button variant='primary' type='submit'>Ingresar</Button>
                </Form>
            </Seccion>
        </main>
        </>
    )

}
export default Login