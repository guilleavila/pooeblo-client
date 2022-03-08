import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import uploadService from '../../services/upload.service'
import uploadOneService from '../../services/uploadOne.service'
import villagesService from '../../services/villages.service'

const ImageForm = ({ closeModal, refreshDetails }) => {

    const [loadingImage, setLoadingImage] = useState(false)

    // form state
    const [imageForm, setImageForm] = useState({
        images: []
    })

    const uploadVillageImage = e => {

        setLoadingImage(true)

        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        uploadOneService
            .uploadOneImage(formData)
            .then(({ data }) => {
                setLoadingImage(false)
                // console.log(data.cloudinary_urls)
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

            <Button variant="dark" type="submit" style={{ width: '100%' }}>Subir imagen</Button>

        </Form>
    )
}

export default ImageForm