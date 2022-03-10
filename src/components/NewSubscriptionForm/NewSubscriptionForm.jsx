import { useContext, useEffect, useState } from "react"
import { Form, Button } from "react-bootstrap"
import { useParams, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import housesService from "../../services/houses.service"
import subscriptionsService from "../../services/subscriptions.service"

const NewSubscriptionForm = ({ priceDay }) => {

    const { house_id } = useParams()

    const [subscriptionState, setSubscriptionState] = useState({
        house: house_id,
        totalPrice: 0,
        totalDays: 0,
        daysLeftToBook: 0
    })

    const navigate = useNavigate()

    const handleInputChange = e => {
        const { name, value } = e.target
        setSubscriptionState({
            ...subscriptionState,
            [name]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()

        subscriptionsService
            .createSubscription(subscriptionState)
            .then(() => { navigate(`/pagar`) })
            .catch(err => console.log(err))
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Label>Días de subscripción</Form.Label>

            <Form.Control type="text" name="totalDays" value={subscriptionState.totalDays} onChange={handleInputChange} />
            <p>Precio de la casa por día: {priceDay}</p>
            <p>Precio total: {priceDay * subscriptionState.totalDays}</p>
            <Button variant="dark" type="submit" style={{ width: '100%' }}>Crear subscripción</Button>
        </Form>
    )

}

export default NewSubscriptionForm