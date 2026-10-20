function BotonTema({ oscuro, onClick }) {
  return (
    <button
      type="button"
      className="btn-tema"
      onClick={onClick}
      aria-pressed={oscuro}
      aria-label={oscuro ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
    >
      {oscuro ? '☀️ Claro' : '🌙 Oscuro'}
    </button>
  )
}

export default BotonTema