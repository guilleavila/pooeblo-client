import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import villagesService from "../../services/villages.service"
import VillagesFilter from "../../components/VillagesFilter/VillagesFilter"
import VillagesResultsList from "../../components/VillagesResultsList/VillagesResultsList"
import { GoogleMap, useJsApiLoader, LoadScript, Marker } from '@react-google-maps/api';


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
        width: '400px',
        height: '400px'
    };

    console.log(filteredVillagesByProvince)

    return (
        <section>
            <h1>LISTA DE LOS RESULTADOS DE LOS PUEBLOS POR PROVINCIA</h1>
            <VillagesFilter />
            <VillagesResultsList results={filteredVillagesByProvince} />

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
        </section>
    )
}

export default VillagesResultsByProvinceListPage