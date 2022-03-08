import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import villagesService from "../../services/villages.service"

import VillagesFilter from "../../components/VillagesFilter/VillagesFilter"
import VillagesResultsList from "../../components/VillagesResultsList/VillagesResultsList"


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

    return (
        <section>
            <h1>LISTA DE LOS RESULTADOS DE LOS PUEBLOS POR PROVINCIA</h1>
            <VillagesFilter />
            <VillagesResultsList results={filteredVillagesByProvince} />
        </section>
    )
}

export default VillagesResultsByProvinceListPage