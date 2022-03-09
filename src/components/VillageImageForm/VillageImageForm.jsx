import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import uploadOneService from '../../services/uploadOne.service'
import villagesService from '../../services/villages.service'

const VillageImageForm = ({ closeModal, refreshDetails }) => {


    // form state
    const [imageForm, setImageForm] = useState({
        images: []
    })
    const [loadingImage, setLoadingImage] = useState(false)

    const uploadVillageImage = e => {

        setLoadingImage(true)

        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        uploadOneService
            .uploadOneImage(formData)
            .then(({ data }) => {
                setLoadingImage(false)
                setImageForm({ ...imageForm, profileImg: data.cloudinary_url })
            })
            .catch(err => console.log(err))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        villagesService
            .editVillageImage(imageForm)
            .then(() => {
                closeModal()
                refreshDetails()

            })
            .catch(err => console.log(err))
    }

    return (

        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Imágenes</Form.Label>
                <Form.Control type="file" onChange={uploadVillageImage} />
                <Form.Text className="text-muted">
                    Máx. una imagen
                </Form.Text>
            </Form.Group>

            <Button variant="dark" type="submit" disabled={loadingImage} style={{ width: '100%' }}>Subir imagen</Button>

        </Form>
    )
}

export default VillageImageForm