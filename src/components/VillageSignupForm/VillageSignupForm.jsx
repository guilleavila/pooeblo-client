import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import authService from '../../services/auth.service'
import { useNavigate } from 'react-router-dom'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

const VillageSignupForm = ({ updateState, getId }) => {

    const [value, setValue] = useState(null);
    const [latitude, setLatitude] = useState()
    const [longitude, setLongitude] = useState()
    const [comAut, setComAut] = useState()
    const [prov, setProv] = useState()
    const [villageName, setVillageName] = useState()

    geocodeByAddress(value?.value.description)
        .then(results => {
            setVillageName(results[0].address_components[0].long_name)
            setProv(results[0].address_components[1].long_name)
            setComAut(results[0].address_components[2].long_name)
            return getLatLng(results[0])
        })
        .then((response) => {
            setLatitude(response.lat)
            setLongitude(response.lng)
        });

    const [signupForm, setSignupForm] = useState({
        name: '',
        lat: '',
        lng: '',
        email: '',
        password: '',
        phoneNumber: '',
        CCAA: '',
        province: '',
    })


    const navigate = useNavigate()

    const handleInputChange = e => {
        const { name, value } = e.target
        setSignupForm({
            ...signupForm,
            [name]: value,
            name: villageName,
            CCAA: comAut,
            province: prov,
            lat: latitude,
            lng: longitude,
        })
    }

    function handleSubmit(e) {
        e.preventDefault()

        authService
            .villageSignup(signupForm, latitude, longitude)
            .then(({ data }) => {
                getId(data.village._id)
                updateState()
                // navigate(`/caracteristicas/${data.village._id}`)
            })
            .catch(err => console.log(err))
    }

    return (

        <Form onSubmit={handleSubmit}>


            <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <GooglePlacesAutocomplete
                    apiKey={process.env.REACT_APP_API_KEY} selectProps={{ value, onChange: setValue }}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                {/* <Form.Label>Nombre</Form.Label> */}
                <Form.Control type="hidden" name="name" value={villageName} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3">
                {/* <Form.Label>Lat</Form.Label> */}
                <Form.Control type="hidden" name="lat" value={latitude} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3">
                {/* <Form.Label>Lng</Form.Label> */}
                <Form.Control type="hidden" name="lng" value={longitude} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" value={signupForm.email} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" name="password" value={signupForm.password} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Nº de teléfono</Form.Label>
                <Form.Control type="text" name="phoneNumber" value={signupForm.phoneNumber} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3">
                {/* <Form.Label>Comunidad Autónoma</Form.Label> */}
                <Form.Control type="hidden" name="CCAA" value={comAut} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3">
                {/* <Form.Label>Provincia</Form.Label> */}
                <Form.Control type="hidden" name="province" value={prov} onChange={handleInputChange} />
            </Form.Group>

            <Button variant="dark" type="submit" style={{ width: '100%' }}>Siguiente</Button>

        </Form>

    )
}

export default VillageSignupForm