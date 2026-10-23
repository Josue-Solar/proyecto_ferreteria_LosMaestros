import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

import AvatarPerfil from '../atoms/AvatarPerfil'
import { validarPerfil } from '../../utils/validaciones'
import { validarFoto, leerFoto } from '../../utils/foto'

// Formulario para editar el perfil. Parte con los datos actuales del usuario.
// onGuardar(cambios) devuelve un texto de error, o '' si todo salió bien.
function FormularioPerfil({ usuario, onGuardar, onCancelar }) {
  const [valores, setValores] = useState({
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    telefono: usuario.telefono ?? '',
    foto: usuario.foto ?? '',
  })
  const [errores, setErrores] = useState({})
  const [errorGuardado, setErrorGuardado] = useState('')

  const manejarCambio = (e) => {
    const { name, value } = e.target
    setValores({ ...valores, [name]: value })
    setErrores({ ...errores, [name]: undefined })
    setErrorGuardado('')
  }

  const manejarFoto = async (e) => {
    const archivo = e.target.files[0]
    if (!archivo) return

    const error = validarFoto(archivo)
    if (error) {
      setErrores({ ...errores, foto: error })
      return
    }

    try {
      const foto = await leerFoto(archivo)
      setValores((actuales) => ({ ...actuales, foto }))
      setErrores((actuales) => ({ ...actuales, foto: undefined }))
    } catch {
      setErrores((actuales) => ({ ...actuales, foto: 'No se pudo leer la foto' }))
    }
  }

  const quitarFoto = () => {
    setValores({ ...valores, foto: '' })
    setErrores({ ...errores, foto: undefined })
  }

  const manejarEnvio = (e) => {
    e.preventDefault()

    const nuevosErrores = validarPerfil(valores)
    setErrores(nuevosErrores)
    if (Object.keys(nuevosErrores).length > 0) return

    const error = onGuardar({
      nombre: valores.nombre.trim(),
      apellido: valores.apellido.trim(),
      telefono: valores.telefono,
      foto: valores.foto,
    })
    setErrorGuardado(error)
  }

  return (
    <Form noValidate className="form-panel" onSubmit={manejarEnvio} style={{ maxWidth: '500px', margin: '0 auto' }}>
      {errorGuardado && <Alert variant="danger">{errorGuardado}</Alert>}

      <div className="text-center mb-3">
        <AvatarPerfil foto={valores.foto} nombre={valores.nombre} apellido={valores.apellido} />
      </div>

      <Form.Group className="mb-3" controlId="perfilFoto">
        <Form.Label>Foto de perfil</Form.Label>
        <Form.Control
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={manejarFoto}
          isInvalid={!!errores.foto}
        />
        <Form.Control.Feedback type="invalid">{errores.foto}</Form.Control.Feedback>
        <Form.Text muted>JPG, PNG o WEBP de hasta 1 MB.</Form.Text>
        {valores.foto && (
          <div>
            <Button variant="link" size="sm" className="px-0" onClick={quitarFoto}>
              Quitar foto
            </Button>
          </div>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="perfilNombre">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          name="nombre"
          value={valores.nombre}
          onChange={manejarCambio}
          isInvalid={!!errores.nombre}
        />
        <Form.Control.Feedback type="invalid">{errores.nombre}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="perfilApellido">
        <Form.Label>Apellido</Form.Label>
        <Form.Control
          type="text"
          name="apellido"
          value={valores.apellido}
          onChange={manejarCambio}
          isInvalid={!!errores.apellido}
        />
        <Form.Control.Feedback type="invalid">{errores.apellido}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="perfilTelefono">
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

      <Form.Group className="mb-3" controlId="perfilCorreo">
        <Form.Label>Correo (no se puede cambiar)</Form.Label>
        <Form.Control type="email" value={usuario.correo} readOnly disabled />
      </Form.Group>

      <Button variant="dark" type="submit" className="me-2">
        Guardar cambios
      </Button>
      <Button variant="secondary" type="button" onClick={onCancelar}>
        Cancelar
      </Button>
    </Form>
  )
}

export default FormularioPerfil