import { Row, Col } from 'react-bootstrap'

const VillageFeatures = ({ features }) => {

    return (
        <Row className='secondSection'>
            <Col sm={6}>
                <h4>Distancia a la ciudad</h4>
                <p>{features.distanceToCity} km a la ciudad más cercana</p>
            </Col>

            <Col sm={6}>
                <h4>Servicios sanitarios</h4>
                {features.healthService ? <p>Sí</p> : <p>No</p>}
            </Col>

            <Col sm={6}>
                <h4>Habitantes</h4>
                <p>{features.residents}</p>
            </Col>

            <Col sm={6}>
                <h4>Instalaciones deportivas</h4>
                {features.sportsFacilities ? <p>Sí</p> : <p>No</p>}
            </Col>

            <Col sm={6}>
                <h4>Precio medio de compra</h4>
                <p>{features.averagePurchasePrice} €</p>
            </Col>

            <Col sm={6}>
                <h4>Playa</h4>
                {features.isCoastalVillage ? <p>Sí</p> : <p>No</p>}
            </Col>

            <Col sm={6}>
                <h4>Otros servicios</h4>
                {features.otherServices}
            </Col>

            <Col sm={6}>
                <h4>Montaña</h4>
                {features.isMountainVillage ? <p>Sí</p> : <p>No</p>}
            </Col>


        </Row>
    )
}

export default VillageFeatures