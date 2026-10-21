import { Form } from "react-bootstrap"

const valoresIniciales = { nombre: '', precio: '', categoria: '', marca: '', stock: '', descripcion: '' }

function FormularioProducto({ onAgregar }) {
    const [valores, setValores] = useState(valoresIniciales)
    const [errores, setErrores] = useState({})
    const [mensaje, setMensaje] = useState('')

    const manejarCambio = (e) => {
        const { name, value } = e.target          // el name del input = la clave del estado
        setValores({ ...valores, [name]: value })
        setErrores({ ...errores, [name]: undefined })
        setMensaje('')
    }

    const manejarEnvio = (e) => {
        e.preventDefault()
        const nuevosErrores = validarProducto(valores)
        setErrores(nuevosErrores)
        if (Object.keys(nuevosErrores).length > 0) return   // hay errores: no seguimos

        onAgregar({
            id: `prod-${Date.now()}`,        // OJO: string, ver aviso abajo
            imagen: imgGenerica,             // import imgGenerica from '../../assets/img/producto-generico.png'
            nombre: valores.nombre.trim(),
            descripcion: valores.descripcion.trim(),
            precio: Number(valores.precio),  // los inputs entregan texto
            stock: Number(valores.stock) || 0,
            categoria: valores.categoria.trim()
        })
        setMensaje(`Producto "${valores.nombre.trim()}" agregado al catálogo`)
        setValores(valoresIniciales)
    }
  
    return (
    <Form noValidate className="form-panel" onSubmit={manejarEnvio}>
      {mensaje && <Alert variant="success">{mensaje}</Alert>}

      <Row>
        <Col md={8}>
          <Formulario
            className="mb-3"
            controlId="productoNombre"
            label="Nombre del producto"
            name="nombre"
            type="text"
            placeholder="Ej: Martillo de uña 16 oz"
            value={valores.nombre}
            onChange={manejarCambio}
            error={errores.nombre}
          />
        </Col>
        <Col md={4}>
          <Formulario
            className="mb-3"
            controlId="productoPrecio"
            label="Precio (CLP)"
            name="precio"
            type="number"
            min="1"
            placeholder="Ej: 7990"
            value={valores.precio}
            onChange={manejarCambio}
            error={errores.precio}
          />
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <Formulario
            className="mb-3"
            controlId="productoCategoria"
            label="Categoría"
            name="categoria"
            as="select"
            value={valores.categoria}
            onChange={manejarCambio}
            error={errores.categoria}
          >
            <option value="">Selecciona...</option>
            {CATEGORIAS.map((categoria) => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </Formulario>
        </Col>
        <Col md={4}>
          
        </Col>
        <Col md={4}>
          <Formulario
            className="mb-3"
            controlId="productoUnidad"
            label="Unidad de venta"
            name="unidad"
            as="select"
            value={valores.unidad}
            onChange={manejarCambio}
            error={errores.unidad}
          >
            <option value="">Selecciona...</option>
            {UNIDADES_VENTA.map((unidad) => (
              <option key={unidad} value={unidad}>
                {unidad}
              </option>
            ))}
          </Formulario>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          
        </Col>
        <Col md={6}>
          <Formulario
            className="mb-3"
            controlId="productoStock"
            label="Stock disponible"
            name="stock"
            type="number"
            min="0"
            placeholder="Ej: 25"
            value={valores.stock}
            onChange={manejarCambio}
            error={errores.stock}
          />
        </Col>
      </Row>

      <Formulario
        className="mb-3"
        controlId="productoDescripcion"
        label="Descripción"
        name="descripcion"
        as="textarea"
        rows={3}
        placeholder="Breve descripción que se verá en la tarjeta del catálogo"
        value={valores.descripcion}
        onChange={manejarCambio}
        error={errores.descripcion}
      />

      <Button variant="dark" type="submit" className="me-2">
        Agregar producto
      </Button>
      <Button variant="secondary" type="button" onClick={limpiar}>
        Limpiar
      </Button>
    </Form>
  )
}

export default FormularioProducto
