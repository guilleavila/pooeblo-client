import { Col } from "react-bootstrap"
import VillageCard from "../VillageCard/VillageCard"

const MyFollowedVillages = ({ followedVillages }) => {

    return (
        <>
            {
                followedVillages.map(eachVillage => {
                    return (
                        <Col sm={4} key={eachVillage._id}>
                            <VillageCard {...eachVillage} />
                        </Col>

                    )
                })
            }
            <hr />

        </>
    )
}

export default MyFollowedVillages