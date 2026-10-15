import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

import { validarRegistro } from '../utils/validaciones'

const valoresIniciales = {
  nombre: '',
  edad: '',
  telefono: '',
  correo: '',
  fechaNacimiento: '',
}

function FormularioRegistro() {
  const [valores, setValores] = useState(valoresIniciales)
  const [errores, setErrores] = useState({})
  const [registrado, setRegistrado] = useState('')

  const manejarCambio = (e) => {
    const { name, value } = e.target
    setValores({ ...valores, [name]: value })
    setErrores({ ...errores, [name]: undefined })
    setRegistrado('')
  }

  const manejarEnvio = (e) => {
    e.preventDefault()

    const nuevosErrores = validarRegistro(valores)
    setErrores(nuevosErrores)

    if (Object.keys(nuevosErrores).length === 0) {
      setRegistrado(valores.nombre.trim())
      setValores(valoresIniciales)
    } else {
      setRegistrado('')
    }
  }

  const limpiar = () => {
    setValores(valoresIniciales)
    setErrores({})
    setRegistrado('')
  }

  return (
    <Form noValidate className="form-registro" onSubmit={manejarEnvio} style={{ maxWidth: '600px', margin: '0 auto' }}>
      {registrado && (
        <Alert variant="success">
          ¡Registro exitoso! Bienvenido/a, {registrado}.
        </Alert>
      )}

      <Form.Group className="mb-3" controlId="registroNombre">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          name="nombre"
          placeholder="Ingrese su nombre"
          value={valores.nombre}
          onChange={manejarCambio}
          isInvalid={!!errores.nombre}
        />
        <Form.Control.Feedback type="invalid">{errores.nombre}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="registroEdad">
        <Form.Label>Edad</Form.Label>
        <Form.Control
          type="number"
          name="edad"
          placeholder="Ingrese su edad"
          value={valores.edad}
          onChange={manejarCambio}
          isInvalid={!!errores.edad}
        />
        <Form.Control.Feedback type="invalid">{errores.edad}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="registroTelefono">
        <Form.Label>Teléfono</Form.Label>
        <Form.Control
          type="tel"
          name="telefono"
          placeholder="+56912345678"
          value={valores.telefono}
          onChange={manejarCambio}
          isInvalid={!!errores.telefono}
        />
        <Form.Control.Feedback type="invalid">{errores.telefono}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="registroCorreo">
        <Form.Label>Correo electrónico</Form.Label>
        <Form.Control
          type="email"
          name="correo"
          placeholder="ejemplo@gmail.com"
          value={valores.correo}
          onChange={manejarCambio}
          isInvalid={!!errores.correo}
        />
        <Form.Control.Feedback type="invalid">{errores.correo}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="registroFechaNacimiento">
        <Form.Label>Fecha de nacimiento</Form.Label>
        <Form.Control
          type="date"
          name="fechaNacimiento"
          value={valores.fechaNacimiento}
          onChange={manejarCambio}
          isInvalid={!!errores.fechaNacimiento}
        />
        <Form.Control.Feedback type="invalid">{errores.fechaNacimiento}</Form.Control.Feedback>
      </Form.Group>

      <Button variant="dark" type="submit" className="me-2">
        Registrarse
      </Button>
      <Button variant="secondary" type="button" onClick={limpiar}>
        Limpiar
      </Button>
    </Form>
  )
}

export default FormularioRegistro