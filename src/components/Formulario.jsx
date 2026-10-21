import Form from 'react-bootstrap/Form'

function Formulario({ className, controlId, label, type, placeHolder, asType, ...resto }) {
  return (
    <Form.Group className={className} controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Control as={asType} type={type} placeholder={placeHolder} {...resto} />
    </Form.Group>
  )
}

export default Formulario
