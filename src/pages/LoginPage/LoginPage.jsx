import { Container, Row, Col } from "react-bootstrap"
import LoginForm from "../../components/LoginForm/LoginForm"
import './LoginPage.css'

const LoginPage = ({ closeModal }) => {

    return (
        <Container>
            <Row className='justify-content-md-center'>
                <Col md={8}>
                    <h1 className="h1login">Inicia sesión</h1>
                    <LoginForm closeModal={closeModal} />
                </Col>
            </Row>
        </Container>
    )
}

export default LoginPage