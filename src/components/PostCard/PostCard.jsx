import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const PostCard = ({ image, content, creator }) => {

    return (
        <Card className='villageCard' style={{ width: '20rem' }}>
            <Link to={`/pueblos/${creator._id}`}>
                <Card.Img variant="top" src={image} />
                <Card.Body>
                    <Card.Title>Post de {creator.name}</Card.Title>
                    <Card.Text>{content}</Card.Text>
                </Card.Body>
            </Link>
        </Card>
    )
}

export default PostCard