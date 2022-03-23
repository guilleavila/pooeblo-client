import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import HouseResultsList from "../../components/HouseResultsList/HouseResultsList"
import villagesService from "../../services/villages.service"
import './VillageHousePage.css'
import { Container, Row, Col } from "react-bootstrap"

const VillageHousePage = () => {

    const [villageHouses, setVillageHouses] = useState()
    const [isLoaded, setIsLoaded] = useState(false)

    const { village_id } = useParams()

    useEffect(() => {

        villagesService
            .getAllHousesOfOneVillage(village_id)
            .then(({ data }) => {
                setVillageHouses(data)
                setIsLoaded(true)
            })
            .catch(err => console.log(err))
    }, [])

    console.log(villageHouses)

    return (

        isLoaded &&
        <Container>
            <Row className='allHousesH1 resultsRow'>
                <Col sm={12}>
                    <h1 className="h1House">Casas en {villageHouses[0].village.name} </h1>
                    <HouseResultsList results={villageHouses} />
                </Col>
            </Row>
        </Container>
    )
}

export default VillageHousePage