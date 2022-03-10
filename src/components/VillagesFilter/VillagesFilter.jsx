import './VillagesFilter.css'

import villagesService from '../../services/villages.service'

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const VillagesFilter = () => {

    const [filteredVillagesByName, setFilteredVillagesByName] = useState([])
    const [provinces, setProvinces] = useState([])

    const handleVillagesByNameFilter = e => {

        if (e.target.value === '') {
            setFilteredVillagesByName([])
        } else {
            villagesService
                .getVillagesByName(e.target.value)
                .then(({ data }) => {
                    setFilteredVillagesByName(data)
                })
                .catch(err => console.log(err))
        }
    }

    const getProvinces = e => {

        if (e.target.value === '') {
            setProvinces([])
        } else {
            villagesService
                .getAllProvinces(e.target.value)
                .then(({ data }) => setProvinces(data))
                .catch(err => console.log(err))
        }
    }

    return (
        <div className='searchBar'>
            <div className='searchOnly'>
                <div className='villagesFilter'>
                    <div>

                        <input className="searchInput" type='text' placeholder='Busca un pueblo' onChange={handleVillagesByNameFilter} />


                    </div>

                    <div>
                        <input className="searchInput" type='text' placeholder='Busca por provincia' onChange={getProvinces} />


                    </div>

                    <Link to={`/pueblos/resultados/pueblos-de-costa`}>
                        <Button className='filterBtn'>Playa</Button>
                    </Link>

                    <Link to={`/pueblos/resultados/pueblos-de-sierra`}>
                        <Button className='filterBtn'>Montaña</Button>
                    </Link>

                    <Link to={`/pueblos/resultados`}>
                        <Button className='allBtn'>Todos</Button>
                    </Link>

                </div>
            </div>

            <div>

                {
                    filteredVillagesByName.length !== 0 && (
                        <div className='villagesResult'>
                            {
                                filteredVillagesByName.map(village => {
                                    return <Link key={village._id} to={`/pueblos/${village._id}`}>
                                        <p className='villageItem' key={village._id}>{village.name}</p>
                                    </Link>
                                })
                            }
                        </div>)
                }
                {
                    provinces.length !== 0 && (
                        <div className='villagesResult'>
                            {
                                provinces.map(province => {
                                    return <Link key={province} to={`/pueblos/resultados/${province}`}>
                                        <p className='villageItem'>{province}</p>
                                    </Link>
                                })
                            }
                        </div>)
                }
            </div>
        </div>
    )
}

export default VillagesFilter