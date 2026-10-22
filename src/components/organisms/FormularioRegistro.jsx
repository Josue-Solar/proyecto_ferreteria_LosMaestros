import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

import { validarRegistro, TIPOS_CLIENTE } from '../../utils/validaciones'
import { LISTA_COMUNAS } from '../../utils/comunasPorRegion'

const valoresIniciales = {
  nombre: '',
  apellido:'',
  telefono: '',
  correo: '',
  contrasenia: '',
  fechaNacimiento: '',
  tipoCliente: '',
  region: '',
  idRegion: '',
  comuna: '',
}

function FormularioRegistro() {
  const [valores, setValores] = useState(valoresIniciales)
  const [errores, setErrores] = useState({})
  const [registrado, setRegistrado] = useState('')
    console.log(valores)

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

      <Form.Group className="mb-3" controlId="registroNombre">
        <Form.Label>Apellido</Form.Label>
        <Form.Control
          type="text"
          name="apellido"
          placeholder="Ingrese su apellido"
          value={valores.apellido}
          onChange={manejarCambio}
          isInvalid={!!errores.apellido}
        />
        <Form.Control.Feedback type="invalid">{errores.apellido}</Form.Control.Feedback>
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

      <Form.Group className="mb-3" controlId="registroContrasenia">
        <Form.Label>Cree contraseña</Form.Label>
        <Form.Control
          type="password"
          name="contrasenia"
          placeholder="ej: Admin.1234"
          value={valores.contrasenia}
          onChange={manejarCambio}
          isInvalid={!!errores.contrasenia}
        />

        <Form.Control.Feedback type='invalid'>{errores.contrasenia}</Form.Control.Feedback>
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

      <Form.Group className="mb-3" controlId="registroTipoCliente">
        <Form.Label>Tipo de cliente</Form.Label>
        <Form.Select
          name="tipoCliente"
          value={valores.tipoCliente}
          onChange={manejarCambio}
          isInvalid={!!errores.tipoCliente}
        >
          <option value="">Seleccione una opción</option>
          {TIPOS_CLIENTE.map((tipo) => (
            <option key={tipo} value={tipo}>
              {tipo}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">{errores.tipoCliente}</Form.Control.Feedback>
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="registroRegion">
        <Form.Label>Región</Form.Label>
        <Form.Select
          name="idRegion"
          value={valores.idRegion}
          onChange={manejarCambio}
          isInvalid={!!errores.region}
        >
          <option value="">Seleccione una opción</option>
          {LISTA_COMUNAS.map((region) => (
            <option key={region.idRegion} value={region.idRegion}>
              {region.region}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">{errores.idRegion}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="registroComuna">
        <Form.Label>Comuna</Form.Label>
        <Form.Select
          name="comuna"
          value={valores.comuna}
          onChange={manejarCambio}
          isInvalid={!!errores.comuna}
          disabled={!valores.idRegion ? true : false}
        >
          <option value="">Seleccione una opción</option>
          
          {LISTA_COMUNAS[Number(valores.idRegion)].comunas.map((comunas) => (
            <option key={comunas} value={comunas}>
              {comunas}
            </option>
            
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">{errores.comuna}</Form.Control.Feedback>
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