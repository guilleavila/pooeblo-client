import { useState, useEffect } from "react"
import villagesService from "../../services/villages.service"
import VillagesFilter from "../../components/VillagesFilter/VillagesFilter"
import VillagesResultsList from "../../components/VillagesResultsList/VillagesResultsList"
import { GoogleMap, useJsApiLoader, LoadScript, Marker } from '@react-google-maps/api';
import { Container, Row, Col } from "react-bootstrap";
import './VillagesAllResultsListPage.css'


const VillagesAllResultsListPage = () => {

    const [allVillages, setAllVillages] = useState([])

    useEffect(() => {
        villagesService
            .getAllVillages()
            .then(({ data }) => {
                setAllVillages(data)
            })
            .catch(err => console.log(err))
    }, [])

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_API_KEY
    })

    const containerStyle = {
        width: '500px',
        height: '600px',
    };

    return (
        <section className="allVillages">

            <Container>
                <VillagesFilter />
                <Row className="">
                    <h1 className="h1house">Resultados para: Todos los pueblos</h1>
                    <Col sm={6}>
                        <div className='villagesScroll'>
                            <VillagesResultsList results={allVillages} />
                        </div>
                    </Col>
                    <Col className="map">
                        {
                            isLoaded && <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={{
                                    lat: 40.427416697244034,
                                    lng: -3.7028892587845936
                                }}
                                zoom={5}
                            >
                                {allVillages?.map(elm => {
                                    return (<Marker
                                        key={elm._id}
                                        position={{
                                            lat: elm.location.coordinates[0],
                                            lng: elm.location.coordinates[1]
                                        }}
                                    // icon={''} , 
                                    />)
                                })}

                            </GoogleMap>
                        }
                    </Col>
                </Row>
            </Container>

        </section>
    )
}

export default VillagesAllResultsListPage