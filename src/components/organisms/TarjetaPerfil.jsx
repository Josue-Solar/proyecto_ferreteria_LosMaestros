import Button from 'react-bootstrap/Button'

import AvatarPerfil from '../atoms/AvatarPerfil'
import DatoPerfil from '../molecules/DatoPerfil'
import BotonLink from '../atoms/BotonLink'

function TarjetaPerfil({ usuario, onEditar, onCerrarSesion }) {
  const esAdmin = usuario.rol === 'Administrador'

  return (
    <article className="tarjeta tarjeta-detalle">
      <AvatarPerfil foto={usuario.foto} nombre={usuario.nombre} apellido={usuario.apellido} />
      <h3>
        {usuario.nombre} {usuario.apellido}
      </h3>

      <DatoPerfil etiqueta="Usuario" valor={usuario.usuario} />
      <DatoPerfil etiqueta="Correo" valor={usuario.correo} />
      {usuario.telefono && <DatoPerfil etiqueta="Teléfono" valor={usuario.telefono} />}
      <DatoPerfil etiqueta="Rol" valor={usuario.rol} />

      {/* Datos que solo tiene el administrador */}
      {esAdmin && <DatoPerfil etiqueta="Cargo" valor={usuario.cargo} />}
      {esAdmin && <DatoPerfil etiqueta="Sucursal" valor={usuario.sucursal} />}

      {/* Datos que solo tienen los clientes (vienen del registro) */}
      {!esAdmin && <DatoPerfil etiqueta="Tipo de cliente" valor={usuario.tipoCliente} />}
      {!esAdmin && <DatoPerfil etiqueta="Región" valor={usuario.region} />}
      {!esAdmin && <DatoPerfil etiqueta="Comuna" valor={usuario.comuna} />}

      {esAdmin && (
        <p>
          <BotonLink to="/panel">Ir al panel de control</BotonLink>
        </p>
      )}

      <Button variant="dark" className="me-2" onClick={onEditar}>
        Editar perfil
      </Button>
      <Button variant="secondary" onClick={onCerrarSesion}>
        Cerrar sesión
      </Button>
    </article>
  )
}

export default TarjetaPerfil