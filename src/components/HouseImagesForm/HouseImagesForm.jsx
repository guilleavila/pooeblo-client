import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import uploadService from '../../services/upload.service'
import housesService from '../../services/houses.service'
import { useParams } from 'react-router-dom'

const ImageForm = ({ closeModal, refreshDetails }) => {

    const [loadingImage, setLoadingImage] = useState(false)

    // form state
    const [imagesForm, setImagesForm] = useState({
        images: []
    })

    const { house_id } = useParams()

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
                console.log(data.cloudinary_urls)
                setImagesForm({ ...imagesForm, images: data.cloudinary_urls })
            })
            .catch(err => console.log(err))

    }

    function handleSubmit(e) {
        e.preventDefault()

        housesService
            .uploadImages(house_id, imagesForm)
            .then(() => {
                closeModal()
                refreshDetails()
            })
    }

    return (

        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Imágenes</Form.Label>
                <Form.Control type="file" onChange={uploadHouseImages} />
            </Form.Group>

            <Button variant="dark" type="submit" style={{ width: '100%' }}>Subir imágenes</Button>

        </Form>
    )
}

export default ImageForm