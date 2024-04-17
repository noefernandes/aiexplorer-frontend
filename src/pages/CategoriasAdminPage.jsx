import { Container } from "react-bootstrap";
import Header from "../components/Header";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import { PlusSquareFill } from "react-bootstrap-icons";
import { useState, useEffect } from "react";
import token from "../service/token";
import api from "../service/api";

function ModalTag(props) {

    return (
        <Modal show={props.show} onHide={props.onHide} size='md' centered>
            <Modal.Header closeButton>
                <Modal.Title>Cadastrar Categoria</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id='formRegister' onSubmit={props.onFormSubmit}>
                    <Form.Group className="mb-3">
                        <Row>
                            <Col xs={8} sm={8} md={8} className='mb-3'>
                                <Form.Control className=''
                                    id="nameInput"
                                    type="text"
                                    placeholder="Descrição da categoria"
                                    name='name'
                                    value={props.tag.name}
                                    onChange={props.onChange}
                                />
                            </Col>
                            <Col xs={4} sm={4} md={4} className='mb-3'>
                                <Form.Control
                                    id="colorInput"
                                    type="color"
                                    name="color"
                                    defaultValue={props.tag.color}
                                    placeholder="Cor"
                                    onChange={props.onChange}
                                />
                            </Col>
                        </Row>

                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" type='submit' form='formRegister' onClick={props.onHide}>
                    Cadastrar
                </Button>
                <Button variant="secondary" onClick={props.onHide}>
                    Fechar
                </Button>
            </Modal.Footer>
        </Modal >
    )
}

function CategoriasAdminPage() {
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [data, setData] = useState([]);
    const [tag, setTag] = useState({ name: '', color: '#ffffff' });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setTag({
            ...tag,
            [name]: value,
        });
    };

    const onShowAlert = () => {
        setShowSuccessAlert(true);
    }

    useEffect(() => {
        let timeout;

        if (showSuccessAlert) {
            const timeout = setTimeout(() => {
                setShowSuccessAlert(false);
            }, 2000);
        }

        return () => clearTimeout(timeout);
    }, [showSuccessAlert]);

    const onFormSubmit = async (e) => {
        e.preventDefault();

        try {
            /* await api.post('/api/v1/tag', tag,
                {
                    headers: {
                        Authorization: token
                    }
                }) */
            await api.post('/api/v1/tag', tag)

            onShowAlert();
            setData([...data, tag]);
        } catch (error) {
            console.log(error);
        }
    }

    const initialFetch = async () => {
        fillPage();
    }

    useEffect(() => {
        initialFetch();
    }, []);

    const fillPage = async () => {
        try {
            /* const res = await api.get(`api/v1/tags`, {
                headers: {
                    Authorization: token
                }
            }); */
            const res = await api.get(`api/v1/tags`);
            setData(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Header />
            <Container className='mt-5'>
                <Alert id='alertCadastroSucesso' className={`${showSuccessAlert ? 'd-block' : 'd-none'}`} variant='success'>
                    Categoria cadastrada com sucesso!
                </Alert>
                <div className='d-flex align-items-center mb-5'>
                    <h2>Cadastrar nova categoria</h2>

                    <a className='ms-3 d-flex alig-items-center'
                        role='button'
                        style={{ fontSize: '2rem' }}
                        onClick={() => setShowRegisterModal(true)}>
                        <PlusSquareFill />
                    </a>
                </div>

                <Row xs={1} xl={2} className='mb-3'>
                    {data.map((ob, idx) => (
                        <Col key={idx} className='mb-2'>
                            <Card>
                                <Card.Body
                                    className="d-flex align-items-center justify-content-between"
                                >
                                    <Card.Text className="mb-0">{ob.name}</Card.Text>
                                    <Form.Control
                                        type="color"
                                        value={ob.color}
                                        disabled
                                    />
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
            <ModalTag
                show={showRegisterModal}
                onHide={() => setShowRegisterModal(false)}
                tag={tag}
                onFormSubmit={onFormSubmit}
                onChange={handleChange}
            />
        </>
    )
}

export default CategoriasAdminPage;