import { Button } from "react-bootstrap"
import './FavBtn.css'

const FavBtn = ({ btnState, handleFavBtn }) => {

    return (
        <Button className='myBtn' variant="dark" onClick={handleFavBtn}>{btnState}</Button>
    )
}

export default FavBtn