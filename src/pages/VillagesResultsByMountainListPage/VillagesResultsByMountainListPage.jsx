import { useState, useEffect } from "react"

import villagesService from "../../services/villages.service"

import VillagesFilter from "../../components/VillagesFilter/VillagesFilter"
import VillagesResultsList from "../../components/VillagesResultsList/VillagesResultsList"

const VillagesResultsByMountainListPage = () => {

    const [filteredVillagesByMountain, setFilteredVillagesByMountain] = useState([])

    useEffect(() => {
        villagesService
            .getVillagesByMountain()
            .then(({ data }) => {
                setFilteredVillagesByMountain(data)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <section>
            <h1>LISTA DE LOS RESULTADOS DE PUEBLOS DE MONTAÑA</h1>
            <VillagesFilter />
            <VillagesResultsList results={filteredVillagesByMountain} />
        </section>
    )
}

export default VillagesResultsByMountainListPage