import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css'   

function Formulario({className, controllId, label, type, placeHolder, asType}){
    return(
        <Form.Group className={className} controllId={controllId}>
                <Form.Label>{label}</Form.Label>
                <Form.Control as={asType} type={type} placeholder={placeHolder}/>
        </Form.Group>
    );
}

export default Formulario;