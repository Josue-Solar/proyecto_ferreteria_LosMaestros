import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import Formulario from '../molecules/Formulario'
import { validarProducto } from '../../utils/validacionesProducto'
import { CATEGORIAS, UNIDADES_VENTA } from '../../data/opcionesProducto'
import imgGenerica from '../../assets/img/generica.jpg'
const valoresIniciales = { nombre: '', precio: '', categoria: '', marca: '', stock: '', descripcion: '', sku: '', unidad: '', detalle: '' }

// Convierte un producto en los valores (texto) que muestra el formulario.
// Los productos originales no tienen sku, marca, unidad ni stock: quedan vacíos.
function valoresDesde(producto) {
  if (!producto) return valoresIniciales

  return {
    nombre: producto.nombre,
    sku: producto.sku ?? '',
    categoria: producto.categoria ?? '',
    marca: producto.marca ?? '',
    unidad: producto.unidad ?? '',
    precio: String(producto.precio),
    stock: producto.stock === undefined ? '' : String(producto.stock),
    descripcion: producto.descripcion,
    detalle: producto.detalle ?? ''
  }
}


function FormularioProducto({ productos, productoEditando, onAgregar, onActualizar, onCancelar }) {
  const modoEdicion = Boolean(productoEditando)
  // useState(() => ...) calcula los valores iniciales solo en el primer render
  const [valores, setValores] = useState(() => valoresDesde(productoEditando))
  const [errores, setErrores] = useState({})

  // Un solo manejador para todos los campos: el "name" del input
  // coincide con la clave del estado.
  const manejarCambio = (e) => {
    const { name, value } = e.target
    setValores({ ...valores, [name]: value })
    setErrores({ ...errores, [name]: undefined })
  }

  const limpiar = () => {
    setValores(valoresIniciales)
    setErrores({})
  }

  const manejarEnvio = (e) => {
    e.preventDefault()
    // Al editar, el SKU del propio producto no cuenta como "repetido"
    const otrosProductos = productos.filter((p) => p.id !== productoEditando?.id)
    const nuevosErrores = validarProducto(valores, otrosProductos)
    setErrores(nuevosErrores)
    if (Object.keys(nuevosErrores).length > 0) return   // hay errores: no seguimos

    const descripcion = valores.descripcion.trim()

    const datos = {
      nombre: valores.nombre.trim(),
      descripcion,
      precio: Number(valores.precio), // los inputs entregan texto
      categoria: valores.categoria,
      marca: valores.marca.trim(),
      sku: valores.sku.trim().toUpperCase(),
      unidad: valores.unidad,
      stock: Number(valores.stock),
      detalle
    }

    if (modoEdicion) {
      // "detalle" sigue a la descripción solo si antes eran iguales
      // (así no se pisa el detalle largo de los productos originales)
      const detalle =
        productoEditando.detalle === productoEditando.descripcion
          ? descripcion
          : productoEditando.detalle

      onActualizar(productoEditando.id, { ...datos, detalle })
      return
    }

    onAgregar({
      ...datos,
      id: `prod-${Date.now()}`, // string: useParams() siempre entrega texto
      imagen: imgGenerica, // imagen genérica, no se suben archivos
      detalle: descripcion,
    })
    setValores(valoresIniciales)

  }
  
  return (
    <Form noValidate className="form-panel" onSubmit={manejarEnvio}>

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
            controlId="productoSku"
            label="Código SKU"
            name="sku"
            type="text"
            placeholder="LM-0001"
            value={valores.sku}
            onChange={manejarCambio}
            error={errores.sku}
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
          <Formulario
            className="mb-3"
            controlId="productoMarca"
            label="Marca"
            name="marca"
            type="text"
            placeholder="Ej: Stanley"
            value={valores.marca}
            onChange={manejarCambio}
            error={errores.marca}
          />
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
        <Col md={8}>
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
        </Col>
      </Row>

      <Formulario
        className="mb-3"
        controlId="productoDetalle"
        label="Detalle"
        name="detalle"
        as="textarea"
        rows={3}
        placeholder="Información detallada del producto presentado"
        value={valores.detalle}
        onChange={manejarCambio}
        error={errores.detalle}
      />

      <Button variant="dark" type="submit" className="me-2">
        {modoEdicion ? 'Guardar cambios' : 'Agregar producto'}
      </Button>
      <Button
        variant="secondary"
        type="button"
        onClick={modoEdicion ? onCancelar : limpiar}
      >
        {modoEdicion ? 'Cancelar edición' : 'Limpiar'}
      </Button>
    </Form>
  )
}

export default FormularioProducto
