import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import bookingsService from "../../services/bookings.service"
import housesService from "../../services/houses.service"

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
            .then(({ data }) => navigate('/perfil'))
            .catch(err => console.log(err))
    }

    return (
        <article>
            <h5>Mis próximas reservas en {houseDetails?.name}</h5>
            {
                upcomingBookings.map(booking => {
                    return <div key={booking._id}>
                        <h6>RESERVA</h6>
                        <p>Entrada: {moment(booking.entryDate).format('LL')}</p>
                        <p>Salida: {moment(booking.exitDate).format('LL')}</p>
                        <Button onClick={() => handleCancelBtn(booking._id)}>Cancelar Reserva</Button>
                    </div>
                })
            }
        </article>
    )
}

export default MyNextBookingsInThisHouse