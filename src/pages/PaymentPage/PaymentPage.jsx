import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import axios from 'axios'

const stripePromise = loadStripe("pk_test_51Ka6JvDSLsQDSpOUaMvFYazu9lmSEahwZu1XT7BEk8ajEszyhbFWrDRFgz4XnA74EgvGEh4nPLYlK1F60HxwpauX00N7zQGg8f")

const PaymentPage = () => {

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
            <Button>Finalizar compra</Button>
        </Form>
    }


    return (
        <Elements stripe={stripePromise}>
            <Container>
                <Row>
                    <Col sm={4}>
                        <CheckoutForm />
                    </Col>
                </Row>
            </Container>
        </Elements>
    )
}

export default PaymentPage