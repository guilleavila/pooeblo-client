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
        <div className='villagesFilter'>

            <input type='text' placeholder='busca un pueblo' onChange={handleVillagesByNameFilter} />

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

            <input type='text' placeholder='busca por provincia' onChange={getProvinces} />

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

            <Link to={`/pueblos/resultados/pueblos-de-costa`}>
                <Button>PUEBLOS DE PLAYA</Button>
            </Link>

            <Link to={`/pueblos/resultados/pueblos-de-sierra`}>
                <Button>PUEBLOS DE MONTAÑA</Button>
            </Link>

            <Link to={`/pueblos/resultados`}>
                <Button>VER TODOS</Button>
            </Link>

        </div>
    )
}

export default VillagesFilter