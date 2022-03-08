import { Container, Row, Col } from "react-bootstrap"
import LoginForm from "../../components/LoginForm/LoginForm"

const LoginPage = () => {

    return (
        <Container>
            <Row className='justify-content-md-center'>
                <Col md={4}>
                    <h1>Inicia sesión</h1>
                    <LoginForm />
                </Col>
            </Row>
        </Container>
    )
}

export default LoginPage