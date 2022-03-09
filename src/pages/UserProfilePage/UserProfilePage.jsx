import { useContext, useState } from "react"
import { AuthContext } from "../../context/auth.context"
import MyHouses from "../../components/MyHouses/MyHouses"
import { Container, Row, Col, Button, Modal } from "react-bootstrap"
import MyFollowedVillages from "../../components/MyFollowedVillages/MyFollowedVillages"
import { useEffect } from "react"
import userService from "../../services/user.service"
import ResultsHouses from "../../components/ResultsHouses/ResultsHouses"
import MyRentings from "../../components/MyRentings/MyRentings"
import subscriptionsService from "../../services/subscriptions.service"
import UserImageForm from "../../components/UserImageForm/UserImageForm"
import UserEditForm from "../../components/UserEditForm/UserEditForm"
import './UserProfilePage.css'

const UserProfilePage = () => {

    const { user } = useContext(AuthContext)

    const [userDetails, setUserDetails] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    const [subscriptions, setSubscriptions] = useState([])
    // const [subsLoaded, setSubsLoaded] = useState(false)
    const [myHouses, setMyHouses] = useState([])

    const [showImageModal, setShowImageModal] = useState(false)
    const [showUserModal, setShowUserModal] = useState(false)


    useEffect(() => {
        if (user) {
            getDetails()
            getSubscriptions()
            getMyHouses()
        }
    }, [user])


    const getDetails = () => {

        userService
            .getUserDetails()
            .then(({ data }) => {
                setUserDetails(data)
                setIsLoaded(true)
            })
            .catch(err => console.log(err))
    }

    const getSubscriptions = () => {
        subscriptionsService
            .getAllSubscriptionsOfOneUser()
            .then(({ data }) => {
                const subsArr = data.map(elm => elm.house)

                return subsArr
            })
            .then(subsArr => {
                setSubscriptions(subsArr)
                // setSubsLoaded(true)
            })

            .catch(err => console.log(err))
    }

    const getMyHouses = () => {
        userService
            .getAllPropertiesOfOneUser()
            .then(({ data }) => {
                setMyHouses(data)
            })
            .catch(err => console.log(err))
    }

    const handleEditImgBtn = () => setShowImageModal(true)
    const handleSaveImageBtn = () => setShowImageModal(false)

    const handleEditUserBtn = () => setShowUserModal(true)
    const handleSaveUserBtn = () => setShowUserModal(false)

    return (

        <Container>

            <Row>
                <Col sm={4}>
                    <div className="profileImgDiv">
                        <img className="profileImg" src={userDetails?.profileImg} alt='profile'></img>
                    </div>
                </Col>
                <Col sm={8}>
                    <h1>{user?.firstName} {user?.lastName}</h1>
                    <Button onClick={handleEditImgBtn}>Editar imagen</Button>
                    <Button onClick={handleEditUserBtn}>Editar perfil</Button>
                </Col>
            </Row>


            <h2>Aquí deberían ir tus rentings</h2>
            <Row>
                < ResultsHouses houses={subscriptions} width={4} />
            </Row>

            <h2>Aquí deberían ir los pueblos a los que sigues</h2>
            <Row>
                {isLoaded && < MyFollowedVillages followedVillages={userDetails.followedVillages} />}
            </Row>

            <h2>Aquí deberían ir tus casas favoritas</h2>
            <Row>
                {isLoaded && < ResultsHouses houses={userDetails.favHouses} width={6} />}
            </Row>

            <h2>Aquí deberían ir tus casas</h2>
            <Row>
                < ResultsHouses houses={myHouses} width={3} />
            </Row>

            <Modal show={showImageModal} onHide={handleSaveImageBtn} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Subir imagen</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {isLoaded && <UserImageForm closeModal={handleSaveImageBtn} refreshDetails={getDetails} />}
                </Modal.Body>
            </Modal>

            <Modal show={showUserModal} onHide={handleSaveUserBtn} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Editar perfil</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {isLoaded && <UserEditForm {...userDetails} closeModal={handleSaveUserBtn} refreshDetails={getDetails} />}
                </Modal.Body>
            </Modal>

        </Container>
    )
}

export default UserProfilePage