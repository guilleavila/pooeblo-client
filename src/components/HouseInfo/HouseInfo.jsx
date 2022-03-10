import { Col } from "react-bootstrap"


const HouseInfo = ({ description, maxGuests, priceDay, services, roomsDescription }) => {

    return (
        <>
            <Col>
                <h2>Descripción </h2>
                <p>{description} </p>
            </Col>

            <Col>
                <h2>Servicios </h2>
                <p>{services} </p>
            </Col>
            <Col>
                <h2>Estancias </h2>
                <p>{roomsDescription} </p>
            </Col>
            <Col>
                <h2>Capacidad</h2>
                <p>{maxGuests}</p>
                <h2>Precio/día </h2>
                <h3>{priceDay} € / día </h3>
            </Col>
        </>
    )
}

export default HouseInfo