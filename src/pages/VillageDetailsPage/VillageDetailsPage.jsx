import { Container, Row, Col, Button } from "react-bootstrap"
import { useState, useEffect, useContext, useCallback } from "react"
import { useParams, Link } from "react-router-dom"
import villagesService from "../../services/villages.service"
import { AuthContext } from "../../context/auth.context"
import userService from "../../services/user.service"
import FollowBtn from "../../components/FollowBtn/FollowBtn"
import { GoogleMap, useJsApiLoader, LoadScript, Marker } from '@react-google-maps/api';


const VillageDetailsPage = () => {

    const [villageDetails, setVillageDetails] = useState({})

    const [isFollowing, setIsFollowing] = useState()
    const [btnState, setBtnState] = useState('Cargando...')

    const [map, setMap] = useState(null)

    const [coordinates, setCoordinates] = useState()

    const [isLoaded2, setIsLoaded2] = useState(false)

    const { village_id } = useParams()
    const { user } = useContext(AuthContext)



    useEffect(() => {
        villagesService
            .getOneVillage(village_id)
            .then(({ data }) => {
                console.log('data =>', data.location.coordinates);
                setVillageDetails(data)
                setCoordinates(data.coordinates)
                setIsLoaded2(true)
            })
            .catch(err => console.log(err))
    }, [])


    useEffect(() => {
        villageDetails.name && checkIfFollowed()
    }, [user, villageDetails])

    const checkIfFollowed = () => {
        userService
            .getUserDetails()
            .then(({ data }) => {

                let foundFollowedVillage = ''

                data?.followedVillages.forEach(elm => {
                    if (elm.name === villageDetails.name) {
                        foundFollowedVillage = elm.name
                    }
                })

                if (foundFollowedVillage !== '') {
                    setIsFollowing(true)
                    setBtnState('Dejar de seguir')
                } else {
                    setIsFollowing(false)
                    setBtnState('Seguir pueblo')
                }
            })
    }


    const handleFollowBtn = () => {

        if (!isFollowing) {
            villagesService
                .followVillage(village_id)
                .then(() => {
                    setIsFollowing(true)
                    setBtnState('Dejar de seguir')
                })
                .catch(err => console.log(err))
        } else if (isFollowing) {
            villagesService
                .unfollowVillage(village_id)
                .then(() => {
                    setIsFollowing(false)
                    setBtnState('Seguir pueblo')
                })
                .catch(err => console.log(err))
        }
    }

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_API_KEY
    })

    const containerStyle = {
        width: '400px',
        height: '400px'
    };




    return (


        <section>

            <Container>
                <h1>Detalles de {villageDetails.name}</h1>
                <hr />
                <FollowBtn btnState={btnState} handleFollowBtn={handleFollowBtn} />
                <Row>
                    <Col md={{ span: 4, offset: 1 }}>
                        <h3>CCAA</h3>
                        <p>{villageDetails.CCAA}</p>
                        <h3>Provincia</h3>
                        <p>{villageDetails.province}</p>
                    </Col>

                    {/* <Col md={{ span: 4, offset: 1 }}> */}
                    {/* </Col> */}
                </Row>

                {
                    isLoaded2 && isLoaded && <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={{
                            lat: villageDetails.location?.coordinates[0],
                            lng: villageDetails.location?.coordinates[1]
                        }}
                        zoom={15}
                    >
                        <Marker
                            position={{
                                lat: villageDetails.location?.coordinates[0],
                                lng: villageDetails.location?.coordinates[1]
                            }}
                        // icon={''}
                        />
                    </GoogleMap>
                }



            </Container>
        </section>
    )
}

export default VillageDetailsPage
