import { useContext, useState } from "react"
import { AuthContext } from "../../context/auth.context"
import MyHouses from "../../components/MyHouses/MyHouses"
import { Container, Row } from "react-bootstrap"
import MyFollowedVillages from "../../components/MyFollowedVillages/MyFollowedVillages"
import { useEffect } from "react"
import userService from "../../services/user.service"
import ResultsHouses from "../../components/ResultsHouses/ResultsHouses"
import MyRentings from "../../components/MyRentings/MyRentings"
import subscriptionsService from "../../services/subscriptions.service"

const UserProfilePage = () => {

    const { user } = useContext(AuthContext)

    const [userDetails, setUserDetails] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    const [subscriptions, setSubscriptions] = useState([])
    // const [subsLoaded, setSubsLoaded] = useState(false)
    const [myHouses, setMyHouses] = useState([])

    useEffect(() => {
        if (user) {
            getDetails()
            getSubscriptions()
            getMyHouses()
        }
    }, [user])


    const getDetails = () => {

        userService
            .getUserDetails()
            .then(({ data }) => {

                console.log('Esto traigo del back', data)
                setUserDetails(data)
                setIsLoaded(true)
            })
            .catch(err => console.log(err))
    }

    const getSubscriptions = () => {
        subscriptionsService
            .getAllSubscriptionsOfOneUser()
            .then(({ data }) => {
                const subsArr = data.map(elm => elm.house)

                return subsArr
            })
            .then(subsArr => {
                setSubscriptions(subsArr)
                // setSubsLoaded(true)
            })

            .catch(err => console.log(err))
    }

    const getMyHouses = () => {
        userService
            .getAllPropertiesOfOneUser()
            .then(({ data }) => {
                setMyHouses(data)
            })
            .catch(err => console.log(err))
    }

    return (

        <Container>

            <h1>Bienvenid@ {user?.firstName}</h1>

            <h2>Aquí deberían ir tus rentings</h2>
            <Row>
                < ResultsHouses houses={subscriptions} width={4} />
            </Row>

            <h2>Aquí deberían ir los pueblos a los que sigues</h2>
            <Row>
                {isLoaded && < MyFollowedVillages followedVillages={userDetails.followedVillages} />}
            </Row>

            <h2>Aquí deberían ir tus casas favoritas</h2>
            <Row>
                {isLoaded && < ResultsHouses houses={userDetails.favHouses} width={6} />}
            </Row>

            <h2>Aquí deberían ir tus casas</h2>
            <Row>
                < ResultsHouses houses={myHouses} width={3} />
            </Row>

        </Container>
    )
}

export default UserProfilePage