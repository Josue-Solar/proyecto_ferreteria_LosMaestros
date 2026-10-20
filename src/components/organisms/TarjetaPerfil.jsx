import Button from 'react-bootstrap/Button'
import DatoPerfil from '../molecules/DatoPerfil'

function TarjetaPerfil({ usuario, onCerrarSesion }) {
  return (
    <article className="tarjeta tarjeta-detalle">
      <h3>{usuario.nombre}</h3>
      <DatoPerfil etiqueta="Usuario" valor={usuario.usuario} />
      <DatoPerfil etiqueta="Correo" valor={usuario.correo} />
      <DatoPerfil etiqueta="Rol" valor={usuario.rol} />
      <Button variant="dark" onClick={onCerrarSesion}>Cerrar sesión</Button>
    </article>
  )
}