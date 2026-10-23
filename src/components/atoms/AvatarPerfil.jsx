// Foto de perfil. Si el usuario no tiene foto, muestra un círculo con sus iniciales.
function AvatarPerfil({ foto, nombre, apellido = '' }) {
  if (foto) {
    return <img className="avatar-perfil" src={foto} alt={`Foto de ${nombre} ${apellido}`.trim()} />
  }

  const iniciales = `${nombre?.[0] ?? ''}${apellido?.[0] ?? ''}`.toUpperCase()
  return (
    <div className="avatar-perfil avatar-iniciales" aria-hidden="true">
      {iniciales || '?'}
    </div>
  )
}

export default AvatarPerfil