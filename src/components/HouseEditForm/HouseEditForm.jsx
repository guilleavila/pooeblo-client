import { Form, Button } from "react-bootstrap"
import { useState } from "react"
import housesService from "../../services/houses.service"
import GooglePlacesAutocomplete from "react-google-places-autocomplete"
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';


const HouseEditForm = ({ house_id, name, description, priceDay, services, roomsDescription, maxGuests, availableDaysLeft, closeModal, refreshDetails }) => {

    const [houseState, setHouseState] = useState({
        name: name,
        description: description,
        priceDay: priceDay,
        services: services,
        roomsDescription: roomsDescription,
        maxGuests: maxGuests,
        availableDaysLeft: availableDaysLeft
    })


    const handleInputChange = e => {
        const { name, value } = e.target
        setHouseState({
            ...houseState,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        housesService
            .editHouse(house_id, houseState)
            .then(() => {
                closeModal()
                refreshDetails()
            })
            .catch(err => console.log(err))


    }

    return (
        <>
            <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3">
                    <Form.Label>Nombre de la casa</Form.Label>
                    <Form.Control type="text" name="name" value={houseState.name} onChange={handleInputChange} />
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
                    <Form.Label>Días disponibles</Form.Label>
                    <Form.Control type="number" name="availableDaysLeft" value={houseState.availableDaysLeft} onChange={handleInputChange} />
                </Form.Group>

                <Button variant="dark" type="submit" style={{ width: '100%' }}>Guardar información</Button>

            </Form>
        </>
    )
}

export default HouseEditForm