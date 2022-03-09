import { useContext, useState } from "react"
import { Navbar, Container, Nav, Modal, Button } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import LoginPage from "../../pages/LoginPage/LoginPage"
import UserSignupPage from "../../pages/UserSignupPage/UserSignupPage"
import VillageSignupPage from "../../pages/VillageSignupPage/VillageSignupPage"
import UserSignupForm from "../UserSignupForm/UserSignupForm"

const Navigation = () => {

    const { isLoggedIn, logOutUser } = useContext(AuthContext)

    const [showSignUpModal, setShowSignUpModal] = useState(false)
    const [signUpForm, setSignUpForm] = useState('usuario')

    const [showLoginModal, setShowLoginModal] = useState(false)

    const openSignUpModal = () => setShowSignUpModal(true)
    const handleSignUpModal = () => setShowSignUpModal(false)

    const openLoginModal = () => setShowLoginModal(true)
    const handleLoginModal = () => setShowLoginModal(false)

    const changeSignUpForm = () => {
        signUpForm === 'usuario' && setSignUpForm('pueblo')
        signUpForm === 'pueblo' && setSignUpForm('usuario')
    }

    return (
        <Navbar bg="dark" variant='dark' expand="lg" style={{ marginBottom: 30 }}>
            <Container>
                <NavLink to="/">
                    <Navbar.Brand as="span">POOEBLO</Navbar.Brand>
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">

                        {
                            isLoggedIn ?
                                <>
                                    <NavLink to="/perfil">
                                        <Nav.Link as="span">Perfil</Nav.Link>
                                    </NavLink>
                                    {/* <NavLink to="/nueva-casa">
                                        <Nav.Link as="span">Crear casa</Nav.Link>
                                    </NavLink> */}
                                    <NavLink to="/iniciar-sesion">
                                        <Nav.Link as="span" onClick={logOutUser}>Cerrar sesión</Nav.Link>
                                    </NavLink>
                                </>
                                :
                                <>
                                    <Modal show={showSignUpModal} onHide={handleSignUpModal} size="lg">
                                        <Modal.Body>
                                            {signUpForm === 'usuario' && <UserSignupPage closeModal={handleSignUpModal}></UserSignupPage>}
                                            {signUpForm === 'pueblo' && <VillageSignupPage closeModal={handleSignUpModal}></VillageSignupPage>}
                                            <p>¿Eres un {signUpForm}? <Button onClick={changeSignUpForm}>Regístrate aquí</Button></p>
                                        </Modal.Body>
                                    </Modal>

                                    <Button onClick={openSignUpModal}>Regístrate</Button>


                                    <Modal show={showLoginModal} onHide={handleLoginModal} size="lg">
                                        <Modal.Body>
                                            <LoginPage closeModal={handleLoginModal} ></LoginPage>
                                        </Modal.Body>
                                    </Modal>

                                    <Button onClick={openLoginModal}>Iniciar sesión</Button>
                                </>

                        }

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation