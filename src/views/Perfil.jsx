import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'

import PlantillaPagina from '../components/templates/PlantillaPagina'
import Seccion from '../components/molecules/Seccion'
import TarjetaPerfil from '../components/organisms/TarjetaPerfil'
import FormularioPerfil from '../components/organisms/FormularioPerfil'
import { obtenerUsuarioActivo, cerrarSesion } from '../utils/sesion'
import { actualizarUsuario } from '../utils/usuarios'

function Perfil() {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState(obtenerUsuarioActivo)
  const [editando, setEditando] = useState(false)
  const [mensaje, setMensaje] = useState('')

  const salir = () => {
    cerrarSesion()
    navigate('/login')
  }

  const guardarPerfil = (cambios) => {
    const resultado = actualizarUsuario(usuario.usuario, cambios)
    if (!resultado.ok) return resultado.error

    setUsuario(resultado.usuario)
    setEditando(false)
    setMensaje('Perfil actualizado correctamente')
    return ''
  }

  return (
    <PlantillaPagina>
      <Seccion id="perfil" titulo={editando ? 'Editar perfil' : 'Mi perfil'}>
        {mensaje && !editando && (
          <Alert variant="success" dismissible onClose={() => setMensaje('')}>
            {mensaje}
          </Alert>
        )}

        {editando ? (
          <FormularioPerfil
            usuario={usuario}
            onGuardar={guardarPerfil}
            onCancelar={() => setEditando(false)}
          />
        ) : (
          <TarjetaPerfil
            usuario={usuario}
            onEditar={() => { setMensaje(''); setEditando(true) }}
            onCerrarSesion={salir}
          />
        )}
      </Seccion>
    </PlantillaPagina>
  )
}

export default Perfil