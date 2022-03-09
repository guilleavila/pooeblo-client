import { Container, Row, Col } from "react-bootstrap"
import LoginForm from "../../components/LoginForm/LoginForm"

const LoginPage = ({ closeModal }) => {

    return (
        <Container>
            <Row className='justify-content-md-center'>
                <Col md={8}>
                    <h1>Inicia sesión</h1>
                    <LoginForm closeModal={closeModal} />
                </Col>
            </Row>
        </Container>
    )
}

export default LoginPage