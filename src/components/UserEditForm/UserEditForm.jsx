import { useContext, useState } from "react"
import { AuthContext } from "../../context/auth.context"
import { Form, Button } from "react-bootstrap"
import userService from "../../services/user.service"


const UserEditForm = ({ firstName, lastName, phoneNumber, birthDate, closeModal, refreshDetails }) => {

    const { user } = useContext(AuthContext)

    const [infoForm, setInfoForm] = useState({
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        birthDate: birthDate
    })

    const handleInputChange = e => {
        const { name, value } = e.target
        setInfoForm({
            ...infoForm,
            [name]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()

        userService
            .editUser(infoForm)
            .then(() => {
                closeModal()
                refreshDetails()
            })
            .catch(err => console.log(err))
    }


    return (
        <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" name="firstName" value={infoForm.firstName} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Apellidos</Form.Label>
                <Form.Control type="text" name="lastName" value={infoForm.lastName} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Nº de teléfono</Form.Label>
                <Form.Control type="text" name="phoneNumber" value={infoForm.phoneNumber} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Fecha de nacimiento</Form.Label>
                <Form.Control type="date" name="birthDate" value={infoForm.birthDate} onChange={handleInputChange} />
            </Form.Group>

            <Button variant="dark" type="submit" style={{ width: '100%' }}>Guardar cambios</Button>

        </Form>
    )
}

export default UserEditForm