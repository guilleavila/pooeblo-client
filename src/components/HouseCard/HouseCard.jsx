import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './HouseCard.css'


const HouseCard = ({ name, images, _id, village }) => {

    return (
        <Card className='houseCard'>
            <Link to={`/casa/${_id}`}>
                <Card.Img className="houseCardImg" variant="top" src={images[0]} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>{village.name} - {village.province}</Card.Text>
                </Card.Body>
            </Link>
        </Card>
    )
}

export default HouseCard