import '../css/content.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Github, Linkedin, Discord, Instagram, Heart, HeartFill } from 'react-bootstrap-icons';
import Spinner from 'react-bootstrap/Spinner';
import { Card, Accordion, Stack } from 'react-bootstrap';
import image from '../assets/download.jpg';
import { useEffect, useState } from 'react';
import React from 'react';
import api from '../service/api';
import Header from '../components/Header';
import Badge from '../components/Badge';

function FavoritosPage() {
    const [data, setData] = useState({});
    const [page, setPage] = useState(0);
    const size = 6;
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(false);

    const initialFetch = async () => {
        fillPage();
        fetchTags();
    }

    useEffect(() => {
        initialFetch();
    }, [])

    const fillPage = async (page = 0) => {

        try {
            const res = await api.get(`api/v1/aitools?page=${page}&size=${size}`);
            setData({
                ...res.data,
                content: res.data.content.filter((aitool) => aitool.favorited === true)
            });
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

    const makeFavorite = async (aitool, idx) => {
        const newData = data.content.map(item => {
            if (item.id === aitool.id) {
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
                <div className='mb-5'>
                    <h2>Favoritos</h2>
                </div>

                <Row xs={1} xl={2} className='d-flex mb-3'>
                    {loading ? <Spinner className='m-auto' animation="border" variant="primary" />
                        :
                        data.content?.sort((a, b) => a.id - b.id).map((ob, idx) => (
                            <Col key={idx} className='mb-2'>
                                <Accordion>
                                    <Card>
                                        <Card.Header className='d-flex justify-content-between'>
                                            <Container className='p-0'>
                                                <Container className='mb-3'>
                                                    <Card.Img className='me-2 rounded-circle'
                                                        //src={ob.profile_picture ? `data:image/png;base64,${ob.profile_picture}` : image}
                                                        src={image}
                                                        style={{ width: '70px', height: '70px' }}
                                                    />
                                                    <strong>{ob.name}</strong>
                                                    <a className='position-absolute end-0 mt-3 me-3'
                                                        onClick={() => makeFavorite(ob, idx)}
                                                    >
                                                        {
                                                            ob.favorited ?
                                                                <HeartFill
                                                                    className='ms-4'
                                                                    style={{ color: 'red' }}
                                                                    size={'1.5rem'}
                                                                />
                                                                :
                                                                <Heart className='ms-4'
                                                                    style={{ color: 'grey' }}
                                                                    size={'1.5rem'}
                                                                />
                                                        }
                                                    </a>
                                                </Container>
                                                <Container>
                                                    <p>{ob.short_description}</p>
                                                </Container>
                                                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                                    {
                                                        ob.tags?.map((tag, id) => (
                                                            <Stack key={id}
                                                                style={{ fontSize: '1.1rem' }}
                                                                direction="horizontal"
                                                                gap={2}
                                                            >
                                                                <Badge name={tag.name}
                                                                    color={tag.color}
                                                                />

                                                            </Stack>
                                                        ))
                                                    }
                                                </div>

                                            </Container>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="0">
                                            <Card.Body>
                                                {ob.description}<br />

                                                <div className='d-flex justify-content-between mt-5'>
                                                    <Stack
                                                        style={{ fontSize: '1.4rem' }}
                                                        direction="horizontal" gap={3}>
                                                        <a href={ob.instagram_url} target='_blank'>
                                                            <Instagram color='#E1306C' />
                                                        </a>
                                                        <a href={ob.linkedin_url} target='_blank'>
                                                            <Linkedin color='#0E76A8' />
                                                        </a>
                                                        <a href={ob.github_url} target='_blank'>
                                                            <Github color='black' />
                                                        </a>
                                                        <a href={ob.discord_url} target='_blank'>
                                                            <Discord color='#7289da' />
                                                        </a>
                                                    </Stack>
                                                    <a href={ob.site_url} target='_blank'>
                                                        <Button variant='primary'>Visite</Button>
                                                    </a>
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

export default FavoritosPage;