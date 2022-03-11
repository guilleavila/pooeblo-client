import { Card, Button } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect } from "react"
import { AuthContext } from "../../context/auth.context"
import postsService from '../../services/posts.service'
import './PostCard.css'

const PostCard = ({ _id, image, content, creator, createdAt }) => {

    const { village_id } = useParams()

    const navigate = useNavigate()

    const date = createdAt.slice(0, 10)

    const handleDeletePostBtn = postId => {
        postsService
            .deletePost(postId)
            .then(() => navigate('/perfil'))
            .catch(err => console.log(err))
    }


    return (
        <Card className='houseCard'>
            <Link to={`/pueblos/${_id}`}>
                <div className='myContainer'>

                    <Card.Img className='houseCardImg' variant="top" src={image} />
                </div>
                <Card.Body>
                    {village_id && <Card.Title>@{creator?.name}</Card.Title>}
                    <Card.Title>{content}</Card.Title>
                    {!village_id && <Button className='myBtn mRight'>Editar</Button>}
                    {!village_id && <Button className='myBtn' onClick={() => handleDeletePostBtn(_id)}>Eliminar</Button>}
                </Card.Body>
                <Card.Footer className='bottomBg'>
                    <small className="bottomText">Subido el {date}</small>
                </Card.Footer>
            </Link>
        </Card>
    )
}

export default PostCard