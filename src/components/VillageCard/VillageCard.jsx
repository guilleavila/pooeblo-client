import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const VillageCard = ({ name, province, CCAA, profileImg, _id }) => {

    return (
        <Card className='villageCard' style={{ width: '20rem' }}>
            <Link to={`/pueblos/${_id}`}>
                <Card.Img variant="top" src={profileImg} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>{CCAA} {province}</Card.Text>
                </Card.Body>
            </Link>
        </Card>
    )
}

export default VillageCard