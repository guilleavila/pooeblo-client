import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "react-bootstrap"
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
        <section>
            <h5>Próximas reservas</h5>
            {
                allRentersBookings?.map(booking => {
                    return <div key={booking._id}>
                        <h6>RESERVA</h6>
                        <p>Corenter: {booking.subscription.coRenter.firstName} {booking.subscription.coRenter.lastName}</p>
                        <p>Entrada: {moment(booking.entryDate).format('LL')}</p>
                        <p>Salida: {moment(booking.exitDate).format('LL')}</p>
                        <Button onClick={() => handleCancelBtn(booking._id)}>Cancelar Reserva</Button>
                    </div>
                })
            }
        </section>
    )
}

export default AllRentersBookingsInThisHouse