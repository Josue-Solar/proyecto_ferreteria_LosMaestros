function Perfil() {
  const navigate = useNavigate()
  const [usuario] = useState(obtenerSesion)

  const salir = () => {
    cerrarSesion()
    navigate('/login')
  }

  return (
    <PlantillaPagina>
      <Seccion id="perfil" titulo="Mi perfil">
        <TarjetaPerfil usuario={usuario} onCerrarSesion={salir} />
      </Seccion>
    </PlantillaPagina>
  )
}

export default Perfil