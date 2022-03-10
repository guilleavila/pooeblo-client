import { Row, Col } from 'react-bootstrap'
import VillageCard from "../VillageCard/VillageCard"

const VillagesResultsList = ({ results }) => {

    return (
        <Row>
            {
                results?.map(village => {
                    return <Col md={6} key={village._id} > <VillageCard {...village} /> </Col>
                })
            }
        </Row>
    )
}

export default VillagesResultsList