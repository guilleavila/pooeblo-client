import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import subscriptionsService from '../../services/subscriptions.service'

const stripePromise = loadStripe("pk_test_51Ka6JvDSLsQDSpOUaMvFYazu9lmSEahwZu1XT7BEk8ajEszyhbFWrDRFgz4XnA74EgvGEh4nPLYlK1F60HxwpauX00N7zQGg8f")

const PaymentPage = () => {

    const { subscription_id } = useParams()
    const [subscription, setSubscription] = useState()

    useEffect(() => {
        subscriptionsService
            .getOneSubscription(subscription_id)
            .then(({ data }) => {
                setSubscription(data)
            })
            .catch(err => console.log(err))
    }, [])


    const CheckoutForm = () => {

        const stripe = useStripe()
        const elements = useElements()

        const handleSubmit = async (e) => {
            e.preventDefault()

            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement)
            })

            if (!error) {
                const { id } = paymentMethod

                const { data } = await axios.post('http://localhost:5005/api/stripe/checkout', {
                    id,
                    amount: 10000
                })
                console.log(data)
            }
        }

        return <Form onSubmit={handleSubmit}>
            <CardElement></CardElement>
        </Form>
    }


    return (
        <section className='hero'>
            <Elements stripe={stripePromise}>
                <Container>
                    <Row>
                        <Col sm={4}>
                            <h5>Pagar</h5>
                            <h6>Tarjeta de crédito o débito</h6>
                            <hr></hr>
                            <CheckoutForm />
                            <Link to={`/perfil`}>
                                <Button className='myBtn'>Finalizar Pago</Button>
                            </Link>
                        </Col>
                        <Col>
                            <div className>
                                <img src={subscription?.house.images[0]} />
                                <p>{subscription?.house.name}</p>
                                <hr></hr>
                                <h3>Detalles del precio</h3>
                                <div>
                                    <p>{subscription?.house.priceDay} € x {subscription?.totalDays} días</p>
                                    <p>{subscription?.totalPrice} €</p>
                                </div>
                                <div>
                                    <p>Gastos de servicio</p>
                                    <p>156€</p>
                                </div>
                                <div>
                                    <p>Total (EUR)</p>
                                    <p>{subscription?.totalPrice + 156} €</p>
                                </div>

                            </div>
                        </Col>
                    </Row>
                </Container>
            </Elements>
        </section>
    )
}

export default PaymentPage