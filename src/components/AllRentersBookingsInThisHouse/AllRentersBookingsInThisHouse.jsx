import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Col, Row } from "react-bootstrap"
import housesService from "../../services/houses.service"
import bookingsService from "../../services/bookings.service"

const AllRentersBookingsInThisHouse = ({ houseId, moment }) => {

    const [allRentersBookings, setAllRentersBookings] = useState()

    const navigate = useNavigate()

    useEffect(() => {
        getAllRentersBookings()
    }, [])

    const getAllRentersBookings = id => {
        housesService
            .getAllBookingsOfOneHose(houseId)
            .then(({ data }) => setAllRentersBookings(data))
            .catch((err => console.log(err)))
    }

    const handleCancelBtn = bookingId => {
        bookingsService
            .deleteBooking(bookingId)
            .then(() => {
                getAllRentersBookings()
            })
            .catch(err => console.log(err))
    }

    console.log(allRentersBookings)

    return (
        <Row>
            {allRentersBookings?.length !== 0 && <h5 className="h5Bookings">Próximas reservas</h5>}
            {
                allRentersBookings?.map(booking => {
                    return (
                        <Col sm={3}>
                            <div className="dateDiv" key={booking._id}>
                                <img className='coRenter' src={booking.subscription.coRenter.profileImg} />
                                <p className="date">Corenter: <span className="remarkable">{booking.subscription.coRenter.firstName} {booking.subscription.coRenter.lastName}</span></p>
                                <p className="date">Entrada: <span className="remarkable">{moment(booking.entryDate).format('LL')}</span></p>
                                <p className="date">Salida: <span className="remarkable">{moment(booking.exitDate).format('LL')}</span></p>
                                <Button className='myBtn' onClick={() => handleCancelBtn(booking._id)}>Cancelar Reserva</Button>
                            </div>
                        </Col >
                    )
                })
            }
        </Row >
    )
}

export default AllRentersBookingsInThisHouse