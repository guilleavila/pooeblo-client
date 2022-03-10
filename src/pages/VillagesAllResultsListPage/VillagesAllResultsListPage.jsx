import { useState, useEffect } from "react"
import villagesService from "../../services/villages.service"
import VillagesFilter from "../../components/VillagesFilter/VillagesFilter"
import VillagesResultsList from "../../components/VillagesResultsList/VillagesResultsList"
import { GoogleMap, useJsApiLoader, LoadScript, Marker } from '@react-google-maps/api';


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
        width: '400px',
        height: '400px'
    };

    return (
        <section>
            <h1>TODOS LOS PUEBLOS</h1>
            <VillagesFilter />
            <VillagesResultsList results={allVillages} />

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
        </section>
    )
}

export default VillagesAllResultsListPage