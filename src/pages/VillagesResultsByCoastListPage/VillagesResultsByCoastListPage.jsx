import { useState, useEffect } from "react"

import villagesService from "../../services/villages.service"

import VillagesFilter from "../../components/VillagesFilter/VillagesFilter"
import VillagesResultsList from "../../components/VillagesResultsList/VillagesResultsList"

const VillagesResultsByCoastListPage = () => {

    const [filteredVillagesByCoast, setFilteredVillagesByCoast] = useState([])

    useEffect(() => {
        villagesService
            .getVillagesByCoast()
            .then(({ data }) => {
                setFilteredVillagesByCoast(data)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <section>
            <h1>LISTA DE LOS RESULTADOS DE LOS PUEBLOS POR PLAYA</h1>
            <VillagesFilter />
            <VillagesResultsList results={filteredVillagesByCoast} />
        </section>
    )
}

export default VillagesResultsByCoastListPage