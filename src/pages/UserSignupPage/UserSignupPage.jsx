import { Container, Row, Col } from 'react-bootstrap'
import UserSignupForm from '../../components/UserSignupForm/UserSignupForm'
import { Link } from 'react-router-dom'

const UserSignupPage = () => {

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={4}>
                    <h1>Regístrate</h1>
                    <p>¿Eres un pueblo? <Link to='/registro-pueblo'>Regístrate aquí</Link></p>
                    <UserSignupForm />
                </Col>
            </Row>
        </Container>
    )
}

export default UserSignupPage