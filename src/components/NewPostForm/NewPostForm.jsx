import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import postsService from "../../services/posts.service"
import { Form, Button } from 'react-bootstrap'
import uploadOneService from "../../services/uploadOne.service"
import { useState, useContext } from "react"


const NewPostForm = ({ refreshContent }) => {

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

        uploadOneService
            .uploadOneImage(uploadData)
            .then(({ data }) => {
                setLoadingImage(false)
                setPostState({ ...postState, image: data.cloudinary_url })
            })
            .catch(err => console.log(err))
    }

    const handleSubmit = e => {
        e.preventDefault(e)

        postsService
            .createPost(postState)
            .then(() => {
                setPostState({ image: '', content: '' })
                refreshContent()
            })
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

            <Button variant="dark" type="submit" disabled={loadingImage} style={{ width: '100%' }}>Publicar post</Button>
        </Form>
    )
}

export default NewPostForm