import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import uploadService from '../../services/upload.service'
import uploadOneService from '../../services/uploadOne.service'
import userService from '../../services/user.service'

const UserImageForm = ({ closeModal, refreshDetails }) => {

    // form state
    const [imageForm, setImageForm] = useState()
    const [loadingImage, setLoadingImage] = useState(false)

    const uploadUserImage = e => {

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

        userService
            .editUserImage(imageForm)
            .then(() => {
                setLoadingImage(false)
                closeModal()
                refreshDetails()
            })

    }

    return (

        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Imágenes</Form.Label>
                <Form.Control type="file" onChange={uploadUserImage} />
                <Form.Text className="text-muted">
                    Máx. una imagen
                </Form.Text>
            </Form.Group>

            <Button variant="dark" type="submit" disabled={loadingImage} style={{ width: '100%' }}>Subir imagen</Button>

        </Form>
    )
}

export default UserImageForm