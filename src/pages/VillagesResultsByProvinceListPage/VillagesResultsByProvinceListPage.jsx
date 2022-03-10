import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import villagesService from "../../services/villages.service"
import VillagesFilter from "../../components/VillagesFilter/VillagesFilter"
import VillagesResultsList from "../../components/VillagesResultsList/VillagesResultsList"
import { GoogleMap, useJsApiLoader, LoadScript, Marker } from '@react-google-maps/api';
import { Col, Container, Row } from "react-bootstrap"


const VillagesResultsByProvinceListPage = () => {

    const [filteredVillagesByProvince, setFilteredVillagesByProvince] = useState([])
    const { province } = useParams()

    useEffect(() => {
        villagesService
            .getVillagesByProvince(province)
            .then(({ data }) => {
                setFilteredVillagesByProvince(data)
            })
            .catch(err => console.log(err))
    }, [province])

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_API_KEY
    })

    const containerStyle = {
        width: '500px',
        height: '600px'
    };

    console.log(filteredVillagesByProvince)

    return (
        <section className="allVillages">

            <Container>
                <VillagesFilter />
                <Row className="resultsRow">
                    <h1 className="h1house">Resultados para: {province}</h1>
                    <Col sm={6}>
                        <div className="villagesScroll">
                            <VillagesResultsList results={filteredVillagesByProvince} />
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
                                zoom={10}
                            >
                                {filteredVillagesByProvince?.map(elm => {
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

export default VillagesResultsByProvinceListPage