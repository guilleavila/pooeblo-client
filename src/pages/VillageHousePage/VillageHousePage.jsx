import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import HouseResultsList from "../../components/HouseResultsList/HouseResultsList"
import villagesService from "../../services/villages.service"

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

        isLoaded && <section>

            <h1>ECHA UN VISTAZO A TODAS LAS CASAS DE {villageHouses[0].village.name} </h1>

            <HouseResultsList results={villageHouses} />

        </section>
    )
}

export default VillageHousePage