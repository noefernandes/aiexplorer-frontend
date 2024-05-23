import '../css/content.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { ChevronDown, ChevronUp, Github, Linkedin, Discord, Instagram, ThreeDotsVertical, PlusSquareFill, Heart, HeartFill } from 'react-bootstrap-icons';
import { Card, Dropdown, Modal, Accordion, useAccordionButton, Stack, Alert, Spinner } from 'react-bootstrap';
import image from '../assets/download.jpg';
import { useCallback, useEffect, useState } from 'react';
import React from 'react';
import MyPagination from '../components/MyPagination';
import MyFilter from '../components/MyFilter';
import api from '../service/api';
import AiToolModel from '../model/AITool';
import Header from '../components/Header';
import Form from 'react-bootstrap/Form';
import Avatar from '../components/Avatar';
import MultiSelect from '../components/MultiSelect';
import Badge from '../components/Badge';

function ModalTool(props) {

    return (
        <Modal show={props.show} onHide={props.onHide} size='xl' centered>
            <Modal.Header closeButton>
                <Modal.Title>Cadastrar Ferramenta</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={props.validated} id='formRegister'
                    onSubmit={props.onFormSubmit}>
                    <Col>
                        <Avatar setPicture={props.setPicture} />
                    </Col>

                    <Row>
                        <Form.Group as={Col} controlId="controlInput1">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control className=''
                                type="text"
                                placeholder=""
                                name='name'
                                value={props.aitool.name}
                                onChange={props.onChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="controlInput2">
                            <Col className='mb-3'>
                                <Form.Label>Site oficial</Form.Label>
                                <Form.Control className=''
                                    type="text"
                                    placeholder=""
                                    name='site_url'
                                    value={props.aitool.site_url}
                                    onChange={props.onChange}
                                    required
                                />
                            </Col>
                        </Form.Group>
                    </Row>

                    <Form.Group as={Col} controlId="controlInput2">
                        <Form.Label>Descrição curta</Form.Label>
                        <Form.Control className='mb-3'
                            type="text"
                            placeholder=""
                            name='short_description'
                            value={props.aitool.short_description}
                            onChange={props.onChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="controlInput3">
                        <Form.Label>Descrição longa</Form.Label>
                        <Form.Control className='mb-3'
                            as="textarea"
                            rows={4}
                            placeholder=""
                            name='description'
                            value={props.aitool.description}
                            onChange={props.onChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group as={Col} className='mb-3' controlId="controlInput4">
                        <Form.Label>Categorias</Form.Label>
                        <MultiSelect
                            validated={props.validated}
                            aitool={props.aitool}
                            setAitool={props.setAitool}
                            setSelectedTags={props.setSelectedTags}
                            selectedTags={props.selectedTags}
                            options={props.options}
                            required
                        />
                        {props.selectedTags.length === 0 && (
                            <p style={{ color: 'red', display: props.validated ? 'block' : 'none' }}>
                                Por favor, selecione pelo menos uma opção.
                            </p>
                        )}
                    </Form.Group>

                    <Form.Group as={Col} controlId="controlInput5">
                        <Form.Label>Instagram</Form.Label>
                        <Form.Control className='mb-3'
                            type="text"
                            placeholder=""
                            name='instagram_url'
                            value={props.aitool.instagram_url}
                            onChange={props.onChange}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="controlInput6">
                        <Form.Label>Discord</Form.Label>
                        <Form.Control className='mb-3'
                            type="text"
                            placeholder=""
                            name='discord_url'
                            value={props.aitool.discord_url}
                            onChange={props.onChange}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="controlInput7">
                        <Form.Label>Linkedin</Form.Label>
                        <Form.Control className='mb-3'
                            type="text"
                            placeholder=""
                            name='linkedin_url'
                            value={props.aitool.linkedin_url}
                            onChange={props.onChange}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="controlInput8">
                        <Form.Label>Github</Form.Label>
                        <Form.Control className='mb-3'
                            type="text"
                            placeholder=""
                            name='github_url'
                            value={props.aitool.github_url}
                            onChange={props.onChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" type='submit' form='formRegister'>
                    Cadastrar
                </Button>
                <Button variant="secondary" onClick={props.onHide}>
                    Fechar
                </Button>
            </Modal.Footer>
        </Modal >
    )
}

function ModalDeleteTool(props) {
    return (
        <Modal
            show={props.show} onHide={props.onHide}
            size='lg'
            aria-labelledby="contained-modal-tittle-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Tem certeza?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Se você prosseguir, perderá todos os dados relativos à ferramenta, desde
                    as informações básicas até os dados de avaliações e comentários dos usuários.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='danger' onClick={props.onDelete}>Sim</Button>
                <Button onClick={props.onHide}>Não</Button>
            </Modal.Footer>

        </Modal>
    );
}

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
        href=""
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >
        {children}
    </a>
));

function CustomToggleAccordion({ children, eventKey }) {
    const [expanded, setExpanded] = useState(false);

    const decoratedOnClick = useAccordionButton(eventKey, () =>
        setExpanded(!expanded)
    );

    return (
        <button
            type="button"
            className='text-center border-0 bg-transparent'
            onClick={decoratedOnClick}
        >
            {
                expanded ?
                    <ChevronUp style={{ fontSize: '1.5rem' }} />
                    :
                    <ChevronDown style={{ fontSize: '1.5rem' }} />
            }
        </button>
    );
}

function AIToolAdminPage() {
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [data, setData] = useState({});
    const [page, setPage] = useState(0);
    const size = 6;
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [aitool, setAitool] = useState(AiToolModel);
    const [aitoolEdit, setAitoolEdit] = useState(AiToolModel);
    const [aitoolToDelete, setAitoolToDelete] = useState({});
    const [picture, setPicture] = useState();
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [validated, setValidated] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAitool({
            ...aitool,
            [name]: value,
        });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setAitoolEdit({
            ...aitoolEdit,
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

        const form = e.currentTarget;
        if (form.checkValidity() === false || selectedTags.length === 0) {
            e.stopPropagation();
            setValidated(true);
            return
        }

        try {
            await api.post('/api/v1/aitool', aitool);
            onShowAlert();
            fillPage(page);
            setShowRegisterModal(false);
        } catch (error) {
            console.log(error);
        }
    }

    const onFormEditSubmit = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        if (form.checkValidity() === false || selectedTags.length === 0) {
            e.stopPropagation();
            setValidated(true);
            return
        }

        try {
            const res = await api.patch('/api/v1/aitool', aitoolEdit);
            onShowAlert();
            fillPage(page);
        } catch (error) {
            console.log(error);
        }
    }

    const initialFetch = async () => {
        fillPage();
        fetchTags();
    }

    useEffect(() => {
        initialFetch();
    }, [])

    const onDeleteTool = async (e) => {
        e.preventDefault();

        try {
            const res = await api.delete('/api/v1/aitool', {
                data: aitoolToDelete
            });
            setShowDeleteModal(false);
            fillPage(page);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = (aitool) => {
        setAitoolToDelete(aitool);
        setShowDeleteModal(true);
    }

    const fillPage = async (page = 0) => {
        try {
            const res = await api.get(`api/v1/aitools?page=${page}&size=${size}`);
            setData(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    const fetchTags = async () => {
        setLoading(true);
        try {
            const res = await api.get(`api/v1/tags`);
            setTags(res.data.map((tag) => ({ label: tag.name, value: tag })));
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    const onChangePage = useCallback(async (page) => {
        setPage(page);
        fillPage(page);
    }, [])

    const fillAndShowEditModal = (aitool) => {
        setAitoolEdit(aitool);
        setSelectedTags(aitool.tags.map((tag) => ({ label: tag.name, value: tag })))
        setShowEditModal(true)
    }

    const makeFavorite = async (aitool, idx) => {
        const newData = data.content.map(item => {
            if (item.id === aitool.id) {
                console.log(item.id, aitool.id)
                return { ...item, favorited: !item.favorited };
            } else {
                return item;
            }
        });
        setData({
            ...data,
            content: newData
        });

        try {
            const res = await api.patch('/api/v1/aitool', newData[idx]);
        } catch (error) {
            console.log(error)
        }
    };


    return (
        <>
            <Header />
            <Container className='mt-5'>
                <Alert id='alertCadastroSucesso' className={`${showSuccessAlert ? 'd-block' : 'd-none'}`} variant='success'>
                    Ferramenta cadastrada com sucesso!
                </Alert>
                <div className='d-flex align-items-center mb-5'>
                    <h2>Cadastrar nova ferramenta</h2>

                    <a className='ms-3 d-flex alig-items-center'
                        role='button'
                        style={{ fontSize: '2rem' }}
                        onClick={() => setShowRegisterModal(true)}>
                        <PlusSquareFill />
                    </a>
                </div>
                <ModalTool
                    show={showRegisterModal}
                    options={tags}
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
                    onHide={() => setShowRegisterModal(false)}
                    aitool={aitool}
                    setAitool={setAitool}
                    onFormSubmit={onFormSubmit}
                    onChange={handleChange}
                    setPicture={setPicture}
                    validated={validated}
                    setValidated={setValidated}
                />
                <ModalTool
                    show={showEditModal}
                    options={tags}
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
                    onHide={() => setShowEditModal(false)}
                    aitool={aitoolEdit}
                    setAitool={setAitoolEdit}
                    onFormSubmit={onFormEditSubmit}
                    onChange={handleEditChange}
                    setPicture={setPicture}
                    validated={validated}
                    setValidated={setValidated}
                />
                <ModalDeleteTool
                    show={showDeleteModal}
                    onHide={() => setShowDeleteModal(false)}
                    onDelete={onDeleteTool}
                />

                <MyFilter />

                {
                    data.totalPages > 1 && (
                        <MyPagination
                            total={data.totalPages}
                            current={page}
                            onChangePage={onChangePage}
                        />
                    )
                }

                <Row xs={1} xl={2} className='d-flex mb-3'>
                    {loading ? <Spinner className='m-auto' animation="border" variant='primary' />
                        :
                        data?.content?.sort((a, b) => a.id - b.id).map((ob, idx) => (
                            <Col key={idx} className='mb-2'>
                                <Accordion>
                                    <Card>
                                        <Card.Header className='d-flex justify-content-between'>
                                            <Container className='p-0'>
                                                <Container className='mb-3'>
                                                    <strong>{ob.name}</strong>
                                                </Container>
                                                <Container>
                                                    <p>{ob.description}</p>
                                                </Container>
                                                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                                    {
                                                        ob.tags?.map((tag, id) => (
                                                            <Stack key={id} style={{ fontSize: '1.1rem' }} direction="horizontal" gap={2}>
                                                                <Badge name={tag.name} color={tag.color}>sdsdsd</Badge>
                                                            </Stack>
                                                        ))
                                                    }
                                                </div>

                                            </Container>
                                            <div className='d-flex align-items-center'>
                                                <CustomToggleAccordion eventKey="0">Click me!</CustomToggleAccordion>
                                                <Dropdown className='ms-3'>
                                                    <Dropdown.Toggle as={CustomToggle} id="dropdown-basic">
                                                        <ThreeDotsVertical style={{ color: 'black' }} size={'1.5rem'} />
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item onClick={() => { fillAndShowEditModal(ob) }} >Editar</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => handleDelete(ob)}>Excluir</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>

                                            </div>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="0">
                                            <Card.Body>
                                                {ob.description}<br />

                                                <div className='d-flex justify-content-between mt-5'>
                                                    <Stack
                                                        style={{ fontSize: '1.4rem' }}
                                                        direction="horizontal" gap={3}>

                                                    </Stack>
                                                </div>

                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>
                            </Col>
                        ))}
                    {
                        data.content?.length === 0 && <p>Nenhuma ferramenta encontrada.</p>
                    }
                </Row>

            </Container >
        </>
    )
}

export default AIToolAdminPage;