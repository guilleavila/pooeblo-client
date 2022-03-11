import { Button } from "react-bootstrap"
import './FollowBtn.css'

const FollowBtn = ({ btnState, handleFollowBtn }) => {

    return (
        <Button className='myBtn followBtn' onClick={handleFollowBtn}>{btnState}</Button>

    )
}

export default FollowBtn