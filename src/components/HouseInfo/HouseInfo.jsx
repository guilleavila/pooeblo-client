import { Col } from "react-bootstrap"


const HouseInfo = ({ description, maxGuests, availableDaysLeft, priceDay, services, roomsDescription }) => {

    return (
        <>
            <Col sm={8}>
                <h2>Descripción </h2>
                <p>{description} </p>
            </Col>
            <Col sm={4}>
                <h2>Capacidad</h2>
                <p>{maxGuests}</p>
                <h2>Total de días disponible</h2>
                <p>{availableDaysLeft}</p>
                <h2>Precio/día </h2>
                <h3>{priceDay} € / día </h3>
            </Col>

            <Col sm={8}>
                <h2>Servicios </h2>
                <p>{services} </p>
            </Col>
            <Col sm={8}>
                <h2>Estancias </h2>
                <p>{roomsDescription} </p>
            </Col>
        </>
    )
}

export default HouseInfo