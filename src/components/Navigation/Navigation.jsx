import { useContext } from "react"
import { Navbar, Container, Nav } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"

const Navigation = () => {

    const { isLoggedIn, logOutUser } = useContext(AuthContext)

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
                                    <NavLink to="/nueva-casa">
                                        <Nav.Link as="span">Crear casa</Nav.Link>
                                    </NavLink>
                                    <NavLink to="/iniciar-sesion">
                                        <Nav.Link as="span" onClick={logOutUser}>Cerrar sesión</Nav.Link>
                                    </NavLink>
                                </>
                                :
                                <>
                                    <NavLink to="/registro">
                                        <Nav.Link as="span">Regístrate</Nav.Link>
                                    </NavLink>
                                    <NavLink to="/iniciar-sesion">
                                        <Nav.Link as="span">Inicia sesión</Nav.Link>
                                    </NavLink>
                                </>

                        }

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation