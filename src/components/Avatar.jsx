import { Modal, Button, Form, Image } from "react-bootstrap";
import { useRef, useState } from "react";
import { Camera } from "react-bootstrap-icons";
import AvatarEditor from 'react-avatar-editor';

const CropperModal = ({ src, showModal, setShowModal, setPreview, setPicture }) => {
    const [slideValue, setSlideValue] = useState(10);
    const cropRef = useRef(null);

    //handle save
    const handleSave = async () => {
        if (cropRef) {
            const dataUrl = cropRef.current.getImage().toDataURL();
            const result = await fetch(dataUrl);
            const blob = await result.blob();
            setPicture(blob);
            setPreview(URL.createObjectURL(blob));
            setShowModal(false);
        }
    };

    return (
        <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            size='md'
            aria-labelledby="contained-modal-tittle-vcenter"
            centered
        >
            <Modal.Body>
                <AvatarEditor
                    ref={cropRef}
                    image={src}
                    style={{ width: "100%", height: "100%" }}
                    border={50}
                    borderRadius={150}
                    color={[0, 0, 0, 0.72]}
                    scale={slideValue / 10}
                    rotate={0}
                />

                <Form.Range
                    value={slideValue}
                    name='hello'
                    onChange={(e) => setSlideValue(e.target.value)} />

            </Modal.Body>
            <Modal.Footer>
                <Button

                    variant="outlined"
                    onClick={(e) => setShowModal(false)}
                >
                    cancel
                </Button>
                <Button

                    onClick={handleSave}
                >
                    Save
                </Button>
            </Modal.Footer>

        </Modal >
    );
}

function Avatar(props) {
    const [src, setSrc] = useState(null);
    const [preview, setPreview] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const inputRef = useRef(null);

    const handleInputClick = (e) => {
        e.preventDefault();
        inputRef.current.click();
    };
    // handle Change

    const handleImgChange = (e) => {
        setSrc(URL.createObjectURL(e.target.files[0]));
        setShowModal(true);
    };

    return (
        <>
            <CropperModal
                showModal={showModal}
                src={src}
                setPreview={setPreview}
                setShowModal={setShowModal}
                setPicture={props.setPicture}
            />
            <div style={{ cursor: 'pointer' }}>
                <input
                    type="file"
                    accept="image/*"
                    ref={inputRef}
                    style={{ display: 'none' }}
                    onChange={handleImgChange}
                />
            </div>
            <div onClick={handleInputClick} className="mb-3" style={{ width: '100px', height: '100px' }}>
                <Image
                    src={
                        preview ||
                        'https://www.signivis.com/img/custom/avatars/member-avatar-01.png'
                    }
                    style={{ border: '1px solid black' }}
                    alt=""
                    roundedCircle
                    fluid
                />
            </div>
        </>
    );
}

export default Avatar;