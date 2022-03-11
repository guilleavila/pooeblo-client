import { useState } from "react"
import villagesService from "../../services/villages.service"
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useNavigate, useParams } from "react-router-dom"


const VillageFeaturesForm = ({ _id, features, closeModal, refreshDetails }) => {

    const [featuresForm, setFeaturesForm] = useState({
        distanceToCity: features.distanceToCity,
        residents: features.residents,
        averagePurchasePrice: features.averagePurchasePrice,
        healthService: features.healthService,
        sportsFacilities: features.sportsFacilities,
        isCoastalVillage: features.isCoastalVillage,
        isMountainVillage: features.isMountainVillage,
        otherServices: features.otherServices
    })


    const handleInputChange = e => {
        const { name, value } = e.target
        setFeaturesForm({
            ...featuresForm,
            [name]: value
        })
    }

    const handleCheckedChange = e => {
        const { name, checked } = e.target
        setFeaturesForm({
            ...featuresForm,
            [name]: checked
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        villagesService
            .editVillageFeatures(_id, featuresForm)
            .then(() => {
                closeModal()
                refreshDetails()
            })
            .catch(err => console.log(err))
    }

    return (
        <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3">
                <Form.Label>Distancia a la ciudad</Form.Label>
                <Form.Control type="number" name="distanceToCity" value={featuresForm.distanceToCity} onChange={handleInputChange} placeholder="Distancia en km" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Habitantes</Form.Label>
                <Form.Control type="number" name="residents" value={featuresForm.residents} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Precio medio de compra</Form.Label>
                <Form.Control type="number" name="averagePurchasePrice" value={featuresForm.averagePurchasePrice} onChange={handleInputChange} />
            </Form.Group>

            <Row>
                <Col sm={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Servicios sanitarios</Form.Label>
                        <Form.Check type="checkbox" name="healthService" checked={featuresForm.healthService} onChange={handleCheckedChange} />
                    </Form.Group>
                </Col>

                <Col sm={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Instalaciones deportivas</Form.Label>
                        <Form.Check type="checkbox" name="sportsFacilities" checked={featuresForm.sportsFacilities} onChange={handleCheckedChange} />
                    </Form.Group>
                </Col>

                <Col sm={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Playa</Form.Label>
                        <Form.Check type="checkbox" name="isCoastalVillage" checked={featuresForm.isCoastalVillage} onChange={handleCheckedChange} />
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Montaña</Form.Label>
                        <Form.Check type="checkbox" name="isMountainVillage" checked={featuresForm.isMountainVillage} onChange={handleCheckedChange} />
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group className="mb-3">
                <Form.Label>Otros servicios</Form.Label>
                <Form.Control type="text-area" name="otherServices" value={featuresForm.otherServices} onChange={handleInputChange} />
            </Form.Group>

            <div className="loginBtnDiv">
                <Button className='myBtn loginBtn' type="submit" style={{ width: '100%' }}>Guardar</Button>
            </div>

        </Form>
    )
}

export default VillageFeaturesForm