import { useState, useContext } from "react"
import { Form, Button } from 'react-bootstrap'
import housesService from "../../services/houses.service"
import { useNavigate, Link } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import { useEffect } from "react"
import uploadService from "../../services/upload.service"
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import villagesService from "../../services/villages.service"

const NewHouseForm = ({ closeModal, refreshDetails }) => {

    const { user } = useContext(AuthContext)

    const [value, setValue] = useState(null)
    const [latitude, setLatitude] = useState()
    const [longitude, setLongitude] = useState()
    const [street, setStreet] = useState()
    const [village, setVillage] = useState()
    const [villageId, setVillageId] = useState()
    const [loadingImage, setLoadingImage] = useState(false)
    const [filteredVillagesByName, setFilteredVillagesByName] = useState([])

    // Google api
    geocodeByAddress(value?.value.description)
        .then(results => {
            console.log('SOY EL RESULT', results)
            if (results[0].address_components[0].long_name.length < 4) {
                setStreet(`${results[0].address_components[1].long_name}, ${results[0].address_components[0].long_name}`)
            } else {
                setStreet(results[0].address_components[0].long_name)
            }
            return getLatLng(results[0])
        })
        .then((response) => {
            setLatitude(response.lat)
            setLongitude(response.lng)
        });

    // Form state
    const [houseState, setHouseState] = useState({
        name: '',
        description: '',
        priceDay: 0,
        services: '',
        roomsDescription: '',
        maxGuests: 0,
        images: [],
        maxGuests: 0,
        lat: 0,
        lng: 0,
        village: '',
        street: '',
        owner: user?._id
    })

    useEffect(() => {
        setHouseState({
            ...houseState,
            owner: user?._id
        })
    }, [user])

    const navigate = useNavigate()



    // Filter villages names
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

    const handleVillageSelection = (village) => {
        setVillage(village.name)
        setVillageId(village._id)
        setFilteredVillagesByName([])
    }

    // Handle input change
    const handleInputChange = e => {
        const { name, value } = e.target
        setHouseState({
            ...houseState,
            [name]: value,
            street: street,
            lat: latitude,
            lng: longitude,
            village: villageId
        })
    }

    // Upload images
    const uploadHouseImages = e => {

        setLoadingImage(true)

        const formData = new FormData();
        for (let i = 0; i < e.target.files.length; i++) {
            formData.append('photos', e.target.files[i]);
        }

        uploadService
            .uploadImage(formData)
            .then(({ data }) => {
                setLoadingImage(false)
                setHouseState({ ...houseState, images: data.cloudinary_urls })
            })
            .catch(err => console.log(err))

    }

    // Submit form
    function handleSubmit(e) {
        e.preventDefault()

        housesService
            .createHouse(houseState)
            .then(() => {
                closeModal()
                refreshDetails()
            })
            .catch(err => console.log(err))
    }


    return (

        <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3">
                <Form.Label>Nombre de la casa</Form.Label>
                <Form.Control type="text" name="name" value={houseState.name} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Pueblo</Form.Label>
                <Form.Control type="text" name="village" value={village} onChange={handleVillagesByNameFilter} />
                {
                    filteredVillagesByName.length !== 0 && (
                        <div className='villagesResult'>
                            {
                                filteredVillagesByName.map(village => {
                                    return <p key={village._id} className='villageItem' onClick={() => handleVillageSelection(village)}>{village.name}</p>
                                })
                            }
                        </div>)
                }
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Calle, Número</Form.Label>
                <GooglePlacesAutocomplete
                    apiKey={process.env.REACT_APP_API_KEY} selectProps={{ value, onChange: setValue }}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control as="textarea" name="description" value={houseState.description} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Precio / día</Form.Label>
                <Form.Control type="number" name="priceDay" value={houseState.priceDay} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Instalaciones</Form.Label>
                <Form.Control as="textarea" name="services" value={houseState.services} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Habitaciones</Form.Label>
                <Form.Control as="textarea" name="roomsDescription" value={houseState.roomsDescription} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Capacidad</Form.Label>
                <Form.Control type="number" name="maxGuests" value={houseState.maxGuests} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Imágenes</Form.Label>
                <Form.Control type="file" onChange={uploadHouseImages} multiple />
                <Form.Text className="text-muted">
                    Máx. 5 imágenes
                </Form.Text>
            </Form.Group>

            <Button variant="dark" type="submit" disabled={loadingImage} style={{ width: '100%' }}>Crear casa</Button>

        </Form>
    )
}

export default NewHouseForm