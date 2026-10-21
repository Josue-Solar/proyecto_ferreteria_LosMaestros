import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

import PlantillaPagina from '../components/templates/PlantillaPagina'
import Seccion from '../components/molecules/Seccion'
import Formulario from '../components/molecules/Formulario'
import { iniciarSesion } from '../utils/sesion'

function Login() {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState('')
  const [clave, setClave] = useState('')
  const [error, setError] = useState('')

  const manejarEnvio = (e) => {
    e.preventDefault()

    if (!usuario.trim() || !clave) {
      setError('Ingresa tu usuario y tu contraseña')
      return
    }

    if (iniciarSesion(usuario, clave)) {
      navigate('/panel')
    } else {
      setError('Usuario o contraseña incorrectos')
    }
  }

  return (
    <PlantillaPagina>
      <Seccion id="login" titulo="Iniciar sesión">
        <p className="titulo">Acceso para administradores de la ferretería.</p>

        <Form noValidate className="form-panel" onSubmit={manejarEnvio} style={{ maxWidth: '400px', margin: '0 auto' }}>
          {error && <Alert variant="danger">{error}</Alert>}

          <Formulario
            className="mb-3"
            controlId="loginUsuario"
            label="Nombre de usuario"
            type="text"
            placeholder="Ingrese su usuario"
            value={usuario}
            onChange={(e) => { setUsuario(e.target.value); setError('') }}
          />
          <Formulario
            className="mb-3"
            controlId="loginClave"
            label="Contraseña"
            type="password"
            placeholder="Ingrese su contraseña"
            value={clave}
            onChange={(e) => { setClave(e.target.value); setError('') }}
          />

          <Button variant="dark" type="submit">
            Ingresar
          </Button>
        </Form>
      </Seccion>
    </PlantillaPagina>
  )
}

export default Login
