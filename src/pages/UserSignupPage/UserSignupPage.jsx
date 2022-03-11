import { Container, Row, Col } from 'react-bootstrap'
import UserSignupForm from '../../components/UserSignupForm/UserSignupForm'
import { Link } from 'react-router-dom'

const UserSignupPage = ({closeModal}) => {

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <h1 className='h1login'>Regístrate</h1>
                    <UserSignupForm closeModal={closeModal}/>
                </Col>
            </Row>
        </Container>
    )
}

export default UserSignupPage