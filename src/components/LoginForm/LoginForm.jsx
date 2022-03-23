import { useState, useContext } from "react"
import { Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import authService from "../../services/auth.service"
import { AuthContext } from "../../context/auth.context"
import { MessageContext } from "../../context/userMessage.context"
import './LoginForm.css'

const LoginForm = ({ closeModal }) => {

    const [loginForm, setLoginForm] = useState({
        password: '',
        email: ''
    })

    const navigate = useNavigate()

    const { storeToken, authenticateUser } = useContext(AuthContext)
    const { setShowMessage, setMessageInfo } = useContext(MessageContext)

    const handleInputChange = e => {
        const { name, value } = e.target
        setLoginForm({
            ...loginForm,
            [name]: value
        })
    }

    function handleSubmit(e) {

        e.preventDefault()

        authService
            .login(loginForm)
            .then(({ data }) => {
                storeToken(data.authToken)
                authenticateUser()
                setShowMessage(true)
                setMessageInfo({ title: 'Éxito', desc: 'Sesión iniciada correctamente' })
                navigate('/perfil')
                closeModal()
            })
            .catch(err => console.log(err))
    }


    return (

        <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" value={loginForm.email} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" name="password" value={loginForm.password} onChange={handleInputChange} />
            </Form.Group>
            <div className="modalBtnDiv">
                <Button className='myBtn loginBtn' variant="dark" type="submit" style={{ width: '100%' }}>Iniciar sesión</Button>
            </div>

        </Form>
    )
}

export default LoginForm