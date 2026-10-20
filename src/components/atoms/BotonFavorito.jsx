function BotonFavorito({ activo, onClick, nombreProducto }) {
  return (
    <button
      type="button"
      className={`btn-favorito${activo ? ' activo' : ''}`}
      onClick={onClick}
      aria-pressed={activo}
      aria-label={
        activo
          ? `Quitar ${nombreProducto} de favoritos`
          : `Agregar ${nombreProducto} a favoritos`
      }
    >
      {activo ? '♥ Favorito' : '♡ Favorito'}
    </button>
  )
}

export default BotonFavorito