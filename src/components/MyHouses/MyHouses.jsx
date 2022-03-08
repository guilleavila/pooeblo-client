import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/auth.context"
import userService from "../../services/user.service"

const MyHouses = () => {

    const { user } = useContext(AuthContext)

    const [myHouses, setMyHouses] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        if (user) {
            getMyHouses()
        }
    }, [user])


    const getMyHouses = () => {
        userService
            .getAllPropertiesOfOneUser()
            .then(({ data }) => {
                setMyHouses(data)
                setIsLoaded(true)
            })
            .catch(err => console.log(err))
    }

    return (
        <>

            {
                isLoaded && myHouses.map(eachHouse => {
                    return <p key={eachHouse._id}>{eachHouse.name}</p>
                })
            }
            <hr />

        </>


    )
}

export default MyHouses