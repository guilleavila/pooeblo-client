import { useState, useEffect } from "react"
import villagesService from "../../services/villages.service"
import VillagesFilter from "../../components/VillagesFilter/VillagesFilter"
import VillagesResultsList from "../../components/VillagesResultsList/VillagesResultsList"
import { GoogleMap, useJsApiLoader, LoadScript, Marker } from '@react-google-maps/api';

const VillagesResultsByMountainListPage = () => {

    const [filteredVillagesByMountain, setFilteredVillagesByMountain] = useState([])
    const [villages, setVillages] = useState(false)

    useEffect(() => {
        villagesService
            .getVillagesByMountain()
            .then(({ data }) => {
                setFilteredVillagesByMountain(data)
                setVillages(true)
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

    console.log(filteredVillagesByMountain)

    return (
        <section>
            <h1>LISTA DE LOS RESULTADOS DE PUEBLOS DE MONTAÑA</h1>
            <VillagesFilter />
            <VillagesResultsList results={filteredVillagesByMountain} />

            {
                isLoaded && <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={{
                        lat: 40.427416697244034,
                        lng: -3.7028892587845936
                    }}
                    zoom={5}
                >
                    {filteredVillagesByMountain?.map(elm => {
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

export default VillagesResultsByMountainListPage