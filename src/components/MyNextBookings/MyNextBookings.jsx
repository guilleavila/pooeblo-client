import { useContext, useEffect, useState } from "react"
import bookingsService from "../../services/bookings.service"
import { Col, Button, Row } from "react-bootstrap"
import moment from "moment"
import { AuthContext } from "../../context/auth.context"
import './MyNextBookings.css'


const MyNextBookings = () => {

    const [nextBookings, setNextBookings] = useState([])
    const [loaded, setLoaded] = useState(false)
    const { user } = useContext(AuthContext)


    useEffect(() => {
        getBookings()
    }, [user])

    const getBookings = () => {
        bookingsService
            .getAllMyBookings(user?._id)
            .then(({ data }) => {
                console.log('reservas ---->', data)
                setNextBookings(data)
                setLoaded(true)
            })
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
        <>
            {loaded &&
                nextBookings?.map(booking => {
                    return (
                        <Col sm={6}>
                            <div className="dateDiv" key={booking._id}>
                                <p className="houseName">{booking.subscription.house.name}</p>
                                <p className="date">Entrada: {moment(booking.entryDate).format('L')}</p>
                                <p className="date">Salida: {moment(booking.exitDate).format('L')}</p>
                                <Button className='myBtn' onClick={() => handleCancelBtn(booking._id)}>Cancelar Reserva</Button>
                            </div>
                        </Col>
                    )
                })
            }
        </>
    )
}

export default MyNextBookings