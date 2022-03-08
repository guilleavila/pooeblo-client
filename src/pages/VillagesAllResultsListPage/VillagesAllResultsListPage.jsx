import { useState, useEffect } from "react"

import villagesService from "../../services/villages.service"

import VillagesFilter from "../../components/VillagesFilter/VillagesFilter"
import VillagesResultsList from "../../components/VillagesResultsList/VillagesResultsList"

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

    return (
        <section>
            <h1>TODOS LOS PUEBLOS</h1>
            <VillagesFilter />
            <VillagesResultsList results={allVillages} />
        </section>
    )
}

export default VillagesAllResultsListPage