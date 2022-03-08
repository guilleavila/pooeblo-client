import { useEffect } from "react"
import { useState } from "react"
import { Container, Row, Col, Button, Modal } from "react-bootstrap"
import housesService from "../../services/houses.service"
import HouseImagesForm from "../ImageForm/ImageForm"
import './HouseImages.css'


const HouseImages = ({ _id, isMine, updataeImagesState, houseImages, getHouseDetails }) => {


    // const [houseImages, setHouseImages] = useState([])
    const [showBtn, setShowBtn] = useState('hidden')
    const [btnText, setBtnText] = useState('Editar imágenes')

    const [showModal, setShowModal] = useState(false)

    // EDIT IMAGES BTN
    const handleEditBtn = () => {
        btnText === 'Editar imágenes' ? setBtnText('Guardar') : setBtnText('Editar imágenes')
        showBtn === 'hidden' ? setShowBtn('shown') : setShowBtn('hidden')
    }

    const handleDeleteBtn = (imgUrl) => {

        console.log('Estas son las imágenes al inicio --->', houseImages)
        const newImages = houseImages.filter(eachImage => {
            console.log('Cada imagen ----------------', eachImage)
            return eachImage !== imgUrl
        })

        updataeImagesState(newImages)
        console.log('despues del filter --->', newImages)
        console.log('despues del setHouseImages --->', houseImages)

        housesService
            .deleteOneImage(_id, newImages)
            .then(({ data }) => updataeImagesState(data.images))
            .catch(err => console.log(err))
    }

    // const handleUploadImgBtn = () => setShowModal(true)
    const handleSaveImageBtn = () => setShowModal(false)

    const handleUploadImageBtn = () => {
        setShowModal(true)
    }

    return (


        <Container>

            {
                (houseImages.length === 0) &&
                <Row>
                    <Col sm={7}>
                        <img className="houseImg" src="https://img.freepik.com/vector-gratis/casa-gris-paredes-ruinas_1308-73951.jpg?w=1480" alt="default" />
                    </Col>
                </Row>
            }

            {
                (houseImages.length === 1) &&
                <Row>
                    <Col sm={7}>
                        <Button className={showBtn} onClick={() => handleDeleteBtn(houseImages[0])}>Eliminar</Button>
                        <img className="houseImg" src={houseImages[0]} alt="default" />
                    </Col>
                </Row>
            }

            {
                (houseImages.length === 2) &&
                <Row>
                    <Col sm={6}>
                        <Button className={showBtn} onClick={() => handleDeleteBtn(houseImages[0])}>Eliminar</Button>
                        <img className="houseImg" src={houseImages[0]} alt="default" />
                    </Col>

                    <Col sm={6}>
                        <Button className={showBtn} onClick={() => handleDeleteBtn(houseImages[1])}>Eliminar</Button>
                        <img className="houseImg" src={houseImages[1]} alt="default" />
                    </Col>
                </Row>
            }

            {
                (houseImages.length === 3) &&
                <Row>
                    <Col sm={6}>
                        <Button className={showBtn} onClick={() => handleDeleteBtn(houseImages[0])}>Eliminar</Button>
                        <img className="houseImg" src={houseImages[0]} alt="default" />
                    </Col>

                    <Col sm={6}>
                        <Row>
                            <Col sm={6}>
                                <Button className={showBtn} onClick={() => handleDeleteBtn(houseImages[1])}>Eliminar</Button>
                                <img className="houseImg" src={houseImages[1]} alt="default" />
                            </Col>
                            <Col sm={6}>
                                <Button className={showBtn} onClick={() => handleDeleteBtn(houseImages[2])}>Eliminar</Button>
                                <img className="houseImg" src={houseImages[2]} alt="default" />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            }

            {
                (houseImages.length === 4) &&
                <Row>
                    <Col sm={6}>
                        <Button className={showBtn} onClick={() => handleDeleteBtn(houseImages[0])}>Eliminar</Button>
                        <img className="houseImg" src={houseImages[0]} alt="default" />
                    </Col>

                    <Col sm={6}>
                        <Row>
                            <Col sm={6}>
                                <Button className={showBtn} onClick={() => handleDeleteBtn(houseImages[1])}>Eliminar</Button>
                                <img className="houseImg" src={houseImages[1]} alt="default" />
                            </Col>
                            <Col sm={6}>
                                <Button className={showBtn} onClick={() => handleDeleteBtn(houseImages[2])}>Eliminar</Button>
                                <img className="houseImg" src={houseImages[2]} alt="default" />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12}>
                                <Button className={showBtn} onClick={() => handleDeleteBtn(houseImages[3])}>Eliminar</Button>
                                <img className="houseImg" src={houseImages[3]} alt="default" />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            }

            {
                (houseImages.length === 5) &&
                <Row>
                    <Col sm={6}>
                        <Button className={showBtn} onClick={() => handleDeleteBtn(houseImages[0])}>Eliminar</Button>
                        <img className="houseImg" src={houseImages[0]} alt="default" />
                    </Col>

                    <Col sm={6}>
                        <Row>
                            <Col sm={6}>
                                <Button className={showBtn} onClick={() => handleDeleteBtn(houseImages[1])}>Eliminar</Button>
                                <img className="houseImg" src={houseImages[1]} alt="default" />
                            </Col>
                            <Col sm={6}>
                                <Button className={showBtn} onClick={() => handleDeleteBtn(houseImages[2])}>Eliminar</Button>
                                <img className="houseImg" src={houseImages[2]} alt="default" />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <Button className={showBtn} onClick={() => handleDeleteBtn(houseImages[3])}>Eliminar</Button>
                                <img className="houseImg" src={houseImages[3]} alt="default" />
                            </Col>
                            <Col sm={6}>
                                <Button className={showBtn} onClick={() => handleDeleteBtn(houseImages[4])}>Eliminar</Button>
                                <img className="houseImg" src={houseImages[4]} alt="default" />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            }
            <Button className={showBtn} onClick={handleUploadImageBtn}>Añadir imagen</Button>
            {isMine && <Button onClick={handleEditBtn}>{btnText}</Button>}

            <Modal show={showModal} onHide={handleSaveImageBtn} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Subir imagen</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <HouseImagesForm closeModal={handleSaveImageBtn} refreshDetails={getHouseDetails} />
                </Modal.Body>
            </Modal>

        </Container >
    )
}

export default HouseImages