import { useContext, useEffect, useState } from "react"
import { Container, Row, Col, Modal, Button } from "react-bootstrap"
import { AuthContext } from "../../context/auth.context"
import villagesService from "../../services/villages.service"
import VillageFeatures from "../../components/VillageFeatures/VillageFeatures"
import ResultsHouses from "../../components/ResultsHouses/ResultsHouses"
import VillageFeaturesForm from "../../components/VillageFeaturesForm/VillageFeaturesForm"
import ImageForm from "../../components/ImageForm/ImageForm"
import './VillageProfilePage.css'
import { Link } from 'react-router-dom'
import UserSignupPage from "../UserSignupPage/UserSignupPage"


const VillageProfilePage = () => {

    const { user } = useContext(AuthContext)

    const [villageDetails, setVillageDetails] = useState({})
    const [isLoaded, setIsLoaded] = useState(false)

    const [houses, setHouses] = useState([])
    const [housesLoaded, setHousesLoaded] = useState(false)

    const [showModal, setShowModal] = useState(false)
    const [showImageModal, setShowImageModal] = useState(false)


    useEffect(() => {
        getVillageDetails()
        getHouses()
    }, [user])

    const getVillageDetails = () => {

        villagesService
            .getOneVillage(user._id) // es necesario para este servicio pasar el id desde aquí, y no del payload
            .then(({ data }) => {
                setVillageDetails(data)
                setIsLoaded(true)
            })
            .catch(err => console.log(err))
    }

    const getHouses = () => {
        villagesService
            .getAllHousesOfOneVillage(user._id) // tb necesario
            .then(({ data }) => {
                setHouses(data)
                setHousesLoaded(true)
            })
            .catch(err => console.log(err))
    }

    const handleEditBtn = () => setShowModal(true)
    const handleSaveBtn = () => setShowModal(false)

    const handleEditImgBtn = () => setShowImageModal(true)
    const handleSaveImageBtn = () => setShowImageModal(false)


    return (

        <>
            <img className='villageImg' src={villageDetails?.profileImg} alt="profile"></img>
            <Button onClick={handleEditImgBtn}>Editar imagen</Button>
            <Container>
                <Row>
                    <Col>
                        <h1>{user.name}</h1>
                        <h3>{villageDetails?.province}, {villageDetails?.CCAA}</h3>
                        {/* {isLoaded && <h3>{villageDetails?.features.distanceToCity}, {villageDetails?.CCAA}</h3>} */}
                    </Col>
                </Row>

                {isLoaded && <VillageFeatures {...villageDetails} />}

                <h2>Casas de {user.name}</h2>
                <Row>
                    {housesLoaded && < ResultsHouses houses={houses} width={3} />}
                </Row>

                <Link to={`/pueblos/${villageDetails?._id}/casas`}>
                    <Button>VER TODAS LAS CASAS</Button>
                </Link>

                <Row>
                    <Button onClick={handleEditBtn}>Editar perfil</Button>
                </Row>



                <Modal show={showModal} onHide={handleSaveBtn} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Editar perfil</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {isLoaded && <VillageFeaturesForm {...villageDetails} closeModal={handleSaveBtn} refreshDetails={getVillageDetails} />}
                    </Modal.Body>
                </Modal>

                <Modal show={showImageModal} onHide={handleSaveImageBtn} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Subir imagen</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {isLoaded && <ImageForm closeModal={handleSaveImageBtn} refreshDetails={getVillageDetails} />}
                    </Modal.Body>
                </Modal>

            </Container>
        </>

    )
}

export default VillageProfilePage