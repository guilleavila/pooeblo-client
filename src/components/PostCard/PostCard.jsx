import { Card, Button } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { useContext, useEffect } from "react"
import { AuthContext } from "../../context/auth.context"

const PostCard = ({ image, content, creator }) => {

    const { user } = useContext(AuthContext)
    const { village_id } = useParams()

    return (
        <Card className='villageCard' style={{ width: '20rem' }}>
            <Link to={`/pueblos/${creator._id}`}>
                <Card.Img variant="top" src={image} />
                <Card.Body>
                    <Card.Title>Post de {creator?.name}</Card.Title>
                    <Card.Text>{content}</Card.Text>
                </Card.Body>
            </Link>
        </Card>
    )
}

export default PostCard