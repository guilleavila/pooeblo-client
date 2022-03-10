import { useContext, useEffect, useState } from "react"
import { Container, Row, Col, Modal, Button } from "react-bootstrap"
import { AuthContext } from "../../context/auth.context"
import villagesService from "../../services/villages.service"
import VillageFeatures from "../../components/VillageFeatures/VillageFeatures"
import ResultsHouses from "../../components/ResultsHouses/ResultsHouses"
import VillageFeaturesForm from "../../components/VillageFeaturesForm/VillageFeaturesForm"
import VillageImageForm from "../VillageImageForm/VillageImageForm"
import { Link, useParams } from 'react-router-dom'
import './VillageContent.css'
import FollowBtn from "../FollowBtn/FollowBtn"
import userService from "../../services/user.service"
import postsService from "../../services/posts.service"
import PostsList from "../PostsList/PostsList"
import NewPostForm from "../../components/NewPostForm/NewPostForm"


const VillageContent = () => {

    const { user } = useContext(AuthContext)
    const { village_id } = useParams()

    const [villageDetails, setVillageDetails] = useState({})
    const [isLoaded, setIsLoaded] = useState(false)

    const [isFollowing, setIsFollowing] = useState()
    const [btnState, setBtnState] = useState('Cargando...')

    const [houses, setHouses] = useState([])
    const [housesLoaded, setHousesLoaded] = useState(false)

    const [posts, setPosts] = useState([])

    const [showModal, setShowModal] = useState(false)
    const [showImageModal, setShowImageModal] = useState(false)
    const [showPostModal, setShowPostModal] = useState(false)

    const [isMine, setIsMine] = useState(false)

    useEffect(() => {
        getVillageDetails()
        getHouses()
        getAllMyPosts()
        checkifMine()
    }, [user])

    const getVillageDetails = () => {

        if (user?.name) {
            if (village_id) {
                villagesService
                    .getOneVillage(village_id)
                    .then(({ data }) => {
                        setVillageDetails(data)
                        setIsLoaded(true)
                    })
                    .catch(err => console.log(err))
            } else if (!village_id) {
                villagesService
                    .getOneVillage(user?._id)
                    .then(({ data }) => {
                        setVillageDetails(data)
                        setIsLoaded(true)
                    })
                    .catch(err => console.log(err))
            }

        } else {
            villagesService
                .getOneVillage(village_id)
                .then(({ data }) => {
                    setVillageDetails(data)
                    setIsLoaded(true)
                })
                .catch(err => console.log(err))
        }
    }

    const getHouses = () => {
        if (user?.name) {
            if (village_id) {
                villagesService
                    .getAllHousesOfOneVillage(village_id) // tb necesario
                    .then(({ data }) => {
                        setHouses(data)
                        setHousesLoaded(true)
                    })
                    .catch(err => console.log(err))
            } else if (!village_id) {
                villagesService
                    .getAllHousesOfOneVillage(user._id) // tb necesario
                    .then(({ data }) => {
                        setHouses(data)
                        setHousesLoaded(true)
                    })
                    .catch(err => console.log(err))
            }

        } else {
            villagesService
                .getAllHousesOfOneVillage(village_id) // tb necesario
                .then(({ data }) => {
                    setHouses(data)
                    setHousesLoaded(true)
                })
                .catch(err => console.log(err))
        }
    }

    const getAllMyPosts = () => {
        if (user?.name) {
            if (village_id) {
                postsService
                    .getAllPostOfOneVillage(village_id)
                    .then(({ data }) => {
                        console.log(data)
                        setPosts(data)
                    })
                    .catch(err => console.log(err))
            } else if (!village_id) {
                postsService
                    .getAllPostOfOneVillage(user._id)
                    .then(({ data }) => {
                        console.log(data)
                        setPosts(data)
                    })
                    .catch(err => console.log(err))
            }

        } else {
            postsService
                .getAllPostOfOneVillage(village_id)
                .then(({ data }) => {
                    console.log(data)
                    setPosts(data)
                })
                .catch(err => console.log(err))
        }
    }

    const checkifMine = () => {
        !village_id && setIsMine(true)
    }

    useEffect(() => {
        villageDetails.name && checkIfFollowed()
    }, [user, villageDetails])

    const checkIfFollowed = () => {
        userService
            .getUserDetails()
            .then(({ data }) => {

                let foundFollowedVillage = ''

                data?.followedVillages.forEach(elm => {
                    if (elm.name === villageDetails.name) {
                        foundFollowedVillage = elm.name
                    }
                })

                if (foundFollowedVillage !== '') {
                    setIsFollowing(true)
                    setBtnState('Dejar de seguir')
                } else {
                    setIsFollowing(false)
                    setBtnState('Seguir pueblo')
                }
            })
    }


    const handleFollowBtn = () => {

        if (!isFollowing) {
            villagesService
                .followVillage(village_id)
                .then(() => {
                    setIsFollowing(true)
                    setBtnState('Dejar de seguir')
                })
                .catch(err => console.log(err))
        } else if (isFollowing) {
            villagesService
                .unfollowVillage(village_id)
                .then(() => {
                    setIsFollowing(false)
                    setBtnState('Seguir pueblo')
                })
                .catch(err => console.log(err))
        }
    }

    const handleEditBtn = () => setShowModal(true)
    const handleSaveBtn = () => setShowModal(false)

    const handleEditImgBtn = () => setShowImageModal(true)
    const handleSaveImageBtn = () => setShowImageModal(false)

    const handleNewPostBtn = () => setShowPostModal(true)
    const handleSavePostBtn = () => setShowPostModal(false)


    return (

        <Container>
            <div className="villageHero">
                <img className='villageImg' src={villageDetails?.profileImg} alt="profile"></img>
            </div>

            <Row>
                <Col sm={12} className='villageIntro'>
                    <div className="profileBtns">
                        <Row className="followSection">
                            <Col md={7}>
                                <h1 className="h1house">{villageDetails?.name}</h1>
                            </Col>
                            {!isMine &&
                                <Col md={5}>
                                    <FollowBtn btnState={btnState} handleFollowBtn={handleFollowBtn} />
                                </Col>
                            }
                        </Row>

                        {isMine &&
                            <div className="editProfileBtns">
                                <Button className='editImgBtn villageBtn' onClick={handleEditImgBtn}>Editar imagen</Button>
                                <Button className='villageBtn' onClick={handleEditBtn}>Editar perfil</Button>
                            </div>}
                    </div>
                    {/* {!houses ? <p>Actualmente no hay casas disponibles</p> : <p>¡Enhorabuena!, hay casas disponibles.</p>} */}
                    <h3 className="h3Weight">{villageDetails?.province}, {villageDetails?.CCAA}</h3>
                </Col>
                <Col sm={9}>
                    <p className='villageDescription'>{villageDetails?.description}</p>
                </Col>
            </Row>

            <Row>
                <Col>
                    {isLoaded && <VillageFeatures {...villageDetails} />}
                </Col>
            </Row>

            <Row>
                <h2 className="section-title">Casas de {villageDetails?.name}</h2>
                {housesLoaded && < ResultsHouses houses={houses} width={3} />}
            </Row>


            <Row>
                <Col className='allHousesBtn'>
                    <Link to={`/pueblos/${villageDetails?._id}/casas`}>
                        <Button className="myBtn newHouseBtn">Ver todas las casas</Button>
                    </Link>
                </Col>
            </Row>

            <Row>
                <Col>
                    <h2 className="section-title">Posts</h2>
                    <PostsList posts={posts} />
                </Col>
            </Row>

            <Row>
                <Col className='allHousesBtn'>
                    <Button onClick={handleNewPostBtn} className="myBtn newHouseBtn">Crear post</Button>
                </Col>
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
                    {isLoaded && <VillageImageForm closeModal={handleSaveImageBtn} refreshDetails={getVillageDetails} />}
                </Modal.Body>
            </Modal>

            <Modal show={showPostModal} onHide={handleSavePostBtn} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Nuevo post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {isLoaded && <NewPostForm closeModal={handleSavePostBtn} refreshContent={getAllMyPosts} />}
                </Modal.Body>
            </Modal>

        </Container>

    )
}

export default VillageContent