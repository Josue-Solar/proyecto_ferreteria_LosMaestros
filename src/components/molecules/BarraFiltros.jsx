import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function BarraFiltros({ filtros, categorias, totalFavoritos, onCambio, onLimpiar }) {
  return (
    <Form className="barra-filtros mb-4" onSubmit={(e) => e.preventDefault()}>
      <div className="d-flex flex-wrap gap-3 align-items-end">
        <Form.Group controlId="filtroTexto" className="flex-grow-1">
          <Form.Label>Buscar</Form.Label>
          <Form.Control
            type="search"
            placeholder="Ej: sierra, taladro..."
            value={filtros.texto}
            onChange={(e) => onCambio('texto', e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="filtroCategoria">
          <Form.Label>Categoría</Form.Label>
          <Form.Select
            value={filtros.categoria}
            onChange={(e) => onCambio('categoria', e.target.value)}
          >
            <option value="todas">Todas</option>
            {categorias.map((categoria) => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="filtroOrden">
          <Form.Label>Ordenar por</Form.Label>
          <Form.Select
            value={filtros.orden}
            onChange={(e) => onCambio('orden', e.target.value)}
          >
            <option value="ninguno">Sin ordenar</option>
            <option value="precio-asc">Precio: menor a mayor</option>
            <option value="precio-desc">Precio: mayor a menor</option>
            <option value="nombre">Nombre (A-Z)</option>
          </Form.Select>
        </Form.Group>

        <Form.Check
          type="switch"
          id="filtroFavoritos"
          label={`Solo favoritos (${totalFavoritos})`}
          checked={filtros.soloFavoritos}
          onChange={(e) => onCambio('soloFavoritos', e.target.checked)}
        />

        <Button variant="outline-dark" type="button" onClick={onLimpiar}>
          Limpiar filtros
        </Button>
      </div>
    </Form>
  )
}

export default BarraFiltros