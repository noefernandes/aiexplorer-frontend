import '../css/header.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import PersonCircle from 'react-bootstrap-icons/dist/icons/person-circle';
import { Button, Modal, Form } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MyModal(props) {
    return (
        <Modal show={props.show} onHide={props.onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={props.onHide}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>

    );
}

function Header() {
    const [modalShow, setModalShow] = useState(false);
    const handleModalShow = () => setModalShow(true);
    const navigate = useNavigate();

    const goToCategorias = () => {
        navigate('/categorias');
    }

    const goToAIToolAdminPage = () => {
        navigate('/');
    }

    const goToFavoritos = () => {
        navigate('/favoritos');
    }

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand className='me-5' role='button' onClick={goToAIToolAdminPage}>AIExplorer</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav">

                    </Navbar.Toggle>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link onClick={goToFavoritos}>Meus Favoritos</Nav.Link>
                            <Nav.Link>Tarefas</Nav.Link>
                            <NavDropdown title="Administração" id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={goToCategorias}>
                                    Categorias
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#nada" onClick={() => handleModalShow(true)}>
                                <PersonCircle className="me-2" size="35" />
                                Login
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <MyModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}

export default Header;