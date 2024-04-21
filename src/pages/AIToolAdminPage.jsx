import '../css/content.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { ChevronDown, ChevronUp, Github, Linkedin, Discord, Instagram, ThreeDotsVertical, PlusSquareFill, SquareFill } from 'react-bootstrap-icons';
import { Card, Dropdown, Modal, Accordion, useAccordionButton, Badge, Stack, Alert } from 'react-bootstrap';
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
import token from '../service/token';
import MultiSelect from '../components/MultiSelect';

function ModalTool(props) {

    return (
        <Modal show={props.show} onHide={props.onHide} size='xl' centered>
            <Modal.Header closeButton>
                <Modal.Title>Cadastrar Ferramenta</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id='formRegister' onSubmit={props.onFormSubmit}>
                    <Form.Group className="mb-3" controlId="controlInput">
                        <Col>
                            <Avatar setPicture={props.setPicture} />
                        </Col>

                        <Row>
                            <Col sm={12} md={4} className='mb-3'>
                                <Form.Control className=''
                                    type="text"
                                    placeholder="Nome da ferramenta"
                                    name='name'
                                    value={props.aitool.name}
                                    onChange={props.onChange}
                                />
                            </Col>
                            <Col sm={12} md={8} className='mb-3'>
                                <Form.Control className=''
                                    type="text"
                                    placeholder="Link do Site"
                                    name='siteUrl'
                                    value={props.aitool.siteUrl}
                                    onChange={props.onChange}
                                />
                            </Col>
                        </Row>

                        <Col className='mb-3'>
                            <Form.Control className=''
                                type="text"
                                placeholder="Descrição Curta"
                                name='shortDescription'
                                value={props.aitool.shortDescription}
                                onChange={props.onChange}
                            />
                        </Col>

                        <Col className='mb-3'>
                            <Form.Control className=''
                                as="textarea"
                                rows={4}
                                placeholder="Descrição Longa"
                                name='description'
                                value={props.aitool.description}
                                onChange={props.onChange}
                            />
                        </Col>

                        <MultiSelect
                            setSelectedTags={props.setSelectedTags}
                            options={props.options}
                        />

                        <Col className='mb-3'>
                            <Form.Control className=''
                                type="text"
                                placeholder="Link do Vídeo no Youtube"
                                name='youtubeUrl'
                                value={props.aitool.youtubeUrl}
                                onChange={props.onChange}
                            />
                        </Col>

                        <Col className='mb-3'>
                            <Form.Control className=''
                                type="text"
                                placeholder="Link do Instagram"
                                name='instagramUrl'
                                value={props.aitool.instagramUrl}
                                onChange={props.onChange}
                            />
                        </Col>

                        <Col className='mb-3'>
                            <Form.Control className=''
                                type="text"
                                placeholder="Link do Discord"
                                name='discordUrl'
                                value={props.aitool.discordUrl}
                                onChange={props.onChange}
                            />
                        </Col>

                        <Col className='mb-3 flex-xl-row'>
                            <Form.Control className=''
                                type="text"
                                placeholder="Link do Linkedin"
                                name='linkedinUrl'
                                value={props.aitool.linkedinUrl}
                                onChange={props.onChange}
                            />
                        </Col>

                        <Col className='mb-3'>
                            <Form.Control className=''
                                type="text"
                                placeholder="Link do Github"
                                name='githubUrl'
                                value={props.aitool.githubUrl}
                                onChange={props.onChange}
                            />
                        </Col>
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

    const onFormSubmit = async (e, callback = () => console.log(aitool)) => {
        e.preventDefault();

        //const dataForm = new FormData();
        //dataForm.append('picture', picture);

        setAitool({
            ...aitool,
            tags: selectedTags.map(tag => tag.value)
        })

        try {
            /* await api.post('/api/v1/aitool', aitool,
                {
                    headers: {
                        Authorization: token
                    }
                }); */
            await api.post('/api/v1/aitool', aitool);

            onShowAlert();
            fillPage(page);
        } catch (error) {
            console.log(error);
        }
    }

    const onFormEditSubmit = async (e) => {
        e.preventDefault();

        try {
            /* const res = await api.put('/api/v1/aitool', aitoolEdit,
                {
                    headers: {
                        Authorization: token
                    }
                }); */

            const res = await api.put('/api/v1/aitool', aitoolEdit);
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
            /* const res = await api.delete('/api/v1/aitool', {
                headers: {
                    Authorization: token
                },
                data: aitoolToDelete
            }); */
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
            /* const res = await api.get(`api/v1/aitool?page=${page}&size=${size}`, {
                headers: {
                    Authorization: token
                }
            }); */

            const res = await api.get(`api/v1/aitool?page=${page}&size=${size}`);
            setData(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    const fetchTags = async () => {
        try {
            /* const res = await api.get(`api/v1/tags`, {
                headers: {
                    Authorization: token
                }
            }); */
            const res = await api.get(`api/v1/tags`);

            setTags(res.data.map((tag) => ({ label: tag.name, value: tag })));
        } catch (error) {
            console.log(error);
        }
    }

    const onChangePage = useCallback(async (page) => {
        setPage(page);
        fillPage(page);
    }, [])

    const fillAndShowEditModal = (aitool) => {
        setAitoolEdit(aitool);
        setShowEditModal(true)
    }

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
                    setSelectedTags={setSelectedTags}
                    onHide={() => setShowRegisterModal(false)}
                    aitool={aitool}
                    onFormSubmit={onFormSubmit}
                    onChange={handleChange}
                    setPicture={setPicture}
                />
                <ModalTool
                    show={showEditModal}
                    onHide={() => setShowEditModal(false)}
                    aitool={aitoolEdit}
                    onFormSubmit={onFormEditSubmit}
                    onChange={handleEditChange}
                    setPicture={setPicture}
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

                <Row xs={1} xl={2} className='mb-3'>
                    {data?.content?.map((ob, idx) => (
                        <Col key={idx} className='mb-2'>
                            <Accordion>
                                <Card>
                                    <Card.Header className='d-flex justify-content-between'>
                                        <Container className='p-0'>
                                            <Container className='mb-3'>
                                                <Card.Img className='me-2 rounded-circle'
                                                    src={ob.profilePicture ? `data:image/png;base64,${ob.profilePicture}` : image}
                                                    style={{ width: '70px', height: '70px' }}
                                                />
                                                <strong>{ob.name}</strong>
                                            </Container>
                                            <Container>
                                                <p>{ob.shortDescription}</p>
                                            </Container>
                                            <Stack style={{ fontSize: '1.1rem' }} direction="horizontal" gap={2}>
                                                <Badge pill bg="primary" text="light">
                                                    Primary
                                                </Badge>
                                                <Badge pill bg="secondary" text="light">
                                                    Secondary
                                                </Badge>
                                                <Badge pill bg="success" text="light">
                                                    Success
                                                </Badge>
                                            </Stack>

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
                                                    <a href={ob.instagramUrl} target='_blank'><Instagram color='#E1306C' /></a>
                                                    <a href={ob.linkedinUrl} target='_blank'><Linkedin color='#0E76A8' /></a>
                                                    <a href={ob.githubUrl} target='_blank'><Github color='black' /></a>
                                                    <a href={ob.discordUrl} target='_blank'><Discord color='#7289da' /></a>
                                                </Stack>
                                                <a href={ob.siteUrl} target='_blank'>
                                                    <Button variant='primary'>Visite</Button>
                                                </a>
                                            </div>

                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                        </Col>
                    ))}
                </Row>

            </Container >
        </>
    )
}

export default AIToolAdminPage;