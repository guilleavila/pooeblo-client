import { Container, Row, Col } from 'react-bootstrap'
import VillageSignupForm from '../../components/VillageSignupForm/VillageSignupForm'
import { Link } from 'react-router-dom'
import VillageFeaturesForm from '../../components/VillageFeaturesForm/VillageFeaturesForm'
import { useEffect, useState } from 'react'
import villagesService from '../../services/villages.service'

const VillageSignupPage = () => {

    const [step, setStep] = useState(1)
    const [villageId, setVillageId] = useState()

    const [villageDetails, setVillageDetails] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {

        villagesService
            .getOneVillage(villageId)
            .then(({ data }) => {
                console.log(data)
                setVillageDetails(data)
                setIsLoaded(true)
            })
            .catch(err => console.log(err))

    }, [step])

    const getId = id => {
        setVillageId(id)
    }

    const updateState = () => {
        setStep(2)
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={4}>
                    <h1>Regístrate</h1>
                    <p>¿Eres un usuario? <Link to='/registro'>Regístrate aquí</Link></p>
                    {step === 1 && <VillageSignupForm updateState={updateState} getId={getId} />}
                    {
                        isLoaded && step === 2 && <VillageFeaturesForm {...villageDetails} />

                    }
                </Col>
            </Row>
        </Container>
    )
}

export default VillageSignupPage