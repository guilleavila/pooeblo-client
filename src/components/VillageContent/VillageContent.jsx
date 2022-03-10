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

    const [isMine, setIsMine] = useState(false)

    useEffect(() => {
        getVillageDetails()
        getHouses()
        getAllMyPosts()
        checkifMine()
    }, [user])

    const getVillageDetails = () => {

        if (user.name) {
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
        if (user.name) {
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
        if (user.name) {
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


    return (

        <Container>
            <div className="hero">
                <img className='bgImg' src={villageDetails?.profileImg} alt="profile"></img>
            </div>

            <Row>
                <Col sm={12} className='firstLine'>
                    <div className="profileBtns">
                        <h1>{villageDetails?.name}</h1>
                        {isMine &&
                            <div className="editProfileBtns">
                                <Button className='editImgBtn myBtn' onClick={handleEditImgBtn}>Editar imagen</Button>
                                <Button className='editProfileBtn myBtn' onClick={handleEditBtn}>Editar perfil</Button>
                            </div>}
                    </div>
                    {/* {!houses ? <p>Actualmente no hay casas disponibles</p> : <p>¡Enhorabuena!, hay casas disponibles.</p>} */}
                    <h2>{villageDetails?.name}</h2>
                    <h3>{villageDetails?.province}, {villageDetails?.CCAA}</h3>
                    {/* {!isMine && <FollowBtn btnState={btnState} handleFollowBtn={handleFollowBtn} />} */}
                </Col>
                <Col sm={9}>
                    <p>{villageDetails?.description}</p>
                </Col>
            </Row>

            <Row>
                <Col>
                    {isLoaded && <VillageFeatures {...villageDetails} />}
                </Col>
            </Row>

            <h2>Casas de {villageDetails?.name}</h2>
            <Row>
                {housesLoaded && < ResultsHouses houses={houses} width={3} />}
            </Row>

            <Link to={`/pueblos/${villageDetails?._id}/casas`}>
                <Button>VER TODAS LAS CASAS</Button>
            </Link>

            <h1>TODOS MIS POSTS</h1>
            <PostsList posts={posts} />


            <NewPostForm refreshContent={getVillageDetails} />



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

        </Container>

    )
}

export default VillageContent