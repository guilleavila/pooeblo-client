import { useContext, useEffect, useState } from "react"
import { Form, Button } from "react-bootstrap"
import { useParams, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import housesService from "../../services/houses.service"
import subscriptionsService from "../../services/subscriptions.service"
import './NewSubscriptionForm.css'

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
        <div className="newForm">
            <h3>Suscríbete</h3>

            <Form onSubmit={handleSubmit}>
                <Form.Label>Días de suscripción</Form.Label>
                <Form.Control type="text" name="totalDays" value={subscriptionState.totalDays} onChange={handleInputChange} />
                <p className="grayText">Precio de la casa por día: {priceDay} €/día</p>
                <p className="grayText">Precio total: <span className="remarkable">{priceDay * subscriptionState.totalDays} €</span></p>
                <Button className="myBtn" type="submit" style={{ width: '100%' }}>Crear subscripción</Button>
            </Form>
        </div>
    )

}

export default NewSubscriptionForm