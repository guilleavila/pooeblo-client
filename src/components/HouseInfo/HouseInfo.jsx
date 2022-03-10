import { Col } from "react-bootstrap"
import './HouseInfo.css'

const HouseInfo = ({ description, maxGuests, priceDay, services, roomsDescription }) => {

    return (
        <>
            <Col className="colMargin">
                <h2>Descripción </h2>
                <p>{description} </p>
            </Col>

            <Col className="colMargin">
                <h2>Servicios </h2>
                <p>{services} </p>
            </Col>

            <Col className="colMargin">
                <h2>Estancias </h2>
                <p>{roomsDescription} </p>
            </Col>

            <Col className="colMargin">
                <h2>Capacidad</h2>
                <p>{maxGuests}</p>
                <h2>Precio / día </h2>
                <p>{priceDay} € / día </p>
            </Col>
        </>
    )
}

export default HouseInfo