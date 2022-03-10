import { Col } from "react-bootstrap"
import VillageCard from "../VillageCard/VillageCard"

const MyFollowedVillages = ({ followedVillages, size }) => {

    return (
        <>
            {
                followedVillages?.map(eachVillage => {
                    return (
                        <Col sm={size} key={eachVillage._id}>
                            <VillageCard {...eachVillage}/>
                        </Col>

                    )
                })
            }

        </>
    ) 
}

export default MyFollowedVillages