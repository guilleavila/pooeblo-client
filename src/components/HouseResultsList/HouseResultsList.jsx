import { Container, Row, Col } from 'react-bootstrap'
import HouseCard from '../HouseCard/HouseCard'

const HouseResultsList = ({ results }) => {

    return (
        <Container>
            <Row>
                {
                    results?.map(house => {
                        return <Col md={4} key={house._id} > <HouseCard {...house} /> </Col>
                    })
                }
            </Row>
        </Container>
    )
}

export default HouseResultsList