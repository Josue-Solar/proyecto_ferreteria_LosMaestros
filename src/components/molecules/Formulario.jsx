import Form from 'react-bootstrap/Form'

function Formulario({ className, controlId, label, error, children, ...propsControl }) {
  return (
    <Form.Group className={className} controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Control isInvalid={!!error} {...propsControl}>{children}</Form.Control>
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  )
}