import { Container, Button, Row, Modal } from "react-bootstrap"
import VillagesFilter from "../../components/VillagesFilter/VillagesFilter"
import bgImage from "../../public/consuegra.png"
import VillageCard from "../../components/VillageCard/VillageCard"
import './HomePage.css'
import { useEffect, useState } from "react"
import villagesService from "../../services/villages.service"
import MyFollowedVillages from "../../components/MyFollowedVillages/MyFollowedVillages"
import UserSignupPage from "../UserSignupPage/UserSignupPage"
import VillageSignupPage from "../VillageSignupPage/VillageSignupPage"


const HomePage = () => {

    const [villages, setVillages] = useState([])

    const [showSignUpModal, setShowSignUpModal] = useState(false)
    const [signUpForm, setSignUpForm] = useState('pueblo')

    useEffect(() => {
        getVillages()
    }, [])

    const getVillages = () => {
        villagesService
            .getAllVillages()
            .then(({ data }) => {
                setVillages(data.splice(0, 3))
            })
            .catch(err => console.log(err))
    }

    const openSignUpModal = () => setShowSignUpModal(true)
    const handleSignUpModal = () => setShowSignUpModal(false)

    const changeSignUpForm = () => {
        signUpForm === 'usuario' && setSignUpForm('pueblo')
        signUpForm === 'pueblo' && setSignUpForm('usuario')
    }

    return (
        <section>
            <Container >
                <div className="hero">
                    <img className="bgImg" src={bgImage}></img>
                </div>
                <div className="center">
                    <VillagesFilter />
                </div>
                <section className="firstSection">
                    <Container className="firstSectionFlex">

                        <h2 className="h2Weight">¿Eres un pueblo?</h2>
                        <h3 className="h3Weight">Regístrate ahora para darte a conocer y llena tu pueblo de vida.</h3>


                        <Button className="big-btn" onClick={openSignUpModal}>Regístrate</Button>

                        <Modal className="my-modal" centered='true' show={showSignUpModal} onHide={handleSignUpModal} size="lg">
                            <Modal.Body scrollable='true'>
                                {signUpForm === 'usuario' && <UserSignupPage closeModal={handleSignUpModal}></UserSignupPage>}
                                {signUpForm === 'pueblo' && <VillageSignupPage closeModal={handleSignUpModal}></VillageSignupPage>}
                                <div className='modalBtnDiv'>
                                    {signUpForm === 'usuario' && <p>¿Eres un pueblo? <Button className='hereBtn' onClick={changeSignUpForm}>Regístrate aquí</Button></p>}
                                    {signUpForm === 'pueblo' && <p>¿Eres un usuario? <Button className='hereBtn' onClick={changeSignUpForm}>Regístrate aquí</Button></p>}
                                </div>
                            </Modal.Body>
                        </Modal>

                    </Container>
                </section>
                <section className="secondSection">
                    <Container className="secondSectionFlex">
                        <h2 className="h2Weight">Descubre pueblos</h2>
                        <h3 className="h3Weight">con todo lo que necesitas</h3>
                        <div className="villagesSubSection">
                            <Row>
                                <MyFollowedVillages followedVillages={villages} size={4} />
                            </Row>
                        </div>
                    </Container>
                </section>
            </Container >

        </section >
    )
}

export default HomePage