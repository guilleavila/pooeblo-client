import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import uploadService from '../../services/upload.service'
import housesService from '../../services/houses.service'
import { useParams } from 'react-router-dom'

const HouseImagesForm = ({ closeModal, refreshDetails }) => {


    // form state
    const [houseImages, setHouseImages] = useState({
        images: []
    })
    const [loadingImage, setLoadingImage] = useState(false)

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
                setHouseImages({ ...houseImages, images: data.cloudinary_urls })
            })
            .catch(err => console.log(err))

    }

    function handleSubmit(e) {
        e.preventDefault()

        housesService
            .uploadImages(house_id, houseImages)
            .then(() => {
                closeModal()
                refreshDetails()
            })
    }

    return (

        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Imágenesdjfliwjs</Form.Label>
                <Form.Control type="file" onChange={uploadHouseImages} multiple />
            </Form.Group>

            <Button variant="dark" type="submit" disabled={loadingImage} style={{ width: '100%' }}>Subir imágenes</Button>

        </Form>
    )
}

export default HouseImagesForm