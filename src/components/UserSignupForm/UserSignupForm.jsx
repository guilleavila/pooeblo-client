import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import authService from '../../services/auth.service'
import { useNavigate } from 'react-router-dom'

const UserSignupForm = ({ closeModal }) => {

    const [signupForm, setSignupForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
        birthDate: ''
    })

    const navigate = useNavigate()

    const handleInputChange = e => {
        const { name, value } = e.target
        setSignupForm({
            ...signupForm,
            [name]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()

        authService
            .userSignup(signupForm)
            .then(({ data }) => {
                closeModal()
                // navigate('/iniciar-sesion')
            })
            .catch(err => console.log(err))
    }

    return (

        <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" name="firstName" value={signupForm.firstName} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Apellidos</Form.Label>
                <Form.Control type="text" name="lastName" value={signupForm.lastName} onChange={handleInputChange} />
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
                <Form.Label>Fecha de nacimiento</Form.Label>
                <Form.Control type="date" name="birthDate" value={signupForm.birthDate} onChange={handleInputChange} />
            </Form.Group>

            <Button variant="dark" type="submit" style={{ width: '100%' }}>Registrar</Button>

        </Form>

    )
}

export default UserSignupForm