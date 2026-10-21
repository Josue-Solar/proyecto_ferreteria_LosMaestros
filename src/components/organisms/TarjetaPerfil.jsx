import Button from 'react-bootstrap/Button'

import DatoPerfil from '../molecules/DatoPerfil'
import BotonLink from '../atoms/BotonLink'

function TarjetaPerfil({ usuario, onCerrarSesion }) {
  return (
    <article className="tarjeta tarjeta-detalle">
      <h3>{usuario.nombre}</h3>

      <DatoPerfil etiqueta="Usuario" valor={usuario.usuario} />
      <DatoPerfil etiqueta="Correo" valor={usuario.correo} />
      <DatoPerfil etiqueta="Rol" valor={usuario.rol} />
      <DatoPerfil etiqueta="Cargo" valor={usuario.cargo} />
      <DatoPerfil etiqueta="Sucursal" valor={usuario.sucursal} />

      <p>
        <BotonLink to="/panel">Ir al panel de control</BotonLink>
      </p>

      <Button variant="dark" onClick={onCerrarSesion}>
        Cerrar sesión
      </Button>
    </article>
  )
}

export default TarjetaPerfil
