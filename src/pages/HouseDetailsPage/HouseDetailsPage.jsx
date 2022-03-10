import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import FavBtn from "../../components/FavBtn/FavBtn"
import NewSubscriptionForm from "../../components/NewSubscriptionForm/NewSubscriptionForm"
import { AuthContext } from "../../context/auth.context"
import housesService from "../../services/houses.service"
import userService from "../../services/user.service"
import { Container, Col, Row, Button, Modal } from 'react-bootstrap'
import './HouseDetailsPage.css'
import subscriptionsService from "../../services/subscriptions.service"
import HouseImages from "../../components/HouseImages/HouseImages"
import Bookings from "../../components/Bookings/Bookings"
import HouseInfo from "../../components/HouseInfo/HouseInfo"
import HouseEditForm from "../../components/HouseEditForm/HouseEditForm"
import AllRentersBookingsInThisHouse from "../../components/AllRentersBookingsInThisHouse/AllRentersBookingsInThisHouse"
import Moment, { localeData } from 'moment';
import { extendMoment } from 'moment-range'
import MyNextBookingsInThisHouse from "../../components/MyNextBookingsInThisHouse/MyNextBookingsInThisHouse"

const moment = extendMoment(Moment)

const HouseDetailsPage = () => {

    const [houseDetails, setHouseDetails] = useState({})
    const [isLoaded, setIsLoaded] = useState(false)
    const [isMine, setIsMine] = useState(false)

    const [isFav, setIsFav] = useState()
    const [btnState, setBtnState] = useState('Cargando...')

    const [isSuscriber, setIsSuscribed] = useState()

    const [houseImages, setHouseImages] = useState([])

    const [bookings, setBookings] = useState([])
    const [bookingsLoaded, setBookingsLoaded] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const { house_id } = useParams()
    const { user } = useContext(AuthContext)


    function updataeImagesState(images) {
        setHouseImages(images)
    }

    const getBookings = () => {
        housesService
            .getAllBookingsOfOneHose(house_id)
            .then(({ data }) => {
                let newArr = [...bookings]

                data.forEach(eachBooking => {
                    newArr.push({ startDate: eachBooking.entryDate, endDate: eachBooking.exitDate })
                })
                setBookings(newArr)
                console.log('soy las bookings', bookings)
                setBookingsLoaded(true)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getHouseDetails()
        getBookings()
    }, [])

    const getHouseDetails = () => {
        housesService
            .getOneHouse(house_id)
            .then(({ data }) => {
                console.log(data)
                setHouseDetails(data)
                setHouseImages(data.images)
                setIsLoaded(true)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        houseDetails.name && checkIfFav()
    }, [user, houseDetails])

    useEffect(() => {
        houseDetails.name && checkIfSubscribed()
    }, [user, houseDetails])


    const checkIfFav = () => {
        userService
            .getUserDetails()
            .then(({ data }) => {

                let foundFavHouse = ''

                data?.favHouses.forEach(elm => {
                    if (elm.name === houseDetails.name) {
                        foundFavHouse = elm.name
                    }
                })

                if (foundFavHouse !== '') {
                    setIsFav(true)
                    setBtnState('Eliminar de favoritos')
                } else {
                    setIsFav(false)
                    setBtnState('Añadir a favoritos')
                }
            })
    }

    useEffect(() => {
        houseDetails.name && checkIfMine(house_id)
    }, [user, houseDetails])

    const checkIfMine = (house_id) => {
        userService
            .getAllPropertiesOfOneUser()
            .then(({ data }) => {
                data.forEach(elm => {
                    if (elm._id === house_id) setIsMine(true)
                })
            })
    }


    const handleFavBtn = () => {

        if (!isFav) {
            housesService
                .addHouseToFavs(house_id)
                .then(() => {
                    setIsFav(true)
                    setBtnState('Eliminar de favoritos')
                })
                .catch(err => console.log(err))
        } else if (isFav) {
            housesService
                .substractHouseFromFavs(house_id)
                .then(() => {
                    setIsFav(false)
                    setBtnState('Añadir a favoritos')
                })
                .catch(err => console.log(err))
        }
    }

    const checkIfSubscribed = () => {

        subscriptionsService
            .getAllSubscriptionsOfOneUser(user?._id)
            .then(({ data }) => {
                let foundSubsHouse = ''

                data.forEach(elm => {
                    if (house_id === elm.house._id) {
                        foundSubsHouse = elm.house.name
                    }
                })

                if (foundSubsHouse !== '') {
                    setIsSuscribed(true)
                } else {
                    setIsSuscribed(false)
                }
            })
    }

    const navigate = useNavigate()
    const handleEditBtn = () => setShowModal(true)
    const handleSaveBtn = () => setShowModal(false)


    return (
        <Container>
            <Row className="topRow">
                <Col sm={9}>
                    <h1 className="h1house">{houseDetails?.name} </h1>
                    <h3 className="h3Weight">{houseDetails?.village?.name} - {houseDetails?.village?.province}, {houseDetails?.village?.CCAA}</h3>
                    <p>{houseDetails?.street}</p>
                </Col>
                <Col sm={3}>
                    <FavBtn btnState={btnState} handleFavBtn={handleFavBtn} />
                </Col>
            </Row>

            <Row className="secondRow">
                {isLoaded && <HouseImages houseImages={houseImages} {...houseDetails} isMine={isMine} updataeImagesState={updataeImagesState} getHouseDetails={getHouseDetails}></HouseImages>}
            </Row>

            <Row>
                <Col sm={7}>
                    {isLoaded && <HouseInfo {...houseDetails}></HouseInfo>}
                </Col>
                <Col sm={{ span: 4, offset: 1 }}>
                    {isSuscriber ? (bookingsLoaded && <Bookings houseId={house_id} bookings={bookings} refreshBookings={getBookings} refreshDetails={getHouseDetails} />) : <NewSubscriptionForm {...houseDetails} />}
                    {isSuscriber && <MyNextBookingsInThisHouse houseId={house_id} moment={moment} />}
                </Col>
            </Row>

            <Row>
                {isMine &&
                    <Col>
                        <Button className="myBtn" onClick={handleEditBtn}>Editar información</Button>
                    </Col>}
            </Row>

            <Row>
                <Col>
                    {isMine && <AllRentersBookingsInThisHouse houseId={house_id} moment={moment} />}
                </Col>
            </Row>

            <Modal show={showModal} onHide={handleSaveBtn} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Edita la información de la casa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <HouseEditForm closeModal={handleSaveBtn} {...houseDetails} house_id={house_id} refreshDetails={getHouseDetails} />
                </Modal.Body>
            </Modal>

        </Container>
    )
}

export default HouseDetailsPage