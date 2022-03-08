import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import uploadService from '../../services/upload.service'
import villagesService from '../../services/villages.service'

const ImageForm = () => {

    const [loadingImage, setLoadingImage] = useState(false)

    // form state
    const [imageForm, setImageForm] = useState({
        images: []
    })

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
                // console.log(data.cloudinary_urls)
                setImageForm({ ...imageForm, images: data.cloudinary_urls })
            })
            .catch(err => console.log(err))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        villagesService
            .editVillageInfo(imageForm)
            .then(() => {

            })
            .catch(err => console.log(err))
    }

    return (

        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Imágenes</Form.Label>
                <Form.Control type="file" onChange={uploadHouseImages} />
                <Form.Text className="text-muted">
                    Máx. una imagen
                </Form.Text>
            </Form.Group>

            <Button variant="dark" type="submit" style={{ width: '100%' }}>Subir imagen</Button>

        </Form>
    )
}

export default ImageForm