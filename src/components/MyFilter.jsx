import Form from 'react-bootstrap/Form';
import { QuestionCircle } from 'react-bootstrap-icons';
import Toast from 'react-bootstrap/Toast';
import { useState } from 'react';

function MyFilter() {
    const [showToast, setShowToast] = useState(false);

    const toggleShowToast = () => setShowToast(!showToast);

    return (
        <Form className='position-relative mb-4' style={{ height: '40px' }}>
            <Form.Group className="d-flex align-items-center h-100" controlId="exampleForm.ControlInput1">
                <Form.Control type="email" placeholder="Filtro" />
                <a onClick={toggleShowToast}
                    role='button'
                >
                    <QuestionCircle
                        className='ms-2'
                        style={{ fontSize: '1.5rem', color: 'grey' }} />
                </a>
                <Toast className='position-absolute top-100 end-0'
                    style={{ zIndex: 50 }}
                    show={showToast}
                    onClose={toggleShowToast}>
                    <Toast.Header>
                        <strong className="me-auto">Instruções de filtragem</strong>
                        {/*<small>11 mins ago</small>*/}
                    </Toast.Header>
                    <Toast.Body>Este filtro retornará quaisquer ferramentas que possuam os valores inseridos.
                        <br /> As buscas são realizadas com base nos nomes das ferramentas e nas tags que elas possuem.
                    </Toast.Body>
                </Toast>
            </Form.Group>
        </Form >
    );
}

export default MyFilter;