import { Button } from "react-bootstrap"
import './FavBtn.css'

const FavBtn = ({ btnState, handleFavBtn }) => {

    return (
        <Button className='favBtn' variant="dark" onClick={handleFavBtn}>{btnState}</Button>
    )
}

export default FavBtn