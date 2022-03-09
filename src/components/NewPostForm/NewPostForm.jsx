import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import postsService from "../../services/posts.service"
import { Form, Button } from 'react-bootstrap'
import uploadService from "../../services/upload.service"
import { useState, useContext } from "react"


const NewPostForm = () => {

    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    const [postState, setPostState] = useState({
        image: '',
        content: '',
        likes: 0,
        creator: user?._id
    })

    const [loadingImage, setLoadingImage] = useState(false)

    const handleInputChange = e => {
        const { name, value } = e.target
        setPostState({
            ...postState,
            [name]: value,
            creator: user._id
        })
    }

    const uploadPostImage = e => {

        setLoadingImage(true)

        const uploadData = new FormData()
        uploadData.append('imageData', e.target.files[0])

        uploadService
            .uploadImage(uploadData)
            .then(({ data }) => {
                setLoadingImage(false)
                setPostState({ ...postState, imageUrl: data.cloudinary_url })
            })
            .catch(err => console.log(err))
    }

    const handleSubmit = e => {
        e.preventDefault(e)

        postsService
            .createPost(postState)
            .then(() => navigate(`/`))
            .catch(err => console.log(err))
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Label>Contenido</Form.Label>

            <Form.Control type="text" name="content" value={postState.content} onChange={handleInputChange} />
            <Form.Group controlId="image" className="mb-3">
                <Form.Label>Añadir imagen</Form.Label>
                <Form.Control type="file" onChange={uploadPostImage} />
            </Form.Group>

            <Button variant="dark" type="submit" style={{ width: '100%' }}>Publicar post</Button>
        </Form>
    )
}

export default NewPostForm