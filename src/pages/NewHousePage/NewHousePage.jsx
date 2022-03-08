import NewHouseForm from "../../components/NewHouseForm/NewHouseForm"
import { Container, Row, Col } from 'react-bootstrap'


const NewHousePage = () => {

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={5}>
                    <h1>Crea una nueva casa</h1>
                    <NewHouseForm />
                </Col>
            </Row>
        </Container>
    )
}

export default NewHousePage