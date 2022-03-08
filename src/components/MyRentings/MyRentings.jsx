import { useState } from "react"
import { useEffect } from "react"
import { useContext } from "react"
import { AuthContext } from "../../context/auth.context"
import subscriptionsService from "../../services/subscriptions.service"

const MyRentings = () => {

    const { user } = useContext(AuthContext)

    const [rentings, setRentings] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        if (user) {
            getRentings()
        }
    }, [user])

    const getRentings = () => {

        subscriptionsService
            .getAllSubscriptionsOfOneUser(user?._id)
            .then(({ data }) => {
                setRentings(data)
                setIsLoaded(true)
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            {
                isLoaded && rentings.map(eachRenting => {
                    return <p key={eachRenting._id}>{eachRenting.house.name}</p>
                })
            }
            <hr />
        </>
    )
}

export default MyRentings