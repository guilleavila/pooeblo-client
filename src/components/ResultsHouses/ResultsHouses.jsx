import { Col } from "react-bootstrap"
import HouseCard from "../HouseCard/HouseCard"


const ResultsHouses = ({ houses, width }) => {

    console.log('casas', houses)

    return (
        <>
            {
                houses.map(eachHouse => {
                    return (
                        <Col sm={width} key={eachHouse._id}>
                            <HouseCard {...eachHouse} />
                        </Col>
                    )
                })
            }
            <hr />
        </>
    )
}

export default ResultsHouses