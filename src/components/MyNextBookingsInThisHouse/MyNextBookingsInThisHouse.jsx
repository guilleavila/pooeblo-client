import { useEffect, useState } from "react"
import { Button, Row, Col } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import bookingsService from "../../services/bookings.service"
import housesService from "../../services/houses.service"
import './MyNextBookingsInThisHouse.css'

const MyNextBookingsInThisHouse = ({ houseId, moment }) => {

    const [upcomingBookings, setUpcomingBookings] = useState([])
    const [houseDetails, setHouseDetails] = useState()

    const navigate = useNavigate()

    useEffect(() => {
        getHouseDetails()
        getBookings()
    }, [])

    const getHouseDetails = id => {
        housesService
            .getOneHouse(houseId)
            .then(({ data }) => setHouseDetails(data))
            .catch(err => console.log(err))
    }

    const getBookings = id => {
        housesService
            .getAllMyBookingsOfOneHouse(houseId)
            .then(({ data }) => setUpcomingBookings(data))
            .catch(err => console.log(err))
    }

    const handleCancelBtn = bookingId => {
        bookingsService
            .deleteBooking(bookingId)
            .then(() => {
                getBookings()
            })
            .catch(err => console.log(err))
    }


    return (
        <Row>
            {upcomingBookings?.length !== 0 && <h5 className="h5Bookings">Mis próximas reservas en {houseDetails?.name}</h5>}
            {
                upcomingBookings.map(booking => {
                    return (
                        <Col sm={6}>
                            <div className="dateDiv" key={booking._id}>
                                <p className="date">Entrada: {moment(booking.entryDate).format('L')}</p>
                                <p className="date">Salida: {moment(booking.exitDate).format('L')}</p>
                                <Button className='myBtn' onClick={() => handleCancelBtn(booking._id)}>Cancelar Reserva</Button>
                            </div>
                        </Col>
                    )
                })
            }
        </Row>
    )
}

export default MyNextBookingsInThisHouse