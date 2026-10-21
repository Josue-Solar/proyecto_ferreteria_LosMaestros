import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Formulario from '../components/Formulario'

import { itemsMenu } from '../data/itemsMenu'
import { iniciarSesion } from '../utils/sesion'

function Login() {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const manejarEnvio = (e) => {
    e.preventDefault()

    if (iniciarSesion(usuario, password)) {
      navigate('/')
    } else {
      setError('Usuario o contraseña incorrectos')
    }
  }

  return (
    <>
      <Header
        titulo="Ferretería Los Maestros"
        subtitulo="Materiales de construcción, herramientas y ferretería general"
        itemsMenu={itemsMenu}
      />

      <main id="contenido">
        <Form id="login" className="login" onSubmit={manejarEnvio}>
          <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
            <legend>Inicio de sesión</legend>

            <Formulario
              className="mb-3"
              controlId="usuario"
              label="Usuario:"
              type="text"
              placeHolder="Ingrese su usuario"
              value={usuario}
              onChange={(e) => {
                setUsuario(e.target.value)
                setError('')
              }}
              required
            />

            <Formulario
              className="mb-3"
              controlId="password"
              label="Contraseña:"
              type="password"
              placeHolder="Ingrese su contraseña"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError('')
              }}
              required
            />

            {error && (
              <Alert variant="danger" className="mt-3 mb-0" role="alert">
                {error}
              </Alert>
            )}

            <button type="submit">INGRESAR</button>
          </fieldset>
        </Form>
      </main>

      <Footer />
    </>
  )
}

export default Login
