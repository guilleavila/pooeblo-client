import { Card, Button } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect } from "react"
import { AuthContext } from "../../context/auth.context"
import postsService from '../../services/posts.service'

const PostCard = ({ _id, image, content, creator, createdAt }) => {

    const { village_id } = useParams()

    const navigate = useNavigate()

    const handleDeletePostBtn = postId => {
        postsService
            .deletePost(postId)
            .then(() => navigate('/perfil'))
            .catch(err => console.log(err))
    }


    return (
        <Card className='postCard'>
            <Link to={`/pueblos/${creator._id}`}>
                <Card.Img variant="top" src={image} />
                <Card.Body>
                    {village_id && <Card.Title>@{creator?.name}</Card.Title>}
                    <Card.Text>{content}</Card.Text>
                    <Card.Text>{createdAt}</Card.Text>
                    {!village_id && <Button>EDITAR POST</Button>}
                    {!village_id && <Button onClick={() => handleDeletePostBtn(_id)}>ELIMINAR</Button>}
                </Card.Body>
            </Link>
        </Card>
    )
}

export default PostCard